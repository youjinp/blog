/* eslint-disable react/no-danger */
// Gatsby supports TypeScript natively!
import React from "react";
import { PageProps, Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import { Query } from "../@types/graphql-types";

const BlogIndex = (props: PageProps<Query>) => {
  const siteTitle = props.data.site!.siteMetadata!.title!;
  const posts = props.data.allMarkdownRemark.edges;

  const article = (articleProps: {path: string, date: string, title: string, excerpt: string }) => {
    const title = (
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: "none" }} to={articleProps.path}>
          {articleProps.title}
        </Link>
      </h3>
    );

    return (
      <article key={articleProps.path}>
        <header>
          {title}
          <small>{articleProps.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: articleProps.excerpt || "",
            }}
          />
        </section>
      </article>
    );
  };

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => article({
        path: node.frontmatter!.path!,
        date: node.frontmatter!.date!,
        title: node.frontmatter!.title!,
        excerpt: node.excerpt || "",
      }))}
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
