'use client'

import { useId } from 'react';

export default function IconRigthArrow() {
  const idUnico = useId();

  return (
    <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 16 16">
      <defs>
        <linearGradient id={idUnico} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="50%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
      </defs>
      
      <path d="M0 0h16v16H0z" fill="none" />
      <path 
        fill={`url(#${idUnico})`} 
        fillRule="evenodd" 
        d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8L5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0" 
        clipRule="evenodd" 
      />
    </svg>
  );
}