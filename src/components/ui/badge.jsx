import React from 'react';
export function Badge({ children, className = '', variant, ...props }) {
  let style = variant === 'secondary' ? 'bg-slate-100 text-slate-900' : variant === 'outline' ? 'border border-slate-300 bg-white text-slate-900' : 'bg-slate-900 text-white';
  return <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${style} ${className}`} {...props}>{children}</span>;
}
