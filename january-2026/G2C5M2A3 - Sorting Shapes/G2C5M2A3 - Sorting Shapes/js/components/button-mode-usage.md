# Button Mode Feature - Usage Guide

## Overview

The Next and Previous button components now support a `mode` prop that controls both visual appearance and interaction behavior. This feature provides a consistent way to enable/disable buttons across the application.

## Mode States

### Enabled Mode (`mode: 'enabled'`)
- **Background**: `var(--color-gold)` (#F1C40F) or custom backgroundColor
- **Cursor**: `pointer`
- **Opacity**: `1`
- **Pointer Events**: `auto`
- **onClick**: ✅ Executes when clicked
- **Visual**: Full brightness, clickable

### Disabled Mode (`mode: 'disabled'`)
- **Background**: Gray `#888888`
- **Cursor**: `not-allowed`
- **Opacity**: `0.6`
- **Pointer Events**: `none`
- **onClick**: ❌ Blocked (won't execute)
- **Visual**: Grayed out, not clickable

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `string` | `'enabled'` | Button mode: `'enabled'` or `'disabled'` |
| `onModeChange` | `function` | `undefined` | Callback function called when mode changes |

All existing button props (text, backgroundColor, fontSize, etc.) continue to work as before.

---

## Usage Examples

### Basic Usage in PageConfig.js

#### Example 1: Enabled Button (Default)
```javascript
{
  name: 'next-button',
  type: 'button',
  coordinates: [1450, 820, 1595, 895],
  zIndex: 'var(--z-button)',
  props: {
    text: '»',
    mode: 'enabled',
    onClick: () => {
      window.changePageAndNotify(2);
    }
  }
}
```

#### Example 2: Disabled Button
```javascript
{
  name: 'next-button',
  type: 'button',
  coordinates: [1450, 820, 1595, 895],
  zIndex: 'var(--z-button)',
  props: {
    text: '»',
    mode: 'disabled', // Button will be grayed out and not clickable
    onClick: () => {
      // This won't execute when mode is 'disabled'
      window.changePageAndNotify(2);
    }
  }
}
```

#### Example 3: Dynamic Mode with Callback
```javascript
{
  name: 'next-button-page2',
  type: 'button',
  coordinates: [1450, 820, 1595, 895],
  zIndex: 'var(--z-button)',
  props: {
    text: '»',
    get mode() {
      // Dynamic mode based on answer state
      return window.userAnsweredCorrectly ? 'enabled' : 'disabled';
    },
    onModeChange: (newMode) => {
      console.log('Mode changed to:', newMode);
      
      // Play sound when enabled
      if (newMode === 'enabled') {
        window.playCorrectSound?.();
      }
      
      // Trigger animation
      if (newMode === 'enabled') {
        anime({
          targets: '[data-grid-position="next-button-page2"]',
          scale: [1, 1.1, 1],
          duration: 500,
          easing: 'easeInOutQuad'
        });
      }
    },
    onClick: () => {
      // Only executes when mode is 'enabled'
      window.changePageAndNotify(1);
    }
  }
}
```

### Programmatic Mode Changes

You can change the button mode programmatically by updating the prop:

```javascript
// Example: Enable button after correct answer
function onCorrectAnswer() {
  // Update button mode
  const buttonElement = document.querySelector('[data-grid-position="next-button-page2"]');
  
  // Trigger re-render with new mode
  window.forceAppUpdate?.();
  
  console.log('Button mode changed to enabled');
}

// Example: Disable button during processing
function disableButtonDuringProcessing() {
  // Set mode to disabled
  window.buttonMode = 'disabled';
  window.forceAppUpdate?.();
}
```

---

## Integration with Page Logic

### Page 2 Answer Checking Pattern

```javascript
// In PageConfig.js - Page 2 Next Button
{
  name: 'next-button-page2',
  type: 'button',
  coordinates: [1450, 820, 1595, 895],
  props: {
    text: '»',
    mode: 'disabled', // Start disabled
    onModeChange: (newMode) => {
      if (newMode === 'enabled') {
        // Visual feedback when enabled
        console.log('✅ Next button enabled - user can proceed');
        window.playCorrectSound?.();
      }
    },
    onClick: () => {
      // Navigation logic (only fires when enabled)
      window.changePageAndNotify(1);
    }
  }
}

// In answer checking logic
function checkAnswer(userAnswer) {
  if (userAnswer === correctAnswer) {
    // Enable the next button
    window.nextButtonMode = 'enabled';
    window.forceAppUpdate();
  } else {
    // Keep button disabled
    console.log('❌ Incorrect - button remains disabled');
  }
}
```

---

## Styling and Customization

### Mode-Based Styles

The mode automatically applies these styles:

**Enabled Mode:**
```javascript
{
  backgroundColor: props.backgroundColor || 'var(--color-gold)',
  cursor: 'pointer',
  pointerEvents: 'auto',
  opacity: 1
}
```

**Disabled Mode:**
```javascript
{
  backgroundColor: '#888888',
  cursor: 'not-allowed',
  pointerEvents: 'none',
  opacity: 0.6
}
```

### Custom Colors

You can override the enabled color with backgroundColor prop:

```javascript
{
  name: 'custom-button',
  type: 'button',
  props: {
    mode: 'enabled',
    backgroundColor: '#FF5733', // Custom color for enabled state
    // Disabled state will still use gray (#888888)
  }
}
```

---

## Backward Compatibility

✅ **Fully backward compatible!**

- If `mode` is not specified, defaults to `'enabled'`
- Existing buttons without mode prop continue working normally
- All previous button props are preserved

```javascript
// Old button configuration (still works)
{
  name: 'old-button',
  type: 'button',
  props: {
    text: 'Next',
    backgroundColor: '#FF9900',
    onClick: () => console.log('clicked')
  }
}

// Equivalent to:
{
  name: 'old-button',
  type: 'button',
  props: {
    text: 'Next',
    mode: 'enabled', // Default
    backgroundColor: '#FF9900',
    onClick: () => console.log('clicked')
  }
}
```

---

## Best Practices

1. **Start with Disabled**: For buttons that require completion (e.g., answer checking), start with `mode: 'disabled'`

2. **Use Callbacks**: Leverage `onModeChange` for feedback (sounds, animations, logging)

3. **Dynamic Mode**: Use getters for mode to respond to application state changes

4. **Clear Visual Feedback**: The gray disabled state provides clear user feedback

5. **Test Both States**: Always test button behavior in both enabled and disabled modes

---

## Common Patterns

### Pattern 1: Quiz/Answer Buttons
```javascript
// Next button disabled until correct answer
mode: 'disabled',
onModeChange: (newMode) => {
  if (newMode === 'enabled') {
    window.playCorrectSound();
    window.showConfetti();
  }
}
```

### Pattern 2: Progressive Navigation
```javascript
// Enable next button after viewing content
mode: window.contentViewed ? 'enabled' : 'disabled'
```

### Pattern 3: Form Validation
```javascript
// Enable submit button when form is valid
get mode() {
  return window.formIsValid ? 'enabled' : 'disabled';
}
```

---

## Troubleshooting

### Button Not Responding
- Check that `mode` is set to `'enabled'`
- Verify onClick handler is defined
- Check console for mode change logs

### Mode Not Changing
- Ensure `window.forceAppUpdate()` is called after mode change
- Verify mode prop is dynamic (using getter) if it needs to change

### Wrong Colors
- Disabled mode always uses gray (#888888)
- Enabled mode uses backgroundColor prop or gold default
- Mode styles override other background styles

---

## Technical Details

### React 18 Optimizations
- `React.useMemo` for mode-based styles
- `React.useDeferredValue` for mode prop
- `React.useCallback` for mode change handler
- Maintains existing `useTransition` for smooth interactions

### Component Files
- **NextButtonComponent**: `js/components/interaction-components.js` (lines 72-218)
- **PreviousButtonComponent**: `js/components/interaction-components.js` (lines 220-369)
- **Configuration**: `js/components/interaction-components.js` (lines 424-513)

### Data Attributes
Buttons include data attributes for testing and debugging:
- `data-mode`: Current mode ('enabled' or 'disabled')
- `data-element-type`: Element type identifier
- `data-grid-position`: Button position identifier

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Component Files**: `js/components/interaction-components.js`, `js/PageConfig.js`

