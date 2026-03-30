import React, { useState } from 'react';
export function Accordion({ children, className = '', ...props }) {
  return <div className={className} {...props}>{children}</div>;
}
export function AccordionItem({ value, children, ...props }) {
  return <div {...props}>{children}</div>;
}
export function AccordionTrigger({ children, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen((o) => !o)} {...props} className="w-full text-left font-semibold py-2">
        {children}
      </button>
    </div>
  );
}
export function AccordionContent({ children, ...props }) {
  return <div className="pl-4 pb-2 text-sm text-gray-600" {...props}>{children}</div>;
}
