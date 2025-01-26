interface SubtotalRowProps {
  subtotal: number;
}

export function SubtotalRow({ subtotal }: SubtotalRowProps) {
  return (
    <tr>
      <td colSpan={4} className="border border-gray-300 p-2 text-center font-medium tracking-[1em]">
        銷　售　額　合　計
      </td>
      <td className="border border-gray-300 p-2 text-right text-blue-600 font-mono tabular-nums">
        {subtotal.toLocaleString()}
      </td>
      <td rowSpan={5} className="border border-gray-300 p-2"></td>
    </tr>
  );
}