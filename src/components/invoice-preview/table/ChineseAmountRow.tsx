import React from 'react';

interface ChineseAmountRowProps {
  chineseAmount: Array<{
    digit: string | null;
    unit: string;
    show: boolean;
  }>;
}

export function ChineseAmountRow({ chineseAmount }: ChineseAmountRowProps) {
  return (
    <tr>
      <td colSpan={5} className="border border-gray-300 p-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="text-xs text-gray-700 shrink-0">
            總計新台幣<br />（中文大寫）
          </div>
          <div className="flex items-center tracking-[0.25em] text-sm">
            {chineseAmount.map(({ digit, unit, show }, index) => (
              <React.Fragment key={index}>
                <span className="inline-block w-[2em] text-center">
                  {digit && (
                    <span className={show ? 'text-blue-600 text-lg' : 'text-gray-300 line-through'}>
                      {digit}
                    </span>
                  )}
                </span>
                {unit && (
                  <span className={show ? 'text-gray-600' : 'text-gray-300 line-through'}>
                    {unit}
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="text-gray-600">元整</span>
          </div>
        </div>
      </td>
    </tr>
  );
}