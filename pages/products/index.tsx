import SearchInput from '@/components/common/SearchInput';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import Pagination from '@/components/common/pagination/Pagination';
import CreateCategoryDrawer from '@/components/drawers/CreateCategoryDrawer';
import CreateProductDrawer from '@/components/drawers/CreateProductDrawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetProductList } from '@/hooks/queries/useGetProductList'
import useProductStore from '@/store/productStore';
import React from 'react'

const ProductHomePage = () => {
    const setShowingCreateProductDrawer = useProductStore(state => state.setShowingCreateProductDrawer);
    const productListQueryParams = useProductStore(state => state.productListQueryParams);
    const setProductListQueryParams = useProductStore(state => state.setProductListQueryParams);

    const { data: productListResponse, isLoading } = useGetProductList(productListQueryParams);

    console.log(productListResponse)

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

            <div className="overflow-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productListResponse?.data.map(product =>
                                <tr key={`product-table-${product.slug}`}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td><img src={product.primary_image.full_url} alt={product.name} className='w-32' /></td>
                                    <td>{product.SKU}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.price}</td>
                                    <td>0</td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </td>
                                </tr>
                            )}

                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>


            <>
                {
                    productListResponse?.data ?
                        <Pagination
                            page={productListResponse?.current_page}
                            pageLinks={productListResponse?.links}
                            lastPage={productListResponse?.last_page}
                            prevPageUrl={productListResponse?.prev_page_url}
                            nextPageUrl={productListResponse?.next_page_url}
                            onChange={(page) => setProductListQueryParams({ ...productListQueryParams, page: page })}
                        />
                        :
                        <></>
                }
            </>



            <CreateProductDrawer />
            <CreateCategoryDrawer />
        </DashboardLayout>
    )
}

export default ProductHomePage;