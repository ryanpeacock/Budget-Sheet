import { ReactNode } from "react";
import {
  Table as ShadTable,
  TableBody as ShadTableBody,
  TableHead as ShadTableHead,
  TableHeader as ShadTableHeader,
  TableRow as ShadTableRow,
} from "@/components/ui/table";

type BasicTableProps = {
  headers: string[];
  title?: string;
  titleBtns?: ReactNode;
  children: ReactNode;
};

export default function BasicTable({
  headers,
  title,
  children,
  titleBtns,
}: BasicTableProps) {
  return (
    <>
      {title ? (
        <div className="w-full py-2">
          <div className="flex items-center">
            <span className="block text-xl font-semibold mr-2">{title}</span>
            {titleBtns ? (
              <div className="btns flex gap-2">{titleBtns}</div>
            ) : null}
          </div>
        </div>
      ) : null}
      <ShadTable>
        <ShadTableHeader>
          <ShadTableRow className="uppercase">
            {headers.map((header, index) => {
              return <ShadTableHead key={index}>{header}</ShadTableHead>;
            })}
          </ShadTableRow>
        </ShadTableHeader>
        <ShadTableBody>{children}</ShadTableBody>
      </ShadTable>
    </>
  );
}
