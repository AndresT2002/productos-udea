"use client"

import { useState } from 'react';

function ButtonCheckout({ priceId }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          priceId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`
        relative w-full px-6 py-3 
        bg-gradient-to-r from-purple-600 to-blue-600
        hover:from-purple-700 hover:to-blue-700
        text-white text-lg font-semibold
        rounded-xl shadow-lg
        transform transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        disabled:opacity-70 disabled:cursor-not-allowed
        group
      `}
    >
      <div className="absolute inset-0 w-full h-full bg-white/[0.15] rounded-xl hidden group-hover:block transition-all duration-300" />
      
      <div className="relative flex items-center justify-center space-x-2">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Procesando...</span>
          </>
        ) : (
          <>
            <span>Comprar ahora</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </>
        )}
      </div>
    </button>
  );
}

export default ButtonCheckout;