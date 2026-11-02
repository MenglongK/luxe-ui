"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface AreaChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export function AreaChart({
  data,
  height = 220,
  color = "#c5a880",
  secondaryColor = "#3b82f6",
  showSecondary = true,
}: {
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  secondaryColor?: string;
  showSecondary?: boolean;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.value, d.secondaryValue || 0))
  );
  const ceiling = Math.ceil(maxVal * 1.15) || 100;

  const width = 600;
  const paddingX = 40;
  const paddingY = 25;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const getX = (index: number) =>
    paddingX + (index / (data.length - 1)) * chartWidth;
  const getY = (val: number) =>
    height - paddingY - (val / ceiling) * chartHeight;

  // Build SVG path
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${getX(data.length - 1)},${height - paddingY} L ${getX(0)},${height - paddingY} Z`;

  // Secondary line path (e.g. expenses or profit)
  const secondaryPoints = showSecondary
    ? data.map((d, i) => `${getX(i)},${getY(d.secondaryValue || 0)}`)
    : [];
  const secondaryLinePath = showSecondary ? `M ${secondaryPoints.join(" L ")}` : "";

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = height - paddingY - ratio * chartHeight;
          const val = Math.round(ratio * ceiling);
          return (
            <g key={ratio}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                className="text-neutral-200 dark:text-neutral-800"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[9px] fill-neutral-400 font-mono"
              >
                ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Primary Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Line (if present) */}
        {showSecondary && (
          <path
            d={secondaryLinePath}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points & interaction columns */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.value);
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Invisible wide hit area */}
              <rect
                x={cx - 15}
                y={0}
                width={30}
                height={height}
                fill="transparent"
              />

              {/* Hover indicator line */}
              {isHovered && (
                <line
                  x1={cx}
                  y1={paddingY}
                  x2={cx}
                  y2={height - paddingY}
                  stroke="#c5a880"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              )}

              {/* Dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 5 : 3.5}
                fill={color}
                className="transition-all duration-200"
              />

              {/* Label */}
              <text
                x={cx}
                y={height - 8}
                textAnchor="middle"
                className="text-[10px] fill-neutral-500 font-medium"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip on hover */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-10 -top-1 pointer-events-none rounded-lg bg-neutral-900/95 text-white px-3 py-1.5 text-xs shadow-xl border border-neutral-700 backdrop-blur-xs transition-all duration-150 transform -translate-x-1/2"
          style={{
            left: `${((getX(hoveredIdx) - paddingX) / chartWidth) * 85 + 7.5}%`,
          }}
        >
          <div className="font-semibold text-[#c5a880]">
            {data[hoveredIdx].label}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span>Revenue: {formatCurrency(data[hoveredIdx].value)}</span>
          </div>
          {showSecondary && data[hoveredIdx].secondaryValue !== undefined && (
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
              <span>Profit: {formatCurrency(data[hoveredIdx].secondaryValue!)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function BarChart({
  data,
  height = 180,
  barColor = "#c5a880",
}: {
  data: { label: string; value: number }[];
  height?: number;
  barColor?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <div className="w-full flex items-end gap-3 pt-6" style={{ height }}>
      {data.map((item, index) => {
        const heightPercent = Math.round((item.value / max) * 100);
        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
          >
            <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500">
              {item.value}
            </span>
            <div
              className="w-full rounded-t-md transition-all duration-300 group-hover:brightness-110"
              style={{
                height: `${Math.max(heightPercent, 4)}%`,
                backgroundColor: barColor,
              }}
            />
            <span className="text-[10px] text-neutral-500 font-medium truncate w-full text-center">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function DonutChart({
  segments,
  size = 140,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Pre-calculate angular offsets before render
  const segmentsWithOffset: { label: string; value: number; color: string; offset: number }[] = [];
  let currentOffset = 0;
  for (const seg of segments) {
    segmentsWithOffset.push({ ...seg, offset: currentOffset });
    currentOffset += seg.value / total;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-neutral-100 dark:text-neutral-800"
            strokeWidth={strokeWidth}
          />
          {segmentsWithOffset.map((seg, idx) => {
            const strokeDasharray = `${(seg.value / total) * circumference} ${circumference}`;
            const strokeDashoffset = -seg.offset * circumference;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 hover:opacity-85"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-neutral-400 uppercase tracking-widest text-[9px]">Total</span>
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 w-full text-xs">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]">
                {seg.label}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">
                {Math.round((seg.value / total) * 100)}%
              </span>
              <span className="text-neutral-400 text-[11px]">
                ({formatCurrency(seg.value)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
