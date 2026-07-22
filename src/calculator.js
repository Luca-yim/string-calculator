class Calculator {
  add(input) {
    if (input === '') return 0;
    const numbers = input.split(/[,\n]/).map(n => {
    const parsed = parseInt(n);
    return isNaN(parsed) ? 0 : parsed;
  });
    return numbers.reduce((sum, n) => sum + n, 0);
  }
}

module.exports = Calculator;
