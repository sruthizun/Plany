'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Record<string, unknown>;
    item?: Record<string, unknown>;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultStaggerTimes: Record<'char' | 'word' | 'line', number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  className,
  preset = 'blur',
  delay = 0,
  trigger: controlledTrigger,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Viewport intersection observer to auto-trigger when entering viewport
  useEffect(() => {
    if (controlledTrigger !== undefined) {
      setIsInView(controlledTrigger);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controlledTrigger]);

  const shouldAnimate = controlledTrigger !== undefined ? controlledTrigger : isInView;

  // Split into segments
  const segments = useMemo(() => {
    if (per === 'line') {
      return children.split('\n');
    } else if (per === 'word') {
      return children.split(/(\s+)/);
    } else {
      return children.split('');
    }
  }, [children, per]);

  const stagger = defaultStaggerTimes[per];
  const totalDuration = delay + segments.length * stagger + 0.45;

  useEffect(() => {
    if (!shouldAnimate) {
      setHasAnimated(false);
      return;
    }
    if (shouldAnimate && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, totalDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, hasAnimated, totalDuration, onAnimationComplete]);

  const Tag = as as React.ElementType;
  const ariaLabel = per === 'line' ? undefined : children;

  // Word-based index tracker so whitespace doesn't increment the animation index
  let wordIndex = 0;

  return (
    <Tag
      ref={containerRef}
      aria-label={ariaLabel}
      className={cn('whitespace-pre-wrap', className)}
    >
      {segments.map((segment, index) => {
        const isWhitespace = /^\s+$/.test(segment);
        const currentIndex = isWhitespace ? wordIndex : wordIndex++;

        // Base styles for preset='blur'
        let initialFilter = 'blur(12px)';
        let initialOpacity = 0;
        let initialTransform = 'none';

        if (preset === 'slide') {
          initialFilter = 'none';
          initialOpacity = 0;
          initialTransform = 'translateY(20px)';
        } else if (preset === 'scale') {
          initialFilter = 'none';
          initialOpacity = 0;
          initialTransform = 'scale(0)';
        } else if (preset === 'fade') {
          initialFilter = 'none';
          initialOpacity = 0;
          initialTransform = 'none';
        }

        const transitionDelay = `${delay + currentIndex * stagger}s`;

        const itemStyle: React.CSSProperties = isWhitespace
          ? {}
          : {
              opacity: shouldAnimate ? 1 : initialOpacity,
              filter: shouldAnimate ? 'blur(0px)' : initialFilter,
              transform: shouldAnimate ? 'none' : initialTransform,
              transition: shouldAnimate
                ? `opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}, filter 450ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}`
                : `opacity 250ms ease, filter 250ms ease, transform 250ms ease`,
              willChange: hasAnimated ? 'auto' : 'filter, opacity',
            };

        const segmentContent = isWhitespace ? (
          <span key={`ws-${index}`} aria-hidden="true">
            {segment}
          </span>
        ) : per === 'line' ? (
          <span
            key={`line-${index}`}
            className="block"
            style={itemStyle}
          >
            {segment}
          </span>
        ) : per === 'word' ? (
          <span
            key={`word-${index}`}
            aria-hidden="true"
            className="inline-block whitespace-pre"
            style={itemStyle}
          >
            {segment}
          </span>
        ) : (
          <span
            key={`char-${index}`}
            aria-hidden="true"
            className="inline-block whitespace-pre"
            style={itemStyle}
          >
            {segment}
          </span>
        );

        if (!segmentWrapperClassName || isWhitespace) {
          return segmentContent;
        }

        const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';
        return (
          <span
            key={`wrap-${index}`}
            className={cn(defaultWrapperClassName, segmentWrapperClassName)}
          >
            {segmentContent}
          </span>
        );
      })}
    </Tag>
  );
}
