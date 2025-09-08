"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client";
import { useState } from "react";

interface formProps {
  data: {
    id: string
    name: string
    role: string
  };
  onCancelFn: () => void;
}

export default function EditUserForm({data, onCancelFn}: formProps) {
  const [id, setId] = useState(data.id)
  const [name, setName] = useState(data.name)
  const [role, setRole] = useState(data.role)

  console.log({id, name, role})

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/users/', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id, name, role})
    }) 

    if (res.ok) {
      alert("Usuario actualizado ✅")
    } else {
      alert("Error al actualizar ❌")
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto my-20">
      <CardHeader>
        <CardTitle>Editar usuario</CardTitle>
        <CardDescription>
          Edita los datos del usuario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="name"
                placeholder=""
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)} 
                value={name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <Input id="role" type="role" required onChange={(e) => setRole(e.target.value)} value={role}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleUpdate}>
          Guardar
        </Button>
        <Button variant="outline" type="button" className="w-full" onClick={onCancelFn}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}
