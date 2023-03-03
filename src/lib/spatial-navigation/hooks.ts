import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import uniqid from "uniqid";

import { NavNodesContext } from "./nav-engine";

type FocusRef = {
  setRef: (node: HTMLElement | null) => void;
  isFocused: boolean;
};

function useNodeFocus(nodeId: string): boolean {
  const navEngine = useContext(NavNodesContext);
  const [isFocused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (!navEngine) {
      setFocused(false);
      return undefined;
    }

    if (navEngine.isFocused(nodeId)) {
      setFocused(true);
    }

    const unsubscribe = navEngine.subscribe(() => {
      if (!mounted) {
        return;
      }

      setFocused(navEngine.isFocused(nodeId));
    });

    return (): void => {
      mounted = false;
      unsubscribe();
    };
  }, [navEngine, nodeId]);

  return isFocused;
}

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

  const isFocused = useNodeFocus(nodeId);

  return { setRef, isFocused };
}
