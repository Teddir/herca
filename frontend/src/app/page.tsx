"use client";
import { TableSkeleton } from "@/components/organism/skeleton";
import ListKomisi from "@/components/table";
import { getKomisi } from "@/lib/my-api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Komisi() {

  const {
    data: dataKomisi,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<KomisiField[]>({
    queryKey: ["list-Komisi-dashboard"],
    queryFn: async () => {
      const res = await getKomisi();
      if (!res) return [];

      let datas: KomisiField[] = res?.data;

      return datas || [];
    },
    refetchOnWindowFocus: false,
  });

  if (isError) return <p>Error : {error.message}</p>;

  return (
    <div className="max-w-[120rem] mx-auto md:p-12 p-4 flex flex-col gap-4">
      <div className="flex md:flex-row flex-col md:gap-6 gap-8 justify-between">
        <div className="flex flex-col gap-2 md:justify-start md:w-fit md:text-start justify-center w-full text-center">
          <p className="font-serif text-xl ">Herca Group</p>
          <p className="font-sans text-4xl font-semibold">List Komisi</p>
          <p className="font-mono text-xs w-full">- by Teddi -</p>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="mt-8">
          <TableSkeleton />
        </div>
      ) : (
        <ListKomisi
          data={dataKomisi || []}
          disablefetchNextPage={true}
          fetchNextPage={() => { }}
        />
      )}
    </div>
  );
}