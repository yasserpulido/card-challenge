import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhraseListView } from "../PhraseListView";
import { PhraseContext } from "../../context";
import type { Phrase } from "../../types/phrase";

describe("PhraseListView", () => {
  const mockRemovePhrase = vi.fn();

  const phrases: Phrase[] = [
    { id: "1", text: "Primera frase" },
    { id: "2", text: "Segunda frase" },
  ];

  const renderWithContext = (phrasesToRender: Phrase[]) =>
    render(
      <PhraseContext.Provider
        value={{
          state: { phrases: [] },
          addPhrase: vi.fn(),
          removePhrase: mockRemovePhrase,
        }}
      >
        <PhraseListView phrases={phrasesToRender} />
      </PhraseContext.Provider>
    );

  beforeEach(() => {
    mockRemovePhrase.mockReset();
  });

  test("renderiza las frases recibidas por props", () => {
    renderWithContext(phrases);
    expect(screen.getByText("Primera frase")).toBeInTheDocument();
    expect(screen.getByText("Segunda frase")).toBeInTheDocument();
  });

  test("llama a removePhrase al hacer click en X", () => {
    renderWithContext([phrases[0]]);
    const deleteButton = screen.getByRole("button", { name: /eliminar frase/i });
    fireEvent.click(deleteButton);
    expect(mockRemovePhrase).toHaveBeenCalledTimes(1);
    expect(mockRemovePhrase).toHaveBeenCalledWith("1");
  });

  test("no rompe si la lista de frases está vacía", () => {
    renderWithContext([]);
    expect(screen.queryByText(/frase/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("renderiza frases duplicadas sin errores", () => {
    const duplicated: Phrase[] = [
      { id: "1", text: "Frase duplicada" },
      { id: "2", text: "Frase duplicada" },
    ];
    renderWithContext(duplicated);
    const items = screen.getAllByText("Frase duplicada");
    expect(items).toHaveLength(2);
  });

  test("elimina múltiples frases correctamente", () => {
    renderWithContext(phrases);
    const deleteButtons = screen.getAllByRole("button", {
      name: /eliminar frase/i,
    });

    fireEvent.click(deleteButtons[0]);
    fireEvent.click(deleteButtons[1]);

    expect(mockRemovePhrase).toHaveBeenCalledTimes(2);
    expect(mockRemovePhrase).toHaveBeenNthCalledWith(1, "1");
    expect(mockRemovePhrase).toHaveBeenNthCalledWith(2, "2");
  });

  test("cada botón tiene un aria-label único", () => {
    renderWithContext(phrases);
    expect(
      screen.getByRole("button", { name: "Eliminar frase: Primera frase" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Eliminar frase: Segunda frase" })
    ).toBeInTheDocument();
  });
});
