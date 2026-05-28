# Reflection

## 1. Hardest bug this week

The hardest bug was the white screen after integrating the Groq API. My first hypothesis was a rendering error in the Result page. I opened DevTools Console and saw a syntax error — `Identifier 'data' has already been declared`. I had pasted the Groq response parsing code but left the old Anthropic-format lines below it, so `data` and `reply` were declared twice in the same scope. JavaScript's `const` doesn't allow redeclaration. The fix was selecting the entire `send` function, deleting it, and pasting a clean version. I learned to always replace entire function blocks rather than inserting lines into existing code — partial edits in the middle of a function are how duplicate declarations happen.

## 2. A decision I reversed mid-week

I initially planned to use Supabase for the database (I had an account already). I reversed this when I discovered my Supabase project had hit its free tier limits mid-week. I switched to Neon, which has a more generous free tier for this use case. This also turned out to be a better architectural decision — Neon's serverless Postgres is lighter weight for a tool that fires occasional inserts rather than running continuous queries.

## 3. What I'd build in week 2

A benchmark mode: "your AI spend per developer is $X — companies your size average $Y." This requires collecting aggregate anonymised data from audits, which week 1 didn't have. I'd also build the embeddable widget — a `<script>` tag version a blogger could drop into a post about AI tools, which would be a strong distribution channel. And a proper transactional email via Resend when a lead is captured.

## 4. How I used AI tools

I used Claude heavily for generating component boilerplate and debugging. I used Groq (via the SpendLens app itself, which is recursive) for testing the AI summary feature. I did not trust AI for the audit engine logic — the rules need to be defensible and traceable to real pricing pages, so I wrote and verified those by hand. One specific time the AI was wrong: Claude generated an Anthropic API fetch with the old response format (`data.content[0].text`) when I'd switched to Groq's format (`data.choices[0].message.content`). The AI didn't notice the API had changed. I caught it because the chat widget returned "Sorry, couldn't respond" and I read the console error carefully.

## 5. Self-ratings

- **Discipline: 7/10** — I started on time and committed daily, but day 4 was lighter than I'd planned.
- **Code quality: 6/10** — Components are clean and readable but I'd add proper error boundaries and loading states in a production version.
- **Design sense: 7/10** — The UI is clean and functional. Not visually groundbreaking but professional.
- **Problem-solving: 8/10** — Debugged issues methodically by reading console errors rather than guessing.
- **Entrepreneurial thinking: 7/10** — I talked to real users, designed for the zero-savings case, and placed the Credex CTA only where it's genuinely relevant.
