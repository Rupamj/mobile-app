import { useUser } from "@clerk/expo";
import React from "react";
import { create } from "zustand";

interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  fullName: string;
}

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  updateUserFromClerk: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  updateUserFromClerk: () => {
    // This should be called with useUser() hook data from a component
    set({ user: null });
  },
}));

// Hook to sync Clerk user data to store
export const useSyncAuthUser = () => {
  const { user } = useUser();
  const { setUser } = useAuthStore();

  React.useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl || null,
        fullName: user.fullName || "User",
      });
    } else {
      setUser(null);
    }
  }, [user, setUser]);
};
