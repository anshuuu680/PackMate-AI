import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Typewriter({ text = "", speed = 30 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
}
