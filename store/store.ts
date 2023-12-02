import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createProductSlice from "./slices/productSlice";
import createCategorySlice from "./slices/categorySlice";
import createSizeSlice from "./slices/sizeSlice";
import createColorSlice from "./slices/colorSlice";

const useStore = create<BoundedState>()((...a) => ({
    ...createProductSlice(...a),
    ...createCategorySlice(...a),
    ...createSizeSlice(...a),
    ...createColorSlice(...a),
}));

export default useStore;
