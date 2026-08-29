import assert from 'node:assert/strict';
import { planObjective, redact, selectProvider, summarizeDashboard, validatePlatform } from '../src/core.js';
import { providers, tasks, tools, workflows } from '../src/platform-data.js';

const validation=validatePlatform();
assert.equal(validation.ok,true,validation.errors.join('\n'));
assert(providers.some(p=>p.tier==='PRIMARY'),'missing primary provider');
assert(providers.some(p=>p.tier==='SECONDARY'),'missing secondary provider');
assert(providers.some(p=>p.tier==='DEGRADED'),'missing degraded mode');
for (const tool of tools){
  assert(tool.inputSchema.includes('{'));
  assert(tool.outputSchema.includes('{'));
  assert(tool.timeoutMs>0);
  assert(tool.retryPolicy.length>10);
  assert(['low','medium','high'].includes(tool.risk));
}
const states=['QUEUED','PLANNING','RUNNING','WAITING','RETRYING','BLOCKED','COMPLETED','FAILED','CANCELLED'];
assert(tasks.every(t=>states.includes(t.status)),'invalid task state');
assert.equal(selectProvider({text:true}).tier,'DEGRADED','should select local degraded mode without credentials');
assert.equal(redact('Bearer abc.def_ghi and ghp_secretTokenValue').includes('secretTokenValue'),false,'redaction failed');
assert(planObjective('research GitHub MCP docs').tools.includes('web.search'),'planner should select research tool');
assert(planObjective('research GitHub MCP docs').tools.includes('github.repo'),'planner should select GitHub tool');
assert.equal(summarizeDashboard().workflows,workflows.length,'dashboard workflow count mismatch');
console.log('All platform tests passed.');
