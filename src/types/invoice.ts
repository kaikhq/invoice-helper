export interface InvoiceData {
  buyer: string;
  uniformNumber: string;
  date: string;
  totalAmount: string;
  subtotalAmount: string;
  amountType: 'total' | 'subtotal';
  taxType: 'regular' | 'zero-rate' | 'exempt';
}

export interface InvoiceCalculation {
  subtotal: number;
  tax: number;
  amount: number;
}

export interface InvoiceFormProps extends Omit<InvoiceData, 'date'> {
  setBuyer: (value: string) => void;
  setUniformNumber: (value: string) => void;
  setTotalAmount: (value: string) => void;
  setSubtotalAmount: (value: string) => void;
  setAmountType: (value: 'total' | 'subtotal') => void;
  setTaxType: (value: 'regular' | 'zero-rate' | 'exempt') => void;
  calculation: InvoiceCalculation;
  autoFocusField: 'amount' | 'uniformNumber' | null;
}

/** Everything the first render depends on, computed once by the server. */
export interface InitialState {
  /** Today in Asia/Taipei, yyyy-MM-dd. */
  today: string;
  uniformNumber: string;
  amount: string;
  itemName: string;
  /** Company name for a prefilled uniformNumber, if the server found one. */
  buyer: string;
}
