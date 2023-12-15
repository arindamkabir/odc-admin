import React from 'react'
import Drawer from '../../common/Drawer'
import CreateProductForm from '../../forms/product/CreateProductForm'
import useStore from '@/store/store'

const CreateProductDrawer = () => {
    const showingCreateProductDrawer = useStore(state => state.showingCreateProductDrawer);
    const showCreateProductDrawer = useStore(state => state.showCreateProductDrawer);

    return (
        <Drawer
            title={"Add Product"}
            open={showingCreateProductDrawer}
            onClose={() => showCreateProductDrawer(false)}
        >
            <CreateProductForm />
        </Drawer>
    )
}

export default CreateProductDrawer