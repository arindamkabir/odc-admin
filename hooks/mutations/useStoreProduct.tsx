import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"

export type StoreProductRequest = {
    name: string,
    category_id: string,
    description: string,
    SKU: string,
    primary_img: Blob,
    secondary_img: Blob,
    is_featured: boolean,
    is_hidden: boolean,
}

const storeProduct = async (data: StoreProductRequest) => {
    const response = await axios.post('/api/products/', data);
    console.log(response);
    return response;
}

export const useStoreProduct = (setError: UseFormSetError<StoreProductRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreProductRequest>({
        mutationFn: storeProduct,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['habits'] })
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof StoreProductRequest, { type: "custom", message: value[0] });
                }
            }
        }
    });
}