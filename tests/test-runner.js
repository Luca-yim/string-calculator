const tests = [];
let suiteName = 'Tests';

function describe(name) { suiteName = name; }

function test(name, fn) { tests.push({ name, fn }); }

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
      }
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(`Expected ${e}, but got ${a}`);
    },
    toThrow(expectedMessage) {
      let threw = false;
      let actualMessage = '';
      try { actual(); } catch (e) { threw = true; actualMessage = e.message; }
      if (!threw) throw new Error('Expected function to throw');
      if (expectedMessage && !actualMessage.includes(expectedMessage)) {
    throw new Error(`Expected error message to include "${expectedMessage}", got "${actualMessage}"`);
  }
    }
  };
}

function runTests() {
  console.log(`\n🧪 ${suiteName}\n`);
  let passed = 0, failed = 0;
  for (const { name, fn } of tests) {
    try {
      fn();
      console.log(`  ✅ ${name}`);
      passed++;
    } catch (err) {
      console.log(`  ❌ ${name}`);
      console.log(`     ${err.message}`);
      failed++;
    }
  }
  console.log(`\n  ${passed}/${passed+failed} passed${failed ? `, ${failed} failed` : ''}\n`);
  process.exit(failed ? 1 : 0);
}

module.exports = { test, expect, describe, runTests };
