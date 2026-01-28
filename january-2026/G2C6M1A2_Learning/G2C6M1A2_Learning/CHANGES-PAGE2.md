# Page 2 Code Changes Summary

This document explains all the changes made to implement the **disabled buttons**, **image updates**, and **balloon/wooden box text display** functionality for Page 2.

---

## Overview

Page 2 now follows the same step-by-step interaction pattern as Pages 5, 8, and 11:

1. User taps **"Lift Balloon"** button → balloon image changes, text appears, button disables
2. User taps **"Lift Wooden Box"** button → wooden box image changes, text appears, button disables
3. After both steps → **Next button** and **Tap GIF** become enabled

---

## Files Changed

| File | Purpose |
|------|---------|
| `js/PageConfig.js` | Added page 2 to the sequence configuration |
| `js/components/image-stack-component.js` | Added image swap handlers for page 2 |
| `js/components/layout-components.js` | Added text display handlers for page 2 |

---

## Detailed Changes

### 1. `js/PageConfig.js`

**Location:** Inside `initializePageConfig()` function (around line 3757)

**What was added:**

```javascript
// Page 2: lift balloon then lift wooden box; when both done, enable Next and TapGif
window.pageSequenceConfig[2] = {
  steps: ["liftBallon", "liftWoodenBox"],
  enableOnComplete: ["page2-next-button", "page2-tap-animation"],
  stepToButtonId: {
    liftBallon: "page2-lift-ballon-button",
    liftWoodenBox: "page2-lift-wooden-button",
  },
};
```

**Why:**
- This registers Page 2 with the shared page sequence system
- `steps` array defines the order: balloon first, then wooden box
- `enableOnComplete` lists which elements to enable after all steps are done
- `stepToButtonId` maps each step to its button ID

**How it works with existing code:**

The existing button configurations in Page 2 already use these helper functions:

```javascript
// Lift Balloon button - disabled after clicked
get disabled() {
  return isPageSequenceStepButtonDisabled(2, "liftBallon");
}

// Lift Wooden Box button - disabled until balloon done, then disabled after clicked
get disabled() {
  return isPageSequenceStepButtonDisabledByOrder(2, "liftWoodenBox");
}

// Next button - disabled until both steps complete
get disabled() {
  return isNextDisabledByPageSequence(2);
}
```

---

### 2. `js/components/image-stack-component.js`

**Location:** Inside the `useEffect` handler for `pageActionCompleted` event (around line 78)

**What was added:**

```javascript
// Page 2
if (action === 'liftBallon' && stackKey === 'page2-ballon-image') {
  setDynamicImages((prev) =>
    prev.map((img, i) =>
      i === 0 ? { ...img, hidden: true } :
      i === 1 ? { ...img, hidden: false } :
      img
    )
  );
  return;
}
if (action === 'liftWoodenBox' && stackKey === 'page2-wooden-box-image') {
  setDynamicImages((prev) =>
    prev.map((img, i) =>
      i === 0 ? { ...img, hidden: true } :
      i === 1 ? { ...img, hidden: false } :
      img
    )
  );
  return;
}
```

**Why:**
- When user clicks "Lift Balloon" button, the `pageActionCompleted` event fires with `action: "liftBallon"`
- This handler catches that event and swaps the balloon images:
  - **Image 0** (normal balloon) → hidden
  - **Image 1** (lifting balloon) → visible
- Same logic applies for the wooden box

**Image stack structure in PageConfig.js:**

```javascript
// page2-ballon-image has 2 layers:
images: [
  { src: "assets/ballon.png", hidden: false },      // Layer 0 - normal
  { src: "assets/liftBag.png", hidden: true }       // Layer 1 - lifting (shown after click)
]

// page2-wooden-box-image has 2 layers:
images: [
  { src: "assets/woodenBox.png", hidden: false },   // Layer 0 - normal
  { src: "assets/liftEraser.png", hidden: true }    // Layer 1 - lifting (shown after click)
]
```

---

### 3. `js/components/layout-components.js`

**Location:** Inside `TeacherNoteComponent` (around line 2073)

**What was added:**

```javascript
// Page 2 teacher notes: balloon + wooden box
useEffect(() => {
  const handler = (e) => {
    if (componentId !== "page2-lift-ballon-text") return;
    if (e.detail.pageNumber === 2 && e.detail.action === "liftBallon") {
      setCurrentTeacherText(getI18nText("pages.page2.liftBagText"));
    }
  };

  window.addEventListener("pageActionCompleted", handler);
  return () => window.removeEventListener("pageActionCompleted", handler);
}, [componentId]);

useEffect(() => {
  const handler = (e) => {
    if (componentId !== "page2-wooden-box-text") return;
    if (e.detail.pageNumber === 2 && e.detail.action === "liftWoodenBox") {
      setCurrentTeacherText(getI18nText("pages.page2.liftEraserText"));
    }
  };

  window.addEventListener("pageActionCompleted", handler);
  return () => window.removeEventListener("pageActionCompleted", handler);
}, [componentId]);
```

**Why:**
- The text boxes (`page2-lift-ballon-text` and `page2-wooden-box-text`) start empty
- When user clicks the lift buttons, these handlers update the text content
- Text comes from `data.js` translations:
  - `pages.page2.liftBagText` = "Uffff…it's hard to lift!"
  - `pages.page2.liftEraserText` = "haaa…it's easy to lift!"

---

## Event Flow Diagram

```
User clicks "Lift Balloon" button
         │
         ▼
onClick() in PageConfig.js
         │
         ├─► setPageSequenceStepDone(2, "liftBallon", true)
         │   (marks step as complete)
         │
         ├─► dispatch "pageActionCompleted" event
         │   { pageNumber: 2, action: "liftBallon" }
         │
         └─► forceAppUpdate()
             (triggers re-render)
                    │
                    ▼
    ┌───────────────┴───────────────┐
    │                               │
    ▼                               ▼
ImageStackComponent            TeacherNoteComponent
listens for event              listens for event
    │                               │
    ▼                               ▼
Swaps images:                  Updates text:
- Hide ballon.png              "Uffff…it's hard to lift!"
- Show liftBag.png
    │                               │
    └───────────────┬───────────────┘
                    ▼
            Button re-renders
            with disabled=true
            (because step is done)
```

---

## Related Element IDs

| Element ID | Purpose |
|------------|---------|
| `page2-lift-ballon-button` | Button to lift the balloon |
| `page2-lift-wooden-button` | Button to lift the wooden box |
| `page2-ballon-image` | Image stack for balloon (2 layers) |
| `page2-wooden-box-image` | Image stack for wooden box (2 layers) |
| `page2-lift-ballon-text` | Text box showing balloon lift result |
| `page2-wooden-box-text` | Text box showing wooden box lift result |
| `page2-next-button` | Next button (enabled after both steps) |
| `page2-tap-animation` | Tap GIF (enabled after both steps) |

---

## Translation Keys Used (from `data.js`)

```javascript
pages: {
  page2: {
    liftBallon: "Lift Ballon",           // Button text
    liftWoodenBox: "Lift Woden Box",     // Button text
    liftBagText: "Uffff…it's hard to lift!",    // Shown after lifting balloon
    liftEraserText: "haaa…it's easy to lift!",  // Shown after lifting wooden box
    instructionText: "Tap "Lift Bag" button to see how Jax lifts.",
    instructionText2: "Tap » to see what DeeTee says.",
  }
}
```

---

## Testing Checklist

- [ ] Page 2 loads with "Lift Balloon" button enabled
- [ ] "Lift Wooden Box" button is disabled initially
- [ ] Next button is disabled initially
- [ ] Clicking "Lift Balloon" changes the balloon image
- [ ] Clicking "Lift Balloon" shows "Uffff…it's hard to lift!" text
- [ ] "Lift Balloon" button becomes disabled after click
- [ ] "Lift Wooden Box" button becomes enabled after balloon is lifted
- [ ] Clicking "Lift Wooden Box" changes the wooden box image
- [ ] Clicking "Lift Wooden Box" shows "haaa…it's easy to lift!" text
- [ ] "Lift Wooden Box" button becomes disabled after click
- [ ] Next button and Tap GIF become enabled after both steps
