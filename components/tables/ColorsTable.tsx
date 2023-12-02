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
import { useGetColorList } from '@/hooks/queries/color/useGetColorLists'

const ColorsTable = () => {
    const colorListQueryParams = useStore(state => state.colorListQueryParams);
    const setColorListQueryParams = useStore(state => state.setColorListQueryParams);
    const showEditColorDrawer = useStore(state => state.showEditColorDrawer);
    const setEditingColor = useStore(state => state.setEditingColor);

    const { data: colorListResponse, isPending } = useGetColorList(colorListQueryParams);

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
                        <Th>Color</Th>
                        {/* <Th># of Products</Th> */}
                        <Th>Last Updated</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
                    {
                        colorListResponse?.data.map(color =>
                            <Tr key={`color-table-${color.slug}-${color.id}`}>
                                <Th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </Th>
                                <Td>{color.name}</Td>
                                <Td>
                                    <div className='h-6 w-6 rounded-md' style={{ backgroundColor: color.hex_code }}>

                                    </div>
                                </Td>
                                {/* <Td>{color.products_count}</Td> */}
                                <Td>{color?.updated_at ? formatISOString(color.updated_at, "PP") : '-'}</Td>
                                <Td className='flex items-center space-x-3'>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            setEditingColor(color);
                                            showEditColorDrawer(true);
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
                        )}
                </TBody>
                <TFoot>
                    <Tr>
                        <Th></Th>
                        <Th>Name</Th>
                        <Th>Color</Th>
                        <Th>Last Updated At</Th>
                        <Th></Th>
                    </Tr>
                </TFoot>
            </Table>

            <Pagination
                page={colorListResponse?.current_page}
                pageLinks={colorListResponse?.links}
                prevPageUrl={colorListResponse?.prev_page_url}
                nextPageUrl={colorListResponse?.next_page_url}
                onChange={(page) => setColorListQueryParams({ ...colorListQueryParams, page: page })}
            />

        </>
    )
}

export default ColorsTable