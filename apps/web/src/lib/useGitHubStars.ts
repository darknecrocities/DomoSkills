'use client';

import { useEffect, useState } from 'react';

interface GitHubStats {
  stars: number;
  forks: number;
  loading: boolean;
  mounted: boolean;
}

export function useGitHubStars(repo: string = 'darknecrocities/DomoSkills') {
  const [data, setData] = useState<GitHubStats>({
    stars: 128,
    forks: 24,
    loading: true,
    mounted: false,
  });

  useEffect(() => {
    let isMounted = true;

    // Read cached value on client after mounting to avoid hydration mismatch
    let initialStars = 128;
    let initialForks = 24;
    try {
      const cached = localStorage.getItem(`github_stars_${repo}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (typeof parsed.stars === 'number') {
          initialStars = parsed.stars;
          initialForks = parsed.forks || 0;
        }
      }
    } catch {
      // ignore
    }

    if (isMounted) {
      setData((prev) => ({
        ...prev,
        stars: initialStars,
        forks: initialForks,
        mounted: true,
      }));
    }

    async function fetchStars() {
      try {
        const res = await fetch('/api/github-stars');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && typeof json.stars === 'number') {
            setData({
              stars: json.stars,
              forks: json.forks || 0,
              loading: false,
              mounted: true,
            });
            localStorage.setItem(
              `github_stars_${repo}`,
              JSON.stringify({ stars: json.stars, forks: json.forks || 0, time: Date.now() })
            );
          }
        }
      } catch (err) {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false, mounted: true }));
        }
      }
    }

    fetchStars();

    return () => {
      isMounted = false;
    };
  }, [repo]);

  return {
    stars: data.stars,
    forks: data.forks,
    loading: data.loading,
    mounted: data.mounted,
    formattedStars: data.stars >= 1000 ? `${(data.stars / 1000).toFixed(1)}k` : data.stars.toString(),
  };
}
