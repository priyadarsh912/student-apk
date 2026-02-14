import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    rollNumber: string;
    department: string;
    semester: number;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for demo
const dummyUsers: Record<string, { password: string; user: User }> = {
    'student@nexus.edu': {
        password: 'student123',
        user: {
            id: '1',
            name: 'Rahul Sharma',
            email: 'student@nexus.edu',
            rollNumber: 'CS21B001',
            department: 'Computer Science',
            semester: 2,
            avatar: '/user-avatar.jpg'
        },
    },
    'demo@nexus.edu': {
        password: 'demo123',
        user: {
            id: '2',
            name: 'Priya Patel',
            email: 'demo@nexus.edu',
            rollNumber: 'CS21B042',
            department: 'Computer Science',
            semester: 2,
            avatar: '/user-avatar.jpg'
        },
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string): boolean => {
        const userRecord = dummyUsers[email];
        if (userRecord && userRecord.password === password) {
            setUser(userRecord.user);
            localStorage.setItem('nexus_user', JSON.stringify(userRecord.user));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nexus_user');
    };

    // Check for existing session on mount
    useState(() => {
        const savedUser = localStorage.getItem('nexus_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
