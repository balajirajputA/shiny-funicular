import assert from 'node:assert/strict';
import { planObjective, redact, selectProvider, summarizeDashboard, validatePlatform } from '../src/core.js';
import { providers, tasks, tools, workflows } from '../src/platform-data.js';

const validation = validatePlatform();
assert.equal(validation.ok, true, validation.errors.join('\n'));
assert(providers.some((provider) => provider.tier === 'PRIMARY'), 'missing primary provider');
assert(providers.some((provider) => provider.tier === 'SECONDARY'), 'missing secondary provider');
assert(providers.some((provider) => provider.tier === 'DEGRADED'), 'missing degraded mode');

for (const tool of tools) {
  assert(tool.name, 'tool name missing');
  assert(tool.inputSchema.includes('{'));
  assert(tool.outputSchema.includes('{'));
  assert(tool.timeoutMs >= 1000);
  assert(tool.retryPolicy.length > 10);
  assert(['low', 'medium', 'high'].includes(tool.risk));
}

const states = ['QUEUED', 'PLANNING', 'RUNNING', 'WAITING', 'RETRYING', 'BLOCKED', 'COMPLETED', 'FAILED', 'CANCELLED'];
assert(tasks.every((task) => states.includes(task.status)), 'invalid task state');

assert.equal(selectProvider({ text: true })?.tier, 'DEGRADED', 'should select local degraded mode without credentials');
assert.equal(selectProvider({ audio: true }), null, 'degraded mode must not claim audio support');
assert.equal(redact('Bearer abc.def_ghi and ghp_secretTokenValue').includes('secretTokenValue'), false, 'redaction failed');
assert.equal(redact('sk-test_key and AIza12345').includes('sk-test_key'), false, 'API key redaction failed');

const researchPlan = planObjective('research GitHub MCP docs');
assert(researchPlan.tools.includes('web.search'), 'planner should select research tool');
assert(researchPlan.tools.includes('github.repo'), 'planner should select GitHub tool');
assert(researchPlan.tools.includes('mcp.registry'), 'planner should select MCP tool');
assert.equal(planObjective('').status, 'WAITING', 'empty objectives should wait');
assert.equal(planObjective('').goal, 'Clarify objective');

const summary = summarizeDashboard();
assert.equal(summary.workflows, workflows.length, 'dashboard workflow count mismatch');
assert.equal(summary.providerCount, providers.length, 'dashboard provider count mismatch');
assert(summary.activeTasks >= 0, 'active task count must be non-negative');

console.log('All platform tests passed.');
