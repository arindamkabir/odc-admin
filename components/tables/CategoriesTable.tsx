import React from 'react'
import Table from '../common/Table'
import TFoot from '../common/table/TFoot'
import Tr from '../common/table/Tr'
import Th from '../common/table/Th'
import THead from '../common/table/THead'
import TBody from '../common/table/TBody'
import Td from '../common/table/Td'
import useProductStore from '@/store/productStore'
import { useGetProductList } from '@/hooks/queries/product/useGetProductList'
import Pagination from '../common/pagination/Pagination'
import { useGetCategoryList } from '@/hooks/queries/category/useGetCategoryList'
import { formatISO } from 'date-fns'
import { formatISOString } from '@/utils/dateTime'

const CategoriesTable = () => {
    const categoryListQueryParams = useProductStore(state => state.categoryListQueryParams);
    const setCategoryListQueryParams = useProductStore(state => state.setCategoryListQueryParams);

    const { data: categoryListResponse, isPending } = useGetCategoryList(categoryListQueryParams);

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </Th>
                        <Th>Name</Th>
                        <Th>Parent</Th>
                        <Th># of Products</Th>
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {
                        categoryListResponse?.data.map(category =>
                            <Tr key={`category-table-${category.slug}-${category.id}`}>
                                <Th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </Th>
                                <Td>{category.name}</Td>
                                <Td>{category.parent?.name ?? '-'}</Td>
                                <Td>{category.products_count}</Td>
                                <Td>{category?.updated_at ? formatISOString(category.updated_at, "PP") : '-'}</Td>
                                <Td>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </Td>
                            </Tr>
                        )}

                </TBody>
                <TFoot>
                    <Tr>
                        <Th></Th>
                        <Th>Image</Th>
                        <Th>SKU</Th>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>

            <Pagination
                page={categoryListResponse?.current_page}
                pageLinks={categoryListResponse?.links}
                prevPageUrl={categoryListResponse?.prev_page_url}
                nextPageUrl={categoryListResponse?.next_page_url}
                onChange={(page) => setCategoryListQueryParams({ ...categoryListQueryParams, page: page })}
            />

        </>
    )
}

export default CategoriesTable