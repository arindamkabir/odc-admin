import SearchInput from '@/components/common/SearchInput';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import CreateProductDrawer from '@/components/drawers/CreateProductDrawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGetProductList } from '@/hooks/queries/useGetProductList'
import useProductStore from '@/store/productStore';
import React from 'react'

const ProductHomePage = () => {
    const { data: productListResponse, isLoading } = useGetProductList();

    const setShowingCreateProductDrawer = useProductStore(state => state.setShowingCreateProductDrawer);

    console.log(productListResponse)

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-10">
                <SearchInput />

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

            <CreateProductDrawer />
        </DashboardLayout>
    )
}

export default ProductHomePage;