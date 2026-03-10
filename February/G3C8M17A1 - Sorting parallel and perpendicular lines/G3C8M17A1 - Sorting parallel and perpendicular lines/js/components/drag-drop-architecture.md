# Drag and Drop Game - Architecture

## Component Structure

The drag-and-drop game is implemented as **ONE self-contained component** that internally manages all three sub-containers.

### Single Component in PageConfig.js

```javascript
{
  name: 'unsorted-container-page2',
  type: 'drag-drop-game',
  coordinates: [0, 0, 1600, 900], // Full game container
  zIndex: 'var(--z-elevated)',
  props: {
    questionIndex: 0,
    unsortedCoordinates: [725, 135, 1580, 340],   // Position for unsorted images
    dropZone1Coordinates: [725, 355, 1130, 690],   // Position for equal zone
    dropZone2Coordinates: [1175, 355, 1580, 690],  // Position for unequal zone
    onComplete: () => { /* ... */ },
    onImageDropped: (correct) => { /* ... */ }
  }
}
```

## Visual Hierarchy

```
┌────────────────────────────────────────────────────────────────┐
│ DragDropGame Component (type: 'drag-drop-game')                │
│ coordinates: [0, 0, 1600, 900] - Full container               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ UnsortedContainer                                        │  │
│  │ unsortedCoordinates: [725, 135, 1580, 340]              │  │
│  │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │  │
│  │ │ Image1 │ │ Image2 │ │ Image3 │ │ Image4 │            │  │
│  │ └────────┘ └────────┘ └────────┘ └────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────┐     │
│  │ DropZone (Equal)        │  │ DropZone (Unequal)      │     │
│  │ dropZone1Coordinates:   │  │ dropZone2Coordinates:   │     │
│  │ [725, 355, 1130, 690]   │  │ [1175, 355, 1580, 690]  │     │
│  │                         │  │                         │     │
│  │ [Dropped images here]   │  │ [Dropped images here]   │     │
│  └─────────────────────────┘  └─────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

## Component Internals

### DragDropGame Component
- **Type**: React Component
- **Exported as**: `window.DragDropGameComponent.DragDropGame`
- **Registered in**: `elements-registry.js` as type `'drag-drop-game'`

### Internal Sub-Components (not exposed to PageConfig)
1. **UnsortedContainer** - Renders draggable images in grid
2. **DropZone** - Accepts dropped images, validates category
3. **DraggableImage** - Individual image with drag handlers

## Data Flow

```
PageConfig.js
    │
    ├─ Defines ONE element (type: 'drag-drop-game')
    │
    └─ Props:
        ├─ questionIndex (which question set to load)
        ├─ unsortedCoordinates (where to position unsorted images)
        ├─ dropZone1Coordinates (where to position equal zone)
        ├─ dropZone2Coordinates (where to position unequal zone)
        ├─ onComplete (callback when all sorted)
        └─ onImageDropped (callback on each drop)

DragDropGame Component
    │
    ├─ Loads question from Questions[questionIndex]
    ├─ Manages game state (unsorted, equal, unequal)
    ├─ Handles drag-drop logic
    ├─ Positions all sub-containers using coordinatesToStyle()
    │
    └─ Renders:
        ├─ UnsortedContainer (at unsortedCoordinates)
        ├─ DropZone for equal (at dropZone1Coordinates)
        └─ DropZone for unequal (at dropZone2Coordinates)
```

## Key Benefits

✅ **Single Component**: Only ONE element in PageConfig.js  
✅ **Self-Contained**: All game logic internal to component  
✅ **Flexible Positioning**: Three coordinate props for layout control  
✅ **Clean Separation**: Sub-components hidden from page config  
✅ **Reusable**: Same component for all questions  

## Coordinate System

All coordinates use the format `[x1, y1, x2, y2]`:
- Based on 1600×900 grid
- Converted to CSS percentages internally
- Absolute positioning within main container

### Example Conversion
```javascript
// Input: [725, 135, 1580, 340]
// Output:
{
  position: 'absolute',
  left: '45.25%',    // ((725-1) / 1600 * 100)
  top: '14.89%',     // ((135-1) / 900 * 100)
  width: '53.50%',   // ((1580-725+1) / 1600 * 100)
  height: '22.89%'   // ((340-135+1) / 900 * 100)
}
```

## Game State Management

```javascript
// Initial state (loaded from Questions[questionIndex])
{
  unsorted: [img1, img2, img3, img4],  // All images start here
  equal: [],                            // Empty at start
  unequal: []                           // Empty at start
}

// After correct drops
{
  unsorted: [],                         // Empty when complete
  equal: [img2, img3],                 // Equal category images
  unequal: [img1, img4]                // Unequal category images
}
```

## Integration Points

### In index.html
```html
<script src="js/components/drag-drop-component.js"></script>
<link rel="stylesheet" href="css/components/drag-drop.css">
```

### In elements-registry.js
```javascript
const dragDropElement = window.DragDropGameComponent?.DragDropElement || {};
const StandardElements = {
  // ... other elements
  ...dragDropElement
};
```

### In math-applet.js
```javascript
case ELEMENT_TYPES.DRAG_DROP_GAME:
  const DragDropGameComponent = window.DragDropGameComponent?.DragDropGame;
  return React.createElement('div', {
    style: { ...position.css, zIndex: element.zIndex }
  }, React.createElement(DragDropGameComponent, elementProps));
```

## Summary

The drag-and-drop game is implemented as **a single, self-contained component** that:
- Takes coordinates for three internal containers as props
- Manages all game state and logic internally
- Only requires ONE element definition in PageConfig.js
- Renders all sub-components (unsorted, drop zones) internally

This architecture keeps PageConfig.js clean while giving full control over layout through coordinate props.

