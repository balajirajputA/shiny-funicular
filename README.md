# Atlas Assistant

Atlas Assistant is a production-oriented AI assistant application foundation. It presents a simple chat-first interface while modeling the deeper systems required for agents, provider fallback, tool execution, MCP/connectors, memory, RAG, research, automation, usage monitoring, security, and privacy.

## Current status

This repository contains a verified web application foundation, research notes, legal/privacy drafts, CI, tests, and release-preparation documentation. External AI providers, OAuth connectors, mobile packaging, Play Console publishing, and hosted deployment require credentials or services that are not present in this environment.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm test
npm run build
```

## Architecture highlights

- Provider-independent AI model registry with primary, secondary, fallback, and degraded modes.
- Standard tool registry with input/output schemas, risk classification, permissions, timeouts, retries, and audit posture.
- Agent task model using queued/planning/running/waiting/retrying/blocked/completed/failed/cancelled states.
- User-visible controls for connectors, memory export/delete, research citations, document RAG, and automation.
- No client-side API keys; provider and OAuth secrets are expected to live behind a secure backend.
