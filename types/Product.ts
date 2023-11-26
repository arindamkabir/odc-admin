import { Category } from "./Category";

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
    stocks: any[]; // Adjust type as per the stocks structure
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

