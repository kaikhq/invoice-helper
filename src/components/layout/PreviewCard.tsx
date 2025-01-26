import { ReactNode } from 'react';

interface PreviewCardProps {
  children: ReactNode;
}

export function PreviewCard({ children }: PreviewCardProps) {
  return (
    <div className="top-6">
      <div className="">
        <h1>Hello card</h1>
        {children}
      </div>
    </div>
  );
}
