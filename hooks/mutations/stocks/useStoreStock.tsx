import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Color } from "@/types/Color";
import { Size } from "@/types/Size";
import { Product } from "@/types/Product";
import { toast } from "react-toastify";

export type StoreStockRequest = {
    product_id: Product["id"],
    color: Color | null,
    size: Size | null,
    quantity: number,
    price: number,
    sales_price: number
}

const storeStock = async (data: StoreStockRequest) => {
    const response = await axios.post('/api/admin/products/stocks', {
        product_id: data.product_id,
        color_id: data.color ? data.color.id : null,
        size_id: data.size ? data.size.id : null,
        quantity: data.quantity,
        price: data.price,
        sales_price: data.sales_price ? data.sales_price : null
    });
    return response;
}

export const useStoreStock = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreStockRequest>({
        mutationFn: storeStock,
        onSuccess: (res) => {
            // router.push('dashboard');
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['stocks', 'list'] });
            toast.success('New stock added.');
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong');
        }
    });
}