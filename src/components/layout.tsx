import React, { ReactNode } from "react";
import { PageRendererProps } from "gatsby";

import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/core";
// import { useDarkMode } from "../context/darkModeContext";
// import { rhythm, scale } from "../utils/typography";

const Layout = (
  props: PageRendererProps & { title: string; children: ReactNode }
) => {
  // constants
  const animationTiming = "all 0.5s cubic-bezier( 0.165, 0.63, 0.14, 0.82 )";

  // displays
  const globalStyle = (
    <Global
      styles={css`
        body {
          --bg: #ffffff;
          --primary: #000000;
          --secondary: #3c3c4399;
          --tertiary: #3c3c434d;
          --quarternary: #3c3c432e;
          --separator: #3c3c434a;

          background-color: var(--bg);
          color: var(--primary);
          font-family: proxima-nova, Helvetica, sans-serif;
          margin: 0;
          transition: background-color 500ms linear;
        }

        body.dark {
          -webkit-font-smoothing: antialiased;
          --bg: #000000;
          --primary: #ffffff;
          --secondary: #ebebf599;
          --tertiary: #ebebf54d;
          --quarternary: #ebebf52e;
          --separator: #545458a6;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "proxima-nova", "Helvetica", "Avenir", "Arial",
            sans-serif;
          color: var(--primary);
          margin: 0;
        }

        h1 a,
        h2 a,
        h3 a,
        h4 a,
        h5 a,
        h6 a {
          font-family: "freight-sans-pro", "Helvetica", "Avenir", "Arial",
            sans-serif;
          font-weight: inherit;
          color: inherit;
        }

        h1 {
          font-size: 25px;
          line-height: 35px;
          font-weight: 600;
        }

        h2 {
          font-size: 20px;
          font-weight: 600;
        }

        h3 {
          font-size: 19px;
          font-weight: 600;
        }

        h4 {
          font-size: 17px;
          font-weight: 600;
        }

        p {
          color: var(--secondary);
          font-size: 18px;
          line-height: 1.5;
          margin: 0;
        }

        li {
          color: var(--secondary);
          font-size: 18px;
          line-height: 1.5;
          margin: 0;
        }

        a {
          text-decoration: none;
          color: var(--secondary);
          border-bottom: 2px solid var(--tertiary);
          transition-property: ${animationTiming};
        }

        a:hover {
          color: var(--primary);
          border-bottom: 2px solid var(--primary);
        }

        small {
          font-family: freight-sans-pro, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 20px;
        }

        hr {
          border: 0;
        }

        article {
          padding-left: 10px;
          padding-right: 10px;
          margin: 0 auto;
          max-width: 600px;
        }

        @media only all and (max-width: 640px) and (orientation: landscape) {
          article {
            max-width: 460px;
          }
        }

        article p {
          margin-top: 16px;
          margin-bottom: 16px;
        }

        article h2,
        article h3,
        article h4,
        article h5,
        article h6 {
          margin-top: 24px;
          margin-bottom: 16px;
        }

        button {
          -webkit-appearance: none;
          padding: 0;
          border: 0;
          background-color: unset;
        }
      `}
    />
  );

  return (
    <>
      <Helmet>
        <link
          href="/fonts/freightSansPro/stylesheet.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/fonts/proximaNova/stylesheet.css"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      {globalStyle}
      <div>
        {/* <header>{props.location.pathname === rootPath ? bigHeader : smallHeader}</header> */}
        <main>{props.children}</main>
        <footer />
      </div>
    </>
  );
};

export default Layout;
