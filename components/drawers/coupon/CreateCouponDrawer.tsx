import Drawer from "@/components/common/Drawer"
import CreateCouponForm from "@/components/forms/coupon/CreateCouponForm"
import useStore from "@/store/store";

const CreateCouponDrawer = () => {
    const showingCreateCouponDrawer = useStore(state => state.showingCreateCouponDrawer);
    const showCreateCouponDrawer = useStore(state => state.showCreateCouponDrawer);

    return (
        <Drawer
            title={"Add Coupon"}
            open={showingCreateCouponDrawer}
            onClose={() => showCreateCouponDrawer(false)}
        >
            <CreateCouponForm />
        </Drawer>
    )
}

export default CreateCouponDrawer;