import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Telemetry Guarantee',
  description:
    'Our strict zero-telemetry policy, local-first architecture commitment, and client-side data sovereignty principles.',
  alternates: {
    canonical: 'https://domoskills.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | DomoSkills',
    description:
      'Learn about our zero-telemetry commitment and developer privacy safeguards.',
    url: 'https://domoskills.com/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
