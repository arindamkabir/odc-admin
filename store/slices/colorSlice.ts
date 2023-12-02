import { BoundedState, ColorState, } from "@/types/State";
import { StateCreator } from "zustand";

const createColorSlice: StateCreator<
    BoundedState,
    [],
    [],
    ColorState
> = (set) => ({
    showingCreateColorDrawer: false,
    showingEditColorDrawer: false,
    colorListQueryParams: {
        page: 1,
        search: ''
    },
    editingColor: null,
    setShowingCreateColorDrawer: (val) => {
        set(state => ({ showingCreateColorDrawer: val }));
    },
    setColorListQueryParams: (val) => {
        set(state => ({ colorListQueryParams: val }));
    }
});

export default createColorSlice;