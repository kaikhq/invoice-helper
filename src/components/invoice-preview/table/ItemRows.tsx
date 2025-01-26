interface ItemRowsProps {
  subtotal: number;
}

export function ItemRows({ subtotal }: ItemRowsProps) {
  return (
    <>
      <tr>
        <td className="border border-gray-300 p-2 text-blue-600" colSpan={2}>
          請填寫品名
        </td>
        <td className="border border-gray-300 p-2 text-right text-blue-600 font-mono tabular-nums">
          1
        </td>
        <td className="border border-gray-300 p-2 text-right text-blue-600 font-mono tabular-nums">
          {subtotal.toLocaleString()}
        </td>
        <td className="border border-gray-300 p-2 text-right text-blue-600 font-mono tabular-nums">
          {subtotal.toLocaleString()}
        </td>
        <td className="border border-gray-300 p-2"></td>
      </tr>
      {[...Array(2)].map((_, i) => (
        <tr key={i} className="h-[2.5rem]">
          <td className="border border-gray-300" colSpan={2}></td>
          <td className="border border-gray-300"></td>
          <td className="border border-gray-300"></td>
          <td className="border border-gray-300"></td>
          <td className="border border-gray-300"></td>
        </tr>
      ))}
    </>
  );
}