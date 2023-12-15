import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Color } from "@/types/Color";
import { Size } from "@/types/Size";
import { Stock } from "@/types/Product";
import { toast } from "react-toastify";

export type UpdateStockRequest = {
    id: Stock["id"],
    color: Color | null,
    size: Size | null,
    quantity: number,
    price: number,
    sales_price: number
}

const updateStock = async (data: UpdateStockRequest) => {
    const response = await axios.put(`/api/admin/products/stocks/${data.id}`, {
        color_id: data.color ? data.color.id : null,
        size_id: data.size ? data.size.id : null,
        quantity: data.quantity,
        price: data.price,
        sales_price: data.sales_price ? data.sales_price : null
    });
    return response;
}

export const useUpdateStock = (onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateStockRequest>({
        mutationFn: updateStock,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['stocks', 'list'] });
            toast.success('Stock updated.');
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong');
        }
    });
}