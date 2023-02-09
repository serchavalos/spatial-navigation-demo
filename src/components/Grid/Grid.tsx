import React from "react";

import { Option } from "../Option/Option";
import "./Grid.styles.css";

export function Grid(): JSX.Element {
  const optionLabels = Array.from(Array(9).keys()).map(
    (_, index) => `option ${index + 1}`
  );
  console.log(optionLabels);
  return (
    <div className="grid">
      {optionLabels.map((label) => (
        <Option>{label}</Option>
      ))}
    </div>
  );
}
