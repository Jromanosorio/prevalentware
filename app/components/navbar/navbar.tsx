import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
            <button><a href="" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">Iniciar sesion</a></button>
        </nav>
    )
}