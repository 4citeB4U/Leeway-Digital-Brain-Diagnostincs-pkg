/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DIGITAL_BRAIN.EVIDENCE.CI
TAG: LEEWAY.DIGITAL_BRAIN.SOURCE_EVIDENCE_CAPTURE.V1
WHO: LeeWay Digital Brain package maintainers and authorized CI runner.
WHAT: Execute source tests and local read-only diagnostics, capturing sanitized repeatable outcomes.
WHEN: Each GitHub Actions source-qualification run.
WHERE: scripts/capture-source-evidence.mjs.
WHY: Prevent orphaned passing tests and preserve failing outcomes without exposing device facts.
HOW: Exact child process, SHA-256 of output streams, node:test summary, GitHub-run metadata, bounded JSON evidence.
LICENSE: MIT (package-level, not an independent evidence-signing authority).
AUTHORITY: CI source evidence candidate only; NOT Veritas, Receipt Authority or Learning Ledger.
*/
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {collectDiagnostics} from '../packages/diagnostics/src/collect.mjs';

const hex=x=>createHash('sha256').update(x).digest('hex');
export function summarizeTap(output) {
  const count=key=>{
    const matches=[...output.matchAll(new RegExp('^# '+key+' (\\d+)\\s*$','gm'))];
    return matches.length?Number(matches.at(-1)[1]):null;
  };
  const cases=[...output.matchAll(/^(not ok|ok)\s+\d+\s+-\s+(.+)$/gm)]
    .map(x=>({state:x[1]==='ok'?'PASS':'FAIL',name:x[2].slice(0,200)})).slice(0,1000);
  return {total:count('tests'),passed:count('pass'),failed:count('fail'),
    cancelled:count('cancelled'),skipped:count('skipped'),cases};
}
async function runTests() {
  const stdoutHash=createHash('sha256'),stderrHash=createHash('sha256');
  let stdoutBytes=0,stderrBytes=0,tail='',exitCode=null,spawnError=null;
  const child=spawn(process.execPath,['--test'],{stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',data=>{
    stdoutHash.update(data);stdoutBytes+=data.length;
    process.stdout.write(data);
    tail=(tail+data.toString('utf8')).slice(-131072);
  });
  child.stderr.on('data',data=>{
    stderrHash.update(data);stderrBytes+=data.length;
    process.stderr.write(data);
  });
  await new Promise(done=>{
    child.on('error',e=>{spawnError=e.code||'PROCESS_SPAWN_FAILED';});
    child.on('close',code=>{exitCode=code;done();});
  });
  const tap=summarizeTap(tail);
  return {command:'node --test',exitCode,spawnError,stdoutSha256:stdoutHash.digest('hex'),
    stderrSha256:stderrHash.digest('hex'),stdoutBytes,stderrBytes,tap,
    result:exitCode===0&&!spawnError&&tap.total>0&&tap.passed===tap.total&&tap.failed===0?
      'SOURCE_TEST_PASS':'SOURCE_TEST_FAIL'};
}
function diagnosticsSmoke() {
  try {
    const observed=collectDiagnostics();
    const ok=observed?.schema==='leeway.diagnostics.v0'&&
      observed?.source==='node:os'&&observed?.permissions?.userFiles==='NOT_REQUESTED'&&
      observed?.permissions?.systemFiles==='DENIED_BY_DEFAULT'&&
      Number.isInteger(observed?.facts?.logicalCpuCount)&&observed.facts.logicalCpuCount>=0&&
      typeof observed?.facts?.platform==='string';
    return {command:'in-process collectDiagnostics() contract smoke',result:ok?'SOURCE_DIAGNOSTICS_PASS':'SOURCE_DIAGNOSTICS_FAIL',
      privateHostFactsIncluded:false};
  } catch {
    return {command:'in-process collectDiagnostics() contract smoke',result:'SOURCE_DIAGNOSTICS_FAIL',
      privateHostFactsIncluded:false};
  }
}
export async function captureSourceEvidence() {
  const tests=await runTests(),diagnostics=diagnosticsSmoke();
  const result=tests.result==='SOURCE_TEST_PASS'&&diagnostics.result==='SOURCE_DIAGNOSTICS_PASS'?
    'SOURCE_QUALIFICATION_PASS':'SOURCE_QUALIFICATION_FAIL';
  const context={
    repository:process.env.GITHUB_REPOSITORY||null,
    commit:process.env.GITHUB_SHA||null,
    runId:process.env.GITHUB_RUN_ID||null,
    runAttempt:process.env.GITHUB_RUN_ATTEMPT||null,
    workflow:process.env.GITHUB_WORKFLOW||null,
    event:process.env.GITHUB_EVENT_NAME||null,
    runnerOs:process.env.RUNNER_OS||process.platform,
    runnerArch:process.env.RUNNER_ARCH||process.arch,
    nodeVersion:process.version,
    runUrl:process.env.GITHUB_RUN_ID&&process.env.GITHUB_REPOSITORY?
      'https://github.com/'+process.env.GITHUB_REPOSITORY+'/actions/runs/'+process.env.GITHUB_RUN_ID:null
  };
  const evidence={schema:'leeway.source-qualification-evidence.v1',
    generatedAt:new Date().toISOString(),context,result,tests,diagnostics,
    authority:'GITHUB_RUNNER_SOURCE_TEST_ONLY',productionQualified:false,
    independentVeritas:'NOT_EVALUATED',receiptAuthority:'NOT_ADMITTED',learningLedger:'NOT_UPDATED',
    privacy:{hostNameIncluded:false,userFilesRead:false,rawOsFactsIncluded:false,fullProcessOutputIncluded:false},
    handoff:{sourceArtifact:'GitHub Actions run artifact, uploaded in next workflow step',
      retention:'90 days requested; subject to GitHub retention settings',
      canonicalReceiptSubmission:'REQUIRES_SEPARATE_AUTHORIZED_VERITAS_AND_RECEIPT_ADAPTER'}};
  const bytes=JSON.stringify(evidence,null,2)+'\n';
  const directory=resolve('.local-evidence');
  await mkdir(directory,{recursive:true,mode:0o700});
  await writeFile(resolve(directory,'source-evidence.json'),bytes,{mode:0o600});
  await writeFile(resolve(directory,'source-evidence.sha256'),hex(bytes)+'  source-evidence.json\n',{mode:0o600});
  if(process.env.GITHUB_STEP_SUMMARY) {
    const {appendFile}=await import('node:fs/promises');
    await appendFile(process.env.GITHUB_STEP_SUMMARY,
      '## LeeWay source evidence: '+result+'\n\nCommit: '+(context.commit||'UNBOUND')+
      '\n\nTests: '+tests.tap.passed+'/'+tests.tap.total+
      ' passed, '+tests.tap.failed+' failed. Diagnostics: '+diagnostics.result+
      '. Receipt: NOT_ADMITTED. Veritas: NOT_EVALUATED.\n');
  }
  return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  captureSourceEvidence().then(result=>{
    if(result!=='SOURCE_QUALIFICATION_PASS')process.exitCode=1;
  }).catch(error=>{console.error('SOURCE_EVIDENCE_CAPTURE_FAILED',error.code||error.message);process.exitCode=1;});
}
