import React from 'react'
import Table from '../common/Table'
import TFoot from '../common/table/TFoot'
import Tr from '../common/table/Tr'
import Th from '../common/table/Th'
import THead from '../common/table/THead'
import TBody from '../common/table/TBody'
import Td from '../common/table/Td'
import useStore from '@/store/store'
import { useGetProductList } from '@/hooks/queries/product/useGetProductList'
import Pagination from '../common/pagination/Pagination'
import Link from 'next/link'
import TableRowSkeleton from '../common/table/TableSkeleton'
import Skeleton from 'react-loading-skeleton'
import TableEmpty from '../common/table/TableEmpty'

const ProductsTable = () => {
    const productListQueryParams = useStore(state => state.productListQueryParams);
    const setProductListQueryParams = useStore(state => state.setProductListQueryParams);

    const { data: productListResponse, isFetching } = useGetProductList(productListQueryParams);

    console.log(process.env.NEXT_PUBLIC_APP_ORIGIN)

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
                        <Th>Image</Th>
                        <Th>SKU</Th>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {isFetching || !productListResponse ?
                        <TableRowSkeleton />
                        :
                        productListResponse.data.length > 0 ?
                            productListResponse?.data.map(product =>
                                <Tr key={`product-table-${product.slug}`}>
                                    <Th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </Th>
                                    <Td><img src={product.primary_image.full_url} alt={product.name} className='w-32' /></Td>
                                    <Td>{product.SKU}</Td>
                                    <Td>{product.name}</Td>
                                    <Td>{product.category.name}</Td>
                                    <Td>{product.price}</Td>
                                    <Td>0</Td>
                                    <Td>
                                        <Link href={`/products/${product.slug}`}>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </Link>
                                    </Td>
                                </Tr>
                            )

                            :
                            <TableEmpty />
                    }
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
                page={productListResponse?.current_page}
                pageLinks={productListResponse?.links}
                prevPageUrl={productListResponse?.prev_page_url}
                nextPageUrl={productListResponse?.next_page_url}
                onChange={(page) => setProductListQueryParams({ ...productListQueryParams, page: page })}
            />

        </>
    )
}

export default ProductsTable