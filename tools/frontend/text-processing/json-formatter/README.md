# JSON Formatter & Validator

A robust tool for formatting, validating, and minifying JSON data with real-time error detection.

## What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight data interchange format that's easy for humans to read and write, and easy for machines to parse and generate.

## Features

- **Format**: Pretty-print JSON with customizable indentation
- **Minify**: Compress JSON into a single line
- **Validate**: Real-time validation with error reporting
- **Stats**: Monitor JSON size in bytes/KB
- **Line Numbers**: Easy reference for large files
- **Syntax Highlighting**: Color-coded for readability

## How to Use

1. **Paste JSON**: Enter your JSON string
2. **Auto-Validate**: See if it's valid in real-time
3. **Format**: Click to pretty-print
4. **Minify**: Click to compress
5. **Copy**: Use the copy button

## JSON Syntax

### Data Types

**String**
```json
"Hello World"
```

**Number**
```json
42
3.14
-10
1.5e10
```

**Boolean**
```json
true
false
```

**Null**
```json
null
```

**Array**
```json
[1, 2, 3, "four", true, null]
```

**Object**
```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

### Rules

- Keys must be strings (in double quotes)
- Strings must use double quotes (not single)
- No trailing commas
- No comments allowed
- No undefined values

## Common Patterns

### User Object
```json
{
  "id": 123,
  "username": "johndoe",
  "email": "john@example.com",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 30
  },
  "roles": ["user", "admin"],
  "active": true,
  "lastLogin": "2024-01-15T10:30:00Z"
}
```

### API Response
```json
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "Alice"},
      {"id": 2, "name": "Bob"}
    ],
    "total": 2,
    "page": 1
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

### Configuration File
```json
{
  "app": {
    "name": "MyApp",
    "version": "1.0.0",
    "port": 3000
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "mydb"
  },
  "features": {
    "authentication": true,
    "logging": true,
    "caching": false
  }
}
```

## JavaScript Usage

### Parse JSON
```javascript
const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // "John"
```

### Stringify Object
```javascript
const obj = {name: "John", age: 30};
const jsonString = JSON.stringify(obj);
// '{"name":"John","age":30}'
```

### Pretty Print
```javascript
const obj = {name: "John", age: 30};
const formatted = JSON.stringify(obj, null, 2);
/*
{
  "name": "John",
  "age": 30
}
*/
```

### Minify
```javascript
const formatted = `{
  "name": "John",
  "age": 30
}`;
const minified = JSON.stringify(JSON.parse(formatted));
// '{"name":"John","age":30}'
```

## JSON Schema Basics

JSON Schema validates JSON structure:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "maximum": 120
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "email"]
}
```

## Best Practices

1. **Use consistent naming** - camelCase or snake_case
2. **Keep it flat when possible** - Avoid deep nesting
3. **Use arrays for lists** - Even single items
4. **Include metadata** - Timestamps, versions
5. **Validate before sending** - Catch errors early
6. **Use appropriate types** - Don't stringify numbers
7. **Handle null properly** - Distinguish from undefined

## Common Errors

### Trailing Comma
```json
// ❌ Invalid
{
  "name": "John",
  "age": 30,
}

// ✅ Valid
{
  "name": "John",
  "age": 30
}
```

### Single Quotes
```json
// ❌ Invalid
{'name': 'John'}

// ✅ Valid
{"name": "John"}
```

### Unquoted Keys
```json
// ❌ Invalid
{name: "John"}

// ✅ Valid
{"name": "John"}
```

### Comments
```json
// ❌ Invalid
{
  // This is a comment
  "name": "John"
}

// ✅ Valid (no comments allowed)
{
  "name": "John"
}
```

## JSON vs JavaScript Object

| Feature | JSON | JavaScript Object |
|---------|------|-------------------|
| Keys | Must be strings | Can be any type |
| Quotes | Double quotes only | Single or double |
| Trailing commas | Not allowed | Allowed |
| Comments | Not allowed | Allowed |
| Functions | Not allowed | Allowed |
| undefined | Not allowed | Allowed |

## Performance Tips

1. **Minify for production** - Reduces file size
2. **Use streaming for large files** - Don't load all at once
3. **Cache parsed results** - Avoid re-parsing
4. **Validate once** - Not on every access
5. **Use typed arrays** - For binary data

## Tools & Libraries

### Validation
- [ajv](https://ajv.js.org/) - JSON Schema validator
- [joi](https://joi.dev/) - Object schema validation

### Manipulation
- [jq](https://stedolan.github.io/jq/) - Command-line JSON processor
- [lodash](https://lodash.com/) - Utility functions

### Conversion
- [xml2js](https://www.npmjs.com/package/xml2js) - XML ↔ JSON
- [csv-parse](https://csv.js.org/) - CSV → JSON

## Resources

- [JSON.org](https://www.json.org/)
- [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [JSON Schema](https://json-schema.org/)
- [JSONLint](https://jsonlint.com/) - Online validator
