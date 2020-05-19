import Typography from "typography";
import sternGroveTheme from "typography-theme-stern-grove";

sternGroveTheme.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    boxShadow: "none",
  },
});

delete sternGroveTheme.googleFonts;

const typography = new Typography(sternGroveTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
