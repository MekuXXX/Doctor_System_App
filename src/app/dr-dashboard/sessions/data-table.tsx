"use client";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/global/DataTableColumnHeader";
import { DataTableItem } from "@/components/global/DataTableItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "#",
    header: ({}) => (
      <DataTableColumnHeader className=" text-black dark:text-white font-bolder text-lg">
        #
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => (
      <DataTableItem className="text-black dark:text-white">
        {String(row.index + 1).padStart(2, "00")}
      </DataTableItem>
    ),
  },
  {
    accessorKey: "patient",
    header: () => <DataTableColumnHeader>Patient</DataTableColumnHeader>,
    cell: () => <DataTableItem>Mr. Bobby</DataTableItem>,
  },
  {
    accessorKey: "Dr name",
    header: () => <DataTableColumnHeader>Dr Name</DataTableColumnHeader>,
    cell: () => <DataTableItem>Dr.Jackson</DataTableItem>,
  },
  {
    accessorKey: "Data",
    header: () => <DataTableColumnHeader>Data</DataTableColumnHeader>,
    cell: () => (
      <DataTableItem>Data</DataTableItem>
      // <DataTableItem>
      //   <Accordion type="single" collapsible>
      //     <AccordionItem value="item-1">
      //       <AccordionTrigger>Is it accessible?</AccordionTrigger>
      //       <AccordionContent>
      //         Yes. It adheres to the WAI-ARIA design pattern.
      //       </AccordionContent>
      //     </AccordionItem>
      //   </Accordion>
      // </DataTableItem>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader>Status</DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const value = "success";
      return (
        <span
          className="bg-green-200 text-green-800 py-1 px-2 rounded-xl text-[0.75rem]"
          // className={
          //   (value === "pending"
          //     ? "bg-orange-200 text-orange-800"
          //     : value === "success"
          //       ? "bg-green-200 text-green-800"
          //       : "bg-red-200 text-red-800") +
          //   " py-1 px-2 rounded-xl text-[0.75rem]"
          // }
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <DataTableColumnHeader className="text-right">
        Price
      </DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const amount = row.index + 35;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <DataTableItem className="text-right font-medium">
          {formatted}
        </DataTableItem>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: ({ column }) => (
      <DataTableColumnHeader>Actions</DataTableColumnHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={
                  "bg-green-200 hover:bg-green-200 text-green-800 hover:text-green-800"
                  // status === "pending"
                  //   ? "bg-orange-200 hover:bg-orange-200 hover:text-orange-800 text-orange-800"
                  //   : status === "success"
                  //     ? "bg-green-200 hover:bg-green-200 text-green-800 hover:text-green-800"
                  //     : "bg-red-200 hover:bg-red-200 text-red-800 hover:text-red-800"
                }
              >
                <span className="sr-only">Open menu</span>
                <BsThreeDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
