import React, { useMemo } from "react";
import type { Phrase } from "../types";

interface WithFilterProps {
  phrases: Phrase[];
  searchTerm: string;
}

export function withFilter<P extends { phrases: Phrase[] }>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithFilteredComponent({
    phrases,
    searchTerm,
    ...rest
  }: WithFilterProps & Omit<P, "phrases">) {
    const filtered = useMemo(() => {
      return phrases.filter((p) =>
        p.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [phrases, searchTerm]);

    return <WrappedComponent {...(rest as unknown as P)} phrases={filtered} />;
  };
}
