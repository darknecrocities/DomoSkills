import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Space_Grotesk, JetBrains_Mono, Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-anthropic',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-openai',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://domoskills.com'),
  title: {
    default: 'DomoSkills — The Open Agent Skills Marketplace | 1,170+ Capabilities for AI Coding Agents',
    template: '%s | DomoSkills',
  },
  description:
    'Discover, stack, and install 1,170+ modular open-source capabilities for AI coding agents. Developer-native registry with 1-click CLI install for Google Antigravity, Claude Code, Cursor, OpenCode, Codex, Copilot, and Gemini.',
  keywords: [
    'AI Agent Skills',
    'Agent Marketplace',
    'AI Coding Agents',
    'SKILL.md',
    'Google Antigravity Skills',
    'Claude Code Skills',
    'Cursor IDE Rules',
    'OpenCode Interpreter',
    'Codex Skills',
    'Gemini Agent Skills',
    'Copilot Skills',
    'Universal Agent Standard',
    'DomoSkills',
    'Agent Capability Registry',
    'DevOps Skills',
    'Security Skills',
    'Fullstack Agent Skills',
    'Prompt Engineering',
  ],
  authors: [{ name: 'DomoSkills Open Source Consortium', url: 'https://domoskills.com' }],
  creator: 'DomoSkills',
  publisher: 'DomoSkills',
  applicationName: 'DomoSkills',
  alternates: {
    canonical: 'https://domoskills.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google265fea273f067470',
    other: {
      'google-site-verification': [
        'google265fea273f067470',
        'google265fea273f067470.html',
      ],
    },
  },
  openGraph: {
    title: 'DomoSkills — The Open Agent Skills Marketplace | 1,170+ Capabilities',
    description:
      'Discover, audit, and install 1,170+ modular open-source skills for AI coding agents with zero friction.',
    url: 'https://domoskills.com',
    siteName: 'DomoSkills',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/official_domoskills_icon.png',
        width: 512,
        height: 512,
        alt: 'DomoSkills - The Open Agent Skills Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DomoSkills — The Open Agent Skills Marketplace | 1,170+ Capabilities',
    description:
      'Discover, audit, and install 1,170+ modular open-source skills for AI coding agents with zero friction.',
    images: ['/official_domoskills_icon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/official_domoskills_icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/official_domoskills_icon.png',
    apple: '/apple-icon.png',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DomoSkills',
    url: 'https://domoskills.com',
    operatingSystem: 'All',
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'AI Agent Registry & Marketplace',
    description:
      'The #1 open agent skills marketplace featuring 1,170+ modular capabilities for AI coding agents including Claude Code, Cursor, OpenCode, Codex, Gemini, and Universal Agent.',
    browserRequirements: 'Requires modern browser with JavaScript enabled.',
    screenshot: 'https://domoskills.com/official_domoskills_icon.png',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '340',
      bestRating: '5',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DomoSkills',
    url: 'https://domoskills.com',
    logo: 'https://domoskills.com/official_domoskills_icon.png',
    sameAs: [
      'https://github.com/darknecrocities/DomoSkills',
      'https://domodomo.site',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DomoSkills',
    url: 'https://domoskills.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://domoskills.com/explore?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${lora.variable} ${plusJakarta.variable} dark`}
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7800058547773500"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased selection:bg-white selection:text-black min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
