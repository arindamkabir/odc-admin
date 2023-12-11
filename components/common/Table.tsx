import React from 'react'

type TableProps = {
    containerClassName?: string,
    tableClassName?: string,
    children: React.ReactElement | React.ReactElement[]
}

const Table = ({ containerClassName, tableClassName, children }: TableProps) => {
    return (
        <div className={`overflow-x-auto ${containerClassName}`}>
            <table className={`table ${tableClassName}`}>
                {children}
            </table>
        </div>
    )
}

export default Table;