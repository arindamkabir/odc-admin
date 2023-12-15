import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Category } from "@/types/Category";
import { toast } from "react-toastify";

export type StoreProductRequest = {
    name: string,
    category: Category | null,
    price: string,
    description?: string,
    SKU: string,
    primary_img: FileList,
    secondary_img?: Blob,
    is_featured: boolean,
    is_hidden: boolean,
    has_colors: boolean,
    has_sizes: boolean,
}

const storeProduct = async (data: StoreProductRequest) => {
    if (!data.category) return;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('category_id', data.category.id.toString());
    formData.append('description', data.description ?? '');
    formData.append('SKU', data.SKU);
    formData.append('primary_img', data.primary_img[0]);
    formData.append('is_featured', data.is_featured ? 'true' : 'false');
    formData.append('is_hidden', data.is_hidden ? 'true' : 'false');
    formData.append('has_colors', data.has_colors ? 'true' : 'false');
    formData.append('has_sizes', data.has_sizes ? 'true' : 'false');

    const response = await axios.post('/api/admin/products/', formData);

    // const response = await axios.post('/api/admin/products/', {
    //     name: data.name,
    //     price: data.price,
    //     category_id: data.category.id,
    //     description: data.description,
    //     SKU: data.SKU,
    //     primary_img: data.primary_img[0],
    //     is_featured: data.is_featured ? 'true' : false,
    //     is_hidden: data.is_hidden ? 'true' : false
    // });
    return response;
}

export const useStoreProduct = (setError: UseFormSetError<StoreProductRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreProductRequest>({
        mutationFn: storeProduct,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['infiniteProducts', 'list'] });
            toast.success('Product added.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof StoreProductRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong');
        }
    });
}