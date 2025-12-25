# QuizPanelComponent Props Documentation

## Overview

The `QuizPanelComponent` is a flexible quiz component that supports multiple quiz types (MCQ, FIB, MAT, SEQ) with configurable layouts and styling.

## All Available Props

### Core Props (Required/Common)

#### `quizType` (string, default: "MCQ")

- **Description**: The type of quiz to display
- **Valid values**: `"MCQ"`, `"FIB"`, `"MAT"`, `"SEQ"`
- **Usage**: Determines the quiz behavior and layout

#### `quizSubtype` (string | null, default: null)

- **Description**: Subtype for MCQ quizzes only
- **Valid values**:
  - For MCQ: `"QT4"`, `"QTI4"`, `"QT2"`, `"QTI2"`, `"QT4R"`, `"QTI4R"`, `"QTI2R"`
  - For other types: `null`
- **Usage**:
  - `QT` = Text only options
  - `QTI` = Options with images
  - `2` or `4` = Number of options
  - `R` = Options displayed in rows

#### `quizId` (string, default: "")

- **Description**: Unique identifier for this quiz instance
- **Usage**: Used for state management across page navigation. State is saved/restored based on this ID

### Content Props

#### `questionText` (string, default: "")

- **Description**: The main question text to display
- **Usage**: Supports HTML (e.g., `<br>` tags) for formatting

#### `options` (array, default: [])

- **Description**: Array of option objects for MCQ quizzes
- **Structure**: `[{text: string, image: string, iscorrect: boolean, feedback: string}, ...]`
- **Usage**: Each option can have text, optional image, correctness flag, and feedback

#### `image` (string, default: "")

- **Description**: Image path for QTI subtypes (questions with images)
- **Usage**: Main question image displayed above options

#### `imageText` (string, default: "")

- **Description**: Text displayed below the question image
- **Usage**: Additional context or description for the image

#### `keyConcepts` (array, default: [])

- **Description**: Array of key concepts to send to ConceptSummary panel
- **Usage**: Automatically dispatched to ConceptSummaryComponent when quiz is completed

#### `impFormulae` (array, default: [])

- **Description**: Array of important formulae to send to ConceptSummary panel
- **Usage**: Automatically dispatched to ConceptSummaryComponent when quiz is completed

### Header Row Props

#### `headerText` (string, default: "")

- **Description**: Text displayed in the header row
- **Usage**: Typically used for section titles like "Connect with Concepts"
- **Note**: If `headerText` is empty or not provided, the header row will be hidden and its height will be automatically redistributed proportionally to the other rows (question, options, feedback)

#### `headerFontSize` (string, default: "24gc")

- **Description**: Font size for header text (supports "gc" units)
- **Usage**: Grid cell units are automatically processed

#### `headerTextColor` (string, default: "#ffffff")

- **Description**: Color of the header text

#### `headerBackgroundColor` (string, default: "transparent")

- **Description**: Background color for the header row

#### `headerBorder` (string, default: "none")

- **Description**: Border style for header (supports "gc" units)
- **Example**: `"2gc solid #00A0A0"`

#### `headerBorderRadius` (string, default: "0gc")

- **Description**: Border radius for header (supports "gc" units)

#### `headerPadding` (string, default: "20gc")

- **Description**: Padding for header row (supports "gc" units)

#### `headerUnderlineColor` (string, default: "#00A0A0")

- **Description**: Color for the underline decoration on header text

#### `headerUnderlineThickness` (string, default: "2gc")

- **Description**: Thickness of the underline (supports "gc" units)

### Question Row Props

#### `questionTextFontSize` (string, default: "24gc")

- **Description**: Font size for question text (supports "gc" units)

#### `questionTextColor` (string, default: "#ffffff")

- **Description**: Color of the question text

### Feedback Props

#### `feedbackState` (string, default: "default")

- **Description**: Initial feedback state
- **Valid values**: `"default"`, `"normal"`, `"correct"`, `"incorrect"`
- **Usage**: Controls feedback display state

#### `feedbackText` (string, default: "")

- **Description**: Initial feedback text to display
- **Usage**: Shown in the feedback row

### Layout & Styling Props

#### `backgroundColor` (string, default: "#0A0A1A")

- **Description**: Background color of the quiz panel

#### `backgroundColorOpacity` (number, default: 0.5)

- **Description**: Opacity for background color (0-1)
- **Usage**: Combined with `backgroundColor` to create rgba color

#### `border` (string, default: "3gc solid transparent")

- **Description**: Border style for the panel (supports "gc" units)
- **Example**: `"3gc solid rgba(255,255,255,0.2)"`

#### `borderRadius` (string, default: "15gc")

- **Description**: Border radius for the panel (supports "gc" units)

#### `padding` (string, default: "15gc")

- **Description**: Padding for the panel (supports "gc" units)

#### `contentColor` (string, default: "#E0E0E0")

- **Description**: Default text color for content

#### `contentFontSize` (string, default: "24gc")

- **Description**: Default font size for content (supports "gc" units)

#### `optionsContainerWidth` (number | null, default: null)

- **Description**: Width percentage of the options row that the options container uses
- **Valid values**: `0-100` (percentage) or `null` to use default
- **Usage**:
  - Controls how much of the options row width is used by the option buttons container
  - For layouts without images (QT2, QT4, QT4R): Directly controls the container width (0-100%)
  - For layouts with images (QTI2, QTI4, QTI2R, QTI4R): Scales the `optionsColumnWidth` proportionally
  - When set to less than 100%, the options container will be centered horizontally
  - Default (`null`) uses 100% for layouts without images, or the configured `optionsColumnWidth` for layouts with images
- **Example**:
  ```javascript
  {
    optionsContainerWidth: 80, // Options container uses 80% of options row width
    // ... other props
  }
  ```

### Row Height Props (Optional - All or None)

These props allow custom control over row heights. If any are provided, ALL FOUR must be provided and must sum to 100%.

#### `headerRowHeight` (number, default: from config)

- **Description**: Height percentage for header row (0-100)
- **Usage**:
  - If not provided, uses default from `QUIZ_ROW_HEIGHTS` constant based on quiz type/subtype
  - Set to `0` to hide the header row completely
  - If `headerText` is empty, the header row height is automatically set to 0 and redistributed proportionally to other rows

#### `questionRowHeight` (number, default: from config)

- **Description**: Height percentage for question row (0-100)
- **Usage**: If not provided, uses default from `QUIZ_ROW_HEIGHTS` constant

#### `optionsRowHeight` (number, default: from config)

- **Description**: Height percentage for options row (0-100)
- **Usage**: If not provided, uses default from `QUIZ_ROW_HEIGHTS` constant

#### `feedbackRowHeight` (number, default: from config)

- **Description**: Height percentage for feedback row (0-100)
- **Usage**: If not provided, uses default from `QUIZ_ROW_HEIGHTS` constant

**Important Notes**:

- Default heights are automatically determined from `QUIZ_ROW_HEIGHTS` constant based on `quizType` and `quizSubtype` if custom heights are not provided
- If `headerText` is empty or `headerRowHeight` is set to 0, the header row height is automatically redistributed proportionally to the question, options, and feedback rows
- When providing custom heights, all four must be provided and must sum to exactly 100%
- The component will show a warning if heights don't sum to 100%

**Example with custom heights**:

```javascript
{
  componentType: "QuizPanelComponent",
  headerRowHeight: 0,    // Hide header
  questionRowHeight: 15,  // 15% for question
  optionsRowHeight: 70,   // 70% for options
  feedbackRowHeight: 15,  // 15% for feedback
  // ... other props
}
```

### System Props (Automatically Provided)

These props are automatically provided by the math-applet system and typically don't need to be set manually:

#### `position` (object)

- **Description**: Grid position information
- **Usage**: Automatically set by the layout system

#### `processedStyles` (object)

- **Description**: Pre-processed styles with gc units converted
- **Usage**: Automatically provided by math-applet.js

#### `elementZIndex` (number)

- **Description**: Z-index for the component
- **Usage**: Controls layering

#### `id` (string)

- **Description**: Element ID
- **Usage**: Used as fallback for `quizId` if not provided

## Example Usage

### Basic Example

```javascript
{
  componentType: "QuizPanelComponent",
  quizId: "page5-quiz",
  quizType: "MCQ",
  quizSubtype: "QT2",
  headerText: "Connect with Concepts",
  questionText: "What is 2 + 2?",
  options: [
    { text: "3", iscorrect: false, feedback: "Try again!" },
    { text: "4", iscorrect: true, feedback: "Correct!" }
  ],
  keyConcepts: ["Addition", "Basic Math"],
  impFormulae: ["a + b = c"],
  backgroundColor: "#0A0A1A",
  backgroundColorOpacity: 0.5
}
```

### Example with Custom Row Heights and Options Width

```javascript
{
  componentType: "QuizPanelComponent",
  quizId: "page10-quiz",
  quizType: "MCQ",
  quizSubtype: "QT2",
  headerText: "", // Empty to hide header
  headerRowHeight: 0,    // Hide header row
  questionRowHeight: 15,  // 15% for question
  optionsRowHeight: 70,   // 70% for options
  feedbackRowHeight: 15,  // 15% for feedback
  optionsContainerWidth: 80, // Options container uses 80% of options row width
  questionText: "What is 2 + 2?",
  options: [
    { text: "3", iscorrect: false, feedback: "Try again!" },
    { text: "4", iscorrect: true, feedback: "Correct!" }
  ],
  backgroundColor: "#0A0A1A",
  backgroundColorOpacity: 0.5
}
```

## Row Height Defaults

Default row heights (from `QUIZ_ROW_HEIGHTS` constant):

- **MCQ QTI2/QTI2R/QTI4/QTI4R**: header: 10%, question: 20%, options: 55%, feedback: 15%
- **MCQ QT2/QT4/QT4R**: header: 10%, question: 25%, options: 45%, feedback: 20%
- **FIB/MAT/SEQ**: header: 10%, question: 10%, options: 65%, feedback: 15%
- **DEFAULT**: header: 10%, question: 15%, options: 70%, feedback: 15%

## State Management

The component automatically saves and restores state based on `quizId`:

- State includes: clicked options, feedback state, feedback text
- State persists across page navigation
- State is stored in `window.quizPanelStateStore`

## Event Dispatching

When all correct answers are found, the component:

1. Dispatches `quizCompleted` event
2. Sends `keyConcepts` and `impFormulae` to ConceptSummaryComponent via `updateConceptSummary` event
