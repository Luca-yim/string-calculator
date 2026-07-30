# Changelog

All notable changes to this project will be documented in this file.

Follows [Keep a Changelog](https://keepachangelog.com/) and [SemVer](https://semver.org/).

## [Unreleased]

### Added
- Initial project scaffolding
- `Calculator.add()` handles 0, 1, or 2 comma-separated numbers
- Test coverage for arbitrary-count number lists
- Newlines (`\n`) accepted as number separators alongside commas
- Graceful handling of trailing delimiters
- Custom delimiter support via `//[delimiter]\n` header
- Regex-escaping for delimiters (handles special characters like `.` and `|`)
- Extracted helper methods for readability
- Rejects negative numbers with error listing all negatives
- Silently ignores numbers greater than 1000
- ADR 0001 documenting validation rules and ordering
- Extracted pipeline helpers: parseNumbers, rejectNegatives, filterLarge, sum
- Multi-character delimiter support via `//[delimiter]\n` syntax
- Multiple delimiter support via `//[a][b][c]\n` syntax
- Extracted buildDelimiterRegex helper
- Future ideas log documenting deferred features
