import React from 'react'

type CardProps = {
    header?: string,
    className?: string,
    noHeaderBorder?: boolean,
    action?: React.ReactNode,
    children: React.ReactNode
}

const Card = ({ header, className, noHeaderBorder, action, children }: CardProps) => {
    return (
        <div className='rounded-md bg-base-300'>
            {
                (header || action) ?
                    <div className={`px-4 ${noHeaderBorder ? 'py-3' : 'py-5 border-b border-neutral'} sm:px-6`}>
                        <div className={`-ml-4 ${noHeaderBorder ? '-mt-2' : '-mt-2'} flex items-center justify-between flex-wrap sm:flex-nowrap`}>
                            {
                                header ?
                                    <div className="ml-4 mt-2">
                                        <h3 className={`${noHeaderBorder ? 'text-base' : 'text-lg'} leading-6 font-medium `}>{header}</h3>
                                    </div>
                                    : null
                            }
                            {
                                action ?
                                    <div className="ml-4 mt-2 flex-shrink-0">
                                        {action}
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    : null
            }

            <div className={`px-4 ${noHeaderBorder ? 'py-3' : 'py-5'} sm:px-6`}>
                {children}
            </div>
        </div>

    )
}

export default Card;