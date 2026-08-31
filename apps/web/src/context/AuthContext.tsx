'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, isFirebaseConfigured } from '@/lib/firebase';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'google' | 'github' | 'email' | 'demo';
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Listen for real Firebase auth changes
  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Check local storage for simulated persistent session
      const stored = localStorage.getItem('domoskills_demo_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          // ignore error
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Developer',
          photoURL: fbUser.photoURL,
          provider: (fbUser.providerData[0]?.providerId.includes('github')
            ? 'github'
            : fbUser.providerData[0]?.providerId.includes('google')
            ? 'google'
            : 'email') as AppUser['provider'],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      const demoUser: AppUser = {
        uid: `google-${Date.now()}`,
        email: 'developer@google.com',
        displayName: 'Google AI Developer',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        provider: 'google',
      };
      setUser(demoUser);
      localStorage.setItem('domoskills_demo_user', JSON.stringify(demoUser));
      closeAuthModal();
      return;
    }

    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        provider: 'google',
      });
      closeAuthModal();
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      throw err;
    }
  };

  const signInWithGitHub = async () => {
    if (!isFirebaseConfigured) {
      const demoUser: AppUser = {
        uid: `github-${Date.now()}`,
        email: 'octocat@github.com',
        displayName: 'OpenSource Builder',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        provider: 'github',
      };
      setUser(demoUser);
      localStorage.setItem('domoskills_demo_user', JSON.stringify(demoUser));
      closeAuthModal();
      return;
    }

    try {
      const res = await signInWithPopup(auth, githubProvider);
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        provider: 'github',
      });
      closeAuthModal();
    } catch (err: any) {
      console.error('GitHub Sign In failed:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured) {
      const demoUser: AppUser = {
        uid: `email-${Date.now()}`,
        email,
        displayName: email.split('@')[0] || 'Developer',
        photoURL: null,
        provider: 'email',
      };
      setUser(demoUser);
      localStorage.setItem('domoskills_demo_user', JSON.stringify(demoUser));
      closeAuthModal();
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        provider: 'email',
      });
      closeAuthModal();
    } catch (err: any) {
      console.error('Email sign in failed:', err);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    if (!isFirebaseConfigured) {
      const demoUser: AppUser = {
        uid: `email-${Date.now()}`,
        email,
        displayName: name || email.split('@')[0] || 'Developer',
        photoURL: null,
        provider: 'email',
      };
      setUser(demoUser);
      localStorage.setItem('domoskills_demo_user', JSON.stringify(demoUser));
      closeAuthModal();
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) {
        await updateProfile(res.user, { displayName: name });
      }
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: name || res.user.displayName,
        photoURL: res.user.photoURL,
        provider: 'email',
      });
      closeAuthModal();
    } catch (err: any) {
      console.error('Email sign up failed:', err);
      throw err;
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    localStorage.removeItem('domoskills_demo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithGitHub,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
