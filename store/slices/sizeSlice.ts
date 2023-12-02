import { BoundedState, SizeState } from "@/types/State";
import { StateCreator } from "zustand";

const createSizeSlice: StateCreator<
    BoundedState,
    [],
    [],
    SizeState
> = (set) => ({
    showingCreateSizeDrawer: false,
    showingEditSizeDrawer: false,
    sizeListQueryParams: {
        page: 1,
        search: ''
    },
    editingSize: null,
    setShowingCreateSizeDrawer: (val) => {
        set(state => ({ showingCreateSizeDrawer: val }));
    },
    setSizeListQueryParams: (val) => {
        set(state => ({ sizeListQueryParams: val }));
    }
});

export default createSizeSlice;