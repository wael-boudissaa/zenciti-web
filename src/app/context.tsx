import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SignInPage from "../features/auth/sign_in";
import type { User } from "../features/auth/hooks/hooks";
import { getRestaurantInformationUsingToken } from "./hooks";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    idRestaurant: string | null;
    token: string | null;
    login: (user: User, token: string, idRestaurant: string) => void;
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
    const [idRestaurant, setIdRestaurant] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedIdRestaurant = localStorage.getItem("idRestaurant");

        if (storedToken && storedIdRestaurant) {
            setToken(storedToken);
            setIdRestaurant(storedIdRestaurant);
            setIsAuthenticated(true);

            // Fetch the user profile from API using the token and set user state
            getRestaurantInformationUsingToken(storedToken)
                .then((userData) => {
                    setUser(userData);
                })
                .catch(() => {
                    // If fetching fails, clear auth state and storage
                    setUser(null);
                    setIsAuthenticated(false);
                    setToken(null);
                    setIdRestaurant(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("idRestaurant");
                });
        }
    }, []);
    const login = React.useCallback((user: User, token: string, idRestaurant: string) => {
        setUser(user);
        setIdRestaurant(idRestaurant);
        setToken(token);
        setIsAuthenticated(true);

        // Only persist what's needed for session restoration
        localStorage.setItem("token", token);
        localStorage.setItem("idRestaurant", idRestaurant);
    }, []);

    const logout = React.useCallback(() => {
        setUser(null);
        setIdRestaurant(null);
        setToken(null);
        setIsAuthenticated(false);

        localStorage.removeItem("token");
        localStorage.removeItem("idRestaurant");
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, idRestaurant, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, user, idRestaurant } = useAuth();
    const location = useLocation();

    // Note: If you want to allow session restoration after refresh, you may want to relax this check:
    // For example, only require isAuthenticated and idRestaurant, not user, 
    // or fetch user profile (see comment in useEffect above).
    if (!isAuthenticated || !idRestaurant) {
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
