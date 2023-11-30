import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Category } from "@/types/Category";

export type StoreCategoryRequest = {
    name: string,
    parent?: Category | null,
    is_featured: boolean,
    is_hidden: boolean,
}

const storeCategory = async (data: StoreCategoryRequest) => {
    const response = await axios.post('/api/admin/categories', {
        name: data.name,
        parent_id: data.parent?.id ?? null,
        is_featured: data.is_featured ? 'true' : 'false',
        is_hidden: data.is_hidden ? 'true' : 'false',
    });
    console.log(response);
    return response;
}

export const useStoreCategory = (setError: UseFormSetError<StoreCategoryRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreCategoryRequest>({
        mutationFn: storeCategory,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof StoreCategoryRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}