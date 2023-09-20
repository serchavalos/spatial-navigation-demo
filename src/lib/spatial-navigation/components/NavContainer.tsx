import React, { PropsWithChildren } from "react";
import { useRegisterNode } from "../hooks";
import { NavNodeContext } from "../nav-node-context";
import { NavNodeAttributes } from "../types";

type Props = PropsWithChildren<NavNodeAttributes>;

export function NavContainer({ cycle, children }: Props) {
  const { nodeId } = useRegisterNode({ cycle });

  return (
    <NavNodeContext.Provider value={nodeId}>{children}</NavNodeContext.Provider>
  );
}
