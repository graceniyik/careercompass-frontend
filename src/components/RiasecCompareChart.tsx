interface Series {
  label: string;
  color: string;
  scores: Record<string, number>;
}

interface RiasecCompareChartProps {
  series: Series[];
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

export function RiasecCompareChart({
  series,
  size = 320,
}: RiasecCompareChartProps) {
  const center = size / 2;
  const maxRadius = size * 0.35;
  const labelRadius = size * 0.44;

  function pointAt(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  }

  return (
    <div>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto">
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

        {series.map((s) => {
          const points = AXES.map((axis) => {
            const score = s.scores[axis.key] ?? 0;
            const p = pointAt(axis.angleDeg, (score / 100) * maxRadius);
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon
              key={s.label}
              points={points}
              fill={s.color}
              fillOpacity="0.12"
              stroke={s.color}
              strokeWidth="2"
            />
          );
        })}

        {AXES.map((axis) => {
          const labelPos = pointAt(axis.angleDeg, labelRadius);
          return (
            <text
              key={axis.key}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              className="font-mono"
              fontSize="13"
              fill="#1C2B2A"
              opacity="0.6"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-ink/70">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
