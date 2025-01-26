import React from 'react';
import vercelOGPagesPlugin from '@cloudflare/pages-plugin-vercel-og';
import {InvoiceData} from '../src/types/invoice';
import {calculateInvoiceAmounts} from '../src/utils/invoiceUtils';
import {formatTaiwanDate, getInvoicePeriod} from '../src/utils/dateUtils';
import {formatChineseAmount} from '../src/utils/numberUtils';

interface Props extends InvoiceData {}

function parseInvoiceData(searchParams: URLSearchParams): Props | null {
  try {
    return {
      buyer: searchParams.get('buyer') || '',
      uniformNumber: searchParams.get('uniformNumber') || '',
      date: searchParams.get('date') || '',
      totalAmount: searchParams.get('totalAmount') || '',
      subtotalAmount: searchParams.get('subtotalAmount') || '',
      amountType:
        (searchParams.get('amountType') as 'total' | 'subtotal') || 'total',
      taxType:
        (searchParams.get('taxType') as 'regular' | 'zero-rate' | 'exempt') ||
        'regular',
    };
  } catch (error) {
    return null;
  }
}

export const onRequest = vercelOGPagesPlugin<Props>({
  component: ({
    buyer,
    uniformNumber,
    date,
    totalAmount,
    subtotalAmount,
    amountType,
    taxType,
  }) => {
    const {amount, tax, subtotal} = calculateInvoiceAmounts(
      totalAmount,
      subtotalAmount,
      amountType,
      taxType
    );

    const formattedDate = formatTaiwanDate(date);
    const invoicePeriod = getInvoicePeriod(date);
    const chineseAmount = formatChineseAmount(amount);

    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '40px',
          fontFamily: 'Noto Sans TC',
        }}
      >
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h1
            style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px'}}
          >
            統一發票（三聯式）
          </h1>
          <p style={{fontSize: '16px', color: '#666'}}>{invoicePeriod}</p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{display: 'flex', gap: '8px'}}>
            <span style={{fontWeight: 500, width: '80px'}}>買受人：</span>
            <span style={{color: '#2563eb'}}>{buyer || '　'}</span>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <span style={{fontWeight: 500, width: '80px'}}>統一編號：</span>
            <span style={{color: '#2563eb', fontFamily: 'monospace'}}>
              {uniformNumber || '　'}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{display: 'flex', gap: '8px'}}>
            <span style={{fontWeight: 500, width: '80px'}}>銷售額：</span>
            <span style={{color: '#2563eb', fontFamily: 'monospace'}}>
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
            <span style={{fontWeight: 500, width: '80px'}}>營業稅：</span>
            <span style={{color: '#2563eb', fontFamily: 'monospace'}}>
              {tax.toLocaleString()}
            </span>
          </div>
          <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
            <span style={{fontWeight: 'bold', width: '80px'}}>總計：</span>
            <span
              style={{
                color: '#2563eb',
                fontWeight: 'bold',
                fontFamily: 'monospace',
              }}
            >
              {amount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  },
  extractProps: (request) => {
    const url = new URL(request.url);
    const data = parseInvoiceData(url.searchParams);
    if (!data) {
      throw new Error('Invalid invoice data');
    }
    return data;
  },
});
