import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { UseFormSetError } from "react-hook-form";
import { ErrorResponse } from "@/types/Error"
import { toast } from "react-toastify";
import { Coupon } from "@/types/Coupon";

export type UpdateCouponRequest = {
    id: Coupon['id'],
    min_cart_value: number,
    value: number,
    value_type: 'fixed' | 'percentage',
    max_value: number,
    is_disabled: boolean,
    redemptions: number,
    expiry_date: string
}

const updateCoupon = async (data: UpdateCouponRequest) => {
    const response = await axios.put(`/api/admin/coupons/${data.id}`, {
        min_cart_value: data.min_cart_value,
        value: data.value,
        value_type: data.value_type,
        max_value: data.max_value,
        is_disabled: data.is_disabled,
        redemptions: data.redemptions,
        expiry_date: data.expiry_date,
    });
    return response;
}

export const useUpdateCoupon = (setError: UseFormSetError<UpdateCouponRequest>, onSuccess: () => void) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorResponse>, UpdateCouponRequest>({
        mutationFn: updateCoupon,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['coupons', 'list'] });
            toast.success('Coupon updated.');
            onSuccess();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                for (const [key, value] of Object.entries(err.response.data?.errors)) {
                    setError(key as keyof UpdateCouponRequest, { type: "custom", message: value[0] });
                }
            }
            toast.error('Something went wrong.');
        }
    });
}