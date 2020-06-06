module.exports = {
  siteMetadata: {
    title: "Youjin P",
    description: "Youjin P",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-numbered-footnotes",
          {
            resolve: "gatsby-remark-footnotes",
            options: {
              footnoteBackRefPreviousElementDisplay: "inline",
              footnoteBackRefDisplay: "inline",
              footnoteBackRefInnerText: "^", // Defaults to: "↩"
              // use if you want the Wikipedia style ^ link without an underline beneath it
              footnoteBackRefAnchorStyle: "text-decoration: none;",
              // use "front" for Wikipedia style ^ links
              footnoteBackRefInnerTextStartPosition: "front",
              useFootnoteMarkerText: false, // Defaults to false
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    "gatsby-plugin-react-helmet",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    "gatsby-plugin-typescript",
    "gatsby-plugin-emotion",
    // link from markdown pages to other pages without refresh
    "gatsby-plugin-catch-links"
  ],
};
