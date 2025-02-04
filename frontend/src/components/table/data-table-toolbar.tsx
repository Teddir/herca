"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CircleXIcon, CirclePercentIcon } from "lucide-react";
import { PembayaranForm } from "../atoms/pembayaran-form";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export const statuses = [
  {
    value: "0",
    label: "0%",
    icon: CirclePercentIcon,
  },
  {
    value: "2.5",
    label: "2.5%",
    icon: CirclePercentIcon,
  },
  {
    value: "5",
    label: "5%",
    icon: CirclePercentIcon,
  },
  {
    value: "10",
    label: "10%",
    icon: CirclePercentIcon,
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex md:flex-row flex-col md:items-center justify-between w-full gap-4">
      <div className="flex flex-1 md:flex-row flex-col md:items-center gap-2">
        <Input
          placeholder="Filter komisi by marketing..."
          value={(table.getColumn("marketing")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("marketing")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[250px]"
        />
        {table.getColumn("commissionPercentage") && (
          <DataTableFacetedFilter
            column={table.getColumn("commissionPercentage")}
            title="Komisi %"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CircleXIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <PembayaranForm />
    </div>
  );
}
