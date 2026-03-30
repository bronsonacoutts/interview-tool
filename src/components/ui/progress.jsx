import React from 'react';
export function Progress({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div className="h-2 bg-slate-900 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
}
