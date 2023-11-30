import React from 'react'
import Drawer from '../common/Drawer'
import CreateProductForm from '../forms/CreateProductForm'
import useStore from '@/store/store'

const CreateProductDrawer = () => {
    const showingCreateProductDrawer = useStore(state => state.showingCreateProductDrawer);
    const setShowingCreateProductDrawer = useStore(state => state.setShowingCreateProductDrawer);

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