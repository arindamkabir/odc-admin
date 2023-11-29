import React from 'react'

type TrProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

const Tr = ({ ...props }: TrProps) => {
    return (
        <tr {...props} />
    )
}

export default Tr;