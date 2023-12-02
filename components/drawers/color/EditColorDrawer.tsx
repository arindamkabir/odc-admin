import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import EditColorForm from '@/components/forms/EditColorForm';

const EditColorDrawer = () => {
    const showingEditColorDrawer = useStore(state => state.showingEditColorDrawer);
    const showEditColorDrawer = useStore(state => state.showEditColorDrawer);

    return (
        <Drawer
            title={"Edit Color"}
            open={showingEditColorDrawer}
            onClose={() => showEditColorDrawer(false)}
        >
            <EditColorForm />
        </Drawer>
    )
}

export default EditColorDrawer;