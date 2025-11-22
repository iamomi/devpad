# Hyper Window.open() Test Pad X

A comprehensive testing tool for exploring the `window.open()` API and understanding popup window behavior across different browsers.

## What is window.open()?

The `window.open()` method opens a new browser window or tab with specified features and characteristics. It's one of the oldest JavaScript APIs but remains relevant for specific use cases.

### Syntax

```javascript
window.open(url, target, features);
```

- **url**: The URL to load in the new window
- **target**: The name of the window (`_blank`, `_self`, or a custom name)
- **features**: Comma-separated list of window features

## Features

- **URL Configuration**: Test any URL or use about:blank
- **Window Naming**: Set custom window names or use special targets
- **Dimension Controls**: Set exact width and height
- **Position Controls**: Specify left and top coordinates
- **Feature Toggles**: Enable/disable menubar, toolbar, location, status, scrollbars, resizable
- **Advanced Options**: Test noopener, noreferrer, and popup behavior
- **Feature String Builder**: Generate the complete feature string
- **Live Testing**: Open windows with your configuration instantly

## How to Use

### Basic Workflow

1. **Set URL**: Enter the destination URL or use `about:blank` for testing
2. **Configure Dimensions**: Set width and height in pixels
3. **Choose Features**: Toggle various window features on/off
4. **Set Position**: Specify where the window should appear (optional)
5. **Click "Open Window"**: Test your configuration
6. **Copy Code**: Use the generated JavaScript in your projects

### Common Use Cases

#### Example 1: Basic Popup

```javascript
window.open('https://example.com', '_blank', 'width=600,height=400');
```

**Try it:** Set width=600, height=400, and click Open Window

#### Example 2: Centered Popup

```javascript
const width = 600;
const height = 400;
const left = (screen.width - width) / 2;
const top = (screen.height - height) / 2;

window.open(
    'https://example.com',
    '_blank',
    `width=${width},height=${height},left=${left},top=${top}`
);
```

**Try it:** Use the tool to calculate centered positions

#### Example 3: Minimal Popup (No Browser UI)

```javascript
window.open(
    'https://example.com',
    '_blank',
    'width=800,height=600,menubar=no,toolbar=no,location=no,status=no'
);
```

**Try it:** Disable all UI features for a clean window

#### Example 4: Secure Popup (noopener, noreferrer)

```javascript
window.open(
    'https://external-site.com',
    '_blank',
    'noopener,noreferrer'
);
```

**Try it:** Enable noopener and noreferrer for security

## Window Features Explained

### Dimensions

**`width`** and **`height`**
- Specifies the size of the content area in pixels
- Minimum values enforced by browsers (usually ~100px)
- Does not include browser chrome (toolbars, etc.)

### Position

**`left`** and **`top`** (or `screenX` and `screenY`)
- Position relative to the screen's top-left corner
- Measured in pixels
- May be constrained by browser/OS

### UI Features

**`menubar`** - Shows the menu bar (File, Edit, etc.)
- `yes` or `no`
- Often ignored by modern browsers

**`toolbar`** - Shows the navigation toolbar
- `yes` or `no`
- Back/forward buttons, address bar

**`location`** - Shows the address bar
- `yes` or `no`
- Important for security (users should see the URL)

**`status`** - Shows the status bar
- `yes` or `no`
- Bottom bar showing link destinations

**`scrollbars`** - Enables scrollbars
- `yes` or `no`
- Auto-appears if content overflows

**`resizable`** - Allows window resizing
- `yes` or `no`
- Users can drag window edges

### Security Features

**`noopener`**
- Prevents the new window from accessing `window.opener`
- **Critical for security** when opening untrusted URLs
- Prevents tabnabbing attacks

**`noreferrer`**
- Prevents sending the Referer header
- Implies `noopener`
- Hides where the user came from

## Security Considerations

### Tabnabbing Attack

Without `noopener`, the opened window can access your page via `window.opener` and potentially redirect it to a phishing site.

```javascript
// ❌ Vulnerable
window.open('https://untrusted-site.com', '_blank');

// ✅ Secure
window.open('https://untrusted-site.com', '_blank', 'noopener,noreferrer');
```

### Popup Blockers

- Most browsers block popups not triggered by user interaction
- Popups from `setTimeout`, `setInterval`, or async operations are often blocked
- Always open windows in direct response to user clicks

### Same-Origin Policy

- Opened windows from different origins cannot access each other's DOM
- `window.opener` is still accessible (hence the need for `noopener`)
- Cross-origin communication requires `postMessage()`

## Browser Compatibility

### Modern Behavior

- **Chrome/Edge**: Respects most features, enforces minimum sizes
- **Firefox**: Similar to Chrome, may ignore some UI features
- **Safari**: More restrictive, often ignores UI customization
- **Mobile**: Usually opens in new tab, ignores most features

### Deprecated Features

These features are largely ignored by modern browsers:
- `directories`
- `titlebar`
- `fullscreen` (security risk)
- `channelmode`
- `dependent`

## Best Practices

1. **Always use `noopener` for external links**
   ```javascript
   window.open(url, '_blank', 'noopener,noreferrer');
   ```

2. **Provide fallback for blocked popups**
   ```javascript
   const popup = window.open(url, '_blank');
   if (!popup) {
       alert('Please allow popups for this site');
   }
   ```

3. **Center popups for better UX**
   ```javascript
   const left = (screen.width - width) / 2;
   const top = (screen.height - height) / 2;
   ```

4. **Keep popups minimal**
   - Only use when necessary (consider modals instead)
   - Don't abuse by opening multiple windows
   - Respect user preferences

5. **Test across browsers**
   - Behavior varies significantly
   - Some features may be ignored
   - Mobile behaves differently

## Alternatives to window.open()

Consider these modern alternatives:

- **Modal Dialogs**: `<dialog>` element or CSS modals
- **Inline Frames**: `<iframe>` for embedded content
- **New Tab Links**: `<a target="_blank" rel="noopener noreferrer">`
- **Single Page Apps**: Client-side routing instead of new windows

## Common Pitfalls

❌ **Opening popups without user interaction** - Will be blocked
❌ **Forgetting `noopener` for external sites** - Security risk
❌ **Relying on UI customization** - May be ignored by browsers
❌ **Not handling blocked popups** - Poor user experience
❌ **Using deprecated features** - Won't work in modern browsers

## Resources

- [MDN: window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
- [MDN: rel="noopener"](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener)
- [OWASP: Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing)
