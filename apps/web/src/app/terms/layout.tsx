import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service & Open Source Governance',
  description:
    'Terms of service, open-source governance guidelines, package distribution licenses, and acceptable use policies for the DomoSkills registry.',
  alternates: {
    canonical: 'https://domoskills.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | DomoSkills',
    description:
      'Open-source governance and terms of service for the DomoSkills registry.',
    url: 'https://domoskills.com/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
