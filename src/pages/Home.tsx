import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpendForm from "../components/SpendForm";
import { runAudit } from "../engine/auditEngine.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(entries: any[]) {
    setLoading(true);
    try {
      const audit = runAudit(entries);
      // Store in sessionStorage so Result page can read it
      const id = crypto.randomUUID();
      sessionStorage.setItem(`audit_${id}`, JSON.stringify({ audit, entries, createdAt: new Date().toISOString() }));
      navigate(`/result/${id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🔍 Free AI Spend Audit
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Are you overpaying<br />
            <span className="text-blue-600">for AI tools?</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            SpendLens audits your AI subscriptions in 30 seconds. No login. Free forever.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Your current AI tools</h2>
          <SpendForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Trust line */}
        <p className="text-center text-xs text-gray-400 mt-6">
          No login required. Your data is never sold.
        </p>
      </div>
    </div>
  );
}