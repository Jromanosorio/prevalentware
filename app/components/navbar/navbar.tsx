import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";

export default function Navbar() {

    const session = useSession()

    return (
        <nav className="flex justify-between items-center gap-10 border-b-2 p-6">
            <Link href={'/'}>
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </Link>
            <div className="flex gap-x-4 font-semibold">
                <ul><Link href={'/finance'}>Ingresos y gastos</Link></ul>
                <ul><Link href={'/users'}>Usuarios</Link></ul>
                <ul><Link href={'/reports'}>Reportes</Link></ul>
            </div>
            <button onClick={() => signOut()} className="flex items-center gap-4">
                <p className="font-semibold">{session.data?.user.name}</p>
                <a className="rounded-full flex items-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 px-4 cursor-pointer">
                    <GoSignOut size={20}/> <p>Salir</p>
                </a>
            </button>
        </nav>
    )
}