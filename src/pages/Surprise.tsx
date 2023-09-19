import { useMemo } from "react";
import { Layout } from "../components/Layout";
import { NavLink } from "../components/NavLink";

import "./Surprise.styles.css";

export function Surprise(): JSX.Element {
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
    <Layout title="Surprise!">
      <p className="super-power">
        <img className="super-power__image" src={imageSources[random]} />
      </p>
      <p>
        <NavLink to="/">Go back</NavLink>
      </p>
    </Layout>
  );
}
