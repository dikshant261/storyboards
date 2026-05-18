# Number Pad Component Documentation

## Overview

The `NumberPadPanelComponent` is a React-based interactive number pad component designed for numeric input, validation, and feedback. It supports multiple button configurations, input modes, sequential destination validation, and integration with external feedback components.

## Features

- ✅ **Multiple Button Configurations**: Four pre-configured button layouts (numbers only, with operators, etc.)
- ✅ **Input Modes**: Replace mode (each click replaces) or Append mode (each click appends)
- ✅ **Maximum Number Limit**: Prevent input exceeding a maximum value in append mode
- ✅ **Sequential Destinations**: Validate against multiple destinations in sequence
- ✅ **Feedback Modes**: Instruction mode (static text) or Feedback mode (dynamic feedback)
- ✅ **External Feedback Integration**: Send feedback to external feedback components
- ✅ **Auto-advance**: Automatically moves to next destination after correct answer
- ✅ **Customizable Styling**: Full control over colors, fonts, sizes, and layout
- ✅ **Sound Effects**: Configurable click sounds and validation sounds
- ✅ **Grid Cell Units (gc)**: Support for responsive sizing using grid cell units
- ✅ **Layout Options**: Vertical (4 rows × 3 cols) or Horizontal (3 rows × 4 cols) layouts
- ✅ **Height Control**: Configurable percentage heights for feedback area, button grid, and check button
- ✅ **Cell Mode Integration**: Automatically sets table cell modes (focus, correct, incorrect) based on validation
- ✅ **Auto-Focus on Load**: Option to set destination cell to focus mode when component loads

## Component Usage

### Basic Example

```javascript
{
  id: "page2-number-pad",
  name: "page2-number-pad",
  type: "custom",
  coordinates: [1150, 155, 1595, 815],
  zIndex: 60,
  props: {
    componentType: "NumberPadPanelComponent",
    backgroundColor: "transparent",
    borderRadius: "15gc",
    border: "0px solid #FFAB40",
    padding: "15gc",
    layout: "vertical",
    buttonConfig: 1,
    inputMode: "append",
    destinations: [
      {
        destinationId: "page2-map-table-R1C1",
        correctValue: 5,
        correctFeedback: "Correct! Well done!",
        incorrectFeedback: "Incorrect. Please try again."
      }
    ],
    destinationIndex: 0
  }
}
```

## Props Reference

### Core Props

#### `layout` (string, default: `'vertical'`)
Layout type for the number pad grid.
- **Values**: `'vertical'` or `'horizontal'`
- **Vertical**: 4 rows × 3 columns (or 5 rows for configs 3 & 4)
- **Horizontal**: 3 rows × 4 columns (calculated based on button count)
- **Example**: `layout: "vertical"`

#### `buttonConfig` (number, default: `1`)
Button configuration preset that determines which buttons are displayed.
- **Config 1**: Numbers 0-9 only (4 rows × 3 cols)
  - Layout: `[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null]`
  - 0 is in the last row, middle column
- **Config 2**: Numbers 0-9 + Clear (C) + Backspace (⌫) (4 rows × 3 cols)
  - Layout: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫']`
  - 0 is in the last row, middle column
- **Config 3**: Numbers 0-9 + Addition (+) + Subtraction (-) + Decimal (.) + Clear + Backspace (5 rows × 3 cols)
  - Layout: `[1, 2, 3, 4, 5, 6, 7, 8, 9, '+', 0, '-', 'C', '.', '⌫']`
  - 0 is between + and - in row 4
  - . is in the last row, middle column
- **Config 4**: Numbers 0-9 + Multiplication (×) + Division (÷) + Decimal (.) + Clear + Backspace (5 rows × 3 cols)
  - Layout: `[1, 2, 3, 4, 5, 6, 7, 8, 9, '×', 0, '÷', 'C', '.', '⌫']`
  - 0 is between × and ÷ in row 4
  - . is in the last row, middle column
- **Example**: `buttonConfig: 4`

#### `enableClickSound` (boolean, default: `true`)
Enable or disable click sounds for number pad buttons.
- **Values**: `true` or `false`
- When `true`, plays sound via `window.playCarClickSound('numberpad')` on button clicks
- **Example**: `enableClickSound: true`

#### `inputMode` (string, default: `'append'`)
Input mode determines how number clicks affect the input value.
- **Values**: `'replace'` or `'append'`
- **Replace Mode**: Each number click replaces the entire current text
  - Click `1` → shows `1`
  - Click `5` → shows `5` (replaces `1`)
- **Append Mode**: Each number click appends to the existing text
  - Click `1` → shows `1`
  - Click `5` → shows `15` (appends to `1`)
- **Example**: `inputMode: "append"`

#### `maxNumber` (number | null, default: `null`)
Maximum number allowed in append mode. If exceeded, plays wrong sound and prevents input.
- **Values**: Any number or `null` (no limit)
- **Behavior**: Only applies in append mode
  - If user has "5" and `maxNumber: 10`, clicking "3" would create "53" → exceeds limit → wrong sound, input prevented
  - If user has "5" and `maxNumber: 10`, clicking "0" would create "50" → exceeds limit → wrong sound, input prevented
  - In replace mode, this prop is ignored
- **Example**: `maxNumber: 666`

#### `feedbackMode` (string, default: `'feedback'`)
Feedback mode determines whether the feedback area text changes when check is pressed.
- **Values**: `'instruction'` or `'feedback'`
- **Instruction Mode**: Text doesn't change when check button is clicked (stays as default text)
  - Check button still validates and plays sounds
  - Feedback area always shows default text
- **Feedback Mode**: Text changes based on correct/incorrect feedback when check is pressed
  - Shows "Correct! Well done!" for correct answers
  - Shows "Incorrect. Please try again." for incorrect answers
- **Example**: `feedbackMode: "instruction"`

#### `feedbackComponentId` (string | null, default: `null`)
ID of external feedback component to update when check button is pressed.
- **Values**: Component ID string (e.g., `'page2-feedback-textbox'`) or `null`
- **Behavior**: 
  - Extracts page number from ID (e.g., `'page2-feedback-textbox'` → `'page2'`)
  - Updates global state: `window.page2FeedbackState = { text, mode }`
  - Dispatches event: `window.dispatchEvent(new CustomEvent('page2FeedbackUpdate', { detail: { text, mode } }))`
  - The feedback component must listen to this event to receive updates
- **Example**: `feedbackComponentId: "page2-feedback-textbox"`

#### `setFocusOnLoad` (boolean, default: `false`)
If `true`, sets the destination cell to `'focus'` mode when the component loads.
- **Values**: `true` or `false`
- **Behavior**:
  - On component mount, gets the initial destination from `destinations[destinationIndex]`
  - Sets that destination cell to `'focus'` mode (yellow background, blinking, white border)
  - Uses a 100ms delay to ensure the table component is ready
  - Only runs once on initial mount
- **Use Case**: Highlight the cell the user should fill when the number pad first appears
- **Example**: `setFocusOnLoad: true`

#### `destinations` (array, default: `[]`)
Array of destination objects for sequential validation. Each destination represents one validation step.
- **Structure**: Array of objects with properties:
  - `destinationId` (string): ID of element to update with number pad input
  - `correctValue` (number | string): Correct value to compare against
  - `correctFeedback` (string, optional): Feedback text for correct answer
  - `incorrectFeedback` (string, optional): Feedback text for incorrect answer
- **Behavior**:
  - Component starts at `destinationIndex: 0` (first destination)
  - When answer is correct, automatically moves to next destination (index + 1)
  - Input is cleared when moving to next destination
  - When all destinations are completed, stays on last destination
- **Example**:
```javascript
destinations: [
  {
    destinationId: "page2-map-table-R1C1",
    correctValue: 5,
    correctFeedback: "Great! First answer correct!",
    incorrectFeedback: "Try again for the first question."
  },
  {
    destinationId: "page2-map-table-R1C2",
    correctValue: 3,
    correctFeedback: "Excellent! Second answer correct!",
    incorrectFeedback: "Try again for the second question."
  }
]
```

#### `destinationIndex` (number, default: `0`)
Current index in destinations array. Starts at 0 on app load.
- **Values**: Number from 0 to `destinations.length - 1`
- **Behavior**:
  - Initialized from config on component mount
  - Resets to 0 when page changes or destinations array changes
  - Automatically increments when correct answer is validated
  - Used to determine which destination is currently active
- **Example**: `destinationIndex: 0`

### Layout Height Props

#### `feedbackRowHeight` (string, default: `'35%'`)
Height percentage for the feedback text area within the container.
- **Values**: Percentage string (e.g., `'35%'`)
- **Example**: `feedbackRowHeight: "35%"`

#### `buttonGridHeight` (string, default: `'51%'`)
Height percentage for the number pad button grid within the container.
- **Values**: Percentage string (e.g., `'51%'`)
- **Example**: `buttonGridHeight: "51%"`

#### `checkButtonHeight` (string, default: `'10%'`)
Height percentage for the check button within the container.
- **Values**: Percentage string (e.g., `'10%'`)
- **Example**: `checkButtonHeight: "10%"`

### Styling Props

#### `backgroundColor` (string, default: `'transparent'`)
Background color of the number pad container.
- **Values**: Any valid CSS color value
- **Example**: `backgroundColor: "transparent"`

#### `borderRadius` (string, default: `'15gc'`)
Border radius of the number pad container (supports `gc` units).
- **Values**: CSS border-radius value (e.g., `'15gc'`, `'10px'`)
- **Example**: `borderRadius: "15gc"`

#### `border` (string, default: `'4px solid #FFAB40'`)
Border style of the number pad container.
- **Values**: Any valid CSS border value
- **Example**: `border: "0px solid #FFAB40"`

#### `padding` (string, default: `'15gc'`)
Padding of the number pad container (supports `gc` units).
- **Values**: CSS padding value (e.g., `'15gc'`, `'10px'`)
- **Example**: `padding: "15gc"`

### Number Buttons Styling

#### `numberButtons` (object)
Styling configuration for number pad buttons.

**Properties:**
- `backgroundColor` (string): Button background color
- `color` (string): Button text color
- `fontSize` (string): Button text size (supports `gc` units)
- `fontWeight` (string): Button text weight
- `borderRadius` (string): Button border radius (supports `gc` units)
- `border` (string): Button border style
- `margin` (string): Button margin (supports `gc` units)
- `buttonWidthPercent` (string, default: `'90%'`): Width percentage of grid cell
- `buttonHeightPercent` (string, default: `'90%'`): Height percentage of grid cell
- `rowGap` (string): Gap between button rows (supports `gc` units)
- `columnGap` (string): Gap between button columns (supports `gc` units)

**Example:**
```javascript
numberButtons: {
  backgroundColor: "transparent",
  color: "#ffffff",
  fontSize: "30gc",
  fontWeight: "bold",
  borderRadius: "6gc",
  border: "2px solid #FF9900",
  margin: "3gc",
  buttonWidthPercent: "90%",
  buttonHeightPercent: "90%",
  rowGap: "3gc",
  columnGap: "3gc"
}
```

### Check Button Styling

#### `checkButton` (object)
Styling configuration for the check button.

**Properties:**
- `backgroundColor` (string): Check button background color
- `color` (string): Check button text color
- `fontSize` (string): Check button text size (supports `gc` units)
- `fontWeight` (string): Check button text weight
- `borderRadius` (string): Check button border radius (supports `gc` units)
- `border` (string): Check button border style
- `text` (string | function): Check button text (can use i18n)
- `height` (string): Check button height (supports `gc` units)
- `marginTop` (string): Check button top margin (supports `gc` units)

**Example:**
```javascript
checkButton: {
  backgroundColor: "#FF8C00",
  color: "#000000",
  fontSize: "25gc",
  fontWeight: "bold",
  borderRadius: "8gc",
  border: "3px solid #FF6347",
  text: "CHECK",
  height: "60gc",
  marginTop: "10gc"
}
```

### Feedback Text Area Styling

#### `feedbackTextArea` (object)
Styling configuration for the feedback text area.

**Properties:**
- `backgroundColor` (string): Feedback area background color
- `color` (string): Feedback area text color
- `fontSize` (string): Feedback area text size (supports `gc` units)
- `fontWeight` (string): Feedback area text weight
- `borderRadius` (string): Feedback area border radius (supports `gc` units)
- `border` (string): Feedback area border style
- `padding` (string): Feedback area padding (supports `gc` units)
- `textAlign` (string): Feedback area text alignment
- `display` (string): Feedback area display type
- `height` (string): Feedback area height (supports `gc` units)
- `defaultText` (string): Default text to display in feedback area

**Example:**
```javascript
feedbackTextArea: {
  backgroundColor: "transparent",
  color: "#ffffff",
  fontSize: "30gc",
  fontWeight: "bold",
  borderRadius: "8gc",
  border: "2px dashed #ffffff",
  padding: "10gc",
  textAlign: "center",
  display: "flex",
  height: "60gc",
  defaultText: "Enter your answer"
}
```

## Callback Functions

The number pad component exposes several global callback functions for external control.

### `window.updateNumberPadFeedback(message, type)`

Updates the feedback message in the number pad's feedback area.

**Parameters:**
- `message` (string): The feedback message to display
- `type` (string, optional): Feedback type - `'correct'`, `'incorrect'`, `'hint'`, or `'default'` (default: `'default'`)

**Behavior:**
- Updates the feedback message text
- Changes feedback area colors based on type:
  - `'correct'`: Green background, white text
  - `'incorrect'` or `'error'`: Red background, white text
  - `'hint'`: Transparent background, white text
  - `'default'`: Default colors

**Example:**
```javascript
// Show correct feedback
window.updateNumberPadFeedback("Correct! Well done!", "correct");

// Show incorrect feedback
window.updateNumberPadFeedback("Incorrect. Please try again.", "incorrect");

// Show hint
window.updateNumberPadFeedback("Hint: Think about the total", "hint");
```

**Note**: This function is component-specific and will only affect the most recently rendered number pad component. If multiple number pads exist, only the last one will be affected.

### `window.clearNumberPadFeedback()`

Clears the feedback message and input value, resetting the number pad to its initial state.

**Parameters:** None

**Behavior:**
- Clears the feedback message
- Clears the input value
- Resets feedback area colors to default

**Example:**
```javascript
window.clearNumberPadFeedback();
```

**Note**: This function is component-specific and will only affect the most recently rendered number pad component.

## Helper Functions

### `updateDestinationText(text)`

Internal helper function that updates the destination element's text when number pad input changes.

**Parameters:**
- `text` (string): The text to set in the destination element

**Behavior:**
- Gets the current destination from `destinations[currentDestinationIndex]`
- Finds the destination element by `destinationId`
- Updates the element's `textContent` and `innerText`
- Called automatically whenever `inputValue` changes

**Example Usage:**
This function is called automatically by the component. You don't need to call it manually.

### `updateExternalFeedback(text, mode)`

Internal helper function that updates an external feedback component when check is pressed.

**Parameters:**
- `text` (string): The feedback text to send
- `mode` (string): The feedback mode - `'correct'` or `'incorrect'`

**Behavior:**
- Extracts page number from `feedbackComponentId` (e.g., `'page2-feedback-textbox'` → `'page2'`)
- Updates global state: `window.page2FeedbackState = { text, mode }`
- Dispatches custom event: `window.dispatchEvent(new CustomEvent('page2FeedbackUpdate', { detail: { text, mode } }))`
- The external feedback component must listen to this event to receive updates

**Example Usage:**
This function is called automatically by the component when check is pressed. You don't need to call it manually.

## Getters

### `getTextAreaContent()`

Internal function that returns the current content to display in the feedback area.

**Returns:**
- `string`: The feedback message if present, otherwise the default text

**Behavior:**
- Returns `feedbackMessage` if it exists
- Otherwise returns `defaultFeedbackText`
- Never returns the input value (input value is only shown in destination element)

**Example Usage:**
This function is used internally by the component. You don't need to call it manually.

## Destinations Array Structure

Each destination object in the `destinations` array has the following structure:

```javascript
{
  destinationId: "page2-map-table-R1C1",  // Required: ID of element to update
  correctValue: 5,                         // Required: Correct value to compare against
  correctFeedback: "Correct! Well done!",  // Optional: Feedback for correct answer
  incorrectFeedback: "Incorrect. Please try again."  // Optional: Feedback for incorrect answer
}
```

### Properties

#### `destinationId` (string, required)
ID of the DOM element to update with number pad input text.
- Must be a valid element ID that exists in the DOM
- Example: `"page2-map-table-R1C1"` (table cell ID)

#### `correctValue` (number | string, required)
The correct value to compare against when check button is pressed.
- Can be a number or string
- Comparison handles both numeric and string comparisons
- Example: `5` or `"5"`

#### `correctFeedback` (string, optional)
Feedback text to display when answer is correct.
- Default: `"Correct! Well done!"` (or i18n equivalent)
- Example: `"Great! First answer correct!"`

#### `incorrectFeedback` (string, optional)
Feedback text to display when answer is incorrect.
- Default: `"Incorrect. Please try again."` (or i18n equivalent)
- Example: `"Try again for the first question."`

## Complete Examples

### Example 1: Basic Number Pad

```javascript
{
  id: "basic-number-pad",
  name: "basic-number-pad",
  type: "custom",
  coordinates: [100, 100, 500, 600],
  zIndex: 50,
  props: {
    componentType: "NumberPadPanelComponent",
    backgroundColor: "transparent",
    borderRadius: "15gc",
    border: "4px solid #FFAB40",
    padding: "15gc",
    layout: "vertical",
    buttonConfig: 1,
    inputMode: "append",
    feedbackMode: "feedback",
    destinations: [
      {
        destinationId: "answer-cell-1",
        correctValue: 10,
        correctFeedback: "Correct!",
        incorrectFeedback: "Try again."
      }
    ],
    destinationIndex: 0
  }
}
```

### Example 2: Number Pad with Operators

```javascript
{
  id: "calculator-pad",
  name: "calculator-pad",
  type: "custom",
  coordinates: [100, 100, 500, 700],
  zIndex: 50,
  props: {
    componentType: "NumberPadPanelComponent",
    layout: "vertical",
    buttonConfig: 4,  // Includes ×, ÷, ., C, ⌫
    inputMode: "append",
    maxNumber: 1000,
    enableClickSound: true,
    numberButtons: {
      backgroundColor: "#FFAB40",
      color: "#000000",
      fontSize: "30gc",
      buttonWidthPercent: "90%",
      buttonHeightPercent: "90%"
    }
  }
}
```

### Example 3: Sequential Validation with Multiple Destinations

```javascript
{
  id: "multi-step-pad",
  name: "multi-step-pad",
  type: "custom",
  coordinates: [100, 100, 500, 600],
  zIndex: 50,
  props: {
    componentType: "NumberPadPanelComponent",
    layout: "vertical",
    buttonConfig: 2,  // Numbers + C + ⌫
    inputMode: "append",
    maxNumber: 100,
    feedbackMode: "instruction",
    feedbackComponentId: "page2-feedback-textbox",
    destinations: [
      {
        destinationId: "page2-map-table-R1C1",
        correctValue: 5,
        correctFeedback: "Great! First answer correct!",
        incorrectFeedback: "Try again for the first question."
      },
      {
        destinationId: "page2-map-table-R1C2",
        correctValue: 3,
        correctFeedback: "Excellent! Second answer correct!",
        incorrectFeedback: "Try again for the second question."
      },
      {
        destinationId: "page2-map-table-R1C3",
        correctValue: 2,
        correctFeedback: "Perfect! All answers correct!",
        incorrectFeedback: "Try again for the third question."
      }
    ],
    destinationIndex: 0,
    feedbackTextArea: {
      defaultText: "Enter your answers in sequence",
      color: "#ffffff",
      backgroundColor: "transparent"
    }
  }
}
```

### Example 4: Replace Mode with Max Number

```javascript
{
  id: "single-digit-pad",
  name: "single-digit-pad",
  type: "custom",
  coordinates: [100, 100, 500, 600],
  zIndex: 50,
  props: {
    componentType: "NumberPadPanelComponent",
    layout: "vertical",
    buttonConfig: 1,
    inputMode: "replace",  // Each click replaces
    maxNumber: 9,  // Ignored in replace mode, but can be set
    destinations: [
      {
        destinationId: "single-digit-cell",
        correctValue: 5,
        correctFeedback: "Correct!",
        incorrectFeedback: "Try again."
      }
    ]
  }
}
```

### Example 5: Horizontal Layout

```javascript
{
  id: "horizontal-pad",
  name: "horizontal-pad",
  type: "custom",
  coordinates: [100, 100, 700, 400],
  zIndex: 50,
  props: {
    componentType: "NumberPadPanelComponent",
    layout: "horizontal",  // 3 rows × 4 cols
    buttonConfig: 1,
    inputMode: "append",
    destinations: [
      {
        destinationId: "answer-cell",
        correctValue: 15,
        correctFeedback: "Correct!",
        incorrectFeedback: "Try again."
      }
    ]
  }
}
```

## Button Configurations Details

### Config 1: Numbers Only
- **Layout**: 4 rows × 3 columns
- **Buttons**: 0-9
- **Grid**: `[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null]`
- **Use Case**: Simple numeric input

### Config 2: Numbers + Clear + Backspace
- **Layout**: 4 rows × 3 columns
- **Buttons**: 0-9, C (Clear), ⌫ (Backspace)
- **Grid**: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫']`
- **Use Case**: Numeric input with editing capabilities

### Config 3: Numbers + Addition + Subtraction + Decimal
- **Layout**: 5 rows × 3 columns
- **Buttons**: 0-9, +, -, ., C, ⌫
- **Grid**: `[1, 2, 3, 4, 5, 6, 7, 8, 9, '+', 0, '-', 'C', '.', '⌫']`
- **Use Case**: Basic arithmetic expressions

### Config 4: Numbers + Multiplication + Division + Decimal
- **Layout**: 5 rows × 3 columns
- **Buttons**: 0-9, ×, ÷, ., C, ⌫
- **Grid**: `[1, 2, 3, 4, 5, 6, 7, 8, 9, '×', 0, '÷', 'C', '.', '⌫']`
- **Use Case**: Advanced arithmetic expressions

## Input Modes Explained

### Replace Mode
- Each number click **replaces** the entire current text
- Useful for single-digit input or when you want to start fresh each time
- Example:
  - Click `1` → shows `1`
  - Click `5` → shows `5` (replaces `1`)
  - Click `3` → shows `3` (replaces `5`)

### Append Mode
- Each number click **appends** to the existing text
- Useful for multi-digit numbers
- Example:
  - Click `1` → shows `1`
  - Click `5` → shows `15` (appends to `1`)
  - Click `3` → shows `153` (appends to `15`)

## Max Number Limit

The `maxNumber` prop only applies in **append mode** and prevents users from entering numbers that exceed the limit.

### How It Works
1. User types numbers in append mode
2. Before updating input, component calculates what the new number would be
3. If new number > `maxNumber`:
   - Plays wrong sound (`window.playAnswerSound(false)`)
   - Prevents input update
4. If new number ≤ `maxNumber`:
   - Updates input normally

### Examples

**Example 1:**
- `maxNumber: 10`
- User has `"5"` entered
- User clicks `"3"` → Would create `"53"` → 53 > 10 → ❌ Wrong sound, input prevented
- User clicks `"0"` → Would create `"50"` → 50 > 10 → ❌ Wrong sound, input prevented
- User clicks `"1"` → Would create `"51"` → 51 > 10 → ❌ Wrong sound, input prevented

**Example 2:**
- `maxNumber: 100`
- User has `"9"` entered
- User clicks `"9"` → Would create `"99"` → 99 ≤ 100 → ✅ Input allowed
- User clicks `"9"` again → Would create `"999"` → 999 > 100 → ❌ Wrong sound, input prevented

**Note**: In replace mode, `maxNumber` is ignored because each click replaces the entire value.

## Feedback Modes Explained

### Instruction Mode
- Feedback area text **never changes** when check button is clicked
- Always shows the default text from `feedbackTextArea.defaultText`
- Check button still validates and plays sounds
- Useful when you want static instructions visible at all times

### Feedback Mode
- Feedback area text **changes** when check button is clicked
- Shows feedback messages based on validation result:
  - Correct answer → Shows `correctFeedback` (green background)
  - Incorrect answer → Shows `incorrectFeedback` (red background)
- Useful when you want dynamic feedback in the number pad itself

## Sequential Destinations Flow

The component supports sequential validation across multiple destinations:

1. **Initialization**: Component starts at `destinationIndex: 0`
2. **Input**: User types numbers → Updates `destinations[0].destinationId` element
3. **Validation**: User clicks check → Validates against `destinations[0].correctValue`
4. **Correct Answer**:
   - Shows `destinations[0].correctFeedback`
   - Moves to next destination (`destinationIndex: 1`)
   - Clears input value
   - Updates `destinations[1].destinationId` element on next input
5. **Incorrect Answer**:
   - Shows `destinations[0].incorrectFeedback`
   - Stays on current destination (index doesn't change)
6. **Repeat**: Process continues for each destination
7. **Completion**: When all destinations are completed, stays on last destination

## Cell Mode Integration

The number pad component integrates with table grid components to automatically set cell visual modes based on validation results.

### Cell Modes

The component can set destination table cells to different visual modes:

- **`'normal'`**: Default appearance (no special styling)
- **`'incorrect'`**: Salmon background, dark salmon border, white font, wiggle animation (1000ms)
- **`'correct'`**: Green background, dark green border, white font
- **`'focus'`**: Yellow background, white solid border, black font, blinking background animation

### Automatic Mode Changes

1. **On Check Button Click**:
   - **Correct Answer**: Sets destination cell to `'correct'` mode
   - **Incorrect Answer**: Sets destination cell to `'incorrect'` mode

2. **After Incorrect Check**:
   - When user clicks a number button after an incorrect check, automatically sets cell to `'focus'` mode
   - This highlights the cell to indicate the user should try again

3. **On Component Load** (if `setFocusOnLoad: true`):
   - Sets the initial destination cell to `'focus'` mode
   - Helps guide users to the correct cell

### How It Works

The number pad uses the table component's `window.tableGridModeCallbacks` system:

```javascript
// Number pad extracts table component ID from destinationId
// Example: 'page2-map-table-R1C1' → 'page2-map-table'

// Calls the table's mode update callback
window.tableGridModeCallbacks[tableComponentId](destinationId, mode);
```

### Example

```javascript
{
  setFocusOnLoad: true,  // Set cell to focus mode on load
  destinations: [
    {
      destinationId: "page2-map-table-R1C1",
      correctValue: 5,
      correctFeedback: "Correct!",
      incorrectFeedback: "Try again."
    }
  ]
}

// Flow:
// 1. Component loads → Cell R1C1 set to 'focus' mode (yellow, blinking)
// 2. User enters "3" → Cell shows "3"
// 3. User clicks check → Answer incorrect → Cell set to 'incorrect' mode (salmon, wiggle)
// 4. User clicks "5" → Cell set to 'focus' mode (yellow, blinking) + shows "5"
// 5. User clicks check → Answer correct → Cell set to 'correct' mode (green)
```

## External Feedback Component Integration

The number pad can send feedback to external feedback components (like `FeedbackTextboxComponent`).

### Setup

1. **Set `feedbackComponentId`** in number pad config:
```javascript
feedbackComponentId: "page2-feedback-textbox"
```

2. **Ensure feedback component ID matches pattern**:
   - Pattern: `pageN-feedback-textbox` (e.g., `page2-feedback-textbox`)
   - The component automatically listens to `pageNFeedbackUpdate` events

3. **How it works**:
   - Number pad extracts page number from `feedbackComponentId`
   - Updates global state: `window.page2FeedbackState = { text, mode }`
   - Dispatches event: `window.dispatchEvent(new CustomEvent('page2FeedbackUpdate', { detail: { text, mode } }))`
   - Feedback component listens to event and updates its display

### Example

```javascript
// Number Pad Config
{
  feedbackComponentId: "page2-feedback-textbox",
  destinations: [
    {
      destinationId: "page2-map-table-R1C1",
      correctValue: 5,
      correctFeedback: "Correct!",
      incorrectFeedback: "Try again."
    }
  ]
}

// When check is pressed:
// 1. Validates input against correctValue
// 2. Updates page2-feedback-textbox with feedback text and mode
// 3. Feedback component receives event and displays feedback
```

## Best Practices

1. **Use Destinations Array for Sequential Validation**
   - Instead of managing multiple number pads, use a single pad with multiple destinations
   - Component automatically handles progression through destinations

2. **Set Appropriate Max Number**
   - Use `maxNumber` in append mode to prevent invalid input
   - Helps guide users to enter valid ranges

3. **Choose Right Input Mode**
   - Use `replace` mode for single-digit input
   - Use `append` mode for multi-digit input

4. **Configure Feedback Mode**
   - Use `instruction` mode when you want static instructions
   - Use `feedback` mode when you want dynamic feedback in the pad itself

5. **Use External Feedback for Better UX**
   - Set `feedbackComponentId` to send feedback to a dedicated feedback area
   - Allows feedback to be displayed in a more prominent location

6. **Customize Button Sizing**
   - Use `buttonWidthPercent` and `buttonHeightPercent` to control button size
   - Default 90% provides good spacing while maximizing button area

7. **Set Height Percentages**
   - Adjust `feedbackRowHeight`, `buttonGridHeight`, and `checkButtonHeight` to fit your layout
   - Ensure percentages add up appropriately for your design

8. **Use Grid Cell Units (gc)**
   - Use `gc` units for responsive sizing that scales with screen size
   - Example: `fontSize: "30gc"` instead of `fontSize: "18px"`

## Troubleshooting

### Issue: Input value not updating destination element

**Possible Causes:**
- `destinations` array is empty
- `destinationIndex` is out of bounds
- `destinationId` doesn't exist in DOM

**Solutions:**
- Ensure `destinations` array has at least one object
- Check that `destinationIndex` is within array bounds (0 to length-1)
- Verify `destinationId` matches an actual element ID in the DOM
- Check browser console for warning messages

### Issue: Check button not validating

**Possible Causes:**
- `destinations` array is empty
- `correctValue` is not set in current destination
- `destinationIndex` is out of bounds

**Solutions:**
- Ensure `destinations` array has at least one object
- Verify `correctValue` is set in the current destination object
- Check that `destinationIndex` is valid

### Issue: Feedback not showing in external component

**Possible Causes:**
- `feedbackComponentId` is not set
- Feedback component ID doesn't match pattern `pageN-feedback-textbox`
- Feedback component not listening to events

**Solutions:**
- Set `feedbackComponentId` to the correct component ID
- Ensure ID follows pattern: `pageN-feedback-textbox` (e.g., `page2-feedback-textbox`)
- Verify feedback component is set up to listen to `pageNFeedbackUpdate` events

### Issue: Max number limit not working

**Possible Causes:**
- `inputMode` is set to `'replace'` (maxNumber only works in append mode)
- `maxNumber` is `null` or not set

**Solutions:**
- Set `inputMode: "append"` for maxNumber to work
- Set `maxNumber` to a valid number

### Issue: Component not moving to next destination

**Possible Causes:**
- Answer is incorrect (component only advances on correct answers)
- Already at last destination
- `destinations` array has only one item

**Solutions:**
- Verify answer is correct
- Check if you're already at the last destination
- Add more destinations to the array for sequential progression

### Issue: Sounds not playing

**Possible Causes:**
- `enableClickSound` is set to `false`
- Sound manager not loaded
- `window.playCarClickSound` or `window.playAnswerSound` not available

**Solutions:**
- Set `enableClickSound: true`
- Ensure sound manager is loaded before number pad component
- Check browser console for errors

## API Summary

### Props
- `layout`: `'vertical'` | `'horizontal'`
- `buttonConfig`: `1` | `2` | `3` | `4`
- `enableClickSound`: `boolean`
- `inputMode`: `'replace'` | `'append'`
- `maxNumber`: `number` | `null`
- `feedbackMode`: `'instruction'` | `'feedback'`
- `feedbackComponentId`: `string` | `null`
- `setFocusOnLoad`: `boolean`
- `destinations`: `Array<DestinationObject>`
- `destinationIndex`: `number`
- `feedbackRowHeight`: `string` (percentage)
- `buttonGridHeight`: `string` (percentage)
- `checkButtonHeight`: `string` (percentage)
- `backgroundColor`: `string`
- `borderRadius`: `string`
- `border`: `string`
- `padding`: `string`
- `numberButtons`: `object`
- `checkButton`: `object`
- `feedbackTextArea`: `object`

### Global Functions
- `window.updateNumberPadFeedback(message, type)`: Update feedback message
- `window.clearNumberPadFeedback()`: Clear feedback and input

### Destination Object
```typescript
{
  destinationId: string;      // Required
  correctValue: number | string;  // Required
  correctFeedback?: string;   // Optional
  incorrectFeedback?: string; // Optional
}
```

## Version History

- **v1.0.0**: Initial release with basic number pad functionality
- **v1.1.0**: Added button configurations (1-4)
- **v1.2.0**: Added input modes (replace/append)
- **v1.3.0**: Added maxNumber limit for append mode
- **v1.4.0**: Added feedback modes (instruction/feedback)
- **v1.5.0**: Added external feedback component integration
- **v1.6.0**: Added sequential destinations array support
- **v1.7.0**: Added destination index management and auto-advance
- **v1.8.0**: Added cell mode integration (focus, correct, incorrect modes)
- **v1.9.0**: Added `setFocusOnLoad` prop for auto-focus on component load

