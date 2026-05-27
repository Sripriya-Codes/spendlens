import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuditResult from "../components/AuditResult";
import EmailCapture from "../components/EmailCapture";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`audit_${id}`);
    if (!stored) { navigate("/"); return; }
    const parsed = JSON.parse(stored);
    setData(parsed);
    // Show email capture after 1.5s if savings > 0
    setTimeout(() => {
      if (parsed.audit.totalSavings > 0 && !emailDone) setShowEmail(true);
    }, 1500);
    // Fetch AI summary
    fetchSummary(parsed.audit);
  }, [id]);

  async function fetchSummary(audit: any) {
    setSummaryLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 180,
          messages: [{
            role: "system",
            content: "You write concise, honest, financial-advisor-style summaries of AI tool spend audits. Be specific with numbers. 80-100 words max. No fluff.",
          }, {
            role: "user",
            content: `Summarise this AI spend audit: Total monthly spend: $${audit.totalCurrentSpend}. Potential monthly savings: $${audit.totalSavings}. Tools audited: ${audit.results.map((r: any) => r.toolName).join(", ")}. Top recommendation: ${audit.results.find((r: any) => r.potentialSavings > 0)?.recommendation || "All tools are well-optimised"}. Write a 80-100 word paragraph a finance manager would appreciate.`,
          }],
        }),
      });
      const json = await res.json();
      setAiSummary(json.choices?.[0]?.message?.content || fallbackSummary(audit));
    } catch {
      setAiSummary(fallbackSummary(audit));
    }
    setSummaryLoading(false);
  }

  function fallbackSummary(audit: any) {
    if (audit.totalSavings === 0) return `Your AI tool stack is well-optimised. You're spending $${audit.totalCurrentSpend}/month across ${audit.results.length} tool(s) with no obvious overspend detected. Keep monitoring as pricing changes frequently.`;
    return `Your audit identified $${audit.totalSavings}/month (${audit.totalSavings * 12}/year) in potential savings across your AI subscriptions. The biggest opportunity is ${audit.results.find((r: any) => r.potentialSavings > 0)?.recommendation?.toLowerCase()}. Acting on these recommendations could meaningfully reduce your annual AI infrastructure costs.`;
  }

  function handleEmailSubmit(email: string, company: string) {
    console.log("Lead captured:", { email, company, auditId: id });
    setShowEmail(false);
    setEmailDone(true);
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;

  const { audit } = data;
  const isHighSavings = audit.totalSavings > 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {showEmail && !emailDone && (
        <EmailCapture
          totalSavings={audit.totalSavings}
          onSubmit={handleEmailSubmit}
          onSkip={() => setShowEmail(false)}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Hero savings */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 bg-blue-100 text-blue-700">
            SpendLens Audit Report
          </div>
          {audit.totalSavings > 0 ? (
            <>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                ${audit.totalSavings.toFixed(0)}<span className="text-2xl text-gray-400">/mo</span>
              </h1>
              <p className="text-gray-500 text-lg">potential savings · <span className="font-semibold text-green-600">${(audit.totalSavings * 12).toFixed(0)}/year</span></p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-green-600 mb-2">✓ You're spending well</h1>
              <p className="text-gray-500">No significant overspend found across your AI tools.</p>
            </>
          )}
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">AI-Generated Summary</p>
          {summaryLoading ? (
            <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed">{aiSummary}</p>
          )}
        </div>

        {/* Per-tool results */}
        <div className="space-y-3 mb-8">
          {audit.results.map((result: any, i: number) => (
            <AuditResult key={i} result={result} />
          ))}
        </div>

        {/* Credex CTA — only for high savings */}
        {isHighSavings && (
          <div className="bg-blue-600 rounded-2xl p-6 text-white text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Capture even more savings</h2>
            <p className="text-blue-100 text-sm mb-4">Credex sells discounted AI credits from companies that overforecast. Your team could save an additional 20–40% on top of these recommendations.</p>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-50 transition-colors">
              Book a Credex consultation →
            </a>
          </div>
        )}

        {/* Share */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">Share this audit</p>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copy link
          </button>
        </div>

        <button onClick={() => navigate("/")} className="w-full text-gray-400 text-sm hover:text-gray-600 text-center">
          ← Run another audit
        </button>
      </div>
    </div>
  );
}