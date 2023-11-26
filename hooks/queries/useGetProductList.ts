import axios from "@/lib/axios";
import { Product } from "@/types/Product";
// import { IHabit } from "@/types/habit/Habit";
import { QueryClient, useQuery } from "@tanstack/react-query";

export interface ProductListResponse {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}


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