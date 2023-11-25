import React from 'react'

type CardProps = {
    className?: string
    children: React.ReactNode
}

const Card = ({ className, children }: CardProps) => {
    return (
        <div className={`bg-base-700 rounded-md p-4`}>
            {children}
        </div>
    )
}

export default Card;