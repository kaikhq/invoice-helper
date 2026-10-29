import { useState, useEffect, useRef } from 'react';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { calculateInvoiceAmounts } from './utils/invoiceUtils';
import { fetchCompanyInfo } from './utils/companyUtils';
import { FormCard } from './components/layout/FormCard';
import { PreviewCard } from './components/layout/PreviewCard';
import { AdCard } from './components/layout/AdCard';
import { AboutSection } from './components/layout/AboutSection';
import { MobileCalculationSummary } from './components/mobile/MobileCalculationSummary';
import { InitialState } from './types/invoice';

// Rendered on the server and hydrated on the client, so the first render must
// depend on `initial` alone: no window, no clock, no locale.
export default function App({ initial }: { initial: InitialState }) {
  const [buyer, setBuyer] = useState(initial.buyer);
  const [uniformNumber, setUniformNumber] = useState(initial.uniformNumber);
  const [totalAmount, setTotalAmount] = useState(initial.amount);
  const [subtotalAmount, setSubtotalAmount] = useState('');
  const [amountType, setAmountType] = useState<'total' | 'subtotal'>('total');
  const [taxType, setTaxType] = useState<'regular' | 'zero-rate' | 'exempt'>('regular');
  const [itemName] = useState(initial.itemName);

  // 決定 autoFocus：沒有預填金額時 focus 金額；只預填金額時 focus 統編
  const autoFocusField = !initial.amount
    ? 'amount'
    : !initial.uniformNumber
      ? 'uniformNumber'
      : null;

  // The server already looked up a prefilled 統編; don't fetch it again.
  const lookedUp = useRef(initial.buyer ? initial.uniformNumber : '');

  useEffect(() => {
    if (uniformNumber.length !== 8 || uniformNumber === lookedUp.current) return;

    let isSubscribed = true;
    fetchCompanyInfo(uniformNumber).then((companyName) => {
      if (isSubscribed && companyName) {
        lookedUp.current = uniformNumber;
        setBuyer(companyName);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [uniformNumber]);

  const calculation = calculateInvoiceAmounts(totalAmount, subtotalAmount, amountType, taxType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Section - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <FormCard>
              <InvoiceForm
                buyer={buyer}
                setBuyer={setBuyer}
                uniformNumber={uniformNumber}
                setUniformNumber={setUniformNumber}
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
                subtotalAmount={subtotalAmount}
                setSubtotalAmount={setSubtotalAmount}
                amountType={amountType}
                setAmountType={setAmountType}
                taxType={taxType}
                setTaxType={setTaxType}
                calculation={calculation}
                autoFocusField={autoFocusField}
              />
            </FormCard>

            {/* Advertisement Card */}
            <AdCard />
          </div>

          {/* Preview Section - 8 columns */}
          <div className="lg:col-span-8">
            <PreviewCard>
              <InvoicePreview
                buyer={buyer}
                uniformNumber={uniformNumber}
                date={initial.today}
                totalAmount={totalAmount}
                subtotalAmount={subtotalAmount}
                amountType={amountType}
                taxType={taxType}
                itemName={itemName}
                {...calculation}
              />
            </PreviewCard>
          </div>
        </div>

        <AboutSection />
      </div>

      <MobileCalculationSummary {...calculation} />
    </div>
  );
}
