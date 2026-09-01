import { NextResponse } from 'next/server';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/repos/darknecrocities/DomoSkills', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'DomoSkills-Web',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // Return sensible fallback if rate limited
      return NextResponse.json({ stars: 128, forks: 24, ok: false });
    }

    const data = await res.json();
    return NextResponse.json({
      stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 128,
      forks: typeof data.forks_count === 'number' ? data.forks_count : 24,
      ok: true,
    });
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return NextResponse.json({ stars: 128, forks: 24, ok: false });
  }
}
