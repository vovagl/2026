import { useEffect, useState } from "react";
import "./FlipNumber.css";

export default function FlipNumber({ value }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value === prev) return;

    setFlip(true);
    const timeout = setTimeout(() => {
      setPrev(value); // после анимации обновляем prev
      setFlip(false);
    }, 600); // длительность совпадает с CSS

    return () => clearTimeout(timeout);
  }, [value, prev]);

  return (
    <div className="flip-number">
      <div className={`flip-card ${flip ? "flip" : ""}`}>
        <div className="flip-front">{prev}</div>
        <div className="flip-back">{value}</div>
      </div>
    </div>
  );
}
