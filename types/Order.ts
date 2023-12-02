import { Product } from "./Product";

type OrderItem = {
    id: number;
    order_id: number;
    stock_id: number;
    price: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

type OrderItemWProduct = {
    id: number;
    order_id: number;
    stock_id: number;
    price: string;
    quantity: number;
    product: Product;
    created_at: string;
    updated_at: string;
}


type Transaction = {
    id: number;
    order_id: number;
    mode: string;
    created_at: string;
    updated_at: string;
}

export type Order = {
    id: number;
    customer_id: number;
    coupon_id: number | null;
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
    is_billing_different: number;
    shipped_date: string | null;
    delivered_date: string | null;
    cancellation_date: string | null;
    return_date: string | null;
    return_reason: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    status_color: string;
    status_for_humans: string;
    customer: Customer | null;
    order_items: OrderItem[];
    transaction: Transaction;
}

export type OrderWProduct = {
    id: number;
    customer_id: number;
    coupon_id: number | null;
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
    is_billing_different: number;
    shipped_date: string | null;
    delivered_date: string | null;
    cancellation_date: string | null;
    return_date: string | null;
    return_reason: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    status_color: string;
    status_for_humans: string;
    customer: Customer | null;
    order_items: OrderItemWProduct[];
    transaction: Transaction;
}