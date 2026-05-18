/**
 * Long Addition Component - Interactive Types Examples
 * Phase 1 Foundation Implementation - TEST CONFIGURATIONS
 * 
 * This file demonstrates how to use the interactive types with the foundation implementation.
 * Copy these examples into PageConfig.js to test the interactive features.
 */

// =============================================================================
// EXAMPLE 1: Auto Mode (Default - No interaction, just demonstration)
// =============================================================================
const example1_AutoMode = {
  id: "test-auto",
  name: "test-auto",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  props: {
    componentType: "LongAdditionComponent",
    type: "auto", // Default behavior
    numbers: [5459, 3965],
    variant: "both",
    mode: "self",
    autoPlay: true,
    stepDurationMs: 700,
  }
};

// =============================================================================
// EXAMPLE 2: Incorrect Mode — stage clicks, then dispatch longAdditionCheck to validate
// =============================================================================
const example2_IncorrectMode = {
  id: "test-incorrect",
  name: "test-incorrect",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  props: {
    componentType: "LongAdditionComponent",
    type: "incorrect",
    numbers: [5459, 3965],
    variant: "simple",
    showPanelBorders: false,
    
    // Define which cells have errors - these values will be DISPLAYED
    // The real computed sum is 9424, but we show wrong digits
    incorrectCells: [
      {
        panel: 'simple',
        row: 'sum',
        column: 'O',
        displayValue: '5',  // Wrong! Shows 5 instead of 4
        correctValue: '4'
      },
      {
        panel: 'simple',
        row: 'sum',
        column: 'T',
        displayValue: '3',  // Wrong! Shows 3 instead of 2
        correctValue: '2'
      },
      {
        panel: 'simple',
        row: 'sum',
        column: 'H',
        displayValue: '5',  // Wrong! Shows 5 instead of 4
        correctValue: '4'
      }
    ],
    
    // Lock headers and original operands - only sum is clickable
    lockedCells: [
      { panel: 'simple', row: 'header' },
      { panel: 'simple', row: 'operand-0' },
      { panel: 'simple', row: 'operand-1' }
    ],
    
    // Callbacks
    onCellClick: (cellId, parsed) => {
      console.log('[Incorrect] Cell clicked:', cellId, parsed);
    },
    
    onTypeComplete: (stats) => {
      console.log('[Incorrect] Complete!', stats);
      const accuracy = stats.totalErrors > 0 
        ? Math.round((stats.totalErrors / (stats.totalErrors + stats.missedClicks)) * 100)
        : 100;
      alert(`🎯 Found all ${stats.totalErrors} errors with ${accuracy}% accuracy in ${(stats.timeElapsed/1000).toFixed(1)}s!`);
    }
  }
};

// =============================================================================
// EXAMPLE 3: Fill-Missing Mode — number pad (no Submit), drafts saved on close,
//              validate on window CustomEvent('longAdditionCheck', { detail: { id } })
// =============================================================================
const example3_FillMissingMode = {
  id: "test-fill-missing",
  name: "test-fill-missing",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  props: {
    componentType: "LongAdditionComponent",
    type: "fill-missing",
    numbers: [5459, 3965],
    variant: "simple",
    showPanelBorders: false,
    
    // Define which cells are blank (shows "?" until filled)
    // The correct sum is 9424
    missingCells: [
      {
        panel: 'simple',
        row: 'sum',
        column: 'O',
        correctValue: '4',
        acceptableValues: ['4'],
        hint: "9 + 5 = 14, write 4 carry 1"
      },
      {
        panel: 'simple',
        row: 'sum',
        column: 'T',
        correctValue: '2',
        acceptableValues: ['2'],
        hint: "5 + 6 + 1 = 12, write 2 carry 1"
      },
      {
        panel: 'simple',
        row: 'sum',
        column: 'H',
        correctValue: '4',
        acceptableValues: ['4'],
        hint: "4 + 9 + 1 = 14, write 4 carry 1"
      },
      {
        panel: 'simple',
        row: 'sum',
        column: 'Th',
        correctValue: '9',
        acceptableValues: ['9'],
        hint: "5 + 3 + 1 = 9"
      }
    ],
    
    // Lock everything except sum row
    lockedCells: [
      { panel: 'simple', row: 'header' },
      { panel: 'simple', row: 'operand-0' },
      { panel: 'simple', row: 'operand-1' }
    ],
    
    // Callbacks
    onCellClick: (cellId) => {
      console.log('[Fill-Missing] Cell clicked:', cellId);
    },
    
    onCellFocus: (cellId) => {
      console.log('[Fill-Missing] Number pad opened for:', cellId);
    },
    
    onCellBlur: (cellId) => {
      console.log('[Fill-Missing] Number pad closed for:', cellId);
    },
    
    onTypeComplete: (stats) => {
      // Fires only after Check when all missing cells are filled and correct.
      console.log('[Fill-Missing] Complete!', stats);
      const { totalCells, correctCells, incorrectAttempts, triggeredBy } = stats;
      alert(
        `🎉 All correct (${correctCells}/${totalCells}) after Check` +
          (triggeredBy ? ` [${triggeredBy}]` : '') +
          `. Attempts counted: ${incorrectAttempts}. Time ${(stats.timeElapsed / 1000).toFixed(1)}s`
      );
    },
  }
};

// =============================================================================
// EXAMPLE 4: Guided Mode (Phase 3 - FULLY FUNCTIONAL!)
// =============================================================================
const example4_GuidedMode = {
  id: "test-guided",
  name: "test-guided",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  props: {
    componentType: "LongAdditionComponent",
    type: "guided",
    numbers: [23, 45],
    variant: "simple",
    showPanelBorders: false,
    
    // Step-by-step instructions
    guidedSteps: [
      {
        stepId: 0,
        instruction: "First, let's identify the columns. Click the 'O' header (Ones).",
        action: { type: 'select-cell', panel: 'simple', row: 'header', column: 'O' }
      },
      {
        stepId: 1,
        instruction: "Good! Now click the first digit in the Ones column (3).",
        action: { type: 'select-cell', panel: 'simple', row: 'operand-0', column: 'O' }
      },
      {
        stepId: 2,
        instruction: "Click the second digit in the Ones column (5).",
        action: { type: 'select-cell', panel: 'simple', row: 'operand-1', column: 'O' }
      },
      {
        stepId: 3,
        instruction: "3 + 5 = 8. Click the sum in the Ones column to confirm.",
        action: { type: 'select-cell', panel: 'simple', row: 'sum', column: 'O' }
      },
      {
        stepId: 4,
        instruction: "Excellent! Now let's do the Tens. Click the 'T' header.",
        action: { type: 'select-cell', panel: 'simple', row: 'header', column: 'T' }
      },
      {
        stepId: 5,
        instruction: "Click the first digit in the Tens column (2).",
        action: { type: 'select-cell', panel: 'simple', row: 'operand-0', column: 'T' }
      },
      {
        stepId: 6,
        instruction: "Click the second digit in the Tens column (4).",
        action: { type: 'select-cell', panel: 'simple', row: 'operand-1', column: 'T' }
      },
      {
        stepId: 7,
        instruction: "2 + 4 = 6. Click the sum in the Tens column to complete!",
        action: { type: 'select-cell', panel: 'simple', row: 'sum', column: 'T' }
      }
    ],
    
    // Callbacks
    onCellClick: (cellId, parsed) => {
      console.log('[Guided] Cell clicked:', cellId, parsed);
    },
    
    onTypeComplete: (stats) => {
      console.log('[Guided] Complete!', stats);
      alert(`🎉 Excellent! You completed all ${stats.totalSteps} steps in ${(stats.timeElapsed / 1000).toFixed(1)} seconds!`);
    }
  }
};

// =============================================================================
// EXAMPLE 5: Scripted Engine (NEW – Unified pedagogical script)
// Demonstrates the script-driven engine: progressive reveal, transfer-fly
// animations, configurable input mode, and the carry row that "opens up".
// =============================================================================
const example5_ScriptedEngine = {
  id: "test-scripted",
  name: "test-scripted",
  type: "custom",
  coordinates: [100, 100, 800, 600],
  props: {
    componentType: "LongAdditionComponent",
    type: "guided",
    mode: "controlled",
    numbers: [27, 18], // small problem; ones-column produces a carry
    variant: "both",
    placeValueRow: "skip-ones",
    operatorPosition: "auto",

    // Component-level defaults; per-step inputMode/validation can override.
    guidedInputMode: "reveal",   // tap source → animate value to target
    guidedValidation: "per-entry",

    script: [
      // 0. Intro
      { stepId: 0, instruction: "We need to add 27 and 18.",
        reveal: { panels: ["simple"], rows: ["operand-0", "operand-1", "divider"], elements: ["operator-plus"] },
        advance: { type: "next" } },

      // 1. Place values
      { stepId: 1, instruction: "Each digit lives in a place value column.",
        reveal: { panels: ["simple"], rows: ["header"] },
        advance: { type: "next" } },

      // 2. Right setup
      { stepId: 2, instruction: "Build the expanded form on the right.",
        reveal: { panels: ["expanded"], rows: ["header", "place"] },
        advance: { type: "next" } },

      // 3. Decompose 27
      { stepId: 3, instruction: "Tap the 7 to send it to the right.",
        reveal: { cells: [{ panel: "expanded", row: "operand-0", column: "O" }] },
        highlight: { panel: "simple", row: "operand-0", column: "O" },
        source: { panel: "simple", row: "operand-0", column: "O" },
        target: { panel: "expanded", row: "operand-0", column: "O" },
        action: { type: "enter-value", expected: "7" },
        animation: "transfer-source-to-target" },
      { stepId: 4, instruction: "Now the tens. Tap the 2.",
        reveal: { cells: [{ panel: "expanded", row: "operand-0", column: "T" }] },
        highlight: { panel: "simple", row: "operand-0", column: "T" },
        source: { panel: "simple", row: "operand-0", column: "T" },
        target: { panel: "expanded", row: "operand-0", column: "T" },
        action: { type: "enter-value", expected: "20" },
        animation: "transfer-source-to-target" },

      // 4. Decompose 18
      { stepId: 5, instruction: "Tap the 8.",
        reveal: { cells: [{ panel: "expanded", row: "operand-1", column: "O" }] },
        highlight: { panel: "simple", row: "operand-1", column: "O" },
        source: { panel: "simple", row: "operand-1", column: "O" },
        target: { panel: "expanded", row: "operand-1", column: "O" },
        action: { type: "enter-value", expected: "8" } },
      { stepId: 6, instruction: "Now the 1.",
        reveal: { cells: [{ panel: "expanded", row: "operand-1", column: "T" }] },
        highlight: { panel: "simple", row: "operand-1", column: "T" },
        source: { panel: "simple", row: "operand-1", column: "T" },
        target: { panel: "expanded", row: "operand-1", column: "T" },
        action: { type: "enter-value", expected: "10" } },

      // 5. Sum ones column on the right
      { stepId: 7, instruction: "7 + 8 = 15. We write 5 in the ones column…",
        reveal: { cells: [{ panel: "expanded", row: "sum", column: "O" }] },
        highlight: { panel: "expanded", row: "sum", column: "O" },
        advance: { type: "next" } },
      // 6. Carry row opens up
      { stepId: 8, instruction: "…and carry the 1 to the tens.",
        reveal: { rows: ["carry"], cells: [{ panel: "simple", row: "carry", column: "T" }] },
        highlight: { panel: "simple", row: "carry", column: "T" },
        target: { panel: "simple", row: "carry", column: "T" },
        action: { type: "enter-value", expected: "1" },
        animation: "open-carry-row" },

      // 7. Sum tens column on the right
      { stepId: 9, instruction: "Tens: 20 + 10 + 10 (carry) = 40.",
        reveal: { cells: [{ panel: "expanded", row: "sum", column: "T" }] },
        highlight: { panel: "expanded", row: "sum", column: "T" },
        advance: { type: "next" } },

      // 8. Transfer answer to the left
      { stepId: 10, instruction: "The answer is 40 + 5 = 45. Bring it back to the left.",
        reveal: { panels: ["simple"], rows: ["sum"] },
        advance: { type: "next" } },

      // 9. Done
      { stepId: 11, instruction: "27 + 18 = 45. Great work!",
        advance: { type: "next" } },
    ],

    onScriptStep: ({ stepIndex, step, totalSteps }) => {
      console.log(`[Scripted] step ${stepIndex + 1}/${totalSteps}:`, step?.instruction);
    },
    onScriptComplete: ({ totalSteps, timeElapsed }) => {
      console.log(`[Scripted] complete in ${(timeElapsed / 1000).toFixed(1)}s`);
    },
  }
};

// =============================================================================
// TESTING CHECKLIST (Updated for Phase 5)
// =============================================================================
/*
✅ COMPLETED THROUGH PHASE 5:

PHASE 1 - Foundation:
- Cell identification system (createCellId, parseCellId)
- Click handlers added to all cells
- State management (selectedCells, cellStates, interactionStats)
- Type prop validation
- CSS classes for interactive states
- Basic click tracking

PHASE 2 - Auto Mode:
- Auto mode cleanly isolated
- Validation warnings for misconfig
- Backward compatibility verified

PHASE 3 - Guided Mode:
- Step-by-step progression
- Cell highlighting (expected cell pulses)
- Click validation (correct/incorrect feedback)
- Instruction panel with step counter
- Completion panel with success message
- Progress tracking and time tracking

PHASE 4 - Incorrect Mode:
- Value override system (displayValue shows wrong values)
- Progress indicator panel with bar
- Completion panel with accuracy
- Enhanced click handling
- Strikethrough on identified errors
- Hover effects on clickable cells
- Animations for correct/incorrect feedback

PHASE 5 - Fill-Missing Mode (NEW!):
- Missing cells display "?" with teal dashed border
- Number pad overlay modal
- Digit input (0-9), Clear, Backspace buttons
- Value validation against acceptableValues
- Hint display in number pad
- Progress panel with fill counter
- Completion panel with accuracy
- Retry support for wrong answers

🔄 TO TEST FILL-MISSING MODE (PHASE 5):
1. Add example3_FillMissingMode to PageConfig page 1
2. Reload page
3. Sum row shows "?" in all positions (teal dashed border)
4. Teal progress panel shows "0 / 4 filled correctly"
5. Click a "?" cell → number pad overlay opens
6. Enter correct value (4 for Ones) → submit → green flash
7. Enter wrong value → submit → red shake, can retry
8. Fill all 4 cells correctly → green completion panel
9. Alert shows completion stats with accuracy

🔄 TO TEST INCORRECT MODE (PHASE 4):
1. Add example2_IncorrectMode to PageConfig page 1
2. Reload page
3. Sum row shows WRONG values (5, 3, 5 instead of 4, 2, 4)
4. Purple progress panel shows "0 / 3 errors found"
5. Click a wrong value → green flash, strikethrough, progress updates
6. Click a correct cell → red shake, wrong click counter increases
7. Find all 3 errors → green completion panel
8. Alert shows completion stats with accuracy

🔄 TO TEST GUIDED MODE (PHASE 3):
1. Add example4_GuidedMode to PageConfig page 1
2. Reload page
3. Blue instruction panel at bottom
4. Highlighted cell pulses yellow
5. Click highlighted cell → advance
6. Complete all steps → success message

⏳ PENDING (Later Phase):
- Phase 6: Polish, keyboard navigation, accessibility
*/

// =============================================================================
// HOW TO TEST IN PageConfig.js
// =============================================================================
/*
1. Open PageConfig.js
2. Find page1 elements array
3. Replace or add the long-addition element with example2_IncorrectMode
4. Save and reload
5. Click cells to test interaction

Example integration:
```javascript
{
  ...example2_IncorrectMode,
  coordinates: [400, 30, 1250, 790], // Match your layout
}
```
*/

export {
  example1_AutoMode,
  example2_IncorrectMode,
  example3_FillMissingMode,
  example4_GuidedMode
};
