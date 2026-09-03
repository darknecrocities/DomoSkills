'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CursorSpotlight } from '../effects/CursorSpotlight';
import { SkillCartDrawer } from '../cart/SkillCartDrawer';
import { InstallModal } from '../modals/InstallModal';
import { CommandPalette } from '../command/CommandPalette';
import { AuthProvider } from '@/context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { recordVisit } from '@/lib/firestoreMetrics';
import { CartFlyAnimation } from '../cart/CartFlyAnimation';
import { SkillComparatorDrawer } from '../comparison/SkillComparatorDrawer';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    recordVisit();
  }, [pathname]);

  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col justify-between">
        {/* Background Spotlight */}
        <CursorSpotlight />

        {/* Top Navigation */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Main Content Body */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Overlays, Modals & Drawers */}
        <SkillCartDrawer />
        <InstallModal />
        <AuthModal />
        <CartFlyAnimation />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        <SkillComparatorDrawer />
      </div>
    </AuthProvider>
  );
}
