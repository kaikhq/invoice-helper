import { ReactNode } from 'react';

interface PreviewCardProps {
  children: ReactNode;
}

export function PreviewCard({ children }: PreviewCardProps) {
  return (
    <div className="sticky top-6">
      <div className="bg-white/50 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/80">
        {children}
      </div>
    </div>
  );
}
