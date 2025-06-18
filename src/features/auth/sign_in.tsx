import React from "react";
import { useNavigate } from "react-router-dom";
import { SignInBackground } from "./components/SignInBackground";
import { SignInCard } from "./components/SignInCard";
import type { Data, User } from "./hooks/hooks";

type SignInPageProps = {
    onLogin: (user: User, token: string) => void;
};
const SignInPage: React.FC<SignInPageProps> = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSignInSuccess = (response: Data) => {
        localStorage.setItem("token", response.token);
        console.log("Sign-in successful:", response);
        onLogin(response.user, response.token);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-900 relative overflow-hidden font-sans">
            <SignInBackground />
            <SignInCard onSignInSuccess={handleSignInSuccess} />
        </div>
    );
};

export default SignInPage;
