# Hyper Window.open() Test Pad X

A comprehensive tool to test and understand the behavior of `window.open()` in modern browsers.

## Features

- **Target Window Control**: Open windows in `_blank`, `_self`, `_parent`, `_top`, or custom names.
- **Feature String Builder**: Visual controls for all standard `window.open` features (width, height, menubar, toolbar, etc.).
- **Manual Override**: Ability to manually type the feature string for edge case testing.
- **URL Analysis**: Analyze the target URL for headers and policies (requires CORS/Same-Origin).
- **Automation**: Auto-close child windows, log properties periodically.
- **Cross-Origin Testing**: Configure target origin for `postMessage` communication.

## Usage

1. Open `index.html` in your browser.
2. Enter a URL to open (or leave blank for a default child page).
3. Configure the window features using the UI controls.
4. Click "Open Window" (the button is dynamically generated/controlled in the UI).
5. Observe the logs and the behavior of the new window.

## Notes

- Some features (like `menubar`, `toolbar`) may be ignored by modern browsers depending on user settings and security policies.
- Popup blockers may prevent the window from opening if not triggered by a direct user action.
