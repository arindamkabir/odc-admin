import axios from "@/lib/axios";
import { useQuery } from '@tanstack/react-query';
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useLogout } from "./mutations/useLogout";


const fetchUser = async () => {
    const response = await axios.get('/api/user');
    console.log(response)
    return response.data;
}

export const useAuth = (middleware: "guest" | "auth") => {
    const router = useRouter();

    const { data: user, isPending, error } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
    });

    const { mutate: logout, isPending: isLogoutPending } = useLogout();

    useEffect(() => {
        if (middleware === "guest" && user) {
            router.push('/dashboard');
        }

        if (middleware === "auth" && error) logout();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error]);

    return { user, isPending: isPending && isLogoutPending, logout };
}