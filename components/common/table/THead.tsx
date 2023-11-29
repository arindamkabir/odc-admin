import React from 'react'

type THeadProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

const THead = ({ ...props }: THeadProps) => {
    return (
        <thead {...props} />
    )
}

export default THead;