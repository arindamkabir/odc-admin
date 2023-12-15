import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import EditCategoryForm from '@/components/forms/category/EditCategoryForm';

const EditCategoryDrawer = () => {
    const showingEditCategoryDrawer = useStore(state => state.showingEditCategoryDrawer);
    const setShowingEditCategoryDrawer = useStore(state => state.setShowingEditCategoryDrawer);

    return (
        <Drawer
            title={"Edit Category"}
            open={showingEditCategoryDrawer}
            onClose={() => setShowingEditCategoryDrawer(false)}
        >
            <EditCategoryForm />
        </Drawer>
    )
}

export default EditCategoryDrawer;