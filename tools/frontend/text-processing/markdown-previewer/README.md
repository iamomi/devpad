# Markdown Previewer with Export

A real-time Markdown editor with live preview, syntax highlighting for code blocks, and export capabilities.

## What is Markdown?

**Markdown** is a lightweight markup language that uses plain text formatting syntax to create rich text documents. It's widely used for:
- Documentation (README files, wikis)
- Blog posts and articles
- Notes and knowledge bases
- GitHub issues and pull requests

## Features

- **Live Preview**: See rendered output as you type
- **Syntax Highlighting**: Automatic code highlighting with highlight.js
- **Toolbar**: Quick formatting buttons
- **Export Options**: Copy HTML or print/save as PDF
- **Sync Scroll**: Preview scrolls with editor
- **GFM Support**: GitHub Flavored Markdown features

## How to Use

1. **Type Markdown**: Use the left pane to write
2. **View Preview**: See rendered result on the right
3. **Use Toolbar**: Click buttons for quick formatting
4. **Copy HTML**: Get the generated HTML code
5. **Print/PDF**: Save your document as PDF

## Markdown Syntax

### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

### Emphasis

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic*** or ___bold italic___
~~strikethrough~~
```

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

**Ordered:**
```markdown
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
```

### Images

```markdown
![Alt text](image-url.jpg)
![Alt text](image-url.jpg "Image title")
```

### Code

**Inline code:**
```markdown
Use `code` for inline code
```

**Code blocks:**
````markdown
```javascript
function hello() {
  console.log("Hello World");
}
```
````

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
>
> > Nested blockquote
```

### Horizontal Rules

```markdown
---
***
___
```

### Tables (GFM)

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Alignment:**
```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| L    |   C    |     R |
```

### Task Lists (GFM)

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

### Footnotes

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

## GitHub Flavored Markdown (GFM)

### Autolinks

URLs are automatically converted to links:
```markdown
https://github.com
```

### Strikethrough

```markdown
~~This text is crossed out~~
```

### Tables

See tables section above.

### Task Lists

See task lists section above.

### Emoji (if supported)

```markdown
:smile: :heart: :thumbsup:
```

### Syntax Highlighting

Specify language for code blocks:
````markdown
```python
def hello():
    print("Hello World")
```
````

## HTML in Markdown

You can use HTML tags directly:

```markdown
<div align="center">
  <h1>Centered Heading</h1>
  <p>Centered paragraph</p>
</div>

<details>
  <summary>Click to expand</summary>
  Hidden content here
</details>
```

## Best Practices

1. **Use headings hierarchically** - Don't skip levels
2. **Add blank lines** - Between different elements for clarity
3. **Use reference-style links** - For repeated URLs
4. **Indent nested lists** - With 2 or 4 spaces
5. **Preview before publishing** - Check formatting

## Common Patterns

### Documentation Structure

```markdown
# Project Name

Brief description

## Installation

Installation instructions

## Usage

Usage examples

## API Reference

API documentation

## Contributing

Contribution guidelines

## License

License information
```

### Code Documentation

````markdown
## Function Name

Description of what the function does.

### Parameters

- `param1` (Type): Description
- `param2` (Type): Description

### Returns

(Type): Description of return value

### Example

```javascript
const result = functionName(arg1, arg2);
```
````

### Badges

```markdown
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
```

## Keyboard Shortcuts

Common shortcuts in most Markdown editors:

- **Ctrl/Cmd + B**: Bold
- **Ctrl/Cmd + I**: Italic
- **Ctrl/Cmd + K**: Insert link
- **Ctrl/Cmd + Shift + C**: Code block

## Export Options

### Copy HTML

Copies the rendered HTML to clipboard for use in:
- Emails
- CMS systems
- HTML documents

### Print/PDF

Use browser's print function to:
- Print the document
- Save as PDF
- Adjust page layout

## Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [CommonMark Spec](https://commonmark.org/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
