import { useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type ColumnFiltersState, type PaginationState, type RowSelectionState, type SortingState, type VisibilityState } from "@tanstack/react-table";
import { bookmarkColumns, type ExtendedColumnDef } from "./column";
import { RadioGroup, RadioGroupItem, Checkbox } from "valkoma-package/primitive";
import type { configType } from "./config.type";
import type { Bookmark } from "./bookmark.type";

export function useTable(data: Bookmark[], config: configType) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });


    const initialColumnVisibility: VisibilityState = {
        url: false,
        description: true,
        title: true,
        faviconUrl: true,
        folder: true,
        tags: true,
        isFavorite: true,
        createdAt: false,
        contentType: false,
        privacy: false,
    };
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);

    const dynamicColumns: ExtendedColumnDef<Bookmark>[] = config.enableRowSelection
        ? [
            {
                id: "select",
                header: ({ table }) => (
                    <div className="flex items-center justify-center h-full">
                        {config.enableMultiRowSelection &&
                            <Checkbox
                                className="!border-black/30 dark:!border-white/30"
                                checked={table.getIsAllPageRowsSelected() ||
                                    (table.getIsSomePageRowsSelected() && "indeterminate")}
                                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                aria-label="Select all"
                            />
                        }
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center h-full">
                        {config.enableMultiRowSelection ? (
                            <Checkbox
                                className="!border-black/30 dark:!border-white/30"
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                aria-label="Select row"
                            />
                        ) : (
                            <RadioGroup
                                value={rowSelection[row.id] ? row.id : ""}
                                onValueChange={(value) => setRowSelection({ [value]: true })}
                            >
                                <RadioGroupItem value={row.id} className="[&_svg]:!size-2 border-red-100" />
                            </RadioGroup>
                        )}
                    </div>
                ),
                size: 50,
                enableSorting: false,
                enableHiding: false,
            },
            ...bookmarkColumns.map((column) => ({
                ...column,
                // getIsVisible: () => columnVisibility[column?.id],
            })),
        ]
        : [...bookmarkColumns];

    const table = useReactTable({
        data,
        columns: dynamicColumns,
        state: {
            sorting,
            pagination,
            rowSelection,
            columnFilters,
            columnVisibility,
        },
        enableMultiRowSelection: config.enableMultiRowSelection,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: (newRowSelection) => {
            if (!config.enableMultiRowSelection) {
                const selectedRowId = Object.keys(newRowSelection)[0];
                setRowSelection({ [selectedRowId]: true });
            } else {
                setRowSelection(newRowSelection);
            }
        },
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        debugTable: false,
    });

    return {
        table,
        sorting,
        setSorting,
        pagination,
        setPagination,
    };
}
