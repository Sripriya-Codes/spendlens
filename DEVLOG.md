# DevLog

## Day 1 — 2026-05-23

**Hours worked:** 4
**What I did:** Read assignment carefully. Set up Vite + React + TypeScript + Tailwind. Built pricingData.js with all 8 required tools and their plans. Built auditEngine.js with defensible rules for each tool. Made first commit.
**What I learned:** Tailwind v4 broke the init command — had to pin to v3.
**Blockers:** Tailwind v4 compatibility issue with `init -p`.
**Plan for tomorrow:** Build full UI — SpendForm, AuditResult, routing, Result page.

## Day 2 — 2026-05-24

**Hours worked:** 5
**What I did:** Built SpendForm with dynamic tool/plan selectors. Built AuditResult card component. Built EmailCapture modal. Set up react-router-dom with Home and Result pages. Wired audit engine to form submission. Tested end-to-end flow locally.
**What I learned:** TypeScript generics for component props. How sessionStorage works as a lightweight state bridge between routes.
**Blockers:** Had duplicate API response parsing code that caused white screen — found it by reading console errors carefully.
**Plan for tomorrow:** Add Neon DB, AI summary via Groq, all markdown docs, tests, CI.

## Day 3 — 2026-05-25

**Hours worked:** 6
**What I did:** Set up Neon Postgres, created audits table. Wired Groq API for AI summary with graceful fallback. Wrote all 12 markdown files. Wrote 6 Vitest tests for audit engine. Set up GitHub Actions CI. Added Open Graph meta tags.
**What I learned:** Neon's HTTP API endpoint format. How to write GitHub Actions that pass secrets as env vars.
**Blockers:** Neon connection string format needed careful parsing.
**Plan for tomorrow:** Deploy to Vercel, final polish, Lighthouse check, submit.

## Day 4 — 2026-05-26

**Hours worked:** 3
**What I did:** Deployed to Vercel with environment variables. Ran Lighthouse — fixed contrast issues for accessibility score. Added screenshots to README. Submitted via Google Form.
**What I learned:** Vercel environment variables must be added before first deploy or you need to redeploy.
**Blockers:** None significant.
**Plan for tomorrow:** Assignment submitted.

## Day 5 — 2026-05-27

**Hours worked:** 1
**What I did:** Final review of all markdown files. Verified live URL still working. Double-checked git log has commits across 5 days.
**What I learned:** The devlog is the most read file — write it honestly.
**Blockers:** None.
**Plan for tomorrow:** Wait for Round 2 results.
