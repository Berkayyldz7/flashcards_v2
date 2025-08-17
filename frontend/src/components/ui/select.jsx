import React from 'react';

export function Select({ value, onValueChange, children }) {
  return <div data-select>{children({ value, onValueChange })}</div>;
}

export function SelectTrigger({ className = '', children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[200px] inline-flex items-center justify-between rounded-md border px-3 py-2 bg-white hover:bg-gray-50 ${className}`}
    >
      {children}
      <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z" /></svg>
    </button>
  );
}

export function SelectContent({ open, children }) {
  if (!open) return null;
  return (
    <div className="absolute z-20 mt-1 w-[200px] rounded-md border bg-white shadow">
      <div className="max-h-64 overflow-auto">{children}</div>
    </div>
  );
}

export function SelectItem({ value, onSelect, children }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="w-full text-left px-3 py-2 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder, value }) {
  return <span className="truncate">{value || placeholder}</span>;
}
