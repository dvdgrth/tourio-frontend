import React, { useEffect, useState, useCallback, useRef } from "react";

export default function Loading({ loadingMessage }) {
  const msg =
    loadingMessage ||
    "Loading...   | Still loading...   |Guess what? We are still loading...   |This is taking rather long, isn't it?   |What the hell are they doing in there?   |This is unprofessional and unacceptable...   |Well, well...   |Do you want a drink?   |I am speechless, what an embarrassment.   |Let's just count till forever:    |";
  const [nChar, setNChar] = useState(0);
  const [currentText, setCurrentText] = useState("⌛ ");
  const nCharRef = useRef(nChar);
  nCharRef.current = nChar;

  const nextChar = useCallback(() => {
    if (nCharRef.current >= msg.length) {
      setNChar(nCharRef.current + 1);
      setCurrentText(nCharRef.current);
      setTimeout(() => nextChar, 100);
    } else {
      if (msg[nCharRef.current] === "|") {
        setCurrentText("⌛ ");
      } else {
        setCurrentText(currentText + msg[nCharRef.current]);
      }
      setNChar(nCharRef.current + 1);
      setTimeout(() => nextChar, 50);
    }
  }, [currentText, msg]);

  useEffect(() => {
    const timer = setTimeout(nextChar, 50);
    return () => clearTimeout(timer);
  }, [nextChar]);

  return <div>{currentText}</div>;
}
