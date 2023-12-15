import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/Error"
import { Product } from "@/types/Product";
import { toast } from "react-toastify";

export type UpdateProductPrimaryImageRequest = {
    id: Product["id"]
    primary_img: FileList,
}

const updateProductPrimaryImage = async (data: UpdateProductPrimaryImageRequest) => {
    const formData = new FormData();
    formData.append('product_id', data.id.toString());
    formData.append('primary_img', data.primary_img[0]);
    const response = await axios.post(`/api/admin/products/primary-image/${data.id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response;
}

export const useUpdateProductPrimaryImage = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateProductPrimaryImageRequest>({
        mutationFn: updateProductPrimaryImage,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['infiniteProducts', 'list'] });
            toast.success('Product primary image updated.');
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong');
        }
    });
}