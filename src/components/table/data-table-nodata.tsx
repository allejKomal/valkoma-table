"use client"

import { TableRow, TableCell } from "../ui/table"

interface NoDataProps {
    columnsLength: number
}

export function DataTableNoData({ columnsLength }: NoDataProps) {
    return (
        <TableRow>
            <TableCell
                colSpan={columnsLength}
                className="h-[550px] text-center"
            >
                No results.
            </TableCell>
        </TableRow>
    )
}
