import styled from "styled-components";
import { usePhraseContext } from "../hooks";
import React, { useMemo } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  background: crimson;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 1;
`;

type Props = {
  searchTerm: string;
};

export const PhraseListComponent = ({ searchTerm }: Props) => {
  const { state, removePhrase } = usePhraseContext();

  const filtered = useMemo(() => {
    return state.phrases.filter((p) =>
      p.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.phrases, searchTerm]);

  return (
    <Grid>
      {filtered.map((p) => (
        <Card key={p.id}>
          {p.text}
          <DeleteButton onClick={() => removePhrase(p.id)}>X</DeleteButton>
        </Card>
      ))}
    </Grid>
  );
};

export const PhraseList = React.memo(PhraseListComponent);
