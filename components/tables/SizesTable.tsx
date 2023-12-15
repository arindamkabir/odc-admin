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
import { formatISOString } from '@/utils/dateTime'
import { useGetSizeList } from '@/hooks/queries/size/useGetSizeList'
import TableRowSkeleton from '../common/table/TableSkeleton'
import TableEmpty from '../common/table/TableEmpty'

const SizesTable = () => {
    const sizeListQueryParams = useStore(state => state.sizeListQueryParams);
    const setSizeListQueryParams = useStore(state => state.setSizeListQueryParams);
    const setEditingSize = useStore(state => state.setEditingSize);
    const showEditSizeDrawer = useStore(state => state.showEditSizeDrawer);

    const { data: sizeListResponse, isFetching } = useGetSizeList(sizeListQueryParams);

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
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {isFetching || !sizeListResponse ?
                        <TableRowSkeleton />
                        :
                        sizeListResponse.data.length > 0 ?
                            sizeListResponse?.data.map(size =>
                                <Tr key={`size-table-${size.slug}-${size.id}`}>
                                    <Th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </Th>
                                    <Td>{size.name}</Td>
                                    <Td>{size?.updated_at ? formatISOString(size.updated_at, "PP") : '-'}</Td>
                                    <Td className='flex items-center space-x-3'>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                setEditingSize(size);
                                                showEditSizeDrawer(true);
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
                        <Th>Last Updated At</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>

            <Pagination
                page={sizeListResponse?.current_page}
                pageLinks={sizeListResponse?.links}
                prevPageUrl={sizeListResponse?.prev_page_url}
                nextPageUrl={sizeListResponse?.next_page_url}
                onChange={(page) => setSizeListQueryParams({ ...sizeListQueryParams, page: page })}
            />

        </>
    )
}

export default SizesTable;