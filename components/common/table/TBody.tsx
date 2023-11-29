import React from 'react'

type TBodyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

const TBody = ({ ...props }: TBodyProps) => {
    return (
        <tbody {...props} />
    )
}

export default TBody