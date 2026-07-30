#!/usr/bin/env node

const Calculator = require('../src/calculator');

function showHelp() {
  console.log(`
🧮 String Calculator Kata

Usage:
  calc "<input>"

Examples:
  calc "1,2"                 # 3
  calc "1\n2,3"              # 6 (use quotes for newlines)
  calc "//;\n1;2;3"          # 6
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }

  const input = args[0];
  const c = new Calculator();

  try {
    const result = c.add(input);
    console.log(result);
  } catch (e) {
    console.error(`❌ Error: ${e.message}`);
    process.exit(1);
  }
}

main();
