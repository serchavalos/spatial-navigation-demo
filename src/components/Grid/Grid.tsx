import { useNavigate } from "react-router-dom";

import { CategoryTile } from "../CategoryTile/CategoryTile";

import "./Grid.styles.css";

export function Grid(): JSX.Element {
  const navigate = useNavigate();
  const categories = new Array(25).fill(null).map((_, index) => ({
    categoryId: index + 1,
    label: `category ${index + 1}`
  }));

  return (
    <div className="grid">
      {categories.map(({ categoryId, label }) => (
        <CategoryTile
          key={`category-${categoryId}`}
          onClick={() => navigate(`/category/${categoryId}`)}
        >
          <h3>{label}</h3>
        </CategoryTile>
      ))}
    </div>
  );
}
