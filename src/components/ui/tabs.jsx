import React, { useState } from 'react';
export function Tabs({ children, defaultValue, className = '' }) {
  const [value, setValue] = useState(defaultValue);
  return <div className={className}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { value, setValue }) : child)}</div>;
}
export function TabsList({ children, className = '', value, setValue }) {
  return <div className={className}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { value, setValue }) : child)}</div>;
}
export function TabsTrigger({ children, value: tabValue, setValue, value, className = '', ...props }) {
  return <button className={`px-4 py-2 rounded-xl ${value === tabValue ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border'} ${className}`} onClick={() => setValue(tabValue)} {...props}>{children}</button>;
}
export function TabsContent({ children, value: tabValue, value, className = '', ...props }) {
  return value === tabValue ? <div className={className} {...props}>{children}</div> : null;
}
