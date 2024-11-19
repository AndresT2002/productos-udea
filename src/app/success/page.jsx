"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/products");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center transform animate-fade-in-up">
        <div className="mb-6 relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-check-circle" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500 animate-check-mark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Compra Exitosa!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Gracias por tu compra. Hemos enviado los detalles de tu pedido a tu correo electrónico.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="text-sm text-gray-500">
            Redirigiendo a productos en {countdown} segundos...
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>

          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Ir a productos ahora
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes check-circle {
          from {
            stroke-dashoffset: 166;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes check-mark {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-check-circle {
          animation: check-circle 0.6s ease-out forwards;
        }

        .animate-check-mark {
          animation: check-mark 0.4s ease-out 0.4s forwards;
        }
      `}</style>
    </div>
  );
}

export default SuccessPage;