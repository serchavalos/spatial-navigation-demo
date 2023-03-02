import { PropsWithChildren } from "react";

import "./Layout.styles.css";

type LayoutProps = PropsWithChildren<{
  title?: string;
}>;

export function Layout({ title, children }: LayoutProps) {
  return (
    <main className="App">
      <section className="main">
        {title && <h1>{title}</h1>}
        {children}
      </section>
    </main>
  );
}
