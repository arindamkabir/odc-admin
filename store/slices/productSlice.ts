import { BoundedState, ProductState } from "@/types/State";
import { StateCreator } from "zustand";

const createProductSlice: StateCreator<
    BoundedState,
    [],
    [],
    ProductState
> = (set) => ({
    productListQueryParams: {
        page: 1,
        search: ''
    },
    editingProduct: null,
    editingStock: null,
    showingCreateProductDrawer: false,
    showingEditProductDrawer: false,
    showingCreateStockDrawer: false,
    showingEditStockDrawer: false,
    showingAddProductImageDrawer: false,
    showingUpdateProductPrimaryImageDrawer: false,
    showCreateProductDrawer: (val) => {
        set(state => ({ showingCreateProductDrawer: val }));
    },
    showAddProductImageDrawer: (val) => {
        set(state => ({ showingAddProductImageDrawer: val }));
    },
    showCreateStockDrawer: (val) => {
        set(state => ({ showingCreateStockDrawer: val }));
    },
    setEditingProduct: (product) => {
        set(state => ({ editingProduct: product }));
    },
    setEditingStock: (stock) => {
        set(state => ({ editingStock: stock }));
    },
    showEditProductDrawer: (val) => {
        set(state => ({ showingEditProductDrawer: val }));
    },
    showEditStockDrawer: (val) => {
        set(state => ({ showingEditStockDrawer: val }));
    },
    setProductListQueryParams: (val) => {
        set(state => ({ productListQueryParams: val }));
    },
    showUpdateProductPrimaryImageDrawer: (val) => {
        set(state => ({ showingUpdateProductPrimaryImageDrawer: val }));
    }
});


export default createProductSlice;