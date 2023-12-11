import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import axios from "@/lib/axios";
import Sidebar from "./Navigation/Sidebar";

type DashboardLayoutProps = {
    header?: string;
    children: React.ReactNode;
}

const DashboardLayout = ({ header, children }: DashboardLayoutProps) => {
    const router = useRouter();

    const { user, isPending, logout } = useAuth("auth");
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // const { user, isPending, logout } = useAuth("auth");

    // const [theme, setTheme] = useState<"dark" | "lofi">("dark");

    // // update state on toggle
    // const handleToggle = (checked: boolean) => {
    //     if (checked) {
    //         setTheme("lofi");
    //     } else {
    //         setTheme("dark");
    //     }
    // };

    // // set theme state in localstorage on mount & also update localstorage on state change
    // useEffect(() => {
    //     localStorage.setItem("theme", theme);
    //     const localTheme = localStorage.getItem("theme");
    //     // add custom data-theme attribute to html tag required to update theme using DaisyUI
    //     if (localTheme)
    //         document.documentElement.setAttribute("data-theme", localTheme);
    // }, [theme]);

    return (
        <>
            {
                // (!user || isPending)
                //     ?
                // <main className="flex h-screen w-screen justify-center items-center">
                //     <span className="loading loading-infinity loading-lg"></span>
                // </main>
                // :
                <div className="min-h-screen">
                    <nav className="bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                {/* <ResponsiveNavLink href="/dashboard" active={router.pathname === '/dashboard'}>
                                    Dashboard
                                </ResponsiveNavLink> */}
                            </div>

                            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                        {/* {user.name} */}
                                    </div>
                                    {/* <div className="text-sm font-medium text-gray-500">arindamkabir@gmail.com</div> */}
                                </div>

                                {/* <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href="/">Profile</ResponsiveNavLink>
                                    <ResponsiveNavButton onClick={logout}>
                                        Log Out
                                    </ResponsiveNavButton>
                                </div> */}
                            </div>
                        </div>
                    </nav>



                    <div className="flex flex-col w-full overflow-y-hidden md:flex-row md:h-screen">
                        <Sidebar />

                        <div className="flex-auto w-full min-h-screen overflow-y-auto">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="px-2 py-6 sm:px-2 md:px-6 lg:px-12 xl:px-20">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium tracking-widest uppercase">
                                                {header && (
                                                    <header className="">
                                                        <h2 className="text-xl font-semibold leading-tight">
                                                            {header}
                                                        </h2>
                                                    </header>
                                                )}
                                            </h3>

                                            <div className="flex items-center sm:hidden">
                                                <button
                                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 dark:focus:text-gray-400"
                                                >
                                                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                        <path
                                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                        <path
                                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>


                                            <div className="items-center hidden space-x-4 md:flex">
                                                {/* @livewire('admin.notification-icon') */}

                                                {/* <div className="hidden sm:flex sm:items-center sm:ml-6">
                                                    <div className="relative ml-3">
                                                        <Dropdown
                                                            align="right"
                                                            width="48"
                                                            trigger={
                                                                <button className="flex items-center text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                                                                    <div>{user?.name}</div>

                                                                    <div className="ml-1">
                                                                        <svg
                                                                            className="w-4 h-4 fill-current"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 20 20">
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </button>
                                                            }>
                                                            <DropdownButton onClick={logout}>
                                                                Logout
                                                            </DropdownButton>
                                                        </Dropdown>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-10 sm:px-2 md:px-6 lg:px-12 xl:px-20">
                                        {children}
                                    </div>
                                </div>


                                <div
                                    className="flex justify-between px-2 py-4 sm:px-2 md:px-6 lg:px-12 xl:px-20">
                                    <p className="text-xs text-gray-400">All rights reserved.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            }
        </>
    )
}

export default DashboardLayout