# Droppable Component — Complete Documentation

A React component that defines drop zones for drag-and-drop interactions. Works with the Draggable component and `window.DragDropContext` to coordinate drops. In this app, Droppable is primarily used inside TableGridComponent for table cell drop zones.

---

## Table of Contents

1. [Overview](#overview)
2. [DragDropContext](#dragdropcontext)
3. [Props Reference](#props-reference)
4. [How It's Used in This App](#how-its-used-in-this-app)
5. [TableGridComponent Integration](#tablegridcomponent-integration)
6. [Examples](#examples)
7. [Do's and Don'ts](#dos-and-donts)

---

## Overview

The Droppable component:

- Registers with `window.DragDropContext` on mount
- Receives hover and drop events from the context
- Validates drops via `acceptValidator` or `acceptIds`
- Provides visual feedback (valid = green tint, invalid = red tint) when a draggable hovers
- Calls `onDrop` for valid drops, `onDropRejected` for invalid ones
- Uses hit-testing on `notifyDragEnd` to determine which droppable received the drop

**UX principles:**

- Clear visual feedback when hovering with valid/invalid draggables
- Smooth transitions between states (200ms)
- Configurable acceptance rules

---

## DragDropContext

The Droppable component depends on `window.DragDropContext`, defined in `droppable-component.js`:

```javascript
window.DragDropContext = {
  currentDraggingId: null,
  currentDragPosition: { x: 0, y: 0 },
  droppables: new Map(),  // Map<droppableId, { element, config }>

  registerDroppable(droppableId, element, config) { ... },
  unregisterDroppable(droppableId) { ... },
  notifyDragStart(draggableId) { ... },
  notifyDragMove(position) { ... },
  notifyDragEnd(draggableId, position) { ... }
};
```

**Flow:**
1. Draggable calls `notifyDragStart` on mousedown/touchstart
2. Draggable calls `notifyDragMove` while moving
3. Draggable calls `notifyDragEnd` on mouseup/touchend
4. DragDropContext hit-tests the drop position against all registered droppables
5. If a droppable contains the point, it calls that droppable's `onDropAttempt`
6. If no droppable contains the point, it dispatches `dragDropEndedOutside`

---

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| **droppableId** | `string` | Unique identifier for this drop zone. Used for registration with DragDropContext and placement lookup. Must be unique across all droppables. |

**Example:** `droppableId: 'page6-table-R1C2'` (Grapes cell).

---

### Acceptance Rules

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **acceptValidator** | `(draggableId: string) => boolean` | `null` | Custom validation. Return `true` to accept, `false` to reject. Takes precedence over `acceptIds`. Use `getAcceptValidatorForBase('page6-star')` to accept base + spawned IDs. |
| **acceptIds** | `string[]` | `null` | List of draggable IDs this zone accepts. If `null`, accepts all. Ignored when `acceptValidator` is set. |
| **isDisabled** | `boolean` | `false` | When true, no drops are accepted; zone is visually dimmed (opacity 0.5). |

**Validation order:** `acceptValidator` (if present) → `acceptIds` (if array) → accept all (if both null).

---

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| **onDrop** | `(draggableId: string, droppableId: string, position: { x, y }) => void` | Called when a valid drop occurs. Implement placement logic here (e.g. update `window.dragDropPlacements`). |
| **onDropRejected** | `(draggableId: string, droppableId: string) => void` | Called when a drop is rejected (validator returned false or cell full). Use for feedback. |
| **onDragEnter** | `(draggableId: string, droppableId: string) => void` | Called when a valid draggable enters the zone. |
| **onDragLeave** | `(draggableId: string, droppableId: string) => void` | Called when a draggable leaves the zone. |

---

### Visual Feedback (Styling)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **hoverBorderColor** | `string` | `'rgba(0, 255, 0, 0.6)'` | Border color when hovering with a valid draggable. |
| **hoverBackgroundColor** | `string` | `'rgba(0, 255, 0, 0.1)'` | Background when hovering with valid draggable. |
| **rejectBorderColor** | `string` | `'rgba(255, 0, 0, 0.6)'` | Border color when hovering with invalid draggable. |
| **rejectBackgroundColor** | `string` | `'rgba(255, 0, 0, 0.1)'` | Background when hovering with invalid draggable. |
| **borderColor** | `string` | `'rgba(255, 255, 255, 0.3)'` | Default border color. |
| **borderWidth** | `string` | `'2px'` | Border width. |
| **borderRadius** | `string` | `'12px'` | Border radius. |
| **borderStyle** | `string` | `'dashed'` | Border style (e.g. `'solid'`, `'dashed'`). |
| **backgroundColor** | `string` | `'transparent'` | Default background. |

**Visual states:** `default` | `hoverValid` | `hoverInvalid`. Styling is applied based on current state.

---

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **style** | `object` | `{}` | Inline styles merged with component styles. |
| **className** | `string` | `''` | Extra CSS classes. |
| **children** | `ReactNode` | — | Content inside the drop zone. Can be a string (centered in flex) or React elements. |

---

## How It's Used in This App

### 1. Inside TableGridComponent

Droppable is **not** defined in PageConfig as a standalone element. It is created by TableGridComponent for each cell in `droppableCells`:

```javascript
// PageConfig - TableGridComponent with droppableCells
{
  componentType: 'TableGridComponent',
  elementName: 'page6-favorite-fruits-table',
  droppableCells: [
    {
      rowIndex: 0,
      colIndex: 1,
      droppableId: 'page6-table-R1C2',
      maxItems: 6,
      placementDirection: 'horizontal',
      acceptValidator: getAcceptValidatorForBase('page6-star'),
      onDrop: createOnDropTableCell(10),
      enabled: true,
      placedItemDraggable: true,
      placedItemTransferable: true,
      clearPlacementOnDropOutside: true
    }
    // ...
  ],
  placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } },
  dropCallbacks: { onAddSuccess, onIncorrectDropInCell, ... }
}
```

### 2. TableGridComponent Creates Droppable

For each droppable cell, TableGridComponent:

- Wraps cell content in `DroppableComponent`
- Passes `acceptValidator` (wrapped with `maxItemsValid` check)
- Passes `onDrop` (wrapped to update placements and invoke `dropCallbacks`)
- Suppresses default border/hover styles (borderStyle: 'none', transparent colors) so the cell styling alone controls appearance
- Renders placed content (images/text) inside the droppable based on `placedContentByDraggableId`

---

## TableGridComponent Integration

### droppableCells Entry

Each entry in `droppableCells` is passed through to the Droppable and controls table-specific behavior:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **rowIndex** | `number` | — | Data row index (0-based). |
| **colIndex** | `number` | — | Column index (0-based). |
| **droppableId** | `string` | — | Unique ID for this cell. |
| **enabled** | `boolean` | `true` | When false, cell is not a drop zone. |
| **maxItems** | `number` | `1` | Max items this cell can hold. |
| **placementDirection** | `'horizontal'` \| `'vertical'` | `'horizontal'` | Layout of placed items in multi-item cells. |
| **acceptValidator** | `(id) => boolean` | — | Must accept draggable IDs. Use `getAcceptValidatorForBase(baseId)` for spawn support. |
| **onDrop** | `(draggableId, droppableId, position) => void` | — | Called on valid drop. Use `createOnDropTableCell(maxItems)` or `onDropTableCell`. |
| **onDropRejected** | `(draggableId, droppableId) => void` | — | Called on rejected drop. |
| **placedItemDraggable** | `boolean` | — | When true, placed items can be dragged again. |
| **placedItemTransferable** | `boolean` | — | When true, placed items can be moved to another cell. |
| **clearPlacementOnDropOutside** | `boolean` | — | When true, dropping a placed item outside any droppable clears it. |

### dropCallbacks

Table-level callbacks invoked by the wrapped `onDrop` / `onDropRejected`:

| Callback | When | Config shape |
|----------|------|--------------|
| **onAddSuccess** | Valid drop | `{ componentId, callback, text?, mode?, getText?: (droppableId) => string }` |
| **onIncorrectDropInCell** | Drop rejected (wrong item or full) | `{ componentId, callback, text, mode }` |
| **onIncorrectDropOutside** | Drop outside any droppable | `{ componentId, callback, text, mode }` |
| **onRemove** | Placed item removed (e.g. dropped outside) | `{ componentId, callback, text, mode }` |
| **onAddAllSuccess** | (Optional) When expected cells are filled | `{ componentId, callback, text, mode }` + `expectedPlacementCount` |

Use `createFeedbackCallback(componentId)` for the `callback` to update a FeedbackTextboxComponent.

### window.tableGridDropQueries

TableGridComponent exposes query helpers:

```javascript
window.tableGridDropQueries[elementName] = {
  getItemsInCell(droppableId) => string[],
  getItemCountsByType(droppableId) => { [baseId]: number }
};
```

Use these for Check button validation or custom logic.

---

## Examples

### Example 1: Single-Item Cell (Apples)

```javascript
{
  rowIndex: 1,
  colIndex: 1,
  droppableId: 'page6-table-R2C2',
  maxItems: 1,
  acceptValidator: getAcceptValidatorForBase('page6-star'),
  onDrop: onDropTableCell,
  enabled: true,
  placedItemDraggable: true,
  placedItemTransferable: false,
  clearPlacementOnDropOutside: true
}
```

### Example 2: Multi-Item Cell (Grapes) with Custom onDrop

```javascript
{
  rowIndex: 0,
  colIndex: 1,
  droppableId: 'page6-table-R1C2',
  maxItems: 6,
  placementDirection: 'horizontal',
  acceptValidator: getAcceptValidatorForBase('page6-star'),
  onDrop: createOnDropTableCell(10),  // Must match or exceed maxItems for arrays
  enabled: true,
  placedItemDraggable: true,
  placedItemTransferable: true,
  clearPlacementOnDropOutside: true
}
```

### Example 3: Reject-All Cell (Show Error on Drop)

```javascript
{
  rowIndex: 1,
  colIndex: 1,
  droppableId: 'page6-table-R2C2',
  acceptValidator: () => false,  // Reject all
  onDrop: onDropTableCell,
  enabled: true
  // onIncorrectDropInCell in dropCallbacks will fire with custom message
}
```

### Example 4: Standalone Droppable (elements-registry)

If you use Droppable outside TableGrid, define it as a custom element:

```javascript
{
  id: 'my-droppable',
  type: 'custom',
  coordinates: [100, 100, 300, 200],
  zIndex: 50,
  props: {
    componentType: 'Droppable',
    droppableId: 'my-drop-zone',
    acceptValidator: (id) => id.startsWith('my-draggable-'),
    onDrop: (draggableId, droppableId) => {
      console.log('Dropped', draggableId, 'on', droppableId);
      // Update placement state...
    },
    children: 'Drop here'
  }
}
```

---

## Do's and Don'ts

### Do's

- **Use unique `droppableId`s:** Each droppable must have a unique ID.
- **Use `getAcceptValidatorForBase` for spawned draggables:** Accepts base + all spawned IDs:

  ```javascript
  acceptValidator: getAcceptValidatorForBase('page6-star')
  ```

- **Match `createOnDropTableCell(maxItems)` to cell `maxItems`:** For cells with `maxItems > 1`, use `createOnDropTableCell(10)` or a value ≥ maxItems to store arrays correctly.
- **Provide `placedContentByDraggableId`:** Map each draggable base ID to `{ imageSrc }` or `{ text }` so placed content renders.
- **Wire up dropCallbacks:** Use `createFeedbackCallback(componentId)` to update feedback on success/error.
- **Disable visual feedback when using table cells:** TableGrid passes `borderStyle: 'none'`, `hoverBorderColor: 'transparent'`, etc., so cell styles alone control appearance.
- **Use `clearPlacementOnDropOutside: true`** when you want dropped-outside to remove the item from the cell.

### Don'ts

- **Don't use `acceptValidator: (id) => id === 'page6-star'` with spawn:** Spawned IDs (`page6-star-1`, …) will be rejected. Use `getAcceptValidatorForBase('page6-star')`.
- **Don't forget to update `window.dragDropPlacements` in onDrop:** The table reads from this for rendering. Use `createOnDropTableCell` or equivalent.
- **Don't use `createOnDropTableCell(1)` for a cell with `maxItems: 6`:** Mismatch causes placement bugs. Use `createOnDropTableCell(10)` or higher.
- **Don't nest Droppables:** One droppable per logical zone.
- **Don't rely on Droppable's default border for table cells:** TableGrid overrides it; use table cell style overrides instead.
- **Don't use the same `droppableId` in multiple tables or cells:** IDs must be globally unique for DragDropContext.
- **Don't omit `droppableId`:** It is required for registration.

### Common Mistakes

1. **Accept validator too strict:**

   ```javascript
   // Wrong
   acceptValidator: (id) => id === 'page6-star'

   // Correct (with spawn)
   acceptValidator: getAcceptValidatorForBase('page6-star')
   ```

2. **onDrop / maxItems mismatch:**

   ```javascript
   // Wrong: maxItems 6 but onDrop stores single value
   maxItems: 6,
   onDrop: onDropTableCell  // = createOnDropTableCell(1)

   // Correct
   maxItems: 6,
   onDrop: createOnDropTableCell(10)
   ```

3. **Missing placedContentByDraggableId:** Placed items won't render:

   ```javascript
   placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } }
   ```

---

## File Locations

- **Component:** `js/components/droppable-component.js`
- **Table usage:** `js/components/table-grid-component.js` (droppableCells, dropCallbacks)
- **PageConfig:** `js/PageConfig.js` (droppableCells, createOnDropTableCell, getAcceptValidatorForBase)
- **Elements registry:** `js/components/elements-registry.js` (standalone Droppable support)
