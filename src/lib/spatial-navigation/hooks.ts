import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import uniqid from "uniqid";

import { NavEngineContext } from "./nav-engine";
import { NavNodeContext } from "./nav-node-context";
import { NavNodeAttributes } from "./types";

type FocusRef = {
  setRef: (node: HTMLElement | null) => void;
  isFocused: boolean;
};

function useNodeFocus(nodeId: string): boolean {
  const navEngine = useContext(NavEngineContext);
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

export function useRegisterNode(attr?: NavNodeAttributes) {
  const ref = useRef<HTMLElement | null>(null);
  const nodeId = useMemo(() => uniqid(), []);
  const navEngine = useContext(NavEngineContext);
  const parentId = useContext(NavNodeContext);

  const setRef = useCallback((node: HTMLElement | null): void => {
    ref.current = node;
  }, []);

  useEffect(() => {
    navEngine?.registerNode({
      id: nodeId,
      ref: ref?.current ?? undefined,
      parentId,
      attr
    });

    return (): void => {
      navEngine?.unregisterNode(nodeId);
    };
  }, [ref, navEngine, nodeId]);

  return { nodeId, setRef };
}

export function useFocusRef(): FocusRef {
  const { setRef, nodeId } = useRegisterNode();
  const isFocused = useNodeFocus(nodeId);

  return { setRef, isFocused };
}
