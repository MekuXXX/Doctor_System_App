import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Props = {};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "1",
    header: () => (
      <DataTableColumnHeader>
        <Skeleton className="w-full h-full" />
      </DataTableColumnHeader>
    ),
    cell: () => (
      <DataTableItem>
        <Skeleton className="w-full h-full" />
      </DataTableItem>
    ),
  },

  {
    accessorKey: "2",
    header: () => (
      <DataTableColumnHeader>
        <Skeleton className="w-full h-full" />
      </DataTableColumnHeader>
    ),
    cell: () => (
      <DataTableItem>
        <Skeleton className="w-full h-full" />
      </DataTableItem>
    ),
  },
  {
    accessorKey: "3",
    header: () => (
      <DataTableColumnHeader>
        <Skeleton className="w-full h-full" />
      </DataTableColumnHeader>
    ),
    cell: () => (
      <DataTableItem>
        <Skeleton className="w-full h-full" />
      </DataTableItem>
    ),
  },
  {
    accessorKey: "4",
    header: () => (
      <DataTableColumnHeader>
        <Skeleton className="w-full h-full" />
      </DataTableColumnHeader>
    ),
    cell: () => (
      <DataTableItem>
        <Skeleton className="w-full h-full" />
      </DataTableItem>
    ),
  },
  {
    accessorKey: "5",
    header: () => (
      <DataTableColumnHeader>
        <Skeleton className="w-full h-full" />
      </DataTableColumnHeader>
    ),
    cell: () => (
      <DataTableItem>
        <Skeleton className="w-full h-full" />
      </DataTableItem>
    ),
  },
];

const data: any[] = [];

export default function DataTableSkeleton() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={header.id === "actions" ? "text-right" : ""}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              لا توجد نتائج
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
