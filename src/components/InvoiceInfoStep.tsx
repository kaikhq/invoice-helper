import { FormStep } from './ui/FormStep';
import { FormField } from './ui/FormField';
import { Calculator } from 'lucide-react';
import { AmountInput } from './AmountInput';
import { Select } from './ui/Select';
import React from 'react';

interface InvoiceInfoStepProps {
  totalAmount: string;
  setTotalAmount: (value: string) => void;
  subtotalAmount: string;
  setSubtotalAmount: (value: string) => void;
  amountType: 'total' | 'subtotal';
  setAmountType: (value: 'total' | 'subtotal') => void;
  taxType: 'regular' | 'zero-rate' | 'exempt';
  setTaxType: (value: 'regular' | 'zero-rate' | 'exempt') => void;
  calculation: any;
  autoFocus?: boolean;
  itemName: string;
  setItemName: (value: string) => void;
}

const taxTypeOptions = [
  { value: 'regular', label: '應稅 (5%)' },
  { value: 'zero-rate', label: '零稅率' },
  { value: 'exempt', label: '免稅' }
];

export const InvoiceInfoStep = React.memo(function InvoiceInfoStep({
  totalAmount,
  setTotalAmount,
  subtotalAmount,
  setSubtotalAmount,
  amountType,
  setAmountType,
  taxType,
  setTaxType,
  autoFocus,
  itemName,
  setItemName
}: InvoiceInfoStepProps) {
  return (
    <FormStep number={1} title="發票資訊">
      <div className="space-y-4">
        <FormField label="金額輸入方式">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`relative px-4 py-2.5 border rounded-lg text-center transition-all duration-200 group
                ${amountType === 'total'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-white hover:bg-gray-50 hover:border-gray-300'
                }`}
              onClick={() => setAmountType('total')}
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>含稅總金額</span>
              </div>
            </button>
            <button
              type="button"
              className={`relative px-4 py-2.5 border rounded-lg text-center transition-all duration-200 group
                ${amountType === 'subtotal'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-white hover:bg-gray-50 hover:border-gray-300'
                }`}
              onClick={() => setAmountType('subtotal')}
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>未稅銷售額</span>
              </div>
            </button>
          </div>
        </FormField>

        {amountType === 'total' ? (
          <FormField label="發票金額總計 (含稅)" required>
            <AmountInput
              value={totalAmount}
              onChange={setTotalAmount}
              placeholder="請輸入含稅金額"
              autoFocus={autoFocus}
            />
          </FormField>
        ) : (
          <FormField label="銷售額 (未稅)" required>
            <AmountInput
              value={subtotalAmount}
              onChange={setSubtotalAmount}
              placeholder="請輸入未稅金額"
              autoFocus={autoFocus}
            />
          </FormField>
        )}

        <FormField label="課稅別">
          <Select
            value={taxType}
            onChange={(value) => setTaxType(value as 'regular' | 'zero-rate' | 'exempt')}
            options={taxTypeOptions}
          />
        </FormField>
        <FormField label="品名">
        <input
          type="test"
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={itemName}
          onChange={(e)=>setItemName(e.target.value)}
          placeholder="請輸入品名"
          autoFocus={autoFocus}
        />
        </FormField>
      </div>
    </FormStep>
  );
});