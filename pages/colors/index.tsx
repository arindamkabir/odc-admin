import SEO from '@/components/common/SEO'
import SearchInput from '@/components/common/SearchInput'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import CreateColorDrawer from '@/components/drawers/color/CreateColorDrawer'
import EditColorDrawer from '@/components/drawers/color/EditColorDrawer'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ColorsTable from '@/components/tables/ColorsTable'
import useStore from '@/store/store'
import React from 'react'

const ColorIndexPage = () => {
  const showCreateColorDrawer = useStore(state => state.showCreateColorDrawer);
  const colorListQueryParams = useStore(state => state.colorListQueryParams);
  const setColorListQueryParams = useStore(state => state.setColorListQueryParams);

  return (
    <DashboardLayout header='Colors'>
      <SEO title="Color" />
      <div className="flex items-center justify-between mb-10">
        <SearchInput
          value={colorListQueryParams.search}
          onChange={(value) => setColorListQueryParams({ page: 1, search: value })}
        />

        <PrimaryButton
          onClick={() => showCreateColorDrawer(true)}
        >
          Add New
        </PrimaryButton>
      </div>
      <ColorsTable />

      <CreateColorDrawer />
      <EditColorDrawer />
    </DashboardLayout>)
}

export default ColorIndexPage