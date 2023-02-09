import React, { PropsWithChildren, useRef } from "react";

import { useFocusRef } from "../../lib/spatial-navigation";

import "./Option.styles.scss";

type OptionProps = {} & PropsWithChildren;

export function Option({ children }: OptionProps): JSX.Element {
  const { ref, isFocused } = useFocusRef();

  return (
    <span ref={ref} className={`option ${isFocused ? "option--focused" : ""}`}>
      {children}
    </span>
  );
}
