const { test, expect, describe, runTests } = require('./test-runner');
const Calculator = require('../src/calculator');

describe('String Calculator');

test('add("") returns 0', () => {
  const c = new Calculator();
  expect(c.add('')).toBe(0);
});

test('add("1") returns 1', () => {
  const c = new Calculator();
  expect(c.add('1')).toBe(1);
});

test('add("1,2") returns 3', () => {
  const c = new Calculator();
  expect(c.add('1,2')).toBe(3);
});

test('add("5") returns 5', () => {
  const c = new Calculator();
  expect(c.add('5')).toBe(5);
});

test('add("10,20") returns 30', () => {
  const c = new Calculator();
  expect(c.add('10,20')).toBe(30);
});

runTests();
