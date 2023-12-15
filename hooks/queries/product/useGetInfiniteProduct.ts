import axios from "@/lib/axios";
import { Product } from "@/types/Product";
import { CursorPaginatedResponse, PaginatedResponse } from "@/types/Response";
import { QueryClient, QueryFunction, QueryKey, useInfiniteQuery, useQuery } from "@tanstack/react-query";

export type ProductListRequest = {
    search: string,
    page: number,
}

export type ProductListResponse = CursorPaginatedResponse<Product>;

const fetchProductList: QueryFunction<ProductListResponse, QueryKey, unknown> = async ({ pageParam }): Promise<ProductListResponse> => {
    const response = await axios.get<ProductListResponse>(`/api/admin/products/cursor?cursor=${pageParam}`);
    return response.data;
};

export const useGetProductInfiniteList = () => {
    return useInfiniteQuery<ProductListResponse, Error>({
        queryKey: ['infiniteProducts', 'list'],
        queryFn: fetchProductList,
        initialPageParam: undefined,
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.prev_cursor,
        // maxPages: 3,
    });
};