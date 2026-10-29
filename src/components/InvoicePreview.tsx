import { formatTaiwanDate, getInvoicePeriod } from '../utils/dateUtils';
import { formatChineseAmount } from '../utils/numberUtils';
import { InvoiceData, InvoiceCalculation } from '../types/invoice';
import { CalculationSummary, InvoiceHeader, InvoiceTable } from './invoice-preview';
import { InvoiceTips } from './invoice-preview/InvoiceTips';
import { Download } from 'lucide-react';
import { useCallback, useRef } from 'react';

interface InvoicePreviewProps extends InvoiceData, InvoiceCalculation {
  itemName?: string;
}

// html2canvas renders a clone of the page in an iframe, where each <link>
// stylesheet is fetched again and not waited for: on a slow or revalidating
// network the capture comes out unstyled. Copy the rules the page has already
// loaded into the clone instead.
function inlineStylesheets(clone: Document) {
  for (const sheet of Array.from(document.styleSheets)) {
    const link = sheet.ownerNode;
    if (!(link instanceof HTMLLinkElement)) continue;
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // A cross-origin sheet without CORS: leave its <link> as is.
    }
    const style = clone.createElement('style');
    style.textContent = Array.from(rules, (rule) => rule.cssText).join('\n');
    clone.querySelector(`link[href="${link.getAttribute('href')}"]`)?.replaceWith(style);
  }
}

export function InvoicePreview({
  buyer,
  uniformNumber,
  date,
  taxType,
  subtotal,
  tax,
  amount,
  itemName,
}: InvoicePreviewProps) {
  const chineseAmount = formatChineseAmount(amount);
  const formattedDate = formatTaiwanDate(date);
  const invoicePeriod = getInvoicePeriod(date);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!invoiceRef.current) return;

    try {
      // Loaded on demand: it is large and only needed for this button.
      const { default: html2canvas } = await import('html2canvas-pro');
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // 提高解析度
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true, // 允許跨域圖片
        onclone: inlineStylesheets,
      });

      const link = document.createElement('a');
      link.download = `發票_${uniformNumber || '未填寫'}_${date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('下載發票預覽失敗:', error);
    }
  }, [uniformNumber, date]);

  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-end">
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
      <div
        ref={invoiceRef}
        id="invoice-preview"
        className="border border-gray-300 rounded-lg bg-white print:shadow-none"
      >
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
          itemName={itemName}
        />
      </div>

      {/* Tips Section */}
      <InvoiceTips />
    </div>
  );
}
