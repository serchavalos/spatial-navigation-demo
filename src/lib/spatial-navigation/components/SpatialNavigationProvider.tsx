import React, { PropsWithChildren } from "react";
import { NavEngine, NavEngineContext } from "../nav-engine";
import { NavNodeContext } from "../nav-node-context";

type Props = PropsWithChildren<{
  navEngine: NavEngine;
}>;

export function SpatialNavigationProvider({ navEngine, children }: Props) {
  return (
    <NavEngineContext.Provider value={navEngine}>
      <NavNodeContext.Provider value="root">{children}</NavNodeContext.Provider>
    </NavEngineContext.Provider>
  );
}
