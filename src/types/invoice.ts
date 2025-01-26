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
}