import React, { ReactNode } from "react";
import { Link, PageRendererProps } from "gatsby";

import { Helmet } from "react-helmet";
import { rhythm, scale } from "../utils/typography";

const Layout = (
  props: PageRendererProps & { title: string; children: ReactNode }
) => {
  const rootPath = "/";

  const linkDisplay = (
    <Link
      style={{
        boxShadow: "none",
        color: "inherit",
      }}
      to="/"
    >
      {props.title}
    </Link>
  );

  const bigHeader = (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
      }}
    >
      {linkDisplay}
    </h1>
  );

  const smallHeader = (
    <h3
      style={{
        fontFamily: "Montserrat, sans-serif",
        marginTop: 0,
      }}
    >
      {linkDisplay}
    </h3>
  );


  return (
    <>
      <Helmet>
        <link href="/fonts/freightSansPro/stylesheet.css" rel="stylesheet" type="text/css" />
      </Helmet>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{props.location.pathname === rootPath ? bigHeader : smallHeader}</header>
        <main>{props.children}</main>
        <footer />
      </div>
    </>
  );
};

export default Layout;
