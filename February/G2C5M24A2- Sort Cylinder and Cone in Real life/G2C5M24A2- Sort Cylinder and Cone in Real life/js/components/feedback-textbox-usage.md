# Feedback Textbox Component - Usage Guide

## Overview

The `feedback-textbox` component is a React-based UI element designed to display feedback messages with three distinct visual modes: **normal**, **correct**, and **incorrect**. It supports dynamic text updates and mode changes through callback functions.

## Features

- ✅ Three visual modes for different feedback states
- ✅ Full GC (grid cell) unit support for responsive sizing
- ✅ React 18 optimizations (memo, useMemo, useDeferredValue, useTransition)
- ✅ Callback functions for dynamic updates
- ✅ Follows existing component architecture patterns
- ✅ Fully integrated with the elements registry system

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | The text content to display in the textbox |
| `fontSize` | `string` | `'32gc'` | Font size in GC units (e.g., '32gc', '44gc') |
| `borderRadius` | `string` | `'12gc'` | Border radius in GC units |
| `mode` | `string` | `'normal'` | Visual mode: `'normal'`, `'correct'`, or `'incorrect'` |
| `onTextChange` | `function` | `undefined` | Callback function called when text needs to be updated |
| `onModeChange` | `function` | `undefined` | Callback function called when mode needs to be updated |

Additional standard props like `textAlign`, `display`, `alignItems`, `justifyContent`, `padding`, etc., are also supported and will be processed through `GridCellFontUtils.processGcStyles()`.

---

## Visual Modes

### 1. Normal Mode (`mode: 'normal'`)
- **Text Color**: White
- **Background**: Transparent
- **Border**: None

**Use case**: Default state or neutral messages.

### 2. Correct Mode (`mode: 'correct'`)
- **Text Color**: White
- **Background**: `var(--color-green)` (#219150)
- **Border**: Dashed 4gc border with `var(--color-green-dark)` (#0B803D)

**Use case**: Success messages, correct answers, positive feedback.

### 3. Incorrect Mode (`mode: 'incorrect'`)
- **Text Color**: White
- **Background**: `var(--color-salmon)` (#FF6B61)
- **Border**: Dashed 4gc border with `var(--color-salmon-dark)` (#D9D9D9)

**Use case**: Error messages, incorrect answers, negative feedback.

---

## Usage Examples

### Basic Usage in PageConfig.js

#### Example 1: Normal Mode Message
```javascript
{
  name: 'instruction-text',
  type: 'feedback-textbox',
  coordinates: [100, 50, 800, 150],
  zIndex: 'var(--z-content)',
  props: {
    text: 'Tap the correct answer',
    fontSize: '36gc',
    borderRadius: '12gc',
    mode: 'normal',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15gc'
  }
}
```

#### Example 2: Correct Answer Feedback
```javascript
{
  name: 'correct-feedback',
  type: 'feedback-textbox',
  coordinates: [200, 400, 1400, 500],
  zIndex: 'var(--z-elevated)',
  props: {
    text: '✓ Great job! That\'s correct!',
    fontSize: '44gc',
    borderRadius: '15gc',
    mode: 'correct',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20gc',
    fontWeight: 'bold'
  }
}
```

#### Example 3: Incorrect Answer Feedback
```javascript
{
  name: 'incorrect-feedback',
  type: 'feedback-textbox',
  coordinates: [200, 400, 1400, 500],
  zIndex: 'var(--z-elevated)',
  props: {
    text: '✗ Try again!',
    fontSize: '44gc',
    borderRadius: '15gc',
    mode: 'incorrect',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20gc',
    fontWeight: 'bold'
  }
}
```

### Dynamic Usage with Callbacks

#### Example: Dynamic Feedback Based on User Input
```javascript
// In PageConfig.js or custom logic
{
  name: 'dynamic-feedback',
  type: 'feedback-textbox',
  coordinates: [300, 600, 1300, 700],
  zIndex: 'var(--z-elevated)',
  props: {
    get text() {
      // Dynamic text based on some condition
      const isCorrect = window.userAnswerCorrect;
      return isCorrect ? 'Excellent work!' : 'Please try again';
    },
    fontSize: '38gc',
    borderRadius: '12gc',
    get mode() {
      // Dynamic mode based on some condition
      const isCorrect = window.userAnswerCorrect;
      return isCorrect ? 'correct' : 'incorrect';
    },
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18gc',
    onTextChange: (newText) => {
      console.log('Feedback text changed to:', newText);
      // Handle text change logic
    },
    onModeChange: (newMode) => {
      console.log('Feedback mode changed to:', newMode);
      // Handle mode change logic (e.g., play sound, trigger animation)
      if (newMode === 'correct') {
        window.playCorrectSound?.();
      } else if (newMode === 'incorrect') {
        window.playIncorrectSound?.();
      }
    }
  }
}
```

### Using with i18n (Internationalization)

```javascript
{
  name: 'localized-feedback',
  type: 'feedback-textbox',
  coordinates: [150, 300, 1450, 400],
  zIndex: 'var(--z-content)',
  props: {
    get text() {
      // Use i18n for localized text
      return typeof i18n !== 'undefined' 
        ? i18n.t('feedback.correct') 
        : 'Correct!';
    },
    fontSize: '40gc',
    borderRadius: '12gc',
    mode: 'correct',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
```

---

## Advanced Styling

### Custom Padding and Alignment
```javascript
{
  name: 'custom-styled-feedback',
  type: 'feedback-textbox',
  coordinates: [50, 100, 1550, 250],
  zIndex: 'var(--z-content)',
  props: {
    text: 'Custom styled feedback message',
    fontSize: '32gc',
    borderRadius: '20gc',
    mode: 'normal',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '25gc 40gc',  // Top/bottom left/right padding
    boxSizing: 'border-box',
    fontWeight: 'normal'
  }
}
```

### Multi-line Text Support
```javascript
{
  name: 'multiline-feedback',
  type: 'feedback-textbox',
  coordinates: [200, 150, 1400, 350],
  zIndex: 'var(--z-content)',
  props: {
    text: 'This is a longer feedback message that spans multiple lines. It provides detailed information to the user.',
    fontSize: '28gc',
    borderRadius: '12gc',
    mode: 'normal',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20gc',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  }
}
```

---

## Integration Guide

### Prerequisites
The component requires the following to be loaded (already configured in `index.html`):
1. React 18 library
2. `GridCellFontUtils.js` for GC unit conversion
3. `shared-utilities.js` for React 18 optimizations
4. `feedback-textbox-component.js`
5. `elements-registry.js` for component registration

### Load Order in index.html
```html
<script src="js/lib/react.development.js"></script>
<script src="js/lib/react-dom.development.js"></script>
<script src="js/GridCellFontUtils.js"></script>
<script src="js/components/shared-utilities.js"></script>
<!-- ... other components ... -->
<script src="js/components/feedback-textbox-component.js"></script>
<script src="js/components/elements-registry.js"></script>
```

### Verification
After loading, you can verify the component is available:
```javascript
console.log(window.FeedbackTextboxComponent); // Should show component object
console.log(window.StandardElements['feedback-textbox']); // Should show element config
```

---

## Technical Details

### GC Unit Conversion
All units (`fontSize`, `borderRadius`, `borderWidth`, `padding`) use GC (Grid Cell) units which are automatically converted to pixels based on the grid configuration. This ensures responsive sizing across different screen sizes.

Example: `'32gc'` → converted to appropriate pixel value based on grid cell size.

### React 18 Optimizations
The component uses several React 18 features for optimal performance:
- `React.memo` - Prevents unnecessary re-renders
- `React.useMemo` - Memoizes mode-based styles
- `React.useDeferredValue` - Defers non-urgent updates
- `React.useTransition` - Marks state updates as transitions
- `React.useId` - Generates stable unique IDs

### CSS Variables
The component uses CSS custom properties defined in `css/core.css`:
- `--color-green`: #219150
- `--color-green-dark`: #0B803D
- `--color-salmon`: #FF6B61
- `--color-salmon-dark`: #D9D9D9

---

## Best Practices

1. **Use appropriate modes**: Match the mode to the context (correct for success, incorrect for errors, normal for neutral messages)

2. **Keep text concise**: While multi-line is supported, shorter feedback messages are more effective

3. **Consistent sizing**: Use similar font sizes and dimensions for related feedback messages to maintain visual consistency

4. **Leverage callbacks**: Use `onTextChange` and `onModeChange` for dynamic interactions (sounds, animations, etc.)

5. **Accessibility**: Ensure text has sufficient contrast and size for readability

6. **Responsive design**: Use GC units instead of fixed pixels for better responsiveness

---

## Troubleshooting

### Component not rendering
- Check that `feedback-textbox-component.js` is loaded in `index.html`
- Verify `elements-registry.js` is loaded after the component file
- Check browser console for loading errors

### Styles not applying
- Ensure `css/core.css` is loaded for CSS variables
- Verify GC units are being used (e.g., '32gc' not '32px')
- Check that `GridCellFontUtils.js` is loaded

### Callbacks not firing
- Ensure functions are passed to `onTextChange` and `onModeChange` props
- Check that the callbacks are properly defined in scope
- Verify no JavaScript errors are preventing execution

---

## Examples Repository

For more examples, see:
- `PageConfig.js` - Example usage in page configurations
- `interaction-components.js` - Similar component patterns
- `layout-components.js` - Component structure reference

---

## Support

For issues or questions about the feedback-textbox component:
1. Check the browser console for error messages
2. Verify all prerequisites are loaded
3. Review the examples in this guide
4. Check that props match the documented API

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Component File**: `js/components/feedback-textbox-component.js`

