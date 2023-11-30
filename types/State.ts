import { CategoryListRequest } from "@/hooks/queries/category/useGetCategoryList";
import { ProductListRequest } from "@/hooks/queries/product/useGetProductList";

export type ProductState = {
    showingCreateProductDrawer: boolean,
    productListQueryParams: ProductListRequest,
    setShowingCreateProductDrawer: (value: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
}

export type CategoryState = {
    showingCreateCategoryDrawer: boolean,
    categoryListQueryParams: CategoryListRequest,
    setCategoryListQueryParams: (params: CategoryListRequest) => void,
    setShowingCreateCategoryDrawer: (value: boolean) => void,
}

export type ColorState = {
    showingCreateColorDrawer: boolean,
}

export type BoundedState = ProductState & CategoryState;