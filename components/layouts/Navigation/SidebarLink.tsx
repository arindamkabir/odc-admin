import Link from 'next/link';

type SidebarLinkProps = {
    href: string,
    active: boolean,
    children: React.ReactNode;
}

export default function SidebarLink({ href, active, children }: SidebarLinkProps) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'px-4 py-4 text-sm tracking-wide font-medium bg-primary-700 text-gray-50 dark:text-gray-200 focus:outline-none focus:shadow-outline transition duration-200'
                    : 'px-4 py-4 text-sm tracking-wide font-medium bg-transparent hover:bg-primary-600 focus:bg-primary-600  focus:text-gray-50 hover:text-gray-50 text-gray-500 focus:outline-none focus:shadow-outline transition duration-200'
            }
        >
            {children}
        </Link>
    );
}
