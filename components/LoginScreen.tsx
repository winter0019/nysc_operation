
import React, { useState, useRef, useEffect } from 'react';
import { LGA } from '../types';
import { DAURA_ZONE_LGAS } from '../constants';
import Button from './common/Button';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface LoginScreenProps {
  onLogin: (lga: LGA) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [selectedLGA, setSelectedLGA] = useState<string>(DAURA_ZONE_LGAS[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lga = DAURA_ZONE_LGAS.find(l => l.id === selectedLGA);
    if (lga) {
      onLogin(lga);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLgaObject = DAURA_ZONE_LGAS.find(l => l.id === selectedLGA);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
            <div className="flex flex-col items-center justify-center space-y-3">
                <img src="https://nysc.gov.ng/assets/img/logo.png" alt="NYSC Logo" className="h-24 w-24"/>
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        NYSC Daura Zone
                    </h2>
                     <p className="mt-1 text-sm font-medium text-green-800 tracking-wider">
                        SERVICE AND HUMILITY
                    </p>
                </div>
            </div>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            LGI Operations Dashboard
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Select Your Local Government Area
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex justify-between items-center p-3 rounded-md transition-colors duration-200 text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span>{selectedLgaObject?.name || 'Select...'}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  {DAURA_ZONE_LGAS.map((lga) => (
                    <button
                      key={lga.id}
                      type="button"
                      onClick={() => {
                        setSelectedLGA(lga.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left p-3 text-sm font-medium transition-colors duration-150 ${
                        selectedLGA === lga.id
                          ? 'bg-green-600 text-white'
                          : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      {lga.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>


          <div>
            <Button type="submit" className="w-full mt-4">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
