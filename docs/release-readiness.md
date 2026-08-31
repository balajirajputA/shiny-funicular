# Release readiness

## Verified

- Dependency-free frontend builds without external packages.
- Static verification covers provider tiers, capability matching, secret redaction, task states, planner routing, and dashboard metrics.
- GitHub Actions CI runs install, lint, test, and build checks.
- Dev server rejects non-GET/HEAD methods and keeps file reads inside the project root.
- External credentials are not stored in the client.

## Requires external configuration

- Secure backend for provider API calls and OAuth/token exchange.
- Persistent database for users, sessions, memories, tasks, workflow runs, and audit events.
- Production scheduler/webhook endpoint.
- Deployment target, domain, TLS, monitoring, backups, and alerting.
- Mobile application package/signing credentials for Google Play release.

## Release gate

Do not describe provider inference, OAuth connectors, persistent memory, or scheduler execution as production-active until the corresponding backend services are deployed and integration tests pass against real credentials in a controlled environment.
