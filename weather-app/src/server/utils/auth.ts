import { H3Event, getCookie } from "h3";

export type User = {
  id: string;
  orgId: string;
};

export function useAuth(event: H3Event): User | null {
  const authCookie = getCookie(event, "auth");
  if (authCookie) {
    try {
      const user = JSON.parse(authCookie);
      console.log("Current userId:", user.id, "orgId:", user.org.id);
      return {
        id: user.id,
        orgId: user.org.id,
      };
    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
    }
  }
  return null;
}
