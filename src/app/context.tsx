import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SignInPage from "../features/auth/sign_in";
import type { User } from "../features/auth/hooks/hooks";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(

        !!localStorage.getItem("token")
    );

    const login = React.useCallback((user: User, token: string) => {
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
    }, []);
    const logout = React.useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    }, []);
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
}

export function SignInRoute() {
    const { isAuthenticated, login } = useAuth();
    const location = useLocation();
    const from = (location.state)?.from?.pathname || "/";

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }
    return <SignInPage onLogin={login} />;
}

