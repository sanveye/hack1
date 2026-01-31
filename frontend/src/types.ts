export interface Transaction {
  id: number;
  amount: number;
  transaction_type: 'income' | 'expense';
  date: string;
  time: string;
  comments: string;
  spent_on: string;
  balance: number;
}

export interface Summary {
  balance: number;
  income: number;
  expenses: number;
  transaction_count: number;
}
