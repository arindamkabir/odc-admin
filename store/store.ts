import { BoundedState } from "@/types/State";
import { create } from "zustand";
import createProductSlice from "./slices/productSlice";
import createCategorySlice from "./slices/categorySlice";
import createSizeSlice from "./slices/sizeSlice";
import createColorSlice from "./slices/colorSlice";
import createOrderSlice from "./slices/orderSlice";

const useStore = create<BoundedState>()((...a) => ({
    ...createProductSlice(...a),
    ...createCategorySlice(...a),
    ...createSizeSlice(...a),
    ...createColorSlice(...a),
    ...createOrderSlice(...a),
}));

export default useStore;
