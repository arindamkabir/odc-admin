import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ErrorResponse } from "@/types/Error"
import { Category } from "@/types/Category";
import { toast } from "react-toastify";

const deleteCategory = async (id: Category['id']) => {
    const response = await axios.delete(`/api/admin/categories/${id}`);
    console.log(response);
    return response;
}

export const useDeleteCategory = (onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, Category['id']>({
        mutationFn: deleteCategory,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong.');
        }
    });
}