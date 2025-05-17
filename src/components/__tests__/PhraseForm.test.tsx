import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhraseContext } from "../../context";
import type { Phrase } from "../../types";
import { PhraseForm } from "..";

describe("PhraseForm", () => {
  const mockAddPhrase = vi.fn();

  const renderWithProvider = () =>
    render(
      <PhraseContext.Provider
        value={{
          state: { phrases: [] as Phrase[] },
          addPhrase: mockAddPhrase,
          removePhrase: vi.fn(),
        }}
      >
        <PhraseForm />
      </PhraseContext.Provider>
    );

  beforeEach(() => {
    mockAddPhrase.mockReset();
  });

  test("renderiza el input y botón", () => {
    renderWithProvider();
    expect(
      screen.getByPlaceholderText(/escribe una frase/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar/i })
    ).toBeInTheDocument();
  });

  test("el botón está deshabilitado si el input está vacío", () => {
    renderWithProvider();
    const button = screen.getByRole("button", { name: /agregar/i });
    expect(button).toBeDisabled();
  });

  test("el botón se habilita cuando hay texto", () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(input, { target: { value: "Hola mundo" } });
    expect(button).not.toBeDisabled();
  });

  test("al hacer submit llama a addPhrase y limpia el input", () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(input, { target: { value: " Frase válida " } });
    fireEvent.click(button);

    expect(mockAddPhrase).toHaveBeenCalledTimes(1);
    expect(mockAddPhrase).toHaveBeenCalledWith("Frase válida");
    expect((input as HTMLInputElement).value).toBe("");
  });

  test("no llama a addPhrase si el input está vacío o solo tiene espacios", () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText(/escribe una frase/i);
    const button = screen.getByRole("button", { name: /agregar/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(mockAddPhrase).not.toHaveBeenCalled();
  });
});
