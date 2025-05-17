import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInputComponent = ({ value, onChange }: Props) => {
  return (
    <Input
      type="text"
      placeholder="Buscar..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const SearchInput = React.memo(SearchInputComponent);
