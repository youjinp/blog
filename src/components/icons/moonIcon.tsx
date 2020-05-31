import React from "react";

export const MoonIcon = (props: { height: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120.12 120.75"
    height={props.height ? props.height : "50px"}
  >
    <path
      fill="currentColor"
      d="M93.9,82.86c-33,0-55.37-22.17-55.37-55.27,0-8.45,1.32-16.6,3.76-22.36a4.8,4.8,0,0,0,.49-2.15A3,3,0,0,0,39.7,0a7.15,7.15,0,0,0-2.34.49C15.09,9.72,0,33.84,0,59.33c0,35.06,27.2,61.43,62.3,61.43,25.78,0,49.71-15.77,57.37-36a7.3,7.3,0,0,0,.44-2.34,3.19,3.19,0,0,0-3.17-3.27,5.24,5.24,0,0,0-1.71.34A73.83,73.83,0,0,1,93.9,82.86Z"
    />
  </svg>
);
