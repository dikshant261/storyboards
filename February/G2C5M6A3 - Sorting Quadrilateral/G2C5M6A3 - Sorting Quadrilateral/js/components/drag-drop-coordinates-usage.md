# Drag and Drop Game - Coordinates Configuration

## Overview

The `DragDropGame` component now accepts three coordinate props to position its sub-containers:
1. `unsortedCoordinates` - Position of the unsorted images container
2. `dropZone1Coordinates` - Position of the first drop zone (equal parts)
3. `dropZone2Coordinates` - Position of the second drop zone (unequal parts)

## Coordinate Format

Coordinates use the standard format: `[x1, y1, x2, y2]`
- `x1, y1`: Top-left corner position
- `x2, y2`: Bottom-right corner position
- Values are based on a 1600x900 grid

## Component Structure

```
DragDropGame (full container)
├── UnsortedContainer (positioned by unsortedCoordinates)
│   └── DraggableImage × 4
├── DropZone 1 - Equal (positioned by dropZone1Coordinates)
│   └── Dropped images
└── DropZone 2 - Unequal (positioned by dropZone2Coordinates)
    └── Dropped images
```

## Usage in PageConfig.js

```javascript
{
  name: 'drag-drop-game-page2',
  type: 'drag-drop-game',
  coordinates: [0, 0, 1600, 900], // Full container
  zIndex: 'var(--z-elevated)',
  props: {
    questionIndex: 0,
    unsortedCoordinates: [725, 135, 1580, 340], // Top-right area
    dropZone1Coordinates: [725, 355, 1130, 690], // Left drop zone
    dropZone2Coordinates: [1175, 355, 1580, 690], // Right drop zone
    onComplete: () => {
      console.log('All images sorted correctly!');
    },
    onImageDropped: (correct) => {
      console.log(correct ? 'Correct!' : 'Try again!');
    }
  }
}
```

## Page 2 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Dialog + Character │        Unsorted Container              │
│                    │        [725, 135, 1580, 340]           │
│                    ├────────────────┬───────────────────────┤
│                    │  Equal Zone    │    Unequal Zone       │
│                    │  [725, 355,    │    [1175, 355,        │
│                    │   1130, 690]   │     1580, 690]        │
└─────────────────────────────────────────────────────────────┘
```

## Component Props

### Required Props
- `questionIndex` (number): Index of current question from Questions array
- `unsortedCoordinates` (array): [x1, y1, x2, y2] for unsorted container
- `dropZone1Coordinates` (array): [x1, y1, x2, y2] for equal drop zone
- `dropZone2Coordinates` (array): [x1, y1, x2, y2] for unequal drop zone

### Optional Props
- `onComplete` (function): Called when all images are correctly sorted
- `onImageDropped` (function): Called when image is dropped (receives boolean: correct/incorrect)

## How It Works

1. **Positioning**: Each coordinate array is converted to CSS absolute positioning:
   ```javascript
   const left = ((x1 - 1) / 1600 * 100) + '%';
   const top = ((y1 - 1) / 900 * 100) + '%';
   const width = ((x2 - x1 + 1) / 1600 * 100) + '%';
   const height = ((y2 - y1 + 1) / 900 * 100) + '%';
   ```

2. **Container Hierarchy**:
   - Main DragDropGame container uses the `coordinates` prop from PageConfig
   - Three sub-containers are positioned absolutely within it
   - Each sub-container uses its respective coordinates prop

3. **Drop Zone Detection**:
   - Drop zones register their DOM elements via refs
   - During drag, mouse position is checked against zone boundaries
   - Visual feedback shows which zone is being hovered

## Benefits

✅ **Flexible Layout**: Each container can be positioned independently
✅ **Responsive**: Coordinates scale with viewport size
✅ **Reusable**: Same component can be used with different layouts
✅ **Clear Separation**: Game logic separate from positioning

## Example Layouts

### Side-by-Side Layout
```javascript
unsortedCoordinates: [50, 100, 750, 400],
dropZone1Coordinates: [50, 450, 750, 800],
dropZone2Coordinates: [850, 100, 1550, 800]
```

### Vertical Stack Layout
```javascript
unsortedCoordinates: [400, 50, 1200, 250],
dropZone1Coordinates: [400, 300, 1200, 500],
dropZone2Coordinates: [400, 550, 1200, 750]
```

### Grid Layout (Current)
```javascript
unsortedCoordinates: [725, 135, 1580, 340],   // Top
dropZone1Coordinates: [725, 355, 1130, 690],   // Bottom-left
dropZone2Coordinates: [1175, 355, 1580, 690]   // Bottom-right
```

## Visual Feedback

- **Unsorted Container**: Dark semi-transparent background, rounded corners
- **Drop Zones**: 
  - Empty: Dashed border, "Drag images here" placeholder
  - Hovered: Solid blue border, highlighted background
  - Contains Images: Grid display of dropped images

## Notes

- The main container coordinates should encompass all three sub-containers
- Drop zones automatically detect hover based on mouse position
- Images follow the cursor during drag
- Correct drops smoothly transition to drop zone
- Incorrect drops return with red glow animation

