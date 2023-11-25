import React from 'react'

const Label = ({ className = "", children }: { className?: string, children: React.ReactNode }) => {
    return (
        <label className='text-sm label'>
            <span className="label-text">{children}</span>
        </label>
    )
}

export default Label