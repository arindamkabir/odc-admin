export type Coupon = {
    id: number,
    code: string,
    min_cart_value: string,
    value: string,
    value_type: "fixed" | "percentage",
    max_value: string,
    is_disabled: 0 | 1,
    redemptions: number,
    expiry_date: string,
    created_at: string,
    updated_at: string | number,
}

export type CouponWithOrderCount = Coupon & {
    orders_count: number
}