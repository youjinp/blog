/* eslint-disable react/no-danger */
// Gatsby supports TypeScript natively!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import { css } from "@emotion/core";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Query } from "../@types/graphql-types";
import {
  Spacing1, Spacing2, Spacing6, Spacing8
} from "../components/helpers/spacing";
import { useSmallScreen } from "../hooks/useWindowSize";
import { SunIcon } from "../components/icons/sunIcon";
import { useDarkMode } from "../context/darkModeContext";
import { MoonIcon } from "../components/icons/moonIcon";

const BlogIndex = (props: PageProps<Query>) => {
  // props
  const siteTitle = props.data.site!.siteMetadata!.title!;
  const posts = props.data.allMarkdownRemark.edges;

  // hooks
  const { isSmallScreen } = useSmallScreen();
  const { dark, toggleDark } = useDarkMode();

  // constants
  const transitionTiming = "all 0.5s cubic-bezier(0.165, 0.63, 0.14, 0.82)";

  // displays
  const navDisplay = () => (
    <>
      <nav
        css={css({
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 999,
          backgroundColor: "var(--bg)",
          height: "60px",
          display: "flex",
          alignItems: "center",
          color: "var(--primary)",
          transition: "background-color 500ms linear",
        })}
      >
        <div
          aria-hidden
          onClick={() => {
            toggleDark();
          }}
          css={css({
            position: "absolute",
            top: "16px",
            right: "16px",
            cursor: "pointer",
            opacity: dark ? 1 : 0,
            transition: transitionTiming,
            transform: isSmallScreen ? undefined : "translate(-15px, 15px)",
          })}
        >
          <SunIcon height="40px" />
        </div>
        <div
          aria-hidden
          onClick={() => {
            toggleDark();
          }}
          css={css({
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            opacity: dark ? 0 : 1,
            transition: transitionTiming,
            transform: isSmallScreen ? undefined : "translate(-15px, 15px)",
          })}
        >
          <MoonIcon height="30px" />
        </div>
      </nav>
    </>
  );
  const imageDisplay = (
    <figure css={css({
      borderRadius: "100%",
      border: "3px solid var(--primary)",
      height: "120px",
      width: "120px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    })}
    ><div css={css({
      borderRadius: "100%",
      backgroundColor: "var(--primary)",
      height: "106px",
      width: "106px",
    })}
    />
    </figure>
  );

  const titleDisplay = (
    <h1
      css={css({
        textTransform: "uppercase",
        fontSize: "30px",
        fontWeight: 900,
        lineHeight: "38px",
      })}
    >
      <Link to="/" style={{ border: "none" }}>
        youjin p
      </Link>
    </h1>
  );

  const descriptionDisplay = (
    <p css={css({
      fontSize: "20px",
      color: "var(--secondary)"
    })}
    >
      Hacker. Build first. Think later.
    </p>
  );

  const headerDisplay = (
    <div
      css={css({
        textAlign: "center",
      })}
    >
      {imageDisplay}
      <Spacing2 />
      {titleDisplay}
      <Spacing2 />
      {descriptionDisplay}
    </div>
  );

  const articleDisplay = (articleProps: {
    path: string;
    date: string;
    title: string;
    excerpt: string;
  }) => {
    const articleDateDisplay = (
      <small
        css={css({
          display: "block",
          width: "100%",
          fontWeight: 700,
          textTransform: "uppercase",
        })}
      >
        {articleProps.date}
      </small>
    );

    const articleTitleDisplay = (
      <h1 css={css({ fontSize: "36px", lineHeight: "38px", fontWeight: 700 })}>
        <Link to={articleProps.path} style={{ border: "none" }}>
          {articleProps.title}
        </Link>
      </h1>
    );

    const articleExcerptDisplay = (
      <Link to={articleProps.path} style={{ border: "none" }}>
        <p
          css={css({
            color: "var(--secondary)",
          })}
        >
          {articleProps.excerpt}
        </p>
      </Link>
    );

    const articleContinueButtonDisplay = (
      <Link
        to={articleProps.path}
        css={css({
          fontFamily: "proxima-nova",
          color: "var(--secondary)",
          fontSize: "16px",
          border: "1px solid var(--secondary)",
          padding: "10px 20px",
          borderRadius: "100px",
        })}
      >
        Continue reading ➝
      </Link>
    );

    const articleSeparator = (
      <div css={css({
        height: "1px",
        backgroundColor: "var(--separator)",
        width: "100vw",
        // position: "absolute",
        // bottm: "0",
      })}
      />
    );

    return (
      // use flex box so margin doesn't collapse
      <div key={articleProps.path}>
        <article>
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            })}
          >
            {articleDateDisplay}
            <Spacing1 />
            {articleTitleDisplay}
            {/* <Spacing2 /> */}
            {articleExcerptDisplay}
            <Spacing2 />
            {articleContinueButtonDisplay}
          </div>
        </article>
        <Spacing8 />
        {articleSeparator}
        <Spacing8 />
      </div>
    );
  };

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      {navDisplay()}
      <div
        css={css`
          margin-top: 80px;
          transform: ${!isSmallScreen ? "translateY(40px)" : undefined};
          transition: ${transitionTiming};
        `}
      >
        <header>{headerDisplay}</header>
        <section>
          <Spacing6 />
          {posts.map(({ node }) => articleDisplay({
            path: node.frontmatter!.path!,
            date: node.frontmatter!.date!,
            title: node.frontmatter!.title!,
            excerpt: node.excerpt || "",
          }))}
        </section>
        {/* <nav >
        <span></span>
        <span>
          <a rel="next" href="/page/2">
            Next →
          </a>
        </span>
      </nav> */}
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            path
          }
        }
      }
    }
  }
`;
