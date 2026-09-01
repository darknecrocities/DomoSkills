import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'DomoSkills — The Open Agent Skills Marketplace',
  description:
    'Discover, stack, and install open-source capabilities for AI coding agents. Free, secure, developer-native registry for Universal, Claude Code, Cursor, OpenCode, Codex, Copilot, and Gemini.',
  keywords: [
    'AI Agent Skills',
    'Agent Marketplace',
    'AI Coding Agents',
    'SKILL.md',
    'Claude Code',
    'Cursor IDE',
    'OpenCode',
    'DomoSkills',
    'Universal Agent',
  ],
  authors: [{ name: 'DomoSkills Open Source Consortium' }],
  openGraph: {
    title: 'DomoSkills — The Open Agent Skills Marketplace',
    description: 'Discover and install modular open-source skills for AI coding agents in one command.',
    type: 'website',
    images: ['/assets/domodomo/domodomo-app-icon.png'],
  },
  icons: {
    icon: [
      { url: '/assets/domodomo/domodomo-app-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/domodomo/domodomo-app-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: 'any' },
    ],
    shortcut: '/assets/domodomo/domodomo-app-icon.png',
    apple: '/assets/domodomo/domodomo-app-icon.png',
  },
};

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
      <body className="bg-background text-white antialiased selection:bg-white selection:text-black min-h-screen flex flex-col justify-between">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
