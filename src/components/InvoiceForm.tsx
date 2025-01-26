import { useEffect } from 'react';
import { InvoiceFormProps } from '../types/invoice';
import { fetchCompanyInfo } from '../utils/companyUtils';
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
  calculation
}: InvoiceFormProps) {
  // 從 URL 參數中檢查是否有預填資料
  const searchParams = new URLSearchParams(window.location.search);
  const hasPrefilledAmount = searchParams.has('amount');
  const hasPrefilledUniformNumber = searchParams.has('uniformNumber');

  // 決定 autoFocus 的邏輯：
  // 1. 如果有預填金額但沒有預填統編，focus 在統編欄位
  // 2. 如果只有預填統編，focus 在金額欄位
  // 3. 如果都沒有預填，focus 在金額欄位
  const shouldFocusUniformNumber = hasPrefilledAmount && !hasPrefilledUniformNumber;
  const shouldFocusAmount = !hasPrefilledAmount || (hasPrefilledUniformNumber && !hasPrefilledAmount);

  useEffect(() => {
    let isSubscribed = true;

    const lookupCompany = async () => {
      const companyName = await fetchCompanyInfo(uniformNumber);
      if (isSubscribed && companyName) {
        setBuyer(companyName);
      }
    };

    if (uniformNumber.length === 8) {
      lookupCompany();
    }

    return () => {
      isSubscribed = false;
    };
  }, [uniformNumber, setBuyer]);

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
        autoFocus={shouldFocusAmount}
      />

      <div className="h-px bg-gray-100" />

      <CompanyInfoStep
        uniformNumber={uniformNumber}
        setUniformNumber={setUniformNumber}
        buyer={buyer}
        setBuyer={setBuyer}
        autoFocus={shouldFocusUniformNumber}
      />
    </div>
  );
}