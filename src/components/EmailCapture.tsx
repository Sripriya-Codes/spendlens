import { useState } from "react";

interface Props {
  onSubmit: (email: string, company: string) => void;
  onSkip: () => void;
  totalSavings: number;
}

export default function EmailCapture({ onSubmit, onSkip, totalSavings }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your full report</h2>
        <p className="text-gray-500 mb-6">
          We found <span className="font-semibold text-blue-600">${totalSavings.toFixed(0)}/mo in potential savings</span>. Enter your email to get a copy and we'll notify you when new optimisations apply to your stack.
        </p>
        {/* Honeypot field — hidden from real users, catches bots */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <div className="space-y-3 mb-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Company name (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => email && onSubmit(email, company)}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors mb-3"
        >
          Send my report →
        </button>
        <button
          onClick={onSkip}
          className="w-full text-gray-400 text-sm hover:text-gray-600"
        >
          Skip for now, just show me the results
        </button>
      </div>
    </div>
  );
}