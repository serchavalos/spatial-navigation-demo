import { Link } from "react-router-dom";

import "./QuestionBox.styles.css";

export function QuestionBox(): JSX.Element {
  return (
    <Link className="question-box" to="/surprise">
      <img
        className="question-box__image"
        src="/images/question-mark-box.webp"
      ></img>
    </Link>
  );
}
