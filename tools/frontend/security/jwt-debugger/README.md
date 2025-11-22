# JWT Debugger & Decoder

A secure, client-side tool to decode, inspect, and verify JSON Web Tokens (JWT).

## Features

- **Instant Decoding**: Paste a JWT to instantly see the Header and Payload.
- **Signature Verification**: Verify HS256 signatures directly in the browser using your secret key.
- **Expiration Check**: Automatically checks the `exp` claim and highlights if the token is expired.
- **Secure**: All processing happens locally in your browser. No tokens or secrets are ever sent to a server.
- **Visual Breakdown**: Color-coded sections help you understand the structure of the JWT.

## Usage

1. Open `index.html` in your browser.
2. Paste your JWT string into the "Encoded Token" text area.
3. View the decoded Header and Payload on the right.
4. Check the "Expiration" status in the meta info panel.
5. To verify the signature, enter your secret key in the "Verify Signature" input. The status badge at the top will update to indicate if the signature is valid.
