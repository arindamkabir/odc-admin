import { BoundedState, OrderState } from "@/types/State";
import { StateCreator } from "zustand";

const createOrderSlice: StateCreator<
    BoundedState,
    [],
    [],
    OrderState
> = (set) => ({
    orderListQueryParams: {
        page: 1,
        search: '',
        status: null,
    },
    setOrderListQueryParams: (val) => {
        set(state => ({ orderListQueryParams: val }));
    }
});

export default createOrderSlice;