import { useNavigate } from "react-router-dom";

import { CategoryTile } from "../CategoryTile/CategoryTile";

import "./Grid.styles.css";

const colors = [
  "#1C3144",
  "#D00000",
  "#FFBA08",
  "#A2AEBB",
  "#3F88C5",
  "#75DDDD",
  "#508991",
  "#172A3A",
  "#474056"
];

const exampleTiles = colors.map((color, i) => {
  const categoryId: number = i + 1;

  return {
    categoryId,
    color: color,
    label: `category ${categoryId}`
  };
});

export function Grid(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="grid">
      {exampleTiles.map(({ categoryId, label, color }) => (
        <CategoryTile
          color={color}
          key={`category-${categoryId}`}
          onClick={() => navigate(`/category/${categoryId}`)}
        >
          <h3>{label}</h3>
        </CategoryTile>
      ))}
    </div>
  );
}
