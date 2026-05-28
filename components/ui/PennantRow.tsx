"use client";
// A horizontal string of triangular pennant flags.
// Alternates through the camp color palette automatically.

const PENNANT_COLORS = ["#2d4a2b", "#c8553d", "#1e3a5f", "#d4a017", "#c8553d", "#2d4a2b", "#d4a017"];

interface Props {
  count?: number;
  className?: string;
}

export default function PennantRow({ count = 7, className = "" }: Props) {
  const flags = Array.from({ length: count });

  return (
    <svg
      viewBox={`0 0 ${count * 44} 52`}
      className={`w-full max-w-lg ${className}`}
      aria-hidden="true"
    >
      {/* Drape string */}
      <path
        d={`M0 8 ${flags.map((_, i) => `L${i * 44 + 22} 44`).join(" ")} L${count * 44} 8`}
        stroke="#2a2a2a"
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />

      {/* Pennant triangles */}
      {flags.map((_, i) => {
        const x = i * 44;
        const color = PENNANT_COLORS[i % PENNANT_COLORS.length];
        return (
          <polygon
            key={i}
            points={`${x + 2},8 ${x + 42},8 ${x + 22},44`}
            fill={color}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}
