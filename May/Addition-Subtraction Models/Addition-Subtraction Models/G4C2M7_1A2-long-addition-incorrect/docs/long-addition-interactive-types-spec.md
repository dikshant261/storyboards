# Long Addition Component - Interactive Types Specification

**Version:** 1.0  
**Date:** May 5, 2026  
**Status:** Draft for Review

---

## Overview

This specification defines four interaction types for the Long Addition Component, transforming it from a passive demonstration tool into an interactive learning system.

### Type Modes

| Type | Description | User Role | Validation |
|------|-------------|-----------|------------|
| `auto` | Automated step reveal | Observer | None |
| `guided` | Step-by-step prompts | Active participant | Per-action |
| `incorrect` | Error identification | Error detective | On selection |
| `fill-missing` | Complete blanks | Problem solver | On entry |

---

## 1. Type: `auto` (Default)

### Description
Current behavior - automated step-by-step reveal with optional commentary.

### Props
```javascript
{
  type: 'auto',
  mode: 'self' | 'controlled',
  autoPlay: true,
  stepDurationMs: 700,
  startDelayMs: 400,
  loop: false,
  // ... existing props
}
```

### Behavior
- No changes to existing implementation
- Steps advance automatically (self mode) or via parent control (controlled mode)
- No user interaction required
- Optional commentary can be displayed externally (not in component scope)

### Callbacks
```javascript
onStepChange: (step) => void
onComplete: () => void
```

---

## 2. Type: `guided` (Interactive Tutorial)

### Description
User performs each step with prompts and validation. Component guides the user through the addition process by requesting specific actions.

### Cell Identification System
```javascript
CellId = {
  panel: 'simple' | 'expanded',
  row: 'header' | 'place' | 'operand-0' | 'operand-1' | 'operand-N' | 'sum',
  column: 'TTh' | 'Th' | 'H' | 'T' | 'O'
}
```

### Props
```javascript
{
  type: 'guided',
  variant: 'simple' | 'expanded' | 'both', // Required
  numbers: [5459, 3965], // The problem
  
  // Guided-specific
  guidedSteps: [
    {
      stepId: 0,
      instruction: "Click the header for the Ones column",
      action: { type: 'select-cell', panel: 'simple', row: 'header', column: 'O' },
      highlightCell: true, // Show yellow outline on target
      showHint: false
    },
    {
      stepId: 1,
      instruction: "Enter the first digit in the Ones column",
      action: { type: 'enter-value', panel: 'simple', row: 'operand-0', column: 'O', expectedValue: '9' },
      highlightCell: true,
      showHint: false,
      enableNumberPad: true
    },
    {
      stepId: 2,
      instruction: "Select the second operand's Ones digit",
      action: { type: 'select-cell', panel: 'simple', row: 'operand-1', column: 'O' },
      highlightCell: false, // User must find it
      showHint: true, // Show hint button
      hint: "Look at the bottom number in the Ones column"
    },
    // ... more steps
  ],
  
  // Visual feedback
  showExpectedAction: true, // Show what's expected in instruction area
  highlightMode: 'subtle' | 'strong' | 'none',
  
  // Behavior
  allowSkip: false, // Can user skip a step?
  allowHints: true,
  maxAttempts: 3, // -1 for unlimited
  
  // Number pad integration
  numberPadPosition: { x: '80%', y: '50%' },
  numberPadOptions: {
    buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear'],
    showSubmit: true
  }
}
```

### Action Types
```javascript
type GuidedAction = 
  | { type: 'select-cell', panel, row, column }
  | { type: 'enter-value', panel, row, column, expectedValue }
  | { type: 'select-operator', panel, row } // Click the + symbol
  | { type: 'select-divider', panel } // Click the divider line
  | { type: 'reveal-next' } // Just proceed (for passive steps)
```

### State Management
```javascript
guidedState = {
  currentStepIndex: 0,
  completedSteps: [],
  attemptCount: 0,
  hintsUsed: 0,
  selectedCell: null,
  numberPadOpen: false,
  numberPadValue: '',
  errors: []
}
```

### Visual Feedback
| State | Visual |
|-------|--------|
| Expected cell (highlight on) | Yellow dashed border (2px) |
| Selected cell | Yellow solid background |
| Correct action | Green flash → fade to normal |
| Incorrect action | Red shake animation |
| Hint available | Pulsing blue info icon |

### Callbacks
```javascript
onGuidedStepStart: (step) => void
onUserAction: (action, isCorrect, attemptNumber) => void
onGuidedStepComplete: (step, attempts, hintsUsed) => void
onGuidedComplete: (totalSteps, totalAttempts, totalHints) => void
onHintRequested: (step) => void
```

### User Flow Example
```
Step 0: "Click the Ones column header"
  ↓ User clicks O header
  ✓ Correct → Green flash → Advance to Step 1

Step 1: "Enter the first Ones digit (9)"
  ↓ User clicks operand-0 O cell → Number pad opens
  ↓ User enters 9 → Clicks Submit
  ✓ Correct → Cell fills with 9 → Advance to Step 2

Step 2: "Add the Ones column digits"
  ↓ User clicks sum O cell → Number pad opens
  ↓ User enters 4 → Clicks Submit
  ✓ Correct → Cell fills with 4 → Advance to Step 3
```

---

## 3. Type: `incorrect` (Error Identification)

### Description
Pre-rendered problem with intentional errors. User must identify all incorrect cells.

### Props
```javascript
{
  type: 'incorrect',
  variant: 'simple' | 'expanded' | 'both',
  numbers: [5459, 3965],
  
  // Error configuration
  incorrectCells: [
    {
      id: 'error-1',
      panel: 'simple',
      row: 'operand-0',
      column: 'T',
      displayValue: '6', // What's shown (wrong)
      correctValue: '5',  // What it should be
      isLocked: false     // Can this be clicked?
    },
    {
      id: 'error-2',
      panel: 'expanded',
      row: 'sum',
      column: 'H',
      displayValue: '500',
      correctValue: '400',
      isLocked: false
    }
  ],
  
  // Locked cells (can't be clicked)
  lockedCells: [
    { panel: 'simple', row: 'header' }, // All headers locked
    { panel: 'simple', row: 'operand-0', column: 'O' }, // Original operand digits locked
    { panel: 'simple', row: 'operand-1', column: 'O' }
  ],
  
  // Behavior
  validationMode: 'immediate' | 'on-submit',
  showCorrectCount: true, // Show "2 / 5 errors found"
  allowMultipleSelections: true, // Can select multiple before checking
  revealOnCorrect: true, // Show correct value when identified
  maxIncorrectSelections: -1, // -1 = unlimited, N = max wrong clicks before failure
  
  // Visual
  clickFeedbackDuration: 800, // ms for color flash
  showProgressBar: true
}
```

### Cell States
```javascript
type IncorrectCellState = 
  | 'unclicked'    // Normal appearance (but wrong value shown)
  | 'selected'     // Clicked, awaiting validation (yellow)
  | 'identified'   // Correctly identified as wrong (green)
  | 'missed'       // Incorrectly clicked (salmon)
  | 'locked'       // Can't be clicked
```

### State Management
```javascript
incorrectState = {
  selectedCells: Set<CellId>, // Currently yellow
  identifiedErrors: Set<CellId>, // Correct identifications (green)
  missedSelections: Set<CellId>, // Wrong clicks (salmon)
  remainingErrors: number,
  totalClicks: number,
  isComplete: false
}
```

### Visual Feedback
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Unclicked error | Normal (dark blue) | None | White |
| Selected (yellow) | #FCD34D | 2px solid #F59E0B | White |
| Identified (green) | #10B981 | 2px solid #059669 | White |
| Missed (salmon) | #FB7185 | 2px solid #F43F5E | White |
| Locked | Normal | None | White (no hover) |

### Validation Modes

#### Immediate Mode
```
User clicks cell
  ↓
  Is cell in incorrectCells list?
    ✓ Yes → Turn green, add to identifiedErrors
    ✗ No → Flash red → Turn salmon, add to missedSelections
  ↓
  Check if all errors identified
    ✓ Yes → onComplete(stats)
```

#### On-Submit Mode
```
User clicks multiple cells (all turn yellow)
  ↓
  User clicks "Check Answer" button
  ↓
  For each selected cell:
    Correct error → Green
    Wrong selection → Salmon
  ↓
  Check completion
```

### Callbacks
```javascript
onCellClick: (cellId, isActuallyIncorrect) => void
onErrorIdentified: (cellId, remainingErrors) => void
onIncorrectSelection: (cellId, totalMisses) => void
onIncorrectComplete: (stats: {
  totalErrors: number,
  foundErrors: number,
  missedClicks: number,
  timeElapsed: number
}) => void
```

### Completion States
```javascript
type CompletionResult = 
  | 'perfect'      // All errors found, no wrong clicks
  | 'complete'     // All errors found, some wrong clicks
  | 'failed'       // Max wrong clicks reached
  | 'incomplete'   // User gave up / time ran out
```

---

## 4. Type: `fill-missing` (Fill in the Blanks)

### Description
Pre-rendered problem with blank cells. User must fill in all missing values.

### Props
```javascript
{
  type: 'fill-missing',
  variant: 'simple' | 'expanded' | 'both',
  numbers: [5459, 3965],
  
  // Blank configuration
  missingCells: [
    {
      id: 'blank-1',
      panel: 'simple',
      row: 'sum',
      column: 'O',
      correctValue: '4',
      acceptableValues: ['4'], // Sometimes multiple answers OK
      hint: "Add 9 + 5",
      points: 1
    },
    {
      id: 'blank-2',
      panel: 'expanded',
      row: 'operand-0',
      column: 'T',
      correctValue: '50',
      acceptableValues: ['50', '050'], // Leading zeros OK
      hint: "5 tens = ?",
      points: 2
    }
  ],
  
  // Locked cells
  lockedCells: [
    { panel: 'simple', row: 'header' },
    { panel: 'simple', row: 'operand-0' }, // Original numbers
    { panel: 'simple', row: 'operand-1' }
  ],
  
  // Input method
  inputMethod: 'number-pad' | 'inline' | 'dropdown',
  numberPadConfig: {
    position: 'overlay' | 'sidebar',
    buttons: ['0-9', 'clear', 'submit'],
    allowBackspace: true
  },
  
  // Behavior
  validationMode: 'on-submit' | 'immediate' | 'on-blur',
  allowCorrection: true, // Can edit after submitting wrong answer
  maxAttempts: 3, // Per cell
  showHints: true,
  
  // Visual
  blankCellStyle: 'empty' | 'dashed' | 'placeholder',
  showProgress: true // "5 / 12 filled"
}
```

### Cell States
```javascript
type FillMissingCellState = 
  | 'empty'        // Not filled yet
  | 'focused'      // Currently being edited
  | 'filled'       // User entered value (not validated)
  | 'correct'      // Validated correct
  | 'incorrect'    // Validated wrong
  | 'locked'       // Can't be edited
```

### State Management
```javascript
fillMissingState = {
  cellValues: Map<CellId, string>, // Current user values
  validatedCells: Map<CellId, boolean>, // true = correct, false = wrong
  focusedCell: CellId | null,
  attemptCounts: Map<CellId, number>,
  hintsUsed: Set<CellId>,
  isComplete: false,
  numberPadValue: '',
  numberPadOpen: false
}
```

### Visual Feedback
| State | Background | Border | Text | Placeholder |
|-------|-----------|--------|------|-------------|
| Empty | Transparent | 2px dashed #6B7280 | - | "?" (gray) |
| Focused | #1E3A8A (darker) | 2px solid #3B82F6 | White | - |
| Filled (pending) | Normal | 2px solid #8B5CF6 | White | - |
| Correct | #10B981 | 2px solid #059669 | White | - |
| Incorrect | #FB7185 | 2px solid #F43F5E | White | - |

### Input Flow - Number Pad
```
User clicks empty cell
  ↓ Cell highlighted (blue border)
  ↓ Number pad appears (overlay or sidebar)
  ↓ User enters digits
  ↓ Display updates in cell (preview)
  ↓ User clicks Submit
  ↓ Validation runs
    ✓ Correct → Green, cell locked
    ✗ Wrong → Red shake, clear after delay, focus returns
```

### Input Flow - Inline
```
User clicks empty cell
  ↓ Cell becomes editable input
  ↓ User types value
  ↓ On blur or Enter
    Validation runs (if immediate mode)
    OR stays filled for submit button validation
```

### Validation Modes

#### Immediate Validation
- Validate as soon as value entered (Submit clicked or blur)
- Show correct/incorrect immediately
- Lock correct cells
- Allow retry on incorrect (up to maxAttempts)

#### On-Submit Validation
- User fills multiple cells
- Clicks "Submit All" button
- All filled cells validated at once
- Show results

### Callbacks
```javascript
onCellFocus: (cellId) => void
onCellBlur: (cellId, value) => void
onValueEntered: (cellId, value) => void
onCellValidated: (cellId, value, isCorrect, attemptNumber) => void
onHintUsed: (cellId) => void
onFillMissingComplete: (stats: {
  totalBlanks: number,
  correctAnswers: number,
  totalAttempts: number,
  hintsUsed: number,
  timeElapsed: number,
  score: number
}) => void
```

### Scoring System
```javascript
score = Σ(cell.points * multiplier)

multiplier = {
  firstTry: 1.0,
  secondTry: 0.7,
  thirdTry: 0.5,
  withHint: 0.6
}
```

---

## Common Architecture

### Cell Interaction Handler
```javascript
class CellInteractionManager {
  handleCellClick(cellId, type) {
    if (this.isCellLocked(cellId)) return;
    
    switch (type) {
      case 'guided':
        return this.handleGuidedClick(cellId);
      case 'incorrect':
        return this.handleIncorrectClick(cellId);
      case 'fill-missing':
        return this.handleFillMissingClick(cellId);
      default:
        return;
    }
  }
}
```

### Universal Props
```javascript
// Common to all interactive types
{
  type: 'auto' | 'guided' | 'incorrect' | 'fill-missing',
  
  // Existing props still work
  variant: 'simple' | 'expanded' | 'both',
  numbers: [number, number, ...],
  
  // Shared interaction props
  showInstructions: true,
  instructionPosition: 'top' | 'bottom' | 'overlay',
  enableSoundEffects: false,
  soundEffects: {
    correct: 'path/to/correct.mp3',
    incorrect: 'path/to/wrong.mp3',
    complete: 'path/to/complete.mp3'
  },
  
  // Shared visual
  interactiveCursorStyle: 'pointer',
  disabledCursorStyle: 'not-allowed',
  
  // Shared callbacks
  onTypeStart: (type) => void,
  onTypeComplete: (type, stats) => void
}
```

### CSS Classes
```css
/* Base interactive states */
.la-cell--clickable { cursor: pointer; }
.la-cell--locked { cursor: not-allowed; opacity: 0.6; }
.la-cell--selected { background: #FCD34D; }
.la-cell--correct { background: #10B981; }
.la-cell--incorrect { background: #FB7185; }
.la-cell--focused { border: 2px solid #3B82F6; }
.la-cell--highlighted { border: 2px dashed #F59E0B; }

/* Animations */
@keyframes correctFlash { ... }
@keyframes incorrectShake { ... }
@keyframes pulse { ... }
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Cell identification system
- [ ] Click event handlers
- [ ] State management structure
- [ ] Type prop integration
- [ ] Basic visual feedback

### Phase 2: Auto Type (Week 1)
- [ ] Refactor existing behavior to `type: 'auto'`
- [ ] Ensure backward compatibility
- [ ] Update documentation

### Phase 3: Guided Type (Week 2-3)
- [ ] Guided steps configuration
- [ ] Highlight system
- [ ] Number pad integration
- [ ] Step validation
- [ ] Hint system
- [ ] Testing with sample problems

### Phase 4: Incorrect Type (Week 4)
- [ ] Error injection system
- [ ] Cell locking logic
- [ ] Selection validation
- [ ] Immediate & on-submit modes
- [ ] Completion detection
- [ ] Testing with various error counts

### Phase 5: Fill-Missing Type (Week 5)
- [ ] Blank cell rendering
- [ ] Number pad input
- [ ] Inline input mode
- [ ] Validation logic
- [ ] Attempt tracking
- [ ] Scoring system
- [ ] Testing

### Phase 6: Polish (Week 6)
- [ ] Animations & transitions
- [ ] Sound effects (optional)
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Documentation & examples

---

## Configuration Examples

### Example 1: Guided Addition (Simple)
```javascript
{
  type: 'guided',
  variant: 'simple',
  numbers: [23, 45],
  guidedSteps: [
    { stepId: 0, instruction: "Look at the Ones column", action: { type: 'reveal-next' } },
    { stepId: 1, instruction: "Add 3 + 5 in the Ones column", action: { type: 'enter-value', panel: 'simple', row: 'sum', column: 'O', expectedValue: '8' }, enableNumberPad: true },
    { stepId: 2, instruction: "Look at the Tens column", action: { type: 'reveal-next' } },
    { stepId: 3, instruction: "Add 2 + 4 in the Tens column", action: { type: 'enter-value', panel: 'simple', row: 'sum', column: 'T', expectedValue: '6' }, enableNumberPad: true }
  ]
}
```

### Example 2: Find 3 Errors (Both panels)
```javascript
{
  type: 'incorrect',
  variant: 'both',
  numbers: [5459, 3965],
  incorrectCells: [
    { id: 'e1', panel: 'simple', row: 'sum', column: 'O', displayValue: '5', correctValue: '4' },
    { id: 'e2', panel: 'expanded', row: 'sum', column: 'H', displayValue: '500', correctValue: '400' },
    { id: 'e3', panel: 'simple', row: 'operand-0', column: 'T', displayValue: '6', correctValue: '5' }
  ],
  validationMode: 'immediate',
  showCorrectCount: true
}
```

### Example 3: Fill Missing Sum Row
```javascript
{
  type: 'fill-missing',
  variant: 'simple',
  numbers: [5459, 3965],
  missingCells: [
    { id: 'b1', panel: 'simple', row: 'sum', column: 'O', correctValue: '4', hint: "9 + 5 = ?" },
    { id: 'b2', panel: 'simple', row: 'sum', column: 'T', correctValue: '2', hint: "5 + 6 + 1 (carry) = ?" },
    { id: 'b3', panel: 'simple', row: 'sum', column: 'H', correctValue: '4', hint: "4 + 9 = ?" },
    { id: 'b4', panel: 'simple', row: 'sum', column: 'Th', correctValue: '9', hint: "5 + 3 + 1 (carry) = ?" }
  ],
  inputMethod: 'number-pad',
  validationMode: 'immediate'
}
```

---

## Open Questions

1. **Number Pad Component**: Should this be a new shared component or embedded in LongAddition?

2. **Instruction Display**: Separate overlay component or integrated into the main component?

3. **Mobile Support**: Touch events, on-screen keyboard behavior?

4. **Accessibility**: How to make interactive types screen-reader friendly?

5. **State Persistence**: Should progress be saved (localStorage) for resume later?

6. **Multi-language**: How to handle instructions/hints in different languages?

7. **Analytics**: Should we track user actions for learning analytics?

8. **Theming**: Should interactive state colors be customizable via props?

---

## Backwards Compatibility

All existing Long Addition components will continue to work:
- Default `type: 'auto'` matches current behavior
- All existing props honored
- No breaking changes

To migrate existing usage:
```javascript
// Before (implicit auto mode)
<LongAdditionComponent numbers={[23, 45]} variant="simple" />

// After (explicit, same behavior)
<LongAdditionComponent type="auto" numbers={[23, 45]} variant="simple" />
```

---

## Appendix A: Full Type Definition

```typescript
type LongAdditionType = 'auto' | 'guided' | 'incorrect' | 'fill-missing';

type CellId = {
  panel: 'simple' | 'expanded';
  row: 'header' | 'place' | `operand-${number}` | 'sum';
  column: 'TTh' | 'Th' | 'H' | 'T' | 'O';
};

type GuidedStep = {
  stepId: number;
  instruction: string;
  action: GuidedAction;
  highlightCell?: boolean;
  showHint?: boolean;
  hint?: string;
  enableNumberPad?: boolean;
};

type IncorrectCellConfig = {
  id: string;
  panel: 'simple' | 'expanded';
  row: string;
  column: string;
  displayValue: string;
  correctValue: string;
  isLocked?: boolean;
};

type MissingCellConfig = {
  id: string;
  panel: 'simple' | 'expanded';
  row: string;
  column: string;
  correctValue: string;
  acceptableValues?: string[];
  hint?: string;
  points?: number;
};

interface LongAdditionInteractiveProps {
  // Type selection
  type?: LongAdditionType;
  
  // Type-specific configs
  guidedSteps?: GuidedStep[];
  incorrectCells?: IncorrectCellConfig[];
  missingCells?: MissingCellConfig[];
  
  // ... other props
}
```

---

**End of Specification**

This document serves as the blueprint for implementing interactive types. Review and provide feedback before proceeding to implementation.
