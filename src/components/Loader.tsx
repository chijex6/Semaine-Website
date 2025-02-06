import React from "react";
import { Shield } from "lucide-react";
export function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center z-50">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                animation: `particleFloat${i} 2s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 w-24 h-24 border-4 border-red-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-0 w-24 h-24 border-4 border-red-500/50 rounded-full animate-pulse" />
          <div className="relative w-24 h-24 flex items-center justify-center">
            <Shield
              size={48}
              className="text-red-500 animate-[bounce_2s_ease-in-out_infinite]"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-white text-3xl font-bold tracking-wider animate-typing overflow-hidden whitespace-nowrap">
            Semaine
          </h1>
          <p className="text-red-500/80 text-sm mt-2 animate-fade-in">
            Securing what matters
          </p>
        </div>
      </div>
      <style>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        ${[...Array(8)]
          .map(
            (_, i) => `
          @keyframes particleFloat${i} {
            0% {
              transform: rotate(${i * 45}deg) translateY(0) scale(0);
              opacity: 0;
            }
            50% {
              transform: rotate(${i * 45}deg) translateY(-50px) scale(1);
              opacity: 0.5;
            }
            100% {
              transform: rotate(${i * 45}deg) translateY(-100px) scale(0);
              opacity: 0;
            }
          }
        `,
          )
          .join("\n")}
        .animate-typing {
          animation: typing 1s steps(7, end);
        }
        .animate-fade-in {
          animation: fadeIn 2s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
