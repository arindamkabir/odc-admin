import { CogIcon, CreditCardIcon, HomeIcon, ShoppingBagIcon, SwatchIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react"
// import ApplicationLogo from "../ApplicationLogo";
import NavLink from "./NavLink";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-none hidden shadow md:block">
            <div className={(open ? "w-72" : "w-20") + " overflow-x-hidden overflow-y-hidden transition-all duration-300 border-r bg-base-300 border-gray-500 dark:border-gray-700"}>
                <nav
                    className={(open ? "space-y-1" : "space-y-1.5") + " flex flex-col flex-grow flex-shrink-0 overflow-x-hidden md:min-h-screen md:pb-0 md:overflow-y-auto"}
                    onMouseOver={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <div className="flex flex-col">
                        <div className={(open ? "justify-between" : "justify-center") + " flex flex-row items-center flex-shrink-0 px-8 py-6"}>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center shrink-0">
                                    <Link href="/">
                                        {/* <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9 dark:text-gray-200" /> */}
                                    </Link>
                                </div>

                                <div className={(open ? "block" : "hidden") + ' mr-2 text-lg font-medium tracking-widest rounded-lg focus:outline-none focus:shadow-outline whitespace-nowrap uppercase'}>
                                    Admin
                                </div>
                            </div>
                            {/* <button
                                className="text-gray-500 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-600 rounded-lg focus:outline-none focus:shadow-outline px-1.5 py-0.5 transition"
                                onClick={() => setOpen(!open)}>
                                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                    <path fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                        clipRule="evenodd"></path>

                                </svg>
                            </button> */}
                        </div>
                    </div>

                    <div className="flex flex-col py-5">

                        <SidebarLink href="/" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <HomeIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Dashboard</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink href="/products" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <ShoppingBagIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Products</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink href="/categories" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <SwatchIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Categories</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink href="/orders" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <CreditCardIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Orders</span>
                            </div>
                        </SidebarLink>

                        {/* <SidebarLink href="/" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <UsersIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Customers</span>
                            </div>
                        </SidebarLink>

                        <SidebarLink href="/" active={false}>
                            <div className={(open ? 'pl-5' : 'justify-center') + " flex items-center space-x-5"}>
                                <CogIcon className="w-6 h-6" />
                                <span className={open ? 'block' : 'hidden'}>Settings</span>
                            </div>
                        </SidebarLink> */}
                    </div>
                </nav>
            </div>
        </div>
    )
}
