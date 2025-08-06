import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/lib/auth";
import { getCurrentUser, loginUser, logoutUser } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, forceRerender] = useState({});
  
  const user = getCurrentUser();
  const isAuthenticated = user !== null;

  const login = (user: User) => {
    loginUser(user);
    forceRerender({});
  };

  const logout = () => {
    logoutUser();
    forceRerender({});
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
