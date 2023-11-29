import { ProductListRequest } from '@/hooks/queries/product/useGetProductList';
import { Product } from '@/types/Product';
import { create } from 'zustand';

interface ProductState {
    showingCreateProductDrawer: boolean,
    showingCreateCategoryDrawer: boolean,
    showingCreateColorDrawer: boolean,
    showingCreateSizeDrawer: boolean,
    productListQueryParams: ProductListRequest,
    setShowingCreateProductDrawer: (value: boolean) => void,
    setShowingCreateCategoryDrawer: (value: boolean) => void,
    setProductListQueryParams: (params: ProductListRequest) => void,
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
    setShowingCreateProductDrawer: (val) => {
        set(state => ({ showingCreateProductDrawer: val }));
    },
    setShowingCreateCategoryDrawer: (val) => {
        set(state => ({ showingCreateCategoryDrawer: val }));
    },
    setProductListQueryParams: (val) => {
        set(state => ({ productListQueryParams: val }));
    }
}))

export default useProductStore;