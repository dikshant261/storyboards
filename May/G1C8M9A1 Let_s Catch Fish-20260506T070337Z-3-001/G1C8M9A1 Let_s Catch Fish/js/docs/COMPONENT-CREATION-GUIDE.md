# Component Creation & Integration Guide

A complete guide to creating, registering, and using components in this app. Covers the full lifecycle from writing the component to using it in PageConfig.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Step-by-Step: Creating a Component](#step-by-step-creating-a-component)
3. [Props — Destructuring, Defaults & gc Units](#props--destructuring-defaults--gc-units)
4. [Exposing Callbacks via window](#exposing-callbacks-via-window)
5. [Registering the Component](#registering-the-component)
6. [Using the Component in PageConfig](#using-the-component-in-pageconfig)
7. [Full Worked Example: CounterComponent](#full-worked-example-countercomponent)
8. [Do's and Don'ts](#dos-and-donts)

---

## Architecture Overview

### Component Lifecycle

```
Component file (.js)              elements-registry.js              math-applet.js                PageConfig.js
 ┌──────────────────┐              ┌───────────────┐              ┌──────────────────┐          ┌──────────────┐
 │ 1. Define React   │  window.*   │ 3. Aggregate   │ Standard-   │ 5. ElementRenderer│  reads   │ 4. Define    │
 │    component      │────────────>│    into         │  Elements   │    matches type   │<─────────│    element   │
 │ 2. Export to      │             │  StandardElem   │             │    and creates    │          │    in page   │
 │    window.*       │             │  + ElementsUtils│             │    React element  │          │    config    │
 └──────────────────┘              └───────────────┘              └──────────────────┘          └──────────────┘
```

### Load Order (index-en.html)

```
1. react.development.js, react-dom.development.js   ← React
2. GridCellFontUtils.js                              ← gc unit processor
3. shared-utilities.js                               ← createOptimizedElementFactory, ErrorBoundary
4. layout-components.js                              ← QuestionComponent, ContainerComponent, etc.
5. [your-component].js                               ← YOUR COMPONENT HERE
6. elements-registry.js                              ← Aggregates all into StandardElements + ElementsUtils
7. index.js                                          ← Verifies all loaded
8. PageConfig.js                                     ← Page definitions with element configs
9. math-applet.js                                    ← ElementRenderer, App component
```

### How Props Flow

```
PageConfig.js                  ElementRenderer                    Your Component
┌───────────────┐             ┌──────────────────┐              ┌──────────────────┐
│ element: {    │             │ Reads element    │              │ props = {        │
│   type:'custom│  ─────────> │ Computes:        │  ─────────>  │   position,      │
│   props: {    │             │  - position (CSS)│              │   processedStyles│
│     fontSize  │             │  - processedStyles│             │   elementZIndex, │
│     textColor │             │  - elementZIndex │              │   elementName,   │
│   }           │             │ Calls            │              │   id,            │
│ }             │             │ createCustomElem │              │   ...your props  │
└───────────────┘             └──────────────────┘              └──────────────────┘
```

ElementRenderer adds these props automatically:

- **position** — `{ css: { left, top, width, height }, coordinates: [x1,y1,x2,y2] }`
- **processedStyles** — props with gc units processed (e.g. `'28gc'` → `'1.75rem'`)
- **elementZIndex** — resolved z-index
- **elementName** — from `element.name`
- **id** — from `element.id`

---

## Step-by-Step: Creating a Component

### Step 1: Create the Component File

Create `js/components/my-component.js`:

```javascript
/**
 * My Component - React 18 Optimized
 *
 * Description of what this component does.
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

const MyComponent = React.memo((props) => {
  const elementId = React.useId();

  // 1. Destructure props with defaults
  const {
    position,
    processedStyles,
    elementZIndex,
    elementName,
    // Your custom props with defaults:
    title = "Default Title",
    fontSize = "28gc",
    textColor = "#ffffff",
    backgroundColor = "transparent",
    items = [],
    onItemClick = null,
    showBorder = true,
  } = props;

  // 2. Process gc units
  let processedFontSize = fontSize;
  if (
    fontSize &&
    fontSize.includes("gc") &&
    window.GridCellFontUtils?.processGcProperty
  ) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(
      fontSize,
      "fontSize",
    );
  }

  // 3. Build styles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    backgroundColor,
    color: textColor,
    fontSize: processedFontSize,
  };

  // 4. Return React element (no JSX — use React.createElement)
  return React.createElement(
    "div",
    {
      id: elementId,
      style: containerStyle,
    },
    title,
  );
});
```

### Step 2: Create the Element Configuration

At the bottom of the same file, define the element config and export:

```javascript
const MyElement = {
  myComponent: {
    type: "my-component",
    coordinates: [100, 100, 500, 300],
    zIndex: "var(--z-content)",
    props: {
      title: "Default Title",
      fontSize: "28gc",
      textColor: "#ffffff",
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory(
      "my-component",
      (props, elementId) => React.createElement(MyComponent, props),
    ),
  },
};

// Export to window
window.MyComponent = {
  MyComponent,
  MyElement,
};

console.log("✅ My component loaded successfully");
```

### Step 3: Add the Script Tag (index-en.html)

Add BEFORE `elements-registry.js` and AFTER `shared-utilities.js`:

```html
<!-- Components (load in order) -->
<script src="js/components/shared-utilities.js"></script>
<script src="js/components/layout-components.js"></script>
...
<script src="js/components/my-component.js"></script>
<!-- ADD HERE -->
...
<script src="js/components/elements-registry.js"></script>
```

### Step 4: Register in elements-registry.js

Two changes are needed:

**a) Import the element config:**

```javascript
const myElement = window.MyComponent?.MyElement || {};
```

**b) Spread into StandardElements:**

```javascript
const StandardElements = {
  ...layoutElements,
  ...interactionElements,
  // ... existing components ...
  ...myElement, // ADD HERE
};
```

**c) Add to createCustomElement handler:**

```javascript
if (componentType === "MyComponent") {
  const MyComponent = window.MyComponent?.MyComponent;
  if (MyComponent) {
    const mergedProps = {
      ...otherProps,
      ...processedStyles,
      processedStyles: processedStyles,
    };
    return React.createElement(MyComponent, mergedProps);
  }
}
```

### Step 5: Use in PageConfig

```javascript
{
  id: 'page1-my-widget',
  name: 'page1-my-widget',
  type: 'custom',
  coordinates: [100, 200, 600, 400],
  zIndex: 50,
  props: {
    componentType: 'MyComponent',
    title: 'Hello World',
    fontSize: '32gc',
    textColor: '#00FFFF'
  }
}
```

---

## Props — Destructuring, Defaults & gc Units

### Destructuring with Defaults

Props are destructured at the top of the component. Default values are set inline using `=`:

```javascript
const MyComponent = React.memo((props) => {
  const {
    // ── System props (always passed by ElementRenderer) ──
    position, // { css: {left,top,width,height}, coordinates: [x1,y1,x2,y2] }
    processedStyles, // props with gc units already processed
    elementZIndex, // resolved z-index number
    elementName, // string from element.name in PageConfig

    // ── Your custom props with defaults ──
    title = "Untitled", // string — simple default
    fontSize = "28gc", // string with gc unit
    padding = "15gc", // string with gc unit
    textColor = "#ffffff", // color string
    backgroundColor = "transparent",
    borderRadius = "8gc",
    showIcon = true, // boolean default
    items = [], // array default (empty array)
    columnWidths = [], // array default
    rowData = {}, // object default (empty object)
    maxItems = 5, // number default
    onItemClick = null, // callback default (null means not provided)
    mode = "normal", // enum-like string: 'normal' | 'correct' | 'incorrect'
  } = props;
  // ...
});
```

### Prop Types Summary

| Pattern          | Example              | Default    | Notes                                     |
| ---------------- | -------------------- | ---------- | ----------------------------------------- |
| String           | `title = 'Hello'`    | `'Hello'`  | Simple text                               |
| String (gc unit) | `fontSize = '28gc'`  | `'28gc'`   | Must be processed via `processGcProperty` |
| Number           | `maxItems = 5`       | `5`        |                                           |
| Boolean          | `showBorder = true`  | `true`     |                                           |
| Array            | `items = []`         | `[]`       | Never default to a shared reference       |
| Object           | `config = {}`        | `{}`       | Never default to a shared reference       |
| Callback         | `onClick = null`     | `null`     | Check for null before calling             |
| Color            | `textColor = '#fff'` | `'#fff'`   | Hex, named, rgba, transparent             |
| Enum-like        | `mode = 'normal'`    | `'normal'` | Document accepted values                  |

### Processing gc Units

All gc-unit props must be processed before use in styles. The `processGcProperty` function converts `'28gc'` to responsive values (e.g. `'1.75rem'`):

```javascript
let processedFontSize = fontSize;
if (
  fontSize &&
  fontSize.includes("gc") &&
  window.GridCellFontUtils?.processGcProperty
) {
  processedFontSize = window.GridCellFontUtils.processGcProperty(
    fontSize,
    "fontSize",
  );
}
```

The second argument is the CSS property name hint. Common values:

- `'fontSize'` — for font sizes
- `'padding'` — for padding
- `'marginLeft'`, `'marginTop'` — for margins/gaps
- `'borderWidth'` — for border widths
- `'borderRadius'` — for border radius
- `'width'`, `'height'` — for dimensions

### Arrays and Objects — Array or Map Pattern

Some props accept either arrays or objects, allowing index-based or key-based lookup:

```javascript
// Array form: colors applied by position
dataRowBackgroundColors: ['#053745', '#053745', '#053745']

// Object (map) form: only specific indices colored
dataRowBackgroundColors: { 0: '#053745', 2: '#053745' }
```

Helper pattern for reading these:

```javascript
const getColor = (index) => {
  if (Array.isArray(colors) && colors.length > 0) {
    return colors[index] || defaultColor;
  } else if (typeof colors === "object" && colors !== null) {
    return colors[index] || defaultColor;
  }
  return defaultColor;
};
```

---

## Exposing Callbacks via window

### Pattern 1: Direct window Object (Component State Updates)

Expose update functions so external code (PageConfig, buttons, other components) can change state:

```javascript
const MyComponent = React.memo((props) => {
  const componentId = props.elementName || props.id || React.useId();
  const [text, setText] = React.useState(props.text || "");
  const [mode, setMode] = React.useState(props.mode || "normal");

  // Expose update function globally
  React.useEffect(() => {
    if (!window.myComponentCallbacks) {
      window.myComponentCallbacks = {};
    }

    const updateState = (newText, newMode) => {
      setText(newText);
      setMode(newMode);
    };

    window.myComponentCallbacks[componentId] = updateState;

    return () => {
      if (window.myComponentCallbacks) {
        delete window.myComponentCallbacks[componentId];
      }
    };
  }, [componentId]);

  // ...render using text and mode...
});
```

**Usage from PageConfig or button onClick:**

```javascript
onClick: () => {
  const update = window.myComponentCallbacks?.["page3-my-widget"];
  if (update) update("New text!", "correct");
};
```

### Pattern 2: Query Functions (Read Component State)

Expose read-only query functions so Check buttons or validators can inspect component state:

```javascript
React.useEffect(() => {
  if (!window.myComponentQueries) {
    window.myComponentQueries = {};
  }

  window.myComponentQueries[componentId] = {
    getSelectedItems: () => [...selectedItems],
    getCount: () => selectedItems.length,
    isCorrect: () => selectedItems.length === expectedCount,
  };

  return () => {
    if (window.myComponentQueries) {
      delete window.myComponentQueries[componentId];
    }
  };
}, [componentId, selectedItems, expectedCount]);
```

**Usage in a Check button handler (PageConfig):**

```javascript
function createMyCheckHandler(componentId, expectedCount) {
  return () => {
    const queries = window.myComponentQueries?.[componentId];
    if (!queries) return;
    if (queries.isCorrect()) {
      // show success feedback
    } else {
      // show error feedback
    }
  };
}
```

### Pattern 3: CustomEvent Dispatch (Cross-Component Communication)

Use `window.dispatchEvent` + `CustomEvent` for loosely coupled communication:

**Dispatching (from component or PageConfig):**

```javascript
window.dispatchEvent(
  new CustomEvent("quizCompleted", {
    detail: { componentType: "MyComponent", pageNumber: 3 },
  }),
);
```

**Listening (in another component):**

```javascript
React.useEffect(() => {
  const handler = (e) => {
    if (e.detail.pageNumber === currentPage) {
      // react to quiz completion
    }
  };
  window.addEventListener("quizCompleted", handler);
  return () => window.removeEventListener("quizCompleted", handler);
}, [currentPage]);
```

### Pattern 4: Feedback Callback Pattern

The `createFeedbackCallback` pattern dispatches events that `FeedbackTextboxComponent` listens for:

```javascript
// In PageConfig.js:
function createFeedbackCallback(componentId) {
  const pageMatch = (componentId || "").match(/page(\d+)/);
  const pageId = pageMatch ? `page${pageMatch[1]}` : null;
  return (text, mode) => {
    if (!pageId) return;
    window[`${pageId}FeedbackState`] = {
      text: text ?? "",
      mode: mode ?? "normal",
    };
    window.dispatchEvent(
      new CustomEvent(`${pageId}FeedbackUpdate`, {
        detail: { text: text ?? "", mode: mode ?? "normal" },
      }),
    );
  };
}
```

**Usage:**

```javascript
dropCallbacks: {
  onAddSuccess: {
    componentId: 'page3-feedback-textbox',
    callback: createFeedbackCallback('page3-feedback-textbox'),
    text: 'Great job!',
    mode: 'correct'
  }
}
```

---

## Registering the Component

### Complete Registration Checklist

1. **Component file** — exports `window.MyComponent = { MyComponent, MyElement }`
2. **Script tag** — added to `index-en.html` before `elements-registry.js`
3. **elements-registry.js** — three additions:
   - Debug log check: `MyComponent: !!window.MyComponent`
   - Import: `const myElement = window.MyComponent?.MyElement || {};`
   - Spread: `...myElement` in `StandardElements`
4. **elements-registry.js createCustomElement** — handler for `componentType === 'MyComponent'`
5. **index.js** — (optional) add to `requiredComponents` check

### What createCustomElement Does

When `ElementRenderer` encounters `type: 'custom'`, it calls `ElementsUtils.createCustomElement` with:

```javascript
{
  componentType: 'MyComponent',    // from props.componentType in PageConfig
  processedStyles: { ... },        // gc-processed styles
  elementName: 'page3-my-widget',  // from element.name
  id: 'page3-my-widget',           // from element.id
  position: { css: {...}, coordinates: [...] },
  elementZIndex: 50,
  ...otherProps                    // all other props from PageConfig
}
```

`createCustomElement` matches `componentType` to find your component on `window`, then creates a React element with merged props:

```javascript
if (componentType === "MyComponent") {
  const MyComponent = window.MyComponent?.MyComponent;
  if (MyComponent) {
    const mergedProps = {
      ...otherProps,
      ...processedStyles,
      processedStyles: processedStyles,
    };
    return React.createElement(MyComponent, mergedProps);
  }
}
```

---

## Using the Component in PageConfig

### Element Definition Structure

```javascript
{
  id: 'page3-my-widget',           // Unique ID (used in DOM and callbacks)
  name: 'page3-my-widget',         // Unique name (used by ElementRenderer)
  type: 'custom',                  // Must be 'custom' for all custom components
  coordinates: [100, 200, 600, 400], // [x1, y1, x2, y2] in grid units
  zIndex: 50,                      // Stacking order
  props: {
    componentType: 'MyComponent',  // Must match the if-check in createCustomElement
    elementName: 'page3-my-widget', // Pass if your component needs it
    // ... all your custom props:
    title: 'My Widget',
    fontSize: '32gc',
    textColor: '#00FFFF',
    items: ['Apple', 'Banana', 'Cherry'],
    maxItems: 5,
    showBorder: false,
    onClick: () => { console.log('clicked'); }
  }
}
```

### Key Fields

| Field                   | Required | Description                                                         |
| ----------------------- | -------- | ------------------------------------------------------------------- |
| **id**                  | Yes      | Unique element ID across all pages. Convention: `page{N}-{name}`.   |
| **name**                | Yes      | Same as id. Used by ElementRenderer for keying.                     |
| **type**                | Yes      | `'custom'` for all custom components.                               |
| **coordinates**         | Yes      | `[x1, y1, x2, y2]` — top-left and bottom-right in grid coordinates. |
| **zIndex**              | Yes      | Stacking order. Higher = on top.                                    |
| **props.componentType** | Yes      | String that matches the if-check in `createCustomElement`.          |
| **props.elementName**   | Often    | Passed to component; used for callback registration keys.           |
| **props.\***            | Varies   | All other component-specific props.                                 |

### coordinates

```
coordinates: [x1, y1, x2, y2]
              │   │   │   │
              │   │   │   └── bottom edge (grid units)
              │   │   └────── right edge (grid units)
              │   └────────── top edge (grid units)
              └────────────── left edge (grid units)
```

Grid is roughly 1600 × 900 units. Example: `[100, 200, 600, 400]` = left 100, top 200, right 600, bottom 400 → 500 wide, 200 tall.

---

## Full Worked Example: CounterComponent

A simple counter that displays a count, can be incremented via a button, and exposes query functions.

### 1. Component File: `js/components/counter-component.js`

```javascript
/**
 * Counter Component - React 18 Optimized
 *
 * Displays a count. Exposes increment/reset callbacks and query functions.
 */

const CounterComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    elementName,
    label = "Count",
    initialCount = 0,
    fontSize = "32gc",
    textColor = "#ffffff",
    backgroundColor = "#2a3f5f",
    borderRadius = "12gc",
    padding = "15gc",
  } = props;

  const componentId = elementName || props.id || elementId;

  // State
  const [count, setCount] = React.useState(initialCount);

  // Process gc units
  let processedFontSize = fontSize;
  if (fontSize?.includes("gc") && window.GridCellFontUtils?.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(
      fontSize,
      "fontSize",
    );
  }
  let processedPadding = padding;
  if (padding?.includes("gc") && window.GridCellFontUtils?.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(
      padding,
      "padding",
    );
  }
  let processedBorderRadius = borderRadius;
  if (
    borderRadius?.includes("gc") &&
    window.GridCellFontUtils?.processGcProperty
  ) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(
      borderRadius,
      "borderRadius",
    );
  }

  // Expose callbacks (Pattern 1): external code can increment/reset
  React.useEffect(() => {
    if (!window.counterCallbacks) window.counterCallbacks = {};
    window.counterCallbacks[componentId] = {
      increment: (amount = 1) => setCount((prev) => prev + amount),
      reset: () => setCount(initialCount),
      setCount: (val) => setCount(val),
    };
    return () => {
      if (window.counterCallbacks) delete window.counterCallbacks[componentId];
    };
  }, [componentId, initialCount]);

  // Expose queries (Pattern 2): external code can read count
  React.useEffect(() => {
    if (!window.counterQueries) window.counterQueries = {};
    window.counterQueries[componentId] = {
      getCount: () => count,
    };
    return () => {
      if (window.counterQueries) delete window.counterQueries[componentId];
    };
  }, [componentId, count]);

  // Styles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    backgroundColor,
    color: textColor,
    fontSize: processedFontSize,
    padding: processedPadding,
    borderRadius: processedBorderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  };

  return React.createElement(
    "div",
    { id: elementId, style: containerStyle },
    `${label}: ${count}`,
  );
});

// Element configuration
const CounterElement = {
  counter: {
    type: "counter",
    coordinates: [100, 100, 400, 200],
    zIndex: "var(--z-content)",
    props: {
      label: "Count",
      initialCount: 0,
      fontSize: "32gc",
      textColor: "#ffffff",
      backgroundColor: "#2a3f5f",
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory(
      "counter",
      (props, elementId) => React.createElement(CounterComponent, props),
    ),
  },
};

// Export
window.CounterComponent = {
  CounterComponent,
  CounterElement,
};

console.log("✅ Counter component loaded successfully");
```

### 2. Script Tag (index-en.html)

```html
<script src="js/components/counter-component.js"></script>
<!-- Before elements-registry.js -->
```

### 3. elements-registry.js

```javascript
// Import
const counterElement = window.CounterComponent?.CounterElement || {};

// Spread into StandardElements
const StandardElements = {
  ...layoutElements,
  // ... existing ...
  ...counterElement,
};
```

Add handler in `createCustomElement`:

```javascript
if (componentType === "CounterComponent") {
  const CounterComponent = window.CounterComponent?.CounterComponent;
  if (CounterComponent) {
    const mergedProps = {
      ...otherProps,
      ...processedStyles,
      processedStyles: processedStyles,
    };
    return React.createElement(CounterComponent, mergedProps);
  }
}
```

### 4. PageConfig Usage

```javascript
// Counter element
{
  id: 'page1-grape-counter',
  name: 'page1-grape-counter',
  type: 'custom',
  coordinates: [100, 500, 400, 580],
  zIndex: 50,
  props: {
    componentType: 'CounterComponent',
    elementName: 'page1-grape-counter',
    label: 'Grapes',
    initialCount: 0,
    fontSize: '36gc',
    textColor: '#00FFFF',
    backgroundColor: '#053745'
  }
},
// Button that increments the counter
{
  id: 'page1-add-grape-button',
  name: 'page1-add-grape-button',
  type: 'button',
  coordinates: [100, 600, 400, 660],
  zIndex: 50,
  props: {
    text: 'Add Grape',
    onClick: () => {
      const callbacks = window.counterCallbacks?.['page1-grape-counter'];
      if (callbacks) callbacks.increment(1);
    }
  }
},
// Check button that validates the counter
{
  id: 'page1-check-button',
  name: 'page1-check-button',
  type: 'custom',
  coordinates: [100, 680, 400, 740],
  zIndex: 50,
  props: {
    componentType: 'PreviousButtonComponent',
    text: 'Check',
    onClick: () => {
      const queries = window.counterQueries?.['page1-grape-counter'];
      const feedback = createFeedbackCallback('page1-feedback-textbox');
      if (queries && queries.getCount() === 5) {
        feedback('Correct!', 'correct');
      } else {
        feedback('Try again', 'incorrect');
      }
    }
  }
}
```

---

## Do's and Don'ts

### Do's

- **Use `React.memo`** for all components — prevents unnecessary re-renders.
- **Use `React.useId()`** for element IDs — ensures unique IDs.
- **Set default values** for every custom prop in the destructuring.
- **Process gc units** for all size/spacing/font props — call `processGcProperty`.
- **Use `componentId = elementName || props.id || elementId`** — consistent naming for callbacks/queries.
- **Clean up window registrations** in `useEffect` return — prevents memory leaks.
- **Use `React.useCallback`** for handlers passed as props — prevents re-renders.
- **Use `React.useMemo`** for computed styles — prevents recalculation.
- **Follow the naming convention** `page{N}-{component-name}` for IDs.
- **Export both `Component` and `Element`** from window — `window.MyComponent = { MyComponent, MyElement }`.

### Don'ts

- **Don't use JSX** — this app uses `React.createElement` directly (no build step).
- **Don't forget to add the script tag** before `elements-registry.js`.
- **Don't forget to register in `createCustomElement`** — your component won't render.
- **Don't mutate window objects directly in render** — use `useEffect` for registrations.
- **Don't hardcode pixel values** — use gc units (e.g. `'28gc'`, not `'28px'`). Grid-cell units are responsive.
- **Don't share default array/object references** — use `[]` or `{}` in destructuring, not a module-level constant.
- **Don't skip cleanup** in useEffect when registering on window — stale callbacks cause bugs.
- **Don't forget `type: 'custom'`** in PageConfig — other types go through different rendering paths.
- **Don't forget `componentType`** in props — `createCustomElement` uses this string to find your component.
- **Don't call callbacks without null-checking** — always check `if (callback)` before calling.

### Common Mistakes

1. **Component not rendering:**
   - Missing script tag in `index-en.html`
   - Missing handler in `createCustomElement` in `elements-registry.js`
   - Wrong `componentType` string (must match exactly)
   - `type` not set to `'custom'` in PageConfig

2. **Styles not applying:**
   - Missing `...(position?.css || {})` in container style
   - Missing `...(processedStyles || {})` in container style
   - Not processing gc units via `processGcProperty`

3. **Callbacks not working:**
   - Not using `elementName` as the key for window registration
   - Registering in render instead of `useEffect`
   - Missing cleanup in useEffect return

4. **gc units not processing:**
   - Forgetting to check `fontSize.includes('gc')` before calling `processGcProperty`
   - Using wrong property hint (e.g. `'fontSize'` instead of `'padding'`)

---

## File Locations

- **Shared utilities:** `js/components/shared-utilities.js` — `createOptimizedElementFactory`, `ErrorBoundary`
- **Elements registry:** `js/components/elements-registry.js` — `StandardElements`, `createCustomElement`
- **Component index:** `js/components/index.js` — load verification
- **Element renderer:** `js/math-applet.js` — `ElementRenderer`, `ELEMENT_TYPES`
- **Page configs:** `js/PageConfig.js` — page definitions, helper functions
- **HTML entry:** `index-en.html` — script tags and load order
- **gc unit processor:** `js/GridCellFontUtils.js` — `processGcProperty`
