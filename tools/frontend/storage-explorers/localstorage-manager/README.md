# LocalStorage & SessionStorage Explorer X

A comprehensive tool for managing, inspecting, and understanding the Web Storage API (localStorage and sessionStorage).

## What is Web Storage?

The **Web Storage API** provides two mechanisms for storing key-value pairs in the browser:

### localStorage
- **Persistent**: Data persists even after browser is closed
- **Scope**: Shared across all tabs/windows from the same origin
- **Lifetime**: Until explicitly deleted
- **Use cases**: User preferences, cached data, offline functionality

### sessionStorage
- **Temporary**: Data cleared when tab/window is closed
- **Scope**: Isolated to the specific tab/window
- **Lifetime**: Duration of the page session
- **Use cases**: Form data, temporary state, wizard steps

### Storage Limits

- **Typical limit**: 5-10 MB per origin
- **Varies by browser**: Chrome/Firefox ~10MB, Safari ~5MB
- **Quota exceeded**: Throws `QuotaExceededError`
- **Check usage**: Use this tool to monitor storage size

## Features

- **Dual Storage Management**: View and edit both localStorage and sessionStorage
- **CRUD Operations**: Create, Read, Update, Delete storage items
- **JSON Support**: Automatic JSON formatting and validation
- **Bulk Operations**: Clear all, export, import
- **Size Monitoring**: Track storage usage in real-time
- **Search/Filter**: Find specific keys quickly
- **Code Export**: Generate JavaScript snippets

## How to Use

### Basic Workflow

1. **Select Storage Type**: Choose localStorage or sessionStorage
2. **View Items**: See all stored key-value pairs
3. **Add Item**: Click "Add" to create new entries
4. **Edit Item**: Click on any item to modify
5. **Delete Item**: Remove individual items or clear all
6. **Export/Import**: Save and restore storage data

### Common Operations

#### Example 1: Store Simple Data

```javascript
// Store a string
localStorage.setItem('username', 'JohnDoe');

// Retrieve it
const username = localStorage.getItem('username');
console.log(username); // 'JohnDoe'
```

**Try it:** Add a key-value pair using the tool

#### Example 2: Store Objects (JSON)

```javascript
// Store an object
const user = {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
        theme: 'dark',
        language: 'en'
    }
};

localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'John Doe'
```

**Try it:** Use the JSON formatter to store complex objects

#### Example 3: Check if Key Exists

```javascript
if (localStorage.getItem('username') !== null) {
    console.log('Username exists');
} else {
    console.log('Username not found');
}
```

#### Example 4: Remove Item

```javascript
localStorage.removeItem('username');
```

#### Example 5: Clear All Storage

```javascript
localStorage.clear();
```

## API Methods

### setItem(key, value)
- Stores a key-value pair
- Overwrites existing key
- Value must be a string (use `JSON.stringify()` for objects)

### getItem(key)
- Retrieves value for a key
- Returns `null` if key doesn't exist
- Use `JSON.parse()` for stored objects

### removeItem(key)
- Deletes a specific key-value pair
- No error if key doesn't exist

### clear()
- Removes ALL items from storage
- Use with caution!

### key(index)
- Returns the key name at the specified index
- Useful for iteration

### length
- Property (not method) that returns the number of stored items

## Storage Events

Listen for changes to storage (from other tabs/windows):

```javascript
window.addEventListener('storage', (e) => {
    console.log('Key changed:', e.key);
    console.log('Old value:', e.oldValue);
    console.log('New value:', e.newValue);
    console.log('URL:', e.url);
    console.log('Storage area:', e.storageArea);
});
```

**Note:** Storage events only fire in OTHER tabs, not the one making the change.

## Best Practices

1. **Always use try-catch for quota errors**
   ```javascript
   try {
       localStorage.setItem('key', 'value');
   } catch (e) {
       if (e.name === 'QuotaExceededError') {
           console.error('Storage quota exceeded');
       }
   }
   ```

2. **Validate data before storing**
   ```javascript
   const data = JSON.stringify(obj);
   if (data.length < 5000000) { // 5MB check
       localStorage.setItem('key', data);
   }
   ```

3. **Use meaningful key names**
   ```javascript
   // ✅ Good
   localStorage.setItem('user_preferences', data);
   
   // ❌ Bad
   localStorage.setItem('data', data);
   ```

4. **Namespace your keys**
   ```javascript
   const APP_PREFIX = 'myapp_';
   localStorage.setItem(APP_PREFIX + 'user', data);
   ```

5. **Clean up old data**
   ```javascript
   // Store with timestamp
   const data = {
       value: 'something',
       timestamp: Date.now()
   };
   localStorage.setItem('key', JSON.stringify(data));
   
   // Check age before using
   const stored = JSON.parse(localStorage.getItem('key'));
   const age = Date.now() - stored.timestamp;
   if (age > 86400000) { // 24 hours
       localStorage.removeItem('key');
   }
   ```

## Security Considerations

### ⚠️ Never Store Sensitive Data

**DON'T store:**
- Passwords
- Credit card numbers
- Social Security numbers
- API keys or secrets
- Authentication tokens (use httpOnly cookies instead)

### Why?

- localStorage is accessible to any JavaScript on the page
- Vulnerable to XSS (Cross-Site Scripting) attacks
- Not encrypted
- Persists indefinitely
- Visible in browser DevTools

### XSS Protection

```javascript
// ❌ Dangerous - XSS vulnerability
element.innerHTML = localStorage.getItem('userInput');

// ✅ Safe - Sanitize user input
element.textContent = localStorage.getItem('userInput');
```

## localStorage vs sessionStorage vs Cookies

| Feature | localStorage | sessionStorage | Cookies |
|---------|--------------|----------------|---------|
| **Capacity** | ~10MB | ~10MB | ~4KB |
| **Lifetime** | Forever | Tab session | Configurable |
| **Scope** | Origin | Tab | Origin + path |
| **Sent to server** | No | No | Yes (every request) |
| **Accessible from** | JavaScript | JavaScript | JavaScript + Server |
| **Best for** | Preferences, cache | Temporary state | Authentication |

## Common Use Cases

### User Preferences

```javascript
// Save theme preference
localStorage.setItem('theme', 'dark');

// Apply on page load
document.body.className = localStorage.getItem('theme') || 'light';
```

### Form Data Persistence

```javascript
// Save form data as user types
document.getElementById('email').addEventListener('input', (e) => {
    sessionStorage.setItem('draft_email', e.target.value);
});

// Restore on page load
document.getElementById('email').value = 
    sessionStorage.getItem('draft_email') || '';
```

### Offline Data Cache

```javascript
// Cache API response
fetch('/api/data')
    .then(r => r.json())
    .then(data => {
        localStorage.setItem('cached_data', JSON.stringify(data));
        localStorage.setItem('cache_time', Date.now());
    });

// Use cache if fresh
const cacheTime = localStorage.getItem('cache_time');
if (Date.now() - cacheTime < 3600000) { // 1 hour
    const data = JSON.parse(localStorage.getItem('cached_data'));
}
```

## Troubleshooting

### "QuotaExceededError"
- **Cause:** Storage limit reached
- **Fix:** Clear old data, reduce data size, or use IndexedDB for large datasets

### Data not persisting
- **Cause:** Private/Incognito mode, browser settings
- **Fix:** Check browser mode, verify storage isn't disabled

### Data not syncing across tabs
- **Cause:** Using sessionStorage (tab-specific)
- **Fix:** Use localStorage for cross-tab data

## Browser Support

Web Storage is supported in all modern browsers:
- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge (all versions)
- IE 8+

## Resources

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
