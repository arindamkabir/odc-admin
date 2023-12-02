import SEO from '@/components/common/SEO'
import SearchInput from '@/components/common/SearchInput'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import CreateSizeDrawer from '@/components/drawers/size/CreateSizeDrawer'
import EditSizeDrawer from '@/components/drawers/size/EditSizeDrawer'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import SizesTable from '@/components/tables/SizesTable'
import useStore from '@/store/store'
import React from 'react'

const SizeIndexPage = () => {
    const showCreateSizeDrawer = useStore(state => state.showCreateSizeDrawer);
    const sizeListQueryParams = useStore(state => state.sizeListQueryParams);
    const setSizeListQueryParams = useStore(state => state.setSizeListQueryParams);

    return (
        <DashboardLayout header='Sizes'>
            <SEO title="Sizes" />
            <div className="flex items-center justify-between mb-10">
                <SearchInput
                    value={sizeListQueryParams.search}
                    onChange={(value) => setSizeListQueryParams({ page: 1, search: value })}
                />

                <PrimaryButton
                    onClick={() => showCreateSizeDrawer(true)}
                >
                    Add New
                </PrimaryButton>
            </div>
            <SizesTable />

            <CreateSizeDrawer />
            <EditSizeDrawer />
        </DashboardLayout>
    )
}

export default SizeIndexPage