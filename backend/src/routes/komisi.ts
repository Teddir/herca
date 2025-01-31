import Elysia from 'elysia';
import { Marketing } from '../models/marketing';
import { Penjualan } from '../models/penjualan';

const salesData: Penjualan[] = require("../data/example.penjualan.json")

const marketingData: Marketing[] = require("../data/example.marketing.json")

function calculateCommission(totalSales: number): number {
  if (totalSales >= 500000000) return 0.10;
  if (totalSales >= 200000000) return 0.05;
  if (totalSales >= 100000000) return 0.025;
  return 0;
}

class CKomisi {
  async get() {
    try {
      const data = marketingData.map(marketing => {
        const salesForMarketing = salesData.filter(sale => sale.marketing_Id === marketing.id);
        
        const monthlySales = salesForMarketing.reduce((acc, sale) => {
          const month = new Date(sale.date).toLocaleString('default', { month: 'long', year: 'numeric' });
          if (!acc[month]) acc[month] = 0;
          acc[month] += sale.grand_total;
          return acc;
        }, {} as Record<string, number>);
  
        const result = Object.keys(monthlySales).map(month => {
          const totalSales = monthlySales[month];
          const commissionRate = calculateCommission(totalSales);
          const commissionAmount = totalSales * commissionRate;
  
          return {
            marketing: marketing.name,
            bulan: month,
            omzet: totalSales,
            commissionPercentage: (commissionRate * 100)?.toLocaleString(),
            commissionNominal: commissionAmount
          };
        });
  
        return result;
      }).flat();

      return {
        success: true,
        data,
      };
    } catch (error) {
      return JSON.stringify(error, null, 2);

    }
  }
}

export const komisi = new Elysia()
  .decorate("ckomisi", new CKomisi())
  .group("komisi", (app) => 
    app
      .get(
        "",
        ({ckomisi}) => ckomisi.get(),
      )
  )
