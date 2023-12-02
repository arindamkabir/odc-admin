import axios from "@/lib/axios";
import { PaginatedResponse } from "@/types/Response";
import { Size } from "@/types/Size";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type SizeListRequest = {
    search: string,
    page: number,
}

export type SizeListResponse = PaginatedResponse<Size>;

const fetchSizeList = async (params: SizeListRequest): Promise<SizeListResponse> => {
    const response = await axios.get<SizeListResponse>(`/api/admin/sizes`, { params: params });
    return response.data;
};

export const useGetSizeList = (params: SizeListRequest) => {
    return useQuery<SizeListResponse, Error>({
        queryKey: ['sizes', params],
        queryFn: () => {
            return fetchSizeList(params);
        }
    });
};