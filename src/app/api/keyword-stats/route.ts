import { buildKeywordStatsFromLanguages } from '@/lib/buildKeywordStats';
import { GITHUB_USERNAME } from '@/lib/keywordMap';
import type { KeywordStatsResponse } from '@/types/keywordStats';
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const revalidate = 21600; // 6h

type GhRepo = {
  name: string;
  fork: boolean;
  archived: boolean;
  languages_url: string;
};

async function loadFallback(): Promise<KeywordStatsResponse> {
  const filePath = path.join(process.cwd(), 'public', 'keyword-stats.json');
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as KeywordStatsResponse;
}

async function fetchGithubLanguageBytes(): Promise<Record<string, number>> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'bluemin-portfolio',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const reposRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=pushed`,
    { headers, next: { revalidate: 21600 } },
  );

  if (!reposRes.ok) {
    throw new Error(`GitHub repos ${reposRes.status}`);
  }

  const repos = (await reposRes.json()) as GhRepo[];
  const targets = repos.filter((r) => !r.fork && !r.archived).slice(0, 40);

  const totals: Record<string, number> = {};

  await Promise.all(
    targets.map(async (repo) => {
      const langRes = await fetch(repo.languages_url, {
        headers,
        next: { revalidate: 21600 },
      });
      if (!langRes.ok) return;
      const langs = (await langRes.json()) as Record<string, number>;
      for (const [lang, bytes] of Object.entries(langs)) {
        totals[lang] = (totals[lang] ?? 0) + bytes;
      }
    }),
  );

  return totals;
}

export async function GET() {
  try {
    const languageBytes = await fetchGithubLanguageBytes();
    if (Object.keys(languageBytes).length === 0) {
      const fallback = await loadFallback();
      return NextResponse.json(
        { ...fallback, source: 'fallback' as const },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
          },
        },
      );
    }

    const stats = buildKeywordStatsFromLanguages(languageBytes);
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch {
    try {
      const fallback = await loadFallback();
      return NextResponse.json(
        { ...fallback, source: 'fallback' as const },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
          },
        },
      );
    } catch {
      return NextResponse.json(
        { keywords: [], updatedAt: new Date().toISOString(), source: 'fallback' },
        { status: 500 },
      );
    }
  }
}
