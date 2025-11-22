# CSS Flexbox Playground X

An advanced visual tool for mastering CSS Flexbox through interactive experimentation.

## What is CSS Flexbox?

**Flexbox** (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It provides an efficient way to distribute space and align content, even when their size is unknown or dynamic.

### Key Concepts

#### Flex Container vs Flex Items
- **Flex Container**: The parent element with `display: flex` or `display: inline-flex`
- **Flex Items**: Direct children of the flex container

#### Main Axis vs Cross Axis
- **Main Axis**: The primary axis along which flex items are laid out (horizontal for `row`, vertical for `column`)
- **Cross Axis**: The perpendicular axis to the main axis

### When to Use Flexbox

✅ **Perfect for:**
- Navigation bars and menus
- Card layouts with equal heights
- Centering content vertically and horizontally
- Distributing space between elements
- Reordering elements visually without changing HTML

❌ **Not ideal for:**
- Complex two-dimensional layouts (use CSS Grid instead)
- Overall page layout (Grid is better suited)

## Features

- **Container Controls**: Full control over all flex container properties
  - `display`: flex | inline-flex
  - `flex-direction`: row | row-reverse | column | column-reverse
  - `flex-wrap`: nowrap | wrap | wrap-reverse
  - `justify-content`: flex-start | flex-end | center | space-between | space-around | space-evenly
  - `align-items`: stretch | flex-start | flex-end | center | baseline
  - `align-content`: stretch | flex-start | flex-end | center | space-between | space-around
  - `gap`: spacing between items

- **Item Controls**: Select individual items to adjust
  - `order`: visual order (default: 0)
  - `flex-grow`: growth factor (default: 0)
  - `flex-shrink`: shrink factor (default: 1)
  - `flex-basis`: initial size (default: auto)
  - `align-self`: override container's align-items
  - `width` & `height`: explicit dimensions

- **Live Preview**: Real-time visualization of changes
- **CSS Output**: Copy-ready CSS for both container and items
- **Interactive UI**: Add/remove items, click to select and edit

## How to Use

### Basic Workflow

1. **Open the Tool**: Launch `index.html` in your browser
2. **Adjust Container**: Use the sidebar controls to modify flex container properties
3. **Add/Remove Items**: Use the "+ Add Item" and "- Remove Last" buttons
4. **Select Items**: Click any numbered box to select it
5. **Modify Items**: Adjust the selected item's properties in the sidebar
6. **Copy CSS**: Use the generated CSS from the bottom panel

### Common Layout Examples

#### Example 1: Horizontal Navigation Bar

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
```

**Try it:** Set `flex-direction: row`, `justify-content: space-between`, `align-items: center`

#### Example 2: Centered Card

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Try it:** Set both `justify-content` and `align-items` to `center`

#### Example 3: Equal-Width Columns

```css
.container {
  display: flex;
  gap: 20px;
}

.item {
  flex: 1; /* shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
}
```

**Try it:** Select each item and set `flex-grow: 1`, `flex-basis: 0`

#### Example 4: Responsive Card Grid

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  flex: 1 1 300px; /* grow, shrink, min-width */
}
```

**Try it:** Set `flex-wrap: wrap`, then set items to `flex-grow: 1`, `flex-basis: 300px`

#### Example 5: Sticky Footer Layout

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1; /* takes up remaining space */
}
```

**Try it:** Set `flex-direction: column`, select middle item and set `flex-grow: 1`

## Understanding Flex Properties

### Container Properties

**`justify-content`** - Aligns items along the main axis
- `flex-start`: Items at the start
- `flex-end`: Items at the end
- `center`: Items centered
- `space-between`: First and last items at edges, equal space between
- `space-around`: Equal space around each item
- `space-evenly`: Equal space between all items and edges

**`align-items`** - Aligns items along the cross axis
- `stretch`: Items stretch to fill container (default)
- `flex-start`: Items at cross-start
- `flex-end`: Items at cross-end
- `center`: Items centered on cross axis
- `baseline`: Items aligned by text baseline

**`flex-wrap`** - Controls wrapping behavior
- `nowrap`: All items on one line (default)
- `wrap`: Items wrap to multiple lines
- `wrap-reverse`: Items wrap in reverse order

### Item Properties

**`flex-grow`** - How much an item should grow relative to others
- `0`: Don't grow (default)
- `1`: Grow equally with other items
- `2`: Grow twice as much as items with `flex-grow: 1`

**`flex-shrink`** - How much an item should shrink relative to others
- `0`: Don't shrink
- `1`: Shrink equally (default)

**`flex-basis`** - Initial size before growing/shrinking
- `auto`: Use item's width/height (default)
- `0`: Ignore item's size, distribute space based on flex-grow
- `200px`: Start at 200px

**`order`** - Visual order (doesn't change HTML)
- Default: `0`
- Lower numbers appear first
- Can be negative

## Tips & Best Practices

1. **Use `gap` instead of margins** for spacing between flex items
2. **`flex: 1`** is shorthand for `flex: 1 1 0` (grow, shrink, basis)
3. **Combine with Grid** for complex layouts (Flexbox for components, Grid for page layout)
4. **Use `align-self`** to override alignment for specific items
5. **Test with different content sizes** to ensure flexibility

## Browser Support

Flexbox is supported in all modern browsers. For legacy support:
- IE 10-11: Partial support (use prefixes)
- All modern browsers: Full support
