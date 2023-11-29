import React from 'react'

type TdProps = React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;

const Td = ({ ...props }: TdProps) => {
    return (
        <td {...props} />
    )
}

export default Td;