"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/global/DataTablePagination";
import { DataTableViewOptions } from "@/components/global/DataTableViewOptions";
import { useQuery } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchIn?: string;
  keys: any[];
  queryFn: () => TData[];
  queryFnParams?: [];
  childrenButtons?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data: initialData,
  searchIn,
  keys,
  queryFn,
  queryFnParams,
  childrenButtons,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const refetchInterval = process.env.NEXT_PUBLIC_REFETCH_INTERVAL || 5000;

  const { data, isLoading, isError } = useQuery({
    initialData,
    queryKey: keys,
    queryFn: async () => {
      let data;
      if (queryFnParams !== undefined) {
        data = await queryFn(...queryFnParams);
      } else {
        data = await queryFn();
      }
      return data || [];
    },
    refetchInterval: Number(refetchInterval),
  });

  // TODO: add loading spinner and error messages

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // TODO: add loading spinner and error messages
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error</h1>;
  return (
    <div>
      <div dir="rtl" className="flex items-center justify-between py-4">
        <div></div>
        {/* <Input
          placeholder="ابحث فى..."
          // value={table.getColumn("email")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn(searchIn || "")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white dark:bg-dark"
        /> */}
        <div className="flex gap-2 items-center">
          <DataTableViewOptions table={table} />
          <div>{childrenButtons}</div>
        </div>
      </div>
      <div className="rounded-md border bg-white dark:bg-dark py-6 px-4">
        <Table dir="rtl" className="text-left">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  لا توجد نتائج
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4" dir="rtl">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
