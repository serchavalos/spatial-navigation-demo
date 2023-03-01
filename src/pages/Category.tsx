import { useMemo } from "react";
import { NavLink } from "../components/NavLink/NavLink";

export function Category(): JSX.Element {
  const imageSources = useMemo<string[]>(
    () => [
      "/images/coin.webp",
      "/images/mushroom.webp",
      "/images/star.webp",
      "/images/yoshi-egg.webp"
    ],
    []
  );
  const random = Math.floor(Math.random() * imageSources.length);

  return (
    <section className="App">
      <h1>Surprise!</h1>
      <p>
        <img className="super-power__image" src={imageSources[random]} />
      </p>
      <p>
        <NavLink to="/">Go back</NavLink>
      </p>
    </section>
  );
}
