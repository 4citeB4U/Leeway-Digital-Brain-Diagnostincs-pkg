/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DIGITAL_BRAIN.EVIDENCE.TEST
TAG: LEEWAY.SOURCE_EVIDENCE_PARSER_REGRESSION.V1
WHO: LeeWay source CI maintainers.
WHAT: Test safe TAP summary parsing and failure classification.
WHEN: Each source CI run.
WHERE: scripts/capture-source-evidence.test.mjs.
WHY: Evidence capture must not incorrectly promote a failing run.
HOW: Deterministic fixtures without host facts.
LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeTap} from './capture-source-evidence.mjs';
test('parses source qualification TAP facts',()=>{
 const result=summarizeTap('ok 1 - a\nok 2 - b\n# tests 2\n# pass 2\n# fail 0\n# cancelled 0\n# skipped 0\n');
 assert.equal(result.total,2);assert.equal(result.passed,2);assert.equal(result.failed,0);
 assert.deepEqual(result.cases.map(x=>x.state),['PASS','PASS']);
});
test('preserves a failed case in candidate evidence',()=>{
 const result=summarizeTap('ok 1 - good\nnot ok 2 - bad\n# tests 2\n# pass 1\n# fail 1\n');
 assert.equal(result.failed,1);
 assert.deepEqual(result.cases.map(x=>x.state),['PASS','FAIL']);
});
test('missing test summary cannot imply passing counts',()=>{
 const result=summarizeTap('not a TAP summary');
 assert.equal(result.total,null);
 assert.equal(result.passed,null);
 assert.deepEqual(result.cases,[]);
});
