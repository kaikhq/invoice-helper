// How the tool works, in plain text: read by people below the fold and by
// agents and crawlers that never run JavaScript.
export function AboutSection() {
  return (
    // The bottom margin keeps this clear of the fixed mobile summary bar.
    <section className="mt-6 mb-28 lg:mb-0 bg-white/60 rounded-xl border border-gray-100 p-6 text-sm text-gray-600 space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-medium text-gray-700">關於這個工具</h2>
        <p>
          輸入買受人、統一編號、品名與金額，自動計算銷售額、5%
          營業稅與總計，產生中文大寫金額，並以三聯式發票格式即時預覽，方便照著填寫紙本手寫統一發票。金額計算都在瀏覽器中完成；輸入有效的
          8
          位數統一編號時，會送到我們的統編查詢服務（tw-ubn-lookup.kaik.workers.dev）帶入買受人名稱。
        </p>
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-medium text-gray-700">計算方式</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            應稅（5%）：由含稅總計推算時，稅額 = 四捨五入(總計 − 總計 ÷ 1.05)，銷售額 = 總計 −
            稅額；由未稅銷售額推算時，稅額 = 四捨五入(銷售額 × 0.05)。
          </li>
          <li>零稅率、免稅：稅額為 0，銷售額等於總計。</li>
        </ul>
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-medium text-gray-700">網址預填</h2>
        <p>
          可用網址參數預先帶入欄位：<code>uniformNumber</code>（統一編號）、<code>amount</code>
          （含稅總計）、<code>itemName</code>（品名），例如{' '}
          <a
            className="text-blue-600 hover:underline break-all"
            href="/?uniformNumber=12345678&amount=1050&itemName=顧問費"
          >
            /?uniformNumber=12345678&amp;amount=1050&amp;itemName=顧問費
          </a>
          。給 AI agent 的說明在{' '}
          <a className="text-blue-600 hover:underline" href="/llms.txt">
            llms.txt
          </a>
          。電子發票請改用{' '}
          <a
            className="text-blue-600 hover:underline"
            href="https://www.einvoice.nat.gov.tw"
            target="_blank"
            rel="noopener noreferrer"
          >
            財政部電子發票整合平台
          </a>
          。
        </p>
      </div>
    </section>
  );
}
