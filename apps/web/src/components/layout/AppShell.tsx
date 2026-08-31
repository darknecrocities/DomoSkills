'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CursorSpotlight } from '../effects/CursorSpotlight';
import { SkillCartDrawer } from '../cart/SkillCartDrawer';
import { InstallModal } from '../modals/InstallModal';
import { CommandPalette } from '../command/CommandPalette';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Background Spotlight */}
      <CursorSpotlight />

      {/* Top Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Body */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <SkillCartDrawer />
      <InstallModal />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
