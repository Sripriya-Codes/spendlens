import { TOOLS } from "../data/pricingData.js";

export function runAudit(inputs) {
  const results = inputs.map((input) => auditTool(input)).filter(Boolean);
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
  const currentMonthlySpend = monthlySpend > 0 ? Number(monthlySpend) : (plan?.pricePerSeat || 0) * seats;

  if (planId === "team" && seats <= 2 && toolId === "claude") {
    const proPlan = tool.plans["pro"];
    const cheaperCost = proPlan.pricePerSeat * seats;
    const savings = currentMonthlySpend - cheaperCost;
    if (savings > 0) return { toolId, toolName: tool.name, planId, planName: plan.name, seats, currentMonthlySpend, recommendation: "Switch each user to Claude Pro (individual)", reason: `Claude Team requires minimum 5 seats. For ${seats} users, ${seats}x Pro at $${proPlan.pricePerSeat}/seat saves $${savings.toFixed(0)}/mo.`, potentialSavings: savings, recommendedPlan: "pro" };
  }

  if (toolId === "github_copilot" && planId === "business" && seats <= 3) {
    const cheaperCost = tool.plans["individual"].pricePerSeat * seats;
    const savings = currentMonthlySpend - cheaperCost;
    if (savings > 0) return { toolId, toolName: tool.name, planId, planName: plan.name, seats, currentMonthlySpend, recommendation: "Downgrade to GitHub Copilot Individual", reason: `Business adds admin controls — overkill for ${seats} devs. Individual saves $${savings.toFixed(0)}/mo with no coding capability loss.`, potentialSavings: savings, recommendedPlan: "individual" };
  }

  if (toolId === "cursor" && planId === "pro" && seats >= 3) {
    const windsurfCost = 15 * seats;
    const savings = currentMonthlySpend - windsurfCost;
    if (savings > 0) return { toolId, toolName: tool.name, planId, planName: plan.name, seats, currentMonthlySpend, recommendation: "Evaluate Windsurf Pro as alternative", reason: `Windsurf Pro at $15/seat offers comparable completions. For ${seats} seats that's $${savings.toFixed(0)}/mo saved. Worth a 2-week trial before renewing.`, potentialSavings: savings, recommendedPlan: null };
  }

  if (toolId === "chatgpt" && planId === "plus" && seats === 1) {
    return { toolId, toolName: tool.name, planId, planName: plan.name, seats, currentMonthlySpend, recommendation: "Evaluate if Free tier covers your needs", reason: "OpenAI now offers GPT-4o on the free tier. If your usage is moderate (email, writing, research), downgrading saves $20/mo.", potentialSavings: 20, recommendedPlan: "free" };
  }

  if (toolId === "gemini" && planId === "pro" && seats === 1) {
    return { toolId, toolName: tool.name, planId, planName: plan.name, seats, currentMonthlySpend, recommendation: "Verify you need Gemini Advanced", reason: "Gemini free tier covers most individual use cases including Docs and image generation. Advanced is only worth it for heavy daily use.", potentialSavings: 20, recommendedPlan: "free" };
  }

  return { toolId, toolName: tool.name, planId, planName: plan?.name || planId, seats, currentMonthlySpend, recommendation: "No change recommended", reason: "This plan appears well-matched to your team size and usage.", potentialSavings: 0, recommendedPlan: null };
}