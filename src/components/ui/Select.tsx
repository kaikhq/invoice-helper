import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export function Select({ value, onChange, options, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className={`w-full px-3 py-2.5 border rounded-lg text-lg bg-white transition-all duration-200
          focus:outline-none focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10
          ${isOpen ? 'border-blue-500/20 ring-4 ring-blue-500/10' : 'hover:border-gray-300'}
          ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="truncate">{selectedOption?.label}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200
              ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-3 py-2.5 text-left transition-colors duration-150
                  hover:bg-blue-50 focus:outline-none focus:bg-blue-50
                  ${option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}