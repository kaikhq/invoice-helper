import { Calculator, Plus, Equal } from 'lucide-react';

interface CalculationSummaryProps {
  tax: number;
  subtotal: number;
  amount: number;
}

export function CalculationSummary({ tax, subtotal, amount }: CalculationSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/50 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* 銷售額 */}
          <div className="flex-1 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm rounded-lg border border-blue-100 p-4 shadow-sm">
            <div className="text-sm text-blue-600 mb-1 font-medium">銷售額</div>
            <div className="text-2xl font-medium text-blue-700 font-mono tabular-nums tracking-tight">
              {subtotal.toLocaleString()}
            </div>
          </div>

          {/* Plus Sign */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-white border border-blue-200/80 shadow-sm">
            <Plus className="w-5 h-5 text-blue-500" />
          </div>

          {/* 營業稅額 */}
          <div className="flex-1 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm rounded-lg border border-blue-100 p-4 shadow-sm">
            <div className="text-sm text-blue-600 mb-1 font-medium">營業稅額</div>
            <div className="text-2xl font-medium text-blue-700 font-mono tabular-nums tracking-tight">
              {tax.toLocaleString()}
            </div>
          </div>

          {/* Equals Sign */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-white border border-blue-200/80 shadow-sm">
            <Equal className="w-5 h-5 text-blue-500" />
          </div>

          {/* 發票總計 */}
          <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg border border-blue-500 p-4 shadow-md">
            <div className="text-sm text-blue-100 mb-1 font-medium">發票總計</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
              {amount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Mobile view - Stack vertically */}
        <div className="md:hidden mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-blue-600">
            <span>銷售額</span>
            <span className="font-mono">{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-blue-600">
            <span>營業稅額</span>
            <span className="font-mono">{tax.toLocaleString()}</span>
          </div>
          <div className="h-px bg-blue-200/50" />
          <div className="flex items-center justify-between text-sm font-medium text-blue-700">
            <span>發票總計</span>
            <span className="font-mono">{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}