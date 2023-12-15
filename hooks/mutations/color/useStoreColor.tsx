import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { toast } from "react-toastify";

export type StoreColorRequest = {
    name: string,
    hex_code: string
}

const storeColor = async (data: StoreColorRequest) => {
    const response = await axios.post('/api/admin/colors', {
        name: data.name,
        hex_code: data.hex_code,
    });
    return response;
}

export const useStoreColor = (setError: UseFormSetError<StoreColorRequest>, onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreColorRequest>({
        mutationFn: storeColor,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['colors', 'list'] });
            toast.success('Color added.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof StoreColorRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong.');
        }
    });
}