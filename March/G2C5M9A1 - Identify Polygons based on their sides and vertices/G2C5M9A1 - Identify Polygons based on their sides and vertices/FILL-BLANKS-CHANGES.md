## Fill Blanks Component – Change Log

### File
- **Component**: `js/components/fill-blanks-component.js`

### 1. Special placement for last option (MCQ & DND)
- **Behavior**: When the options tray is using **auto grid layout** with **3 columns** and **4 rows** (`optionsColumns === 3` and `optionsRows === 4`), the **last option** in the `options` array is always positioned at:
  - **Column**: 2  
  - **Row**: 4
- **Implementation**:
  - Inside `renderOptionTiles`, during `options.forEach(...)`:
    - Added:
      - `isLastOptionSpecialPlacement` to detect this condition.
      - `specialGridStyle = { gridColumnStart: 2, gridRowStart: 4 }` when the condition is true, otherwise `{}`.
    - `specialGridStyle` is spread into the style of:
      - MCQ option container.
      - DND `Draggable` option container.
      - DND non-draggable fallback `div`.
- **Effect**: The last MCQ/DND option visually appears at **(column 2, row 4)** in the 3×4 options grid without changing the logical order of the `options` array.

### 2. Temporary wrong-value display inside blanks (3 seconds, salmon)

#### New state
- Added React state:
  - `temporarilyWrongBlanks` – `Set` of blank IDs that are currently showing a **temporary wrong value**.
- Persistence:
  - Included in the global `window.fillBlanksStateStore`:
    - Save: `temporarilyWrongBlanks: Array.from(temporarilyWrongBlanks)`
    - Restore: `setTemporarilyWrongBlanks(new Set(savedState.temporarilyWrongBlanks || []))`

#### Rendering changes in blanks
- In `renderBlankTiles`:
  - Derived flags:
    - `isUnfilled = !filledBlanks[blank.id]`
    - `isTemporarilyWrong = temporarilyWrongBlanks.has(blank.id)`
  - **Background color**:
    - If `isTemporarilyWrong` is true:
      - Use **salmon**: `backgroundColor = '#fa8072'`.
    - Else the previous wiggle/other logic is unchanged.
  - **Content**:
    - When:
      - The blank has an option assigned (`filledOption` exists),
      - That option is **not actually correct** for this blank (`!isCorrectlyFilled`),
      - And `isTemporarilyWrong` is true,
    - Then the blank displays the **wrong option’s text**:
      - Uses `convertLatexFractions`.
      - Cleans inline `style` color attributes.
      - Wraps with a `span` using the blank (or global) font color so the text is readable.

#### MCQ (click) – wrong option (no valid blank)
- Location: `handleOptionClick`, `mode === 'MCQ'`, branch where normalized `blankIDArray.length === 0` (option has **no correct blank**).
- Previous behavior:
  - Mark option as incorrect (`incorrectlyClickedOptions`).
  - Show incorrect feedback text.
  - Option turns salmon and becomes disabled.
  - Optional wiggle of unfilled blanks (if `highlightUnfilledBlanksOnWrong`).
- **New behavior added**:
  - Compute `targetBlankIds` as:
    - All blanks where:
      - `!filledBlanks[blank.id]` (currently empty), and
      - `getFillableBlankIds.includes(blank.id)` (fillable via options).
  - If `targetBlankIds.length > 0`:
    - Add each `id` in `targetBlankIds` to `temporarilyWrongBlanks`.
    - Set those blanks in `filledBlanks` to this **wrong option’s ID**.
    - Start a `setTimeout` of **3000 ms**:
      - After 3 seconds:
        - For each `id` in `targetBlankIds`:
          - If the blank is still filled with this wrong option:
            - Remove it from `filledBlanks` (back to empty).
        - Remove those IDs from `temporarilyWrongBlanks`.
- Effect:
  - When the user clicks an option that **cannot be placed anywhere**:
    - All currently empty, fillable blanks briefly show that wrong text with a **salmon background** for **3 seconds**, then clear.

#### DND (drag & drop) – wrong drop on a blank
- Location: `onDragEnd` inside `Draggable` branch, in the `else` block when `isCorrect` is false but `blankId` exists (a wrong drop on a droppable blank).
- Previous behavior:
  - Wiggle the option (`wigglingOptions` with timeout).
  - Show incorrect feedback.
  - Play wrong sound.
- **New behavior added**:
  - Captures `previousFilled = filledBlanks[blankId]` before change.
  - Marks the `blankId` as temporarily wrong:
    - Add `blankId` to `temporarilyWrongBlanks`.
    - Set `filledBlanks[blankId] = id` (wrong option in this blank).
  - Starts a `setTimeout` of **3000 ms**:
    - After 3 seconds:
      - If the blank is still showing this wrong option:
        - If `previousFilled` was defined:
          - Restore `filledBlanks[blankId] = previousFilled`.
        - Else:
          - Delete `filledBlanks[blankId]` (make it empty again).
      - Remove `blankId` from `temporarilyWrongBlanks`.
- Effect:
  - When a user drops an option on a **wrong blank**:
    - That blank briefly shows the wrong text with a **salmon background** for **3 seconds**.
    - Then it reverts to its previous content (or empty).

### Summary of user-visible behavior
- **Last option positioning** (for 3×4 auto grid):
  - The last MCQ/DND option always appears at **column 2, row 4** of the options grid.
- **Temporary wrong answer feedback inside blanks**:
  - **MCQ click on an option with no valid blank**:
    - All empty, fillable blanks show that wrong text in salmon for 3 seconds, then clear.
  - **DND wrong drop on a blank**:
    - The target blank shows that wrong text in salmon for 3 seconds, then restores its previous value or empties again.

