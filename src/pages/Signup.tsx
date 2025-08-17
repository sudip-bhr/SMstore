import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup(form);
    if (success) {
      navigate("/");
    } else {
      setError("User already exists with this email.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      
      {/* Animated Blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-20 right-10"
        animate={{ scale: [1, 1.15, 1], x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Top section */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/illustration.svg"
            alt="auth illustration"
            className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4"
          />
          <h1 className="text-2xl font-bold">Let’s get started!</h1>
          <p className="text-sm text-purple-100">
            Create an account to continue
          </p>
        </div>

        {/* Minimal Glass Form */}
        <div className="backdrop-blur-md bg-white/10 text-white rounded-lg p-6">
          {error && <p className="text-red-200 text-sm mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-white">Full Name</Label>
              <Input
                type="text"
                placeholder="Your full name"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="bg-transparent border border-white/30 text-white placeholder:text-gray-200 focus:ring-yellow-300"
                required
              />
            </div>
            <div>
              <Label className="text-white">Email</Label>
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border border-white/30 text-white placeholder:text-gray-200 focus:ring-yellow-300"
                required
              />
            </div>
            <div className="relative">
              <Label className="text-white">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-transparent border border-white/30 text-white placeholder:text-gray-200 focus:ring-yellow-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
            >
              Sign Up
            </Button>
          </form>

          {/* Link to Sign In */}
          <p className="text-sm text-center mt-4 text-gray-100">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-yellow-300 font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;



