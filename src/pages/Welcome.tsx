import { Layout } from "../components/Layout";
import { QuestionBox } from "../components/QuestionBox";

import "./Welcome.styles.css";

export function Welcome(): JSX.Element {
  const boxes = new Array(10).fill(null);

  return (
    <Layout title="Spatial Navigation Demo">
      <div className="question-box-grid">
        {boxes.map((_, index) => (
          <QuestionBox key={`question-box-${index}`} />
        ))}
      </div>
    </Layout>
  );
}
