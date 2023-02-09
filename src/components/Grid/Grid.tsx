import { Option } from "../Option/Option";

import "./Grid.styles.css";

type GridProps = {
  length?: number;
};

export function Grid({ length = 9 }: GridProps): JSX.Element {
  const optionLabels = Array.from(Array(length).keys()).map(
    (_, index) => `option ${index + 1}`
  );

  return (
    <div className="grid">
      {optionLabels.map((label, index) => (
        <Option key={`option-${index}`}>{label}</Option>
      ))}
    </div>
  );
}
