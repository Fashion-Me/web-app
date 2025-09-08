import { useQuery } from "@tanstack/react-query";
import api from "../services/authApi";

export default function useAuth() {
    return useQuery(
        ["me"],
        () => api.get("/me").then((r) => r.data),
        {
            retry: false,          // não re-tente em loop, o interceptor já fará refresh
            staleTime: 5 * 60_000, // 5 min – evita refetch constante
        }
    );
}