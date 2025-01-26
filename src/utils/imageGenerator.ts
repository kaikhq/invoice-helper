import { Resvg } from '@resvg/resvg-js';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceAmounts } from './invoiceUtils';
import { formatTaiwanDate, getInvoicePeriod } from './dateUtils';
import { formatChineseAmount } from './numberUtils';

export async function createInvoiceImage(data: InvoiceData): Promise<Uint8Array> {
  const { amount, tax, subtotal } = calculateInvoiceAmounts(
    data.totalAmount,
    data.subtotalAmount,
    data.amountType,
    data.taxType
  );

  const formattedDate = formatTaiwanDate(data.date);
  const invoicePeriod = getInvoicePeriod(data.date);
  const chineseAmount = formatChineseAmount(amount);

  // 生成 SVG
  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'Noto Sans TC';
          src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&amp;display=swap');
        }
        text {
          font-family: 'Noto Sans TC', sans-serif;
        }
        .title { font-size: 24px; font-weight: bold; }
        .period { font-size: 16px; }
        .label { font-size: 14px; font-weight: 500; }
        .value { font-size: 14px; fill: #2563eb; }
        .amount { font-size: 16px; font-weight: bold; }
      </style>
      
      <!-- 背景 -->
      <rect width="800" height="600" fill="white"/>
      
      <!-- 標題 -->
      <text x="400" y="40" text-anchor="middle" class="title">統一發票（三聯式）</text>
      <text x="400" y="70" text-anchor="middle" class="period">${invoicePeriod}</text>
      
      <!-- 買受人資訊 -->
      <text x="50" y="120" class="label">買受人：</text>
      <text x="120" y="120" class="value">${data.buyer || '　'}</text>
      
      <text x="50" y="150" class="label">統一編號：</text>
      <text x="120" y="150" class="value">${data.uniformNumber || '　'}</text>
      
      <!-- 金額資訊 -->
      <text x="50" y="200" class="label">銷售額：</text>
      <text x="120" y="200" class="value">${subtotal.toLocaleString()}</text>
      
      <text x="50" y="230" class="label">營業稅：</text>
      <text x="120" y="230" class="value">${tax.toLocaleString()}</text>
      
      <text x="50" y="270" class="amount">總計金額：${amount.toLocaleString()}</text>
      
      <!-- 日期 -->
      <text x="600" y="120" text-anchor="end" class="label">
        ${formattedDate.map(part => part.text).join('')}
      </text>
    </svg>
  `;

  // 使用 resvg 渲染 SVG 為 PNG
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: false, // 不加載系統字體
      fontFiles: [], // 使用網絡字體
      defaultFontFamily: 'Noto Sans TC',
    },
    background: 'white',
  });

  // 生成 PNG
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}