import React, { PropsWithChildren } from "react";
import { useRegisterNavContainer } from "../hooks";
import { ParentIdContext } from "../parent-id-context";
import { NavContainerAttributes } from "../types";

type Props = PropsWithChildren<NavContainerAttributes>;

export function NavContainer({ cycle, children }: Props) {
  const { nodeId } = useRegisterNavContainer({ cycle });

  return (
    <ParentIdContext.Provider value={nodeId}>
      {children}
    </ParentIdContext.Provider>
  );
}
