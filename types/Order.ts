import { Color } from "./Color";
import { Product, Stock } from "./Product";
import { Size } from "./Size";

export type OrderDeliveryLocation = 'dhaka' | 'outside_dhaka' | 'outside_bd';

export type OrderStatus = 'placed' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export type OrderPlatform = 'website' | 'app' | 'facebook' | 'instagram' | 'tiktok' | 'youtube';

export type OrderItem = {
    id: number;
    order_id: number;
    stock_id: number;
    price: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export type OrderItemWProduct = OrderItem & { product: Product };

export type OrderItemWStockProduct = OrderItem & {
    stock: Stock & { product: Product }
};

export type OrderAddress = {
    id: number;
    order_id: number;
    type: string;
    f_name: string;
    l_name: string;
    email: string;
    phone: string;
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    company: string;
    full_address: string;
    created_at: string | null;
    updated_at: string | null;
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
    shipping_cost: string;
    tax: string;
    total: string;
    is_billing_different: number;
    shipped_date: string | null;
    delivered_date: string | null;
    cancellation_date: string | null;
    return_date: string | null;
    return_reason: string | null;
    delivery_location: OrderDeliveryLocation;
    status: OrderStatus;
    platform: OrderPlatform;
    created_at: string;
    updated_at: string;
    status_color: string;
    status_for_humans: string;
    customer: Customer | null;
    shipping: OrderAddress | null;
    order_items: OrderItem[];
    transaction: Transaction;
}

export type OrderWProduct = Omit<Order, 'order_items'> & { order_items: OrderItemWProduct[] };

export type OrderWProductAndBilling = Omit<Order, 'order_items'> & { order_items: OrderItemWStockProduct[], billing: OrderAddress | null };

export type SavingOrderProduct = {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    description: string;
    price: string;
    SKU: string;
    stock: Stock;
    orderQuantity: number;
    primary_image: {
        id: number;
        url: string;
        type: string;
        imageable_id: number;
        imageable_type: string;
        created_at: string;
        updated_at: string;
        full_url: string;
        storage_path: string;
    };
}