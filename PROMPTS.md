# Prompts

## AI Summary Prompt

### System prompt

"You write concise, honest, financial-advisor-style summaries of AI tool spend audits. Be specific with numbers. 80-100 words max. No fluff."

### User prompt

"Summarise this AI spend audit: Total monthly spend: $[X]. Potential monthly savings: $[Y]. Tools: [list]. Top recommendation: [text]. Write 80-100 words a finance manager would appreciate."

### Why I wrote it this way

I wanted the tone to be honest and financial, not salesy. "Financial-advisor-style" in the system prompt consistently produces summaries that mention specific dollar amounts and give a clear verdict. Without it, the model writes generic marketing copy.

### What I tried that didn't work

First attempt had no system prompt — the model wrote overly enthusiastic summaries ("Amazing savings opportunity!") that felt untrustworthy. Second attempt said "be brief" which the model ignored. Specifying "80-100 words max" as a hard number worked better than qualitative instructions.

### Fallback behaviour

If the Groq API call fails for any reason (network error, rate limit, invalid key), the app falls back to a templated string built from the audit data. The user never sees an error — they see a slightly less personalised but still accurate summary.
