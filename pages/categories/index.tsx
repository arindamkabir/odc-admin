import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CategoriesTable from '@/components/tables/CategoriesTable';
import SearchInput from '@/components/common/SearchInput';
import useStore from '@/store/store';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Head from 'next/head';
import CreateCategoryDrawer from '@/components/drawers/category/CreateCategoryDrawer';
import SEO from '@/components/common/SEO';
import EditCategoryDrawer from '@/components/drawers/category/EditCategoryDrawer';

const CategoryIndexPage = () => {
    const setShowingCreateCategoryDrawer = useStore(state => state.setShowingCreateCategoryDrawer);
    const categoryListQueryParams = useStore(state => state.categoryListQueryParams);
    const setCategoryListQueryParams = useStore(state => state.setCategoryListQueryParams);

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
            <EditCategoryDrawer />
        </DashboardLayout>
    )
}

export default CategoryIndexPage;