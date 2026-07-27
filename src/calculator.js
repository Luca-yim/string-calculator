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
    if (input.startsWith('//')) {
      const newlineIndex = input.indexOf('\n');
      const header = input.substring(2, newlineIndex);
      const numbersText = input.substring(newlineIndex + 1);

      // Check for bracketed multi-char delimiter: [delimiter]
    let customDelimiter;
    if (header.startsWith('[') && header.endsWith(']')) {
      customDelimiter = header.substring(1, header.length - 1);
    } else {
      customDelimiter = header;
    }

      return {
        delimiter: new RegExp(this.escapeRegex(customDelimiter)),
        numbersText: numbersText
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
