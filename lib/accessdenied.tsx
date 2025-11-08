import { Lock } from "lucide-react";
import Link from "next/link";

export default function NoAccessCard() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-2 relative overflow-hidden">

      {/* Subtle background pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5 animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-slate-900/80 backdrop-blur-sm border border-purple-700/20 rounded-2xl shadow-lg text-center space-y-6">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto flex items-center justify-center bg-purple-700/20 rounded-full">
          <Lock className="w-7 h-7 text-purple-400" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white font-sans">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-gray-300 font-mono text-base leading-relaxed">
          You don’t have permission to view this resource. Please buy $ID tokens

        </p>

        {/* Action button */}
                  <Link href={process.env.NEXT_PUBLIC_PUMP_ENDPOINT || ""} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out">
                  Buy $ID
                  </Link>
      </div>
    </div>
  );
}
