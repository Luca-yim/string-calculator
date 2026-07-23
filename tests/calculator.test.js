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

test('add("1,2,3") returns 6', () => {
  const c = new Calculator();
  expect(c.add('1,2,3')).toBe(6);
});

test('add("1,2,3,4,5") returns 15', () => {
  const c = new Calculator();
  expect(c.add('1,2,3,4,5')).toBe(15);
});

test('add of ten numbers returns their sum', () => {
  const c = new Calculator();
  expect(c.add('1,2,3,4,5,6,7,8,9,10')).toBe(55);
});

test('add("1\\n2,3") returns 6', () => {
  const c = new Calculator();
  expect(c.add('1\n2,3')).toBe(6);
});

test('add("1\\n2\\n3") returns 6', () => {
  const c = new Calculator();
  expect(c.add('1\n2\n3')).toBe(6);
});

test('add("1,\\n") returns 1 (trailing separator ignored)', () => {
  const c = new Calculator();
  expect(c.add('1,\n')).toBe(1);
});

test('add("0,1") returns 1 (zero handled correctly)', () => {
  const c = new Calculator();
  expect(c.add('0,1')).toBe(1);
});

test('add("//;\\n1;2") returns 3 (custom delimiter)', () => {
  const c = new Calculator();
  expect(c.add('//;\n1;2')).toBe(3);
});

test('add("//|\\n1|2|3") returns 6 (pipe delimiter)', () => {
  const c = new Calculator();
  expect(c.add('//|\n1|2|3')).toBe(6);
});

test('add("//x\\n5x3") returns 8 (letter delimiter)', () => {
  const c = new Calculator();
  expect(c.add('//x\n5x3')).toBe(8);
});

test('add("//.\\n1.2.3") returns 6 (period delimiter)', () => {
  const c = new Calculator();
  expect(c.add('//.\n1.2.3')).toBe(6);
});

test('add("-1") throws with negative number in message', () => {
  const c = new Calculator();
  expect(() => c.add('-1')).toThrow('negatives not allowed: -1');
});

test('add("-1,-3,-5") lists all negatives in error', () => {
  const c = new Calculator();
  expect(() => c.add('-1,-3,-5')).toThrow('negatives not allowed: -1, -3, -5');
});

test('add("1,-2,3,-4") reports all negatives despite positives', () => {
  const c = new Calculator();
  expect(() => c.add('1,-2,3,-4')).toThrow('negatives not allowed: -2, -4');
});

test('add("//;\\n-1;2;-3") lists negatives with custom delimiter', () => {
  const c = new Calculator();
  expect(() => c.add('//;\n-1;2;-3')).toThrow('negatives not allowed: -1, -3');
});

test('add("-0") returns 0 (negative zero accepted)', () => {
  const c = new Calculator();
  expect(c.add('-0')).toBe(0);
});

runTests();
