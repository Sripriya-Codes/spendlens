import { useState } from "react";

interface Props {
  onSubmit: (email: string, company: string) => void;
  onSkip: () => void;
  totalSavings: number;
  inline?: boolean;
}

export default function EmailCapture({ onSubmit, onSkip, totalSavings, inline }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const content = (
    <div className={inline ? "" : "bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"}>
      {!inline && <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your full report</h2>}
      {!inline && totalSavings > 0 && (
        <p className="text-gray-500 mb-6">We found <span className="font-semibold text-blue-600">${totalSavings.toFixed(0)}/mo in potential savings</span>. Get a copy sent to your inbox.</p>
      )}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="space-y-3 mb-4">
        <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" placeholder="Company name (optional)" value={company} onChange={(e) => setCompany(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={() => email && onSubmit(email, company)}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors mb-3">
        Notify me →
      </button>
      {!inline && <button onClick={onSkip} className="w-full text-gray-400 text-sm hover:text-gray-600">Skip for now</button>}
    </div>
  );

  if (inline) return content;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {content}
    </div>
  );
}