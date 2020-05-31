import React, { useState, useEffect } from "react";

const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const DarkModeContext = React.createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => window.matchMedia("(prefers-color-scheme: dark)").matches === true;

const defaultDark = true;

export const DarkModeProvider = (props: {children: React.ReactNode}) => {
  const [dark, setDark] = useState(defaultDark);

  const setDocumentBodyClass = (documentClassDark: boolean) => {
    if (!documentClassDark) {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      }
    } else {
      document.body.classList.add("dark");
    }
  };

  const toggleDark = () => {
    const d = !dark;
    localStorage.setItem("dark", JSON.stringify(d));
    setDark(d);
    setDocumentBodyClass(d);
  };

  useEffect(() => {
    // default
    let isDark = defaultDark;

    // from system
    const systemDarkMode = supportsDarkMode();
    if (systemDarkMode) {
      isDark = systemDarkMode;
    }

    // from local storage
    const s = localStorage.getItem("dark");
    if (s !== null && (s === "true" || s === "false")) {
      const lsDark = JSON.parse(s);
      isDark = lsDark;
    }

    // set state
    if (isDark !== defaultDark) {
      setDark(isDark);
    }
    setDocumentBodyClass(isDark);
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {props.children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
};
