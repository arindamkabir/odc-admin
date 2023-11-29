import React from 'react'
import Drawer from '../common/Drawer';
import useProductStore from '@/store/productStore';
import CreateCategoryForm from '../forms/CreateCategoryForm';

const CreateCategoryDrawer = () => {
    const showingCreateCategoryDrawer = useProductStore(state => state.showingCreateCategoryDrawer);
    const setShowingCreateCategoryDrawer = useProductStore(state => state.setShowingCreateCategoryDrawer);

    return (
        <Drawer
            title={"Add Category"}
            open={showingCreateCategoryDrawer}
            onClose={() => setShowingCreateCategoryDrawer(false)}
        >
            <CreateCategoryForm />
        </Drawer>
    )
}

export default CreateCategoryDrawer;