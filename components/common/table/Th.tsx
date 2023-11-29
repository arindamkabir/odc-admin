import React from 'react'

type ThProps = React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;

const Th = ({ ...props }: ThProps) => {
    return (
        <th {...props} />
    )
}

export default Th