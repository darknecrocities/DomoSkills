import type { Metadata } from 'next';
import { registry } from '@domoskills/registry';

interface SkillLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const skill = registry.getSkillBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://domoskills.com';

  if (!skill) {
    return {
      title: 'Skill Not Found | DomoSkills',
      description: 'The requested AI agent skill could not be found in the registry.',
    };
  }

  const title = `${skill.name} — AI Agent Skill`;
  const description =
    skill.description ||
    `Install and configure the ${skill.name} capability for AI coding agents (Claude Code, Cursor, OpenCode, Codex, Gemini).`;

  const canonicalUrl = `${baseUrl}/skills/${skill.slug}`;
  const ogImage = skill.previewImage || `${baseUrl}/official_domoskills_icon.png`;

  return {
    title,
    description,
    keywords: [
      skill.name,
      skill.slug,
      skill.category,
      ...(skill.tags || []),
      'AI Agent Skill',
      'Claude Code Skill',
      'Cursor Rule',
      'Codex Agent Skill',
      'DomoSkills Registry',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | DomoSkills`,
      description,
      url: canonicalUrl,
      siteName: 'DomoSkills',
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: skill.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DomoSkills`,
      description,
      images: [ogImage],
    },
  };
}

export default function SkillLayout({ children, params }: SkillLayoutProps) {
  const skill = registry.getSkillBySlug(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://domoskills.com';

  const skillJsonLd = skill
    ? {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: skill.name,
        description: skill.description,
        url: `${baseUrl}/skills/${skill.slug}`,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: skill.category,
        operatingSystem: 'All',
        license: skill.license,
        version: skill.version || '1.0.0',
        author: {
          '@type': 'Organization',
          name: skill.sourceRepository?.owner || 'DomoSkills Contributor',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }
    : null;

  return (
    <>
      {skillJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(skillJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
