# CSS Grid Layout Architect

A sophisticated visual tool for designing and understanding CSS Grid through interactive experimentation.

## What is CSS Grid?

**CSS Grid** is a two-dimensional layout system that allows you to create complex layouts with rows and columns simultaneously. Unlike Flexbox (which is one-dimensional), Grid excels at creating entire page layouts and complex component structures.

### Key Concepts

#### Grid Container vs Grid Items
- **Grid Container**: The parent element with `display: grid` or `display: inline-grid`
- **Grid Items**: Direct children of the grid container

#### Grid Terminology
- **Grid Line**: The dividing lines that make up the structure of the grid
- **Grid Track**: The space between two adjacent grid lines (a row or column)
- **Grid Cell**: The space between two adjacent row and two adjacent column grid lines
- **Grid Area**: The total space surrounded by four grid lines (can span multiple cells)

#### Explicit vs Implicit Grid
- **Explicit Grid**: Tracks defined with `grid-template-rows` and `grid-template-columns`
- **Implicit Grid**: Tracks automatically created when items are placed outside the explicit grid

### When to Use CSS Grid

✅ **Perfect for:**
- Page layouts (header, sidebar, main, footer)
- Dashboard and admin panel layouts
- Photo galleries and image grids
- Complex card layouts
- Magazine-style layouts
- Any two-dimensional layout

❌ **Not ideal for:**
- Simple one-dimensional layouts (use Flexbox)
- Small component alignment (Flexbox is simpler)

## Features

- **Container Controls**: Configure all grid container properties
  - `display`: grid | inline-grid
  - `grid-template-columns`: Define column tracks (e.g., `repeat(3, 1fr)`, `100px 1fr auto`)
  - `grid-template-rows`: Define row tracks
  - `gap`: Spacing between tracks
  - `justify-items`: Align items horizontally within cells
  - `align-items`: Align items vertically within cells
  - `justify-content`: Align entire grid horizontally
  - `align-content`: Align entire grid vertically
  - `grid-auto-flow`: Control auto-placement algorithm

- **Item Controls**: Position items precisely
  - `grid-column-start` & `grid-column-end`: Span columns
  - `grid-row-start` & `grid-row-end`: Span rows
  - `justify-self`: Override horizontal alignment for specific item
  - `align-self`: Override vertical alignment for specific item

- **Live Preview**: See your grid layout in real-time
- **CSS Output**: Copy-ready CSS code
- **Interactive UI**: Add/remove items, click to select and configure

## How to Use

### Basic Workflow

1. **Open the Tool**: Launch `index.html` in your browser
2. **Define Grid Structure**: Set columns and rows using the sidebar
3. **Adjust Spacing**: Configure gap between tracks
4. **Add/Remove Items**: Use the header buttons
5. **Position Items**: Click an item to span it across multiple cells
6. **Copy CSS**: Use the generated code from the bottom panel

### Common Layout Examples

#### Example 1: Basic 3-Column Layout

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

**Try it:** Set `grid-template-columns: repeat(3, 1fr)`, `gap: 20px`

#### Example 2: Holy Grail Layout

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-column: 1 / 4;
}

.footer {
  grid-column: 1 / 4;
}
```

**Try it:** Set columns to `200px 1fr 200px`, rows to `auto 1fr auto`. Select items and span them across columns.

#### Example 3: Responsive Card Grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

**Try it:** Set `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`

#### Example 4: Dashboard Layout

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 16px;
}

.featured {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
```

**Try it:** Create a 4×3 grid, then make one item span 2 columns and 2 rows

#### Example 5: Magazine Layout

```css
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 100px;
  gap: 10px;
}

.article-1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.article-2 {
  grid-column: 4 / 7;
  grid-row: 1 / 2;
}
```

**Try it:** Create a 6-column grid and position items to create an asymmetric layout

## Understanding Grid Properties

### Container Properties

**`grid-template-columns` / `grid-template-rows`**
- `200px 1fr 200px`: Fixed, flexible, fixed
- `repeat(3, 1fr)`: Three equal columns
- `repeat(auto-fit, minmax(250px, 1fr))`: Responsive columns
- `100px auto 200px`: Fixed, content-sized, fixed

**`gap`** (formerly `grid-gap`)
- `20px`: Same gap for rows and columns
- `20px 10px`: Row gap, column gap

**`justify-items` / `align-items`**
- `stretch`: Fill the cell (default)
- `start`: Align to start of cell
- `end`: Align to end of cell
- `center`: Center in cell

**`justify-content` / `align-content`**
- Controls alignment of the entire grid within the container
- Useful when grid is smaller than container

**`grid-auto-flow`**
- `row`: Fill rows first (default)
- `column`: Fill columns first
- `dense`: Fill gaps with smaller items

### Item Properties

**`grid-column` / `grid-row`** (Shorthand)
- `grid-column: 1 / 3`: Span from line 1 to line 3
- `grid-column: 1 / span 2`: Start at line 1, span 2 tracks
- `grid-column: 1 / -1`: Start at line 1, end at last line

**`grid-column-start` / `grid-column-end`**
- More explicit version of shorthand
- Can use line numbers or `span` keyword

**Line Numbering**
- Lines are numbered from 1
- Negative numbers count from the end (-1 is the last line)
- `span` keyword counts tracks, not lines

## Tips & Best Practices

1. **Use `fr` units** for flexible tracks instead of percentages
2. **`repeat()` function** makes code more maintainable
3. **`auto-fit` vs `auto-fill`**: `auto-fit` collapses empty tracks, `auto-fill` keeps them
4. **`minmax()`** creates responsive grids without media queries
5. **Named grid lines** can make complex layouts more readable
6. **Grid Template Areas** provide a visual way to define layouts
7. **Combine with Flexbox** - use Grid for page layout, Flexbox for components
8. **Use DevTools** - Browser grid inspector is invaluable for debugging

## Advanced Techniques

### Grid Template Areas

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### Subgrid (Modern Browsers)

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
```

## Browser Support

CSS Grid is supported in all modern browsers:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+
- IE 11 (with `-ms-` prefix, limited support)

## Resources

- [MDN CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Tricks Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Grid by Example](https://gridbyexample.com/)
