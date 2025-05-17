import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { Phrase } from "../../types";
import { PhraseContext } from "../../context";
import { PhraseList } from "..";

describe("PhraseList", () => {
  const mockRemovePhrase = vi.fn();

  const phrases: Phrase[] = [
    { id: "1", text: "Hola mundo" },
    { id: "2", text: "React es genial" },
    { id: "3", text: "Vitest rocks" },
  ];

  const renderWithProvider = (searchTerm: string) =>
    render(
      <PhraseContext.Provider
        value={{
          state: { phrases },
          addPhrase: vi.fn(),
          removePhrase: mockRemovePhrase,
        }}
      >
        <PhraseList searchTerm={searchTerm} />
      </PhraseContext.Provider>
    );

  beforeEach(() => {
    mockRemovePhrase.mockReset();
  });

  test("renderiza solo las frases que coinciden con el searchTerm", () => {
    renderWithProvider("react");
    expect(screen.getByText(/react es genial/i)).toBeInTheDocument();
    expect(screen.queryByText(/hola mundo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vitest rocks/i)).not.toBeInTheDocument();
  });

  test("renderiza todas las frases si el searchTerm está vacío", () => {
    renderWithProvider("");
    expect(screen.getByText(/hola mundo/i)).toBeInTheDocument();
    expect(screen.getByText(/react es genial/i)).toBeInTheDocument();
    expect(screen.getByText(/vitest rocks/i)).toBeInTheDocument();
  });

  test("llama a removePhrase cuando se hace click en eliminar", () => {
    renderWithProvider("hola");
    const deleteButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(deleteButton);
    expect(mockRemovePhrase).toHaveBeenCalledTimes(1);
    expect(mockRemovePhrase).toHaveBeenCalledWith("1");
  });

  test("renderiza sin frases si el filtro no encuentra nada", () => {
    renderWithProvider("inexistente");
    expect(screen.queryByText(/hola mundo/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
