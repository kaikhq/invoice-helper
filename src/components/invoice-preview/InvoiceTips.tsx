import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function InvoiceTips() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-lg border border-blue-100 overflow-hidden">
      <div className="border-b border-blue-100 bg-white/50 px-4 py-3">
        <div className="flex items-center gap-2 text-blue-700">
          <AlertCircle className="w-4 h-4" />
          <h3 className="font-medium">檢查清單</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {/* 金額檢查 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">金額檢查</p>
              <p className="text-xs text-gray-600 mt-0.5">
                確認「銷售額」、「營業稅額」與「總計金額」三者是否相符，且無四捨五入誤差
              </p>
            </div>
          </div>

          {/* 課稅別檢查 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">課稅別檢查</p>
              <p className="text-xs text-gray-600 mt-0.5">
                確認已勾選正確的課稅別（應稅、零稅率或免稅），且與交易性質相符
              </p>
            </div>
          </div>

          {/* 買受人資訊檢查 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">買受人資訊檢查</p>
              <p className="text-xs text-gray-600 mt-0.5">
                確認統一編號與買受人名稱是否正確，避免開錯對象
              </p>
            </div>
          </div>

          {/* 品名與數量檢查 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">品名與數量檢查</p>
              <p className="text-xs text-gray-600 mt-0.5">
                填寫清楚的品名描述，並確認數量與單價的計算無誤
              </p>
            </div>
          </div>

          {/* 日期檢查 */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700">日期檢查</p>
              <p className="text-xs text-gray-600 mt-0.5">
                確認開立日期是否在當期（當月）內，避免跨期開立
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-100">
          <p className="text-xs text-blue-600">
            提醒：開立發票時請使用藍色或黑色原子筆，字跡需清晰可辨，且不得塗改。若有錯誤，請依規定作廢重開。
          </p>
        </div>
      </div>
    </div>
  );
}