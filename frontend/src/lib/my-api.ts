"use server";

import { elysiaJS } from "../../../backend/src/client";
import { customError } from "./utils";

export const serverAPI = elysiaJS;

export async function getKomisi(): Promise<{
  success: boolean;
  data: KomisiField[];
}> {
  try {
    let res = await serverAPI.komisi.get();

    if (!res || res?.status !== 200) customError(res);

    return res.data as any;
  } catch (error) {
    throw new Error((error instanceof Error && error?.message) || "");
  }
}

export async function getPenjualan(): Promise<{
  success: boolean;
  data: Penjualan[];
}> {
  try {
    let res = await serverAPI.penjualan.get();

    if (!res || res?.status !== 200) customError(res);

    return res.data as any;
  } catch (error) {
    throw new Error((error instanceof Error && error?.message) || "");
  }
}

export async function getPembayaran(): Promise<{
  success: boolean;
  data: Pembayaran[];
}> {
  try {
    let res = await serverAPI.pembayaran.get();

    if (!res || res?.status !== 200) customError(res);

    return res.data as any;
  } catch (error) {
    throw new Error((error instanceof Error && error?.message) || "");
  }
}

export async function addPayment({
  sale_id = -1,
  total_payment = 1,
  installment_amount = 1,
  due_date = ""
}: {
  sale_id: number;
  total_payment: number;
  installment_amount: number;
  due_date: string;
}): Promise<{
  success: boolean;
  data: Pembayaran[];
}> {
  try {
    let res = await serverAPI.pembayaran.add.post({
      data: {
        sale_id,
        total_payment,
        installment_amount,
        due_date
      }
    })

    if (!res || res?.status !== 200) customError(res);
    
    return res.data as any;
  } catch (error) {
    throw new Error((error instanceof Error && error?.message) || "");
  }
}
