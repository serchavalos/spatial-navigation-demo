import { PropsWithChildren } from "react";

import "./Layout.styles.css";

type LayoutProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

export function Layout({ title, className, children }: LayoutProps) {
  return (
    <main className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </main>
  );
}
