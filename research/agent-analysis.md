# Agent analysis

Agents are roles over a shared orchestrator: Planner, Research, Coding, GitHub, Automation, Document, Media, QA, and DevOps. Every task persists ID, timestamps, goal, plan, tool calls, results, errors, retry count, and status.

Task states: QUEUED, PLANNING, RUNNING, WAITING, RETRYING, BLOCKED, COMPLETED, FAILED, CANCELLED.

Reliability requirements: bounded retries, idempotency for safe reads, explicit approvals for high-risk writes, validation after tool execution, and audit records with secret redaction.
