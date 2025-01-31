import numeral, { NumeralJSLocale } from "numeral";

// Define the locale configuration including the 'ordinal' property
const idLocale: NumeralJSLocale = {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  abbreviations: {
    thousand: "rb",
    million: "jt",
    billion: "m",
    trillion: "t",
  },
  currency: {
    symbol: "Rp",
  },
  ordinal: () => "." // Example ordinal function, you can customize as needed
};

// Register numeral locale for Indonesian Rupiah (ID)
numeral.register("locale", "id", idLocale);

// Set numeral locale to "id"
numeral.locale("id");

// Define the currency formatting function
export default function currency(number: number): string {
  return numeral(number).format("$0,0"); // Format as currency with default settings
}