import { providers, tools, tasks, memories, workflows, researchItems, documents } from './platform-data.js';

const allowedStates=new Set(['QUEUED','PLANNING','RUNNING','WAITING','RETRYING','BLOCKED','COMPLETED','FAILED','CANCELLED']);
const redactionPatterns=[/sk-[A-Za-z0-9_-]+/g,/gh[pousr]_[A-Za-z0-9_]+/g,/AIza[0-9A-Za-z_-]+/g,/Bearer\s+[A-Za-z0-9._-]+/g];

export function redact(value){
  return String(value).replaceAll(redactionPatterns[0],'[REDACTED_OPENAI_KEY]').replaceAll(redactionPatterns[1],'[REDACTED_GITHUB_TOKEN]').replaceAll(redactionPatterns[2],'[REDACTED_GOOGLE_KEY]').replaceAll(redactionPatterns[3],'Bearer [REDACTED_TOKEN]');
}

export function validatePlatform(){
  const errors=[];
  for(const tier of ['PRIMARY','SECONDARY','DEGRADED']) if(!providers.some(p=>p.tier===tier)) errors.push(`missing provider tier: ${tier}`);
  for(const tool of tools){
    if(!tool.name||!tool.description) errors.push(`tool missing identity: ${tool.name}`);
    if(!['low','medium','high'].includes(tool.risk)) errors.push(`invalid risk for ${tool.name}`);
    if(!tool.inputSchema.includes('{')||!tool.outputSchema.includes('{')) errors.push(`schemas missing for ${tool.name}`);
    if(tool.timeoutMs<1000) errors.push(`timeout too low for ${tool.name}`);
  }
  for(const task of tasks) if(!allowedStates.has(task.status)) errors.push(`invalid task state: ${task.id}`);
  return {ok:errors.length===0,errors};
}

export function selectProvider(required={text:true}){
  const priority={PRIMARY:0,SECONDARY:1,FALLBACK:2,DEGRADED:3};
  return [...providers]
    .filter(provider=>Object.entries(required).every(([capability,needed])=>!needed||provider.capabilities[capability]))
    .sort((a,b)=>priority[a.tier]-priority[b.tier])
    .find(provider=>provider.status==='connected') || providers.find(provider=>provider.tier==='DEGRADED');
}

export function planObjective(goal){
  const clean=redact(goal).trim();
  const now=new Date().toISOString();
  return {
    id:`task-${Math.abs(hash(clean)).toString().slice(0,6)}`,
    agent:clean.toLowerCase().includes('code')?'Coding Agent':clean.toLowerCase().includes('research')?'Research Agent':'Planner Agent',
    goal:clean||'Clarify objective',
    status:clean?'PLANNING':'WAITING',
    currentStep:clean?'Decompose goal, classify tool risk, then request only required permissions.':'Waiting for a concrete objective.',
    retries:0,
    tools:recommendTools(clean),
    updatedAt:now,
    plan:['Understand intent','Select least-privilege tools','Execute bounded steps','Validate result','Write memory and audit record']
  };
}

export function recommendTools(goal){
  const lower=goal.toLowerCase();
  const selected=[];
  if(lower.includes('research')||lower.includes('web')) selected.push('web.search');
  if(lower.includes('github')||lower.includes('repo')||lower.includes('code')) selected.push('github.repo');
  if(lower.includes('document')||lower.includes('pdf')) selected.push('document.rag');
  if(lower.includes('schedule')||lower.includes('automation')||lower.includes('daily')) selected.push('automation.schedule');
  if(lower.includes('mcp')||lower.includes('connector')) selected.push('mcp.registry');
  return selected.length?selected:['web.search'];
}

export function summarizeDashboard(){
  return {
    providerCount:providers.length,
    connectedProviders:providers.filter(p=>p.status==='connected').length,
    credentialRequired:providers.filter(p=>p.status==='needs_key').length,
    highRiskTools:tools.filter(t=>t.risk==='high').length,
    activeTasks:tasks.filter(t=>!['COMPLETED','FAILED','CANCELLED'].includes(t.status)).length,
    workflows:workflows.length,
    memories:memories.length,
    documents:documents.length,
    citations:researchItems.reduce((sum,item)=>sum+item.citations.length,0)
  };
}

function hash(text){let h=0;for(let i=0;i<text.length;i++) h=(Math.imul(31,h)+text.charCodeAt(i))|0;return h;}
