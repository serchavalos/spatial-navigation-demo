import { PropsWithChildren } from "react";

import { useFocusRef } from "../../lib/spatial-navigation";

import "./CategoryTile.styles.css";

type CategoryTileProps = {
  onClick: VoidFunction;
} & PropsWithChildren;

export function CategoryTile({
  onClick,
  children
}: CategoryTileProps): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <div
      ref={setRef}
      onClick={onClick}
      className={`category-tile${isFocused ? " category-tile--hover" : ""}`}
    >
      {children}
    </div>
  );
}
