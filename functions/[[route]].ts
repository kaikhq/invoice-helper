import { createInvoiceImage } from '../src/utils/imageGenerator';

export interface Env {
  // 如果需要使用 Cloudflare KV 或其他綁定，在這裡定義
}

export async function onRequest(context: any) {
  const { request } = context;
  const url = new URL(request.url);
  
  // 處理圖片生成 API
  if (request.method === 'POST' && url.pathname === '/api/generate-image') {
    try {
      const data = await request.json();
      const image = await createInvoiceImage(data);
      
      return new Response(image, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        }
      });
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
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
  
  // 其他請求交給 Pages 處理
  return context.next();
}