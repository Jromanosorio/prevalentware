"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { GoPencil, GoTrash } from "react-icons/go"
import EditUserForm from "../components/form/edit.user"

interface User {
    id: string;
    name: string;
    role: string;
}

export default function Users() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState<User>()

    const getUsers = async() => {
        const resp = await fetch("/api/users")

        if(resp.ok){
            const data = await resp.json()
            setUsers(data)
            console.log(data)
        }
    }

    const handleCancel = () => {
        setSelectedUser(undefined)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
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
                                <GoTrash className="cursor-not-allowed text-gray-300"/> 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            { selectedUser && <EditUserForm key={selectedUser.id} data={selectedUser} onCancelFn={handleCancel} /> }
        </div>
    )
}