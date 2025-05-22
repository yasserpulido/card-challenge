import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { usePhraseContext } from "../hooks";

const FormContainer = styled.form`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  height: 38px;
  padding: 0 16px;
  background-color: #222;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: crimson;
  font-size: 0.9rem;
  margin-top: 4px;
  margin-bottom: 0;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PhraseForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { addPhrase } = usePhraseContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (trimmed.length === 0) {
      setError("No se puede agregar una frase vacía");
      return;
    }

    addPhrase(trimmed);
    setInputValue("");
    setError("");
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      role="form"
      aria-label="Formulario para agregar frase"
    >
      <FieldWrapper>
        <Input
          type="text"
          placeholder="Escribe una frase..."
          aria-label="Frase a agregar"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {error && (
          <ErrorMessage role="alert" aria-live="polite">
            {error}
          </ErrorMessage>
        )}
      </FieldWrapper>
      <Button type="submit" aria-label="Agregar frase">
        Agregar
      </Button>
    </FormContainer>
  );
};
