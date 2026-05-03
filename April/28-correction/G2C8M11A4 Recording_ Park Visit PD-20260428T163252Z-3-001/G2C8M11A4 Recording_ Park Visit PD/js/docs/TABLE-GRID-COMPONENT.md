# TableGridComponent — Complete Documentation

A React component for rendering structured tables with optional **droppable cells** for drag-and-drop. Used for the Favorite Fruits Picture Diagram where users place stars into table cells. Integrates with the Droppable component, Draggable component, and `window.DragDropContext`.

---

## Table of Contents

1. [Overview](#overview)
2. [Droppable Cells — Deep Dive](#droppable-cells--deep-dive)
3. [Props Reference](#props-reference)
4. [Placement System & window.dragDropPlacements](#placement-system--windowdragdropplacements)
5. [dropCallbacks](#dropcallbacks)
6. [tableGridDropQueries](#tablegriddropqueries)
7. [PageConfig Integration](#pageconfig-integration)
8. [Examples](#examples)
9. [Do's and Don'ts](#dos-and-donts)

---

## Overview

TableGridComponent:

- Renders a table from `tableData` (headers + rows)
- Optionally turns cells into drop zones via `droppableCells`
- Wraps each droppable cell with the Droppable component (border/hover suppressed so cell styling controls appearance)
- Manages placements in `window.dragDropPlacements`
- Dispatches feedback via `dropCallbacks`
- Exposes `window.tableGridDropQueries[elementName]` for Check buttons and custom logic

**Structure:** `div (container) > table > thead/tbody > th/td`. Droppable cells are `<td>` elements whose content is wrapped in `DroppableComponent`.

---

## Droppable Cells — Deep Dive

### How Droppable Is Used
expectedPlacementCount
1. **droppableCells config** — Array of per-cell configs; each maps `(rowIndex, colIndex)` to a drop zone.
2. **Cell matching** — For each data cell `(rowIndex, colIndex)`, TableGrid looks up a matching `droppableCells` entry.
3. **Droppable creation** — If `dropZonesEnabled` and the cell has config with `enabled !== false`, the cell content is wrapped in `DroppableComponent`.
4. **Wrapped props** — TableGrid passes:
   - `droppableId`, `acceptValidator` (wrapped with `maxItemsValid`), `onDrop`, `onDropRejected`
   - Style overrides so the Droppable adds no border or hover styling (cell styles control appearance)
   - Children = placed content (images/text) or empty slots
5. **Placement rendering** — Placed items come from `placedContentByDraggableId`. When `placedItemDraggable`, placed items are re-wrapped in Draggable for transfers.

### Droppable Cell Slot Layout

- **Single item (maxItems: 1):** One full-size slot.
- **Multi-item (maxItems > 1):** Slots laid out in a row (`placementDirection: 'horizontal'`) or column (`'vertical'`).
- **Slot sizing:** `calc((100% - 8px * (n-1)) / n)` with 8px gap.
- **Order:** First placed → slot 0, second → slot 1, etc.

### Validation Flow

1. **acceptValidator** — Validates draggable type (e.g. `getAcceptValidatorForBase('page6-star')`).
2. **maxItemsValid** — TableGrid wraps this; rejects when cell is full (except when moving from another cell).
3. **Transfer rules** — Moving from cell A to B requires `placedItemTransferable: true` on A.

---

## Props Reference

### Table Data & Structure

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **tableData** | `object` | `{ headers: [], rows: [] }` | Table content. `headers`: array of strings or `{ text, colSpan }`. `rows`: array of rows; each row is array of cells (string or `{ text, colSpan }`). |
| **elementName** | `string` | — | Used as key for `tableGridDropQueries` and cell IDs. E.g. `'page6-favorite-fruits-table'`. |

### Cell Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **borderColor** | `string` | `'#ffffff'` | Cell border color. |
| **borderWidth** | `string` | `'2gc'` | Cell border width. |
| **borderRadius** | `string` | `'8gc'` | Table outer border radius. |
| **cellBorderRadius** | `string` | `'12gc'` | Individual cell border radius. Requires `border-collapse: separate` when > 0. |
| **padding** | `string` | `'15gc'` | Cell padding. |
| **textColor** | `string` | `'#ffffff'` | Default text color. |
| **fontSize** | `string` | `'28gc'` | Default font size. |
| **headerFontSize** | `string` | `'32gc'` | Header font size. |
| **headerBackgroundColor** | `string` | `'#2a3f5f'` | Header row background. |
| **headerTextColor** | `string` | — | Header text color (defaults to textColor). |
| **cellBackgroundColor** | `string` | `'transparent'` | Default cell background. |
| **dataRowBackgroundColors** | `object` \| `array` | `[]` | Per data-row background, e.g. `{ 0: '#053745', 1: '#053745' }`. |
| **rowOverrides** | `object` | `{}` | Per-row overrides: `{ 4: { fontSize: '28gc', fontStyle: 'italic' } }`. |
| **dataColumnTextAlign** | `object` | `{}` | Per-column alignment: `{ 0: 'left', 1: 'center' }`. |
| **columnWidths** | `array` | `[]` | Column widths, e.g. `['30%', '70%']`. |
| **rowGap** | `string` | `'0gc'` | Gap between rows. |
| **columnGap** | `string` | `'0gc'` | Gap between columns. |
| **equalRowHeights** | `boolean` | `false` | When true, rows share height equally. |
| **equalColumnWidths** | `boolean` | `false` | When true, columns share width equally. |

### Table Container

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **tableBorder** | `boolean` | `true` | Show outer table border. |
| **tableBorderColor** | `string` | `'#0762a4b9'` | Table container border color. |
| **tableBorderWidth** | `string` | `'2gc'` | Table container border width. |
| **tableBorderRadius** | `string` | `'8gc'` | Table container border radius. |
| **tableBackground** | `string` | `'transparent'` | Table container background. |

### Droppable-Related Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **droppableCells** | `array` | `[]` | Array of droppable cell configs. See [droppableCells](#droppablecells). |
| **dropZonesEnabled** | `boolean` | `true` | When false, droppable cells render as normal cells (no drop zones). |
| **placedContentByDraggableId** | `object` | `{}` | Map `draggableId` → `{ imageSrc }` or `{ text }` for placed content. |
| **droppableCellMaxHeight** | `string` | `'5em'` | Max height for droppable cells to limit row expansion. |
| **placedItemDraggable** | `boolean` | `false` | When true, placed items can be dragged again. Overridable per cell. |
| **dropCallbacks** | `object` | `{}` | Feedback callbacks. See [dropCallbacks](#dropcallbacks). |

### droppableCells

Each entry:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **rowIndex** | `number` | — | Data row index (0-based). |
| **colIndex** | `number` | — | Column index (0-based). |
| **droppableId** | `string` | — | Unique ID, e.g. `'page6-table-R1C2'`. |
| **name** | `string` | — | Optional label for the drop zone (e.g. `'Grapes'`). Set as `aria-label` on the cell for accessibility. |
| **enabled** | `boolean` | `true` | When false, cell is not a drop zone. |
| **maxItems** | `number` | `1` | Max items in this cell. |
| **placementDirection** | `'horizontal'` \| `'vertical'` | `'horizontal'` | Layout of placed items. |
| **acceptValidator** | `(id) => boolean` | — | Must return true for accepted draggables. Use `getAcceptValidatorForBase(baseId)`. |
| **onDrop** | `(draggableId, droppableId, position) => void` | — | Called on valid drop. Use `createOnDropTableCell(maxItems)` or `onDropTableCell`. |
| **onDropRejected** | `(draggableId, droppableId) => void` | — | Called on rejected drop. |
| **placedItemDraggable** | `boolean` | — | Override: can placed items be dragged again? |
| **placedItemTransferable** | `boolean` | — | Override: can placed items be moved to another cell? |
| **clearPlacementOnDropOutside** | `boolean` | — | When true, dropping outside clears the item from this cell. |
| **initialPlacementIds** | `string[]` | — | Draggable IDs to place in this cell by default. Count is capped at `maxItems`. These behave exactly like manually dropped items (draggable, transferable, counted). Only applied when the cell is currently empty. Each ID must exist in `placedContentByDraggableId` and be accepted by `acceptValidator`. |

---

## Placement System & window.dragDropPlacements

### Structure

```javascript
window.dragDropPlacements = {
  'page6-table-R1C2': 'page6-star' | ['page6-star', 'page6-star-1', ...],  // single or array
  'page6-table-R2C2': 'page6-star-2'
};
```

- **Single item:** Value is a string (draggableId).
- **Multiple items:** Value is an array of draggableIds.

### How It's Updated

1. **onDrop** — Your `createOnDropTableCell(maxItems)` or `onDropTableCell` updates `window.dragDropPlacements` and dispatches `dragDropPlacement`.
2. **Drag from another cell** — Removes from source, adds to target.
3. **Drop outside** — If `clearPlacementOnDropOutside`, the table listens to `dragDropEndedOutside` and clears the item.

4. **initialPlacementIds** — On mount, for each droppable cell that has `initialPlacementIds` and no current placements, the table seeds `window.dragDropPlacements` with those IDs (capped at `maxItems`). Those items behave like manually dropped items (draggable, transferable, counted by getItemCountsByType).

### createOnDropTableCell(maxItems)

From PageConfig.js:

```javascript
const createOnDropTableCell = (maxItems = 1) => (draggableId, droppableId) => {
  // 1. Remove draggableId from any existing placement (transfer)
  // 2. Add to droppableId: array if maxItems > 1, else single
  // 3. Dispatch dragDropPlacement
  // 4. Call trySpawnDraggableAfterDrop(draggableId)
};
```

**Important:** Pass `maxItems` ≥ the cell's `maxItems`. E.g. cell `maxItems: 6` → `createOnDropTableCell(10)`.

---

## dropCallbacks

Table-level callbacks for feedback. Each entry:

```javascript
{
  componentId: 'page6-feedback-textbox',
  callback: createFeedbackCallback('page6-feedback-textbox'),
  text: 'Great job!',
  mode: 'correct',
  getText: (droppableId) => string  // optional, overrides text per cell
}
```

| Callback | When | Use |
|----------|------|-----|
| **onAddSuccess** | Valid drop | Success feedback. Use `getText(droppableId)` for per-cell messages (e.g. grape count). |
| **onAddAllSuccess** | (Optional) When `expectedPlacementCount` cells filled | "All correct" feedback. |
| **onIncorrectDropInCell** | Drop rejected (wrong item or full) | "Try again" or custom message. |
| **onIncorrectDropOutside** | Drop outside any droppable | "Drop inside the cell" or similar. |
| **onRemove** | Placed item removed (e.g. dropped outside) | "Item removed" or neutral message. |

Use `createFeedbackCallback(componentId)` so the callback updates the FeedbackTextboxComponent.

---

## tableGridDropQueries

Exposed at `window.tableGridDropQueries[elementName]`:

```javascript
{
  getItemsInCell(droppableId) => string[],
  getItemCountsByType(droppableId) => { [baseId]: number }
}
```

- **getItemsInCell** — Array of draggableIds in the cell.
- **getItemCountsByType** — Counts by base ID, e.g. `{ 'page6-star': 5 }`.

Used by Check buttons and custom logic.

---

## PageConfig Integration

### Defining a Table with Droppable Cells

```javascript
{
  id: 'page6-favorite-fruits-table',
  name: 'page6-favorite-fruits-table',
  type: 'custom',
  coordinates: [711, 256, 1500, 775],
  zIndex: 50,
  props: {
    componentType: 'TableGridComponent',
    elementName: 'page6-favorite-fruits-table',
    tableData: {
      headers: [{ text: 'Favorite Fruits Picture Diagram', colSpan: 2 }],
      rows: [
        ['Grapes', ''],
        ['Apples', ''],
        ['Rambutans', ''],
        ['Pineapples', ''],
        [{ text: '*Each star = 1 fruit', colSpan: 2 }]
      ]
    },
    columnWidths: ['30%', '70%'],
    dataRowBackgroundColors: { 0: '#053745', 1: '#053745', 2: '#053745', 3: '#053745', 4: '#202930b9' },
    droppableCells: [
      { rowIndex: 0, colIndex: 1, droppableId: 'page6-table-R1C2', maxItems: 6, placementDirection: 'horizontal', acceptValidator: getAcceptValidatorForBase('page6-star'), onDrop: createOnDropTableCell(10), enabled: true, placedItemDraggable: true, placedItemTransferable: true, clearPlacementOnDropOutside: true },
      { rowIndex: 1, colIndex: 1, droppableId: 'page6-table-R2C2', maxItems: 1, acceptValidator: () => false, onDrop: onDropTableCell, enabled: true }
    ],
    placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } },
    dropCallbacks: {
      onAddSuccess: { componentId: 'page6-feedback-textbox', callback: createFeedbackCallback('page6-feedback-textbox'), ... },
      onIncorrectDropInCell: { ... },
      onIncorrectDropOutside: { ... },
      onRemove: { ... }
    }
  }
}
```

---

## Examples

### Example 1: Single-Item Drop Zone (Apples)

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

### Example 2: Multi-Item Drop Zone (Grapes)

```javascript
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
```

### Example 3: Reject-All Cell (Custom Feedback)

```javascript
{
  rowIndex: 1,
  colIndex: 1,
  droppableId: 'page6-table-R2C2',
  acceptValidator: () => false,
  onDrop: onDropTableCell,
  enabled: true
}
// dropCallbacks.onIncorrectDropInCell: "Oops! Place the stars in the grapes row."
```

### Example 4: Custom onAddSuccess Message (Grape Count)

```javascript
onAddSuccess: {
  componentId: 'page6-feedback-textbox',
  callback: createFeedbackCallback('page6-feedback-textbox'),
  text: getI18nText('feedback.correct', 'Great job!'),
  mode: 'correct',
  getText: (droppableId) => {
    if (droppableId !== 'page6-table-R1C2') return getI18nText('feedback.correct', 'Great job!');
    const queries = window.tableGridDropQueries['page6-favorite-fruits-table'];
    const counts = queries ? queries.getItemCountsByType(droppableId) : {};
    const grapeCount = counts['page6-star'] || 0;
    const grapeWord = grapeCount === 1 ? 'grape' : 'grapes';
    return `Yay! You placed a star.<br>This represents ${grapeCount} ${grapeWord}.`;
  }
}
```

---

## Do's and Don'ts

### Do's

- **Use `getAcceptValidatorForBase(baseId)`** for cells accepting spawned draggables.
- **Match `createOnDropTableCell(maxItems)` to cell `maxItems`** — use ≥ cell maxItems, e.g. `createOnDropTableCell(10)` for `maxItems: 6`.
- **Provide `placedContentByDraggableId`** for every draggable type placed in cells.
- **Set unique `droppableId`s** — e.g. `page6-table-R1C2`, `page6-table-R2C2`.
- **Use `elementName`** so `tableGridDropQueries` and callbacks can target this table.
- **Use `createFeedbackCallback(componentId)`** for dropCallbacks.
- **Set `cellBorderRadius`** for rounded cells; the table switches to `border-collapse: separate` when needed.

### Don'ts

- **Don't use `acceptValidator: (id) => id === 'page6-star'`** with spawn — use `getAcceptValidatorForBase('page6-star')`.
- **Don't use `createOnDropTableCell(1)` for cells with `maxItems > 1`** — causes placement bugs.
- **Don't omit `placedContentByDraggableId`** — placed items won't render.
- **Don't reuse `droppableId`s** across tables or pages.
- **Don't expect Droppable's default border** in table cells — TableGrid suppresses it; use cell styles.
- **Don't put `dropZonesEnabled: false`** if you want drop zones — they'll render as normal cells.
- **Don't forget `clearPlacementOnDropOutside`** — set to true when dropped-outside should clear the item.

### Common Mistakes

1. **onDrop / maxItems mismatch:**
   ```javascript
   // Wrong
   maxItems: 6, onDrop: onDropTableCell

   // Correct
   maxItems: 6, onDrop: createOnDropTableCell(10)
   ```

2. **Rejecting spawned IDs:**
   ```javascript
   // Wrong
   acceptValidator: (id) => id === 'page6-star'

   // Correct
   acceptValidator: getAcceptValidatorForBase('page6-star')
   ```

3. **Missing placedContentByDraggableId:**
   ```javascript
   placedContentByDraggableId: { 'page6-star': { imageSrc: 'assets/star.png' } }
   ```

---

## File Locations

- **Component:** `js/components/table-grid-component.js`
- **PageConfig:** `js/PageConfig.js` (createOnDropTableCell, getAcceptValidatorForBase, droppableCells, dropCallbacks)
- **Related:** `js/components/droppable-component.js`, `js/components/draggable-component.js`
