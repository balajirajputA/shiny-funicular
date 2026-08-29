export const providers=[
  {name:'OpenAI Responses API',tier:'PRIMARY',status:'needs_key',quota:'Server-side secret required; quota verified in provider dashboard.',fallback:'Gemini API, then local degraded mode',capabilities:{text:true,vision:true,audio:true,embeddings:true,toolCalling:true,imageGeneration:true},latencyTargetMs:2500,costRisk:'paid usage after available credits'},
  {name:'Google Gemini API',tier:'SECONDARY',status:'needs_key',quota:'Free-tier eligibility is account and region dependent; verify in Google AI Studio.',fallback:'OpenAI API or local degraded mode',capabilities:{text:true,vision:true,audio:true,embeddings:true,toolCalling:true,imageGeneration:true},latencyTargetMs:3000,costRisk:'quota changes and paid overages'},
  {name:'Local degraded mode',tier:'DEGRADED',status:'connected',quota:'No external inference; deterministic planning and safety guidance only.',fallback:'None',capabilities:{text:true,vision:false,audio:false,embeddings:false,toolCalling:false,imageGeneration:false},latencyTargetMs:200,costRisk:'no model cost'}
];

export const tools=[
  {name:'web.search',description:'Research public web sources and return cited evidence.',permission:'User-visible web access',risk:'medium',timeoutMs:30000,retryPolicy:'2 retries with exponential backoff; redact query secrets',inputSchema:'{ query: string, recencyDays?: number }',outputSchema:'{ sources: Citation[], summary: string }'},
  {name:'github.repo',description:'Inspect repositories, issues, pull requests, commits, and CI status when authorized.',permission:'OAuth repo scope or fine-grained token',risk:'high',timeoutMs:45000,retryPolicy:'Retry idempotent reads only; never force-push',inputSchema:'{ owner: string, repo: string, action: string }',outputSchema:'{ status: string, url?: string, auditId: string }'},
  {name:'document.rag',description:'Parse, chunk, embed, retrieve, and cite uploaded documents.',permission:'Document read permission',risk:'medium',timeoutMs:60000,retryPolicy:'Retry parsing once; preserve source/page references',inputSchema:'{ documentId: string, query: string }',outputSchema:'{ answer: string, citations: Citation[] }'},
  {name:'automation.schedule',description:'Create or run scheduled workflows with logs, retries, pause, resume, and cancel.',permission:'Scheduler + notification permission',risk:'high',timeoutMs:120000,retryPolicy:'Bounded retries with jitter and audit log',inputSchema:'{ workflowId: string, trigger: string }',outputSchema:'{ runId: string, state: TaskState }'},
  {name:'mcp.registry',description:'Discover MCP servers, classify risk, list tools, and revoke connectors.',permission:'Explicit connector approval',risk:'high',timeoutMs:30000,retryPolicy:'Health-check only; unknown servers are untrusted',inputSchema:'{ serverUrl: string }',outputSchema:'{ tools: ToolDefinition[], risk: Risk, health: string }'},
  {name:'media.transcribe',description:'Speech recognition and audio summarization through authorized providers.',permission:'Microphone or uploaded audio permission',risk:'medium',timeoutMs:90000,retryPolicy:'Retry once; fall back to text-only mode',inputSchema:'{ audioId: string, language?: string }',outputSchema:'{ transcript: string, confidence: number }'},
  {name:'notifications.send',description:'Send user-approved workflow and task notifications.',permission:'Browser/mobile notification permission',risk:'low',timeoutMs:10000,retryPolicy:'No retry for dismissed notifications',inputSchema:'{ title: string, body: string }',outputSchema:'{ delivered: boolean }'}
];

export const tasks=[
  {id:'task-1024',agent:'Planner Agent',goal:'Draft cited launch plan for AI assistant',status:'COMPLETED',currentStep:'Saved to research workspace',retries:0,tools:['web.search','memory.write'],updatedAt:'2026-08-29T00:00:00Z',result:'Architecture and risk model established.'},
  {id:'task-1025',agent:'Document Agent',goal:'Index uploaded product brief',status:'WAITING',currentStep:'Awaiting user-authorized upload',retries:0,tools:['document.rag'],updatedAt:'2026-08-29T00:00:00Z'},
  {id:'task-1026',agent:'Automation Agent',goal:'Daily digest workflow',status:'QUEUED',currentStep:'Needs provider credentials before activation',retries:0,tools:['automation.schedule','notifications.send'],updatedAt:'2026-08-29T00:00:00Z'},
  {id:'task-1027',agent:'QA Agent',goal:'Run offline validation suite',status:'COMPLETED',currentStep:'Lint, tests, and static build pass locally',retries:1,tools:['files','test.runner'],updatedAt:'2026-08-29T00:00:00Z',result:'Dependency-free verification is green.'}
];

export const memories=[
  {id:'mem-1',type:'preference',title:'Privacy posture',summary:'Minimize data collection; expose export/delete controls.',createdAt:'2026-08-29'},
  {id:'mem-2',type:'task',title:'Provider fallback',summary:'Use primary, secondary, fallback, then degraded local mode with visible status.',createdAt:'2026-08-29'},
  {id:'mem-3',type:'semantic',title:'Citation policy',summary:'Separate source facts, model inference, and uncertainty in research answers.',createdAt:'2026-08-29'},
  {id:'mem-4',type:'conversation',title:'Autonomous build directive',summary:'Continue independent work, record blockers, and never claim unverified integrations.',createdAt:'2026-08-29'}
];

export const workflows=[
  {id:'wf-daily',name:'Daily research digest',trigger:'scheduled',status:'paused',lastRun:'never',nextRun:'requires scheduler backend',actions:['web.search','ai.summarize','notifications.send']},
  {id:'wf-pr',name:'Pull request health monitor',trigger:'webhook',status:'blocked',lastRun:'never',nextRun:'requires GitHub OAuth and webhook endpoint',actions:['github.repo','notifications.send']},
  {id:'wf-docs',name:'Document watch and cite',trigger:'manual',status:'ready',lastRun:'never',nextRun:'on user upload',actions:['document.rag','memory.write']}
];

export const researchItems=[
  {topic:'Google Play target API',classification:'VERIFIED',summary:'Standard Android apps submitted on or after August 31, 2026 must target Android 16/API 36 or higher.',citations:['Google Play target API requirements','Android Developers target SDK requirements']},
  {topic:'MCP connector safety',classification:'VERIFIED',summary:'MCP should be treated as an explicit connector boundary with discovery, permissions, and trust review.',citations:['Model Context Protocol specification','MCP official repository']},
  {topic:'Provider-independent AI',classification:'INFERRED',summary:'A normalized provider layer reduces lock-in and supports graceful degradation when quotas or credentials fail.',citations:['OpenAI API docs','Gemini API docs']}
];

export const documents=[
  {id:'doc-example',name:'Product requirements brief',status:'example',chunks:0,citations:'source/page/section required after upload'}
];
