import { ReactNode } from 'react';

interface FormStepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function FormStep({ number, title, children }: FormStepProps) {
  return (
    <div className="space-y-3">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded text-white text-sm font-medium">
          {number}
        </div>
        <h2 className="text-base font-medium text-gray-700">{title}</h2>
      </div>

      {/* Step content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}