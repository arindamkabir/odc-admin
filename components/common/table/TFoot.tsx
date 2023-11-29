import React from 'react'

type TFootProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

const TFoot = ({ ...props }: TFootProps) => {
    return (
        <tfoot {...props} />
    )
}

export default TFoot;