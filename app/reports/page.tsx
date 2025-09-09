"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { GoAlert, GoDatabase, GoDownload } from "react-icons/go"
import CardCustomComponent from "../components/card/card"
import FormatNumber from "@/utils/numberFormatter"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useSession } from "@/lib/auth-client"

interface Transaction {
  user: string;
  date: number;
  concept: string;
  amount: number
}

export default function Reports() {
  const session = useSession()

  const [history, setHistory] = useState<Transaction[]>()
  const [data, setData] = useState<{}[]>([])
  const [total, setTotal] = useState(0)

  // Se obtienen los datos de las transacciones y se realiza una suma de cada tipo de movimiento para generar la grafica

  const fetchData = async () => {
    const resp = await fetch("/api/transactions")
    const transactions = await resp.json()

    const ingresos = transactions
      .filter((transaction: any) => transaction.Concept === "Ingreso")
      .reduce((acc: number, transaction: any) => acc + Number(transaction.amount), 0)

    const egresos = transactions
      .filter((transaction: any) => transaction.Concept === "Egreso")
      .reduce((acc: number, transaction: any) => acc + Number(transaction.amount), 0)

    setData([
      { name: "Ingresos", total: ingresos },
      { name: "Egresos", total: egresos },
    ])

    setHistory(transactions)
    setTotal(ingresos - egresos)
  }

  const exportCSV = () => {
    const headers = "Fecha,Concepto,Usuario,Monto\n"

    if (history) {
      const rows = history.map((transaction) => {
        const fecha = new Date(transaction.date).toLocaleDateString("es-CO")
        return `${fecha},${transaction.concept},${transaction.user},${transaction.amount}`
      })
        .join("\n")

      const blob = new Blob([headers + rows], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "history.csv"
      a.click()
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6 m-auto px-6 my-4">
      {
        (session.data?.user as any).role.toLowerCase() !== 'admin' 
        ? <Alert variant="destructive">
            <GoAlert />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              Parece que no tienes permiso para hacer esto
            </AlertDescription>
          </Alert> 
        : <div>
            <CardCustomComponent icon={<GoDatabase size={24} color="green" />} service="Saldo total" data={`${FormatNumber(total)} COP`} />
            <Card className="flex w-full max-w-3xl flex-col gap-6 mt-4 mx-auto px-6 py-4">
              <CardHeader>
                <CardTitle>Resumen financiero</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width={"100%"} height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => FormatNumber(value)} />
                    <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Button onClick={exportCSV} className="my-4 cursor-pointer">
              <GoDownload className="w-4 h-4" /> Exportar CSV
            </Button>
        </div>
      }
    </div>
  )
}
