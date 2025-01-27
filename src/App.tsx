import React, {useState, useEffect} from 'react';
import {InvoiceForm} from './components/InvoiceForm';
import {InvoicePreview} from './components/InvoicePreview';
import {calculateInvoiceAmounts} from './utils/invoiceUtils';
import {FormCard} from './components/layout/FormCard';
import {PreviewCard} from './components/layout/PreviewCard';
import {AdCard} from './components/layout/AdCard';
import {MobileCalculationSummary} from './components/mobile/MobileCalculationSummary';
import {getTaiwanDate} from './utils/dateUtils';

export default function App() {
  const [buyer, setBuyer] = useState('');
  const [uniformNumber, setUniformNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [subtotalAmount, setSubtotalAmount] = useState('');
  const [amountType, setAmountType] = useState<'total' | 'subtotal'>('total');
  const [taxType, setTaxType] = useState<'regular' | 'zero-rate' | 'exempt'>(
    'regular'
  );
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefilledUniformNumber = params.get('uniformNumber');
    const prefilledAmount = params.get('amount');
    const prefilledItemName = params.get('itemName');

    if (prefilledUniformNumber) {
      setUniformNumber(prefilledUniformNumber);
    }

    if (prefilledAmount) {
      setTotalAmount(prefilledAmount);
      setAmountType('total');
    }

    if (prefilledItemName) {
      setItemName(prefilledItemName);
    }
  }, []);

  const calculation = calculateInvoiceAmounts(
    totalAmount,
    subtotalAmount,
    amountType,
    taxType
  );

  // 取得台灣時間的今天日期
  const today = getTaiwanDate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50'>
      <div className='container mx-auto max-w-7xl px-4 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
          {/* Form Section - 4 columns */}
          <div className='lg:col-span-4 space-y-6'>
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
              />
            </FormCard>

            {/* Advertisement Card */}
            <AdCard />
          </div>

          {/* Preview Section - 8 columns */}
          <div className='lg:col-span-8'>
            <PreviewCard>
              <InvoicePreview
                buyer={buyer}
                uniformNumber={uniformNumber}
                date={today}
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
      </div>

      <MobileCalculationSummary {...calculation} />
    </div>
  );
}
