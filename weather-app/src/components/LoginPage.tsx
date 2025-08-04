import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/lib/auth";

const HARDCODED_USERS: User[] = [
  {
    id: "john-doe",
    name: "John Doe",
    initials: "JD"
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    initials: "JS"
  },
  {
    id: "bob-johnson",
    name: "Bob Johnson",
    initials: "BJ"
  },
  {
    id: "alice-wilson",
    name: "Alice Wilson",
    initials: "AW"
  },
  {
    id: "mike-chen",
    name: "Mike Chen",
    initials: "MC"
  }
];

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (user: User) => {
    setIsLoading(true);
    try {
      login(user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Demo Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select a demo user to continue
          </p>
        </div>

        <div className="space-y-4">
          {HARDCODED_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user)}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-gray-900 text-sm font-medium">
                    {user.initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-medium">{user.name}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="text-center text-sm text-gray-500">Logging in...</div>
        )}
      </div>
    </div>
  );
}
