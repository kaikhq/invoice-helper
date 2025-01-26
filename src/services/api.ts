import {InvoiceData} from '../types/invoice';

export async function generateInvoiceImage(data: InvoiceData): Promise<string> {
  try {
    // 將所有參數編碼並加入 URL
    const params = new URLSearchParams({
      buyer: data.buyer,
      uniformNumber: data.uniformNumber,
      date: data.date,
      totalAmount: data.totalAmount,
      subtotalAmount: data.subtotalAmount,
      amountType: data.amountType,
      taxType: data.taxType,
    });

    // 呼叫 Cloudflare Worker 的 API 端點
    const response = await fetch(`/api/generate-image?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to generate invoice image');
    }

    // 將回應轉換為 Blob
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('生成發票圖片失敗:', error);
    throw error;
  }
}
