
import React from 'react';

interface LetterheadDisplayProps {
  queryText: string;
}

const LetterheadDisplay: React.FC<LetterheadDisplayProps> = ({ queryText }) => {
  return (
    <div className="printable-area bg-white p-8 border border-gray-200 shadow-lg font-serif text-sm text-black min-h-full flex flex-col relative">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img src="https://i.imgur.com/gY2842G.png" alt="NYSC Logo" className="h-24 w-24" />
          </div>
          <div className="text-right font-bold text-xs">
             <p>Beside Daura Emirate Council</p>
             <p>Kangiwa Office Complex</p>
             <p>Daura, Katsina State</p>
          </div>
        </div>
        <div className="text-center -mt-20">
            <h1 className="text-3xl font-extrabold text-green-700" style={{ letterSpacing: '0.1em' }}>
              NATIONAL YOUTH SERVICE CORPS
            </h1>
            <p className="text-lg font-semibold" style={{color: '#d32f2f'}}>
              Office of the Zonal Inspector, Daura Zonal Office
            </p>
        </div>
        <div className="mt-4 space-y-px">
            <div className="h-1 bg-green-700"></div>
            <div className="h-1 bg-black"></div>
            <div className="h-1" style={{backgroundColor: '#8B4513'}}></div>
        </div>
      </header>

      {/* Body */}
      <main className="px-2 flex-grow">
        <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
          {queryText}
        </pre>
      </main>
      
      {/* Footer */}
      <footer className="mt-16">
         <div className="space-y-px">
            <div className="h-1 bg-green-700"></div>
            <div className="h-1 bg-black"></div>
            <div className="h-1" style={{backgroundColor: '#8B4513'}}></div>
        </div>
        <p className="text-center mt-2 text-sm font-semibold">
            nyscdaurazone@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default LetterheadDisplay;