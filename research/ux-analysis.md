# UX analysis

The app should open to a simple chat interface while making advanced operations transparent. Key UX decisions:

- Show provider/connectivity and task status without overwhelming the chat.
- Require explicit authorization for risky tools, GitHub, MCP, uploads, microphone, and notifications.
- Label degraded mode clearly when credentials or quotas are unavailable.
- Keep memory controls user-visible: view, delete, reset, export.
- Do not render fake destructive actions as if they are wired; current UI copy communicates required authorization or pending backend work.
