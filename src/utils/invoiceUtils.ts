export const calculateInvoiceAmounts = (
  totalAmount: string,
  subtotalAmount: string,
  amountType: 'total' | 'subtotal',
  taxType: 'regular' | 'zero-rate' | 'exempt'
) => {
  if (amountType === 'total') {
    const amount = parseFloat(totalAmount) || 0;
    const tax = taxType === 'regular' ? Math.round(amount - (amount / 1.05)) : 0;
    const subtotal = amount - tax;
    return { amount, tax, subtotal };
  } else {
    const subtotal = parseFloat(subtotalAmount) || 0;
    const tax = taxType === 'regular' ? Math.round(subtotal * 0.05) : 0;
    const amount = subtotal + tax;
    return { amount, tax, subtotal };
  }
};