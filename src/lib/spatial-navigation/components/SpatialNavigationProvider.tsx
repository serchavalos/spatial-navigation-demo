import React, { PropsWithChildren } from "react";
import { NavEngine, NavEngineContext } from "../nav-engine";
import { ParentIdContext } from "../parent-id-context";

type Props = PropsWithChildren<{
  navEngine: NavEngine;
}>;

export function SpatialNavigationProvider({ navEngine, children }: Props) {
  return (
    <NavEngineContext.Provider value={navEngine}>
      <ParentIdContext.Provider value="root">
        {children}
      </ParentIdContext.Provider>
    </NavEngineContext.Provider>
  );
}
