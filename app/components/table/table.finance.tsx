import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import FormatNumber from "@/utils/numberFormatter";

interface TableProps {
  data: any[];
}

export default function TableFinance(props: TableProps) {
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
            <TableCell className="">{FormatNumber(item.Amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
