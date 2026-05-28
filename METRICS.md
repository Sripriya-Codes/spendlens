# Metrics

## North Star Metric

**Audits completed per week** — because every audit is a potential lead, a potential share, and a signal that the tool is delivering value. DAU is wrong for a tool people use once a quarter. Signups are a vanity metric. Completed audits mean someone trusted the tool enough to finish it.

## 3 input metrics

1. **Landing page → audit start rate** — are people who land on the page actually using it? Target: >60%. If below 40%, the headline or form is broken.
2. **Audit start → audit complete rate** — are people finishing the form? Target: >80%. Abandonment here means the form is too complex.
3. **Complete → email captured rate** — are people trusting us with their email after seeing results? Target: >25%. This is the lead quality signal.

## What to instrument first

1. Page load → form interaction (did they touch the form?)
2. Form submit → result page load (did the audit run?)
3. Email modal shown → email submitted vs skipped
4. Share button clicked (viral coefficient signal)

Using Plausible or a simple `navigator.sendBeacon` to a logging endpoint — no heavy analytics SDK needed at this stage.

## Pivot trigger

If audit complete → email captured rate drops below 10% for 2 consecutive weeks despite >500 audits, the value proposition isn't landing. Either the savings numbers are too low (wrong audience) or the email ask feels too aggressive. Pivot: test showing the email capture earlier, or remove it entirely and monetise differently.
