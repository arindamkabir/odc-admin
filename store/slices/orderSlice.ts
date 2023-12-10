import { BoundedState, OrderState } from "@/types/State";
import { StateCreator } from "zustand";

const createOrderSlice: StateCreator<
    BoundedState,
    [],
    [],
    OrderState
> = (set, get) => ({
    orderListQueryParams: {
        page: 1,
        search: '',
        status: null,
    },
    orderProductList: [],
    showingAddOrderProductDrawer: false,
    showingOrderProductListDrawer: false,
    selectedOrderProduct: null,
    setOrderListQueryParams: (val) => {
        set(state => ({ orderListQueryParams: val }));
    },
    showAddOrderProductDrawer: (val) => {
        set(state => ({ showingAddOrderProductDrawer: val }));
    },
    showOrderProductListDrawer: (val) => {
        set(state => ({ showingOrderProductListDrawer: val }));
    },
    addOrderProduct: (product) => {
        const exists = get().orderProductList.some(item => item.id === product.id && item.stock.id === product.stock.id);
        if (!exists)
            set(state => ({ orderProductList: [...state.orderProductList, product] }));
        else
            set(state => ({ orderProductList: state.orderProductList.map(item => item.id === product.id && item.stock.id === product.stock.id ? product : item) }))
    },
    removeOrderProduct: (product_id, stock_id) => {
        set(state => ({ orderProductList: state.orderProductList.filter(item => !(item.id === product_id && item.stock.id === stock_id)) }));
    },
    setSelectedOrderProduct: (product) => {
        set(state => ({ selectedOrderProduct: product }));
    }
});

export default createOrderSlice;