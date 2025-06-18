import React, { useState } from "react";
import { SignInForm } from "./SignInForm";
import { signInAdmin, type Data } from "../hooks/hooks";

type SignInCardProps = {
    /** Called after successful sign-in. Receives the response (user object or token, etc). */
    onSignInSuccess?: (response: Data) => void;
};

export const SignInCard: React.FC<SignInCardProps> = ({ onSignInSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        setError(undefined);
        try {
            const response = await signInAdmin({ email, password });
            if (response) {
                if (onSignInSuccess) onSignInSuccess(response);
            } else {
                setError("Invalid email or password.");
            }
        } catch (e) {
            console.error("Sign in error:", e);
            setError("Failed to sign in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 z-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Sign In To Account</h1>
                <p className="text-gray-500 mt-2">Sign in to continue</p>
            </div>
            <SignInForm onSignIn={handleSignIn} loading={loading} error={error} />
        </div>
    );
};
