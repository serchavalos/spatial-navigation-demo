import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import { useFocusRef } from "../../lib/spatial-navigation";

import "./NavLink.styles.css";

type NavLink = Pick<LinkProps, "to"> & PropsWithChildren;

export function NavLink({ to, children }: NavLink): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <Link
      ref={setRef}
      className={`link${isFocused ? " link--focused" : ""}`}
      to={to}
    >
      {children}
    </Link>
  );
}
