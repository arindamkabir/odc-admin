import React from 'react'

const PageLoader = () => {
    return (
        <div className='fixed inset-0 z-50 h-screen w-screen flex items-center justify-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    )
}

export default PageLoader