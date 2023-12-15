import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import CreateCategoryForm from '../../forms/category/CreateCategoryForm';

const CreateCategoryDrawer = () => {
    const showingCreateCategoryDrawer = useStore(state => state.showingCreateCategoryDrawer);
    const setShowingCreateCategoryDrawer = useStore(state => state.setShowingCreateCategoryDrawer);

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