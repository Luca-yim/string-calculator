const { test, expect, describe, runTests } = require('./test-runner');
const { spawnSync } = require('child_process');
const path = require('path');

describe('CLI');

const CLI = path.join(__dirname, '..', 'bin', 'calc.js');

function run(input) {
  const res = spawnSync('node', [CLI, input], { encoding: 'utf8' });

  if (res.status === 0) {
    return { stdout: (res.stdout || '').trim(), code: 0 };
  }
  return {
    stdout: (res.stdout || '').trim(),
    stderr: (res.stderr || '').trim(),
    code: res.status ?? 1
  };
}

test('CLI: "1,2" -> 3', () => {
  const r = run('1,2');
  expect(r.stdout).toBe('3');
});

test('CLI: custom delimiter //;\\n1;2;3 -> 6', () => {
  const r = run(`//;\n1;2;3`); // <-- real newline
  expect(r.stdout).toBe('6');
});

test('CLI: newline delimiter "1\\n2,3" -> 6', () => {
  const r = run(`1\n2,3`); // <-- real newline
  expect(r.stdout).toBe('6');
});

runTests();
