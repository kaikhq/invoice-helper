import { InvoiceFormProps } from '../types/invoice';
import { CompanyInfoStep } from './CompanyInfoStep';
import { InvoiceInfoStep } from './InvoiceInfoStep';

export function InvoiceForm({
  buyer,
  setBuyer,
  uniformNumber,
  setUniformNumber,
  totalAmount,
  setTotalAmount,
  subtotalAmount,
  setSubtotalAmount,
  amountType,
  setAmountType,
  taxType,
  setTaxType,
  calculation,
  autoFocusField,
}: InvoiceFormProps) {
  return (
    <div className="space-y-5">
      <InvoiceInfoStep
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        subtotalAmount={subtotalAmount}
        setSubtotalAmount={setSubtotalAmount}
        amountType={amountType}
        setAmountType={setAmountType}
        taxType={taxType}
        setTaxType={setTaxType}
        calculation={calculation}
        autoFocus={autoFocusField === 'amount'}
      />

      <div className="h-px bg-gray-100" />

      <CompanyInfoStep
        uniformNumber={uniformNumber}
        setUniformNumber={setUniformNumber}
        buyer={buyer}
        setBuyer={setBuyer}
        autoFocus={autoFocusField === 'uniformNumber'}
      />
    </div>
  );
}
