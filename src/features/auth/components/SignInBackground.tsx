import React from "react";

export const SignInBackground: React.FC = () => (
    <>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200 rounded-full opacity-80 blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-200 rounded-full opacity-80 blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-green-200 rounded-full opacity-90 blur-2xl -translate-x-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-200 rounded-full opacity-90 blur-2xl translate-y-1/4 translate-x-1/4"></div>
    </>
);
