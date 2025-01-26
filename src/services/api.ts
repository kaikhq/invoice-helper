const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://invoice-generator.pages.dev'
  : 'http://localhost:8788';

interface GenerateImageParams {
  buyer: string;
  uniformNumber: string;
  date: string;
  totalAmount: string;
  subtotalAmount: string;
  amountType: 'total' | 'subtotal';
  taxType: 'regular' | 'zero-rate' | 'exempt';
}

export async function generateInvoiceImage(params: GenerateImageParams): Promise<Blob> {
  // 將參數編碼到 URL 中
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  const response = await fetch(
    `${API_BASE_URL}/api/generate-image?${searchParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'image/png',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to generate invoice image');
  }

  return response.blob();
}

// 取得圖片 URL（方便分享或直接使用）
export function getInvoiceImageUrl(params: GenerateImageParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  return `${API_BASE_URL}/api/generate-image?${searchParams.toString()}`;
}