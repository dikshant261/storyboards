# Draggable Component — Complete Documentation

A generic React component for click-and-drag interactions. Used with the Droppable component and `window.DragDropContext` for drag-and-drop activities in the Favorite Fruits Picture Diagram app.

---

## Table of Contents

1. [Overview](#overview)
2. [Props Reference](#props-reference)
3. [How It's Used in This App](#how-its-used-in-this-app)
4. [Integration with PageConfig](#integration-with-pageconfig)
5. [Spawn System](#spawn-system)
6. [Examples](#examples)
7. [Do's and Don'ts](#dos-and-donts)

---

## Overview

The Draggable component:

- Handles mouse and touch drag interactions
- Uses `window.DragDropContext` to coordinate with Droppable zones
- Supports spawning multiple instances (e.g. infinite stars after each drop)
- Hides at origin when placed in a drop zone (move semantics)
- Uses a drag threshold to avoid accidental drags when clicking

**UX principles:**

- Dragged item stays visible with slight opacity change
- Non-dragged items dim during another drag
- Drop moment is kept minimal (no heavy animation)

---

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| **draggableId** | `string` | Unique identifier for this draggable. Used by Droppable `acceptValidator`, `window.DragDropContext`, and placement logic. Must be unique per instance. |

**Example:** `draggableId: 'page6-star'` (base) or `draggableId: 'page6-star-1'` (spawned instance).

---

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **imageSrc** | `string` | — | Path to an image (e.g. `'assets/star.png'`). When set, the Draggable renders an `<img>` instead of `children`. |
| **imageAlt** | `string` | `''` | Alt text for the image. |
| **children** | `ReactNode` | — | Custom content. Used when `imageSrc` is not set. Can be a string (rendered in a div) or React elements. |

**Behavior:** If `imageSrc` is set, it takes precedence. Otherwise, `children` (string or node) are used.

---

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| **onDragStart** | `(draggableId: string, position: { x, y }) => void` | Called when the user starts a drag. |
| **onDragMove** | `(draggableId: string, position: { x, y }) => void` | Called while the user moves the pointer during a drag. |
| **onDragEnd** | `(draggableId: string, position: { x, y }) => void` | Called when the user releases (mouseup/touchend). Position is drop location. Used by the drop system to detect which Droppable was hit. |

**Note:** The component uses `DragDropContext.notifyDragStart`, `notifyDragMove`, and `notifyDragEnd`. The Droppable layer handles hit-testing and `onDrop`; you typically do not need to implement these callbacks unless you need custom logic.

---

### State & Constraints

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **isDisabled** | `boolean` | `false` | When true, drag is disabled (cursor: not-allowed, pointer-events: none). |
| **isAnimating** | `boolean` | `false` | Used during animations; blocks new drags. |
| **isAnyDragging** | `boolean` | `false` | Set when another Draggable is being dragged. |
| **currentDraggingId** | `string` | `null` | ID of the currently dragged item. When set with `isAnyDragging`, non-dragged items are dimmed and not draggable. |

---

### Behavior

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **dragThreshold** | `number` | `5` | Minimum pixel movement before a drag starts. Reduces accidental drags on click. |

---

### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **style** | `object` | `{}` | Inline styles merged with component defaults. Position (`left`, `top`), size (`width`, `height`), and `zIndex` come from the element’s coordinates in most cases. |
| **className** | `string` | `''` | Extra CSS classes. |

**Note:** `elementZIndex`, `componentType`, `processedStyles`, `position` are consumed by the element renderer and not passed to the DOM.

---

### Spawn System (Config-Only)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **spawnCount** | `number` | — | If set, enables spawning. `-1` = infinite spawns after each drop, `0` = no spawns, `n` = up to `n` extra spawns. Used by math-applet; not passed to the Draggable DOM. |

**Important:** `spawnCount` is read by the math-applet element renderer and used to manage `window.draggableSpawnState`. Do not pass it into the Draggable component itself.

---

## How It's Used in This App

### 1. PageConfig Definition

Draggables are defined as `custom` elements with `componentType: 'Draggable'`:

```javascript
{
  id: 'page6-draggable-star',
  name: 'page6-draggable-star',
  type: 'custom',
  coordinates: [100, 200, 200, 300],  // [left, top, right, bottom]
  zIndex: 70,
  props: {
    componentType: 'Draggable',
    draggableId: 'page6-star',
    imageSrc: 'assets/star.png',
    imageAlt: 'Star',
    spawnCount: -1
  }
}
```

### 2. Element Renderer (math-applet.js)

- Converts `coordinates` to CSS (left, top, width, height).
- If `spawnCount` is set:
  - Initializes `window.draggableSpawnState[baseId]`.
  - Renders one Draggable per ID in `ids` (base + spawned).
  - Hides the origin when a draggable is in `placedDraggableIds`.
- Passes `position.css`, `processedStyles`, `draggableId`, etc. to `createCustomElement`.

### 3. Elements Registry (elements-registry.js)

- Detects `componentType === 'Draggable'`.
- Merges `otherProps` with `processedStyles`.
- Keeps `draggableId` from `otherProps` so spawned IDs (`page6-star-1`, …) are not overwritten.
- Creates the Draggable with merged props.

### 4. Droppable Integration

- Droppable cells use `acceptValidator` (e.g. `getAcceptValidatorForBase('page6-star')`) to allow the base and all spawned IDs.
- On valid drop: `onDrop` updates `window.dragDropPlacements`, `trySpawnDraggableAfterDrop` runs, and `dragDropPlacement` / `draggableSpawnUpdate` events are fired.
- Droppable uses `DragDropContext` for hit-testing on `notifyDragEnd`.

---

## Integration with PageConfig

### Minimal Draggable (no spawn)

```javascript
{
  id: 'page6-draggable-star',
  name: 'page6-draggable-star',
  type: 'custom',
  coordinates: [100, 200, 200, 300],
  zIndex: 70,
  props: {
    componentType: 'Draggable',
    draggableId: 'page6-star',
    imageSrc: 'assets/star.png'
  }
}
```

### Draggable with Infinite Spawn

```javascript
props: {
  componentType: 'Draggable',
  draggableId: 'page6-star',
  imageSrc: 'assets/star.png',
  imageAlt: 'Star',
  spawnCount: -1   // New star after each drop
}
```

### Droppable Cell Accepting This Draggable

```javascript
// In TableGridComponent droppableCells:
{
  rowIndex: 0,
  colIndex: 1,
  droppableId: 'page6-table-R1C2',
  acceptValidator: getAcceptValidatorForBase('page6-star'),  // Accepts page6-star, page6-star-1, page6-star-2, ...
  onDrop: createOnDropTableCell(10)
}
```

---

## Spawn System

### `window.draggableSpawnState`

```javascript
window.draggableSpawnState[baseId] = {
  spawnCount: -1 | 0 | n,
  ids: ['page6-star', 'page6-star-1', 'page6-star-2', ...]
}
```

- **spawnCount -1:** Infinite spawns; a new ID is added after each drop.
- **spawnCount 0:** No spawns after the first drop.
- **spawnCount n:** Up to n additional IDs after the base.

### Helpers

- **`window.getDraggableBaseId(draggableId)`** — Returns base ID (e.g. `page6-star` for `page6-star-2`).
- **`getAcceptValidatorForBase(baseId)`** — Returns a validator that accepts the base and all spawned IDs.
- **`window.trySpawnDraggableAfterDrop(draggableId)`** — Called from `onDrop` to add the next spawned ID and dispatch `draggableSpawnUpdate`.

---

## Examples

### Example 1: Single Draggable Star (no spawn)

```javascript
{
  id: 'mypage-draggable',
  name: 'mypage-draggable',
  type: 'custom',
  coordinates: [80, 150, 180, 250],
  zIndex: 60,
  props: {
    componentType: 'Draggable',
    draggableId: 'mypage-star',
    imageSrc: 'assets/star.png'
  }
}
```

### Example 2: Draggable with 3 Extra Spawns

```javascript
props: {
  componentType: 'Draggable',
  draggableId: 'mypage-token',
  imageSrc: 'assets/token.png',
  spawnCount: 3   // Base + 3 spawned = 4 total max
}
```

### Example 3: Text Content Instead of Image

```javascript
props: {
  componentType: 'Draggable',
  draggableId: 'mypage-label',
  children: 'Drag me'
}
```

---

## Do's and Don'ts

### Do's

- **Use unique `draggableId`s:** Each instance (including spawned) must have a unique ID.
- **Pair with `getAcceptValidatorForBase`:** Use the base ID (e.g. `'page6-star'`) so spawned IDs are accepted:

  ```javascript
  acceptValidator: getAcceptValidatorForBase('page6-star')
  ```

- **Set `spawnCount` in props:** The math-applet reads it; do not pass it into the Draggable’s internal props.
- **Give clear coordinates:** Use `[left, top, right, bottom]` for layout.
- **Place Droppable cells first:** Ensure `window.tableGridDropQueries` and `dragDropPlacements` are set up before drops.
- **Include `placedContentByDraggableId`:** Map each draggable (base) ID to how it should look when placed:

  ```javascript
  placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } }
  ```

### Don'ts

- **Don’t pass `spawnCount` to the Draggable component:** It is handled by the element renderer.
- **Don’t use the same `draggableId` for multiple elements:** Each Draggable must have its own ID.
- **Don’t overwrite `draggableId` in `processedStyles`:** elements-registry keeps `otherProps.draggableId` to preserve spawned IDs.
- **Don’t use `acceptValidator` that only checks the base ID:** Spawned IDs (`baseId-1`, `baseId-2`, …) will be rejected; use `getAcceptValidatorForBase(baseId)`.
- **Don’t block `touchAction`:** The component uses `touchAction: 'none'`; overriding it can break touch drag.
- **Don’t nest Draggables:** Nested drag targets cause unpredictable behavior.
- **Don’t rely on `onDragEnd` for drop logic:** Drop handling is done via Droppable’s `onDrop` and `DragDropContext`.

### Common Mistakes

1. **Wrong `acceptValidator`:**

   ```javascript
   // Wrong — only accepts 'page6-star', not page6-star-1, page6-star-2
   acceptValidator: (id) => id === 'page6-star'

   // Correct
   acceptValidator: getAcceptValidatorForBase('page6-star')
   ```

2. **Missing `placedContentByDraggableId`:** Placed items need a mapping for rendering:

   ```javascript
   placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } }
   ```

3. **Mismatch between spawn `maxItems` and `createOnDropTableCell`:** If a cell has `maxItems: 10`, use `createOnDropTableCell(10)` so placements are stored correctly for multiple items.

---

## File Locations

- **Component:** `js/components/draggable-component.js`
- **PageConfig usage:** `js/PageConfig.js` (pages 3 & 6)
- **Element renderer:** `js/math-applet.js` (spawn logic, placement hiding)
- **Registry:** `js/components/elements-registry.js` (createCustomElement)
- **Spawn/placement helpers:** `js/PageConfig.js` (`getAcceptValidatorForBase`, `trySpawnDraggableAfterDrop`)
