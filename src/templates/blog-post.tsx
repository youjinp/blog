/* eslint-disable react/no-danger */
import React, { useRef, useState } from "react";
import { Link, graphql, PageRendererProps } from "gatsby";
// import { DiscussionEmbed } from "disqus-react";

// import { Global } from "@emotion/core";
// import { Helmet } from "react-helmet";
import { css } from "@emotion/core";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Query, SitePageContext } from "../@types/graphql-types";
import { LykeButton, FloatingLykesDisplay } from "../components/lykeButton";
import { useSmallScreen } from "../hooks/useWindowSize";
import { useScrollPosition } from "../hooks/useScrollPosition";
import {
  Spacing1, Spacing2, Spacing4, Spacing8,
} from "../components/helpers/spacing";
import { SunIcon } from "../components/icons/sunIcon";
import { MoonIcon } from "../components/icons/moonIcon";
import { useDarkMode } from "../context/darkModeContext";
import { ClientOnly } from "../components/helpers/clientOnly";

const BlogPostTemplate = (
  props: PageRendererProps & { pageContext: SitePageContext; data: Query }
) => {
  // props
  const data = props.data!;
  const post = data.markdownRemark!;
  const excerpt = post.excerpt!;
  const frontmatter = post.frontmatter!;
  const title = frontmatter.title!;
  const html = post.html!;
  const siteTitle = data.site!.siteMetadata!.title!;
  const { previous, next } = props.pageContext;

  // state
  const [hideFloatingLyke, setHideFloatingLyke] = useState(false);
  // manage lykeButton state, because 2 of them are used
  const [lykes, setLykes] = useState(0);
  const [lyked, setLyked] = useState(false);

  // hooks
  const { isSmallScreen } = useSmallScreen();
  const { dark, toggleDark } = useDarkMode();

  // ref
  const lykeButtonRef = useRef<HTMLDivElement | null>(null);

  // effects
  // hide floating lyke if static lyke is within 50px of scroll
  // maybe scroll position not needed?
  useScrollPosition(() => {
    if (lykeButtonRef.current) {
      const lykeButtonDistanceFromTopOfViewPort = lykeButtonRef.current.getBoundingClientRect()
        .y;
      if (lykeButtonDistanceFromTopOfViewPort < window.innerHeight + 50) {
        if (!hideFloatingLyke) {
          setHideFloatingLyke(true);
        }
      } else if (hideFloatingLyke) {
        setHideFloatingLyke(false);
      }
    }
  });

  // const disqusConfig = {
  //   url: props.location.href,
  //   identifier: post.frontmatter!.path!,
  //   title,
  // };

  // const post = props.data.markdownRemark;
  // const siteTitle = props.data.site.siteMetadata.title;

  // constants
  const animationTiming = "transition: all 0.5s cubic-bezier( 0.165, 0.63, 0.14, 0.82 );";
  // displays
  const navDisplay = () => {
    const navCloseButtonDisplay = (
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 100%;
          height: 34px;
          width: 34px;
          margin-top: 10px;
          margin-left: 10px;
          transform: ${isSmallScreen ? undefined : "translate(15px, 15px)"};
          border: 3px solid var(--primary);
          transition-property: all;
          ${animationTiming}
        `}
      />
    );

    // transform: ${isSmallScreen ? undefined : "translate(calc(-50vw + 150px), 15px)"};
    const centerNavTitleDisplay = (
      <>
        <h2 css={css`
        text-transform: uppercase;
        margin: 0 auto;
        text-align: center;
        position: relative;
        font-weight: 900;
        opacity: ${isSmallScreen ? 1 : 0};
        ${animationTiming}
        `}
        ><Link to="/" style={{ border: "none" }}> Youjin P</Link>
        </h2>
      </>
    );

    const leftNavTitleDisplay = (
      <>
        <h2
          css={css`
            text-transform: uppercase;
            position: absolute;
            margin-left: 70px;
            font-weight: 900;
            transform: ${isSmallScreen ? undefined : "translate(15px, 15px)"};
            opacity: ${isSmallScreen ? 0 : 1};
            ${animationTiming}
          `}
        >
          <Link to="/" style={{ border: "none" }}>
            {" "}
            Youjin P
          </Link>
        </h2>
      </>
    );

    const sunIcon = (
      <div
        aria-hidden
        onClick={() => {
          toggleDark();
        }}
        css={css({
          position: "absolute",
          top: "12px",
          right: "12px",
          cursor: "pointer",
          opacity: dark ? 1 : 0,
          transition: animationTiming,
          transform: isSmallScreen ? undefined : "translate(-15px, 15px)",
        })}
      >
        <SunIcon height="35px" />
      </div>
    );

    const moonIcon = (
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
          opacity: dark ? 0 : 1,
          transition: animationTiming,
          transform: isSmallScreen ? undefined : "translate(-15px, 15px)",
        })}
      >
        <MoonIcon height="25px" />
      </div>
    );

    return (
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
            transition: "background-color 500ms linear",
          })}
        >
          {navCloseButtonDisplay}
          {leftNavTitleDisplay}
          {centerNavTitleDisplay}
          {sunIcon}
          {moonIcon}
        </nav>
      </>
    );
  };

  const dateDisplay = (
    <small
      css={css({
        fontWeight: 700,
        textTransform: "uppercase",
        display: "block",
      })}
    >
      {frontmatter.date}
    </small>
  );

  const titleDisplay = (
    <h1
      style={{
        fontSize: "33px",
        lineHeight: "35px",
        fontWeight: 700,
        marginBottom: 0,
      }}
    >
      <Link to={post.frontmatter!.path!} style={{ border: "none" }}>
        {frontmatter.title}
      </Link>
    </h1>
  );

  return (
    <>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={title} description={frontmatter.description || excerpt} />
        {navDisplay()}
        <section
          css={css`
            margin-top: 100px;
            transform: ${!isSmallScreen ? "translateY(30px)" : undefined};
            ${animationTiming}
          `}
        >
          <article>
            <header>
              {dateDisplay}
              <Spacing1 />
              {titleDisplay}
            </header>
            <Spacing2 />
            <section dangerouslySetInnerHTML={{ __html: html }} />
            <Spacing4 />
            <ClientOnly>
              <div
                ref={lykeButtonRef}
                css={css({
                  opacity: isSmallScreen || hideFloatingLyke ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.165, 0.63, 0.14, 0.82)",
                })}
              >
                <LykeButton
                  size={80}
                  lykesKey={post.frontmatter!.path!}
                  direction="row"
                  color="var(--primary)"
                  onLyked={() => {
                    setLyked(true);
                  }}
                  onSetLykes={(n: number) => {
                    setLykes(n);
                  }}
                />
              </div>
            </ClientOnly>
          </article>
        </section>
        <Spacing8 />
        <ClientOnly>
          <FloatingLykesDisplay
            lykesKey={post.frontmatter!.path!}
            hide={isSmallScreen || hideFloatingLyke}
            color="var(--primary)"
            lykes={lykes}
            lyked={lyked}
          />
        </ClientOnly>
        <nav>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.frontmatter!.path!} rel="prev">
                  ← {previous.frontmatter!.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.frontmatter!.path!} rel="next">
                  {next.frontmatter!.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        path
      }
    }
  }
`;
