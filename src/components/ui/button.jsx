import React from 'react';
export function Button({ children, className = '', variant, ...props }) {
  let base = 'px-4 py-2 rounded font-medium transition';
  let style = variant === 'outline' ? 'border border-gray-300 bg-white hover:bg-gray-100' : 'bg-slate-900 text-white hover:bg-slate-800';
  return <button className={`${base} ${style} ${className}`} {...props}>{children}</button>;
}
