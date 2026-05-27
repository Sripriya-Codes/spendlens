interface Props {
  result: {
    toolName: string;
    planName: string;
    seats: number;
    currentMonthlySpend: number;
    recommendation: string;
    reason: string;
    potentialSavings: number;
  };
}

export default function AuditResult({ result }: Props) {
  const isOptimal = result.potentialSavings === 0;
  return (
    <div className={`rounded-xl border p-5 ${isOptimal ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">{result.toolName}</h3>
          <p className="text-sm text-gray-500">{result.planName} · {result.seats} seat{result.seats !== 1 ? "s" : ""} · ${result.currentMonthlySpend.toFixed(0)}/mo</p>
        </div>
        <div className={`text-right ${isOptimal ? "text-green-600" : "text-amber-600"}`}>
          {isOptimal ? (
            <span className="text-sm font-medium">✓ Optimal</span>
          ) : (
            <span className="font-bold text-lg">-${result.potentialSavings.toFixed(0)}/mo</span>
          )}
        </div>
      </div>
      <div className={`mt-3 text-sm rounded-lg p-3 ${isOptimal ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
        <p className="font-medium mb-1">{result.recommendation}</p>
        <p className="text-xs opacity-80">{result.reason}</p>
      </div>
    </div>
  );
}