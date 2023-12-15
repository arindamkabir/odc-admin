import React from 'react'
import Tr from './Tr'
import Td from './Td'

const TableEmpty = () => {
    return (
        <Tr key={`empty-table-row`}>
            <Td colSpan={100} className='!py-[.8rem]'>
                <h2 className='min-h-[50vh] flex justify-center items-center'>
                    No data found.
                </h2>
            </Td>
        </Tr>
    )
}

export default TableEmpty