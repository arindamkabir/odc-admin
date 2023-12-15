import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { toast } from "react-toastify";

export type UpdateProductRequest = {
    id: Product['id'],
    name: string,
    category: Category | null,
    price: string,
    sales_price?: string,
    description?: string,
    SKU: string,
    is_featured: boolean,
    is_hidden: boolean,
    has_colors: boolean,
    has_sizes: boolean,
}

const updateProduct = async (data: UpdateProductRequest) => {
    if (!data.category) return;

    const response = await axios.put(`/api/admin/products/${data.id}`, {
        name: data.name,
        price: data.price,
        sales_price: data.sales_price ?? null,
        category_id: data.category.id,
        description: data.description,
        SKU: data.SKU,
        has_colors: data.has_colors ? 'true' : 'false',
        has_sizes: data.has_sizes ? 'true' : 'false',
        is_featured: data.is_featured ? 'true' : 'false',
        is_hidden: data.is_hidden ? 'true' : 'false'
    });

    return response;
}

export const useUpdateProduct = (setError: UseFormSetError<UpdateProductRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateProductRequest>({
        mutationFn: updateProduct,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['infiniteProducts', 'list'] });
            toast.success('Product updated.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof UpdateProductRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong');
        }
    });
}