import React from 'react'
import Table from '../common/Table'
import TFoot from '../common/table/TFoot'
import Tr from '../common/table/Tr'
import Th from '../common/table/Th'
import THead from '../common/table/THead'
import TBody from '../common/table/TBody'
import Td from '../common/table/Td'
import useStore from '@/store/store'
import Pagination from '../common/pagination/Pagination'
import { useGetOrderList } from '@/hooks/queries/order/useGetOrderList'
import TableRowSkeleton from '../common/table/TableSkeleton'
import TableEmpty from '../common/table/TableEmpty'
import Link from 'next/link'
import { STATUS_CLASSES } from '@/config/order'

const OrdersTable = () => {
    const orderListQueryParams = useStore(state => state.orderListQueryParams);
    const setOrderListQueryParams = useStore(state => state.setOrderListQueryParams);

    const { data: orderListResponse, isFetching } = useGetOrderList(orderListQueryParams);

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
                        <Th>ID</Th>
                        <Th>Status</Th>
                        <Th>Subtotal</Th>
                        <Th>Total</Th>
                        <Th>Coupon</Th>
                        <Th>Phone</Th>
                        <Th>Shipping Address</Th>
                        <Th></Th>
                    </Tr>
                </THead>

                <TBody>
                    {isFetching || !orderListResponse ?
                        <TableRowSkeleton />
                        :
                        orderListResponse.data.length > 0 ?
                            orderListResponse?.data.map(order =>
                                <Tr key={`order-table-${order.id}`}>
                                    <Th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </Th>
                                    <Td>{order.id}</Td>
                                    <Td className='flex'>
                                        <div className={`text-xs uppercase px-2 py-0.5 rounded-xl ${STATUS_CLASSES[order.status]} text-white tracking-wide`}>{order.status}</div>
                                    </Td>
                                    <Td>৳ {order.subtotal}</Td>
                                    <Td>৳ {order.total}</Td>
                                    <Td>{order.coupon_id ?? '-'}</Td>
                                    <Td>{order.shipping?.phone}</Td>
                                    <Td>Shipping Address</Td>
                                    <Td>
                                        <Link href={`/orders/${order.id}`}>
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
                        <Th>ID</Th>
                        <Th>Status</Th>
                        <Th>Subtotal</Th>
                        <Th>Total</Th>
                        <Th>Coupon</Th>
                        <Th>Shipping Address</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>

            <Pagination
                page={orderListResponse?.current_page}
                pageLinks={orderListResponse?.links}
                prevPageUrl={orderListResponse?.prev_page_url}
                nextPageUrl={orderListResponse?.next_page_url}
                onChange={(page) => setOrderListQueryParams({ ...orderListQueryParams, page: page })}
            />

        </>
    )
}

export default OrdersTable;