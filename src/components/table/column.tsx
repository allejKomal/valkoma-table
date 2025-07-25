import type { ColumnDef } from '@tanstack/react-table';
import type { Bookmark } from './bookmark.type';
import { DataTableColumnHeader } from './table-column-header';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { Star } from 'lucide-react';

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    headerAlign?: 'left' | 'center' | 'right';
    cellAlign?: 'left' | 'center' | 'right';
};

export const bookmarkColumns: ExtendedColumnDef<Bookmark>[] = [
    {
        accessorKey: 'faviconUrl',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Favicon" />,
        cell: ({ getValue }) => {
            const url = getValue<string | undefined>();
            return url ? <div className='flex items-center justify-center'>
                <img src={url} alt="favicon" className="w-5 h-5 rounded-sm" loading="lazy" />
            </div> : null;
        },
        cellAlign: 'right',
        headerAlign: 'center',
        enableSorting: false,
        size: 70,
    },
    {
        accessorKey: 'isFavorite',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Favorite" />,
        cell: ({ getValue }) =>
            <div className='flex items-center justify-center'>
                {getValue<boolean | undefined>() ? <Star className='text-black' size={16} /> : <Star className=' text-gray-200' size={16} />}
            </div>,
        enableSorting: true,
        headerAlign: 'center',
        size: 90,
        enableHiding: true,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => {
            const { title, url } = row.original;
            return (
                <span>
                    {
                        row.getValue('contentType') ? (
                            <Badge className='mr-2' variant='outline'>
                                {String(row.getValue('contentType'))}
                            </Badge>
                        ) : null
                    }
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-secondary-500 no-underline transition-all duration-300 font-medium"
                    >
                        {title}
                    </a>
                </span>
            );
        },
        enableSorting: true,
        size: 280,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'url',
        header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
        cell: ({ getValue }) => (
            <a href={getValue<string>()} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 active:text-primary-800 visited:text-secondary-500 no-underline transition-all duration-300"
            >
                {getValue<string>()}
            </a>
        ),
        enableSorting: true,
        size: 320,
        enableColumnFilter: true,
        enableHiding: true,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ getValue }) => (
            <>
                {getValue<string | undefined>() ? (
                    getValue<string | undefined>()!.length > 50 ? (
                        <Tooltip>
                            <TooltipTrigger className="line-clamp-3">
                                {getValue<string | undefined>()?.slice(0, 50)}...
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{getValue<string | undefined>()}</p>
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <span className="line-clamp-3">
                            {getValue<string | undefined>()}
                        </span>
                    )
                ) : (
                    <span>No data available</span> // Fallback if the value is null or undefined
                )}
            </>
        ),
        enableSorting: false,
        size: 400,
        enableColumnFilter: true,
        enableHiding: true,
    },
    {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ getValue }) => {
            const tags = getValue<string[]>();
            return (
                <div className="flex flex-wrap gap-1">
                    {tags.length > 2 ?
                        <Tooltip>
                            <TooltipTrigger className="line-clamp-3">
                                {tags.slice(0, 1).map((tag) => (
                                    <Badge variant='outline'>
                                        {tag}
                                    </Badge>
                                ))}
                                <Badge variant='outline'>
                                    {`+${tags.length - 1}`}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                {tags.map((tag, index) => (
                                    <span key={index}>
                                        {tag}{index !== tags.length - 1 && " | "}
                                    </span>
                                ))}

                            </TooltipContent>
                        </Tooltip>

                        :
                        tags.map((tag) => (
                            <Badge variant='outline'>
                                {tag}
                            </Badge>
                        ))}
                </div >
            );
        },
        enableSorting: false,
        size: 160,
        enableColumnFilter: true,
        enableHiding: true,
    },
    {
        accessorKey: 'folder',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Folder" />,
        cell: ({ getValue }) => <span>{getValue<string | undefined>() ?? '-'}</span>,
        enableSorting: true,
        size: 140,
        enableColumnFilter: true,
        enableHiding: true,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ getValue }) => {
            const d = new Date(getValue<string>());
            return (
                <time dateTime={getValue<string>()} title={d.toLocaleString()}>
                    {d.toLocaleDateString()}
                </time>
            );
        },
        enableSorting: true,
        size: 140,
    },
    {
        accessorKey: 'privacy',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Privacy" />,
        cell: ({ getValue }) => {
            const privacy = getValue<'private' | 'public' | 'unlisted' | undefined>();
            const colorMap: Record<string, string> = {
                private: 'bg-red-100 text-red-700',
                public: 'bg-green-100 text-green-700',
                unlisted: 'bg-yellow-100 text-yellow-700',
            };
            if (!privacy) return <span className="italic text-gray-400">-</span>;
            return (
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colorMap[privacy] ?? 'bg-gray-100 text-gray-700'}`}>
                    {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
                </span>
            );
        },
        enableSorting: true,
        size: 120,
    },
];
