# Future Ideas (Not Built)

Things I noticed while building but deliberately deferred per YAGNI:

## Edge Cases to Consider If Real Need Emerges
- Empty delimiter (`//[]\n1,2,3`) — currently would produce a matches-everything regex
- Overlapping delimiters (`//[ab][b]\n...`) — undefined behavior
- Duplicate delimiters (`//[*][*]\n...`) — redundant but not harmful
- Missing closing bracket (`//[abc\n...`) — currently produces confusing error
- Delimiter containing `]` — no way to express this in current syntax

## Feature Ideas
- CLI wrapper (probably Day 9)
- Streaming input for very long strings
- Return object with errors + partial sum (batch-friendly)

## Refactor Ideas
- Extract Calculator into pure functions (no class needed?)
- Type checking (JSDoc or migrate to TypeScript)

**None of these are being built now.** They live here as a memory aid.
If a real need surfaces, we'll implement them driven by a real test.
