/* REGION: LEEWAY.DIAGNOSTICS.COLLECT; TAG: READ_ONLY_DEVICE_FACTS.V0
WHO: Authorized device owner. WHAT: Collect runtime-reported hardware facts.
WHEN: Explicit CLI invocation. WHERE: Local host. WHY: Begin with real, limited diagnostics.
HOW: node:os only; no filesystem scanning, commands, telemetry uploads or writes.
AUTHORITY: PACKAGE PROTOTYPE, NOT FULL HARDWARE CERTIFICATION. LICENSE: MIT */
import os from 'node:os';
export function collectDiagnostics(host=os) {
  const cpus=host.cpus();
  const facts={
    platform:host.platform(), architecture:host.arch(), release:host.release(),
    hostname:host.hostname(), cpuModel:cpus[0]?.model??null,
    logicalCpuCount:cpus.length, totalMemoryBytes:host.totalmem(),
    freeMemoryBytes:host.freemem(), uptimeSeconds:host.uptime()
  };
  return {
    schema:'leeway.diagnostics.v0',state:'OBSERVED',capturedAt:new Date().toISOString(),
    source:'node:os',facts,
    permissions:{deviceFacts:'GRANTED_BY_LOCAL_EXECUTION',userFiles:'NOT_REQUESTED',systemFiles:'DENIED_BY_DEFAULT'},
    limitations:['OS-reported facts only','No GPU, disk health, sensors or physical chassis certification','No filesystem enumeration','No cloud storage verification']
  };
}
