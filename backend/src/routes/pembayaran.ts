import Elysia, { t } from "elysia";
import { Penjualan } from "../models/penjualan";
import { Pembayaran } from "../models/pembayan";

const OBJECT_PEMBAYARAN = t.Object({
  sale_id: t.Number({
    description: "Mengacu ke transaksi penjualan terkait.",
  }),
  total_payment: t.Number({
    description: "Jumlah pembayaran yang dilakukan.",
  }),
  installment_amount: t.Number({
    description: "Jumlah cicilan yang dibayar pada pembayaran tersebut.",
  }),
  due_date: t.String({
    description: "Tanggal jatuh tempo pembayaran berikutnya.",
  }),
});

const salesData: Penjualan[] = require("../data/example.penjualan.json");
const paymentsData: Pembayaran[] = [];

class CPembayaran {
  async add({
    sale_id,
    total_payment,
    installment_amount,
    due_date,
  }: {
    sale_id: number;
    total_payment: number;
    installment_amount: number;
    due_date: string;
  }) {
    try {
      const sale = salesData.find((sale) => sale.id === sale_id);

      if (!sale) {
        return { status: "error", message: "Sale not found" };
      }

      const remaining_balance = sale.grand_total - total_payment;

      
      let status: "pending" | "paid" | "overdue" = "pending";
      if (remaining_balance <= 0) {
        status = "paid"; 
      }

      
      const payment: Pembayaran = {
        id: paymentsData.length + 1,
        sale_id: sale_id,
        payment_date: new Date().toISOString(),
        total_payment: total_payment,
        remaining_balance: remaining_balance,
        installment_amount: installment_amount,
        due_date: due_date,
        status: status,
      };

      paymentsData.push(payment);

      return {
        success: true,
        datas:paymentsData,
      };
    } catch (error) {
      return JSON.stringify(error, null, 2);
    }
  }

  async getStatusPembayara(sale_id: string) {
    try {
      const paymentStatus = paymentsData.filter(
        (payment) => payment.sale_id === parseInt(sale_id)
      );

      if (paymentStatus.length === 0) {
        return { status: "error", message: "No payment found for this sale" };
      }

      return { status: "success", payments: paymentStatus };
    } catch (error) {
      return JSON.stringify(error, null, 2);
    }
  }
}

export const pembayaran = new Elysia()
  .decorate("cpembayaran", new CPembayaran())
  .group("pembayaran", (app) =>
    app
      .model({
        params: t.Object({
          sale_id: t.String(),
        }),
        body: t.Object({
          data: OBJECT_PEMBAYARAN,
        }),
      })
      .get(
        "/status/:sale_id",
        ({ cpembayaran, params: { sale_id } }) =>
          cpembayaran.getStatusPembayara(sale_id),
        {
          params: t.Object({
            sale_id: t.String(),
          }),
        }
      )
      .guard({
        body: t.Object({
          data: OBJECT_PEMBAYARAN,
        }),
      })
      .post("/add", ({ cpembayaran, body }) => {
        const data = body as {
          data: {
            sale_id: number;
            total_payment: number;
            installment_amount: number;
            due_date: string;
          };
        };
        return cpembayaran.add(data.data);
      })
  );
