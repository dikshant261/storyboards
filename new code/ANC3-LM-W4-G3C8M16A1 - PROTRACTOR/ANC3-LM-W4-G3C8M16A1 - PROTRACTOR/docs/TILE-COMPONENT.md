# Tile Component Documentation

## Overview

The `TileComponent` is a React-based flexible tile component with visual mode support. It provides a simple container element that can display content with different visual states (normal, incorrect, correct, focus) and supports standard styling props with coordinates-based positioning.

## Features

- ✅ **Visual Modes**: Four pre-configured visual modes (normal, incorrect, correct, focus)
- ✅ **Standard Styling Props**: Full control over background, border, font, padding, and more
- ✅ **Coordinates-Based Positioning**: Automatic positioning using grid coordinates
- ✅ **Grid Cell Units (gc)**: Support for responsive sizing using grid cell units
- ✅ **Mode Animations**: Automatic animations for incorrect (wiggle) and focus (blink) modes
- ✅ **Flexible Content**: Supports any React children content

## Component Usage

### Basic Example

```javascript
{
  id: "my-tile",
  name: "my-tile",
  type: "custom",
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "normal",
    backgroundColor: "transparent",
    borderColor: "#ffffff",
    borderWidth: "2px",
    borderRadius: "8gc",
    color: "#ffffff",
    fontSize: "28gc",
    padding: "15gc",
    children: "Tile Content"
  }
}
```

## Props Reference

### Required Props

#### `componentType` (string)
Must be set to `"TileComponent"` to use this component.
- **Example**: `componentType: "TileComponent"`

### Core Props

#### `mode` (string, default: `'normal'`)
Visual mode for the tile component.
- **Values**: `'normal'`, `'incorrect'`, `'correct'`, or `'focus'`
- **Modes**:
  - **`'normal'`**: Default appearance (no special styling)
  - **`'incorrect'`**: Salmon background (`#FA8072`), dark salmon border (`#E9967A`), white font, wiggle animation (1000ms)
  - **`'correct'`**: Green background (`#4CAF50`), dark green border (`#45a049`), white font
  - **`'focus'`**: Yellow background (`#FFEB3B`), white solid border, black font, blinking background animation
- **Example**: `mode: "focus"`

### Styling Props

#### `backgroundColor` (string, default: `'transparent'`)
Background color of the tile.
- **Values**: Any valid CSS color value
- **Note**: Overridden by mode styles when mode is set (except 'normal')
- **Example**: `backgroundColor: "#f0f0f0"`

#### `borderColor` (string, default: `'#ffffff'`)
Border color of the tile.
- **Values**: Any valid CSS color value
- **Note**: Overridden by mode styles when mode is set (except 'normal')
- **Example**: `borderColor: "#000000"`

#### `borderWidth` (string, default: `'2px'`)
Width of the tile border.
- **Values**: Any valid CSS border-width value
- **Example**: `borderWidth: "3px"`

#### `borderRadius` (string, default: `'0gc'`)
Border radius of the tile (supports `gc` units).
- **Values**: CSS border-radius value (e.g., `'8gc'`, `'10px'`)
- **Example**: `borderRadius: "8gc"`

#### `color` (string, default: `'#ffffff'`)
Text color of the tile.
- **Values**: Any valid CSS color value
- **Note**: Overridden by mode styles when mode is set (except 'normal')
- **Example**: `color: "#000000"`

#### `fontSize` (string, default: `'28gc'`)
Font size of the tile content (supports `gc` units).
- **Values**: CSS font-size value (e.g., `'28gc'`, `'24px'`)
- **Example**: `fontSize: "32gc"`

#### `fontWeight` (string, default: `'normal'`)
Font weight of the tile content.
- **Values**: CSS font-weight value (e.g., `'normal'`, `'bold'`, `'600'`)
- **Example**: `fontWeight: "bold"`

#### `padding` (string, default: `'15gc'`)
Padding inside the tile (supports `gc` units).
- **Values**: CSS padding value (e.g., `'15gc'`, `'10px'`)
- **Example**: `padding: "20gc"`

#### `textAlign` (string, default: `'center'`)
Text alignment of the tile content.
- **Values**: `'left'`, `'center'`, `'right'`, `'justify'`
- **Example**: `textAlign: "left"`

### Layout Props

#### `coordinates` (array, required)
Coordinates for positioning the tile.
- **Format**: `[x1, y1, x2, y2]`
- **Description**: Defines the tile's position and size on the grid
- **Example**: `coordinates: [100, 100, 300, 200]`

#### `zIndex` (number | string, default: `1000`)
Z-index of the tile.
- **Values**: Number or CSS z-index value
- **Example**: `zIndex: 50`

### Content Props

#### `children` (React.ReactNode, optional)
Content to display inside the tile.
- **Values**: Any valid React children (string, element, array of elements)
- **Example**: `children: "Tile Content"` or `children: React.createElement('div', {}, 'Content')`

## Visual Modes Explained

### `'normal'` Mode
- **Appearance**: Uses all custom styling props (backgroundColor, borderColor, color, etc.)
- **Animation**: None
- **Use Case**: Default state, custom styling

### `'incorrect'` Mode
- **Background**: Salmon (`#FA8072`)
- **Border**: Dark salmon (`#E9967A`), 2px solid
- **Text Color**: White
- **Animation**: Wiggle animation (horizontal shake) for 1000ms
- **Use Case**: Indicates incorrect input or validation failure

### `'correct'` Mode
- **Background**: Green (`#4CAF50`)
- **Border**: Dark green (`#45a049`), 2px solid
- **Text Color**: White
- **Animation**: None
- **Use Case**: Indicates correct input or validation success

### `'focus'` Mode
- **Background**: Yellow (`#FFEB3B`) with blinking animation
- **Border**: White, 2px solid
- **Text Color**: Black
- **Animation**: Background blinks between `#FFEB3B` and `#FFF59D` (infinite loop, 1s duration)
- **Use Case**: Highlights tile for user attention or indicates active element

## Mode Animations

The component uses CSS animations from `animations.css`:

### Wiggle Animation (Incorrect Mode)
- **Class**: `.table-cell-wiggle`
- **Effect**: Horizontal shake animation (translateX ±5px)
- **Duration**: 1000ms, single iteration
- **Trigger**: Automatically applied when mode is set to `'incorrect'`

### Focus Blink Animation (Focus Mode)
- **Class**: `.table-cell-focus-blink`
- **Effect**: Background color alternates between `#FFEB3B` and `#FFF59D`
- **Duration**: 1000ms per cycle, infinite loop
- **Trigger**: Automatically applied when mode is set to `'focus'`

## Complete Examples

### Example 1: Basic Tile

```javascript
{
  id: "basic-tile",
  name: "basic-tile",
  type: "custom",
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "normal",
    backgroundColor: "#f0f0f0",
    borderColor: "#000000",
    borderWidth: "2px",
    borderRadius: "8gc",
    color: "#000000",
    fontSize: "24gc",
    padding: "15gc",
    children: "Basic Tile Content"
  }
}
```

### Example 2: Tile with Focus Mode

```javascript
{
  id: "focus-tile",
  name: "focus-tile",
  type: "custom",
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "focus",
    borderRadius: "10gc",
    fontSize: "32gc",
    fontWeight: "bold",
    padding: "20gc",
    children: "Focus Mode Tile"
  }
}
```

### Example 3: Tile with Correct Mode

```javascript
{
  id: "correct-tile",
  name: "correct-tile",
  type: "custom",
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "correct",
    borderRadius: "8gc",
    fontSize: "28gc",
    padding: "15gc",
    children: "Correct!"
  }
}
```

### Example 4: Tile with Incorrect Mode

```javascript
{
  id: "incorrect-tile",
  name: "incorrect-tile",
  type: "custom",
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "incorrect",
    borderRadius: "8gc",
    fontSize: "28gc",
    padding: "15gc",
    children: "Incorrect. Try again."
  }
}
```

### Example 5: Tile with Custom Content

```javascript
{
  id: "custom-tile",
  name: "custom-tile",
  type: "custom",
  coordinates: [100, 100, 400, 300],
  zIndex: 50,
  props: {
    componentType: "TileComponent",
    mode: "normal",
    backgroundColor: "transparent",
    borderColor: "#FFAB40",
    borderWidth: "3px",
    borderRadius: "15gc",
    color: "#ffffff",
    fontSize: "30gc",
    fontWeight: "bold",
    padding: "20gc",
    textAlign: "center",
    children: [
      React.createElement('div', { key: 'title' }, 'Tile Title'),
      React.createElement('div', { key: 'content' }, 'Tile Content')
    ]
  }
}
```

## Grid Cell Units (gc)

The component supports grid cell units (`gc`) for responsive sizing. These units are automatically converted to pixels based on the grid system configuration.

### Supported Properties with gc Units

- `fontSize`
- `padding`
- `borderRadius`

### Example

```javascript
fontSize: "28gc",        // Responsive font size
padding: "15gc",         // Responsive padding
borderRadius: "8gc"      // Responsive border radius
```

## Mode Precedence

When a mode is set (other than `'normal'`), the mode styles override the corresponding custom styling props:

1. **Mode styles** (when mode is set) take precedence over:
   - `backgroundColor`
   - `borderColor` (replaced by mode-specific border)
   - `color`

2. **Custom props** that are **not overridden** by modes:
   - `borderWidth` (used in mode border definitions)
   - `borderRadius`
   - `fontSize`
   - `fontWeight`
   - `padding`
   - `textAlign`

## Best Practices

1. **Use Appropriate Modes**: Choose the mode that best represents the tile's state
   - Use `'focus'` to draw attention
   - Use `'correct'` for success states
   - Use `'incorrect'` for error states
   - Use `'normal'` for default/custom styling

2. **Set Coordinates Properly**: Always provide valid coordinates for proper positioning
   - Format: `[x1, y1, x2, y2]`
   - Ensure coordinates are within the grid bounds

3. **Use Grid Cell Units**: Use `gc` units for responsive sizing that scales with screen size
   - Example: `fontSize: "30gc"` instead of `fontSize: "18px"`

4. **Combine with Children**: Use the `children` prop to add complex content
   - Can be a string, React element, or array of elements

5. **Set Z-Index Appropriately**: Use z-index to control layering
   - Higher z-index values appear on top
   - Default is 1000

## Troubleshooting

### Tile not visible
- Check that coordinates are valid and within grid bounds
- Verify z-index is not hidden by other elements
- Check browser console for positioning errors

### Mode styles not applying
- Ensure mode value is one of: `'normal'`, `'incorrect'`, `'correct'`, or `'focus'`
- Check that CSS animations are loaded (`animations.css`)
- Verify mode is correctly set in props

### Animations not visible
- Check that CSS animations are loaded (`animations.css`)
- Verify mode is correctly set (animations only apply to `'incorrect'` and `'focus'` modes)
- Ensure the tile is visible (not hidden by CSS)

### GC units not converting
- Ensure `GridCellFontUtils` is loaded before the component
- Check that coordinates are provided for proper conversion
- Verify the property supports gc units (fontSize, padding, borderRadius)

## API Summary

### Props Summary Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentType` | String | Required | Must be `"TileComponent"` |
| `mode` | String | `'normal'` | Visual mode (normal, incorrect, correct, focus) |
| `backgroundColor` | String | `'transparent'` | Background color |
| `borderColor` | String | `'#ffffff'` | Border color |
| `borderWidth` | String | `'2px'` | Border width |
| `borderRadius` | String | `'0gc'` | Border radius (supports gc) |
| `color` | String | `'#ffffff'` | Text color |
| `fontSize` | String | `'28gc'` | Font size (supports gc) |
| `fontWeight` | String | `'normal'` | Font weight |
| `padding` | String | `'15gc'` | Padding (supports gc) |
| `textAlign` | String | `'center'` | Text alignment |
| `coordinates` | Array | Required | `[x1, y1, x2, y2]` positioning |
| `zIndex` | Number/String | `1000` | Z-index value |
| `children` | ReactNode | Optional | Tile content |

## Version History

- **v1.0.0**: Initial release with mode support (normal, incorrect, correct, focus)

## Support

For issues or questions, please refer to the component source code in `js/components/tile-component.js`.

