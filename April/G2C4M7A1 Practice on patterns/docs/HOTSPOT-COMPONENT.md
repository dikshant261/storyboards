# Hotspot Component Documentation

## Overview

The `HotspotComponent` is a React-based clickable circular hotspot component designed to indicate interactive areas on the page. It features a pulse animation to draw attention and supports customizable styling and click handlers.

## Features

- ✅ **Circular Design**: Perfectly circular hotspot using `border-radius: 50%`
- ✅ **Pulse Animation**: Automatic pulse animation to draw attention (can be disabled)
- ✅ **Click Handler**: Customizable onClick callback function
- ✅ **Hover Effects**: Scale and glow effects on hover
- ✅ **Coordinates-Based Positioning**: Automatic positioning using grid coordinates
- ✅ **Grid Cell Units (gc)**: Support for responsive sizing using grid cell units
- ✅ **Customizable Styling**: Full control over colors, size, border, and more
- ✅ **Sound Effects**: Optional click sound integration
- ✅ **Accessibility**: Keyboard navigation support (Enter/Space keys)

## Component Usage

### Basic Example

```javascript
{
  id: "map-hotspot-1",
  name: "map-hotspot-1",
  type: "custom",
  coordinates: [400, 300, 500, 400],
  zIndex: 100,
  props: {
    componentType: "HotspotComponent",
    size: "40gc",
    backgroundColor: "rgba(255, 153, 0, 0.6)",
    borderColor: "#FF9900",
    borderWidth: "3px",
    animated: true,
    onClick: (e) => {
      console.log("Hotspot clicked!");
    }
  }
}
```

## Props Reference

### Required Props

#### `componentType` (string)
Must be set to `"HotspotComponent"` to use this component.
- **Example**: `componentType: "HotspotComponent"`

### Core Props

#### `size` (string, default: `'40gc'`)
Diameter of the circular hotspot (supports `gc` units or pixels).
- **Values**: Size string with units (e.g., `'40gc'`, `'50px'`, `'60gc'`)
- **Note**: Since it's circular, width and height are both set to this value
- **Example**: `size: "50gc"`

#### `innerCircleSize` (string, default: `'5gc'`)
Diameter of the inner solid circle (supports `gc` units or pixels).
- **Values**: Size string with units (e.g., `'5gc'`, `'8px'`, `'10gc'`)
- **Note**: The inner circle is centered and uses the border color (or black if border is transparent)
- **Example**: `innerCircleSize: "8gc"`

#### `animated` (boolean, default: `true`)
Whether to show the pulse animation.
- **Values**: `true` or `false`
- **When `true`**: Shows continuous pulse animation
- **When `false`**: No animation, static appearance
- **Example**: `animated: true`

#### `onClick` (Function, optional)
Click handler function called when the hotspot is clicked.
- **Signature**: `(event) => void`
- **Parameters**:
  - `event`: React synthetic event
- **Behavior**:
  - Stops event propagation
  - Plays click sound if available (`window.playCarClickSound('hotspot')`)
  - Calls the provided onClick function
- **Example**: 
  ```javascript
  onClick: (e) => {
    console.log("Hotspot clicked!");
    // Your custom logic here
  }
  ```

### Styling Props

#### `backgroundColor` (string, default: `'rgba(255, 153, 0, 0.6)'`)
Background color of the hotspot.
- **Values**: Any valid CSS color value (supports rgba for transparency)
- **Default**: Semi-transparent orange
- **Example**: `backgroundColor: "rgba(255, 0, 0, 0.5)"`

#### `borderColor` (string, default: `'#FF9900'`)
Border color of the hotspot.
- **Values**: Any valid CSS color value
- **Default**: Orange (`#FF9900`)
- **Example**: `borderColor: "#FF0000"`

#### `borderWidth` (string, default: `'3gc'`)
Width of the hotspot border (supports `gc` units or pixels).
- **Values**: Any valid CSS border-width value (e.g., `'3gc'`, `'4px'`)
- **Note**: Supports grid cell units (`gc`) for responsive sizing
- **Example**: `borderWidth: "4gc"` or `borderWidth: "3px"`

#### `cursor` (string, default: `'pointer'`)
Cursor style when hovering over the hotspot.
- **Values**: CSS cursor value (e.g., `'pointer'`, `'hand'`, `'grab'`)
- **Example**: `cursor: "pointer"`

### Layout Props

#### `coordinates` (array, required)
Coordinates for positioning the hotspot.
- **Format**: `[x1, y1, x2, y2]`
- **Description**: Defines the area where the hotspot should be centered
- **Behavior**: Hotspot is automatically centered on the coordinates
- **Example**: `coordinates: [400, 300, 500, 400]`

#### `zIndex` (number | string, default: `1000`)
Z-index of the hotspot.
- **Values**: Number or CSS z-index value
- **Example**: `zIndex: 100`

### Content Props

#### `children` (React.ReactNode, optional)
Optional content to display inside the hotspot.
- **Values**: Any valid React children (string, element, array of elements)
- **Note**: Content is centered within the circular hotspot
- **Example**: `children: "?"` or `children: React.createElement('span', {}, 'Click')`

## Pulse Animation

The hotspot includes a pulse animation that draws attention to the clickable area.

### Animation Details

- **Class**: `.hotspot-pulse`
- **Effect**: Expanding box-shadow pulse effect
- **Duration**: 2 seconds per cycle
- **Loop**: Infinite
- **Trigger**: Automatically applied when `animated: true`

### Animation Behavior

- **Start/End**: Box-shadow starts at `0 0 0 0` (no shadow) and expands to `0 0 0 10px` (fading out)
- **Opacity**: Slightly decreases during pulse (1.0 → 0.9 → 1.0)
- **Purpose**: Creates a "ripple" effect that draws the eye to the hotspot

### Disabling Animation

Set `animated: false` to disable the pulse animation:

```javascript
{
  animated: false  // No pulse animation
}
```

## Hover Effects

The hotspot includes interactive hover effects:

- **Scale**: Grows to 110% size on hover
- **Glow**: Adds a box-shadow glow effect using the border color
- **Transition**: Smooth 0.2s transition for all effects

## Complete Examples

### Example 1: Basic Animated Hotspot

```javascript
{
  id: "basic-hotspot",
  name: "basic-hotspot",
  type: "custom",
  coordinates: [400, 300, 500, 400],
  zIndex: 100,
  props: {
    componentType: "HotspotComponent",
    size: "40gc",
    backgroundColor: "rgba(255, 153, 0, 0.6)",
    borderColor: "#FF9900",
    borderWidth: "3px",
    animated: true,
    onClick: () => {
      alert("Hotspot clicked!");
    }
  }
}
```

### Example 2: Large Non-Animated Hotspot

```javascript
{
  id: "large-hotspot",
  name: "large-hotspot",
  type: "custom",
  coordinates: [200, 200, 400, 400],
  zIndex: 100,
  props: {
    componentType: "HotspotComponent",
    size: "80gc",
    backgroundColor: "rgba(0, 150, 255, 0.5)",
    borderColor: "#0096FF",
    borderWidth: "4px",
    animated: false,
    onClick: (e) => {
      console.log("Large hotspot clicked");
    }
  }
}
```

### Example 3: Hotspot with Content

```javascript
{
  id: "hotspot-with-icon",
  name: "hotspot-with-icon",
  type: "custom",
  coordinates: [500, 500, 600, 600],
  zIndex: 100,
  props: {
    componentType: "HotspotComponent",
    size: "50gc",
    backgroundColor: "rgba(255, 0, 0, 0.6)",
    borderColor: "#FF0000",
    borderWidth: "3px",
    animated: true,
    children: "?",
    onClick: () => {
      showHint();
    }
  }
}
```

### Example 4: Custom Styled Hotspot

```javascript
{
  id: "custom-hotspot",
  name: "custom-hotspot",
  type: "custom",
  coordinates: [300, 300, 400, 400],
  zIndex: 150,
  props: {
    componentType: "HotspotComponent",
    size: "60gc",
    backgroundColor: "rgba(0, 255, 0, 0.4)",
    borderColor: "#00FF00",
    borderWidth: "5px",
    animated: true,
    cursor: "grab",
    onClick: (e) => {
      handleHotspotClick(e);
    }
  }
}
```

## Grid Cell Units (gc)

The component supports grid cell units (`gc`) for responsive sizing. These units are automatically converted to pixels based on the grid system configuration.

### Supported Properties with gc Units

- `size` (diameter of the circular hotspot)

### Example

```javascript
size: "40gc"  // Responsive size that scales with screen size
```

## Click Handler Integration

The hotspot component integrates with the app's sound system:

- **Automatic Sound**: Plays click sound via `window.playCarClickSound('hotspot')` if available
- **Event Handling**: Stops event propagation to prevent bubbling
- **Custom Logic**: Execute any custom logic in the onClick handler

### Example with Custom Logic

```javascript
{
  onClick: (e) => {
    // Show information
    showInfoDialog();
    
    // Update state
    setHotspotClicked(true);
    
    // Navigate
    navigateToPage(2);
    
    // Track analytics
    trackEvent('hotspot_clicked', { id: 'map-hotspot-1' });
  }
}
```

## Accessibility

The hotspot component includes accessibility features:

- **Keyboard Navigation**: Supports Enter and Space keys to trigger click
- **ARIA Label**: Includes `aria-label="Clickable hotspot"` for screen readers
- **Role**: Set to `role="button"` for proper semantic meaning
- **Tab Index**: Set to `0` for keyboard focus

## Best Practices

1. **Size Appropriately**: Choose a size that's easily clickable but not too large
   - Recommended: `40gc` to `60gc` for most use cases
   - Larger hotspots: `80gc` to `100gc` for important areas

2. **Use Animation Sparingly**: Enable animation only for hotspots that need attention
   - Use `animated: true` for important interactive areas
   - Use `animated: false` for secondary hotspots

3. **Position Carefully**: Place hotspots at the center of the interactive area
   - Coordinates define the area, hotspot centers automatically
   - Ensure coordinates don't overlap with other important elements

4. **Provide Clear Feedback**: Use onClick handler to provide user feedback
   - Show visual feedback (dialogs, highlights)
   - Play sounds for confirmation
   - Update UI state

5. **Use Appropriate Colors**: Choose colors that stand out but fit the design
   - Default orange works well for most cases
   - Use red for warnings/errors
   - Use green for success/positive actions
   - Use blue for information

6. **Set Z-Index Appropriately**: Ensure hotspots appear above other elements
   - Default: `1000`
   - Increase for important hotspots
   - Decrease if hotspot should be behind other elements

## Troubleshooting

### Hotspot not visible
- Check that coordinates are valid and within grid bounds
- Verify z-index is high enough (not hidden by other elements)
- Check browser console for positioning errors
- Ensure size is not `0` or too small

### Animation not working
- Check that `animated: true` is set
- Verify CSS animations are loaded (`animations.css`)
- Check browser console for CSS errors
- Ensure the hotspot is visible (not hidden by CSS)

### Click not working
- Verify `onClick` handler is provided
- Check browser console for JavaScript errors
- Ensure hotspot is not covered by another element (check z-index)
- Verify coordinates place hotspot in visible area

### Positioning incorrect
- Check that coordinates are in correct format `[x1, y1, x2, y2]`
- Verify gridPositions is loaded and working
- Check browser console for position calculation errors
- Ensure elementName or id is provided for position lookup

### GC units not converting
- Ensure `GridCellFontUtils` is loaded before the component
- Check that coordinates are provided for proper conversion
- Verify the property supports gc units (size)

## API Summary

### Props Summary Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentType` | String | Required | Must be `"HotspotComponent"` |
| `size` | String | `'40gc'` | Diameter of circular hotspot (supports gc) |
| `animated` | Boolean | `true` | Enable/disable pulse animation |
| `onClick` | Function | Optional | Click handler function |
| `backgroundColor` | String | `'rgba(255, 153, 0, 0.6)'` | Background color |
| `borderColor` | String | `'#FF9900'` | Border color |
| `borderWidth` | String | `'3gc'` | Border width (supports gc) |
| `innerCircleSize` | String | `'5gc'` | Inner circle size (supports gc) |
| `cursor` | String | `'pointer'` | Cursor style |
| `coordinates` | Array | Required | `[x1, y1, x2, y2]` positioning |
| `zIndex` | Number/String | `1000` | Z-index value |
| `children` | ReactNode | Optional | Content inside hotspot |

## Version History

- **v1.0.0**: Initial release with pulse animation and click handler support

## Support

For issues or questions, please refer to the component source code in `js/components/hotspot-component.js`.

