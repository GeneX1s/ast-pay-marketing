'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';

export default function DashboardLayout({ children }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fb' }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Don't render anything while redirecting
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}
