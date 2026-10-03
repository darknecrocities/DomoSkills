import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore 1,170+ AI Agent Skills — Open Registry & Filter Matrix',
  description:
    'Search and filter 1,170+ open-source AI Agent capabilities by category, target runtime (Claude Code, Cursor, OpenCode, Codex, Gemini), security score, and license.',
  alternates: {
    canonical: 'https://domoskills.com/explore',
  },
  openGraph: {
    title: 'Explore 1,170+ AI Agent Skills | DomoSkills',
    description:
      'Search and filter 1,170+ open-source AI Agent capabilities by category and target assistant.',
    url: 'https://domoskills.com/explore',
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
