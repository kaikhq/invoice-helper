import { FileText } from 'lucide-react';

export function AppHeader() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
        <FileText className="w-6 h-6" />
      </div>
      <h1 className="text-xl font-bold text-gray-900">統一發票開立輔助工具</h1>
    </div>
  );
}