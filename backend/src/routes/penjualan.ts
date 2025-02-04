import Elysia from "elysia";
import { Penjualan } from "../models/penjualan";

const salesData: Penjualan[] = require("../data/example.penjualan.json");

class CPenjualan {
  async get() {
    try {
      return {
        success: true,
        data: salesData,
      };
    } catch (error) {
      return JSON.stringify(error, null, 2);
    }
  }
}

export const penjualan = new Elysia()
  .decorate("cpenjualan", new CPenjualan())
  .group("penjualan", (app) =>
    app.get("", ({ cpenjualan }) => cpenjualan.get())
  );
