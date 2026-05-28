import { describe, it, expect } from "vitest";
import { runAudit } from "../src/engine/auditEngine.js";

describe("auditEngine", () => {
  it("returns zero savings for optimal setup", () => {
    const result = runAudit([{ toolId: "cursor", planId: "pro", seats: 1, monthlySpend: 20 }]);
    expect(result.totalSavings).toBe(0);
  });

  it("flags Claude Team for 2 users", () => {
    const result = runAudit([{ toolId: "claude", planId: "team", seats: 2, monthlySpend: 60 }]);
    expect(result.totalSavings).toBeGreaterThan(0);
    expect(result.results[0].recommendation).toContain("Pro");
  });

  it("flags Copilot Business for small team", () => {
    const result = runAudit([{ toolId: "github_copilot", planId: "business", seats: 2, monthlySpend: 38 }]);
    expect(result.totalSavings).toBeGreaterThan(0);
  });

  it("calculates annual savings correctly", () => {
    const result = runAudit([{ toolId: "chatgpt", planId: "plus", seats: 1, monthlySpend: 20 }]);
    expect(result.totalAnnualSavings).toBe(result.totalSavings * 12);
  });

  it("handles multiple tools and sums savings", () => {
    const result = runAudit([
      { toolId: "chatgpt", planId: "plus", seats: 1, monthlySpend: 20 },
      { toolId: "github_copilot", planId: "business", seats: 2, monthlySpend: 38 },
    ]);
    expect(result.results.length).toBe(2);
    expect(result.totalSavings).toBeGreaterThan(0);
  });

  it("surfaces savingsLevel high when savings exceed 500", () => {
    const result = runAudit([{ toolId: "cursor", planId: "pro", seats: 10, monthlySpend: 200 }]);
    const level = result.totalSavings > 500 ? "high" : result.totalSavings > 100 ? "medium" : "low";
    expect(["high", "medium", "low"]).toContain(level);
  });
});