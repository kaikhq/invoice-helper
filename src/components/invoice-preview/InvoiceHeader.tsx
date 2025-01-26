import { FormattedDatePart } from '../../utils/dateUtils';

interface InvoiceHeaderProps {
  invoicePeriod: string;
  buyer: string;
  uniformNumber: string;
  formattedDate: FormattedDatePart[];
}

export function InvoiceHeader({ invoicePeriod, buyer, uniformNumber, formattedDate }: InvoiceHeaderProps) {
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">統一發票（三聯式）</h2>
        <p className="text-gray-600 mt-1">{invoicePeriod}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="font-medium min-w-20">買受人</span>
            <span className="text-blue-600 flex-1">{buyer || '　'}</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-medium min-w-20">統一編號</span>
            <span className="text-blue-600 flex-1 font-mono tracking-wider">
              {uniformNumber || '　'}
            </span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-medium min-w-20">地　址</span>
            <span className="text-gray-400 flex-1">（免填）</span>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block text-left">
            <span className="font-medium">日期</span>
            <span className="ml-2">
              {formattedDate.map((part, index) => (
                <span
                  key={index}
                  className={part.highlight ? 'text-blue-600' : ''}
                >
                  {part.text}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}