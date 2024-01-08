import Drawer from '@/components/common/Drawer';
import EditCouponForm from '@/components/forms/coupon/EditCouponForm';
import useStore from '@/store/store';
import React from 'react'

const EditCouponDrawer = () => {
  const showingEditCouponDrawer = useStore(state => state.showingEditCouponDrawer);
  const showEditCouponDrawer = useStore(state => state.showEditCouponDrawer);

  return (
    <Drawer
      title={"Edit Coupon"}
      open={showingEditCouponDrawer}
      onClose={() => showEditCouponDrawer(false)}
    >
      <EditCouponForm />
    </Drawer>
  )
}

export default EditCouponDrawer