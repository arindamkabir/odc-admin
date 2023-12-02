import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import EditSizeForm from '@/components/forms/EditSizeForm';

const EditSizeDrawer = () => {
    const showingEditSizeDrawer = useStore(state => state.showingEditSizeDrawer);
    const showEditSizeDrawer = useStore(state => state.showEditSizeDrawer);

    return (
        <Drawer
            title={"Edit Size"}
            open={showingEditSizeDrawer}
            onClose={() => showEditSizeDrawer(false)}
        >
            <EditSizeForm />
        </Drawer>
    )
}

export default EditSizeDrawer;