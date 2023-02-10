import { CSSProperties, PropsWithChildren, useState } from "react";

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
  const [style, setStyle] = useState<CSSProperties>({});

  return (
    <div
      ref={setRef}
      onClick={onClick}
      onMouseOver={() => {
        setStyle({ background: color });
      }}
      onMouseOut={() => setStyle({})}
      className={`category-tile${isFocused ? " category-tile--hover" : ""}`}
      style={isFocused ? { background: color } : style}
    >
      {children}
    </div>
  );
}
