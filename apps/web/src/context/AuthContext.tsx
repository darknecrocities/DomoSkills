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
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, githubProvider, db, isFirebaseConfigured } from '@/lib/firebase';
import { recordUserRegistration } from '@/lib/firestoreMetrics';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  username?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  photoURL: string | null;
  provider: 'google' | 'github' | 'email';
  createdAt?: string;
  publishedSkillsCount?: number;
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
  loginWithDirectIdentity: (email: string, displayName?: string, provider?: 'google' | 'github' | 'email') => Promise<void>;
  updateUserProfile: (data: Partial<AppUser>) => Promise<void>;
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
    // Eradicate any legacy demo or static email user
    try {
      localStorage.removeItem('domoskills_demo_user');
    } catch {}

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        // Prevent any legacy static dummy email
        if (fbUser.email === 'developer@google.com' || fbUser.email === 'developer@gmail.com') {
          await signOut(auth);
          setUser(null);
          setLoading(false);
          return;
        }

        let customData: Partial<AppUser> = {};
        try {
          const cached = localStorage.getItem(`domoskills_profile_${fbUser.uid}`);
          if (cached) {
            customData = JSON.parse(cached);
          }
        } catch {}

        if (isFirebaseConfigured && db) {
          try {
            const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
            if (userDoc.exists()) {
              customData = { ...customData, ...(userDoc.data() as any) };
            }
          } catch (err) {
            console.warn('Could not load remote profile from Firestore:', err);
          }
        }

        const loggedUser: AppUser = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: customData.displayName || fbUser.displayName || fbUser.email?.split('@')[0] || 'Developer',
          username: customData.username || fbUser.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
          bio: customData.bio || null,
          githubUrl: customData.githubUrl || null,
          photoURL: customData.photoURL || fbUser.photoURL,
          provider: (fbUser.providerData[0]?.providerId.includes('github')
            ? 'github'
            : fbUser.providerData[0]?.providerId.includes('google')
            ? 'google'
            : 'email') as AppUser['provider'],
          createdAt: customData.createdAt || new Date().toISOString(),
        };

        setUser(loggedUser);
        recordUserRegistration(loggedUser);
      } else {
        // If not in Firebase auth session, check if there is an active direct user session
        try {
          const directUser = localStorage.getItem('domoskills_direct_auth_user');
          if (directUser) {
            const parsed = JSON.parse(directUser);
            if (
              parsed &&
              parsed.email &&
              !parsed.email.includes('developer@gmail.com') &&
              !parsed.email.includes('developer@google.com')
            ) {
              setUser(parsed);
              setLoading(false);
              return;
            }
          }
        } catch {}
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
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      
      let customData: Partial<AppUser> = {};
      try {
        const cached = localStorage.getItem(`domoskills_profile_${fbUser.uid}`);
        if (cached) customData = JSON.parse(cached);
      } catch {}

      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: customData.displayName || fbUser.displayName || fbUser.email?.split('@')[0] || 'Developer',
        username: customData.username || fbUser.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
        bio: customData.bio || null,
        githubUrl: customData.githubUrl || null,
        photoURL: customData.photoURL || fbUser.photoURL,
        provider: 'google',
        createdAt: new Date().toISOString(),
      };

      setUser(appUser);
      recordUserRegistration(appUser);
      closeAuthModal();
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      throw err;
    }
  };

  const signInWithGitHub = async () => {
    try {
      const res = await signInWithPopup(auth, githubProvider);
      const fbUser = res.user;

      let customData: Partial<AppUser> = {};
      try {
        const cached = localStorage.getItem(`domoskills_profile_${fbUser.uid}`);
        if (cached) customData = JSON.parse(cached);
      } catch {}

      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: customData.displayName || fbUser.displayName || fbUser.email?.split('@')[0] || 'Developer',
        username: customData.username || fbUser.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
        bio: customData.bio || null,
        githubUrl: customData.githubUrl || null,
        photoURL: customData.photoURL || fbUser.photoURL,
        provider: 'github',
        createdAt: new Date().toISOString(),
      };

      setUser(appUser);
      recordUserRegistration(appUser);
      closeAuthModal();
    } catch (err: any) {
      console.error('GitHub Sign In failed:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const fbUser = res.user;

      let customData: Partial<AppUser> = {};
      try {
        const cached = localStorage.getItem(`domoskills_profile_${fbUser.uid}`);
        if (cached) customData = JSON.parse(cached);
      } catch {}

      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email || email.trim(),
        displayName: customData.displayName || fbUser.displayName || email.trim().split('@')[0] || 'Developer',
        username: customData.username || email.trim().split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
        bio: customData.bio || null,
        githubUrl: customData.githubUrl || null,
        photoURL: customData.photoURL || fbUser.photoURL,
        provider: 'email',
        createdAt: new Date().toISOString(),
      };

      setUser(appUser);
      recordUserRegistration(appUser);
      closeAuthModal();
    } catch (err: any) {
      console.error('Email sign in failed:', err);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const fbUser = res.user;

      if (name.trim()) {
        await updateProfile(fbUser, { displayName: name.trim() });
      }

      const appUser: AppUser = {
        uid: fbUser.uid,
        email: fbUser.email || email.trim(),
        displayName: name.trim() || fbUser.displayName || email.trim().split('@')[0] || 'Developer',
        username: (name.trim() || email.trim().split('@')[0]).toLowerCase().replace(/[^a-z0-9_]/g, ''),
        bio: null,
        githubUrl: null,
        photoURL: fbUser.photoURL,
        provider: 'email',
        createdAt: new Date().toISOString(),
      };

      setUser(appUser);
      recordUserRegistration(appUser);
      closeAuthModal();
    } catch (err: any) {
      console.error('Email sign up failed:', err);
      throw err;
    }
  };

  const updateUserProfile = async (data: Partial<AppUser>) => {
    if (!user) throw new Error('No authenticated user found');

    const updatedUser: AppUser = {
      ...user,
      ...data,
      displayName: data.displayName !== undefined ? data.displayName : user.displayName,
      username: data.username !== undefined ? data.username : user.username,
      bio: data.bio !== undefined ? data.bio : user.bio,
      githubUrl: data.githubUrl !== undefined ? data.githubUrl : user.githubUrl,
      photoURL: data.photoURL !== undefined ? data.photoURL : user.photoURL,
    };

    if (auth.currentUser) {
      if (data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser, {
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL,
        });
      }
    }

    if (isFirebaseConfigured && db) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(
          userDocRef,
          {
            displayName: updatedUser.displayName,
            username: updatedUser.username || null,
            bio: updatedUser.bio || null,
            githubUrl: updatedUser.githubUrl || null,
            photoURL: updatedUser.photoURL || null,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Firestore profile sync warning:', err);
      }
    }

    // Save locally for instant persistence
    try {
      localStorage.setItem(`domoskills_profile_${user.uid}`, JSON.stringify(updatedUser));
    } catch {}

    setUser(updatedUser);
  };

  const loginWithDirectIdentity = async (
    email: string,
    name?: string,
    provider: 'google' | 'github' | 'email' = 'google'
  ) => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please provide a valid email address.');
    }

    const uid = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    const derivedName = name?.trim() || cleanEmail.split('@')[0];
    const derivedUsername = cleanEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');

    let customData: Partial<AppUser> = {};
    try {
      const cached = localStorage.getItem(`domoskills_profile_${uid}`);
      if (cached) customData = JSON.parse(cached);
    } catch {}

    const appUser: AppUser = {
      uid,
      email: cleanEmail,
      displayName: customData.displayName || derivedName,
      username: customData.username || derivedUsername,
      bio: customData.bio || null,
      githubUrl: customData.githubUrl || null,
      photoURL: customData.photoURL || null,
      provider,
      createdAt: customData.createdAt || new Date().toISOString(),
    };

    // Save session locally
    try {
      localStorage.setItem('domoskills_direct_auth_user', JSON.stringify(appUser));
      localStorage.setItem(`domoskills_profile_${uid}`, JSON.stringify(appUser));
    } catch {}

    // Sync to Firestore if configured
    if (isFirebaseConfigured && db) {
      try {
        const userDocRef = doc(db, 'users', uid);
        await setDoc(
          userDocRef,
          {
            email: cleanEmail,
            displayName: appUser.displayName,
            username: appUser.username,
            provider,
            lastLoginAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Firestore direct user sync warning:', err);
      }
    }

    setUser(appUser);
    recordUserRegistration(appUser);
    closeAuthModal();
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {}
    setUser(null);
    try {
      localStorage.removeItem('domoskills_direct_auth_user');
      localStorage.removeItem('domoskills_demo_user');
    } catch {}
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
        loginWithDirectIdentity,
        updateUserProfile,
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
