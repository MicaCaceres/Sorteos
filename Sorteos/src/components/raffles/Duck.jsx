"use client";

import { useEffect, useState } from "react";
import "../../css/duck-race.css";

export default function Duck({ name, position, laneHeight }) {
  const [bobbing, setBobbing] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBobbing((prev) => (prev + 1) % 10);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const bobbingOffset = Math.sin(bobbing * 0.6) * 5;

  return (
    <div
      className="duck-container"
      style={{
        left: `${position}px`,
        top: `${laneHeight / 2 - 25 + bobbingOffset}px`,
      }}
    >
      <div className="duck-name">{name}</div>

      <div className="duck-wrapper">
        <div className="duck-body">
          <div className="duck-head">
            <div className="duck-eye"></div>
            <div className="duck-beak"></div>
          </div>
          <div className="duck-tail"></div>
          <div
            className="duck-foot duck-foot-front"
            style={{ transform: `rotate(${bobbing > 5 ? -20 : 10}deg)` }}
          ></div>
          <div
            className="duck-foot duck-foot-back"
            style={{ transform: `rotate(${bobbing > 5 ? 10 : -20}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
