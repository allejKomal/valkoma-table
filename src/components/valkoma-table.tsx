"use client";

import {
    type Table,
} from "@tanstack/react-table";
import {
    Table as TableComponent,
    TableBody,
} from "valkoma-package/primitive";
import { DataTableNoData } from "./table/data-table-nodata";
import { DataTableHeader } from "./table/data-table-header";
import { DataTableContent } from "./table/data-table-content";

interface ValkomaTableProps<TData> {
    table: Table<TData>;
}

export function ValkomaTable<TData>({
    table,
}: ValkomaTableProps<TData>) {

    return (
        <div className="flex-1 overflow-x-auto border rounded-lg">
            <div className="scroll-container w-full h-[550px] overflow-y-auto">
                <TableComponent className="table-fixed w-full">
                    <DataTableHeader table={table} />
                    <TableBody>
                        {table.getPaginationRowModel().rows.length ? (
                            <DataTableContent table={table} />
                        ) : (
                            <DataTableNoData columnsLength={table.getHeaderGroups()[0]?.headers.length} />
                        )}
                    </TableBody>
                </TableComponent>
            </div>
        </div >
    );
}
