# Table Grid Component Documentation

## Overview

The `TableGridComponent` is a React-based table component designed for displaying structured data with extensive customization options. It supports dynamic cell updates, blinking animations, and flexible styling through props.

## Features

- ✅ **Dynamic Cell Updates**: Update cell text, colors, fonts, and borders programmatically
- ✅ **Blinking Animations**: Make cells, rows, or columns blink to draw attention
- ✅ **Flexible Styling**: Control colors, fonts, spacing, and borders
- ✅ **Row/Column Color Overrides**: Set colors for specific rows or columns
- ✅ **Data Cell Exclusions**: Separate styling for data cells (excluding headers)
- ✅ **Grid Cell Units (gc)**: Support for responsive sizing using grid cell units
- ✅ **Equal Width/Height**: Option to make all columns or rows equal size
- ✅ **Cell Gaps**: Adjustable spacing between rows and columns
- ✅ **Border Radius**: Customizable border radius for cells and table
- ✅ **Unique Cell IDs**: Each cell and header automatically receives a unique ID for easy DOM access
- ✅ **Cell Modes**: Visual modes for cells (normal, incorrect, correct, focus) with automatic styling and animations
- ✅ **Dynamic Mode Updates**: Programmatically update cell modes via callback system

## Component Usage

### Basic Example

```javascript
{
  id: "my-table",
  name: "my-table",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  zIndex: 50,
  props: {
    componentType: "TableGridComponent",
    tableData: {
      headers: ["Name", "Age", "City"],
      rows: [
        ["John", "25", "New York"],
        ["Jane", "30", "London"],
        ["Bob", "35", "Paris"]
      ]
    },
    borderColor: "#ffffff",
    headerBackgroundColor: "#2a3f5f",
    cellBackgroundColor: "transparent",
    textColor: "#ffffff"
  }
}
```

## Props Reference

### Required Props

#### `tableData`
- **Type**: `Object`
- **Required**: Yes
- **Description**: Contains the table structure with headers and rows
- **Structure**:
  ```javascript
  {
    headers: ["Header1", "Header2", "Header3"],
    rows: [
      ["Cell1", "Cell2", "Cell3"],
      ["Cell4", "Cell5", "Cell6"]
    ]
  }
  ```

### Styling Props

#### `borderColor`
- **Type**: `String`
- **Default**: `'#ffffff'`
- **Description**: Color of cell borders
- **Example**: `"#ffffff"`, `"rgb(255, 255, 255)"`

#### `headerBackgroundColor`
- **Type**: `String`
- **Default**: `'#2a3f5f'`
- **Description**: Background color for header row
- **Example**: `"#2a3f5f"`

#### `cellBackgroundColor`
- **Type**: `String`
- **Default**: `'transparent'`
- **Description**: Default background color for all cells
- **Example**: `"transparent"`, `"#f0f0f0"`

#### `textColor`
- **Type**: `String`
- **Default**: `'#ffffff'`
- **Description**: Default text color for all cells
- **Example**: `"#ffffff"`

#### `fontSize`
- **Type**: `String`
- **Default**: `'28gc'`
- **Description**: Font size for data cells (supports gc units)
- **Example**: `"28gc"`, `"24px"`

#### `headerFontSize`
- **Type**: `String`
- **Default**: `'32gc'`
- **Description**: Font size for header cells (supports gc units)
- **Example**: `"32gc"`, `"30px"`

#### `padding`
- **Type**: `String`
- **Default**: `'15gc'`
- **Description**: Padding inside cells (supports gc units)
- **Example**: `"15gc"`, `"10px"`

#### `borderWidth`
- **Type**: `String`
- **Default**: `'2px'`
- **Description**: Width of cell borders
- **Example**: `"2px"`, `"1px"`

#### `borderRadius`
- **Type**: `String`
- **Default**: `'8gc'`
- **Description**: Border radius for the entire table (supports gc units)
- **Example**: `"8gc"`, `"10px"`

#### `cellBorderRadius`
- **Type**: `String`
- **Default**: `'0gc'`
- **Description**: Border radius for individual cells (supports gc units)
- **Example**: `"4gc"`, `"5px"`

### Layout Props

#### `equalColumnWidths`
- **Type**: `Boolean`
- **Default**: `false`
- **Description**: If `true`, all columns will have equal width
- **Example**: `true`

#### `equalRowHeights`
- **Type**: `Boolean`
- **Default**: `false`
- **Description**: If `true`, all rows will have equal height
- **Example**: `true`

#### `rowGap`
- **Type**: `String`
- **Default**: `'0gc'`
- **Description**: Gap between rows (supports gc units). Set to non-zero to enable spacing
- **Example**: `"2gc"`, `"4px"`

#### `columnGap`
- **Type**: `String`
- **Default**: `'0gc'`
- **Description**: Gap between columns (supports gc units). Set to non-zero to enable spacing
- **Example**: `"2gc"`, `"4px"`

### Color Override Props

#### `rowBackgroundColors`
- **Type**: `Array` or `Object`
- **Default**: `[]`
- **Description**: Background colors for specific rows (applies to all cells including headers)
- **Array Format**: `['#ff0000', '#00ff00']` - colors for rows 0, 1, etc.
- **Object Format**: `{0: '#ff0000', 2: '#00ff00'}` - colors for specific row indices
- **Example**: 
  ```javascript
  rowBackgroundColors: ['#ff0000', '#00ff00', '#0000ff']
  // or
  rowBackgroundColors: {0: '#ff0000', 2: '#00ff00'}
  ```

#### `columnBackgroundColors`
- **Type**: `Array` or `Object`
- **Default**: `[]`
- **Description**: Background colors for specific columns (applies to all cells including headers)
- **Array Format**: `['#ff0000', '#00ff00']` - colors for columns 0, 1, etc.
- **Object Format**: `{0: '#ff0000', 2: '#00ff00'}` - colors for specific column indices
- **Example**: 
  ```javascript
  columnBackgroundColors: ['#ff0000', '#00ff00']
  ```

#### `dataRowBackgroundColors`
- **Type**: `Array` or `Object`
- **Default**: `[]`
- **Description**: Background colors for data rows only (excluding header row)
- **Array Format**: `['#ff0000', '#00ff00']` - colors for data rows 0, 1, etc.
- **Object Format**: `{0: '#ff0000', 2: '#00ff00'}` - colors for specific data row indices
- **Note**: Header row is excluded from this prop
- **Example**: 
  ```javascript
  dataRowBackgroundColors: ['#ff0000', '#00ff00']
  ```

#### `dataColumnBackgroundColors`
- **Type**: `Array` or `Object`
- **Default**: `[]`
- **Description**: Background colors for data columns only (excluding header row)
- **Array Format**: `['#ff0000', '#00ff00']` - colors for columns 0, 1, etc.
- **Object Format**: `{0: '#ff0000', 2: '#00ff00'}` - colors for specific column indices
- **Note**: Header row is excluded from this prop
- **Example**: 
  ```javascript
  dataColumnBackgroundColors: ['#ff0000', '#00ff00']
  ```

#### `rowTextColors`
- **Type**: `Array` or `Object`
- **Default**: `[]`
- **Description**: Text colors for specific rows
- **Array Format**: `['#000000', '#ffffff']` - colors for rows 0, 1, etc.
- **Object Format**: `{0: '#000000', 2: '#ffffff'}` - colors for specific row indices
- **Example**: 
  ```javascript
  rowTextColors: ['#000000', '#ffffff']
  ```

#### `rowOverrides`
- **Type**: `Object`
- **Default**: `{}`
- **Description**: Complete override object for specific rows (highest precedence)
- **Structure**: `{rowIndex: {backgroundColor, color, fontSize, fontWeight}}`
- **Example**: 
  ```javascript
  rowOverrides: {
    1: {
      backgroundColor: '#FFD700',
      color: '#000000',
      fontSize: '28gc',
      fontWeight: 'bold'
    }
  }
  ```

### Precedence Order for Cell Colors

1. **`rowOverrides`** (highest priority)
2. **`dataRowBackgroundColors`** (for data cells only, checked first)
3. **`dataColumnBackgroundColors`** (for data cells only, checked second)
4. **`rowBackgroundColors`** (for all cells including headers)
5. **`columnBackgroundColors`** (for all cells including headers)
6. **`cellBackgroundColor`** (default fallback)

### Blinking Animation Props

#### `blinkBgCells`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of cell keys to blink background
- **Cell Key Format**: 
  - Data cells: `'row-col'` (e.g., `'0-0'`, `'1-2'`)
  - Header cells: `'header-col'` (e.g., `'header-0'`, `'header-1'`)
- **Example**: 
  ```javascript
  blinkBgCells: ['0-0', '1-2', 'header-0']
  ```

#### `blinkBgRows`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of row indices to blink background (data rows only, header excluded)
- **Example**: 
  ```javascript
  blinkBgRows: [0, 1]  // Blinks rows 0 and 1
  ```

#### `blinkBgColumns`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of column indices to blink background
- **Example**: 
  ```javascript
  blinkBgColumns: [0, 1]  // Blinks columns 0 and 1
  ```

#### `blinkBorderCells`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of cell keys to blink border
- **Cell Key Format**: Same as `blinkBgCells`
- **Example**: 
  ```javascript
  blinkBorderCells: ['0-0', '1-2', 'header-0']
  ```

#### `blinkBorderRows`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of row indices to blink border (data rows only, header excluded)
- **Example**: 
  ```javascript
  blinkBorderRows: [0, 1]
  ```

#### `blinkBorderColumns`
- **Type**: `Array`
- **Default**: `[]`
- **Description**: Array of column indices to blink border
- **Example**: 
  ```javascript
  blinkBorderColumns: [0, 1]
  ```

### Cell Mode Props

#### `cellModes` (object, default: `{}`)
Object mapping cell IDs to visual modes. Used to set cells to different visual states.
- **Type**: `Object`
- **Format**: `{ 'componentId-R1C1': 'incorrect', 'componentId-R1C2': 'correct', ... }`
- **Cell ID Format**: `<componentId>-R<rowNumber>C<columnNumber>`
  - Header cells: `R0C0`, `R0C1`, etc.
  - Data cells: `R1C0`, `R1C1`, `R2C0`, etc.
- **Available Modes**:
  - `'normal'`: Default appearance (no special styling)
  - `'incorrect'`: Salmon background (`#FA8072`), dark salmon border (`#E9967A`), white font, wiggle animation (1000ms)
  - `'correct'`: Green background (`#4CAF50`), dark green border (`#45a049`), white font
  - `'focus'`: Yellow background (`#FFEB3B`), white solid border, black font, blinking background animation
- **Behavior**:
  - Modes can be set via prop (static) or via callback (dynamic)
  - Dynamic mode updates take precedence over prop values
  - Mode changes trigger automatic styling and animations
- **Example**:
  ```javascript
  cellModes: {
    'page2-map-table-R1C1': 'incorrect',
    'page2-map-table-R1C2': 'correct',
    'page2-map-table-R1C3': 'focus'
  }
  ```

### Callback Props

#### `onCellUpdate`
- **Type**: `Function`
- **Default**: `null`
- **Description**: Callback function called when a cell is updated programmatically
- **Signature**: `(cellKey, updates) => void`
- **Parameters**:
  - `cellKey`: String - Cell identifier (`'row-col'` or `'header-col'`)
  - `updates`: Object - Object containing updated properties
- **Example**: 
  ```javascript
  onCellUpdate: (cellKey, updates) => {
    console.log('Cell updated:', cellKey, updates);
  }
  ```

## Unique Cell IDs

Each cell and header in the table component automatically receives a unique HTML `id` attribute based on the component's `id` prop and the cell's position.

### ID Format

The unique ID follows the pattern: `<componentId>-R<rowNumber>C<columnNumber>`

- **Header cells**: `R0` (row 0) + `C<columnIndex>`
- **Data cells**: `R<rowIndex+1>` + `C<columnIndex>` (row index + 1 because header is row 0)

### Examples

For a table with `id: "page2-map-table"`:

**Header Row (Row 0):**
- Column 0: `page2-map-table-R0C0`
- Column 1: `page2-map-table-R0C1`
- Column 2: `page2-map-table-R0C2`

**Data Row 1 (Row 1):**
- Column 0: `page2-map-table-R1C0`
- Column 1: `page2-map-table-R1C1`
- Column 2: `page2-map-table-R1C2`

**Data Row 2 (Row 2):**
- Column 0: `page2-map-table-R2C0`
- Column 1: `page2-map-table-R2C1`
- Column 2: `page2-map-table-R2C2`

### Usage

You can use these IDs to directly access cells via JavaScript:

```javascript
// Access a specific cell by ID
const headerCell = document.getElementById('page2-map-table-R0C0');
const dataCell = document.getElementById('page2-map-table-R1C2');

// Modify cell directly
if (headerCell) {
  headerCell.style.backgroundColor = '#ff0000';
  headerCell.textContent = 'Updated Header';
}

// Use with CSS selectors
const firstColumnCells = document.querySelectorAll('[id^="page2-map-table-R"][id$="C0"]');
```

### Component ID Source

The component ID is determined in the following order:
1. `elementName` prop (from PageConfig `name` field) - **Recommended**
2. `id` prop (from PageConfig `id` field)
3. Auto-generated React `useId()` (fallback)

**Best Practice**: Always provide a unique `id` and `name` in your PageConfig to ensure predictable cell IDs:

```javascript
{
  id: "page2-map-table",
  name: "page2-map-table",  // This will be used as componentId
  type: "custom",
  // ... rest of config
}
```

## Cell Modes

The table component supports visual modes for cells that provide immediate visual feedback based on validation results or user interaction.

### Available Modes

#### `'normal'` (Default)
- Standard cell appearance
- No special styling or animations
- Used when no mode is specified

#### `'incorrect'`
- **Background**: Salmon (`#FA8072`)
- **Border**: Dark salmon (`#E9967A`), 2px solid
- **Text Color**: White
- **Animation**: Wiggle animation for 1000ms
- **Use Case**: Indicates incorrect input or validation failure

#### `'correct'`
- **Background**: Green (`#4CAF50`)
- **Border**: Dark green (`#45a049`), 2px solid
- **Text Color**: White
- **Animation**: None
- **Use Case**: Indicates correct input or validation success

#### `'focus'`
- **Background**: Yellow (`#FFEB3B`) with blinking animation
- **Border**: White, 2px solid
- **Text Color**: Black
- **Animation**: Background blinks between `#FFEB3B` and `#FFF59D` (infinite loop, 1s duration)
- **Use Case**: Highlights cell for user attention or indicates active input field

### Setting Cell Modes

#### Static Mode (via Props)

Set modes in the component configuration:

```javascript
{
  cellModes: {
    'page2-map-table-R1C1': 'incorrect',
    'page2-map-table-R1C2': 'correct',
    'page2-map-table-R1C3': 'focus'
  }
}
```

#### Dynamic Mode (via Callback)

Update modes programmatically using the callback system:

```javascript
// Get the mode update callback
const updateCellMode = window.tableGridModeCallbacks['page2-map-table'];

if (updateCellMode) {
  // Set cell to incorrect mode
  updateCellMode('page2-map-table-R1C1', 'incorrect');
  
  // Set cell to correct mode
  updateCellMode('page2-map-table-R1C1', 'correct');
  
  // Set cell to focus mode
  updateCellMode('page2-map-table-R1C1', 'focus');
  
  // Reset to normal mode
  updateCellMode('page2-map-table-R1C1', 'normal');
}
```

### Mode Update Callback

The component exposes a mode update callback in `window.tableGridModeCallbacks[componentId]`.

**Callback Signature**: `(cellId, mode) => void`

**Parameters**:
- `cellId` (string): Full cell ID in format `<componentId>-R<row>C<col>`
- `mode` (string): Mode to set (`'normal'`, `'incorrect'`, `'correct'`, or `'focus'`)

**Example**:
```javascript
// Component ID from PageConfig
const componentId = 'page2-map-table';

// Get callback
const updateMode = window.tableGridModeCallbacks[componentId];

// Update cell mode
if (updateMode) {
  updateMode('page2-map-table-R1C1', 'incorrect');
}
```

### Mode Precedence

1. **Dynamic modes** (set via callback) take precedence over static prop modes
2. If a cell has both a prop mode and a dynamically set mode, the dynamic mode is used
3. Modes can be updated at any time, even after component mount

### Mode Animations

- **Wiggle Animation** (`'incorrect'` mode):
  - Duration: 1000ms
  - Effect: Horizontal shake (translateX ±5px)
  - Runs once when mode is set

- **Blink Animation** (`'focus'` mode):
  - Duration: 1000ms per cycle
  - Effect: Background color alternates between `#FFEB3B` and `#FFF59D`
  - Runs infinitely while cell is in focus mode

### Integration with Number Pad Component

The table component integrates seamlessly with the number pad component:

1. Number pad validates user input
2. On check button click, number pad calls `window.tableGridModeCallbacks[tableComponentId](destinationId, mode)`
3. Table component updates the cell's visual mode
4. Cell displays appropriate styling and animations

**Example Flow**:
```javascript
// Number pad validates answer
if (isCorrect) {
  updateCellMode('page2-map-table-R1C1', 'correct');
} else {
  updateCellMode('page2-map-table-R1C1', 'incorrect');
}

// When user clicks number button after incorrect check
updateCellMode('page2-map-table-R1C1', 'focus');
```

## Dynamic Cell Updates

The component supports programmatic updates to cell attributes through a callback function exposed globally.

### Accessing the Update Function

The update function is stored in `window.tableGridCallbacks[componentId]` where `componentId` is the `id` prop of your table component.

```javascript
// Get the update function
const updateCell = window.tableGridCallbacks['my-table-id'];

if (updateCell) {
  // Update a cell
  updateCell('0-0', {
    text: 'Updated Text',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    fontSize: '32gc',
    fontWeight: 'bold',
    borderColor: '#00ff00'
  });
}
```

### Cell Key Format

- **Data cells**: `'row-col'` format
  - Row 0, Column 0: `'0-0'`
  - Row 1, Column 2: `'1-2'`
- **Header cells**: `'header-col'` format
  - Header, Column 0: `'header-0'`
  - Header, Column 1: `'header-1'`

### Updatable Cell Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `text` | String | Cell text content | `"New Text"` |
| `backgroundColor` | String | Cell background color | `"#ff0000"` |
| `color` | String | Text color | `"#ffffff"` |
| `fontSize` | String | Font size (supports gc units) | `"32gc"` |
| `fontWeight` | String | Font weight | `"bold"`, `"normal"` |
| `borderColor` | String | Border color | `"#00ff00"` |

### Update Examples

```javascript
// Update cell text and background
updateCell('0-0', {
  text: 'Updated!',
  backgroundColor: '#ff0000'
});

// Update header cell
updateCell('header-0', {
  text: 'New Header',
  color: '#ffff00',
  fontWeight: 'bold'
});

// Update multiple properties
updateCell('1-2', {
  text: 'Cell Content',
  backgroundColor: '#00ff00',
  color: '#000000',
  fontSize: '24gc',
  fontWeight: 'bold',
  borderColor: '#ff0000'
});
```

## Complete Example

```javascript
{
  id: "page1-map-table",
  name: "page1-map-table",
  type: "custom",
  coordinates: [5, 250, 575, 780],
  zIndex: 50,
  props: {
    componentType: "TableGridComponent",
    tableData: {
      headers: [
        "City to City",
        "Length on Map",
        "Actual Distance"
      ],
      rows: [
        ["Jakarta - Bandung", "5cm", "150km"],
        ["Bandung - Yogyakarta", "8cm", "240km"],
        ["Yogyakarta - Surabaya", "6cm", "180km"]
      ]
    },
    borderColor: "#ffffff",
    headerBackgroundColor: "#2a3f5f",
    cellBackgroundColor: "transparent",
    textColor: "#ffffff",
    fontSize: "24gc",
    headerFontSize: "24gc",
    padding: "15gc",
    borderRadius: "8gc",
    cellBorderRadius: "4gc",
    borderWidth: "2px",
    equalColumnWidths: true,
    equalRowHeights: true,
    rowGap: "2gc",
    columnGap: "2gc",
    dataRowBackgroundColors: ['#1a1a2e', '#16213e', '#0f3460'],
    rowTextColors: ['#ffffff', '#ffffff', '#ffffff'],
    blinkBgCells: ['0-0'],
    blinkBorderColumns: [2],
    onCellUpdate: (cellKey, updates) => {
      console.log('Cell updated:', cellKey, updates);
    }
  }
}
```

## Blinking Animations

The component includes CSS animations for blinking effects:

### Background Blink
- **Class**: `.table-cell-blink-bg`
- **Effect**: Opacity animates from 1 to 0.3 and back
- **Duration**: 1 second, infinite loop

### Border Blink
- **Class**: `.table-cell-blink-border`
- **Effect**: Border color changes to red with a glow effect
- **Duration**: 1 second, infinite loop

### Cell Mode Animations

#### Wiggle Animation (Incorrect Mode)
- **Class**: `.table-cell-wiggle`
- **Effect**: Horizontal shake animation (translateX ±5px)
- **Duration**: 1000ms, single iteration
- **Trigger**: Automatically applied when cell mode is set to `'incorrect'`

#### Focus Blink Animation (Focus Mode)
- **Class**: `.table-cell-focus-blink`
- **Effect**: Background color alternates between `#FFEB3B` and `#FFF59D`
- **Duration**: 1000ms per cycle, infinite loop
- **Trigger**: Automatically applied when cell mode is set to `'focus'`

### Animation Usage

Animations are automatically applied based on the blink props:

```javascript
// Blink specific cells
blinkBgCells: ['0-0', '1-2']

// Blink entire rows (data rows only)
blinkBgRows: [0, 1]

// Blink entire columns
blinkBgColumns: [0, 1]

// Blink borders
blinkBorderCells: ['0-0']
blinkBorderRows: [0]
blinkBorderColumns: [1]
```

## Grid Cell Units (gc)

The component supports grid cell units (`gc`) for responsive sizing. These units are automatically converted to pixels based on the grid system configuration.

### Supported Properties with gc Units

- `fontSize`
- `headerFontSize`
- `padding`
- `borderRadius`
- `cellBorderRadius`
- `rowGap`
- `columnGap`

### Example

```javascript
fontSize: "28gc",        // Responsive font size
padding: "15gc",         // Responsive padding
rowGap: "2gc",           // Responsive row gap
cellBorderRadius: "4gc"  // Responsive border radius
```

## Best Practices

1. **Use `id` and `name` props**: Always provide a unique `id` and `name` for your table component to enable dynamic updates and predictable cell IDs
   ```javascript
   id: "my-unique-table-id",
   name: "my-unique-table-id"  // Should match id for consistent cell IDs
   ```

2. **Cell Key Format**: Remember the cell key format for dynamic updates:
   - Data cells: `'row-col'` (e.g., `'0-0'`)
   - Header cells: `'header-col'` (e.g., `'header-0'`)

3. **Cell ID Format**: For direct DOM access, use the HTML ID format:
   - Header cells: `<componentId>-R0C<columnIndex>` (e.g., `page2-map-table-R0C0`)
   - Data cells: `<componentId>-R<rowIndex+1>C<columnIndex>` (e.g., `page2-map-table-R1C0`)

4. **Color Precedence**: Understand the color precedence order when using multiple color props

5. **Data vs All Cells**: Use `dataRowBackgroundColors` and `dataColumnBackgroundColors` when you want to exclude headers from styling

6. **Blinking Performance**: Use blinking animations sparingly to avoid visual overload

7. **Dynamic Updates**: Check if the callback exists before calling:
   ```javascript
   const updateCell = window.tableGridCallbacks['my-table-id'];
   if (updateCell) {
     updateCell('0-0', { text: 'Updated' });
   }
   ```

## Troubleshooting

### Cell updates not working
- Ensure the component has a unique `id` prop
- Check that `window.tableGridCallbacks[componentId]` exists
- Verify the cell key format is correct

### Cell modes not updating
- Ensure the component has a unique `id` prop
- Check that `window.tableGridModeCallbacks[componentId]` exists
- Verify the cell ID format is correct (must be full ID: `componentId-R1C1`, not just `R1C1`)
- Ensure the mode value is one of: `'normal'`, `'incorrect'`, `'correct'`, or `'focus'`

### Mode animations not visible
- Check that CSS animations are loaded (`animations.css`)
- Verify the mode is correctly set (check browser console for mode update logs)
- Ensure the cell is visible (not hidden by CSS)

### Blinking not visible
- Check that the blink props are arrays (not objects)
- Verify cell keys are in the correct format
- Ensure CSS animations are loaded

### Colors not applying
- Check the precedence order
- Verify array/object format matches your data structure
- Ensure color values are valid CSS colors

### Gaps not showing
- Set `rowGap` or `columnGap` to a non-zero value
- Values must be greater than `'0gc'` or `'0'`

## API Summary

### Props Summary Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tableData` | Object | Required | Table structure with headers and rows |
| `borderColor` | String | `'#ffffff'` | Cell border color |
| `headerBackgroundColor` | String | `'#2a3f5f'` | Header row background |
| `cellBackgroundColor` | String | `'transparent'` | Default cell background |
| `textColor` | String | `'#ffffff'` | Default text color |
| `fontSize` | String | `'28gc'` | Data cell font size |
| `headerFontSize` | String | `'32gc'` | Header font size |
| `padding` | String | `'15gc'` | Cell padding |
| `borderWidth` | String | `'2px'` | Border width |
| `borderRadius` | String | `'8gc'` | Table border radius |
| `cellBorderRadius` | String | `'0gc'` | Cell border radius |
| `equalColumnWidths` | Boolean | `false` | Equal column widths |
| `equalRowHeights` | Boolean | `false` | Equal row heights |
| `rowGap` | String | `'0gc'` | Gap between rows |
| `columnGap` | String | `'0gc'` | Gap between columns |
| `rowBackgroundColors` | Array/Object | `[]` | Row background colors |
| `columnBackgroundColors` | Array/Object | `[]` | Column background colors |
| `dataRowBackgroundColors` | Array/Object | `[]` | Data row colors (no header) |
| `dataColumnBackgroundColors` | Array/Object | `[]` | Data column colors (no header) |
| `rowTextColors` | Array/Object | `[]` | Row text colors |
| `rowOverrides` | Object | `{}` | Row override object |
| `blinkBgCells` | Array | `[]` | Cells to blink background |
| `blinkBgRows` | Array | `[]` | Rows to blink background |
| `blinkBgColumns` | Array | `[]` | Columns to blink background |
| `blinkBorderCells` | Array | `[]` | Cells to blink border |
| `blinkBorderRows` | Array | `[]` | Rows to blink border |
| `blinkBorderColumns` | Array | `[]` | Columns to blink border |
| `cellModes` | Object | `{}` | Cell mode mapping (normal, incorrect, correct, focus) |
| `onCellUpdate` | Function | `null` | Update callback |

## Version History

- **v1.0.0**: Initial release with basic table functionality
- **v1.1.0**: Added row/column gap support
- **v1.2.0**: Added cell border radius
- **v1.3.0**: Added data row/column color overrides (excluding headers)
- **v1.4.0**: Added dynamic cell update callback
- **v1.5.0**: Added blinking animation support
- **v1.6.0**: Added unique cell IDs for direct DOM access
- **v1.7.0**: Added cell modes (normal, incorrect, correct, focus) with automatic styling and animations
- **v1.8.0**: Added dynamic cell mode update callback system (`window.tableGridModeCallbacks`)

## Support

For issues or questions, please refer to the component source code in `js/components/table-grid-component.js`.

