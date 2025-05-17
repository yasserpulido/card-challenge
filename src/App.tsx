import { useCallback, useState } from "react";
import { PhraseForm, PhraseList, SearchInput } from "./components";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { usePhraseContext } from "./hooks";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  font-family: "Segoe UI", sans-serif;
`;

const CardBox = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = usePhraseContext();

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />
      <CardBox>
        <h1>Frases</h1>
        <PhraseForm />
        <SearchInput value={searchTerm} onChange={handleSearchChange} />
        <PhraseList phrases={state.phrases} searchTerm={searchTerm} />
      </CardBox>
    </AppContainer>
  );
}

export default App;
