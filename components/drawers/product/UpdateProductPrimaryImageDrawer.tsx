import Drawer from '@/components/common/Drawer';
import UpdateProductPrimaryImageForm from '@/components/forms/product/UpdateProductPrimaryImageForm';
import useStore from '@/store/store';
import { Product } from '@/types/Product';
import React from 'react'

const UpdateProductPrimaryImageDrawer = ({ id }: { id: Product["id"] }) => {
    const showingUpdateProductPrimaryImageDrawer = useStore(state => state.showingUpdateProductPrimaryImageDrawer);
    const showUpdateProductPrimaryImageDrawer = useStore(state => state.showUpdateProductPrimaryImageDrawer);

    return (
        <Drawer
            title={"Update Primary Image"}
            open={showingUpdateProductPrimaryImageDrawer}
            onClose={() => showUpdateProductPrimaryImageDrawer(false)}
        >
            <UpdateProductPrimaryImageForm id={id} />
        </Drawer>
    )
}

export default UpdateProductPrimaryImageDrawer