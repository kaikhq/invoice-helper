import satori from 'satori';
import {InvoiceData} from '../types/invoice';
import {calculateInvoiceAmounts} from './invoiceUtils';
import {formatTaiwanDate, getInvoicePeriod} from './dateUtils';
import {formatChineseAmount} from './numberUtils';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;

  const css = await (
    await fetch(url, {
      headers: {
        // 模擬瀏覽器請求以避免 Google Fonts 阻擋
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function createInvoiceImage(data: InvoiceData): Promise<string> {
  const {amount, tax, subtotal} = calculateInvoiceAmounts(
    data.totalAmount,
    data.subtotalAmount,
    data.amountType,
    data.taxType
  );

  const formattedDate = formatTaiwanDate(data.date);
  const invoicePeriod = getInvoicePeriod(data.date);
  const chineseAmount = formatChineseAmount(amount);

  // 準備所有需要的文字內容
  const textContent = [
    '統一發票（三聯式）',
    invoicePeriod,
    '買受人：',
    data.buyer,
    '統一編號：',
    data.uniformNumber,
    '銷售額：',
    subtotal.toLocaleString(),
    '營業稅：',
    tax.toLocaleString(),
    '總計：',
    amount.toLocaleString(),
    '元整',
  ].join('');

  // 載入字體
  const fontData = await loadGoogleFont('Noto+Sans+TC', textContent);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '40px',
          fontFamily: 'Noto Sans TC',
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
    },
    {
      width: 800,
      height: 600,
      fonts: [
        {
          name: 'Noto Sans TC',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  return svg;
}
