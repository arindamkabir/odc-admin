import React from 'react'
import Table from '../common/Table'
import TFoot from '../common/table/TFoot'
import Tr from '../common/table/Tr'
import Th from '../common/table/Th'
import THead from '../common/table/THead'
import TBody from '../common/table/TBody'
import Td from '../common/table/Td'
import useStore from '@/store/store'
import { useGetAllStocks } from '@/hooks/queries/stocks/useGetAllStocks'
import { Product } from '@/types/Product'
import TableRowSkeleton from '../common/table/TableSkeleton'
import TableEmpty from '../common/table/TableEmpty'

const ProductStocksTable = ({ product_id }: { product_id: Product["id"] }) => {
    const { data: productStocks, isFetching } = useGetAllStocks({ id: product_id });
    const showEditStockDrawer = useStore(state => state.showEditStockDrawer);
    const setEditingStock = useStore(state => state.setEditingStock);

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
                        <Th>Color</Th>
                        <Th>Size</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                        <Th>On Sale</Th>
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {isFetching || !productStocks ?
                        <TableRowSkeleton />
                        :
                        productStocks.length > 0 ?
                            productStocks?.map(item =>
                                <Tr key={`product-stock-table-${product_id}-${item.id}`}>
                                    <Th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </Th>
                                    <Td>{item.color?.name ?? '-'}</Td>
                                    <Td>{item.size?.name ?? '-'}</Td>
                                    <Td>{item.quantity ?? '-'}</Td>
                                    <Td>৳ {item.price ?? '-'}</Td>
                                    <Td>{item.sales_price ? `৳ ${item.sales_price}` : 'Not on sale'}</Td>
                                    <Td>{item.updated_at}</Td>
                                    <Td className='flex items-center space-x-3'>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                setEditingStock(item);
                                                showEditStockDrawer(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {/* <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                        }}
                                    >
                                        Delete
                                    </button> */}
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
                        <Th>Color</Th>
                        <Th>Size</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                        <Th>On Sale</Th>
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>
        </>
    )
}

export default ProductStocksTable