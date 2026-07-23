'use client';

import '@/styles/components/KeywordBubbleChart.scss';

import { KEYWORD_LABEL_ON_DARK } from '@/lib/keywordMap';
import type { KeywordStat, KeywordStatsResponse } from '@/types/keywordStats';

import { useEffect, useMemo, useState } from 'react';

type Bubble = KeywordStat & {
  x: number;
  y: number;
  r: number;
};

const WIDTH = 560;
const HEIGHT = 260;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

function layoutBubbles(keywords: KeywordStat[]): Bubble[] {
  if (keywords.length === 0) return [];

  const maxP = Math.max(...keywords.map((k) => k.percent), 1);
  const minR = 24;
  const maxR = 56;

  const withRadius = keywords.map((k) => ({
    ...k,
    r: minR + (k.percent / maxP) * (maxR - minR),
  }));

  const placed: Bubble[] = [];
  const gold = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < withRadius.length; i++) {
    const item = withRadius[i];
    let x = CENTER_X;
    let y = CENTER_Y;

    if (i === 0) {
      placed.push({ ...item, x, y });
      continue;
    }

    let found = false;
    for (let attempt = 0; attempt < 100 && !found; attempt++) {
      const angle = attempt * gold;
      const dist = 24 + attempt * 5 + item.r * 0.12;
      x = CENTER_X + Math.cos(angle) * dist * 1.15;
      y = CENTER_Y + Math.sin(angle) * dist * 0.72;

      const overlaps = placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.hypot(dx, dy) < p.r + item.r + 4;
      });

      const inBounds =
        x - item.r > 10 &&
        x + item.r < WIDTH - 10 &&
        y - item.r > 10 &&
        y + item.r < HEIGHT - 10;

      if (!overlaps && inBounds) {
        found = true;
      }
    }

    x = Math.min(WIDTH - item.r - 8, Math.max(item.r + 8, x));
    y = Math.min(HEIGHT - item.r - 8, Math.max(item.r + 8, y));
    placed.push({ ...item, x, y });
  }

  for (let pass = 0; pass < 50; pass++) {
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i];
        const b = placed[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const minDist = a.r + b.r + 3;
        if (dist < minDist) {
          const push = ((minDist - dist) / 2) * 0.55;
          const ux = dx / dist;
          const uy = dy / dist;
          a.x -= ux * push;
          a.y -= uy * push;
          b.x += ux * push;
          b.y += uy * push;
        }
      }
    }
    for (const p of placed) {
      p.x = Math.min(WIDTH - p.r - 6, Math.max(p.r + 6, p.x));
      p.y = Math.min(HEIGHT - p.r - 6, Math.max(p.r + 6, p.y));
    }
  }

  return placed;
}

function fontSizeForRadius(r: number) {
  if (r >= 44) return 13;
  if (r >= 34) return 12;
  if (r >= 28) return 11;
  return 10;
}

export default function KeywordBubbleChart() {
  const [stats, setStats] = useState<KeywordStatsResponse | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/keyword-stats');
        if (!res.ok) throw new Error('api');
        const data = (await res.json()) as KeywordStatsResponse;
        if (!cancelled && data.keywords?.length) {
          setStats(data);
          return;
        }
        throw new Error('empty');
      } catch {
        try {
          const res = await fetch('/keyword-stats.json');
          const data = (await res.json()) as KeywordStatsResponse;
          if (!cancelled && data.keywords?.length) {
            setStats({ ...data, source: 'fallback' });
            return;
          }
        } catch {
          /* ignore */
        }
        if (!cancelled) setFailed(true);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const bubbles = useMemo(
    () => (stats ? layoutBubbles(stats.keywords) : []),
    [stats],
  );

  if (failed) {
    return (
      <div className="keyword-bubble-chart is-empty" aria-hidden>
        <span>Keywords</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="keyword-bubble-chart is-loading" aria-busy="true">
        <span className="keyword-bubble-skeleton" />
      </div>
    );
  }

  const active = bubbles.find((b) => b.id === activeId) ?? null;

  return (
    <div className="keyword-bubble-chart in-skills">
      <div
        className="keyword-bubble-stage"
        role="img"
        aria-label="기술 키워드 비중 버블 차트">
        {bubbles.map((b, index) => {
          const shortLabel =
            b.label.length > 10 && b.r < 32 ? `${b.label.slice(0, 8)}…` : b.label;
          const darkText = KEYWORD_LABEL_ON_DARK[b.id];
          const size = b.r * 2;
          const floatClass = index % 2 === 0 ? 'float-a' : 'float-b';

          return (
            <button
              key={b.id}
              type="button"
              className={`keyword-bubble ${floatClass}${activeId === b.id ? ' is-active' : ''}${darkText ? ' is-dark-text' : ''}`}
              style={{
                width: size,
                height: size,
                left: `${(b.x / WIDTH) * 100}%`,
                top: `${(b.y / HEIGHT) * 100}%`,
                backgroundColor: b.color,
                animationDelay: `${0.04 * index}s, ${0.5 + index * 0.12}s`,
                ['--float-duration' as string]: `${5.2 + (index % 4) * 0.55}s`,
              }}
              onMouseEnter={() => setActiveId(b.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(b.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`${b.label} ${b.percent}%`}>
              <span
                className="keyword-bubble-label"
                style={{ fontSize: fontSizeForRadius(b.r) }}>
                {shortLabel}
              </span>
              {b.r >= 30 && <span className="keyword-bubble-percent">{b.percent}%</span>}
            </button>
          );
        })}
      </div>

      {active && (
        <div
          className="keyword-bubble-tooltip"
          role="status"
          style={{
            left: `${(active.x / WIDTH) * 100}%`,
            top: `${((active.y - active.r) / HEIGHT) * 100}%`,
          }}>
          <strong>{active.label}</strong>
          <span>{active.percent}%</span>
        </div>
      )}
    </div>
  );
}
