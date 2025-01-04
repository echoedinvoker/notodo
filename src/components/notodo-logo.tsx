'use client';

import { useState } from "react";

interface NotodoLogoProps {
  className?: string;
  animate?: boolean;
}

export default function NotodoLogo({ className = "", animate = false }: NotodoLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onMouseEnter={() => animate && setIsHovered(true)}
      onAnimationEnd={() => setIsHovered(false)}
    >
      <g
        className={`transform-gpu ${isHovered ? "animate-flip" : ""}`}
        style={{ transformOrigin: "50px 50px" }}
      >
        <circle cx="50" cy="50" r="40" fill="#FF6B6B" />
        <line x1="25" y1="25" x2="75" y2="75" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <line x1="75" y1="25" x2="25" y2="75" stroke="white" strokeWidth="8" strokeLinecap="round" />
      </g>
      <text x="110" y="65" fontFamily="Arial" fontSize="48" fontWeight="bold" fill="#333333">
        notodo
      </text>
    </svg>
  );
}
