import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ListKomisi({
  data = [],
  disablefetchNextPage = false,
  fetchNextPage
}: {
  data: KomisiField[] | [];
  disablefetchNextPage: boolean;
  fetchNextPage: () => void;
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      disablefetchNextPage={disablefetchNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
