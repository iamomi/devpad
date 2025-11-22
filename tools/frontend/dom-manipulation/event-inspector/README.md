# Advanced Event Inspector Pro

A tool to explore JavaScript event propagation and properties in a visual way.

## Features

- **Nested Structure**: Visualize events flowing through Grandparent -> Parent -> Child elements.
- **Phase Control**: Toggle Capture and Bubble phase listeners for each element independently.
- **Event Types**: Test various event types (click, mousedown, mouseover, etc.).
- **Propagation Control**: Experiment with `stopPropagation()` and `preventDefault()`.
- **Detailed Logging**: See exactly when each element receives an event, the event phase, and the target.

## Usage

1. Open `index.html` in your browser.
2. Use the sidebar to enable/disable listeners on the Grandparent, Parent, and Child elements.
3. Select an event type (default is `click`).
4. Click on the boxes in the main area.
5. Observe the "Event Log" at the bottom to see the order of events.
6. Try enabling "Stop Propagation" to see how it affects the flow.
