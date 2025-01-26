interface TaxRowsProps {
  tax: number;
  taxType: 'regular' | 'zero-rate' | 'exempt';
}

export function TaxRows({ tax, taxType }: TaxRowsProps) {
  return (
    <>
      <tr>
        <td rowSpan={2} className="border border-gray-300 p-2 text-center font-medium">
          營業稅
        </td>
        <td colSpan={3} className="border border-gray-300 p-0">
          <div className="grid grid-cols-3 divide-x divide-gray-300">
            <div className="text-center whitespace-nowrap px-2">應稅</div>
            <div className="text-center whitespace-nowrap px-2">零稅率</div>
            <div className="text-center whitespace-nowrap px-2">免稅</div>
          </div>
        </td>
        <td className="border border-gray-300 px-2 text-right text-blue-600 font-mono tabular-nums">
          {tax.toLocaleString()}
        </td>
      </tr>
      <tr>
        <td colSpan={3} className="border border-gray-300 p-0">
          <div className="grid grid-cols-3 divide-x divide-gray-300">
            <div className="text-center px-2">
              {taxType === 'regular' && <span className="text-blue-600 font-bold">✓</span>}
            </div>
            <div className="text-center px-2">
              {taxType === 'zero-rate' && <span className="text-blue-600 font-bold">✓</span>}
            </div>
            <div className="text-center px-2">
              {taxType === 'exempt' && <span className="text-blue-600 font-bold">✓</span>}
            </div>
          </div>
        </td>
        <td className="border border-gray-300 p-2"></td>
      </tr>
    </>
  );
}