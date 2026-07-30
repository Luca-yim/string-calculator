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

### Deep Concept: Context Boundaries

When data crosses from one interpretation context to another (like
a string becoming part of a regex, SQL query, HTML, or shell command),
its meaning can change dangerously.

The classic pattern: user input treated as literal data in one place,
then as executable code in another.

Real-world examples of the same bug family:
- SQL injection
- XSS (cross-site scripting)
- Command injection
- Path traversal
- Regex denial-of-service

The universal fix: escape data for its destination context.
- Regex → escapeRegex()
- HTML → escapeHtml()
- SQL → parameterized queries
- Shell → argument arrays
- URL → encodeURIComponent()

The mental habit: whenever I see user input flowing into ANY parser
or interpreter (regex, SQL, HTML, exec, eval), an alarm goes off:
"Is this escaped for that context?"


### Tomorrow's Focus
- Requirements 5-8 (error handling, filtering, more complex delimiters)
- Push to GitHub earlier this time (Day 1 next project!)

## Day 7 — [7/23/26]

### What I Did
- Requirement 5: reject negatives with rich error listing all offenders
- Requirement 6: silently ignore numbers > 1000
- Documented rule interactions via test AND ADR
- Refactored add() into a clean pipeline of named helpers

### Key Concepts Learned
- **Rich error messages**: errors are UX. Including diagnostic data
  (which negatives were found) helps the user fix the problem.
- **Business rules ≠ algorithm**: filtering isn't computation, it's
  policy. Both deserve tests.
- **Validation ordering**: hard errors before soft filters, else you
  hide signals.
- **Pipeline pattern**: parse → validate → filter → transform. Reads
  like a specification.
- **-0 exists in JavaScript**: `-0 < 0` is false. Documented decision
  to accept as-is.

### What Surprised Me
- The insistence on not calculating large values.

### Refactoring Pattern Recognized
Every requirement so far has followed the same rhythm:
1. Add a failing test
2. Add code where it belongs in the pipeline
3. Extract a named helper when logic accumulates

The result: add() stays 5 lines regardless of how much behavior
it accumulates. Each behavior lives in its own method.

### Tomorrow's Focus
- Optional requirements 7-8 (multi-character delimiters, multiple delimiters)
- Then: retrospective + push to GitHub

## Day 8 — [7/27/2026]

### What I Did
- Requirement 7: multi-character delimiters via [brackets]
- Requirement 8: multiple delimiters via [a][b][c]
- Extracted buildDelimiterRegex helper for parser clarity
- Practiced YAGNI: created future-ideas.md instead of building speculatively

### Concepts Learned
- **Regex alternation**: `a|b|c` matches any of a, b, or c. Build this
  dynamically by joining escaped delimiters with '|'.
- **Regex capture groups**: `/\[([^\]]+)\]/g` extracts contents inside brackets.
  The `g` flag finds all matches, not just the first.
- **YAGNI**: "You Aren't Gonna Need It" — a discipline of not building
  what isn't required. Speculative features are almost always wrong.

### What Surprised Me
- The concept of sticking to required features so as to sharpen TDD

### The YAGNI Reflex
I noticed my urge to "handle every edge case" (empty delimiters,
overlapping, missing brackets, etc.). Recognizing this urge as a
FEELING to notice — not an instruction to follow — is a key mental
shift. Instead I logged them in future-ideas.md. If a real need
surfaces, they're documented. Until then, they don't touch the code.

### Meta-Reflection
Comparing today's parseInput to Day 4's version, it's grown but stayed
clean because of good extractions. The pipeline pattern from Day 7
holds up beautifully. Each new feature added roughly 5-10 lines and
one helper method. Complexity is being managed, not accumulated.

### Tomorrow's Focus
- CLI wrapper (like Day 5 of Roman project)
- Push to GitHub
- Week 2 retrospective

### Debugging Insight: Incremental Editing Bugs

When applying refactorings, I hit a bug from adding new code alongside
old code instead of replacing it. Two consequences:
1. Redeclared variable (crashed at runtime)
2. Dead code (sumNumbers) left in file

Lesson: after every code change, re-read the whole function and ask:
"Does every line still have a job to do?" Delete anything without an
answer.

Related habit: always read the error MESSAGE carefully before poking
at code. "Identifier 'X' has already been declared" is a precise
technical statement. Trust it.

### Master Insight: Restraint IS the Skill

TDD's power doesn't come from producing more — it comes from
refusing to produce more than the tests demand.

Three reasons this works:
1. Constraint focuses attention on what's actually needed
2. Code is a liability; fewer lines = less lifetime cost
3. Speculative features compound cost while producing zero value

This is the same principle that shows up across all mastery:
- Pascal: "shorter takes more skill than longer"
- Saint-Exupéry: "perfection is nothing left to take away"
- Miles Davis: "the notes you don't play matter"
- Jeff Atwood: "the best code is no code at all"

The reflex I'm building: for every line of code, can I point to
a test that would fail if I deleted it? If not, the line is
decorative, not load-bearing. Decorative code is where bugs live.

Today I felt the sharpening: the urge to "just add" empty-delimiter
handling was strong. Resisting it strengthened the discipline.
Every "no" makes the next "no" easier.

## Day 9 - [7/29/2026]

## Week 2 Retrospective — String Calculator (Days 6-9)

### What I Built
- String Calculator with progressively revealed requirements:
  - multiple separators (comma + newline)
  - custom delimiter header
  - multi-character delimiters using //[...]
  - multiple delimiters using //[...][...]
  - negatives throw with rich error listing all negatives
  - numbers > 1000 ignored
- A CLI wrapper (bin/calc.js)

### Testing Lessons
- The “requirements revealed progressively” format made the TDD rhythm more real.
- I learned to resist YAGNI: log ideas instead of expanding scope.
- Regex escaping mattered again—delimiters are user input that must be treated as data.

### What Surprised Me
- How delimiters work differently in CLI

### What I’d Improve Next Week
- [e.g., clearer separation of parsing vs. business rules]
- [e.g., reduce duplicated logic, if any]


## Day 10 — [7/30/26] — Week 2 Retrospective (String Calculator)

### What I Built
- Implemented Roy Osherove’s String Calculator kata using strict TDD.
- Supported progressively revealed requirements:
  - comma + newline separators
  - empty input behavior
  - custom delimiter header: `//;\n1;2;3`
  - multi-character delimiters: `//[***]\n1***2***3`
  - multiple delimiters: `//[*][%]\n1*2%3`
  - negatives throw: error message lists ALL negatives
  - numbers > 1000 are ignored (boundary: 1000 included, 1001 excluded)
- Added a CLI wrapper (`bin/calc.js`) and CLI integration tests.

### What I Learned (Big Concepts)
- TDD constraint improves code quality:
  - resisting speculative features (YAGNI)
  - each line of code is load-bearing (supported by tests)
- Parsing is fragile without tests:
  - delimiter parsing and regex escaping are easy to get wrong
- Errors are UX:
  - negative-number errors include diagnostic information
- Validation ordering matters:
  - negatives are “hard errors” and must run before filtering

### What Surprised Me
- The requirement to ignore numbers > 1000 felt arbitrary mathematically,
  but made sense as a domain/business rule. That reframed how I think about requirements.

### What I’d Improve Next Time
- (optional) reduce minor refactor churn by keeping parser helpers smaller earlier
- (optional) write a couple targeted parser edge-case tests earlier (without expanding scope)

### Status / Outcome
- All tests green locally (`npm test`).
- Project pushed to GitHub and includes a working CLI + documentation.



