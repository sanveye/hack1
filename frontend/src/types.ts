export interface Saving {
  id: number;
  amount: number;
  date: string;
  time: string;
  comments: string;
  total_savings: number;
}

export interface SavingsSummary {
  total_savings: number;
  number_of_transactions: number;
  last_transaction?: Saving;
}
