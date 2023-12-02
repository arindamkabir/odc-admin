import { BoundedState, CategoryState, } from "@/types/State";
import { StateCreator } from "zustand";

const createCategorySlice: StateCreator<
    BoundedState,
    [],
    [],
    CategoryState
> = (set) => ({
    showingCreateCategoryDrawer: false,
    showingEditCategoryDrawer: false,
    categoryListQueryParams: {
        page: 1,
        search: ''
    },
    editingCategory: null,
    setShowingCreateCategoryDrawer: (val) => {
        set(state => ({ showingCreateCategoryDrawer: val }));
    },
    setShowingEditCategoryDrawer: (val) => {
        set(state => ({ showingEditCategoryDrawer: val }));
    },
    setCategoryListQueryParams: (val) => {
        set(state => ({ categoryListQueryParams: val }));
    },
    setEditingCategory: (category) => {
        set(state => ({ editingCategory: category }));
    }
});

export default createCategorySlice;