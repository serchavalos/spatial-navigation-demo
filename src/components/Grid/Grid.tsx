import { QuestionBox } from "../QuestionBox/QuestionBox";

import "./Grid.styles.css";

export function Grid(): JSX.Element {
  const categories = new Array(25).fill(null).map((_, index) => ({
    categoryId: index + 1
  }));

  return (
    <div className="grid">
      {categories.map(({ categoryId }) => (
        <QuestionBox
          categoryId={`${categoryId}`}
          key={`category-${categoryId}`}
        />
      ))}
    </div>
  );
}
