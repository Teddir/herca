"use client";

import currency from "@/lib/currency";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
export const columns: ColumnDef<KomisiField>[] = [
  {
    accessorKey: "marketing",    
    header: () => <div className="text-left">Marketing</div>,
    cell: ({ row }) => {
      return (
        <p className="font-sansation text-xs normal-case font-medium text-ncolor-t">
          {row.getValue("marketing")}
        </p>
      );
    },
  },
  {
    accessorKey: "bulan",
    header: ({ column }) => (
      <div className="flex w-full ">
        <DataTableColumnHeader column={column} title="Bulan" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="font-sansation text-xs normal-case font-medium text-ncolor-t">
          {row.getValue("bulan") || "-"}
        </p>
      );
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
  {
    accessorKey: "omzet",
    header: ({ column }) => (
      <div className="flex w-full justify-center text-center">
        <DataTableColumnHeader column={column} title="Omzet" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <p className="font-sansation text-xs normal-case font-medium">
            {currency(row.getValue("omzet") || 0)}
          </p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
  {
    accessorKey: "commissionPercentage",
    header: ({ column }) => (
      <div className="flex w-full text-center justify-center">
        <DataTableColumnHeader column={column} title="Komisi (%)" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <p className="font-sansation text-xs normal-case font-medium">
            {row.getValue("commissionPercentage") || 0}%
          </p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
  {
    accessorKey: "commissionNominal",
    header: ({ column }) => (
      <div className="flex w-full text-center justify-center">
        <DataTableColumnHeader column={column} title="Komisi (Rp)" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <p className="font-sansation text-xs normal-case font-medium">
            {currency(row.getValue("commissionNominal") || 0)}
          </p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.toString().includes(row.getValue(id));
    },
  },
];
