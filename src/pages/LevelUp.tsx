import { Layout } from "../components/Layout";
import { NavLink } from "../components/NavLink";
import { QuestionBox } from "../components/QuestionBox";
import { NavContainer } from "../lib/spatial-navigation";

import "./LevelUp.styles.css";

export function LevelUp(): JSX.Element {
  const boxes = new Array(5).fill(null);

  return (
    <Layout title="Level up!" className="level-up">
      <section className="level-up-grid">
        <div className="level-up-labels">
          <h2>normal:</h2>
        </div>

        {boxes.map((_, index) => (
          <QuestionBox key={`level-up-${index}`} />
        ))}
        <div className="level-up-labels">
          <h2>circular:</h2>
        </div>
        <NavContainer cycle="horizontal">
          {boxes.map((_, index) => (
            <QuestionBox key={`level-up-${index}`} />
          ))}
        </NavContainer>
      </section>
      <p>
        <NavLink to="/">Back</NavLink>
      </p>
    </Layout>
  );
}
