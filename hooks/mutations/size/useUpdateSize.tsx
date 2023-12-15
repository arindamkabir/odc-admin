import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { toast } from "react-toastify";

export type UpdateSizeRequest = {
    id: number,
    name: string,
}

const updateSize = async (data: UpdateSizeRequest) => {
    const response = await axios.put(`/api/admin/sizes/${data.id}`, {
        name: data.name,
    });
    return response;
}

export const useUpdateSize = (setError: UseFormSetError<UpdateSizeRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateSizeRequest>({
        mutationFn: updateSize,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['sizes', 'list'] });
            toast.success('Size updated.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof UpdateSizeRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong');
        }
    });
}