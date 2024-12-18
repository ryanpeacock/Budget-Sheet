import {
  Table as ShadTable,
  TableBody as ShadTableBody,
  TableCell as ShadTableCell,
  TableHead as ShadTableHead,
  TableHeader as ShadTableHeader,
  TableRow as ShadTableRow,
} from "@/components/ui/table";

export default function TotalsTable() {
  return (
    <ShadTable>
      <ShadTableHeader>
        <ShadTableRow>
          <ShadTableHead>Totals</ShadTableHead>
          <ShadTableHead>Bi-Weekly</ShadTableHead>
          <ShadTableHead>Monthly</ShadTableHead>
          <ShadTableHead>Yearly</ShadTableHead>
        </ShadTableRow>
      </ShadTableHeader>
      <ShadTableBody>
        <ShadTableRow>
          <ShadTableCell className="text-center">Expense Totals</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
        </ShadTableRow>
        <ShadTableRow>
          <ShadTableCell className="text-center">Left to Budget</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
          <ShadTableCell className="text-lg">0</ShadTableCell>
        </ShadTableRow>
      </ShadTableBody>
    </ShadTable>
  );
}
