# Reflection

## 1. Hardest bug this week

The hardest bug was the white screen after integrating Groq. My first hypothesis was a rendering error in Result page. I opened DevTools Console and saw "Identifier 'data' has already been declared." I had pasted the Groq response parsing code but left the old Anthropic-format lines below it — so `data` and `reply` were declared twice with `const` in the same scope. Fix was selecting the entire send function, deleting it, and pasting a clean version. Lesson: replace entire function blocks rather than inserting lines into existing code.

## 2. A decision I reversed mid-week

I initially planned to use Supabase for the database — I had an existing account. I reversed this when I discovered the free tier had hit its limit mid-week. Switched to Neon, which has a more generous free tier. This turned out to be a better architectural decision anyway — Neon's serverless Postgres is lighter weight for occasional inserts rather than continuous queries. The switch took about an hour.

## 3. What I'd build in week 2

A proper backend API route (Vercel serverless function) so Neon saves actually work from the browser — CORS blocks direct browser-to-database calls currently. Then benchmark mode: "your AI spend per developer is $X, companies your size average $Y." Also a transactional email via Resend when a lead is captured, and the embeddable widget version for bloggers to drop into posts about AI tools.

## 4. How I used AI tools

I used Claude heavily for generating component boilerplate and debugging TypeScript errors. I used Groq via the SpendLens app itself to test the AI summary feature. I did not trust AI for the audit engine logic — those rules need to be defensible and traceable to real pricing pages, so I wrote and verified them manually. One specific time AI was wrong: Claude generated an Anthropic API fetch with the old response format (`data.content[0].text`) when I had switched to Groq's format (`data.choices[0].message.content`). I caught it because the chat returned "Sorry, couldn't respond" and I read the console error carefully.

Process note: I worked locally all week and pushed to GitHub only on the final day. I was committing locally but didn't know daily remote pushes were required. Won't repeat this.

## 5. Self-ratings

- **Discipline: 6/10** — Worked daily but didn't push to GitHub each day, which cost me on the git history requirement.
- **Code quality: 7/10** — Components are clean and typed. Would add proper error boundaries and a backend API route given more time.
- **Design sense: 7/10** — UI is clean, professional, and functional. Not groundbreaking but honest and usable.
- **Problem-solving: 8/10** — Debugged issues methodically by reading console errors rather than guessing. Fixed TypeScript, CI, routing, and CORS issues systematically.
- **Entrepreneurial thinking: 7/10** — Talked to 3 real users, designed for the zero-savings case, placed Credex CTA only where genuinely relevant, wrote specific GTM and economics with real numbers.
