import { CategoryListRequest } from '@/hooks/queries/category/useGetCategoryList';
import { ProductListRequest } from '@/hooks/queries/product/useGetProductList';
import { Product } from '@/types/Product';
import { create } from 'zustand';

interface ProductState {
    showingCreateProductDrawer: boolean,
    showingCreateCategoryDrawer: boolean,
    showingCreateColorDrawer: boolean,
    showingCreateSizeDrawer: boolean,
    productListQueryParams: ProductListRequest,
    categoryListQueryParams: CategoryListRequest,
    setShowingCreateProductDrawer: (value: boolean) => void,
    setShowingCreateCategoryDrawer: (value: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
    setCategoryListQueryParams: (params: CategoryListRequest) => void,
}

const useProductStore = create<ProductState>()((set, get) => ({
    showingCreateProductDrawer: false,
    showingCreateCategoryDrawer: false,
    showingCreateColorDrawer: false,
    showingCreateSizeDrawer: false,
    productListQueryParams: {
        page: 1,
        search: ''
    },
    categoryListQueryParams: {
        page: 1,
        search: ''
    },
    setShowingCreateProductDrawer: (val) => {
        set(state => ({ showingCreateProductDrawer: val }));
    },
    setShowingCreateCategoryDrawer: (val) => {
        set(state => ({ showingCreateCategoryDrawer: val }));
    },
    setProductListQueryParams: (val) => {
        set(state => ({ productListQueryParams: val }));
    },
    setCategoryListQueryParams: (val) => {
        set(state => ({ categoryListQueryParams: val }));
    }
}))

export default useProductStore;