import { TOOLS } from "../data/pricingData.js";

export function runAudit(inputs) {
  // inputs = array of { toolId, planId, seats, monthlySpend }
  const results = inputs.map((input) => auditTool(input));
  const totalCurrentSpend = results.reduce((s, r) => s + r.currentMonthlySpend, 0);
  const totalSavings = results.reduce((s, r) => s + r.potentialSavings, 0);
  return {
    results,
    totalCurrentSpend,
    totalSavings,
    totalAnnualSavings: totalSavings * 12,
    savingsLevel: totalSavings > 500 ? "high" : totalSavings > 100 ? "medium" : "low",
  };
}

function auditTool({ toolId, planId, seats, monthlySpend }) {
  const tool = TOOLS[toolId];
  if (!tool) return null;
  const plan = tool.plans[planId];
  const currentMonthlySpend = monthlySpend || (plan?.pricePerSeat || 0) * seats;

  // Rule: Team plans for very small teams
  if (planId === "team" && seats <= 2 && toolId === "claude") {
    const proPlan = tool.plans["pro"];
    const cheaperCost = proPlan.pricePerSeat * seats;
    const savings = currentMonthlySpend - cheaperCost;
    if (savings > 0) {
      return {
        toolId, toolName: tool.name, planId, planName: plan.name,
        seats, currentMonthlySpend,
        recommendation: `Switch to Claude Pro (individual) for each user`,
        reason: `Claude Team requires minimum 5 seats. For ${seats} users, ${seats}× Pro at $${proPlan.pricePerSeat}/seat saves $${savings.toFixed(0)}/mo.`,
        potentialSavings: savings,
        recommendedPlan: "pro",
      };
    }
  }

  // Rule: Paying for Copilot Business when Individual suffices for small teams
  if (toolId === "github_copilot" && planId === "business" && seats <= 3) {
    const indPlan = tool.plans["individual"];
    const cheaperCost = indPlan.pricePerSeat * seats;
    const savings = currentMonthlySpend - cheaperCost;
    return {
      toolId, toolName: tool.name, planId, planName: plan.name,
      seats, currentMonthlySpend,
      recommendation: "Downgrade to GitHub Copilot Individual",
      reason: `Business plan adds admin controls and policy enforcement — overkill for ${seats} devs. Individual saves $${savings.toFixed(0)}/mo with no capability loss for coding tasks.`,
      potentialSavings: savings,
      recommendedPlan: "individual",
    };
  }

  // Rule: Cursor Pro vs Windsurf Pro — suggest cheaper alternative
  if (toolId === "cursor" && planId === "pro" && seats >= 3) {
    const windsurfCost = 15 * seats;
    const savings = currentMonthlySpend - windsurfCost;
    if (savings > 0) {
      return {
        toolId, toolName: tool.name, planId, planName: plan.name,
        seats, currentMonthlySpend,
        recommendation: "Consider Windsurf Pro as an alternative",
        reason: `Windsurf Pro at $15/seat offers comparable AI completions. For ${seats} seats, that's $${savings.toFixed(0)}/mo saved. Worth a 2-week trial.`,
        potentialSavings: savings,
        recommendedPlan: null,
      };
    }
  }

  // Rule: ChatGPT Plus when free tier (GPT-4o free) may suffice for light use
  if (toolId === "chatgpt" && planId === "plus" && seats === 1) {
    return {
      toolId, toolName: tool.name, planId, planName: plan.name,
      seats, currentMonthlySpend,
      recommendation: "Evaluate if Free tier covers your needs",
      reason: `OpenAI now offers GPT-4o on the free tier with generous limits. If your usage is moderate (email, writing, occasional research), downgrading saves $20/mo.`,
      potentialSavings: 20,
      recommendedPlan: "free",
    };
  }

  // Default: already optimal
  return {
    toolId, toolName: tool.name, planId, planName: plan?.name || planId,
    seats, currentMonthlySpend,
    recommendation: "No change recommended",
    reason: "This plan appears well-matched to your team size and usage.",
    potentialSavings: 0,
    recommendedPlan: null,
  };
}