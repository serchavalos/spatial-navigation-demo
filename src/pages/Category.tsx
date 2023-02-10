import { useParams } from "react-router-dom";
import { NavLink } from "../components/NavLink/NavLink";

export function Category(): JSX.Element {
  const { categoryId } = useParams();

  return (
    <div className="App">
      <h1>Category {categoryId}</h1>
      <h2>This is where I bore the hell out of you</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
        libero adipisci, voluptas ex dolores provident ab saepe quo magnam,
        nihil obcaecati sapiente id fugit ratione iusto minima, doloribus harum
        et.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
        libero adipisci, voluptas ex dolores provident ab saepe quo magnam,
        nihil obcaecati sapiente id fugit ratione iusto minima, doloribus harum
        et.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
        libero adipisci, voluptas ex dolores provident ab saepe quo magnam,
        nihil obcaecati sapiente id fugit ratione iusto minima, doloribus harum
        et.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
        libero adipisci, voluptas ex dolores provident ab saepe quo magnam,
        nihil obcaecati sapiente id fugit ratione iusto minima, doloribus harum
        et.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
        libero adipisci, voluptas ex dolores provident ab saepe quo magnam,
        nihil obcaecati sapiente id fugit ratione iusto minima, doloribus harum
        et.
      </p>
      <p>
        Got enough yet?
        <NavLink to="/">Go back</NavLink>
      </p>
    </div>
  );
}
