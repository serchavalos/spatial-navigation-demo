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
import { AncestorIdContext } from "./ancestor-id-context";
import { NavContainerAttributes } from "./types";

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

export function useRegisterNavContainer(attr?: NavContainerAttributes) {
  const nodeId = useMemo(() => uniqid(), []);
  const navEngine = useContext(NavEngineContext);
  const ancestorId = useContext(AncestorIdContext);

  useEffect(() => {
    navEngine?.registerNode({
      id: nodeId,
      ancestorId,
      attr
    });

    return (): void => {
      navEngine?.unregisterNode(nodeId);
    };
  }, [navEngine, nodeId]);

  return { nodeId };
}

export function useFocusRef(): FocusRef {
  const nodeId = useMemo(() => uniqid(), []);
  const ref = useRef<HTMLElement | null>(null);
  const navEngine = useContext(NavEngineContext);
  const ancestorId = useContext(AncestorIdContext);
  const isFocused = useNodeFocus(nodeId);

  const setRef = useCallback((node: HTMLElement | null): void => {
    ref.current = node;
  }, []);

  useEffect(() => {
    navEngine?.registerNode({
      id: nodeId,
      ref: ref?.current ?? undefined,
      ancestorId
    });

    return (): void => {
      navEngine?.unregisterNode(nodeId);
    };
  }, [ref, navEngine, nodeId]);

  return { setRef, isFocused };
}
