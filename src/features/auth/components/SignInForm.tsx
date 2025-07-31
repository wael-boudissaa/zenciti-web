import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
type Props = {
    onSignIn: (email: string, password: string) => void;
    loading?: boolean;
    error?: string;
};

export const SignInForm: React.FC<Props> = ({ onSignIn, loading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        onSignIn(email, password);
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="on">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700">
                    Email address:
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@email.com"
                    autoFocus
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <span className="text-sm text-primary hover:underline cursor-pointer">
                        Forgot Password?
                    </span>
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-primary"
                        tabIndex={-1}
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>

                </div>

            </div>


            <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50"
            >
                {loading ? (
                    <span>
                        <i className="fa fa-spinner fa-spin mr-2" />
                        Signing In...
                    </span>
                ) : (
                    "Log In"
                )}
            </button>
        </form>
    );
};
