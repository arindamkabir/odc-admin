import axios from "@/lib/axios";
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";

const logout = async () => {
    const response = await axios.post('/logout');
    return response;
}

export const useLogout = () => {
    const router = useRouter();

    return useMutation<any, AxiosError<ErrorResponse>>({
        mutationFn: logout,
        onSuccess: (res) => {
            router.push('/login');
        },
        onError: (err) => {
            if (err.response?.status === 401) {
                router.push('/login');
            }
            console.log(err.response?.status)
            console.log(err.response);
        }
    });
}