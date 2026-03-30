import React from 'react';
export function Textarea({ className = '', ...props }) {
  return <textarea className={`w-full border rounded-xl p-3 ${className}`} {...props} />;
}
