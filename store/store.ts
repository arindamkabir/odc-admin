import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createProductSlice from "./slices/productSlice";
import createCategorySlice from "./slices/categorySlice";

const useStore = create<BoundedState>()((...a) => ({
    ...createProductSlice(...a),
    ...createCategorySlice(...a),
}));

export default useStore;
