# User Interviews

Conducted: May 23, 2026
Format: 1-on-1 voice call, 10–15 minutes each

---

## Interview 1 — R.P., Student / Early Professional

**Role:** Student transitioning to office work  
**Company stage:** Individual / freelance  
**Duration:** ~12 minutes

**What she uses:**

- ChatGPT (Free) — primary tool for email writing, document drafting, everyday office tasks
- Perplexity (Free) — occasional research and quick lookups

**Direct quotes:**

- "I just use ChatGPT for everything at work honestly — emails, summaries, fixing my writing."
- "Perplexity is better when I want to know something factual quickly, it gives sources."
- "I don't pay for anything. The free tiers do enough for what I need right now."

**Most surprising thing she said:**
She didn't know Perplexity and ChatGPT had overlapping use cases — she thought of them as completely different categories of tool. She'd never compared them deliberately.

**What it changed about my design:**
I added a "free tier" state to SpendLens — if a user is on all free plans, the audit should still be useful (telling them they're spending well, and what paid upgrade would actually be worth it if they grew). I almost skipped this edge case.

---

## Interview 2 — S.M., Student / Android-first user

**Role:** Student, heavy mobile AI user  
**Company stage:** Individual  
**Duration:** ~10 minutes

**What she uses:**

- Gemini (Free) — primary for everything: documents, PDFs, image generation, daily questions
- ChatGPT (Free) — occasionally for image generation when Gemini isn't enough

**Direct quotes:**

- "Gemini is just everywhere on my phone — I don't even open a separate app, it's built in."
- "I didn't realise ChatGPT could make images too, I only use it when Gemini's image isn't good enough."
- "I wouldn't pay for AI tools right now. I'm a student. But maybe later when I'm working."

**Most surprising thing she said:**
She uses Gemini not by deliberate choice but because it's ambient on Android — it's the default assistant. Her "preference" for Gemini is partly just friction reduction. This made me think about how platform lock-in drives AI tool adoption more than feature comparison.

**What it changed about my design:**
SpendLens shouldn't assume users chose their tools deliberately. The audit reasoning needs to acknowledge switching costs and ecosystem fit — not just price per feature.

---

## Interview 3 — A.K., Developer / Builder

**Role:** Developer, builds websites and small games  
**Company stage:** Individual / side projects  
**Duration:** ~13 minutes

**What she uses:**

- Claude Pro — $17/month (individual plan), primary for high-level website design, UI decisions, game development logic
- n8n (self-hosted or cloud free tier) — workflow automation, connecting APIs

**Direct quotes:**

- "Claude is the only thing I actually pay for. It's worth it for the quality of answers on complex stuff."
- "I tried ChatGPT but Claude just thinks better for design problems — it explains trade-offs."
- "n8n is free if you self-host. I'm not paying for workflow tools when I can run it myself."

**Most surprising thing she said:**
She tracks her Claude usage carefully and said she'd upgrade to a higher plan "only if I was doing this full time." She has a mental price ceiling of ~$20/month for AI tools as an individual — above that she expects team or business justification.

**What it changed about my design:**
I added a "solo builder" persona to the audit engine. For 1-person teams on Claude Pro, the audit should affirm the choice (it's genuinely good value) rather than trying to manufacture savings. Honest audits build more trust than fake ones.
