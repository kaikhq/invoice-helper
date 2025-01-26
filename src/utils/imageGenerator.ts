import satori from 'satori';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceAmounts } from './invoiceUtils';
import { formatTaiwanDate, getInvoicePeriod } from './dateUtils';
import { formatChineseAmount } from './numberUtils';

export async function createInvoiceImage(data: InvoiceData): Promise<string> {
  const { amount, tax, subtotal } = calculateInvoiceAmounts(
    data.totalAmount,
    data.subtotalAmount,
    data.amountType,
    data.taxType
  );

  const formattedDate = formatTaiwanDate(data.date);
  const invoicePeriod = getInvoicePeriod(data.date);
  const chineseAmount = formatChineseAmount(amount);

  const svg = await satori({
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '40px',
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
                    color: '#666',
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
                          fontWeight: '500',
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
                          fontWeight: '500',
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
                          fontWeight: '500',
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
                          fontWeight: '500',
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
  }, {
    width: 800,
    height: 600,
    fonts: [
      {
        name: 'Noto Sans TC',
        data: await fetch(
          'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap'
        ).then(res => res.arrayBuffer()),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  return svg;
}