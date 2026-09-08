"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { UserProfile } from "@/types";
import { MOCK_USER } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  signInDemoUser: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      // Check if user was previously logged in demo mode
      const savedDemo = localStorage.getItem("sneakers_demo_user");
      if (savedDemo) {
        setProfile(JSON.parse(savedDemo));
        setUser({
          id: MOCK_USER.id,
          email: MOCK_USER.email,
          app_metadata: {},
          user_metadata: { full_name: MOCK_USER.fullName },
          aud: "authenticated",
          created_at: MOCK_USER.createdAt,
        } as User);
      }
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // Fetch active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth state updates
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  const loadUserProfile = async (authUser: User) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (!error && data) {
        setProfile(data);
      } else {
        // Fallback to metadata
        setProfile({
          id: authUser.id,
          email: authUser.email || "",
          fullName:
            authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "Sneakerhead",
          avatarUrl: authUser.user_metadata?.avatar_url,
          createdAt: authUser.created_at,
        });
      }
    } catch {
      setProfile({
        id: authUser.id,
        email: authUser.email || "",
        fullName:
          authUser.user_metadata?.full_name ||
          authUser.email?.split("@")[0] ||
          "Sneakerhead",
        createdAt: authUser.created_at,
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!configured) {
      // Simulate login with demo mode
      const demoProfile: UserProfile = {
        ...MOCK_USER,
        email,
        fullName: email.split("@")[0].toUpperCase(),
      };
      setProfile(demoProfile);
      setUser({
        id: "demo-" + Date.now(),
        email,
        app_metadata: {},
        user_metadata: { full_name: demoProfile.fullName },
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as User);
      localStorage.setItem("sneakers_demo_user", JSON.stringify(demoProfile));
      return { error: null };
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!configured) {
      // Simulate signup in demo mode
      const demoProfile: UserProfile = {
        id: "user-" + Date.now(),
        email,
        fullName,
        createdAt: new Date().toISOString(),
      };
      setProfile(demoProfile);
      setUser({
        id: demoProfile.id,
        email,
        app_metadata: {},
        user_metadata: { full_name: fullName },
        aud: "authenticated",
        created_at: demoProfile.createdAt,
      } as User);
      localStorage.setItem("sneakers_demo_user", JSON.stringify(demoProfile));
      return { error: null };
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (!configured) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem("sneakers_demo_user");
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    if (!configured) {
      // Simulation success
      return { error: null };
    }

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    return { error: error as Error | null };
  };

  const updatePassword = async (newPassword: string) => {
    if (!configured) {
      return { error: null };
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error: error as Error | null };
  };

  const signInDemoUser = () => {
    setProfile(MOCK_USER);
    setUser({
      id: MOCK_USER.id,
      email: MOCK_USER.email,
      app_metadata: {},
      user_metadata: { full_name: MOCK_USER.fullName },
      aud: "authenticated",
      created_at: MOCK_USER.createdAt,
    } as User);
    localStorage.setItem("sneakers_demo_user", JSON.stringify(MOCK_USER));
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      if (!configured) {
        localStorage.setItem("sneakers_demo_user", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isConfigured: configured,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        signInDemoUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
