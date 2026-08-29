# Free API and provider analysis

| Provider | Purpose | Free tier | Auth | Fallback | Cost risk |
| --- | --- | --- | --- | --- | --- |
| OpenAI API | Text, tools, vision, audio, image hooks | Account-dependent; verify in dashboard | Server-side API key | Gemini or degraded mode | Paid usage beyond grants/limits |
| Gemini API | Text, multimodal, embeddings, realtime preview | Free-tier availability can vary by region/account | Server-side API key or ADC | OpenAI or degraded mode | Quotas can change |
| GitHub API | Repos, issues, PRs, CI | Free with rate limits | OAuth/fine-grained token | Read-only degraded UI | Rate limits/private repo scopes |
| MCP servers | External tools/data | Server-specific | Server-specific OAuth/tokens | Disable connector | Unknown server risk |
| Local degraded mode | Guidance and UI workflow | No network cost | None | None | No model inference |
