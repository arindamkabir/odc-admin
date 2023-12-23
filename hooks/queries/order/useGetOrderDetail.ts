import axios from "@/lib/axios";
import { Order, OrderWProductAndBilling } from "@/types/Order";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type OrderDetailRequest = string | undefined;
export type ShowOrderResponse = OrderWProductAndBilling;

const fetchOrderDetail = async (id: OrderDetailRequest): Promise<ShowOrderResponse> => {
    const response = await axios.get<ShowOrderResponse>(`/api/admin/orders/${id}`);
    console.log(response.data);
    return response.data;
};

export const useGetOrderDetail = (id: OrderDetailRequest) => {
    return useQuery<ShowOrderResponse, Error>({
        queryKey: ['orders', 'detail', id],
        queryFn: () => {
            return fetchOrderDetail(id);
        },
        enabled: !!id
    });
};