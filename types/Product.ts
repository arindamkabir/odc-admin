import { Category } from "./Category";

export type Stock = {
    id: number;
    product_id: number;
    size_id: number;
    color_id: number;
    quantity: number;
    price: string;
    sales_price: string | null;
    created_at: string;
    updated_at: string;
};

export interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    description: string;
    price: string;
    SKU: string;
    is_hidden: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    stocks: Stock[]; // Adjust type as per the stocks structure
    category: Category;
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

