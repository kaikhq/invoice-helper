import { InvoiceCalculation } from '../../types/invoice';

export function MobileCalculationSummary({ tax, subtotal, amount }: InvoiceCalculation) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">營業稅額</div>
            <div className="text-lg font-medium text-blue-700 font-mono tabular-nums">
              {tax.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">銷售額</div>
            <div className="text-lg font-medium text-blue-700 font-mono tabular-nums">
              {subtotal.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">發票總計</div>
            <div className="text-lg font-bold text-blue-900 font-mono tabular-nums">
              {amount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}