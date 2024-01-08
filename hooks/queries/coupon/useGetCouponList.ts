import axios from "@/lib/axios";
import { CouponWithOrderCount } from "@/types/Coupon";
import { PaginatedResponse } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";

export type CouponListRequest = {
    search: string,
    page: number,
}

export type CouponListResponse = PaginatedResponse<CouponWithOrderCount>;

const fetchCoupons = async (params: CouponListRequest): Promise<CouponListResponse> => {
    const response = await axios.get<CouponListResponse>(`/api/admin/coupons`, { params: params });
    return response.data;
};

export const useGetCouponList = (params: CouponListRequest) => {
    return useQuery<CouponListResponse, Error>({
        queryKey: ['coupons', 'list', params],
        queryFn: () => {
            return fetchCoupons(params);
        }
    });
};