interface RadioCardProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  name: string;
}

export function RadioCard({ label, value, checked, onChange, name }: RadioCardProps) {
  return (
    <label className="flex items-center gap-2 p-3 border rounded-md bg-white cursor-pointer hover:bg-gray-50">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 text-blue-600"
      />
      <span>{label}</span>
    </label>
  );
}