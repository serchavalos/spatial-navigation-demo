import { Ref, useEffect, useRef } from "react";
import uniqid from "uniqid";

import { NavNode } from "./types";

type FocusRef = {
  ref: Ref<HTMLElement>;
  isFocused: boolean;
};

const nodes: Array<NavNode> = [];

export function useFocusRef(): FocusRef {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      nodes.push({
        id: uniqid(),
        ref
      });
    }
  }, [ref]);

  const isFocused = false;

  return { ref, isFocused };
}
