class Calculator {
  add(input) {
    if (input === '') return 0;
    const { delimiter, numbersText } = this.parseInput(input);
    return this.sumNumbers(numbersText, delimiter); 
}

parseInput(input) {
    if (input.startsWith('//')) {
      const newlineIndex = input.indexOf('\n');
      const customDelimiter = input.substring(2, newlineIndex);
      return {
        delimiter: new RegExp(this.escapeRegex(customDelimiter)),
        numbersText: input.substring(newlineIndex + 1)
      };
    }
    return { delimiter: /[,\n]/, numbersText: input };
  }

  sumNumbers(text, delimiter) {
    return text.split(delimiter)
      .map(n => {
        const parsed = parseInt(n);
        return isNaN(parsed) ? 0 : parsed;
      })
      .reduce((sum, n) => sum + n, 0);
  }
  
  escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
}

module.exports = Calculator;
