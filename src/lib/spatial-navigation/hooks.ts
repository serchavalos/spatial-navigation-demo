import { Ref, useCallback, useContext, useEffect, useRef } from "react";
import uniqid from "uniqid";
import { NavNodesContext } from "./nav-engine";

import { NavNode } from "./types";

type FocusRef = {
  setRef: (node: HTMLElement | null) => void;
  isFocused: boolean;
};

const nodes: Array<NavNode> = [];

export function useFocusRef(): FocusRef {
  const ref = useRef<HTMLElement | null>(null);
  const navEngine = useContext(NavNodesContext);
  const nodeId = uniqid();
  
  const setRef = useCallback((node: HTMLElement | null): void => {
    ref.current = node;
  }, [navEngine]);
  
  // REVIEW: why is this running 2 times?
  useEffect(() => {
    navEngine?.registerNode({ id: nodeId, ref });

    return (): void => {
      navEngine?.unregisterNode(nodeId)
    };
  }, [ref, navEngine, nodeId]);

  const isFocused = false;

  return { setRef, isFocused };
}
