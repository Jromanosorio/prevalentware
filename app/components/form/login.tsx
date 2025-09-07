import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  return (
    <Card className="w-full max-w-sm mx-auto my-20">
      <CardHeader>
        <CardTitle>Iniciar sesion</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="off"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Iniciar sesion
        </Button>
        <Button variant="outline" className="w-full">
          Continuar con Github
        </Button>
      </CardFooter>
    </Card>
  )
}
