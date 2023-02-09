import { Option } from "../Option/Option";

import "./Grid.styles.css";

type GridProps = {
  length?: number;
};

export function Grid({ length = 9 }: GridProps): JSX.Element {
  const optionLabels = new Array(length).fill(null).map((_, index) => index);

  return (
    <div className="grid">
      {optionLabels.map((label, index) => (
        <Option key={`option-${index}`}>{label}</Option>
      ))}
    </div>
  );
}
