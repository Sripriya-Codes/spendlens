import { useState } from "react";
import { TOOLS } from "../data/pricingData.js";

interface ToolEntry {
  toolId: string;
  planId: string;
  seats: number;
  monthlySpend: number;
}

interface Props {
  onSubmit: (entries: ToolEntry[]) => void;
  loading: boolean;
}

const EMPTY_ENTRY = (): ToolEntry => ({
  toolId: "cursor",
  planId: "pro",
  seats: 1,
  monthlySpend: 0,
});

type ToolsType = typeof TOOLS;
type ToolKey = keyof ToolsType;

export default function SpendForm({ onSubmit, loading }: Props) {
  const [entries, setEntries] = useState<ToolEntry[]>([EMPTY_ENTRY()]);

  function updateEntry(index: number, field: keyof ToolEntry, value: string | number) {
    setEntries((prev) => {
      const updated = [...prev];
      if (field === "toolId") {
        const toolKey = value as ToolKey;
        const firstPlan = Object.keys(TOOLS[toolKey].plans)[0];
        updated[index] = { ...updated[index], toolId: value as string, planId: firstPlan, monthlySpend: 0 };
      } else if (field === "planId") {
        updated[index] = { ...updated[index], planId: value as string };
      } else {
        updated[index] = { ...updated[index], [field]: Number(value) };
      }
      return updated;
    });
  }

  function addTool() {
    setEntries((prev) => [...prev, EMPTY_ENTRY()]);
  }

  function removeTool(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => {
        const toolKey = entry.toolId as ToolKey;
        const tool = TOOLS[toolKey];
        const plans = tool?.plans || {};
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-gray-500">Tool {index + 1}</span>
              {entries.length > 1 && (
                <button onClick={() => removeTool(index)} className="text-red-400 hover:text-red-600 text-sm">
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Tool</label>
                <select
                  value={entry.toolId}
                  onChange={(e) => updateEntry(index, "toolId", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(TOOLS).map(([id, t]) => (
                    <option key={id} value={id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan</label>
                <select
                  value={entry.planId}
                  onChange={(e) => updateEntry(index, "planId", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(plans).map(([id, p]) => (
                    <option key={id} value={id}>{(p as any).name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Seats</label>
                <input
                  type="number"
                  min={1}
                  value={entry.seats}
                  onChange={(e) => updateEntry(index, "seats", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Monthly Spend ($)</label>
                <input
                  type="number"
                  min={0}
                  value={entry.monthlySpend}
                  onChange={(e) => updateEntry(index, "monthlySpend", e.target.value)}
                  placeholder="Auto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={addTool}
        className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        + Add another tool
      </button>

      <button
        onClick={() => onSubmit(entries)}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? "Analysing your spend..." : "Run My Audit →"}
      </button>
    </div>
  );
}