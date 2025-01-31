export interface Pembayaran {
  id: number;
  sale_id: number;
  payment_date: string;
  total_payment: number;
  remaining_balance: number;
  installment_amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'overdue';
}
