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
import { formatISO } from 'date-fns'
import { formatISOString } from '@/utils/dateTime'
import TableRowSkeleton from '../common/table/TableSkeleton'
import TableEmpty from '../common/table/TableEmpty'
import { useGetCouponList } from '@/hooks/queries/coupon/useGetCouponList'

const CouponsTable = () => {
    const couponListQueryParams = useStore(state => state.couponListQueryParams);
    const setCouponListQueryParams = useStore(state => state.setCouponListQueryParams);
    const showEditCouponDrawer = useStore(state => state.showEditCouponDrawer);
    const setEditingCoupon = useStore(state => state.setEditingCoupon);

    const { data: couponListResponse, isFetching } = useGetCouponList(couponListQueryParams);

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
                        <Th>Code</Th>
                        <Th># of Orders</Th>
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {isFetching || !couponListResponse ?
                        <TableRowSkeleton />
                        :
                        couponListResponse.data.length > 0 ?
                            couponListResponse.data.map(coupon =>
                                <Tr key={`coupon-table-${coupon.code}-${coupon.id}`}>
                                    <Th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </Th>
                                    <Td>{coupon.code}</Td>
                                    <Td>{coupon.orders_count}</Td>
                                    <Td>{coupon?.updated_at ? formatISOString(coupon.updated_at, "PP") : '-'}</Td>
                                    <Td className='flex items-center space-x-3'>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                setEditingCoupon(coupon);
                                                showEditCouponDrawer(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                            }}
                                        >
                                            Delete
                                        </button>
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
                        <Th>Name</Th>
                        <Th>Parent</Th>
                        <Th># of Products</Th>
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>

            <Pagination
                page={couponListResponse?.current_page}
                pageLinks={couponListResponse?.links}
                prevPageUrl={couponListResponse?.prev_page_url}
                nextPageUrl={couponListResponse?.next_page_url}
                onChange={(page) => setCouponListQueryParams({ ...couponListQueryParams, page: page })}
            />

        </>
    )
}

export default CouponsTable;