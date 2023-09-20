import { Layout } from "../components/Layout";
import { NavLink } from "../components/NavLink";
import { QuestionBox } from "../components/QuestionBox";
import { NavContainer } from "../lib/spatial-navigation";

import "./Welcome.styles.css";

export function LevelUp(): JSX.Element {
  const boxes = new Array(5).fill(null);

  return (
    <Layout title="Level up!">
      <section className="question-box-grid">
        {boxes.map((_, index) => (
          <QuestionBox key={`question-box-${index}`} />
        ))}
        <NavContainer cycle="horizontal">
          {boxes.map((_, index) => (
            <QuestionBox key={`question-box-${index}`} />
          ))}
        </NavContainer>
      </section>
      <p>
        <NavLink to="/">Back</NavLink>
      </p>
    </Layout>
  );
}
