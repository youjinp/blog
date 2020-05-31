/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// custom typefaces
import React from "react";
import { DarkModeProvider } from "./src/context/darkModeContext";

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);
