import Drawer from '@/components/common/Drawer';
import EditProductForm from '@/components/forms/product/EditProductForm';
import useStore from '@/store/store';
import React from 'react'

const EditProductDrawer = () => {
    const showingEditProductDrawer = useStore(state => state.showingEditProductDrawer);
    const showEditProductDrawer = useStore(state => state.showEditProductDrawer);

    return (
        <Drawer
            title={"Edit Product"}
            open={showingEditProductDrawer}
            onClose={() => showEditProductDrawer(false)}
        >
            <EditProductForm />
        </Drawer>
    )
}

export default EditProductDrawer