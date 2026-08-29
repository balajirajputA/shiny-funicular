# MCP analysis

MCP is treated as an untrusted connector class by default. The app should support discover, connect, authenticate, health check, permissions, risk classification, tool registry, audit log, disconnect, and revoke.

Security posture:

- Never trust unknown MCP servers automatically.
- Display what each server can access before enabling tools.
- Classify tools by risk and require approval for high-risk tool execution.
- Prefer official schema-compatible clients/servers and pin versions.
