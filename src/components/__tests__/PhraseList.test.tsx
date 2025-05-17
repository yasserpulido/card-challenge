import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PhraseList } from "../PhraseList";
import { PhraseContext } from "../../context";
import type { Phrase } from "../../types/phrase";

describe("PhraseList (HOC)", () => {
  const mockRemovePhrase = () => {};

  const phrases: Phrase[] = [
    { id: "1", text: "Frase de prueba" },
    { id: "2", text: "Otra más" },
  ];

  test("renderiza frases filtradas por el searchTerm", () => {
    render(
      <PhraseContext.Provider
        value={{
          state: { phrases },
          addPhrase: () => {},
          removePhrase: mockRemovePhrase,
        }}
      >
        <PhraseList phrases={phrases} searchTerm="otra" />
      </PhraseContext.Provider>
    );

    expect(screen.getByText(/otra más/i)).toBeInTheDocument();
    expect(screen.queryByText(/frase de prueba/i)).not.toBeInTheDocument();
  });
});
