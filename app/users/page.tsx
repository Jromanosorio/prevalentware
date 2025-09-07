import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GoPencil, GoTrash } from "react-icons/go"

const users = [
    {
        id: 1,
        name: "Laura Garcia",
        email: "lgarcia@gmail.com",
        phone: "3100003021"
    },
    {
        id: 2,
        name: "Pedro Alvarez",
        email: "pedro.alvarez@gmail.com",
        phone: "3224127865"
    },
    {
        id: 3,
        name: "Maria Lopez",
        email: "marial123@outlook.com",
        phone: "3017482902"
    },
    {
        id: 4,
        name: "Juan Rodriguez",
        email: "juanchorod@gmail.com",
        phone: "3048274160"
    }
]

export default function Users() {
    return (
        <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Nombre</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Telefono</TableHead>
                        <TableHead className="font-semibold text-center">Opciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell className="flex justify-center gap-4">
                                <GoPencil className="cursor-pointer" color="blue" />
                                <GoTrash className="cursor-not-allowed text-gray-300"/> 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}