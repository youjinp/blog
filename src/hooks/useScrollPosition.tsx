
// https://github.com/n8tb1t/use-scroll-position
import {
  useRef, useLayoutEffect, DependencyList, MutableRefObject, useEffect
} from "react";

const isBrowser = typeof window !== "undefined";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function getScrollPosition(props: {
    element?: MutableRefObject<HTMLElement | null>,
    useWindow?: boolean,
}) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = props.element ? props.element.current : document.body;

  if (!target) return { x: 0, y: 0 };
  const position = target.getBoundingClientRect();

  return props.useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export const useScrollPosition = (
  effect: (props: ScrollProps) => void,
  deps?: DependencyList,
  element?: MutableRefObject<HTMLElement | null>,
  useWindow?: boolean,
  wait?: number
) => {
  const position = useRef(getScrollPosition({ useWindow }));

  let throttleTimeout: NodeJS.Timeout | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    // console.log("currPos: ", currPos);
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
};

interface ScrollProps {
    prevPos: {
        x: number;
        y: number;
    },
    currPos: {
        x: number;
        y: number;
    }
}
