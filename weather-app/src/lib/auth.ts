export interface Organization {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  org: Organization;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

import Cookies from "js-cookie";

export function getCurrentUser(): User | null {
  const authCookie = Cookies.get("auth");
  if (!authCookie) {
    return null;
  }

  try {
    return JSON.parse(authCookie);
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    Cookies.remove("auth");
    return null;
  }
}

export function loginUser(user: User): void {
  Cookies.set("auth", JSON.stringify(user), { expires: 365 });
}

export function logoutUser(): void {
  Cookies.remove("auth");
}
