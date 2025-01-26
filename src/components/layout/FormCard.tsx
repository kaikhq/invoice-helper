import { ReactNode } from 'react';
import { FileText } from 'lucide-react';

interface FormCardProps {
  children: ReactNode;
}

export function FormCard({ children }: FormCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100">
      <div className="relative">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-transparent" />
        
        {/* Header content */}
        <div className="relative px-6 py-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900">統一發票開立小幫手</h1>
            <p className="text-sm text-blue-600/80 mt-0.5">輕鬆計算正確稅額，再也不必擔心寫錯發票</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}