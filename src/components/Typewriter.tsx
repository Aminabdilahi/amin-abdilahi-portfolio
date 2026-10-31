import { useEffect, useRef, useState } from "react";

export function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setHasStarted(true);
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || visibleCharacters >= text.length) return;
    const timer = window.setTimeout(() => setVisibleCharacters((count) => count + 1), speed);
    return () => window.clearTimeout(timer);
  }, [hasStarted, speed, text.length, visibleCharacters]);

  return <span ref={textRef}>{text.slice(0, visibleCharacters)}<span className="cursor">▋</span></span>;
}

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const characterSize = 15;
    const characters = "01{}<>/=;()[]$#";
    let columns: number[] = [];
    let frameId = 0;
    let lastFrame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Array.from({ length: Math.ceil(canvas.width / characterSize) }, () => Math.random() * -35);
    };
    const draw = (time: number) => {
      if (time - lastFrame > 70) {
        context.fillStyle = "rgba(7, 17, 31, 0.10)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#69d4ff";
        context.font = `${characterSize}px ui-monospace, monospace`;
        columns.forEach((position, index) => {
          context.fillText(characters[Math.floor(Math.random() * characters.length)] ?? "0", index * characterSize, position * characterSize);
          columns[index] = position * characterSize > canvas.height && Math.random() > 0.975 ? 0 : position + 1;
        });
        lastFrame = time;
      }
      frameId = window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    frameId = window.requestAnimationFrame(draw);
    return () => { window.cancelAnimationFrame(frameId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas className="code-rain" ref={canvasRef} aria-hidden="true" />;
}
