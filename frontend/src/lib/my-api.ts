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
