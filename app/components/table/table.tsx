import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableProps {
  columns: string[];
  data: any[];
}

export default function TableFinance(props: TableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold">Concepto</TableHead>
          <TableHead className="font-semibold">Usuario</TableHead>
          <TableHead className="font-semibold">Fecha</TableHead>
          <TableHead className="text-right font-semibold">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.concept}</TableCell>
            <TableCell>{item.user}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell className="text-right">{item.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
