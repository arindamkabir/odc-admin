import axios from "@/lib/axios";
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";

export type IRegisterRequest = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

const register = async (data: IRegisterRequest) => {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/register', data);

    return response;
}

export const useRegister = (setError: UseFormSetError<IRegisterRequest>) => {
    const router = useRouter();

    return useMutation<any, AxiosError<ErrorResponse>, IRegisterRequest>({
        mutationFn: register,
        onSuccess: (res) => {
            router.push('dashboard');
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof IRegisterRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}