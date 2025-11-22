# JWT Debugger & Decoder

A client-side tool for decoding, inspecting, and verifying JSON Web Tokens (JWTs) with support for multiple algorithms.

## What is JWT?

**JSON Web Token (JWT)** is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are commonly used for:
- Authentication
- Authorization
- Information exchange
- Stateless sessions

## JWT Structure

A JWT consists of three parts separated by dots (`.`):

```
header.payload.signature
```

### Example JWT
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### 1. Header

Contains metadata about the token:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- **alg**: Algorithm used for signing (HS256, RS256, etc.)
- **typ**: Token type (always "JWT")

### 2. Payload

Contains the claims (data):

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}
```

**Standard Claims:**
- **iss** (issuer): Who created the token
- **sub** (subject): Who the token is about
- **aud** (audience): Who the token is for
- **exp** (expiration): When the token expires
- **nbf** (not before): When the token becomes valid
- **iat** (issued at): When the token was created
- **jti** (JWT ID): Unique identifier

### 3. Signature

Ensures the token hasn't been tampered with:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## Features

- **Decode**: View header and payload instantly
- **Verify**: Check signature validity (HS256 supported)
- **Inspect Claims**: See all standard and custom claims
- **Expiration Check**: Automatically detect expired tokens
- **Algorithm Display**: Show signing algorithm
- **Sample Tokens**: Pre-loaded examples for testing

## How to Use

1. **Paste JWT**: Enter your token
2. **View Decoded**: See header and payload
3. **Check Signature**: Verify with secret (if HS256)
4. **Inspect Claims**: Review all claims
5. **Check Expiration**: See if token is valid

## Signing Algorithms

### Symmetric (HMAC)

**HS256** (HMAC with SHA-256)
- Uses a shared secret
- Same key for signing and verification
- Faster, simpler
- Secret must be kept secure

**HS384**, **HS512**
- Stronger hash functions
- Larger signatures

### Asymmetric (RSA/ECDSA)

**RS256** (RSA with SHA-256)
- Uses public/private key pair
- Private key signs, public key verifies
- More secure for distributed systems
- Slower than HMAC

**RS384**, **RS512**, **ES256**, **ES384**, **ES512**
- Various strengths and algorithms

## JavaScript Examples

### Create JWT (HS256)

```javascript
// Note: Use a library like jsonwebtoken in production
const header = {
  alg: "HS256",
  typ: "JWT"
};

const payload = {
  sub: "1234567890",
  name: "John Doe",
  iat: Math.floor(Date.now() / 1000)
};

const secret = "your-256-bit-secret";

// Encode header and payload
const encodedHeader = btoa(JSON.stringify(header));
const encodedPayload = btoa(JSON.stringify(payload));

// Create signature (simplified - use crypto library)
const signature = await crypto.subtle.sign(
  "HMAC",
  key,
  new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
);

const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
```

### Decode JWT

```javascript
function decodeJWT(token) {
  const [headerB64, payloadB64, signature] = token.split('.');
  
  const header = JSON.parse(atob(headerB64));
  const payload = JSON.parse(atob(payloadB64));
  
  return { header, payload, signature };
}

const decoded = decodeJWT(token);
console.log(decoded.payload.name); // "John Doe"
```

### Verify JWT (HS256)

```javascript
async function verifyJWT(token, secret) {
  const [headerB64, payloadB64, signatureB64] = token.split('.');
  
  // Recreate signature
  const data = `${headerB64}.${payloadB64}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  
  // Compare signatures
  const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return expectedSignature === signatureB64;
}
```

### Check Expiration

```javascript
function isTokenExpired(token) {
  const { payload } = decodeJWT(token);
  
  if (!payload.exp) return false;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}
```

## Security Best Practices

### ⚠️ Critical Rules

1. **Never store sensitive data in payload**
   - Payload is Base64-encoded, NOT encrypted
   - Anyone can decode and read it
   - Don't include passwords, credit cards, etc.

2. **Use strong secrets**
   ```javascript
   // ❌ Weak
   const secret = "secret";
   
   // ✅ Strong
   const secret = "your-256-bit-secret-key-here-make-it-long-and-random";
   ```

3. **Always verify signatures**
   ```javascript
   // ❌ Dangerous - trusts any token
   const payload = decodeJWT(token).payload;
   
   // ✅ Safe - verifies first
   if (await verifyJWT(token, secret)) {
     const payload = decodeJWT(token).payload;
   }
   ```

4. **Set expiration times**
   ```javascript
   const payload = {
     sub: "user123",
     exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
   };
   ```

5. **Use HTTPS only**
   - JWTs in URLs or headers can be intercepted
   - Always use HTTPS in production

6. **Store securely**
   - ❌ localStorage (vulnerable to XSS)
   - ✅ httpOnly cookies (safer)
   - ✅ Memory (most secure, but lost on refresh)

7. **Implement token refresh**
   - Short-lived access tokens (15 min)
   - Long-lived refresh tokens (7 days)
   - Rotate refresh tokens

## Common Vulnerabilities

### None Algorithm Attack

```javascript
// ❌ Vulnerable
{
  "alg": "none",
  "typ": "JWT"
}
```

**Fix:** Always validate the algorithm

### Algorithm Confusion

Attacker changes RS256 to HS256, using public key as secret.

**Fix:** Explicitly specify expected algorithm

### Weak Secrets

Short or common secrets can be brute-forced.

**Fix:** Use cryptographically strong secrets (256+ bits)

## Use Cases

### Authentication

```javascript
// Login endpoint
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);
  
  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ token });
});

// Protected endpoint
app.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user });
});
```

### API Authorization

```javascript
// Include in request header
fetch('/api/data', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Microservices

```javascript
// Service A creates token
const token = createServiceToken({ service: 'A', action: 'read' });

// Service B verifies token
const verified = await verifyServiceToken(token);
```

## JWT vs Session Cookies

| Feature | JWT | Session Cookie |
|---------|-----|----------------|
| **Storage** | Client-side | Server-side |
| **Scalability** | Excellent | Requires shared storage |
| **Revocation** | Difficult | Easy |
| **Size** | Larger | Smaller |
| **Stateless** | Yes | No |
| **Security** | Signature-based | Session ID |

## Libraries

### JavaScript/Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [jose](https://www.npmjs.com/package/jose)

### Python
- [PyJWT](https://pyjwt.readthedocs.io/)

### Java
- [jjwt](https://github.com/jwtk/jjwt)

### Go
- [jwt-go](https://github.com/golang-jwt/jwt)

## Resources

- [JWT.io](https://jwt.io/) - Official JWT website
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT specification
- [MDN: Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
- [OWASP: JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
