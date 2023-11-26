import { Product } from '@/types/Product';
import { create } from 'zustand';

interface ProductState {
    showingCreateProductDrawer: boolean,
    showingCreateCategoryDrawer: boolean,
    showingCreateColorDrawer: boolean,
    showingCreateSizeDrawer: boolean,
    setShowingCreateProductDrawer: (value: boolean) => void
    setShowingCreateCategoryDrawer: (value: boolean) => void
}

const useProductStore = create<ProductState>()((set, get) => ({
    showingCreateProductDrawer: false,
    showingCreateCategoryDrawer: false,
    showingCreateColorDrawer: false,
    showingCreateSizeDrawer: false,
    setShowingCreateProductDrawer: (val) => {
        set(state => ({ showingCreateProductDrawer: val }));
    },
    setShowingCreateCategoryDrawer: (val) => {
        set(state => ({ showingCreateCategoryDrawer: val }));
    }
}))

export default useProductStore;