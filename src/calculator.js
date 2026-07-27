class Calculator {
  add(input) {
     if (input === '') return 0;
     const { delimiter, numbersText } = this.parseInput(input);
     const numbers = this.parseNumbers(numbersText, delimiter);
     this.rejectNegatives(numbers);
     return this.sum(this.filterLarge(numbers));
  }
  
  filterLarge(numbers) {
  return numbers.filter(n => n <= 1000);
}

  rejectNegatives(numbers) {
  const negatives = numbers.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
  }
}

  parseNumbers(text, delimiter) {
  return text.split(delimiter).map(n => {
    const parsed = parseInt(n);
    return isNaN(parsed) ? 0 : parsed;
  });
}

sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

parseInput(input) {
  if (!input.startsWith('//')) {
    return { delimiter: /[,\n]/, numbersText: input };
  }
  const newlineIndex = input.indexOf('\n');
  const header = input.substring(2, newlineIndex);
  const numbersText = input.substring(newlineIndex + 1);
  const delimiter = this.buildDelimiterRegex(header);
  return { delimiter, numbersText };
}

buildDelimiterRegex(header) {
  let delimiters;
  if (header.startsWith('[')) {
    const matches = header.match(/\[([^\]]+)\]/g);
    delimiters = matches.map(m => m.substring(1, m.length - 1));
  } else {
    delimiters = [header];
  }
  const escaped = delimiters.map(d => this.escapeRegex(d));
  return new RegExp(escaped.join('|'));
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
