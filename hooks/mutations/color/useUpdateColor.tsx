import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"

export type UpdateColorRequest = {
    id: number,
    name: string,
    hex_code: string
}

const updateColor = async (data: UpdateColorRequest) => {
    const response = await axios.put(`/api/admin/colors/${data.id}`, {
        name: data.name,
        hex_code: data.hex_code
    });
    return response;
}

export const useUpdateColor = (setError: UseFormSetError<UpdateColorRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateColorRequest>({
        mutationFn: updateColor,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['colors'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof UpdateColorRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}