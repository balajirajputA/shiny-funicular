# Architecture

Atlas uses a frontend shell plus a planned secure backend. The frontend never stores provider keys. The backend owns OAuth, provider secrets, scheduling, webhooks, long-running agents, and audit logs.

## Core domains

1. AI provider layer: normalizes text, vision, audio, embeddings, tool calling, and image-generation hooks.
2. Agent orchestrator: USER → UNDERSTAND → INTENT → PLAN → TOOL SELECTION → EXECUTE → VALIDATE → RETRY → RESULT → MEMORY → AUDIT.
3. Tool engine: schemas, permissions, risk, timeout, retry policy, validation, redaction, and logs.
4. Memory/RAG: conversation, session, preferences, task memory, semantic memory, document chunks, retrieval, and citations.
5. Automation: triggers, actions, conditions, loops, waits, retries, execution history, pause/resume/cancel.
6. Connectors: GitHub, MCP, providers, API connectors, auth status, permissions, health checks, revoke.
