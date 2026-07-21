const API_BASE_URL = import.meta.env.PROD
  ? 'https://invoice-generator.pages.dev'
  : 'http://localhost:8788';

export async function generateInvoiceImage(data: any): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/api/generate-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to generate invoice image');
  }

  return response.blob();
}
