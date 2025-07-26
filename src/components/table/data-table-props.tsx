"use client"

import { Settings } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    Button,
} from "valkoma-package/primitive"

export interface ConfigType {
    enableRowSelection: boolean
    enableMultiRowSelection: boolean
    enableColumnFilters: boolean
    enableColumnSorting: boolean
}

export function DataTableProps({
    config,
    setConfig
}: {
    config: ConfigType
    setConfig: React.Dispatch<React.SetStateAction<ConfigType>>
}) {
    const handleConfigToggle = (key: keyof ConfigType) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [key]: !prevConfig[key],
        }))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 lg:flex text-sm"
                >
                    <Settings />
                    Config
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] h-[200px]">
                <DropdownMenuLabel>Toggle Options</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Render each config option as a checkbox */}
                {Object.entries(config).map(([key, value]) => (
                    <DropdownMenuCheckboxItem
                        key={key}
                        className="capitalize"
                        checked={value}
                        onCheckedChange={() => handleConfigToggle(key as keyof ConfigType)}
                    >
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()} {/* Format camelCase keys */}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
