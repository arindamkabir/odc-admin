import React from 'react'
import Tr from './Tr';
import Td from './Td';
import Skeleton from 'react-loading-skeleton'

const filledArr = Array(10).fill(0);

const TableRowSkeleton = () => {
    return (
        <>
            {filledArr.map((item, index) => (
                <Tr key={`skeleton-table-row-${index}`}>
                    <Td colSpan={100} className='!py-[.8rem]'>
                        <Skeleton
                            count={1}
                            height={40}
                            baseColor="#2B323C"
                            highlightColor="#A6ADBB"
                            style={{
                                padding: '1.2rem',
                            }}
                        />
                    </Td>
                </Tr>
            ))}
        </>
    )
}

export default TableRowSkeleton;
