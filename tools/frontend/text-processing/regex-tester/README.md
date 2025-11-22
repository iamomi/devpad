# Regex Tester & Visualizer Pro

A powerful tool for testing, visualizing, and understanding regular expressions with real-time highlighting and a comprehensive pattern library.

## What are Regular Expressions?

**Regular Expressions (regex)** are patterns used to match character combinations in strings. They're incredibly powerful for:
- Validation (email, phone, URLs)
- Search and replace operations
- Data extraction and parsing
- Text processing and transformation

## Features

- **Real-Time Testing**: See matches highlighted as you type
- **Match Highlighting**: Visual feedback for all matches
- **Capture Groups**: View captured groups separately
- **Flags Support**: Test with global, case-insensitive, multiline, and more
- **Pattern Library**: Common regex patterns ready to use
- **Cheat Sheet**: Quick reference for regex syntax
- **Code Export**: Generate JavaScript/Python code

## How to Use

1. **Enter Pattern**: Type your regex pattern
2. **Add Test Text**: Enter text to test against
3. **Select Flags**: Choose g (global), i (case-insensitive), m (multiline), etc.
4. **View Matches**: See highlighted matches in real-time
5. **Check Groups**: View captured groups if using parentheses
6. **Copy Code**: Export as JavaScript or Python

## Regex Syntax

### Basic Patterns

- `.` - Any character except newline
- `\d` - Any digit (0-9)
- `\D` - Any non-digit
- `\w` - Word character (a-z, A-Z, 0-9, _)
- `\W` - Non-word character
- `\s` - Whitespace (space, tab, newline)
- `\S` - Non-whitespace

### Quantifiers

- `*` - 0 or more
- `+` - 1 or more
- `?` - 0 or 1
- `{n}` - Exactly n times
- `{n,}` - n or more times
- `{n,m}` - Between n and m times

### Anchors

- `^` - Start of string/line
- `$` - End of string/line
- `\b` - Word boundary
- `\B` - Non-word boundary

### Character Classes

- `[abc]` - Any of a, b, or c
- `[^abc]` - Not a, b, or c
- `[a-z]` - Any lowercase letter
- `[A-Z]` - Any uppercase letter
- `[0-9]` - Any digit

### Groups

- `(abc)` - Capture group
- `(?:abc)` - Non-capturing group
- `(a|b)` - Alternation (a or b)

### Lookahead/Lookbehind

- `(?=abc)` - Positive lookahead
- `(?!abc)` - Negative lookahead
- `(?<=abc)` - Positive lookbehind
- `(?<!abc)` - Negative lookbehind

## Common Patterns

### Email Validation
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

### URL Validation
```regex
^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$
```

### Phone Number (US)
```regex
^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$
```

### Date (YYYY-MM-DD)
```regex
^\d{4}-\d{2}-\d{2}$
```

### Hex Color
```regex
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$
```

### Password Strength
```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

## Flags Explained

- **g** (global): Find all matches, not just the first
- **i** (case-insensitive): Ignore case
- **m** (multiline): ^ and $ match line starts/ends
- **s** (dotAll): . matches newlines
- **u** (unicode): Enable full Unicode support
- **y** (sticky): Match from lastIndex position

## JavaScript Examples

### Test if pattern matches
```javascript
const regex = /\d{3}-\d{3}-\d{4}/;
const isValid = regex.test('555-123-4567'); // true
```

### Find all matches
```javascript
const text = 'Call 555-1234 or 555-5678';
const regex = /\d{3}-\d{4}/g;
const matches = text.match(regex); // ['555-1234', '555-5678']
```

### Replace with regex
```javascript
const text = 'Hello World';
const result = text.replace(/world/i, 'JavaScript'); // 'Hello JavaScript'
```

### Extract capture groups
```javascript
const text = 'John Doe (john@example.com)';
const regex = /(\w+)\s(\w+)\s\(([^)]+)\)/;
const match = text.match(regex);
// match[1] = 'John'
// match[2] = 'Doe'
// match[3] = 'john@example.com'
```

## Best Practices

1. **Start simple, then refine** - Build patterns incrementally
2. **Use non-capturing groups** `(?:)` when you don't need the capture
3. **Be specific** - Avoid overly broad patterns like `.*`
4. **Test edge cases** - Empty strings, special characters, etc.
5. **Use anchors** - `^` and `$` to match entire strings
6. **Escape special characters** - Use `\` for literal `.`, `*`, `+`, etc.
7. **Consider performance** - Avoid catastrophic backtracking

## Common Mistakes

❌ **Forgetting to escape special characters**
```javascript
// Wrong: . matches any character
const regex = /example.com/;

// Right: \. matches literal dot
const regex = /example\.com/;
```

❌ **Not using anchors for validation**
```javascript
// Wrong: matches "abc" anywhere in string
const regex = /abc/;

// Right: matches only if entire string is "abc"
const regex = /^abc$/;
```

❌ **Catastrophic backtracking**
```javascript
// Dangerous: can cause browser to hang
const regex = /(a+)+b/;

// Better: be more specific
const regex = /a+b/;
```

## Resources

- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Regex101](https://regex101.com/) - Online regex tester
- [RegExr](https://regexr.com/) - Learn, build, and test regex
