interface RiasecRadarChartProps {
  scores: Record<string, number>;
  size?: number;
}

const AXES: { key: string; label: string; angleDeg: number }[] = [
  { key: "REALISTIC", label: "R", angleDeg: -90 },
  { key: "INVESTIGATIVE", label: "I", angleDeg: -30 },
  { key: "ARTISTIC", label: "A", angleDeg: 30 },
  { key: "SOCIAL", label: "S", angleDeg: 90 },
  { key: "ENTERPRISING", label: "E", angleDeg: 150 },
  { key: "CONVENTIONAL", label: "C", angleDeg: 210 },
];

export function RiasecRadarChart({
  scores,
  size = 300,
}: RiasecRadarChartProps) {
  const center = size / 2;
  const maxRadius = size * 0.37;
  const labelRadius = size * 0.46;

  function pointAt(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  }

  const dataPoints = AXES.map((axis) => {
    const score = scores[axis.key] ?? 0;
    return pointAt(axis.angleDeg, (score / 100) * maxRadius);
  });

  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-label="RIASEC profile radar chart"
    >
      {[0.33, 0.66, 1].map((f) => (
        <circle
          key={f}
          cx={center}
          cy={center}
          r={maxRadius * f}
          fill="none"
          stroke="#1C2B2A"
          strokeOpacity="0.12"
          strokeDasharray="2 5"
        />
      ))}

      {AXES.map((axis) => {
        const end = pointAt(axis.angleDeg, maxRadius);
        return (
          <line
            key={axis.key}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="#1C2B2A"
            strokeOpacity="0.12"
          />
        );
      })}

      <polygon
        points={polygonPoints}
        fill="#C99A3C"
        fillOpacity="0.28"
        stroke="#3B6F6B"
        strokeWidth="2"
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3B6F6B" />
      ))}

      {AXES.map((axis) => {
        const labelPos = pointAt(axis.angleDeg, labelRadius);
        const score = scores[axis.key] ?? 0;
        return (
          <g key={axis.key}>
            <text
              x={labelPos.x}
              y={labelPos.y - 6}
              textAnchor="middle"
              className="font-mono"
              fontSize="13"
              fill="#1C2B2A"
              opacity="0.7"
            >
              {axis.label}
            </text>
            <text
              x={labelPos.x}
              y={labelPos.y + 10}
              textAnchor="middle"
              className="font-mono"
              fontSize="10"
              fill="#3B6F6B"
            >
              {Math.round(score)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
