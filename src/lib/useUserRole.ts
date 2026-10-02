import { useUser } from "@clerk/clerk-react";

export type Role = "admin" | "user";

export function useUserRole() {
  const { user, isLoaded, isSignedIn } = useUser();

  // Clerk ke publicMetadata se role check karte hain
  const role = (user?.publicMetadata?.role as Role) || "user";
  const isAdmin = isSignedIn && role === "admin";

  return {
    isLoaded,
    isSignedIn,
    user,
    role,
    isAdmin,
  };
}