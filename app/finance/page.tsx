import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TableFinance from "../components/table/table"

const history = [
    {
      id: "INV001",
      concept: "Ingreso",
      user: "Laura",
      totalAmount: "$650.00",
      date: "05/05/2025",
    },
    {
      id: "INV002",
      concept: "Ingreso",
      user: "Pedro",
      totalAmount: "$150.00",
      date: "16/07/2025",
    },
    {
      id: "INV003",
      concept: "Egreso",
      user: "Maria",
      totalAmount: "-$350.00",
      date: "27/05/2025",
    },
    {
      id: "INV004",
      concept: "Ingreso",
      user: "Maria",
      totalAmount: "$450.00",
      date: "01/06/2025",
    },
    {
      id: "INV005",
      concept: "Egreso",
      user: "Juan",
      totalAmount: "-$550.00",
      date: "02/06/2025",
    },
]

export default function Finance() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      <Tabs defaultValue="income">
        <TabsList>
          <TabsTrigger value="income">Registrar ingresos</TabsTrigger>
          <TabsTrigger value="expense">Registrar gastos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Registrar Ingreso</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Descripcion</Label>
                <Input id="tabs-demo-name" defaultValue="" placeholder="Salario, Freelance, Bonus..."/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Monto</Label>
                    <Input id="tabs-demo-username" defaultValue="" type="number" placeholder="0.00"/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Fecha</Label>
                    <Input id="tabs-demo-username" defaultValue="" type="date" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 font-bold cursor-pointer">Registrar ingreso</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="expense">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Registrar Egreso</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Descripcion</Label>
                <Input id="tabs-demo-name" defaultValue="" placeholder="Renta, Comida, Gasolina..."/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Monto</Label>
                    <Input id="tabs-demo-username" defaultValue="" type="number" placeholder="0.00"/>
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Fecha</Label>
                    <Input id="tabs-demo-username" defaultValue="" type="date" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-500 hover:bg-red-600 font-bold cursor-pointer">Registrar egreso</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Historial de transacciones</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <TableFinance columns={["Concepto", "Usuario", "Fecha", "Monto"]} data={history}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
