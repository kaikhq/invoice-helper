# 手寫統一發票小幫手

A free, browser-based helper for filling in Taiwan's handwritten uniform invoices
(手寫統一發票). Enter the buyer, tax ID (統一編號), item name and amount; it computes
the sales amount, 5% business tax and total, writes the total in Chinese numerals
(中文大寫), and shows a preview laid out like the paper form so you can copy each
field onto the invoice by hand.

All amounts are calculated in the browser. When a valid 8-digit tax ID is
entered, it is sent to Teachify's tax-ID lookup service
(tw-ubn-lookup.kaik.workers.dev) to fill in the buyer name; nothing else leaves
the browser.

## When to use this

- You must issue a **handwritten** uniform invoice and want the tax split and the
  Chinese-numeral total worked out correctly.
- You know the tax-inclusive total and need the pre-tax amount and tax, or the
  reverse.
- Do **not** use it to issue e-invoices (電子發票); use the Ministry of Finance
  e-invoice platform at https://www.einvoice.nat.gov.tw instead.

## How the amounts are calculated

| tax type (課稅別)  | from a tax-inclusive total `T`             | from a pre-tax amount `S`              |
| ------------------ | ------------------------------------------ | -------------------------------------- |
| 應稅 (regular, 5%) | tax = round(T − T / 1.05), sales = T − tax | tax = round(S × 0.05), total = S + tax |
| 零稅率 (zero-rate) | tax = 0, sales = T                         | tax = 0, total = S                     |
| 免稅 (exempt)      | tax = 0, sales = T                         | tax = 0, total = S                     |

## Prefill with URL parameters

Open the page with query parameters to prefill the form:

- `uniformNumber`: the buyer's 8-digit tax ID (統一編號)
- `amount`: the tax-inclusive total, in NTD
- `itemName`: the item description (品名)

Example: https://invoice.teachify.tw/?uniformNumber=12345678&amount=1050&itemName=顧問費

## Checklist before writing the invoice

- The sales amount, tax and total agree, with no rounding error.
- The tax type (應稅、零稅率、免稅) matches the transaction.
- The buyer name and tax ID are correct.
- The item description, quantity and unit price are correct.
- The invoice date falls in the current filing period (month).
- Write in blue or black ballpoint pen, legibly, with no corrections; void and
  reissue a spoiled invoice.

## Related links

- 電子發票整合平台: https://www.einvoice.nat.gov.tw
- 財政部稅務入口網: https://www.etax.nat.gov.tw
- 營業稅專區: https://www.ntbca.gov.tw

Made by Teachify (https://teachify.tw). Source: https://github.com/kaikhq/invoice-helper
