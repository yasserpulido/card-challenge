import { createContext } from "react";

type Phrase = {
  id: string;
  text: string;
};

type State = {
  phrases: Phrase[];
};

export const PhraseContext = createContext<{
  state: State;
  addPhrase: (text: string) => void;
  removePhrase: (id: string) => void;
} | null>(null);
