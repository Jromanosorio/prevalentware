import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableProps {
  data: any[];
}

export default function TableFinance(props: TableProps) {

  console.log(props.data)

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-blue-300">
          <TableHead className="w-[100px] font-bold">Concepto</TableHead>
          <TableHead className="font-bold">Usuario</TableHead>
          <TableHead className="font-bold">Fecha</TableHead>
          <TableHead className="font-bold">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item) => (
          <TableRow key={item.id} className={item.Concept === "Ingreso" ? "bg-green-300 font-semibold" : "bg-red-200 font-semibold"}>
            <TableCell>{item.Concept}</TableCell>
            <TableCell>{item.User}</TableCell>
            <TableCell>{new Date(item.Date).toLocaleDateString()}</TableCell>
            <TableCell className="">{new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0
            }).format(item.Amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
