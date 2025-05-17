import { useContext } from "react";
import { PhraseContext } from "../context";

export const usePhraseContext = () => {
  const context = useContext(PhraseContext);
  if (!context) {
    throw new Error("usePhraseContext must be used within a PhraseProvider");
  }
  return context;
};
