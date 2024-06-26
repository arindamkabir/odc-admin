import { PaginatedResponse, PaginationLink } from "@/types/Response"
import { Dispatch, SetStateAction, useContext } from "react"

export type PaginationProps = {
    page?: number,
    pageLinks?: PaginationLink[],
    prevPageUrl?: string | null,
    nextPageUrl?: string | null,
    onChange: (page: number) => void
}

const Pagination = ({ page, onChange, pageLinks, prevPageUrl, nextPageUrl }: PaginationProps) => {
    const handleClick = (link: PaginationLink) => {
        if (link.label && page)
            onChange(Number(link.label))
    }

    const handlePreviousClick = () => {
        if (prevPageUrl && page)
            onChange(page - 1)
    };

    const handleNextClick = () => {
        if (nextPageUrl && page)
            onChange(page + 1)
    };


    if (page && (pageLinks !== undefined && pageLinks !== null)) {
        return (
            <nav
                aria-label="Pagination"
                className="flex justify-center px-4 mx-auto mt-6 space-x-2 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
            >
                <div className="min-w-0">
                    <button
                        onClick={() => handlePreviousClick()}
                        className={`inline-flex items-center px-4 h-10 border-b-2
                    ${prevPageUrl
                                ? 'border-transparent hover:border-primary-500 focus:outline-none focus:border-primary-600 dark:text-gray-200 '
                                : 'dark:text-gray-600 border-transparent cursor-default'}`}
                    >
                        Previous
                    </button>
                </div>
                <div className="hidden space-x-2 sm:flex">
                    {pageLinks.filter((element) => (!isNaN(Number(element.label)))).map((link) => (
                        <button
                            onClick={() => handleClick(link)}
                            key={`page-${link.label}`}
                            className={`inline-flex items-center px-4 h-10 border-b-2
                        ${link.active
                                    ? 'border-primary-600' : 'border-transparent'}
                        ${(!link.url)
                                    ? 'dark:text-gray-600 cursor-default'
                                    : 'hover:border-primary-500 focus:outline-none focus:border-primary-600 dark:text-gray-200'}`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
                <div className="min-w-0">
                    <button
                        onClick={() => handleNextClick()}
                        className={`inline-flex items-center px-4 h-10 border-b-2
                    ${nextPageUrl
                                ? 'border-transparent hover:border-primary-500 focus:outline-none focus:border-primary-600 dark:text-gray-200 '
                                : 'dark:text-gray-600 border-transparent cursor-default'}`}
                    >
                        Next
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <nav
            aria-label="Pagination"
            className="flex justify-center px-4 mx-auto mt-6 space-x-2 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
        >
            <div className="min-w-0">
                <button
                    className={`inline-flex items-center px-4 h-10 border-b-2 dark:text-gray-600 border-transparent cursor-default`}
                >
                    Previous
                </button>
            </div>
            <div className="hidden space-x-2 sm:flex">
                <button
                    className={`inline-flex items-center px-4 h-10 border-b-2 border-transparent dark:text-gray-600 cursor-default`}
                >
                    1
                </button>
                <button
                    className={`inline-flex items-center px-4 h-10 border-b-2 border-transparent dark:text-gray-600 cursor-default`}
                >
                    2
                </button>
                <button
                    className={`inline-flex items-center px-4 h-10 border-b-2 border-transparent dark:text-gray-600 cursor-default`}
                >
                    3
                </button>
            </div>
            <div className="min-w-0">
                <button
                    className={`inline-flex items-center px-4 h-10 border-b-2 dark:text-gray-600 border-transparent cursor-default`}
                >
                    Next
                </button>
            </div>
        </nav>
    );
}

export default Pagination;