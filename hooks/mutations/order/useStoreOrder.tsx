import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { Order } from "@/types/Order";
import { Stock } from "@/types/Product";
import { toast } from "react-toastify";

export type StoreOrderRequest = {
    f_name: string,
    l_name: string,
    email: string,
    phone: string,
    company: string,
    address: string,
    address_2: string,
    city: string,
    state: string,
    zip_code: string,
    delivery_location: 'dhaka' | 'outside_dhaka'
    products: {
        id: Order['id'],
        stock_id: Stock["id"],
        quantity: number
    }[]
}

const storeOrder = async (data: StoreOrderRequest) => {
    const response = await axios.post('/api/admin/orders', {
        ...data,
    });
    return response;
}

export const useStoreOrder = (setError: UseFormSetError<StoreOrderRequest>, onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, StoreOrderRequest>({
        mutationFn: storeOrder,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['products', 'list'] });
            queryClient.invalidateQueries({ queryKey: ['infiniteProducts', 'list'] });
            toast.success('Order placed.');
            onSuccess();
        },
        onError: (err) => {
            toast.error('Something went wrong.');
        }
    });
}