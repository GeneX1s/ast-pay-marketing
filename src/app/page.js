'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import LoadingScreen from '@/components/auth/LoadingScreen';
// DashboardLayout is no longer needed here as we redirect
// import DashboardLayout from '@/components/Dashboard/DashboardLayout'; 

export default function Page() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (email, password) => {
    setIsAuthenticating(true);

    // Simulate API delay (moved to AuthContext if we want, but keeping visual delay here is fine too, 
    // or we can let login() handle it. Let's start the visual loading state, call login, then redirect.)

    setTimeout(async () => {
      await login(email, password);
      setIsAuthenticating(false);
      router.push('/dashboard');
    }, 2000);
  };

  if (isAuthenticating) {
    return <LoadingScreen />;
  }

  // If user is logged in, we are redirecting, so show nothing or loading
  if (user) {
    return <LoadingScreen />;
  }

  return <LoginForm onLogin={handleLogin} />;
}
