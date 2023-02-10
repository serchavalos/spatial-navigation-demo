import { useCallback, useContext, useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { NavEngine, NavNodesContext } from "./nav-engine";

type FocusRef = {
  setRef: (node: HTMLElement | null) => void;
  isFocused: boolean;
};

function useNavNodeFocus(
  engine: NavEngine | undefined,
  nodeId: string
): boolean {
  const [isFocused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (!engine) {
      setFocused(false);
      return undefined;
    }

    if (engine.isFocused(nodeId)) {
      setFocused(true);
    }

    const unsubscribe = engine.subscribe(() => {
      if (!mounted) {
        return;
      }

      setFocused(engine.isFocused(nodeId));
    });

    return (): void => {
      mounted = false;
      unsubscribe();
    };
  }, [engine, nodeId]);

  return isFocused;
}

export function useFocusRef(): FocusRef {
  const ref = useRef<HTMLElement | null>(null);
  const navEngine = useContext(NavNodesContext);
  const nodeId = uniqid();

  const setRef = useCallback(
    (node: HTMLElement | null): void => {
      ref.current = node;
    },
    [navEngine]
  );

  // REVIEW: why is this running 2 times?
  useEffect(() => {
    navEngine?.registerNode({ id: nodeId, ref });

    return (): void => {
      navEngine?.unregisterNode(nodeId);
    };
  }, [ref, navEngine, nodeId]);

  const isFocused = useNavNodeFocus(navEngine, nodeId);

  return { setRef, isFocused };
}
