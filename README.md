# String Calculator

> A TDD implementation of Roy Osherove's famous String Calculator Kata.
> Requirements revealed progressively — see [CHANGELOG](CHANGELOG.md) for the journey.

## Status
✅ Completed (all tests passing)
🎯 Built with a strict, step-by-step TDD workflow

## Features / Rules Implemented

- Empty string: `""` → `0`
- Comma and newline separators
  - `"1,2"` → `3`
  - `"1\n2,3"` → `6`
- Custom delimiter header
  - `"//;\n1;2;3"` → `6`
- Multi-character delimiters
  - `"//[***]\n1***2***3"` → `6`
- Multiple delimiters
  - `"//[*][%]\n1*2%3"` → `6`
- Negative numbers:
  - Throw an error listing **all** negatives found
  - Example: `"1,-2,3,-4"` throws `negatives not allowed: -2, -4`
- Numbers > 1000 are ignored
  - `"2,1001"` → `2`
  - `"2,1000"` → `1002` (boundary included)

## Usage (Library)

```js
const Calculator = require('./src/calculator');
const c = new Calculator();

c.add("1,2,3"); // 6
c.add("//;\n1;2;3"); // 6


## Usage (CLI)

node bin/calc.js "1,2"          # 3
node bin/calc.js "1
2,3"                         # 6  (use a real newline)
node bin/calc.js "//;\n1;2;3"  # 6  (use a real newline)

Built with progressive TDD: each requirement was implemented only when tests demanded it.
Includes unit + CLI integration tests to verify behavior end-to-end.

