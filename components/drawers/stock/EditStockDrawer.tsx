import React from 'react'
import Drawer from '../../common/Drawer'
import useStore from '@/store/store'
import EditStockForm from '@/components/forms/stock/EditStockForm'
import { Product } from '@/types/Product'

const EditStockDrawer = () => {
    const showingEditStockDrawer = useStore(state => state.showingEditStockDrawer);
    const showEditStockDrawer = useStore(state => state.showEditStockDrawer);

    return (
        <Drawer
            title={"Edit Stock"}
            open={showingEditStockDrawer}
            onClose={() => showEditStockDrawer(false)}
        >
            <EditStockForm />
        </Drawer>
    )
}

export default EditStockDrawer