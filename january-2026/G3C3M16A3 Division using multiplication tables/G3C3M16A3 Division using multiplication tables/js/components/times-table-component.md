# TimesTableComponent Documentation

A reusable React component for generating multiplication tables with automatic cell height calculation to fit within specified coordinates.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Props](#props)
- [Auto Cell Height Calculation](#auto-cell-height-calculation)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The `TimesTableComponent` is a specialized React component that generates multiplication tables (e.g., "4 × 1 = 4", "4 × 2 = 8") with automatic cell height calculation. It ensures all rows fit perfectly within the provided coordinate boundaries, making it ideal for educational applications where space constraints are important.

### Key Features

- ✅ **Automatic Cell Height Calculation**: Automatically calculates optimal cell heights to fit within coordinates
- ✅ **Flexible Range**: Support for any multiplier and range (not just 1-10)
- ✅ **Customizable Styling**: Full control over colors, fonts, spacing, and borders
- ✅ **Optional Header**: Support for header rows with custom text
- ✅ **Performance Optimized**: Uses React.memo and useMemo for efficient rendering
- ✅ **Grid Coordinate Support**: Works seamlessly with the app's grid coordinate system

## Installation

The component is automatically loaded when included in your HTML file:

```html
<script src="js/components/table-grid-component.js"></script>
<script src="js/components/times-table-component.js"></script>
```

**Important**: `table-grid-component.js` must be loaded before `times-table-component.js` as it's a dependency.

## Basic Usage

### In PageConfig.js

```javascript
{
  id: 'page3-multiplication-table',
  name: 'multiplication-table',
  type: 'custom',
  coordinates: [1125, 120, 1565, 700],
  zIndex: 52,
  props: () => {
    const question = getCurrentDivisionQuestion();
    const multiplier = question?.quotient || 4;
    
    return {
      componentType: 'TimesTableComponent',
      multiplier: multiplier,
      rangeStart: 1,
      rangeEnd: 10,
      coordinates: [1125, 120, 1565, 700]
    };
  }
}
```

### Direct React Usage

```javascript
const TimesTableComponent = window.TimesTableComponent?.TimesTableComponent;

React.createElement(TimesTableComponent, {
  multiplier: 5,
  rangeStart: 1,
  rangeEnd: 10,
  coordinates: [100, 50, 500, 600]
});
```

## API Reference

### Component

```typescript
TimesTableComponent: React.Component<TimesTableProps>
```

### Props Interface

```typescript
interface TimesTableProps {
  // Required
  coordinates: [number, number, number, number]; // [x1, y1, x2, y2]
  
  // Core Configuration
  multiplier?: number;           // Default: 1
  rangeStart?: number;            // Default: 1
  rangeEnd?: number;              // Default: 10
  showHeader?: boolean;           // Default: false
  headerText?: string;            // Default: "Table of {multiplier}"
  
  // Styling
  fontSize?: string;             // Default: '32gc'
  textColor?: string;             // Default: '#000000'
  cellBackgroundColor?: string;  // Default: '#E0E0E0'
  cellBorderRadius?: string;      // Default: '8gc'
  padding?: string;               // Default: '10gc'
  borderWidth?: string;           // Default: '0px'
  textAlign?: string;             // Default: 'center'
  fontWeight?: string;             // Default: 'normal'
  backgroundColor?: string;        // Default: 'transparent'
  
  // Spacing
  rowGap?: string;                // Default: '8gc'
  columnGap?: string;             // Default: '0gc'
  
  // Layout
  equalColumnWidths?: boolean;    // Default: true
  equalRowHeights?: boolean;       // Default: true
  
  // Additional props passed to TableGridComponent
  [key: string]: any;
}
```

## Props

### Required Props

#### `coordinates`
- **Type**: `[number, number, number, number]`
- **Description**: Array of 4 numbers defining the table boundaries in grid coordinates
- **Format**: `[left, top, right, bottom]` or `[x1, y1, x2, y2]`
- **Example**: `[1125, 120, 1565, 700]`
- **Note**: Used for automatic cell height calculation. Must be provided.

### Core Configuration Props

#### `multiplier`
- **Type**: `number`
- **Default**: `1`
- **Description**: The number to multiply (e.g., 4 for "4 × 1 = 4", "4 × 2 = 8")
- **Example**: `4` generates: "4 × 1 = 4", "4 × 2 = 8", "4 × 3 = 12", etc.

#### `rangeStart`
- **Type**: `number`
- **Default**: `1`
- **Description**: Starting value for the multiplier range (inclusive)
- **Example**: `1` starts from "4 × 1 = 4"

#### `rangeEnd`
- **Type**: `number`
- **Default**: `10`
- **Description**: Ending value for the multiplier range (inclusive)
- **Example**: `10` ends with "4 × 10 = 40"

#### `showHeader`
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to display a header row above the table
- **Example**: `true` adds a header row

#### `headerText`
- **Type**: `string`
- **Default**: `"Table of {multiplier}"`
- **Description**: Custom header text. Only used if `showHeader` is `true`
- **Example**: `"Multiplication Table of 5"`

### Styling Props

#### `fontSize`
- **Type**: `string`
- **Default**: `'32gc'`
- **Description**: Font size for table text. Supports `gc` (grid coordinates) or `px` (pixels)
- **Examples**: `'32gc'`, `'24px'`, `'28gc'`

#### `textColor`
- **Type**: `string`
- **Default**: `'#000000'`
- **Description**: Text color in hex format
- **Examples**: `'#000000'` (black), `'#333333'` (dark gray), `'#FFFFFF'` (white)

#### `cellBackgroundColor`
- **Type**: `string`
- **Default**: `'#E0E0E0'`
- **Description**: Background color for all cells in hex format
- **Examples**: `'#E0E0E0'` (light gray), `'#F5F5F5'` (very light gray), `'#FFFFFF'` (white)

#### `cellBorderRadius`
- **Type**: `string`
- **Default**: `'8gc'`
- **Description**: Border radius for individual cells
- **Examples**: `'8gc'`, `'10px'`, `'0gc'` (square corners)

#### `padding`
- **Type**: `string`
- **Default**: `'10gc'`
- **Description**: Padding inside each cell
- **Examples**: `'10gc'`, `'15px'`, `'8gc'`

#### `borderWidth`
- **Type**: `string`
- **Default**: `'0px'`
- **Description**: Border width for cells. Set to `'0px'` for no border
- **Examples**: `'0px'` (no border), `'2px'`, `'1gc'`

#### `textAlign`
- **Type**: `string`
- **Default**: `'center'`
- **Description**: Text alignment within cells
- **Options**: `'left'`, `'center'`, `'right'`

#### `fontWeight`
- **Type**: `string`
- **Default**: `'normal'`
- **Description**: Font weight
- **Options**: `'normal'`, `'bold'`, `'100'`, `'200'`, `'300'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`

#### `backgroundColor`
- **Type**: `string`
- **Default**: `'transparent'`
- **Description**: Background color for the entire table container
- **Examples**: `'transparent'`, `'#FFFFFF'`, `'rgba(0,0,0,0.1)'`

### Spacing Props

#### `rowGap`
- **Type**: `string`
- **Default**: `'8gc'`
- **Description**: Gap between rows in grid coordinates (gc) or pixels (px). Used in cell height calculation
- **Examples**: `'8gc'`, `'10px'`, `'5gc'`
- **Note**: This value is factored into the automatic cell height calculation

#### `columnGap`
- **Type**: `string`
- **Default**: `'0gc'`
- **Description**: Gap between columns
- **Examples**: `'0gc'`, `'5px'`, `'10gc'`

### Layout Props

#### `equalColumnWidths`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether all columns should have equal width

#### `equalRowHeights`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether all rows should have equal height (automatically calculated)

## Auto Cell Height Calculation

The component automatically calculates cell heights to ensure all rows fit perfectly within the provided coordinates. This is the core feature that makes the component space-efficient.

### Calculation Formula

```
tableHeight = coordinates[3] - coordinates[1]  // y2 - y1
numDataRows = rangeEnd - rangeStart + 1
numRows = numDataRows + (showHeader ? 1 : 0)
totalRowGaps = (numRows - 1) × rowGapValue
availableHeight = tableHeight - totalRowGaps
cellHeight = floor(availableHeight / numRows)
```

### Example Calculation

Given:
- **Coordinates**: `[1125, 120, 1565, 700]`
- **Range**: `1-10` (10 rows)
- **Row Gap**: `8gc`
- **Show Header**: `false`

Calculation:
1. `tableHeight = 700 - 120 = 580gc`
2. `numDataRows = 10 - 1 + 1 = 10`
3. `numRows = 10 + 0 = 10`
4. `totalRowGaps = (10 - 1) × 8 = 72gc`
5. `availableHeight = 580 - 72 = 508gc`
6. `cellHeight = floor(508 / 10) = 50gc`

Result: Each cell will be `50gc` tall, ensuring all 10 rows fit perfectly within the 580gc height.

### Important Notes

- The calculation uses `Math.floor()` to ensure cells don't overflow the container
- Row gaps are automatically factored into the calculation
- If coordinates are invalid, the component falls back to a default cell height of `40gc`
- The calculation is memoized for performance

## Examples

### Example 1: Basic Multiplication Table

```javascript
{
  componentType: 'TimesTableComponent',
  multiplier: 4,
  rangeStart: 1,
  rangeEnd: 10,
  coordinates: [1125, 120, 1565, 700]
}
```

**Output**: Generates "4 × 1 = 4" through "4 × 10 = 40"

### Example 2: Custom Styling

```javascript
{
  componentType: 'TimesTableComponent',
  multiplier: 6,
  rangeStart: 1,
  rangeEnd: 12,
  coordinates: [100, 50, 500, 600],
  fontSize: '28gc',
  textColor: '#333333',
  cellBackgroundColor: '#F0F0F0',
  cellBorderRadius: '10gc',
  padding: '15gc',
  rowGap: '10gc'
}
```

### Example 3: With Header

```javascript
{
  componentType: 'TimesTableComponent',
  multiplier: 5,
  showHeader: true,
  headerText: 'Multiplication Table of 5',
  rangeStart: 1,
  rangeEnd: 10,
  coordinates: [100, 50, 500, 600]
}
```

### Example 4: Extended Range

```javascript
{
  componentType: 'TimesTableComponent',
  multiplier: 7,
  rangeStart: 1,
  rangeEnd: 20,  // Extended to 20 rows
  coordinates: [100, 50, 500, 800],  // Taller container
  rowGap: '5gc'  // Smaller gap to fit more rows
}
```

### Example 5: Dynamic Multiplier from Question Data

```javascript
props: () => {
  const getQuestion = typeof window !== 'undefined' && window.getCurrentDivisionQuestion 
    ? window.getCurrentDivisionQuestion 
    : getCurrentDivisionQuestion;
  const question = getQuestion();
  const multiplier = question && question.quotient ? question.quotient : 4;
  
  return {
    componentType: 'TimesTableComponent',
    multiplier: multiplier,
    rangeStart: 1,
    rangeEnd: 10,
    coordinates: [1125, 120, 1565, 700],
    fontSize: '32gc',
    textColor: '#000000',
    cellBackgroundColor: '#E0E0E0'
  };
}
```

### Example 6: With Borders

```javascript
{
  componentType: 'TimesTableComponent',
  multiplier: 3,
  rangeStart: 1,
  rangeEnd: 10,
  coordinates: [100, 50, 500, 600],
  borderWidth: '2px',
  cellBackgroundColor: '#FFFFFF',
  textColor: '#000000'
}
```

## Best Practices

### 1. Always Provide Coordinates

The `coordinates` prop is required for automatic cell height calculation. Make sure to provide valid coordinates that match your container boundaries.

```javascript
// ✅ Good
coordinates: [1125, 120, 1565, 700]

// ❌ Bad - Missing coordinates
// Component will fall back to default cell height
```

### 2. Match Coordinates to Container

Ensure your coordinates match the actual container boundaries where the table will be displayed:

```javascript
// If your container is at [1110, 100, 1575, 800]
// Use coordinates with padding:
coordinates: [1125, 120, 1565, 700]  // 15gc padding on all sides
```

### 3. Consider Row Gap in Calculations

When planning your layout, remember that row gaps are factored into the cell height calculation:

```javascript
// For 10 rows with 8gc gap:
// Total gap space = 9 × 8 = 72gc
// This is automatically subtracted from available height
```

### 4. Use Dynamic Multipliers

For educational apps, use dynamic multipliers from question data:

```javascript
props: () => {
  const question = getCurrentDivisionQuestion();
  return {
    componentType: 'TimesTableComponent',
    multiplier: question.quotient,  // Dynamic based on current question
    coordinates: [1125, 120, 1565, 700]
  };
}
```

### 5. Consistent Styling

Use consistent styling across your app:

```javascript
const tableStyle = {
  fontSize: '32gc',
  textColor: '#000000',
  cellBackgroundColor: '#E0E0E0',
  cellBorderRadius: '8gc',
  padding: '10gc',
  rowGap: '8gc'
};

// Apply to all tables
{
  componentType: 'TimesTableComponent',
  ...tableStyle,
  multiplier: 4,
  coordinates: [1125, 120, 1565, 700]
}
```

### 6. Performance Considerations

The component uses React.memo and useMemo for performance. However, avoid creating new objects in render:

```javascript
// ✅ Good - Props function is called only when needed
props: () => ({
  componentType: 'TimesTableComponent',
  multiplier: getCurrentMultiplier(),
  coordinates: [1125, 120, 1565, 700]
})

// ❌ Bad - New object created on every render
props: {
  componentType: 'TimesTableComponent',
  multiplier: getCurrentMultiplier(),  // Called on every render
  coordinates: [1125, 120, 1565, 700]
}
```

## Troubleshooting

### Table Not Displaying

**Problem**: Table doesn't appear on the page.

**Solutions**:
1. Check that `table-grid-component.js` is loaded before `times-table-component.js`
2. Verify `TableGridComponent` is available: `console.log(window.TableGridComponent)`
3. Check browser console for error messages
4. Ensure coordinates are provided and valid

### Cells Overflowing Container

**Problem**: Table rows overflow the specified coordinates.

**Solutions**:
1. Verify coordinates are correct: `[x1, y1, x2, y2]` where `y2 > y1`
2. Check that `rowGap` value matches what you expect
3. Ensure `rangeEnd - rangeStart + 1` rows can fit in the available height
4. Consider reducing `rowGap` or increasing container height

### Wrong Cell Heights

**Problem**: Cell heights don't match expected values.

**Solutions**:
1. Check console logs for cell height calculation details
2. Verify coordinates format: `[number, number, number, number]`
3. Ensure `rowGap` is in the correct format: `"8gc"` or `"8px"`
4. Check if `showHeader` is affecting the calculation

### Text Not Visible

**Problem**: Table renders but text is not visible.

**Solutions**:
1. Check `textColor` prop - ensure it contrasts with `cellBackgroundColor`
2. Verify `fontSize` is large enough: try `'32gc'` or larger
3. Check `padding` - text might be cut off if padding is too small

### Invalid Coordinates Warning

**Problem**: Console shows "Invalid coordinates, using default cell height".

**Solutions**:
1. Ensure coordinates is an array: `[x1, y1, x2, y2]`
2. Verify all 4 values are numbers
3. Check that coordinates array has exactly 4 elements
4. Ensure `y2 > y1` (bottom > top)

### TableGridComponent Not Found Error

**Problem**: Console shows "TableGridComponent not found!".

**Solutions**:
1. Verify `table-grid-component.js` is loaded in HTML
2. Check script load order - `table-grid-component.js` must come before `times-table-component.js`
3. Ensure no JavaScript errors are preventing component loading
4. Check that `window.TableGridComponent` exists: `console.log(window.TableGridComponent)`

## Generated Table Format

The component generates rows in the format: `"{multiplier} × {i} = {result}"`

### Example Output

For `multiplier=4`, `rangeStart=1`, `rangeEnd=5`:

```
4 × 1 = 4
4 × 2 = 8
4 × 3 = 12
4 × 4 = 16
4 × 5 = 20
```

### With Header

For `multiplier=5`, `showHeader=true`, `headerText="Table of 5"`:

```
Table of 5
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
...
```

## Dependencies

- **React**: Required (React 18+)
- **TableGridComponent**: Required - Must be loaded before this component
- **SharedUtilities**: Optional - Used for optimized element factory

## Performance

The component is optimized for performance:

- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Memoizes row generation, header generation, and cell height calculation
- **Efficient Calculations**: Cell height calculation only runs when dependencies change

## Browser Support

- Modern browsers with ES6+ support
- React 18+ required

## License

Part of the Math Learning App project.

## Version

1.0.0

## Related Components

- [TableGridComponent](./table-grid-component.md) - The underlying table component
- [TileComponent](./tile-component.md) - For individual number tiles
- [NumberPadComponent](./number-pad-component.md) - For number input

## Support

For issues or questions, check the browser console for detailed error messages and debug logs.

