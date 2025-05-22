import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PhraseProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhraseProvider>
      <App />
    </PhraseProvider>
  </StrictMode>
);
