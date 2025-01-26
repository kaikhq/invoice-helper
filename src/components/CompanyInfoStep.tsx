import { FormStep } from './ui/FormStep';
import { FormField } from './ui/FormField';
import { Search } from 'lucide-react';

interface CompanyInfoStepProps {
  uniformNumber: string;
  setUniformNumber: (value: string) => void;
  buyer: string;
  setBuyer: (value: string) => void;
  autoFocus?: boolean;
}

export function CompanyInfoStep({
  uniformNumber,
  setUniformNumber,
  buyer,
  setBuyer,
  autoFocus
}: CompanyInfoStepProps) {
  return (
    <FormStep number={2} title="公司資訊">
      <div className="space-y-4">
        <FormField
          label="統一編號"
          required
          hint="輸入完整統一編號後，系統會自動帶入公司名稱"
        >
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2.5 border rounded-lg text-lg bg-white transition-all duration-200
                focus:outline-none focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10"
              placeholder="請輸入8位數字"
              maxLength={8}
              value={uniformNumber}
              onChange={(e) => setUniformNumber(e.target.value.replace(/\D/g, ''))}
              autoFocus={autoFocus}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {uniformNumber.length > 0 && uniformNumber.length < 8 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                還需輸入 {8 - uniformNumber.length} 位
              </div>
            )}
          </div>
        </FormField>

        <FormField label="買受人">
          <div className="relative">
            <input
              type="text"
              className={`w-full px-3 py-2.5 border rounded-lg text-lg transition-all duration-200
                focus:outline-none focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10
                ${uniformNumber.length === 8 
                  ? 'bg-gray-50 text-gray-700 cursor-not-allowed' 
                  : 'bg-white'}`}
              placeholder={uniformNumber.length === 8 ? '查詢中...' : '自動帶入公司名稱'}
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              readOnly={!!uniformNumber}
            />
            {uniformNumber.length === 8 && !buyer && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animation-delay-200"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animation-delay-400"></div>
                </div>
              </div>
            )}
          </div>
        </FormField>
      </div>
    </FormStep>
  );
}