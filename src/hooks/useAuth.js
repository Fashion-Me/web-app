import { useQuery } from "@tanstack/react-query";
import api from "../services/authApi";

export default function useAuth() {
    const { data: user, isLoading, error, isSuccess } = useQuery({
        queryKey: ["me"],
        queryFn: () => api.get("/users/me").then((r) => r.data),
        retry: false,
        staleTime: 5 * 60_000, // 5 min
    });

    return {
        user,
        isLoading,
        error,
        isSuccess,
        isAuthenticated: !!user
    };
}