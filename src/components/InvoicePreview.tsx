import { formatTaiwanDate, getInvoicePeriod } from '../utils/dateUtils';
import { formatChineseAmount } from '../utils/numberUtils';
import { InvoiceData, InvoiceCalculation } from '../types/invoice';
import { CalculationSummary, InvoiceHeader, InvoiceTable } from './invoice-preview';
import { InvoiceTips } from './invoice-preview/InvoiceTips';
import { Download, Share } from 'lucide-react';
import { useCallback, useState } from 'react';
import { generateInvoiceImage } from '../services/api';

interface InvoicePreviewProps extends InvoiceData, InvoiceCalculation {}

export function InvoicePreview({
  buyer,
  uniformNumber,
  date,
  taxType,
  tax,
  subtotal,
  amount,
  ...rest
}: InvoicePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const chineseAmount = formatChineseAmount(amount);
  const formattedDate = formatTaiwanDate(date);
  const invoicePeriod = getInvoicePeriod(date);

  const handleDownload = useCallback(async () => {
    try {
      setIsGenerating(true);
      const imageUrl = await generateInvoiceImage({
        buyer,
        uniformNumber,
        date,
        taxType,
        ...rest
      });

      const link = document.createElement('a');
      link.download = `發票_${uniformNumber || '未填寫'}_${date}.png`;
      link.href = imageUrl;
      link.click();

      // 清理 URL object
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('下載發票預覽失敗:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [buyer, uniformNumber, date, taxType, rest]);

  const handleShare = useCallback(async () => {
    try {
      setIsGenerating(true);
      const imageUrl = await generateInvoiceImage({
        buyer,
        uniformNumber,
        date,
        taxType,
        ...rest
      });

      // 從 URL 取得 Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 清理 URL object
      URL.revokeObjectURL(imageUrl);

      // 使用 Web Share API 分享
      if (navigator.share) {
        const file = new File([blob], `發票_${uniformNumber || '未填寫'}_${date}.png`, {
          type: 'image/png'
        });

        await navigator.share({
          title: '統一發票預覽',
          files: [file]
        });
      } else {
        // 如果不支援分享 API，則複製到剪貼簿
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        alert('圖片已複製到剪貼簿');
      }
    } catch (error) {
      console.error('分享發票預覽失敗:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [buyer, uniformNumber, date, taxType, rest]);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleShare}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share className="w-4 h-4" />
          分享預覽圖
        </button>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          下載預覽圖
        </button>
      </div>

      {/* Invoice Preview */}
      <div id="invoice-preview" className="border border-gray-300 rounded-lg bg-white">
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
