
import React from 'react';

const GavelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.25L16.5 12.5L13.5 15.5L11.25 13.25M16.5 12.5L20 9L15 4L11.5 7.5M16.5 12.5L11.25 13.25M11.25 13.25L4 21L3 20L9.75 12.75M11.25 13.25L10 12" />
  </svg>
);

export default GavelIcon;
