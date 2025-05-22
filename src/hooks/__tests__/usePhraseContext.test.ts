import { describe, test, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePhraseContext } from "../usePhraseContext";

describe("usePhraseContext", () => {
  test("lanza error si se usa fuera de PhraseProvider", () => {
    expect(() => {
      renderHook(() => usePhraseContext());
    }).toThrow("usePhraseContext must be used within a PhraseProvider");
  });
});
