/* eslint-disable react/no-danger */
import React, { useRef, useState } from "react";
import { Link, graphql, PageRendererProps } from "gatsby";
// import { DiscussionEmbed } from "disqus-react";

// import { Global } from "@emotion/core";
// import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import { Query, SitePageContext } from "../@types/graphql-types";
import { LykeButton, FloatingLykesDisplay } from "../components/lykeButton";
import { useSmallScreen } from "../hooks/useWindowSize";
import { useScrollPosition } from "../hooks/useScrollPosition";

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

  // hooks
  const { isSmallScreen } = useSmallScreen();

  // ref
  const lykeButtonRef = useRef<HTMLDivElement | null>(null);

  // effects
  // hide floating lyke if static lyke is within 50px of scroll
  // maybe scroll position not needed?
  useScrollPosition(() => {
    if (lykeButtonRef.current) {
      const lykeButtonDistanceFromTopOfViewPort = lykeButtonRef.current.getBoundingClientRect().y;
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

  console.log("path: ", post.frontmatter!.path!);
  // const post = props.data.markdownRemark;
  // const siteTitle = props.data.site.siteMetadata.title;

  return (
    <>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={title} description={frontmatter.description || excerpt} />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: "block",
                marginBottom: rhythm(1),
              }}
            >
              {frontmatter.date}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </article>
        <div ref={lykeButtonRef}>
          <LykeButton lykesKey={post.frontmatter!.path!} direction="row" />
        </div>
        <FloatingLykesDisplay lykesKey={post.frontmatter!.path!} right={isSmallScreen || hideFloatingLyke ? "-100px" : undefined} />
        {/* <DiscussionEmbed
        shortname={process.env.GATSBY_DISQUS_NAME!}
        config={disqusConfig}
      /> */}
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
