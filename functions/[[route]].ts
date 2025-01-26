import { ImageResponse } from '@vercel/og';
import { createInvoiceImage } from '../src/utils/imageGenerator';
import { InvoiceData } from '../src/types/invoice';

export interface Env {
  // 如果需要使用 Cloudflare KV 或其他綁定，在這裡定義
}

function parseInvoiceData(searchParams: URLSearchParams): InvoiceData | null {
  try {
    return {
      buyer: searchParams.get('buyer') || '',
      uniformNumber: searchParams.get('uniformNumber') || '',
      date: searchParams.get('date') || '',
      totalAmount: searchParams.get('totalAmount') || '',
      subtotalAmount: searchParams.get('subtotalAmount') || '',
      amountType: (searchParams.get('amountType') as 'total' | 'subtotal') || 'total',
      taxType: (searchParams.get('taxType') as 'regular' | 'zero-rate' | 'exempt') || 'regular'
    };
  } catch (error) {
    return null;
  }
}

export async function onRequest(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  
  // 處理圖片生成 API
  if (request.method === 'GET' && url.pathname === '/api/generate-image') {
    try {
      const data = parseInvoiceData(url.searchParams);
      if (!data) {
        return new Response(
          JSON.stringify({ error: 'Invalid invoice data' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            }
          }
        );
      }

      const svg = await createInvoiceImage(data);
      
      // 使用 @vercel/og 將 SVG 轉換為 PNG
      return new ImageResponse(
        {
          type: 'div',
          props: {
            dangerouslySetInnerHTML: { __html: svg },
          },
        },
        {
          width: 800,
          height: 600,
          headers: {
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate image' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }
  }

  // 處理 CORS preflight 請求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
  
  // 其他請求交給 Pages 處理
  return context.next();
}