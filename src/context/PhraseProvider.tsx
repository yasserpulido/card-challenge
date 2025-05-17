import { type ReactNode, useReducer } from "react";
import { PhraseContext } from "./PhraseContext";
import { v4 as uuidv4 } from "uuid";

type Phrase = {
  id: string;
  text: string;
};

type State = {
  phrases: Phrase[];
};

type Action =
  | { type: "ADD_PHRASE"; payload: string }
  | { type: "REMOVE_PHRASE"; payload: string };

const initialState: State = {
  phrases: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PHRASE":
      return {
        ...state,
        phrases: [{ id: uuidv4(), text: action.payload }, ...state.phrases],
      };
    case "REMOVE_PHRASE":
      return {
        ...state,
        phrases: state.phrases.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

export const PhraseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPhrase = (text: string) =>
    dispatch({ type: "ADD_PHRASE", payload: text });

  const removePhrase = (id: string) =>
    dispatch({ type: "REMOVE_PHRASE", payload: id });

  return (
    <PhraseContext.Provider value={{ state, addPhrase, removePhrase }}>
      {children}
    </PhraseContext.Provider>
  );
};
