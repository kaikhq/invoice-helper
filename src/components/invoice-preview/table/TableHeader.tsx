export function TableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50">
        <th className="py-2 text-center font-medium border border-gray-300" colSpan={2}>
          品　　　　　名
        </th>
        <th className="py-2 text-center font-medium border border-gray-300 whitespace-pre">
          數    量
        </th>
        <th className="py-2 text-center font-medium border border-gray-300 whitespace-pre">
          單    價
        </th>
        <th className="py-2 text-center font-medium border border-gray-300 whitespace-pre">
          金    額
        </th>
        <th className="py-2 text-center font-medium border border-gray-300 whitespace-pre">
          備    註
        </th>
      </tr>
    </thead>
  );
}