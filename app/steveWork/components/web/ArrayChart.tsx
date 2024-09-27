"use client"
import React from 'react';

interface Props<T> {
  title: string;
  data: T[];
  exclude?: (keyof T)[];
}

const ArrayChart = <T extends object>({ title, data, exclude = [] }: Props<T>) => {
  // Ensure data exists and isn't empty
  if (!data || data.length === 0) return <div>No data available</div>;

  // Dynamically extract column headers, excluding specific fields
  const headers = Object.keys(data[0]).filter((key) => !exclude.includes(key as keyof T));

  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 border-b">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border-b">
                  {item[header as keyof T]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArrayChart;
