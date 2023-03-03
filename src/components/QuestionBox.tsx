import { Link } from "react-router-dom";
import { useFocusRef } from "../lib/spatial-navigation";

import "./QuestionBox.styles.css";

export function QuestionBox(): JSX.Element {
  const { setRef, isFocused } = useFocusRef();

  return (
    <Link className={`question-box ${isFocused && "hover"}`} to="/surprise">
      <img
        ref={setRef}
        className="question-box__image"
        src="/images/question-mark-box.webp"
      ></img>
    </Link>
  );
}
