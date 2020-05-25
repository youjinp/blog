// https://www.robinwieruch.de/local-storage-react

import React from "react";

export const useStateWithLocalStorage = (localStorageKey: string):
[string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};
