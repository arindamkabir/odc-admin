import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Category } from "@/types/Category";

export type UpdateCategoryRequest = {
    id: number,
    name: string,
    parent?: Category | null,
    is_featured: boolean,
    is_hidden: boolean,
}

const updateCategory = async (data: UpdateCategoryRequest) => {
    const response = await axios.put(`/api/admin/categories/${data.id}`, {
        name: data.name,
        parent_id: data.parent?.id ?? null,
        is_featured: data.is_featured ? 'true' : 'false',
        is_hidden: data.is_hidden ? 'true' : 'false',
    });
    return response;
}

export const useUpdateCategory = (setError: UseFormSetError<UpdateCategoryRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateCategoryRequest>({
        mutationFn: updateCategory,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof UpdateCategoryRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}