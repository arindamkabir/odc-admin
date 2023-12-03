import axios from "@/lib/axios";
import { Order } from "@/types/Order";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type OrderListRequest = {
    search: string,
    page: number,
    status: string | null
}

export type OrderListResponse = PaginatedResponse<Order>;

const fetchOrderList = async (params: OrderListRequest): Promise<OrderListResponse> => {
    const response = await axios.get<OrderListResponse>(`/api/admin/orders`, { params: params });
    console.log(response.data);
    return response.data;
};

export const useGetOrderList = (params: OrderListRequest) => {
    return useQuery<OrderListResponse, Error>({
        queryKey: ['orders', params],
        queryFn: () => {
            return fetchOrderList(params);
        }
    });
};