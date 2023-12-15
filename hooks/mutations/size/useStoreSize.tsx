import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { toast } from "react-toastify";

export type StoreSizeRequest = {
    name: string
}

const storeSize = async (data: StoreSizeRequest) => {
    const response = await axios.post('/api/admin/sizes', {
        name: data.name,
    });
    return response;
}

export const useStoreSize = (setError: UseFormSetError<StoreSizeRequest>, onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreSizeRequest>({
        mutationFn: storeSize,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['sizes', 'list'] });
            toast.success('Size added.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof StoreSizeRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong');
        }
    });
}