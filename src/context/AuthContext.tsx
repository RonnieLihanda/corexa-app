import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  funding_amount: number;
  role: 'admin' | 'client';
  created_at?: string;
}

interface SignupFormData {
  email: string;
  password: string;
  full_name: string;
  business_name: string;
  business_type: string;
  funding_amount: string | number;
}

interface AuthContextType {
  user: UserProfile | null;
  profile: UserProfile | null;
  loading: boolean;
  role: 'admin' | 'client' | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (formData: SignupFormData) => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, businessName: string, businessType: string, fundingAmount: number) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    setUser(data as UserProfile);
    return data as UserProfile;
  };

  const signUp = async (formData: SignupFormData) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Supabase did not return a user after signup.');

    const profile: UserProfile = {
      id: data.user.id,
      email: formData.email,
      full_name: formData.full_name,
      business_name: formData.business_name,
      business_type: formData.business_type,
      funding_amount: Number(formData.funding_amount) || 0,
      role: formData.email.toLowerCase() === 'ronnielihanda@gmail.com' ? 'admin' : 'client',
    };

    const { error: profileError } = await supabase.from('users').insert(profile);
    if (profileError) throw profileError;

    setUser(profile);
    navigate('/dashboard');
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Supabase did not return a user after signin.');

    await fetchProfile(data.user.id);
    navigate('/dashboard');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    supabase.auth.getSession()
      .then(async ({ data: { session } }) => {
        if (session) {
          await fetchProfile(session.user.id);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) return { error: 'No authenticated user' };

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) throw error;
      setUser(data as UserProfile);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Unable to update profile' };
    }
  };

  const signup = (
    email: string,
    password: string,
    fullName: string,
    businessName: string,
    businessType: string,
    fundingAmount: number
  ) => signUp({
    email,
    password,
    full_name: fullName,
    business_name: businessName,
    business_type: businessType,
    funding_amount: fundingAmount,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: user,
        loading,
        role: user?.role || null,
        signIn,
        signUp,
        signOut,
        login: signIn,
        signup,
        logout: signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
