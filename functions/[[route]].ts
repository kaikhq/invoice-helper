import type {PluginArgs} from '@cloudflare/pages-plugin-vercel-og';
import {ImageResponse} from '@cloudflare/pages-plugin-vercel-og/api';
import {InvoiceData} from '../src/types/invoice';
import {calculateInvoiceAmounts} from '../src/utils/invoiceUtils';
import {formatTaiwanDate, getInvoicePeriod} from '../src/utils/dateUtils';
import {formatChineseAmount} from '../src/utils/numberUtils';

type vercelOGPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<Env, Params, Data, PluginArgs>;

function parseInvoiceData(searchParams: URLSearchParams): InvoiceData | null {
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

export const onRequestGet: vercelOGPagesPluginFunction = async ({
  request,
  next,
}) => {
  const url = new URL(request.url);

  // 只處理 /api/generate-image 路徑
  if (!url.pathname.startsWith('/api/generate-image')) {
    return next();
  }

  try {
    const data = parseInvoiceData(url.searchParams);
    if (!data) {
      return new Response('Invalid invoice data', {status: 400});
    }

    const {amount, tax, subtotal} = calculateInvoiceAmounts(
      data.totalAmount,
      data.subtotalAmount,
      data.amountType,
      data.taxType
    );

    const formattedDate = formatTaiwanDate(data.date);
    const invoicePeriod = getInvoicePeriod(data.date);
    const chineseAmount = formatChineseAmount(amount);

    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '40px',
            backgroundColor: 'white',
            fontFamily: 'sans-serif',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  textAlign: 'center',
                  marginBottom: '32px',
                },
                children: [
                  {
                    type: 'h1',
                    props: {
                      style: {
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                      },
                      children: '統一發票（三聯式）',
                    },
                  },
                  {
                    type: 'p',
                    props: {
                      style: {
                        fontSize: '16px',
                        color: '#666666',
                      },
                      children: invoicePeriod,
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontWeight: 500,
                              width: '80px',
                            },
                            children: '買受人：',
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              color: '#2563eb',
                            },
                            children: data.buyer || '　',
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontWeight: 500,
                              width: '80px',
                            },
                            children: '統一編號：',
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              color: '#2563eb',
                              fontFamily: 'monospace',
                            },
                            children: data.uniformNumber || '　',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  marginTop: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontWeight: 500,
                              width: '80px',
                            },
                            children: '銷售額：',
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              color: '#2563eb',
                              fontFamily: 'monospace',
                            },
                            children: subtotal.toLocaleString(),
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontWeight: 500,
                              width: '80px',
                            },
                            children: '營業稅：',
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              color: '#2563eb',
                              fontFamily: 'monospace',
                            },
                            children: tax.toLocaleString(),
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontWeight: 'bold',
                              width: '80px',
                            },
                            children: '總計：',
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              color: '#2563eb',
                              fontWeight: 'bold',
                              fontFamily: 'monospace',
                            },
                            children: amount.toLocaleString(),
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        width: 800,
        height: 600,
      }
    );
  } catch (error) {
    console.error('Error generating invoice image:', error);
    return new Response('Failed to generate invoice image', {status: 500});
  }
};
