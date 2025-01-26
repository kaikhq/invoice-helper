import { formatTaiwanDate, getInvoicePeriod } from '../utils/dateUtils';
import { formatChineseAmount } from '../utils/numberUtils';
import { InvoiceData, InvoiceCalculation } from '../types/invoice';
import { CalculationSummary, InvoiceHeader, InvoiceTable } from './invoice-preview';
import { InvoiceTips } from './invoice-preview/InvoiceTips';
import { Download, Link, Check } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { getInvoiceImageUrl } from '../services/api';

interface InvoicePreviewProps extends InvoiceData, InvoiceCalculation {}

export function InvoicePreview({
  buyer,
  uniformNumber,
  date,
  totalAmount,
  subtotalAmount,
  amountType,
  taxType,
  tax,
  subtotal,
  amount
}: InvoicePreviewProps) {
  const [copied, setCopied] = useState(false);
  const chineseAmount = formatChineseAmount(amount);
  const formattedDate = formatTaiwanDate(date);
  const invoicePeriod = getInvoicePeriod(date);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // 提高解析度
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `發票_${uniformNumber || '未填寫'}_${date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('下載發票預覽失敗:', error);
    }
  }, [uniformNumber, date]);

  const handleCopyUrl = useCallback(async () => {
    try {
      const url = getInvoiceImageUrl({
        buyer,
        uniformNumber,
        date,
        totalAmount,
        subtotalAmount,
        amountType,
        taxType
      });

      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('複製網址失敗:', error);
    }
  }, [buyer, uniformNumber, date, totalAmount, subtotalAmount, amountType, taxType]);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCopyUrl}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            copied
              ? 'bg-green-50 text-green-700'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              已複製網址
            </>
          ) : (
            <>
              <Link className="w-4 h-4" />
              複製圖片網址
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Download className="w-4 h-4" />
          下載發票預覽
        </button>
      </div>

      {/* Calculation Summary */}
      <CalculationSummary tax={tax} subtotal={subtotal} amount={amount} />
      
      {/* Invoice Preview */}
      <div ref={invoiceRef} className="border border-gray-300 rounded-lg bg-white">
        <InvoiceHeader
          invoicePeriod={invoicePeriod}
          buyer={buyer}
          uniformNumber={uniformNumber}
          formattedDate={formattedDate}
        />
        
        <InvoiceTable
          subtotal={subtotal}
          tax={tax}
          amount={amount}
          taxType={taxType}
          chineseAmount={chineseAmount}
        />
      </div>

      {/* Tips Section */}
      <InvoiceTips />
    </div>
  );
}