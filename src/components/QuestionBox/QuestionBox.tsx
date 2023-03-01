import { Link } from "react-router-dom";
import { useFocusRef } from "../../lib/spatial-navigation";

import "./QuestionBox.styles.css";

export function QuestionBox({
  categoryId
}: {
  categoryId: string;
}): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <Link
      className={`question-box ${isFocused && "question-box-hover"}`}
      to={`/category/${categoryId}`}
    >
      <img
        ref={setRef}
        className="question-box__image"
        src="/images/question-mark-box.webp"
      ></img>
    </Link>
  );
}
