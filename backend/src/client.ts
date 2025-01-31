import { treaty } from "@elysiajs/eden";
import { AppServer } from ".";

type TElysiaApp = typeof AppServer;
console.log(process.env.BASE_BE_URL);

export const elysiaJS = treaty<TElysiaApp>(process.env.BASE_BE_URL!);