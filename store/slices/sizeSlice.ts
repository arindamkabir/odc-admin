import { BoundedState, SizeState } from "@/types/State";
import { StateCreator } from "zustand";

const createSizeSlice: StateCreator<
    BoundedState,
    [],
    [],
    SizeState
> = (set) => ({
    sizeListQueryParams: {
        page: 1,
        search: ''
    },
    editingSize: null,
    showingCreateSizeDrawer: false,
    showingEditSizeDrawer: false,
    setEditingSize: (size) => {
        set(state => ({ editingSize: size }));
    },
    showCreateSizeDrawer: (val) => {
        set(state => ({ showingCreateSizeDrawer: val }));
    },
    showEditSizeDrawer: (val) => {
        set(state => ({ showingEditSizeDrawer: val }));
    },
    setSizeListQueryParams: (params) => {
        set(state => ({ sizeListQueryParams: params }));
    }
});

export default createSizeSlice;