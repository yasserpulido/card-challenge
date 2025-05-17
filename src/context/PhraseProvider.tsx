import { useReducer, useEffect, type ReactNode } from "react";
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

const reducer = (state: State, action: Action): State => {
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
};

const init = (): State => {
  try {
    const stored = localStorage.getItem("phrases");
    if (stored) {
      const phrases = JSON.parse(stored);
      if (Array.isArray(phrases)) {
        return { phrases };
      }
    }
  } catch (e) {
    console.warn("Error leyendo localStorage", e);
  }
  return { phrases: [] };
};

export const PhraseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { phrases: [] }, init);

  const addPhrase = (text: string) =>
    dispatch({ type: "ADD_PHRASE", payload: text });

  const removePhrase = (id: string) =>
    dispatch({ type: "REMOVE_PHRASE", payload: id });

  useEffect(() => {
    localStorage.setItem("phrases", JSON.stringify(state.phrases));
  }, [state.phrases]);

  return (
    <PhraseContext.Provider value={{ state, addPhrase, removePhrase }}>
      {children}
    </PhraseContext.Provider>
  );
};
