import axios from "@/lib/axios";
import { Product, Stock } from "@/types/Product";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type GetAllStocksRequest = {
    id: Product['id'],
}

export type AllStocksResponse = Stock[];

const fetchAllStocks = async (params: GetAllStocksRequest): Promise<AllStocksResponse> => {
    const response = await axios.get<AllStocksResponse>(`/api/admin/products/stocks/${params.id}`);
    return response.data;
};

export const useGetAllStocks = (params: GetAllStocksRequest) => {
    return useQuery<AllStocksResponse, Error>({
        queryKey: ['stocks', 'list', params],
        queryFn: () => {
            return fetchAllStocks(params);
        }
    });
};