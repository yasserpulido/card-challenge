import styled from "styled-components";
import { usePhraseContext } from "../hooks";
import type { Phrase } from "../types/phrase";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

const Card = styled.div`
  position: relative;
  background: #f8f9fa;
  padding: 16px 40px 16px 16px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: black;
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
  phrases: Phrase[];
};

export const PhraseListView = ({ phrases }: Props) => {
  const { removePhrase } = usePhraseContext();

  return (
    <Grid role="list" aria-label="Lista de frases agregadas">
      {phrases.map((p) => (
        <Card key={p.id} role="listitem" aria-label={`Frase: ${p.text}`}>
          {p.text}
          <DeleteButton
            aria-label={`Eliminar frase: ${p.text}`}
            onClick={() => removePhrase(p.id)}
          >
            X
          </DeleteButton>
        </Card>
      ))}
    </Grid>
  );
};
