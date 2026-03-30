import React from 'react';
export function Card({ children, className = '', ...props }) {
  return <div className={`bg-white border rounded-lg p-4 ${className}`} {...props}>{children}</div>;
}
export function CardHeader({ children, className = '', ...props }) {
  return <div className={`mb-2 ${className}`} {...props}>{children}</div>;
}
export function CardTitle({ children, className = '', ...props }) {
  return <div className={`font-bold text-lg ${className}`} {...props}>{children}</div>;
}
export function CardDescription({ children, className = '', ...props }) {
  return <div className={`text-gray-500 text-sm ${className}`} {...props}>{children}</div>;
}
export function CardContent({ children, className = '', ...props }) {
  return <div className={className} {...props}>{children}</div>;
}
