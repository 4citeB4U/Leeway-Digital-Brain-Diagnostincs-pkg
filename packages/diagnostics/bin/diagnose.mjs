#!/usr/bin/env node
/* REGION: LEEWAY.DIAGNOSTICS.CLI; TAG: READ_ONLY_ENTRY.V0
WHO: Local user. WHAT: Print local device facts. WHEN: Explicit invocation.
WHERE: Host terminal. WHY: Inspect before Brain permissions.
HOW: Pure collector, stdout JSON. LICENSE: MIT */
import {collectDiagnostics} from '../src/collect.mjs';
console.log(JSON.stringify(collectDiagnostics(),null,2));
