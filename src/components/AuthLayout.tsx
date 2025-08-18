// components/AuthLayout.tsx
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black">
      {/* Floating Gradient Blobs */}
      <div className="absolute w-80 h-80 rounded-full blur-3xl top-10 left-10 
        bg-gradient-to-tr from-black/30 via-black/10 to-transparent 
        animate-float-slow" />

      <div className="absolute w-[28rem] h-[28rem] rounded-full blur-3xl bottom-20 right-10 
        bg-gradient-to-bl from-gray-900/20 via-black/10 to-transparent 
        animate-float-slower" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

