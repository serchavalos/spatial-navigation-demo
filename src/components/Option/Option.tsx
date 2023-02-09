import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { useFocusRef } from "../../lib/spatial-navigation";

import "./Option.styles.css";

type OptionProps = {} & PropsWithChildren;

export function Option({ children }: OptionProps): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <Link
      ref={setRef}
      className={`option ${isFocused ? "option--focused" : ""}`}
      to="/category"
    >
      {children}
    </Link>
  );
}
