import { createContext, useState, useEffect, useContext, type ReactNode } from "react";

export interface User {
  username: string;
  email: string;
  password: string; // storing plain password is not secure — only for demo
}

interface AuthContextType {
  currentUser: User | null;
  signup: (user: User) => boolean;
  signin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = (user: User) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const exists = users.some((u) => u.email === user.email);
    if (exists) return false; // user already exists
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    return true;
  };

  const signin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    // ❌ don't call clearCart here → CartContext will handle it
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

