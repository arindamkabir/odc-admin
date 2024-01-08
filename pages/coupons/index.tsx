import SEO from '@/components/common/SEO'
import SearchInput from '@/components/common/SearchInput'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import CreateCouponDrawer from '@/components/drawers/coupon/CreateCouponDrawer'
import EditCouponDrawer from '@/components/drawers/coupon/EditCouponDrawer'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import CouponsTable from '@/components/tables/CouponsTable'
import useStore from '@/store/store'
import React from 'react'

const CouponsIndexPage = () => {
    const showCreateCouponDrawer = useStore(state => state.showCreateCouponDrawer);
    const couponListQueryParams = useStore(state => state.couponListQueryParams);
    const setCouponListQueryParams = useStore(state => state.setCouponListQueryParams);

    return (
        <DashboardLayout header='Coupon Index'>
            <SEO title="Coupon Index" />
            <div className="flex items-center justify-between mb-10">
                <SearchInput
                    value={couponListQueryParams.search}
                    onChange={(value) => setCouponListQueryParams({ page: 1, search: value })}
                />

                <PrimaryButton
                    onClick={() => showCreateCouponDrawer(true)}
                >
                    Add New
                </PrimaryButton>
            </div>
            <CouponsTable />

            <CreateCouponDrawer />
            <EditCouponDrawer />
        </DashboardLayout>
    )
}

export default CouponsIndexPage