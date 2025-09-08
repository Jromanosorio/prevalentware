"use client";

import { User } from "@/app/interfaces/User";
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
import { signIn, useSession } from "@/lib/auth-client";
import { useState } from "react";

interface formProps {
  data: User
  onUpdateFn: (id: string, name: string, role: string) => void;
  onCancelFn: () => void;
}

export default function EditUserForm({data, onUpdateFn, onCancelFn}: formProps) {

  const [id, setId] = useState(data.id)
  const [name, setName] = useState(data.name)
  const [role, setRole] = useState(data.role)

  const updateData = (user: any) => {
    onUpdateFn(id, name, role)
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
        <Button type="button" className="w-full" onClick={updateData}>
          Guardar
        </Button>
        <Button variant="outline" type="button" className="w-full" onClick={onCancelFn}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}
