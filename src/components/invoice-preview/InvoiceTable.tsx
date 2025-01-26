import React from 'react';
import { TableHeader } from './table/TableHeader';
import { ItemRows } from './table/ItemRows';
import { SealRow } from './table/SealRow';
import { SubtotalRow } from './table/SubtotalRow';
import { TaxRows } from './table/TaxRows';
import { TotalRow } from './table/TotalRow';
import { ChineseAmountRow } from './table/ChineseAmountRow';
import { TableLayout } from './table/TableLayout';

interface InvoiceTableProps {
  subtotal: number;
  tax: number;
  amount: number;
  taxType: 'regular' | 'zero-rate' | 'exempt';
  chineseAmount: Array<{
    digit: string | null;
    unit: string;
    show: boolean;
  }>;
}

export function InvoiceTable({
  subtotal,
  tax,
  amount,
  taxType,
  chineseAmount
}: InvoiceTableProps) {
  return (
    <div className="p-4">
      <TableLayout>
        <TableHeader />
        <tbody>
          <ItemRows subtotal={subtotal} />
          <SealRow />
          <SubtotalRow subtotal={subtotal} />
          <TaxRows tax={tax} taxType={taxType} />
          <TotalRow amount={amount} />
          <ChineseAmountRow chineseAmount={chineseAmount} />
        </tbody>
      </TableLayout>
    </div>
  );
}