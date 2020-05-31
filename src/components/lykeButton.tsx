import React, { useState, useEffect, useRef } from "react";
import { keyframes, css } from "@emotion/core";
import { useStateWithLocalStorage } from "../hooks/useStateWithLocalStorage";

// constants
const lykeDuration = 1000;
const lykeDurationCSS = "1s";

const clamp = (val: number, lower: number, upper: number) => Math.max(Math.min(val, upper), lower);

const easeOutFactory = (k: number) => {
  // there's a discontinuity at k = 0 that
  // doesn't make sense from a usability perspective
  // So patch it over.
  const newK = (k === 0) ? 1e-7 : k;

  function sigmoid(t: number) {
    return (1 / (1 + Math.exp(-newK * t))) - 0.5;
  }

  return function (t: number) {
    const newT = clamp(t, 0, 1);
    return sigmoid(newT) / sigmoid(1);
  };
};

const easeOut = easeOutFactory(4);

export const LykeButton = (props: {
  lykesKey: string,
  direction?: "row" | "column",
  size?: number, color?: string,
  lykes?: number,
  lyked?: boolean,
  onLyked?: () => void,
  onSetLykes?: (lykes: number)=>void,
}) => {
  // props
  const direction = props.direction ? props.direction : "column";
  const size = props.size ? props.size : 56;
  const color = props.color ? props.color : "black";

  // states
  const [lykes, setLykes] = useState(props.lykes ? props.lykes : 0);
  const [lyked, setLyked] = useStateWithLocalStorage("hasLyked");

  // ui states
  const [lyking, setLyking] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [animationBeforeHalfway, setAnimationBeforeHalfway] = useState(
    true
  );
  const [textOpacity, setTextOpacity] = useState(1);

  // references
  // const initiatedLykesRef = useRef(false);
  // const receivedLykesFromPropsRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = React.useRef<number | null>(null); //
  const beginningTimeRef = useRef<number | null>(null);

  // initiate lykes
  useEffect(() => {
    // if this is not a managed component
    if (props.lykes === undefined) {
      const getLykes = async () => {
        try {
          const r = await fetch(
            `https://api.lykes.io/v0/lykes?key=${props.lykesKey}`,
            {
              // fetch("https://reqres.in/api/users?page=2", {
              // method: "POST", // *GET, POST, PUT, DELETE, etc.
              method: "GET",
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
                // ...headers
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              // body, // body data type must match "Content-Type" header
            }
          );

          if (!r.ok) {
            const e = await r.json();
            console.log(e);
          } else {
            const b = await r.json();
            setLykes(b.count);
            if (props.onSetLykes) {
              props.onSetLykes(b.count);
            }
          }
        } finally {
          // do nothing
          // initiatedLykesRef.current = true;
        }
      };
      getLykes();
    }
  }, []);

  // inform parent when lyked
  useEffect(() => {
    if (lyked === "true" && props.onLyked) {
      props.onLyked();
    }
  }, [lyked]);

  // // inform parent when lyked
  // useEffect(() => {
  //   // if lyked is updated, and is not from parent, then inform
  //   if (!receivedLykesFromPropsRef.current && lyked) {
  //     if (props.onLyked) { props.onLyked(); }
  //   }
  // }, [lyked]);

  // // update lykes from props
  // useEffect(() => {
  //   // only receive from parent once initated
  //   if (initiatedLykesRef.current) {
  //     if (props.lykes !== undefined) {
  //       receivedLykesFromPropsRef.current = true;
  //       setLyked("true");
  //       setLykes(props.lykes);
  //     }
  //   }
  // }, [props.lykes]);

  // function
  const animateLykeCounterFade = (time: number) => {
    // 1 time unit ~ 1ms
    if (beginningTimeRef.current) {
      const totalDelta = time - beginningTimeRef.current;
      let opacity = 1;
      if (totalDelta < 500) {
        const x = totalDelta / 500;
        opacity = 1 - easeOut(x);
      } else {
        if (animationBeforeHalfway) {
          setAnimationBeforeHalfway(false);
        }
        const x = (totalDelta - 500) / 500;
        opacity = easeOut(x);
      }

      opacity = clamp(opacity, 0, 1);
      setTextOpacity(opacity);
    } else {
      beginningTimeRef.current = time;
    }

    // 1 frame ~ 1 ms
    animationFrameRef.current = requestAnimationFrame(
      animateLykeCounterFade
    );
  };

  // handlers
  const onLyke = async () => {
    if (props.lykes !== undefined && props.onSetLykes) {
      props.onSetLykes(props.lykes + 1);
    } else {
      setLykes(lykes + 1);
      if (props.onSetLykes) {
        props.onSetLykes(lykes + 1);
      }
    }

    setAnimating(true);
    setAnimationBeforeHalfway(true);
    animationFrameRef.current = requestAnimationFrame(
      animateLykeCounterFade
    );
    setTimeout(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAnimating(false);
    }, 1000);
    try {
      const r = await fetch("https://api.lykes.io/v0/lykes", {
        // fetch("https://reqres.in/api/users?page=2", {
        // method: "POST", // *GET, POST, PUT, DELETE, etc.
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // ...headers
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          key: props.lykesKey,
        }), // body data type must match "Content-Type" header
      });

      if (!r.ok) {
        const e = await r.json();
        console.log(e);
      } else {
        const b = await r.json();
        setLykes(b.count);
      }
    } finally {
      // do nothing
    }
  };

  const onMouseEnter = async () => {
    if (!(lyked === "true")) {
      timeoutRef.current = setTimeout(() => {
        if (props.lyked !== undefined && props.onLyked) {
          props.onLyked();
        } else {
          setLyked("true");
          if (props.onLyked) {
            props.onLyked();
          }
        }
        setLyking(false);
        onLyke();
      }, lykeDuration);
      setLyking(true);
    }
  };

  const onMouseLeave = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLyking(false);
  };

  const onTouchStart = async () => {
    if (!(lyked === "true")) {
      timeoutRef.current = setTimeout(() => {
        if (props.lyked !== undefined && props.onLyked) {
          props.onLyked();
        } else {
          setLyked("true");
          if (props.onLyked) {
            props.onLyked();
          }
        }
        setLyking(false);
        onLyke();
      }, lykeDuration);
      setLyking(true);
    }
  };

  const onTouchEnd = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLyking(false);
  };

  const onTouchCancel = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLyking(false);
  };

  // displays
  const bounceAnimation = keyframes`
    0% {
        transform: scale(1.2);
        opacity:1
    }

    50% {
        transform: scale(1.8);
        opacity:0.7
    }

    60% {
        transform: scale(0.6);
        opacity:1
    }

    100% {
        transform:scale(1)
    }
  `;

  const dontMoveDisplay = (opacity?: string | number) => (
    <div
      style={{
        fontSize: "18px",
        display: "block",
        lineHeight: direction === "column" ? "19px" : undefined,
        width: direction === "column" ? "50px" : undefined,
        marginTop: direction === "column" ? "4px" : 0,
        textAlign: "center",
        fontFamily: "freight-sans-pro, sans-serif",
        fontWeight: 700,
        opacity,
      }}
    >
      Don&apos;t move
    </div>
  );

  const innerCircleDisplay = (
    <div
      css={css({
        backgroundColor: color,
        transform: `scale(${
          (props.lyked !== undefined
            ? props.lyked
            : lyked === "true") || lyking
            ? 1
            : 0.3
        })`,
        height: `${size * 0.88}px`,
        width: `${size * 0.88}px`,
        borderRadius: "100%",
        transition: `all ${lykeDurationCSS} ease-out`,
        animation: (
          props.lyked !== undefined
            ? props.lyked
            : lyked === "true"
        )
          ? `${bounceAnimation} 1s`
          : undefined,
      })}
      id="filling"
    />
  );

  const touchCircleDisplay = (
    <div
      aria-hidden
      css={css({
        border: `3px solid ${color}`,
        borderRadius: "100%",
        height: `${size}px`,
        width: `${size}px`,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onClick={onLyke}
    >
      {innerCircleDisplay}
    </div>
  );

  const numberOfLikesDisplay = (opacity?: string | number) => (
    <div
      style={{
        fontSize: "22px",
        lineHeight: direction === "column" ? "25px" : undefined,
        fontWeight: 700,
        fontFamily: "freight-sans-pro, sans-serif",
        textAlign: "center",
        opacity,
      }}
    >
      {props.lykes !== undefined ? props.lykes : lykes}
    </div>
  );

  const likesDisplay = (opacity?: string | number) => (
    <div
      style={{
        textTransform: "uppercase",
        letterSpacing: "1px",
        lineHeight: direction === "column" ? "15px" : undefined,
        fontFamily: "freight-sans-pro, sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        textAlign: "center",
        opacity,
      }}
    >
      Likes
    </div>
  );

  const lykesDisplay = (
    <>
      <div
        style={{
          // display: "flex", flexDirection: direction,
          // justifyContent: "center", alignItems: "center"
          display: "grid",
          gridAutoFlow: direction,
          gridColumnGap: "12px",
          gridRowGap: "4px",
          alignItems: "center",
          justifyContent: direction === "row" ? "start" : "center",
          gridTemplateColumns:
                  direction === "row" ? "auto auto auto" : undefined,
          gridTemplateRows:
                  direction === "column" ? "1fr auto auto" : undefined,
        }}
      >
        {touchCircleDisplay}
        {lyking || (animating && animationBeforeHalfway) ? (
          <>{dontMoveDisplay(animating ? textOpacity : undefined)}</>
        ) : (
          <>
            {numberOfLikesDisplay(animating ? textOpacity : undefined)}
            {likesDisplay(animating ? textOpacity : undefined)}
          </>
        )}
      </div>
    </>
  );

  return <>{lykesDisplay}</>;
};

export const FloatingLykesDisplay = (props: {
         lykesKey: string;
         hide: boolean;
         size?: number;
         color?: string;
         lykes?: number;
         lyked?: boolean;
         onLyked?: () => void;
         onSetLykes?: (lykes: number) => void;
       }) => (
         <div
           css={css({
             position: "fixed",
             right: "15px",
             bottom: "5px",
             display: "flex",
             flexDirection: "column",
             justifyContent: "center",
             alignItems: "center",
             opacity: props.hide ? 0 : 1,
             transform: `${
               props.hide ? "scale(0.8) translate(100px)" : "scale(0.8)"
             }`,
             transition: "all 0.5s cubic-bezier(0.165, 0.63, 0.14, 0.82)",
             "&:hover": css({
               transform: "scale(1)",
             }),
           })}
         >
           <LykeButton
             lykesKey={props.lykesKey}
             direction="column"
             size={props.size}
             color={props.color}
             lykes={props.lykes}
             lyked={props.lyked}
             onLyked={props.onLyked}
             onSetLykes={props.onSetLykes}
           />
         </div>
);
