import SearchInput from '@/components/common/SearchInput';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Pagination from '@/components/common/pagination/Pagination';
import CreateCategoryDrawer from '@/components/drawers/category/CreateCategoryDrawer';
import CreateProductDrawer from '@/components/drawers/CreateProductDrawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProductsTable from '@/components/tables/ProductsTable';
import { useGetProductList } from '@/hooks/queries/product/useGetProductList'
import useStore from '@/store/store';
import React from 'react'

const ProductHomePage = () => {
    const setShowingCreateProductDrawer = useStore(state => state.setShowingCreateProductDrawer);
    const productListQueryParams = useStore(state => state.productListQueryParams);
    const setProductListQueryParams = useStore(state => state.setProductListQueryParams);

    const { data: productListResponse, isLoading } = useGetProductList(productListQueryParams);

    return (
        <DashboardLayout>
            <div className="grid grid-cols-3 gap-8 mb-16">
                <div className="stats shadow-lg">

                    <div className="stat">
                        <div className="stat-title">Category Count</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                </div>
                <div className="stats shadow-lg">

                    <div className="stat">
                        <div className="stat-title">Size Count</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                </div>
                <div className="stats shadow-lg">

                    <div className="stat">
                        <div className="stat-title">Color Count</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                </div>
            </div>

            <div className="flex items-center justify-between mb-10">
                <SearchInput
                    value={productListQueryParams.search}
                    onChange={(value) => setProductListQueryParams({ page: 1, search: value })}
                />

                <PrimaryButton
                    onClick={() => setShowingCreateProductDrawer(true)}
                >
                    Add New
                </PrimaryButton>
            </div>

            <ProductsTable />

            <CreateProductDrawer />
            <CreateCategoryDrawer />
        </DashboardLayout>
    )
}

export default ProductHomePage;