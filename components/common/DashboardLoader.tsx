import React from 'react'

const DashboardLoader = () => {
    return (
        <div className='absolute z-50 h-full w-full flex items-center justify-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    )
}

export default DashboardLoader