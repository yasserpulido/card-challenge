import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { usePhraseContext } from "../hooks";

const FormContainer = styled.form`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #222;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const PhraseForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { addPhrase } = usePhraseContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) return;
    addPhrase(trimmed);
    setInputValue("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Escribe una frase..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" disabled={!inputValue.trim()}>
        Agregar
      </Button>
    </FormContainer>
  );
};
