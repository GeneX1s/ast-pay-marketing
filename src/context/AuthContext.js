'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Add loading state to prevent redirects before we check persistence
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Designed to be async to support future API calls
    const login = async (email, password) => {
        return new Promise((resolve) => {
            // FUTURE API INTEGRATION:
            // const response = await fetch('/api/login', { method: 'POST', body: ... });
            // const data = await response.json();

            // For now, dummy logic
            const dummyUser = {
                name: 'Admin Marketing',
                role: 'Marketing Manager',
                email: email || 'admin@astpay.com',
                avatar: 'A'
            };

            localStorage.setItem('user', JSON.stringify(dummyUser));
            setUser(dummyUser);

            resolve(dummyUser);
        });
    };

    const updateProfile = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
