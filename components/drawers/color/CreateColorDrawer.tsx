import React from 'react'
import Drawer from '../../common/Drawer';
import useStore from '@/store/store';
import CreateSizeForm from '@/components/forms/size/CreateSizeForm';
import CreateColorForm from '@/components/forms/color/CreateColorForm';

const CreateColorDrawer = () => {
    const showingCreateColorDrawer = useStore(state => state.showingCreateColorDrawer);
    const showCreateColorDrawer = useStore(state => state.showCreateColorDrawer);

    return (
        <Drawer
            title={"Create Size"}
            open={showingCreateColorDrawer}
            onClose={() => showCreateColorDrawer(false)}
        >
            <CreateColorForm />
        </Drawer>
    )
}

export default CreateColorDrawer;