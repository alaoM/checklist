import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { _yX } from "./_hs";
const InactivityTimeout = 1000 * 60 * 60 * 24 * 1; // 1 day of inactivity

interface User {
  fullName: string;
}

export function getUserFromLocalStorage(): User | null {
    const userJson = typeof window !== "undefined" && window.localStorage.getItem("__xererkd___");
    return userJson ? JSON.parse(_yX(userJson)) : null;
}

interface UseUserOptions {
    redirectTo?: string;
    redirectIfFound?: boolean;
}

export default function useUser({
    redirectTo = "",
    redirectIfFound = false,
}: UseUserOptions = {}) {
    const router = useRouter();
    const user = getUserFromLocalStorage();
 
    // Function to clear local storage on inactivity
    const clearLocalStorageOnInactivity = () => {
        typeof window !== "undefined" && window.localStorage.removeItem("__xererkd___");
    };

    useEffect(() => {
        let activityTimer: NodeJS.Timeout;

        if (!redirectTo || !user) return;

        const handleUserActivity = () => {
            clearTimeout(activityTimer);
            activityTimer = setTimeout(
                clearLocalStorageOnInactivity,
                InactivityTimeout
            );
        };

        activityTimer = setTimeout(
            clearLocalStorageOnInactivity,
            InactivityTimeout
        );

        const handleActivity = () => {
            handleUserActivity();
        };

        document.addEventListener("mousemove", handleActivity);
        document.addEventListener("keydown", handleActivity);
        document.addEventListener("scroll", handleActivity);

        return () => {
            clearTimeout(activityTimer);
            document.removeEventListener("mousemove", handleActivity);
            document.removeEventListener("keydown", handleActivity);
            document.removeEventListener("scroll", handleActivity);
        };
    }, [user, redirectTo]);

    useEffect(() => {
        if (!redirectTo || !user) return;

        if (
            // If redirectTo is set, redirect if the user was not found in local storage
            (redirectTo && !redirectIfFound && !user) ||
            // If redirectIfFound is also set, redirect if the user was found in local storage
            (redirectIfFound && user)
        ) {
            router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, user, router]);

    return { user };
}
