import { Grid } from "../components/Grid/Grid";

export function Welcome(): JSX.Element {
  return (
    <div className="App">
      <h1>Spatial Navigation Demo</h1>
      <p>You the arrow (UP/DOWN/LEFT/RIGHT) to pick a category:</p>
      <Grid />
    </div>
  );
}
