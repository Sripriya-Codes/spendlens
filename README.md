# SpendLens - Free AI Spend Audit Tool

SpendLens helps startup founders and engineering managers find out if they're overpaying for AI tools like Cursor, Claude, ChatGPT, and GitHub Copilot. Input your subscriptions, get an instant audit with savings recommendations and an AI-generated summary. No login required.

**Live URL:** https://spendlens.vercel.app

## Screenshots

[Add 3 screenshots here after deployment]

## Quick Start

```bash
git clone https://github.com/YOURUSERNAME/spendlens
cd spendlens
npm install
cp .env.example .env.local  # add your VITE_GROQ_KEY
npm run dev
```

## Decisions

1. **Vite + React over Next.js** — No SSR needed for an SPA audit tool. Vite is faster to develop with and deploys easily to Vercel.
2. **Groq over Anthropic API** — Groq's free tier is generous enough for a demo; same LLM quality for short summaries.
3. **SessionStorage for audit state** — Avoids backend round-trips for the happy path. DB write is fire-and-forget.
4. **Hardcoded audit rules over AI** — The assignment explicitly notes this. Rule-based logic is auditable and defensible to a finance person.
5. **Email captured after value shown** — Never before. Users trust the tool first, then share their email. Conversion is higher this way.
