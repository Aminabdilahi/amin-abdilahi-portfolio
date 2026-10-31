import { useEffect, useState } from "react";

const bootLines = [
  "> initializing portfolio...",
  "> loading projects ........ [ok]",
  "> connecting to github .... [ok]",
  "> profile ready.",
];

export function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("portfolio-intro-seen")) setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible || lineCount >= bootLines.length) return;
    const timer = window.setTimeout(() => setLineCount((count) => count + 1), 280);
    return () => window.clearTimeout(timer);
  }, [isVisible, lineCount]);

  useEffect(() => {
    if (!isVisible || lineCount < bootLines.length) return;
    const timer = window.setTimeout(closeIntro, 850);
    return () => window.clearTimeout(timer);
  }, [isVisible, lineCount]);

  function closeIntro() {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    setIsClosing(true);
    window.setTimeout(() => setIsVisible(false), 450);
  }

  if (!isVisible) return null;

  return (
    <div className={`intro-screen ${isClosing ? "is-closing" : ""}`}>
      <div className="scanlines" />
      <div className="intro-content">
        {bootLines.slice(0, lineCount).map((line) => <p key={line}>{line}</p>)}
        <span className="cursor">▋</span>
        <div className="loading-track"><span style={{ width: `${(lineCount / bootLines.length) * 100}%` }} /></div>
      </div>
      <button className="skip-intro" onClick={closeIntro}>Skip intro</button>
    </div>
  );
}
