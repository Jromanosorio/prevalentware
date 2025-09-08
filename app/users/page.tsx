"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { GoAlert, GoPencil, GoTrash } from "react-icons/go"
import EditUserForm from "../components/form/edit.user"
import { User } from "../interfaces/User"
import { useSession } from "@/lib/auth-client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Users() {
    const { data: session, refetch } = useSession()

    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User>()

    const getUsers = async () => {
        const resp = await fetch("/api/users")

        if (resp.ok) {
            const data = await resp.json()
            setUsers(data)
        }
    }

    const handleUpdate = async (id: string, name: string, role: string) => {
        const res = await fetch('/api/users/', {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, role })
        })

        if (res.ok) {
            alert("Usuario actualizado ✅")
        } else {
            alert("Error al actualizar ❌")
        }

        handleCancel()
        refetch()
        getUsers()
    }

    const handleCancel = () => {
        setSelectedUser(undefined)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
            {
                session?.user.role.toLowerCase() !== 'admin' ? <Alert variant="destructive">
                    <GoAlert />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        Parece que no tienes permiso para hacer esto
                    </AlertDescription>
                </Alert> : <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">Nombre</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Rol</TableHead>
                                <TableHead className="font-semibold">Telefono</TableHead>
                                <TableHead className="font-semibold text-center">Opciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell className="flex justify-center gap-4">
                                        <GoPencil className="cursor-pointer" color="blue" onClick={() => setSelectedUser(user)} />
                                        <GoTrash className="cursor-not-allowed text-gray-300" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {selectedUser && <EditUserForm key={selectedUser.id} data={selectedUser} onUpdateFn={handleUpdate} onCancelFn={handleCancel} />}
                </div>
            }
        </div>
    )
}