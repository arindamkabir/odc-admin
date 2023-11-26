export type Category = {
    id: number;
    name: string;
    slug: string;
    parent_id: number;
    is_featured: number;
    is_hidden: number;
    created_at: string;
    updated_at: string | null;
}