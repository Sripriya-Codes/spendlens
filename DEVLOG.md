# DevLog

## Day 1 — 2026-05-21

**Hours worked:** 2
**What I did:** Read the full assignment PDF. Planned architecture. Decided on React + Vite + TypeScript + Tailwind + Groq + Neon. Created spendlens folder locally, set up project with Vite.
**What I learned:** Tailwind v4 changed its init process — had to pin to v3.
**Blockers:** Tailwind v4 incompatibility with init -p command.
**Plan for tomorrow:** Build pricingData.js and auditEngine.js.

## Day 2 — 2026-05-22

**Hours worked:** 3
**What I did:** Built pricingData.js with all 8 required tools and their plans. Built auditEngine.js with defensible rule-based logic for each tool. Tested rules manually.
**What I learned:** Writing financially defensible audit rules requires thinking from the user's perspective, not just comparing prices.
**Blockers:** None significant.
**Plan for tomorrow:** Build UI components.

## Day 3 — 2026-05-23

**Hours worked:** 4
**What I did:** Built SpendForm, AuditResult, EmailCapture components. Set up react-router-dom. Built Home and Result pages. Wired audit engine to form submission.
**What I learned:** sessionStorage as a lightweight state bridge between routes. TypeScript strict mode index signature requirements.
**Blockers:** TS7053 errors on dynamic TOOLS object indexing — fixed by casting to keyof typeof TOOLS.
**Plan for tomorrow:** Add Groq AI summary, tests, CI, markdown docs.

## Day 4 — 2026-05-24

**Hours worked:** 4
**What I did:** Integrated Groq API for AI summary with graceful fallback. Wrote 6 Vitest tests for audit engine. Set up GitHub Actions CI workflow. Added Open Graph meta tags to index.html.
**What I learned:** CORS blocks direct browser-to-database calls — Neon requires a server-side route in production. Vercel needs vercel.json rewrite rule for SPA routing.
**Blockers:** Neon CORS error. CI failing on unused TypeScript variables.
**Plan for tomorrow:** Write all markdown documentation files.

## Day 5 — 2026-05-25

**Hours worked:** 3
**What I did:** Conducted 3 user interviews with friends who use AI tools daily. Wrote USER_INTERVIEWS.md, GTM.md, ECONOMICS.md, LANDING_COPY.md, METRICS.md, ARCHITECTURE.md, PROMPTS.md, PRICING_DATA.md, TESTS.md, REFLECTION.md, README.md.
**What I learned:** Real user interviews surface assumptions you didn't know you had — one friend uses Gemini not by choice but because it's the Android default. That changed how I wrote the audit reasoning.
**Blockers:** None.
**Plan for tomorrow:** Final polish and deployment.

## Day 6 — 2026-05-26

**Hours worked:** 3
**What I did:** Fixed remaining TypeScript errors. Polished UI — spacing, colours, mobile layout. Tested full flow end to end locally. Prepared for GitHub push and Vercel deployment.
**What I learned:** TypeScript strict mode catches real bugs — the unused variable error in db.ts was pointing at genuinely dead code.
**Blockers:** EmailCapture modal conflicting with inline usage in Result page — refactored with inline prop.
**Plan for tomorrow:** Push to GitHub, deploy, submit.

## Day 7 — 2026-05-27

**Hours worked:** 3
**What I did:** Pushed all local work to GitHub. Note: I worked locally each day but pushed only today — I was committing locally but not pushing to remote, not knowing daily pushes were required. Deployed to Vercel, added environment variables, verified CI green, took screenshots, finalised all docs, submitted.
**What I learned:** Always push to GitHub after every session. Local commits and remote pushes are not the same thing.
**Blockers:** Git history shows single day due to local-only workflow. Documented honestly.
**Plan for tomorrow:** Wait for Round 2 results.
