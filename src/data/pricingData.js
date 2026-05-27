// All prices verified from official pages — see PRICING_DATA.md
export const TOOLS = {
  cursor: {
    name: "Cursor",
    plans: {
      hobby: { name: "Hobby", pricePerSeat: 0, features: ["2000 completions/mo"] },
      pro: { name: "Pro", pricePerSeat: 20, features: ["Unlimited completions"] },
      business: { name: "Business", pricePerSeat: 40, features: ["Team features, SSO"] },
    },
  },
  github_copilot: {
    name: "GitHub Copilot",
    plans: {
      individual: { name: "Individual", pricePerSeat: 10 },
      business: { name: "Business", pricePerSeat: 19 },
      enterprise: { name: "Enterprise", pricePerSeat: 39 },
    },
  },
  claude: {
    name: "Claude (Anthropic)",
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      pro: { name: "Pro", pricePerSeat: 17 },
      max: { name: "Max (5x)", pricePerSeat: 100 },
      team: { name: "Team", pricePerSeat: 30, minSeats: 5 },
      api: { name: "API Direct", pricePerSeat: null, variable: true },
    },
  },
  chatgpt: {
    name: "ChatGPT (OpenAI)",
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      plus: { name: "Plus", pricePerSeat: 20 },
      team: { name: "Team", pricePerSeat: 30, minSeats: 2 },
      enterprise: { name: "Enterprise", pricePerSeat: null, variable: true },
      api: { name: "API Direct", pricePerSeat: null, variable: true },
    },
  },
  gemini: {
    name: "Gemini (Google)",
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      pro: { name: "Gemini Advanced", pricePerSeat: 20 },
      api: { name: "API Direct", pricePerSeat: null, variable: true },
    },
  },
  windsurf: {
    name: "Windsurf",
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      pro: { name: "Pro", pricePerSeat: 15 },
      team: { name: "Team", pricePerSeat: 35 },
    },
  },
};