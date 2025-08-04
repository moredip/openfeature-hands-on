import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Header";

const HARDCODED_USERS: User[] = [
  {
    id: "john-doe",
    name: "John Doe",
    initials: "JD",
    org: { id: "big-co", name: "Big Co" },
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    initials: "JS",
    org: { id: "startup-inc", name: "Startup Inc" },
  },
  {
    id: "bob-johnson",
    name: "Bob Johnson",
    initials: "BJ",
    org: { id: "big-co", name: "Big Co" },
  },
  {
    id: "alice-wilson",
    name: "Alice Wilson",
    initials: "AW",
    org: { id: "tech-corp", name: "Tech Corp" },
  },
  {
    id: "mike-chen",
    name: "Mike Chen",
    initials: "MC",
    org: { id: "startup-inc", name: "Startup Inc" },
  },
];

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [loggingInUser, setLoggingInUser] = useState<User | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (user: User) => {
    setLoggingInUser(user);

    // Show loading modal for 1 second
    setTimeout(() => {
      try {
        login(user);
      } catch (error) {
        console.error("Login failed:", error);
        setLoggingInUser(null);
      }
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header showUserDropdown={false} />

        {/* Login Content */}
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold">
                Welcome back
              </CardTitle>
              <CardDescription>Select your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {HARDCODED_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleLogin(user)}
                    disabled={!!loggingInUser}
                    className="w-full p-3 rounded-lg border-2 transition-all duration-200 text-left hover:bg-gray-50 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.id}@{user.org.id}.com
                        </p>
                        <p className="text-xs text-gray-400">
                          Member of: {user.org.name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Demo mode - No actual authentication required
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Loading Modal */}
      {loggingInUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm mx-4">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
              <p className="text-lg font-medium text-gray-900">
                Logging in as {loggingInUser.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">Please wait...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
