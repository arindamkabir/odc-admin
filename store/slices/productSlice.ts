import { BoundedState, ProductState } from "@/types/State";
import { StateCreator } from "zustand";

const createProductSlice: StateCreator<
    BoundedState,
    [],
    [],
    ProductState
> = (set) => ({
    showingCreateProductDrawer: false,
    productListQueryParams: {
        page: 1,
        search: ''
    },
    setShowingCreateProductDrawer: (val) => {
        set(state => ({ showingCreateProductDrawer: val }));
    },
    setProductListQueryParams: (val) => {
        set(state => ({ productListQueryParams: val }));
    },
});


export default createProductSlice;