// https://www.robinwieruch.de/local-storage-react

import React, { useEffect } from "react";

export const useStateWithLocalStorage = (localStorageKey: string):
[string, (v: string)=>void] => {
  const [value, _setValue] = React.useState("");

  // get from local storage once mounted
  // otherwise gatsby fails
  useEffect(() => {
    _setValue(localStorage.getItem(localStorageKey) || "");
  }, []);

  const setValue = (v: string) => {
    localStorage.setItem(localStorageKey, v);
    _setValue(v);
  };

  return [value, setValue];
};
