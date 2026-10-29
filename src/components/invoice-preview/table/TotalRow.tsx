import { formatNumber } from '../../../utils/numberUtils';
interface TotalRowProps {
  amount: number;
}

export function TotalRow({ amount }: TotalRowProps) {
  return (
    <tr>
      <td colSpan={4} className="border border-gray-300 p-2 text-center font-medium">
        總　　計
      </td>
      <td className="border border-gray-300 p-2 text-right text-blue-600 font-mono tabular-nums">
        {formatNumber(amount)}
      </td>
    </tr>
  );
}
