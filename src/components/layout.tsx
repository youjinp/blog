import React, { ReactNode } from "react";
import { Link, PageRendererProps } from "gatsby";

import { rhythm, scale } from "../utils/typography";

const Layout = (
  props: PageRendererProps & { title: string; children: ReactNode }
) => {
  const rootPath = "/";
  let header;

  if (props.location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          {props.title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: "Montserrat, sans-serif",
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          {props.title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{props.children}</main>
      <footer />
    </div>
  );
};

export default Layout;
