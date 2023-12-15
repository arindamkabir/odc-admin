import React from 'react'
import Drawer from '../../common/Drawer'
import useStore from '@/store/store'
import CreateStockForm from '@/components/forms/stock/CreateStockForm'
import { Product } from '@/types/Product'

const CreateStockDrawer = ({ product_id }: { product_id: Product["id"] }) => {
    const showingCreateStockDrawer = useStore(state => state.showingCreateStockDrawer);
    const showCreateStockDrawer = useStore(state => state.showCreateStockDrawer);

    return (
        <Drawer
            title={"Add Stock"}
            open={showingCreateStockDrawer}
            onClose={() => showCreateStockDrawer(false)}
        >
            <CreateStockForm product_id={product_id} />
        </Drawer>
    )
}

export default CreateStockDrawer