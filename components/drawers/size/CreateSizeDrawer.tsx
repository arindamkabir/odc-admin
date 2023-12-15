import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import CreateSizeForm from '@/components/forms/size/CreateSizeForm';

const CreateSizeDrawer = () => {
    const showingCreateSizeDrawer = useStore(state => state.showingCreateSizeDrawer);
    const showCreateSizeDrawer = useStore(state => state.showCreateSizeDrawer);

    return (
        <Drawer
            title={"Create Size"}
            open={showingCreateSizeDrawer}
            onClose={() => showCreateSizeDrawer(false)}
        >
            <CreateSizeForm />
        </Drawer>
    )
}

export default CreateSizeDrawer;