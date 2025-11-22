# CORS & HTTP Headers Simulator

A powerful tool for understanding, testing, and debugging Cross-Origin Resource Sharing (CORS) and HTTP headers.

## What is CORS?

**Cross-Origin Resource Sharing (CORS)** is a security feature implemented by browsers to control how web pages from one origin can request resources from another origin.

### Same-Origin Policy

By default, browsers enforce the **Same-Origin Policy**, which prevents JavaScript from making requests to a different origin than the one that served the web page.

**Same Origin** means:
- Same protocol (http/https)
- Same domain
- Same port

Examples:
- ✅ `https://example.com/page1` → `https://example.com/page2` (Same origin)
- ❌ `https://example.com` → `http://example.com` (Different protocol)
- ❌ `https://example.com` → `https://api.example.com` (Different subdomain)
- ❌ `https://example.com:443` → `https://example.com:8080` (Different port)

### Why CORS Exists

CORS allows servers to explicitly permit cross-origin requests while maintaining security. Without CORS, malicious websites could make requests to your bank's API using your cookies.

## CORS Request Types

### Simple Requests

A request is "simple" if it meets ALL these criteria:
- Method: `GET`, `HEAD`, or `POST`
- Headers: Only `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`
- Content-Type (if used): `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

**Simple requests** are sent immediately, and the browser checks the response headers.

### Preflight Requests

Any request that doesn't meet the "simple" criteria triggers a **preflight request**:
1. Browser sends an `OPTIONS` request first
2. Server responds with allowed methods, headers, and origins
3. If approved, browser sends the actual request

**Triggers preflight:**
- Custom headers (e.g., `Authorization`, `X-Custom-Header`)
- Methods: `PUT`, `DELETE`, `PATCH`
- Content-Type: `application/json`

## CORS Headers Explained

### Response Headers (Server → Browser)

**`Access-Control-Allow-Origin`** (Required)
- Specifies which origins can access the resource
- `*` = Allow all origins (not allowed with credentials)
- `https://example.com` = Allow specific origin
- Can only specify ONE origin (or `*`)

**`Access-Control-Allow-Methods`**
- Lists allowed HTTP methods
- Example: `GET, POST, PUT, DELETE`
- Used in preflight responses

**`Access-Control-Allow-Headers`**
- Lists allowed request headers
- Example: `Content-Type, Authorization, X-Custom-Header`
- Used in preflight responses

**`Access-Control-Allow-Credentials`**
- `true` = Allow cookies and authentication
- Cannot be used with `Access-Control-Allow-Origin: *`
- Requires explicit origin

**`Access-Control-Max-Age`**
- How long (in seconds) preflight results can be cached
- Example: `86400` (24 hours)
- Reduces preflight requests

**`Access-Control-Expose-Headers`**
- Which response headers JavaScript can access
- By default, only simple headers are exposed
- Example: `X-Total-Count, X-Page-Number`

### Request Headers (Browser → Server)

**`Origin`**
- Automatically sent by browser
- Indicates the origin making the request
- Cannot be modified by JavaScript

**`Access-Control-Request-Method`**
- Sent in preflight requests
- Indicates the method of the actual request

**`Access-Control-Request-Headers`**
- Sent in preflight requests
- Lists custom headers the actual request will include

## Features

- **Request Simulator**: Test CORS requests without a real server
- **Real Request Mode**: Make actual HTTP requests and inspect responses
- **Header Inspector**: View all request and response headers
- **Preflight Visualization**: See when and why preflight requests occur
- **Error Diagnosis**: Understand CORS errors and how to fix them
- **Code Generator**: Export fetch() examples with proper CORS handling

## How to Use

### Basic Workflow

1. **Choose Mode**: Simulation (safe) or Real Request (actual HTTP)
2. **Set URL**: Enter the API endpoint to test
3. **Configure Request**: Set method, headers, and body
4. **Send Request**: Click to execute
5. **Inspect Response**: View headers and identify CORS issues
6. **Copy Code**: Use the generated fetch() example

### Common Scenarios

#### Scenario 1: Simple GET Request

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));
```

**Server must respond with:**
```
Access-Control-Allow-Origin: https://your-site.com
```

#### Scenario 2: POST with JSON

```javascript
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
});
```

**Triggers preflight. Server must respond to OPTIONS with:**
```
Access-Control-Allow-Origin: https://your-site.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type
```

#### Scenario 3: Authenticated Request

```javascript
fetch('https://api.example.com/user', {
    method: 'GET',
    credentials: 'include', // Send cookies
    headers: {
        'Authorization': 'Bearer token123'
    }
});
```

**Server must respond with:**
```
Access-Control-Allow-Origin: https://your-site.com (NOT *)
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Authorization
```

## Troubleshooting CORS Errors

### Error: "No 'Access-Control-Allow-Origin' header"

**Cause:** Server didn't include the CORS header

**Fix:** Server must add:
```
Access-Control-Allow-Origin: https://your-origin.com
```

### Error: "The 'Access-Control-Allow-Origin' header contains multiple values"

**Cause:** Server sent the header multiple times

**Fix:** Server should send header only once. If supporting multiple origins, dynamically set based on request Origin.

### Error: "Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'"

**Cause:** Using `credentials: 'include'` with wildcard origin

**Fix:** Server must specify exact origin:
```
Access-Control-Allow-Origin: https://your-origin.com
Access-Control-Allow-Credentials: true
```

### Error: "Request header field X is not allowed"

**Cause:** Custom header not in `Access-Control-Allow-Headers`

**Fix:** Server must list the header:
```
Access-Control-Allow-Headers: Content-Type, X-Custom-Header
```

### Error: "Method X is not allowed"

**Cause:** HTTP method not in `Access-Control-Allow-Methods`

**Fix:** Server must list the method:
```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## Server-Side Examples

### Node.js (Express)

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://your-site.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
```

### Python (Flask)

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['https://your-site.com'], supports_credentials=True)
```

### PHP

```php
header('Access-Control-Allow-Origin: https://your-site.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
```

## Best Practices

1. **Never use `*` in production with credentials**
2. **Whitelist specific origins** instead of allowing all
3. **Minimize exposed headers** - only expose what's needed
4. **Set appropriate `Max-Age`** to reduce preflight requests
5. **Handle OPTIONS requests** properly on the server
6. **Use HTTPS** for all CORS requests
7. **Validate Origin header** on the server

## Security Considerations

- CORS is a **browser security feature**, not server security
- Server-side validation is still required
- CORS doesn't prevent malicious requests, only browser access to responses
- Always validate and sanitize input on the server
- Don't rely on CORS for authentication

## Browser Support

CORS is supported in all modern browsers. IE 10+ has full support.

## Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [MDN: HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Enable CORS](https://enable-cors.org/)
