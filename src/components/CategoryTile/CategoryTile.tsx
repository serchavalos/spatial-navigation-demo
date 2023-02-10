import { PropsWithChildren } from "react";

import { useFocusRef } from "../../lib/spatial-navigation";

import "./CategoryTile.styles.css";

type CategoryTileProps = {
  color: string;
  onClick: VoidFunction;
} & PropsWithChildren;

export function CategoryTile({
  color,
  onClick,
  children
}: CategoryTileProps): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <div
      ref={setRef}
      onClick={onClick}
      className={`category-tile${isFocused ? " category-tile--focused" : ""}`}
      style={isFocused ? { background: color } : {}}
    >
      {children}
    </div>
  );
}
