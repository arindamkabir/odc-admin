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
    setEditingColor: (color) => {
        set(state => ({ editingColor: color }));
    },
    showCreateColorDrawer: (val) => {
        set(state => ({ showingCreateColorDrawer: val }));
    },
    showEditColorDrawer: (val) => {
        set(state => ({ showingEditColorDrawer: val }));
    },
    setColorListQueryParams: (val) => {
        set(state => ({ colorListQueryParams: val }));
    }
});

export default createColorSlice;