import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publish an AI Agent Skill — Open Registry Ingestion',
  description:
    'Submit and publish your custom SKILL.md capability to the open DomoSkills registry. Automated frontmatter validation, AST security audit, and multi-agent adapter compatibility.',
  alternates: {
    canonical: 'https://domoskills.com/submit',
  },
  openGraph: {
    title: 'Publish an AI Agent Skill | DomoSkills',
    description:
      'Publish your custom SKILL.md package to the open DomoSkills registry.',
    url: 'https://domoskills.com/submit',
  },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
