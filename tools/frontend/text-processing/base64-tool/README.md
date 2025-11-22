# Base64 Encoder/Decoder

A versatile tool for encoding and decoding Base64 data, supporting both text and files with Data URL generation.

## What is Base64?

**Base64** is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's used to:
- Embed images in HTML/CSS (Data URLs)
- Transmit binary data over text-based protocols
- Store binary data in JSON/XML
- Encode email attachments (MIME)

### How It Works

Base64 converts binary data into a set of 64 ASCII characters:
- A-Z (26 characters)
- a-z (26 characters)
- 0-9 (10 characters)
- `+` and `/` (2 characters)
- `=` for padding

**Example:**
- Text: `Hello`
- Base64: `SGVsbG8=`

## Features

- **Text Mode**: Encode/decode plain text strings
- **File Mode**: Convert files to Base64 Data URLs
- **Drag & Drop**: Easy file upload interface
- **File Download**: Convert Base64 back to files
- **Clipboard Integration**: One-click copy
- **Format Detection**: Auto-detect file types

## How to Use

### Text Mode

1. **Enter Text**: Type in the input box
2. **Click Encode**: Convert to Base64
3. **Click Decode**: Convert from Base64
4. **Copy Result**: Use the copy button

### File Mode

1. **Upload File**: Drag & drop or click to select
2. **View Base64**: See the Data URL output
3. **Copy**: Use for embedding in code
4. **Download**: Paste Base64 to convert back to file

## Text Encoding Examples

### Example 1: Simple Text

```javascript
// Encode
const text = "Hello World";
const encoded = btoa(text);
console.log(encoded); // "SGVsbG8gV29ybGQ="

// Decode
const decoded = atob(encoded);
console.log(decoded); // "Hello World"
```

### Example 2: UTF-8 Text (with special characters)

```javascript
// Encode UTF-8
const text = "Hello 世界";
const encoded = btoa(unescape(encodeURIComponent(text)));

// Decode UTF-8
const decoded = decodeURIComponent(escape(atob(encoded)));
```

### Example 3: JSON Data

```javascript
const data = { name: "John", age: 30 };
const json = JSON.stringify(data);
const encoded = btoa(json);

// Later...
const decoded = JSON.parse(atob(encoded));
```

## File Encoding Examples

### Example 1: Image Data URL

```javascript
// Result format:
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...

// Use in HTML
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..." />

// Use in CSS
.element {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...');
}
```

### Example 2: File Upload to Base64

```javascript
const fileInput = document.getElementById('file');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
        const base64 = event.target.result;
        console.log(base64); // Data URL
    };
    
    reader.readAsDataURL(file);
});
```

### Example 3: Base64 to Blob

```javascript
function base64ToBlob(base64, mimeType) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeType });
}
```

## Data URL Format

```
data:[<mediatype>][;base64],<data>
```

**Components:**
- `data:` - Protocol
- `<mediatype>` - MIME type (e.g., `image/png`, `text/plain`)
- `;base64` - Encoding indicator
- `<data>` - The Base64-encoded data

**Examples:**
```
data:text/plain;base64,SGVsbG8gV29ybGQ=
data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
data:application/json;base64,eyJuYW1lIjoiSm9obiJ9
```

## Common Use Cases

### Embedding Images in HTML

```html
<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIi..." alt="Icon" />
```

**Pros:**
- No HTTP request needed
- Works offline
- Single file deployment

**Cons:**
- Increases HTML size by ~33%
- Not cached separately
- Harder to maintain

### Storing Binary Data in JSON

```javascript
const data = {
    filename: "document.pdf",
    content: "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvVGltZXMtUm9tYW4+PgplbmRvYmoKNSAwIG9iago8PC9MZW5ndGggNDQ+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKEhlbGxvIFdvcmxkKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY0IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAwMDI0NyAwMDAwMCBuIAowMDAwMDAwMzMwIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDIzCiUlRU9G"
};
```

### API Responses

```javascript
// Server sends file as Base64
fetch('/api/download/file123')
    .then(r => r.json())
    .then(data => {
        const link = document.createElement('a');
        link.href = `data:${data.mimeType};base64,${data.content}`;
        link.download = data.filename;
        link.click();
    });
```

## Browser APIs

### btoa() - Encode to Base64

```javascript
const encoded = btoa("Hello"); // "SGVsbG8="
```

**Limitations:**
- Only works with Latin1 characters (0-255)
- Throws error for Unicode characters

### atob() - Decode from Base64

```javascript
const decoded = atob("SGVsbG8="); // "Hello"
```

### FileReader API

```javascript
const reader = new FileReader();
reader.readAsDataURL(file); // Generates Data URL
reader.readAsArrayBuffer(file); // For binary processing
reader.readAsText(file); // For text files
```

## Best Practices

1. **Use for small files only** - Base64 increases size by ~33%
2. **Don't use for large images** - Use regular `<img src="url">` instead
3. **Cache separately** - Base64 in HTML/CSS can't be cached independently
4. **Consider performance** - Encoding/decoding has overhead
5. **Handle errors** - `btoa()`/`atob()` can throw exceptions

## Common Pitfalls

❌ **Encoding Unicode without conversion**
```javascript
// Wrong - throws error
btoa("Hello 世界");

// Right - convert to UTF-8 first
btoa(unescape(encodeURIComponent("Hello 世界")));
```

❌ **Not handling file size**
```javascript
// Can crash browser with large files
reader.readAsDataURL(largeFile);

// Better - check size first
if (file.size < 5000000) { // 5MB
    reader.readAsDataURL(file);
}
```

❌ **Forgetting MIME type**
```javascript
// Wrong - browser can't determine type
data:;base64,SGVsbG8=

// Right - include MIME type
data:text/plain;base64,SGVsbG8=
```

## Size Comparison

Original size → Base64 size:
- 1 KB → ~1.33 KB (+33%)
- 10 KB → ~13.3 KB (+33%)
- 100 KB → ~133 KB (+33%)

## Resources

- [MDN: Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
- [MDN: Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- [MDN: btoa()](https://developer.mozilla.org/en-US/docs/Web/API/btoa)
- [MDN: atob()](https://developer.mozilla.org/en-US/docs/Web/API/atob)
