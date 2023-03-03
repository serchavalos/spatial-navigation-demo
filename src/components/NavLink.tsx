import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

import "./NavLink.styles.css";

type NavLink = Pick<LinkProps, "to"> & PropsWithChildren;

export function NavLink({ to, children }: NavLink): JSX.Element {
  return (
    <Link className="link" to={to}>
      {children}
    </Link>
  );
}
