import React, { PropsWithChildren } from "react";
import { useRegisterNavContainer } from "../hooks";
import { NavNodeContext } from "../nav-node-context";
import { NavContainerAttributes } from "../types";

type Props = PropsWithChildren<NavContainerAttributes>;

export function NavContainer({ cycle, children }: Props) {
  const { nodeId } = useRegisterNavContainer({ cycle });

  return (
    <NavNodeContext.Provider value={nodeId}>{children}</NavNodeContext.Provider>
  );
}
