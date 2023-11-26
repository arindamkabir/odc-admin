import { useAuth } from "@/hooks/useAuth";

type GuestLayoutProps = {
    children: React.ReactNode
}

const GuestLayout = ({ children }: GuestLayoutProps) => {
    const { user, isPending } = useAuth("guest");

    return (
        <>
            {
                (isPending)
                    ?
                    <main className="flex h-screen w-screen justify-center items-center">
                        <span className="loading loading-infinity loading-lg"></span>
                    </main>
                    :
                    <main className="flex flex-col justify-center items-center w-full overflow-y-hidden md:flex-row md:h-screen">
                        {children}
                    </main>
            }
        </>
    )
}

export default GuestLayout;