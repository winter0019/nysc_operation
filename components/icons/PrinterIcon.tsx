import React from 'react';

const PrinterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0c1.253 0 2.266-.934 2.266-2.083v-3.833c0-1.15-.93-2.084-2.265-2.084H6.342c-1.336 0-2.265.933-2.265 2.084v3.833c0 1.15.93 2.083 2.265 2.083m11.318 0c-3.181 0-5.714-2.5-5.714-5.625S10.158 6.75 13.339 6.75s5.714 2.5 5.714 5.625c0 3.125-2.533 5.625-5.714 5.625Z" />
    </svg>
);

export default PrinterIcon;