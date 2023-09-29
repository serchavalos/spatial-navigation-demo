import React, { PropsWithChildren } from "react";
import { NavEngine, NavEngineContext } from "../nav-engine";
import { AncestorIdContext } from "../ancestor-id-context";

type Props = PropsWithChildren<{
  navEngine: NavEngine;
}>;

export function SpatialNavigationProvider({ navEngine, children }: Props) {
  return (
    <NavEngineContext.Provider value={navEngine}>
      <AncestorIdContext.Provider value="root">
        {children}
      </AncestorIdContext.Provider>
    </NavEngineContext.Provider>
  );
}
