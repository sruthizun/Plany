"use client";

import React, { useRef, useId, useState, useEffect } from "react";

export interface TiltedGridImageItem {
  src: string;
  alt?: string;
}

export interface TiltedGridHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: TiltedGridImageItem[];
  speed?: number; // seconds per column iteration
  tileHeight?: number; // in container query height units (% of container)
  aspectRatio?: number; // width / height of each tile
  gap?: number; // gap percentage
  axis?: number; // vertical perspective origin percentage
  curve?: number; // curve angle in degrees
  fade?: number; // horizontal fade mask percentage
  children?: React.ReactNode;
  className?: string;
}

const SLICES_PER_TILE = 16;
const PERSPECTIVE_FACTOR = 1.6;
const MAX_WIDTH_PERCENT = 55;

function computeArc(radians: number): number {
  return (
    (PERSPECTIVE_FACTOR - 1 + Math.cos(radians)) /
    (2 * PERSPECTIVE_FACTOR * Math.sin(radians))
  );
}

function measureGrid(
  width: number,
  height: number,
  tileHeight: number,
  aspectRatio: number,
  gap: number,
  curveRadians: number
) {
  const scaledTileH = Math.min(
    (tileHeight / 100) * height,
    ((MAX_WIDTH_PERCENT / 100) * width) / aspectRatio
  );
  const radius = width * computeArc(curveRadians);

  if (!(scaledTileH > 0) || !(radius > 0)) {
    return {
      columns: 2,
      sweep: 0,
      unit: 0,
      limit: 0,
      arcZ: 100 * computeArc(curveRadians),
    };
  }

  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const angularUnit = toDeg(scaledTileH / radius);
  const angularStep = (aspectRatio + gap / 100) * angularUnit;
  const totalCurveSpan = toDeg(curveRadians) + (aspectRatio * angularUnit) / 2;
  const colCount = Math.min(
    60,
    Math.max(2, Math.ceil((2 * totalCurveSpan) / angularStep))
  );
  const round = (val: number) => +val.toFixed(4);
  const sweepAngle = round((colCount * angularStep) / 2);

  return {
    columns: colCount,
    sweep: sweepAngle,
    unit: round(angularUnit),
    limit: round(Math.min(sweepAngle, totalCurveSpan)),
    arcZ: 100 * computeArc(curveRadians),
  };
}

export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 42,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 50,
  curve = 80,
  fade = 12,
  children,
  className = "",
  style,
  ...rest
}: TiltedGridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const animName = `tgh-o-${uniqueId}`;
  const trackClass = `tgh-t-${uniqueId}`;
  const defaultCurveRad = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  const [layout, setLayout] = useState<ReturnType<typeof measureGrid> | null>(
    null
  );
  const [cycleMap, setCycleMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // On narrow mobile viewports, adapt the 3D curve angle and panel spacing so panels
      // maintain natural proportions with consistent visible gaps and no overlap.
      const isMobile = width < 640;
      const effectiveCurve = isMobile ? Math.min(curve, 46) : curve;
      const effectiveGap = isMobile ? Math.max(gap, 16) : gap;
      const effectiveCurveRad =
        (Math.min(85, Math.max(5, effectiveCurve)) * Math.PI) / 180;
      const measured = measureGrid(
        width,
        height,
        tileHeight,
        aspectRatio,
        effectiveGap,
        effectiveCurveRad
      );
      setLayout((prev) =>
        prev?.columns === measured.columns &&
        prev.sweep === measured.sweep &&
        prev.unit === measured.unit &&
        prev.arcZ === measured.arcZ
          ? prev
          : measured
      );
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, curve]);

  useEffect(() => {
    for (const { src } of images) {
      if (typeof window !== "undefined") {
        const img = new Image();
        img.src = src;
      }
    }
  }, [images]);

  const { columns, sweep, unit, limit, arcZ } =
    layout ??
    measureGrid(1200, 560, tileHeight, aspectRatio, gap, defaultCurveRad);

  const u = (val: number) =>
    `calc(${+val.toFixed(4)} * min(${tileHeight}cqh, ${+(
      MAX_WIDTH_PERCENT / aspectRatio
    ).toFixed(4)}cqw))`;

  const zVal = `${+arcZ.toFixed(3)}cqw`;
  const turn = (deg: number) =>
    `translateZ(${zVal}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${zVal})`;

  const boundary = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);

  const keyframes = `
@keyframes ${animName} {
  from { transform: ${turn(-sweep)}; }
  to { transform: ${turn(sweep)}; }
  0%, ${boundary}%, ${100 - boundary}%, 100% { visibility: hidden; }
  ${boundary + 0.001}%, ${100 - boundary - 0.001}% { visibility: visible; }
}
@media (prefers-reduced-motion: reduce) {
  .${trackClass} {
    animation-play-state: paused !important;
  }
}
`;

  const sliceWidth = aspectRatio / SLICES_PER_TILE;
  const totalDuration = columns * speed;
  const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${
    100 - fade
  }%, transparent)`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`.trim()}
      style={{ containerType: "size" as const, ...style }}
      {...rest}
    >
      {layout ? (
        <>
          <style>{keyframes}</style>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: 1,
              perspective: `${+(arcZ * PERSPECTIVE_FACTOR).toFixed(3)}cqw`,
              perspectiveOrigin: `50% ${axis}%`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          >
            {Array.from({ length: columns }, (_, x) => {
          const colIndex = columns - 1 - x;
          const imgItem =
            images[(cycleMap[x] ?? colIndex) % Math.max(images.length, 1)];

          return (
            <div
              key={x}
              className={`${trackClass} absolute`}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                transformStyle: "preserve-3d",
                animation: `${animName} ${totalDuration}s linear ${
                  -x * speed
                }s infinite`,
              }}
              onAnimationIteration={(e) => {
                const elapsed = Math.round(e.elapsedTime / totalDuration);
                setCycleMap((prev) => {
                  const nextVal = elapsed * columns + colIndex;
                  return prev[x] === nextVal ? prev : { ...prev, [x]: nextVal };
                });
              }}
            >
              {Array.from({ length: SLICES_PER_TILE }, (_, h) => (
                <div
                  key={h}
                  className={`absolute top-0 overflow-hidden ${
                    h === 0 ? "rounded-l-lg" : ""
                  } ${h === SLICES_PER_TILE - 1 ? "rounded-r-lg" : ""}`.trim()}
                  style={{
                    left: u((aspectRatio - sliceWidth) / 2),
                    width: `calc(${u(sliceWidth)} + 2px)`,
                    height: u(1),
                    transform: turn(
                      (aspectRatio / 2 - (h + 0.5) * sliceWidth) * unit
                    ),
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {imgItem ? (
                    <img
                      src={imgItem.src}
                      alt={h === 0 ? imgItem.alt ?? "" : ""}
                      draggable={false}
                      className="absolute top-0 max-w-none object-cover"
                      style={{
                        left: u(-h * sliceWidth),
                        width: `calc(${u(aspectRatio)} + 2px)`,
                        height: "100%",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
        </div>
      </>
    ) : null}
    {children}
  </div>
  );
}
