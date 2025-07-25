"use client"

import { ValkomaTable } from "./valkoma-table"
import { Input } from "./ui/input"
import { DataTableViewOptions } from "./table/data-table-view-option"
import { useTable } from "./table/use-table"
import { bookmarksData } from "./table/data"
import { DataTablePagination } from "./table/data-table-pagination"
import { DataTableProps } from "./table/data-table-props"


import { useState } from "react"
import type { configType } from "./table/config.type"
import { ModeToggle } from "./mode-toggle"

export function TableWrapper() {
    const [config, setConfig] = useState<configType>
        ({
            enableRowSelection: true,
            enableMultiRowSelection: true,
            enableColumnFilters: true,
            enableColumnSorting: true,
        });
    const { table } = useTable(bookmarksData, config);

    return (
        <div className="flex flex-col gap-4 w-screen h-screen p-10">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filter Title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <div className="flex items-center gap-2">
                    <DataTableViewOptions table={table} />
                    <DataTableProps setConfig={setConfig} config={config} />
                    <ModeToggle />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <ValkomaTable table={table} />
                <DataTablePagination table={table} />
            </div>
        </div>

    )
}



//  <div className="relative flex bg-red-200 overflow-hidden h-screen w-full items-center justify-center bg-white dark:bg-black p-10">
//             {/* <div
//                 className={cn(
//                     "absolute inset-0",
//                     "[background-size:20px_20px]",
//                     "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
//                     "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
//                 )}
//             /> */}
//             <div className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between">
//                     <Input placeholder="Search..." className="w-64"/>
//                     <DataTableViewOptions table={table} />
//                 </div>
//                 <ValkomaTable table={table} />
//             </div>
//         </div>