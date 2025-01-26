import { ReactNode } from 'react';

interface TableLayoutProps {
  children: ReactNode;
}

export function TableLayout({ children }: TableLayoutProps) {
  return (
    <table className="w-full border-collapse">
      <colgroup>
        <col className="w-[30%]" />
        <col className="w-[5%]" />
        <col className="w-[10%]" />
        <col className="w-[15%]" />
        <col className="w-[15%]" />
        <col className="w-[25%]" />
      </colgroup>
      {children}
    </table>
  );
}