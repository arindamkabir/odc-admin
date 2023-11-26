import React from 'react'
import Drawer from '../common/Drawer'
import CreateProductForm from '../forms/CreateProductForm'
import useProductStore from '@/store/productStore'

const CreateProductDrawer = () => {
    const showingCreateProductDrawer = useProductStore(state => state.showingCreateProductDrawer);
    const setShowingCreateProductDrawer = useProductStore(state => state.setShowingCreateProductDrawer);

    return (
        <Drawer
            title={"Add Product"}
            open={showingCreateProductDrawer}
            onClose={() => setShowingCreateProductDrawer(false)}
        >
            <CreateProductForm />
        </Drawer>
    )
}

export default CreateProductDrawer