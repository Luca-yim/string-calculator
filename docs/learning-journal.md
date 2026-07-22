# Learning Journal — String Calculator

## Day 6 — [07/22/26]

### What I Did
- Set up new project in ~10 min (reused test-runner from Roman numerals)
- Implemented 4 progressive requirements: 
  - R1: 0-2 comma-separated numbers
  - R2: N numbers (already worked from good R1 design!)
  - R3: Newlines as alternate delimiter, trailing-delimiter graceful handling
  - R4: Custom delimiters via //header, with regex escaping

### Concepts Learned
- **Progressive requirements**: real work reveals requirements one at a time.
  Good early design (split/reduce) made R2 free.
- **Regex escaping**: user input that becomes part of a regex must be escaped
  to avoid special-character bugs. `escapeRegex()` is a reusable utility.
- **Compose Method pattern**: extract small named steps so the top-level
  method reads like a specification.
- **Explicit checks > falsy coercion**: `isNaN(parsed) ? 0 : parsed` is
  safer than `parseInt(n) || 0` because 0 is falsy.

### What Surprised Me
- The handling of regex escape.

### The Meta-Lesson
Sometimes a requirement is free (R2). Sometimes it's subtly hard (R4's
period-delimiter case). You never know until you try. TDD's baby-step
rhythm surfaces both cases with equal ease.

### Tomorrow's Focus
- Requirements 5-8 (error handling, filtering, more complex delimiters)
- Push to GitHub earlier this time (Day 1 next project!)
