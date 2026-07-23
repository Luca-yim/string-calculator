# ADR 0001: Input Validation Rules and Ordering

Date: [7/23/26]
Status: Accepted

## Context

The `add()` method must apply multiple validation and filtering rules:

1. **Negatives are rejected** — throw an error listing all negatives
2. **Numbers > 1000 are ignored** — silently excluded from sum
3. **`-0` is accepted** — treated as 0

These rules can interact. For example, what should happen with `add("-1500")`?
- Rule 1 says "throw because negative"
- Rule 2 says "ignore because > 1000 in magnitude"

We must decide the order and interaction.

## Decision

**Rules run in this order:**

1. Parse input into numbers
2. **Reject** if any negatives exist (throws immediately)
3. **Filter out** numbers > 1000 (silent)
4. Sum the remaining

Additionally:
- **`-0` is accepted as 0** (JavaScript's Number semantics; not worth
  special-casing)

## Rationale

- **Negatives are hard errors** — they represent user mistakes that
  deserve immediate feedback. Silent ignoring would hide bugs.
- **Large numbers are soft filters** — the requirement suggests they
  represent "not interesting" values (e.g., outliers in accounting).
  Ignoring is friendlier than throwing.
- **Hard errors run first** — if we filtered large numbers before
  checking negatives, `add("-1500")` would silently ignore the
  negative, which contradicts the intent of Rule 1.

## Consequences

**Positive:**
- User errors surface loudly (negatives)
- Data quirks are absorbed silently (large numbers)
- Rule ordering is explicit and testable

**Negative:**
- `add("-1500")` throws instead of returning 0 — some users might
  expect the reverse. We document via test.

## Alternatives Considered

- **Filter large first, then check negatives**: rejected because it
  would silently discard the negative signal from `-1500`.
- **Return an object with `errors` and `sum` instead of throwing**:
  rejected as over-engineered for the current use case. Reconsider
  if this library is ever used in a batch-processing context.
