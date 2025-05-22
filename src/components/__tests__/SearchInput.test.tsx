import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../SearchInput";

describe("SearchInput", () => {
  test("renderiza el input con placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  });

  test("muestra el valor recibido por props", () => {
    render(<SearchInput value="hola" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/buscar/i) as HTMLInputElement;
    expect(input.value).toBe("hola");
  });

  test("llama a onChange con el nuevo valor", () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(input, { target: { value: "nuevo valor" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("nuevo valor");
  });

  test("tiene el aria-label correcto para accesibilidad", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/buscar frases/i)).toBeInTheDocument();
  });
});
