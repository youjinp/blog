import React from "react";

// don't render on ssr build
// otherwise will show as Desktop size
// https://stackoverflow.com/questions/58608523/gatsby-react-conditional-rendering-based-on-window-innerwidth-misbehaving
export const ClientOnly = (props: {children: React.ReactElement}): JSX.Element => (
  typeof window === "undefined" ? <></> : props.children);
