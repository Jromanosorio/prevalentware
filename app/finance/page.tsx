"use client"

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
import TableFinance from "../components/table/table.finance"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export default function Finance() {
  const [amount, setAmount] = useState("")
  const [concept, setConcept] = useState("")
  const [date, setDate] = useState(Date)
  const [description, setDescription] = useState("")
  const [transactionList, setTransactionList] = useState([])

  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, concept, date, description }),
    })

    if (res.ok) {
      setAmount("")
      setConcept("")
      setDate("")
      setDescription("")
      alert("Movimiento agregado ✅")
    } else {
      alert("Error al guardar ❌")
    }

    getTransactions()
  }

  const getTransactions = async () => {
    const resp = await fetch("/api/transactions")

    if(resp.ok){
      const data = await resp.json()
      setTransactionList(data)
    }

  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      <Tabs defaultValue="transaction">
        <TabsList>
          <TabsTrigger value="transaction">Registro</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>
        <TabsContent value="transaction">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Registrar Transaccion</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Descripcion</Label>
                <Input id="tabs-demo-name" placeholder="Salario, Freelance, Bonus..." onChange={(e) => setDescription(e.target.value)} value={description} />
              </div>
              <div>
                <Select value={concept} onValueChange={setConcept}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el tipo de movimiento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Transaccion</SelectLabel>
                      <SelectItem value="Ingreso">Ingreso</SelectItem>
                      <SelectItem value="Egreso">Egreso</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Monto</Label>
                  <Input id="tabs-demo-username" type="number" placeholder="0.00" onChange={(e) => setAmount(e.target.value)} value={amount}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Fecha</Label>
                  <Input id="tabs-demo-username" type="date" onChange={(e) => setDate(e.target.value)} value={date} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 font-bold cursor-pointer" onClick={handleSaveTransaction}>Guardar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Historial de transacciones</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <TableFinance data={transactionList} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
