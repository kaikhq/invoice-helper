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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                        alignItems: 'center',
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
                        alignItems: 'center',
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
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '32px',
                  border: '1px solid #d1d5db',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        borderBottom: '1px solid #d1d5db',
                        backgroundColor: '#f9fafb',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              flex: '1',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '品名',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '100px',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '數量',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '單價',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                            },
                            children: '金額',
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
                        borderBottom: '1px solid #d1d5db',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              flex: '1',
                              padding: '12px',
                              color: '#2563eb',
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '請填寫品名',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '100px',
                              padding: '12px',
                              textAlign: 'right',
                              color: '#2563eb',
                              fontFamily: 'monospace',
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '1',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'right',
                              color: '#2563eb',
                              fontFamily: 'monospace',
                              borderRight: '1px solid #d1d5db',
                            },
                            children: subtotal.toLocaleString(),
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'right',
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
                        borderBottom: '1px solid #d1d5db',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              flex: '1',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '銷售額合計',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'right',
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
                        borderBottom: '1px solid #d1d5db',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '80px',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '營業稅',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              flex: '1',
                              padding: '12px',
                              textAlign: 'center',
                              borderRight: '1px solid #d1d5db',
                            },
                            children:
                              data.taxType === 'regular'
                                ? '應稅 ✓'
                                : data.taxType === 'zero-rate'
                                ? '零稅率 ✓'
                                : '免稅 ✓',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'right',
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
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              flex: '1',
                              padding: '12px',
                              textAlign: 'center',
                              fontWeight: 500,
                              borderRight: '1px solid #d1d5db',
                            },
                            children: '總計',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              width: '120px',
                              padding: '12px',
                              textAlign: 'right',
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
