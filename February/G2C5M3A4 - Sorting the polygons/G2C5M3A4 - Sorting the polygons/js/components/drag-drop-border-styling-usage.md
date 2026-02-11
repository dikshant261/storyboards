# Drag-Drop Component Border Styling & Layout Configuration

## Overview

The `DragDropGame` component now supports customizable border styles and layout orientation for each of the three containers:
1. **Unsorted Container** - where images start
2. **Drop Zone 1** - first drop zone (typically "Equal Parts")
3. **Drop Zone 2** - second drop zone (typically "Unequal Parts")

## Border Style Props

Each container has four border customization props:

### Unsorted Container Props
- `unsortedBorderColor` - Color of the border (CSS color value)
- `unsortedBorderWidth` - Width of the border (supports 'gc' units or regular CSS units)
- `unsortedBorderRadius` - Radius of the border corners (supports 'gc' units or regular CSS units)
- `unsortedBorderStyle` - Style of the border: `'solid'`, `'dashed'`, or `'dotted'`
- `unsortedColumns` - Number of columns for image layout (default: 2)
- `unsortedRows` - Number of rows for image layout (default: 2)

### Drop Zone 1 Props (Equal Parts)
- `dropZone1BorderColor` - Color of the border
- `dropZone1BorderWidth` - Width of the border
- `dropZone1BorderRadius` - Radius of the border corners
- `dropZone1BorderStyle` - Style of the border

### Drop Zone 2 Props (Unequal Parts)
- `dropZone2BorderColor` - Color of the border
- `dropZone2BorderWidth` - Width of the border
- `dropZone2BorderRadius` - Radius of the border corners
- `dropZone2BorderStyle` - Style of the border

## Default Values

If you don't specify these props, the component uses these defaults:

### Unsorted Container Defaults:
- `borderColor`: `'rgba(255, 255, 255, 0.2)'` (semi-transparent white)
- `borderWidth`: `'4gc'` (4 pixels)
- `borderRadius`: `'12gc'` (12 pixels)
- `borderStyle`: `'solid'`
- `columns`: `2` (2 columns)
- `rows`: `2` (2 rows)

### Drop Zone Defaults (both zones):
- `borderColor`: `'rgba(255, 255, 255, 0.3)'` (semi-transparent white)
- `borderWidth`: `'4gc'` (4 pixels)
- `borderRadius`: `'12gc'` (12 pixels)
- `borderStyle`: `'dashed'`

## Usage Examples

### Example 1: Basic Usage (Using Defaults)

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  onComplete: () => console.log('Game completed!'),
  unsortedCoordinates: [725, 130, 1580, 340],
  dropZone1Coordinates: [725, 115, 1130, 690],
  dropZone2Coordinates: [1175, 115, 1580, 690]
})
```

### Example 2: Custom Border Colors

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  unsortedCoordinates: [725, 130, 1580, 340],
  dropZone1Coordinates: [725, 115, 1130, 690],
  dropZone2Coordinates: [1175, 115, 1580, 690],
  
  // Custom colors for each container
  unsortedBorderColor: '#FFD700', // Gold
  dropZone1BorderColor: '#4CAF50', // Green
  dropZone2BorderColor: '#FF5722'  // Red-orange
})
```

### Example 3: Different Border Styles

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  unsortedCoordinates: [725, 130, 1580, 340],
  dropZone1Coordinates: [725, 115, 1130, 690],
  dropZone2Coordinates: [1175, 115, 1580, 690],
  
  // Different border styles
  unsortedBorderStyle: 'solid',
  dropZone1BorderStyle: 'dotted',
  dropZone2BorderStyle: 'dashed'
})
```

### Example 4: Custom Border Widths and Radius

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  unsortedCoordinates: [725, 130, 1580, 340],
  dropZone1Coordinates: [725, 115, 1130, 690],
  dropZone2Coordinates: [1175, 115, 1580, 690],
  
  // Custom widths using 'gc' units
  unsortedBorderWidth: '6gc',
  dropZone1BorderWidth: '3gc',
  dropZone2BorderWidth: '5gc',
  
  // Custom border radius
  unsortedBorderRadius: '20gc',
  dropZone1BorderRadius: '16gc',
  dropZone2BorderRadius: '8gc'
})
```

### Example 5: Full Customization

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  onComplete: handleGameComplete,
  onImageDropped: handleImageDrop,
  unsortedCoordinates: [725, 130, 1580, 340],
  dropZone1Coordinates: [725, 115, 1130, 690],
  dropZone2Coordinates: [1175, 115, 1580, 690],
  
  // Unsorted container - solid blue border
  unsortedBorderColor: '#2196F3',
  unsortedBorderWidth: '5gc',
  unsortedBorderRadius: '15gc',
  unsortedBorderStyle: 'solid',
  
  // Drop Zone 1 - dotted green border
  dropZone1BorderColor: 'rgba(76, 175, 80, 0.8)',
  dropZone1BorderWidth: '4gc',
  dropZone1BorderRadius: '12gc',
  dropZone1BorderStyle: 'dotted',
  
  // Drop Zone 2 - dashed orange border
  dropZone2BorderColor: 'rgba(255, 152, 0, 0.8)',
  dropZone2BorderWidth: '4gc',
  dropZone2BorderRadius: '12gc',
  dropZone2BorderStyle: 'dashed'
})
```

### Example 6: Using in PageConfig.js

```javascript
{
  type: 'drag-drop-game',
  props: {
    questionIndex: 0,
    onComplete: () => {
      console.log('All images sorted correctly!');
      // Enable next button logic here
    },
    unsortedCoordinates: [725, 130, 1580, 340],
    dropZone1Coordinates: [725, 115, 1130, 690],
    dropZone2Coordinates: [1175, 115, 1580, 690],
    
    // Border styling
    unsortedBorderColor: '#FFD700',
    unsortedBorderWidth: '4gc',
    unsortedBorderRadius: '12gc',
    unsortedBorderStyle: 'solid',
    
    dropZone1BorderColor: 'rgba(74, 144, 226, 0.6)',
    dropZone1BorderWidth: '4gc',
    dropZone1BorderRadius: '12gc',
    dropZone1BorderStyle: 'dashed',
    
    dropZone2BorderColor: 'rgba(255, 149, 0, 0.6)',
    dropZone2BorderWidth: '4gc',
    dropZone2BorderRadius: '12gc',
    dropZone2BorderStyle: 'dashed'
  }
}
```

## Layout Orientation

### Unsorted Container Layout Props

The unsorted container supports flexible grid layouts using `unsortedColumns` and `unsortedRows` props:

**Examples:**

- **1 column, 4 rows** (vertical stack):
```javascript
unsortedColumns: 1,
unsortedRows: 4
```

- **4 columns, 1 row** (horizontal line):
```javascript
unsortedColumns: 4,
unsortedRows: 1
```

- **2 columns, 2 rows** (default, 2x2 grid):
```javascript
unsortedColumns: 2,
unsortedRows: 2
```

### Example 7: Vertical Layout (1 column, 4 rows)

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  unsortedCoordinates: [410, 10, 720, 710],
  dropZone1Coordinates: [725, 125, 1130, 710],
  dropZone2Coordinates: [1175, 125, 1580, 710],
  
  // Vertical layout - single column with 4 rows
  unsortedColumns: 1,
  unsortedRows: 4,
  
  unsortedBorderColor: 'rgba(255, 255, 255, 0.3)',
  unsortedBorderWidth: '4gc',
  unsortedBorderRadius: '12gc',
  unsortedBorderStyle: 'solid'
})
```

### Example 8: Horizontal Layout (4 columns, 1 row)

```javascript
React.createElement(DragDropGame, {
  questionIndex: 0,
  unsortedCoordinates: [100, 50, 1500, 250],
  dropZone1Coordinates: [100, 300, 750, 800],
  dropZone2Coordinates: [850, 300, 1500, 800],
  
  // Horizontal layout - single row with 4 columns
  unsortedColumns: 4,
  unsortedRows: 1,
  
  unsortedBorderColor: '#4A90E2',
  unsortedBorderWidth: '4gc',
  unsortedBorderRadius: '12gc',
  unsortedBorderStyle: 'solid'
})
```

### Example 9: Complete PageConfig with Layout

```javascript
{
  type: 'drag-drop-game',
  props: {
    questionIndex: 0,
    unsortedCoordinates: [410, 10, 720, 710],
    dropZone1Coordinates: [725, 125, 1130, 710],
    dropZone2Coordinates: [1175, 125, 1580, 710],
    
    // Vertical layout for unsorted container
    unsortedColumns: 1,
    unsortedRows: 4,
    
    // Border styling
    unsortedBorderColor: 'rgba(255, 255, 255, 0.3)',
    unsortedBorderWidth: '4gc',
    unsortedBorderRadius: '12gc',
    unsortedBorderStyle: 'solid',
    
    dropZone1BorderColor: 'rgba(74, 144, 226, 0.5)',
    dropZone1BorderWidth: '4gc',
    dropZone1BorderRadius: '12gc',
    dropZone1BorderStyle: 'dashed',
    
    dropZone2BorderColor: 'rgba(255, 149, 0, 0.5)',
    dropZone2BorderWidth: '4gc',
    dropZone2BorderRadius: '12gc',
    dropZone2BorderStyle: 'dashed',
    
    onComplete: () => console.log('Game complete!'),
    onImageDropped: (correct) => console.log(correct ? 'Correct!' : 'Try again!')
  }
}
```

## Notes on 'gc' Units

- The `gc` unit is a custom unit used in this project
- When you use a value like `'4gc'`, it will be converted to `'4px'` internally
- You can also use regular CSS units like `'4px'`, `'0.5rem'`, etc.
- The conversion assumes 1gc = 1px

## Border Styles

Three border styles are supported:
- **`'solid'`** - Continuous solid line
- **`'dashed'`** - Series of dashes
- **`'dotted'`** - Series of dots

## Color Formats

You can use any valid CSS color format:
- Hex: `'#FF0000'`, `'#F00'`
- RGB: `'rgb(255, 0, 0)'`
- RGBA: `'rgba(255, 0, 0, 0.5)'` (with transparency)
- Named colors: `'red'`, `'blue'`, etc.
- HSL: `'hsl(0, 100%, 50%)'`

## Hover State

When a user drags an image over a drop zone, the drop zone will automatically change to:
- Border: `4px solid #4A90E2` (blue)
- Background: `rgba(74, 144, 226, 0.1)` (light blue tint)

This hover state temporarily overrides your custom border styling to provide clear visual feedback.

## Tips

1. **Contrast**: Make sure border colors have good contrast with the background
2. **Consistency**: Use similar border widths across all containers for visual harmony
3. **Accessibility**: Avoid relying solely on color to distinguish containers
4. **Performance**: These props are applied as inline styles, so changes are immediate

