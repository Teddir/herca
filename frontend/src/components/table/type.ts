interface KomisiField {
  marketing: string;
  bulan: string;
  omzet: string;
  commissionPercentage: number;
  commissionNominal: number;
}

interface Penjualan {
  id: number;
  transaction_number: string;
  marketing_Id: number;
  date: string;
  cargo_fee: number;
  total_balance: number;
  grand_total: number;
}

interface Pembayaran {
  id: number;
  sale_id: number;
  payment_date: string;
  total_payment: number;
  remaining_balance: number;
  installment_amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue';
}


