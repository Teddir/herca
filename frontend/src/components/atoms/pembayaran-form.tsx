'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "@/hooks/use-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { addPayment, getPembayaran, getPenjualan } from "@/lib/my-api"
import { useQuery } from "@tanstack/react-query"
import currency from "@/lib/currency"
import { formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

const FormSchema = z.object({
  sale_id: z
    .string({
      required_error: "Please select an sale_id.",
    }),
  total_payment: z.string()
})

export function PembayaranForm() {
  const [openSheet, setOpenSheet] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const {
    data: dataPenjualan,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Penjualan[]>({
    queryKey: ["list-Penjualan-dashboard"],
    queryFn: async () => {
      const res = await getPenjualan();
      if (!res) return [];

      let datas: Penjualan[] = res?.data;

      return datas || [];
    },
    refetchOnWindowFocus: false,
  });

  const [dataPembayaran, setDataPembayaran] = useState<Pembayaran[]>([])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const isPenjualan = dataPenjualan?.filter(a => a.id == Number(data.sale_id))?.[0]
      if (!isPenjualan) throw new Error('Penjualan not found')

      const isInstallment_amount = (dataPembayaran?.filter(a => a.sale_id == Number(data.sale_id))?.filter(a => a.status == 'pending')?.reduce((aa, bb) => aa + bb.total_payment, 0))

      const res = await addPayment({
        due_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
        installment_amount: !isInstallment_amount ? Number(data.total_payment) : isInstallment_amount + Number(data.total_payment),
        sale_id: Number(data.sale_id),
        total_payment: Number(data.total_payment)
      })
      setDataPembayaran(res.data)
      form.resetField("sale_id")
      form.resetField("total_payment")

      setOpenSheet(false)
      toast({
        title: "Success",
        description: "Berhasil melakukan pembayaran",
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error instanceof Error ? error.message : ""
      })
    }
  }

  return (
    <Sheet open={openSheet} onOpenChange={(a) => setOpenSheet(a)}>
      <SheetTrigger asChild>
        <Button variant="default"><PlusIcon /> Pembayaran</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Form Pembayaran</SheetTitle>
          <SheetDescription>
            isi form dibawah ini
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sale_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaksi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih transaksi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataPenjualan?.map((a, b) => {
                          const isP = dataPembayaran.filter(aa => aa.sale_id == a.id)
                          const isDueDate = isP?.reverse()?.[0]?.due_date || ''
                          const targetDate = parseISO(isDueDate);
                          const dateDifference = !isDueDate ? "" : formatDistanceToNow(targetDate, { addSuffix: true, locale: id });

                          const isPaid = isP?.some(aa => aa.status == 'paid')
                          const isInstallment_amount = isP?.filter(aa => aa.status == 'pending')?.reduce((aa, bb) => aa + bb.total_payment, 0)

                          let isTotal = a.grand_total - isInstallment_amount
                          isTotal = isTotal <= 0 ? 0 : isTotal

                          return isPaid ? null : (
                            <SelectItem value={a.id.toLocaleString()} key={b}>{a.transaction_number} - {currency(isTotal)}{!dateDifference ? "" : ` - ${dateDifference}`}</SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Pilih transaksi yang ingin di bayarkan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Pembayaran</FormLabel>
                    <FormControl>
                      <Input placeholder="10xxx" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" id="btn-submit" className="sr-only">click me</Button>
            </form>
          </Form>
        </div>
        <SheetFooter>
          <Button onClick={() => {
            const elementBtn = document.getElementById(
              `btn-submit`
            ) as HTMLTextAreaElement;
            elementBtn.click();
          }}>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
