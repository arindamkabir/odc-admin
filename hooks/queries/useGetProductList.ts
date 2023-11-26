import axios from "@/lib/axios";
import { Product } from "@/types/Product";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type ProductListResponse = PaginatedResponse<Product>;

const fetchProductList = async (): Promise<ProductListResponse> => {
    const response = await axios.get<ProductListResponse>(`/api/products`);
    return response.data;
};

export const useGetProductList = () => {
    return useQuery<ProductListResponse, Error>({
        queryKey: ['products'],
        queryFn: () => {
            return fetchProductList();
        }
    });
};