import { BoundedState, CouponState } from "@/types/State";
import { StateCreator } from "zustand";

const createCouponSlice: StateCreator<
    BoundedState,
    [],
    [],
    CouponState
> = (set) => ({
    showingCreateCouponDrawer: false,
    showingEditCouponDrawer: false,
    couponListQueryParams: {
        page: 1,
        search: ''
    },
    editingCoupon: null,
    showCreateCouponDrawer: (val) => {
        set(state => ({ showingCreateCouponDrawer: val }));
    },
    showEditCouponDrawer: (val) => {
        set(state => ({ showingEditCouponDrawer: val }));
    },
    setCouponListQueryParams: (val) => {
        set(state => ({ couponListQueryParams: val }));
    },
    setEditingCoupon: (coupon) => {
        set(state => ({ editingCoupon: coupon }));
    }
});

export default createCouponSlice;