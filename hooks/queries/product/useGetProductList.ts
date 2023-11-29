import axios from "@/lib/axios";
import { Product } from "@/types/Product";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type ProductListRequest = {
    search: string,
    page: number,
}

export type ProductListResponse = PaginatedResponse<Product>;

const fetchProductList = async (params: ProductListRequest): Promise<ProductListResponse> => {
    const response = await axios.get<ProductListResponse>(`/api/admin/products`, { params: params });
    return response.data;
};

export const useGetProductList = (params: ProductListRequest) => {
    return useQuery<ProductListResponse, Error>({
        queryKey: ['products', params],
        queryFn: () => {
            return fetchProductList(params);
        }
    });
};