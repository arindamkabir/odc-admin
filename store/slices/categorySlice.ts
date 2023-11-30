import { BoundedState, CategoryState, } from "@/types/State";
import { StateCreator } from "zustand";

const createCategorySlice: StateCreator<
    BoundedState,
    [],
    [],
    CategoryState
> = (set) => ({
    showingCreateCategoryDrawer: false,
    categoryListQueryParams: {
        page: 1,
        search: ''
    },
    setShowingCreateCategoryDrawer: (val) => {
        set(state => ({ showingCreateCategoryDrawer: val }));
    },
    setCategoryListQueryParams: (val) => {
        set(state => ({ categoryListQueryParams: val }));
    }
});

export default createCategorySlice;