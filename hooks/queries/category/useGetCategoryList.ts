import axios from "@/lib/axios";
import { Category } from "@/types/Category";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type CategoryListResponse = PaginatedResponse<Category>;

const fetchCategoryList = async (): Promise<CategoryListResponse> => {
    const response = await axios.get<CategoryListResponse>(`/api/admin/categories`);
    return response.data;
};

export const useGetCategoryList = () => {
    return useQuery<CategoryListResponse, Error>({
        queryKey: ['categories'],
        queryFn: () => {
            return fetchCategoryList();
        }
    });
};