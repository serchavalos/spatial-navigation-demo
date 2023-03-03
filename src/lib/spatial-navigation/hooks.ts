import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import uniqid from "uniqid";

import { NavNodesContext } from "./nav-engine";

type FocusRef = {
  setRef: (node: HTMLElement | null) => void;
  isFocused: boolean;
};

export function useFocusRef(): FocusRef {
  const ref = useRef<HTMLElement | null>(null);
  const nodeId = useMemo(() => uniqid(), []);
  const navEngine = useContext(NavNodesContext);

  const setRef = useCallback((node: HTMLElement | null): void => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (ref?.current) {
      navEngine?.registerNode({ id: nodeId, ref: ref?.current });
    }

    return (): void => {
      navEngine?.unregisterNode(nodeId);
    };
  }, [ref, navEngine, nodeId]);

  return { setRef, isFocused: false };
}
