import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function TableSkeleton() {
  return (
    <div className="flex flex-col w-full gap-4 p-6 bg-background border border-border rounded-3xl md:max-h-[80dvh] ">
      <div className="flex flex-col md:gap-6 gap-8 justify-between">
        <div className="flex gap-3 w-full">
          <Skeleton className="h-6 w-1/3 bg-gray-200" />
        </div>
      </div>
      <Table>
        <TableCaption>
          <Skeleton className="h-4 w-1/2 bg-gray-200" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Skeleton className="h-4 bg-gray-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 bg-gray-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 bg-gray-200" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 bg-gray-200" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-10 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 bg-gray-200" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}