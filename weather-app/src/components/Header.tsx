import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  showUserDropdown?: boolean;
}

export function Header({ showUserDropdown = true }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left spacer for centering */}
        <div className="w-32"></div>

        {/* Centered title */}
        <h1 className="text-xl font-medium tracking-wide">JUST THE WEATHER</h1>

        {/* Right side - User dropdown or spacer */}
        <div className="w-32 flex justify-end">
          {showUserDropdown && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-gray-900 text-sm font-medium">
                    {user?.initials || "??"}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 rounded-none border-0 bg-gray-800 text-white shadow-lg"
                sideOffset={0}
              >
                <div className="px-3 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium">{user?.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">{user?.org?.name || "No Organization"}</p>
                </div>
                <DropdownMenuItem 
                  className="text-red-400 hover:text-red-300 hover:bg-gray-700 focus:text-red-300 focus:bg-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
