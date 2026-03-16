'use client';

export default function DateFilterSelect({ current, DATE_PRESETS, onChange }) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="border-none text-blue-600 underline "
    >
      {Object.entries(DATE_PRESETS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
