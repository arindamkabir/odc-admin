import axios from "@/lib/axios";
import { useQuery } from '@tanstack/react-query';
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLogout } from "./mutations/auth/useLogout";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/Error";


const fetchUser = async () => {
    const response = await axios.get('/api/admin/user');
    console.log(response)
    return response.data;
}

export const useAuth = (middleware: "guest" | "auth") => {
    const router = useRouter();

    const { data: user, isPending, error } = useQuery<any, AxiosError<ErrorResponse>>({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: Infinity
    });

    const { mutate: logout, isPending: isLogoutPending } = useLogout();

    useEffect(() => {
        if (middleware === "guest" && user) {
            router.push('/dashboard');
        }

        if (middleware === "auth" && error) {
            if (error.response?.status === 401)
                logout();
        }

    }, [user, error]);

    return { user, isPending: isPending && isLogoutPending, logout };
}