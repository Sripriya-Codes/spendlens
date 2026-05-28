# Tests

## How to run

```bash
npx vitest run
```

## Test file: `tests/auditEngine.test.js`

| Test                                    | What it covers                                                    |
| --------------------------------------- | ----------------------------------------------------------------- |
| Returns zero savings for optimal setup  | Cursor Pro, 1 seat — should be flagged as optimal                 |
| Flags Claude Team for 2 users           | Core rule: Team plan min 5 seats, 2 users should downgrade to Pro |
| Flags Copilot Business for small team   | Business overkill for ≤3 devs, Individual recommended             |
| Calculates annual savings correctly     | totalAnnualSavings === totalSavings × 12                          |
| Handles multiple tools and sums savings | Two tools, both with savings — total is sum                       |
| savingsLevel categorised correctly      | high/medium/low based on thresholds                               |

All tests cover the audit engine specifically as required. They run in under 1 second.
