import Link from 'next/link'
import { useState } from "react"
import { useRouter } from "next/router";
import { HomeIcon } from '@heroicons/react/20/solid';
import { CalculatorIcon, HomeModernIcon, GlobeAsiaAustraliaIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const DashboardSidebar = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-none hidden md:block">
            <div className={(open ? "w-72" : "w-18") + " overflow-x-hidden overflow-y-auto transition-all"}>
                <nav
                    className={(open ? "space-y-1" : "space-y-1.5") + " flex j flex-col justify-between flex-grow flex-shrink-0 overflow-x-hidden md:h-screen md:pb-0 md:overflow-y-auto py-6"}
                // onMouseOver={() => setOpen(true)}
                // onMouseLeave={() => setOpen(false)}
                >
                    <div className="flex flex-col ">
                        <div className={(open ? "justify-between" : "justify-center") + " flex flex-row items-center flex-shrink-0 px-8"}>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center shrink-0">
                                    {/* <Link href="/">
                                        <CalculatorIcon className='h-8 w-8 text-info' /> */}
                                    {/* <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9 dark:text-gray-200" /> */}
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-5">
                        <Link href={'/dashboard'}>
                            <GlobeAsiaAustraliaIcon className='h-7 w-7 text-info' />
                        </Link>
                        <Link href={'/dashboard'}>
                            <CalculatorIcon className='h-7 w-7 text-info' />
                        </Link>
                        <Link href={'/dashboard/habit-tracker'}>
                            <BookOpenIcon className='h-7 w-7 text-info' />
                        </Link>
                    </div>

                    <div></div>
                </nav>
            </div>
        </div>
    )
}

export default DashboardSidebar;
