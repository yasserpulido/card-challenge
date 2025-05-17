import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Phrase } from "../../types";
import { withFilter } from "../withFilter";

type TestComponentProps = {
  phrases: Phrase[];
  extra?: string;
};

const TestComponent = ({ phrases, extra }: TestComponentProps) => (
  <div>
    {extra && <div data-testid="extra">{extra}</div>}
    {phrases.map((p) => (
      <div key={p.id} data-testid="phrase">
        {p.text}
      </div>
    ))}
  </div>
);

const Wrapped = withFilter(TestComponent);

describe("withFilter HOC", () => {
  const phrases: Phrase[] = [
    { id: "1", text: "Hola mundo" },
    { id: "2", text: "React es genial" },
    { id: "3", text: "Vitest" },
  ];

  test("filtra frases según el searchTerm", () => {
    render(<Wrapped phrases={phrases} searchTerm="react" />);
    expect(screen.getByText(/react es genial/i)).toBeInTheDocument();
    expect(screen.queryByText(/hola mundo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vitest/i)).not.toBeInTheDocument();
  });

  test("renderiza correctamente si no hay match", () => {
    render(<Wrapped phrases={phrases} searchTerm="nada" />);
    expect(screen.queryByTestId("phrase")).not.toBeInTheDocument();
  });

  test("pasa props extra correctamente", () => {
    render(<Wrapped phrases={phrases} searchTerm="hola" extra="soy extra" />);
    expect(screen.getByText("soy extra")).toBeInTheDocument();
  });
});
