import {InvoiceData} from '../src/types/invoice';
import {calculateInvoiceAmounts} from '../src/utils/invoiceUtils';
import {formatTaiwanDate, getInvoicePeriod} from '../src/utils/dateUtils';
import {formatChineseAmount} from '../src/utils/numberUtils';
import vercelOGPagesPlugin from '@cloudflare/pages-plugin-vercel-og';

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

    return {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          padding: '40px',
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
                          children: buyer || '　',
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
                          children: uniformNumber || '　',
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
    };
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
