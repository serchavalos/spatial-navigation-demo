import React, { PropsWithChildren } from "react";
import { useRegisterNavContainer } from "../hooks";
import { AncestorIdContext } from "../ancestor-id-context";
import { NavContainerAttributes } from "../types";

type Props = PropsWithChildren<NavContainerAttributes>;

export function NavContainer({ cycle, children }: Props) {
  const { nodeId } = useRegisterNavContainer({ cycle });

  return (
    <AncestorIdContext.Provider value={nodeId}>
      {children}
    </AncestorIdContext.Provider>
  );
}
