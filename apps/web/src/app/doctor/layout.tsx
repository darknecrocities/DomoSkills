import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Doctor — Workspace & Hook Diagnostic Suite',
  description:
    'Run automated diagnostic checks across your AI agent configurations, hook integrity, permission boundaries, and SKILL.md specs.',
  alternates: {
    canonical: 'https://domoskills.com/doctor',
  },
  openGraph: {
    title: 'Agent Doctor — Diagnostic Suite | DomoSkills',
    description:
      'Diagnose and repair your AI agent workspace configurations and skill definitions.',
    url: 'https://domoskills.com/doctor',
  },
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
