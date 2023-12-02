import axios from "@/lib/axios";
import { Color } from "@/types/Color";
import { PaginatedResponse } from "@/types/Response";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type ColorListRequest = {
    search: string,
    page: number,
}

export type ColorListResponse = PaginatedResponse<Color>;

const fetchColor = async (params: ColorListRequest): Promise<ColorListResponse> => {
    const response = await axios.get<ColorListResponse>(`/api/admin/colors`, { params: params });
    return response.data;
};

export const useGetColorList = (params: ColorListRequest) => {
    return useQuery<ColorListResponse, Error>({
        queryKey: ['colors', params],
        queryFn: () => {
            return fetchColor(params);
        }
    });
};