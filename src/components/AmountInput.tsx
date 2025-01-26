import React from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

export const AmountInput = React.memo(function AmountInput({
  value,
  onChange,
  placeholder,
  autoFocus
}: AmountInputProps) {
  const debouncedValue = useDebounce(value, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, '');
    onChange(newValue);
  };

  const formattedValue = value ? parseInt(value).toLocaleString() : '';

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        className="w-full pl-3 pr-12 py-2.5 border rounded-lg text-lg transition-all duration-200
          focus:outline-none focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10
          font-mono"
        placeholder={placeholder}
        value={formattedValue}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        元
      </div>
    </div>
  );
});