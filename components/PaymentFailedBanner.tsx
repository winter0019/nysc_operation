import React from 'react';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import XMarkIcon from './icons/XMarkIcon';

interface PaymentFailedBannerProps {
  onDismiss: () => void;
}

const PaymentFailedBanner: React.FC<PaymentFailedBannerProps> = ({ onDismiss }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div>
            <p className="text-sm font-bold text-yellow-800">Payment failed</p>
            <p className="mt-1 text-sm text-yellow-700">
              Update your credit card to avoid losing access to your workspace's services.
            </p>
          </div>
          <div className="mt-3 md:mt-0 md:ml-6 flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Update payment
            </button>
          </div>
        </div>
         <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedBanner;
