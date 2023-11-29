import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type CategoryListRequest = {
    search: string,
    page: number,
}

export type CategoryListResponse = PaginatedResponse<Category>;

const fetchCategoryList = async (params: CategoryListRequest): Promise<CategoryListResponse> => {
    const response = await axios.get<CategoryListResponse>(`/api/admin/categories`);
    return response.data;
};

export const useGetCategoryList = (params: CategoryListRequest) => {
    return useQuery<CategoryListResponse, Error>({
        queryKey: ['categories', params],
        queryFn: () => {
            return fetchCategoryList(params);
        }
    });
};