# CORS & HTTP Headers Simulator

A dual-mode tool to test and understand Cross-Origin Resource Sharing (CORS) and HTTP headers.

## Features

- **Simulation Mode**: Define both the Request and the "Mocked" Response. This allows you to visualize how specific headers (like `Access-Control-Allow-Origin`) appear in an HTTP exchange without needing a real server. Great for learning.
- **Real Request Mode**: Send actual `fetch()` requests to any URL. Inspect the real response headers and body.
- **Header Management**: Easily add/remove custom headers for both requests and mock responses.
- **CORS Highlighting**: CORS-related headers are visually highlighted in the response log to make debugging easier.

## Usage

1. Open `index.html` in your browser.
2. **For Learning (Simulation)**:
    - Keep "Simulation Mode" checked.
    - Configure your Request (Method, URL, Headers).
    - Switch to the "Mock Response" tab and configure what the server *should* return.
    - Click "Send Request" to see the simulated exchange in the log.
3. **For Testing (Real)**:
    - Uncheck "Simulation Mode".
    - Enter a real API URL (e.g., `https://jsonplaceholder.typicode.com/posts/1`).
    - Click "Send Request".
    - **Note**: If the server doesn't support CORS, the browser will block the response, and you'll see an error in the log.
