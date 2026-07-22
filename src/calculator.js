class Calculator {
  add(input) {
    if (input === '') return 0;
    const numbers = input.split(',').map(n => parseInt(n));
    return numbers.reduce((sum, n) => sum + n, 0);
  }
}

module.exports = Calculator;
