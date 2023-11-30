import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CategoriesTable from '@/components/tables/CategoriesTable';
import SearchInput from '@/components/common/SearchInput';
import useProductStore from '@/store/productStore';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Head from 'next/head';
import CreateCategoryDrawer from '@/components/drawers/CreateCategoryDrawer';
import SEO from '@/components/common/SEO';

const CategoryIndexPage = () => {
    const setShowingCreateCategoryDrawer = useProductStore(state => state.setShowingCreateCategoryDrawer);
    const categoryListQueryParams = useProductStore(state => state.categoryListQueryParams);
    const setCategoryListQueryParams = useProductStore(state => state.setCategoryListQueryParams);

    return (
        <DashboardLayout header='Category Index'>
            <SEO title="Category Index" />
            <div className="flex items-center justify-between mb-10">
                <SearchInput
                    value={categoryListQueryParams.search}
                    onChange={(value) => setCategoryListQueryParams({ page: 1, search: value })}
                />

                <PrimaryButton
                    onClick={() => setShowingCreateCategoryDrawer(true)}
                >
                    Add New
                </PrimaryButton>
            </div>
            <CategoriesTable />

            <CreateCategoryDrawer />
        </DashboardLayout>
    )
}

export default CategoryIndexPage;