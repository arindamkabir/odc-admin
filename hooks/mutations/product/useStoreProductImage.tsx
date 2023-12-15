import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/Error"
import { Product } from "@/types/Product";
import { toast } from "react-toastify";

export type StoreProductImageRequest = {
    id: Product["id"]
    images: File[],
}

const storeProductImage = async (data: StoreProductImageRequest) => {
    const response = await axios.post(`/api/admin/products/images/${data.id}`, {
        images: data.images
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response;
}

export const useStoreProductImage = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreProductImageRequest>({
        mutationFn: storeProductImage,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['infiniteProducts', 'list'] });
            toast.success('Product image(s) added.');
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong');
        }
    });
}