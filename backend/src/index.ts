import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { komisi } from "./routes/komisi";
import { pembayaran } from "./routes/pembayaran";
import { penjualan } from "./routes/penjualan";

const app = new Elysia()
  .use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "API Herca",
          version: "0.0.1-rc",
        },
      },
    })
  )
  .use(penjualan)
  .use(komisi)
  .use(pembayaran)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export const AppServer = app