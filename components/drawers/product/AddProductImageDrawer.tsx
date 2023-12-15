import Drawer from '@/components/common/Drawer';
import AddProductImageForm from '@/components/forms/product/AddProductImageForm';
import UpdateProductPrimaryImageForm from '@/components/forms/product/UpdateProductPrimaryImageForm';
import useStore from '@/store/store';
import { Product } from '@/types/Product';
import React from 'react'

const AddProductImageDrawer = ({ id }: { id: Product["id"] }) => {
    const showingAddProductImageDrawer = useStore(state => state.showingAddProductImageDrawer);
    const showAddProductImageDrawer = useStore(state => state.showAddProductImageDrawer);

    return (
        <Drawer
            title={"Add Product Image"}
            open={showingAddProductImageDrawer}
            onClose={() => showAddProductImageDrawer(false)}
        >
            <AddProductImageForm id={id} />
        </Drawer>
    )
}

export default AddProductImageDrawer