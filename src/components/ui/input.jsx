import React from 'react';
export function Input({ className = '', ...props }) {
  return <input className={`w-full border rounded-xl p-3 ${className}`} {...props} />;
}
