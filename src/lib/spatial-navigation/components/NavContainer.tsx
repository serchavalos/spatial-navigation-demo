import React, { PropsWithChildren } from "react";
import { useRegisterNode } from "../hooks";
import { NavNodeContext } from "../nav-node-context";

export function NavContainer({ children }: PropsWithChildren) {
  const { nodeId } = useRegisterNode();

  return (
    <NavNodeContext.Provider value={nodeId}>{children}</NavNodeContext.Provider>
  );
}
