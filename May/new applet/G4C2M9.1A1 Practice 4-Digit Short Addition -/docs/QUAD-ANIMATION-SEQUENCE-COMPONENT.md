# Quad Animation Sequence Component

## Overview

The `QuadAnimationSequenceComponent` is a generic, reusable React component for orchestrating quadrilateral animation sequences. It can be used on any page (page 3, page 4, etc.) by providing a configuration object that defines the animation steps, messages, colors, and timing.

## Features

- ✅ **Generic & Reusable**: Works on any page with different configurations
- ✅ **Flexible**: Supports single or double pair animations
- ✅ **Configurable**: All aspects controlled via configuration object
- ✅ **Event-Driven**: Dispatches completion events for integration
- ✅ **Message Management**: Automatically updates messagebox components
- ✅ **Symbol Support**: Adds chevron arrows (single or double) to indicate parallel sides

## Prerequisites

1. **QuadrilateralAnimations Utilities**: The component requires `quadrilateral-animations.js` to be loaded first
2. **Quadrilateral Component**: A quadrilateral component must exist with the specified ID
3. **Messagebox Component**: A textbox component must exist with the specified ID

## Basic Usage

### Step 1: Add Script Tag

Make sure the component is loaded in your HTML:

```html
<!-- Quadrilateral Animation Utilities (load first) -->
<script src="js/components/quadrilateral-animations.js"></script>

<!-- Quad Animation Sequence Component -->
<script src="js/components/quad-animation-sequence-component.js"></script>
```

### Step 2: Register in Elements Registry

The component is automatically registered in `elements-registry.js` and can be used with `componentType: "QuadAnimationSequenceComponent"`.

### Step 3: Configure in PageConfig

Add the component to your page configuration:

```javascript
{
  id: "page3-animation-sequence",
  name: "animation-sequence",
  type: "custom",
  coordinates: [0, 0, 1600, 900], // Full page overlay
  zIndex: 2000,
  props: {
    componentType: "QuadAnimationSequenceComponent",
    sequenceConfig: {
      // Configuration object (see below)
    }
  }
}
```

## Configuration Object Structure

The `sequenceConfig` object contains all configuration for the animation sequence:

```javascript
{
  // Required: Component IDs
  quadComponentId: "page3-shape-display",        // ID of quadrilateral component
  messageBoxId: "page3-messagebox",                // ID of messagebox component
  
  // Optional: General settings
  initialDelay: 500,                              // Delay before starting (ms)
  completionEventName: "page3AnimationComplete",  // Event name to dispatch on completion
  
  // Required: First pair configuration
  firstPair: {
    side1Index: 0,                                // Side index (0=AB, 1=BC, 2=CD, 3=DA)
    side2Index: 2,                                // Side index
    pairIndex: 0,                                 // Animation pair index (0=AB/CD, 1=BC/DA)
    pairName: "AB-CD",                            // Name for symbols (used in data attributes)
    highlightColor: "#00FF00",                    // Color for highlighting sides
    chevronColor: "#006400",                      // Color for chevron arrows
    doubleChevron: false,                         // true = double chevron (>>), false = single (>)
    initialMessage: "Opposite sides are parallel...", // Message shown before first pair
    provenMessage: "AB and CD are parallel to each other" // Message when proven parallel
  },
  
  // Optional: Second pair configuration
  // If not provided, only first pair will be animated
  secondPair: {
    side1Index: 1,                                // BC
    side2Index: 3,                                // DA
    pairIndex: 1,                                 // Animation pair index (1=BC/DA)
    pairName: "BC-DA",
    highlightColor: "#FF6600",                    // Orange
    chevronColor: "#CC4400",                      // Dark orange
    doubleChevron: true,                          // Double chevron
    initialMessage: "Opposite sides are parallel...", // Shown before second pair
    provenMessage: "BC and DA are parallel to each other"
  },
  
  // Optional: Timing configuration
  timing: {
    messageDuration: 1000,                        // Duration for initial message (ms)
    sideHighlightDuration: 1000,                  // Duration for side highlighting (ms)
    parallelAnimationCycles: 2,                  // Number of animation cycles
    symbolDelay: 500,                             // Delay before adding symbols (ms)
    waitBetweenPairs: 1000,                      // Wait between first and second pair (ms)
    conclusionDelay: 1000                         // Delay before conclusion message (ms)
  },
  
  // Optional: Conclusion message
  conclusionMessage: "Two pairs of opposite sides are parallel"
}
```

## Configuration Properties

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `quadComponentId` | string | ID of the quadrilateral component to animate |
| `messageBoxId` | string | ID of the messagebox/textbox component to update |
| `firstPair` | object | Configuration for the first pair of sides (see First Pair Config below) |

### Optional Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `initialDelay` | number | `500` | Delay before starting animation (ms) |
| `completionEventName` | string | `undefined` | Event name to dispatch when sequence completes |
| `secondPair` | object | `undefined` | Configuration for second pair (optional) |
| `timing` | object | `{}` | Timing configuration (see Timing Config below) |
| `conclusionMessage` | string | `undefined` | Message to show after all animations complete |

### First Pair Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `side1Index` | number | Yes | First side index: 0=AB, 1=BC, 2=CD, 3=DA |
| `side2Index` | number | Yes | Second side index: 0=AB, 1=BC, 2=CD, 3=DA |
| `pairIndex` | number | Yes | Animation pair: 0=AB/CD, 1=BC/DA |
| `pairName` | string | Yes | Name for symbols (e.g., "AB-CD") |
| `highlightColor` | string | Yes | Color for highlighting sides (hex or color name) |
| `chevronColor` | string | Yes | Color for chevron arrows |
| `doubleChevron` | boolean | Yes | `true` for double chevron (>>), `false` for single (>) |
| `initialMessage` | string | No | Message shown before first pair animation |
| `provenMessage` | string | Yes | Message shown when pair is proven parallel |

### Second Pair Configuration

Same structure as `firstPair`. If not provided, only the first pair will be animated.

### Timing Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `messageDuration` | number | `1000` | Duration for initial message display (ms) |
| `sideHighlightDuration` | number | `1000` | Duration for side highlighting before animation (ms) |
| `parallelAnimationCycles` | number | `2` | Number of cycles for parallel lines animation |
| `symbolDelay` | number | `500` | Delay before adding chevron symbols (ms) |
| `waitBetweenPairs` | number | `1000` | Wait time between first and second pair (ms) |
| `conclusionDelay` | number | `1000` | Delay before showing conclusion message (ms) |

## Side Index Reference

| Index | Side Name | Description |
|-------|-----------|-------------|
| `0` | AB | First side (from vertex A to B) |
| `1` | BC | Second side (from vertex B to C) |
| `2` | CD | Third side (from vertex C to D) |
| `3` | DA | Fourth side (from vertex D to A) |

## Pair Index Reference

| Index | Pair | Sides |
|-------|------|-------|
| `0` | AB/CD | Side 0 (AB) and Side 2 (CD) |
| `1` | BC/DA | Side 1 (BC) and Side 3 (DA) |

## Animation Sequence Steps

The component follows this sequence:

### With Single Pair (no secondPair configured):

1. **Step 0**: Initialization (wait `initialDelay` ms)
2. **Step 1**: Display `firstPair.initialMessage` (duration: `messageDuration` ms)
3. **Step 2**: Highlight first pair sides in `highlightColor`, make them blink (duration: `sideHighlightDuration` ms)
4. **Step 3**: Start parallel lines animation for first pair (`parallelAnimationCycles` cycles)
5. **Step 4**: Show `firstPair.provenMessage` (triggered by animation callback)
6. **Step 5**: Add chevron symbols to first pair (after `symbolDelay` ms)
7. **Conclusion**: Show `conclusionMessage` and dispatch `completionEventName` event (after `conclusionDelay` ms)

### With Two Pairs (secondPair configured):

1. **Step 0**: Initialization (wait `initialDelay` ms)
2. **Step 1**: Display `firstPair.initialMessage` (duration: `messageDuration` ms)
3. **Step 2**: Highlight first pair sides, make them blink (duration: `sideHighlightDuration` ms)
4. **Step 3**: Start parallel lines animation for first pair
5. **Step 4**: Show `firstPair.provenMessage`
6. **Step 5**: Add chevron symbols to first pair (after `symbolDelay` ms)
7. **Step 6**: Wait before second pair (duration: `waitBetweenPairs` ms)
8. **Step 7**: Display `secondPair.initialMessage` and highlight second pair sides, make them blink
9. **Step 8**: Start parallel lines animation for second pair
10. **Step 9**: Show `secondPair.provenMessage`
11. **Step 10**: Add chevron symbols to second pair (after `symbolDelay` ms)
12. **Conclusion**: Show `conclusionMessage` and dispatch `completionEventName` event (after `conclusionDelay` ms)

## Usage Examples

### Example 1: Page 3 - Two Pairs (Full Sequence)

```javascript
{
  id: "page3-animation-sequence",
  name: "animation-sequence",
  type: "custom",
  coordinates: [0, 0, 1600, 900],
  zIndex: 2000,
  props: {
    componentType: "QuadAnimationSequenceComponent",
    sequenceConfig: {
      quadComponentId: "page3-shape-display",
      messageBoxId: "page3-messagebox",
      initialDelay: 500,
      completionEventName: "page3AnimationComplete",
      
      firstPair: {
        side1Index: 0,        // AB
        side2Index: 2,        // CD
        pairIndex: 0,         // AB/CD pair
        pairName: "AB-CD",
        highlightColor: "#00FF00",  // Green
        chevronColor: "white",
        doubleChevron: false,
        initialMessage: "Opposite sides are parallel because they maintain the same distance between them.",
        provenMessage: "AB and CD are parallel to each other"
      },
      
      secondPair: {
        side1Index: 1,        // BC
        side2Index: 3,        // DA
        pairIndex: 1,         // BC/DA pair
        pairName: "BC-DA",
        highlightColor: "#FF6600",  // Orange
        chevronColor: "white",
        doubleChevron: true,
        initialMessage: "Opposite sides are parallel because they maintain the same distance between them.",
        provenMessage: "BC and DA are parallel to each other"
      },
      
      timing: {
        messageDuration: 1000,
        sideHighlightDuration: 1000,
        parallelAnimationCycles: 2,
        symbolDelay: 500,
        waitBetweenPairs: 1000,
        conclusionDelay: 1000
      },
      
      conclusionMessage: "Two pairs of opposite sides are parallel"
    }
  }
}
```

### Example 2: Page 4 - Single Pair Only

```javascript
{
  id: "page4-animation-sequence",
  name: "animation-sequence",
  type: "custom",
  coordinates: [0, 0, 1600, 900],
  zIndex: 2000,
  props: {
    componentType: "QuadAnimationSequenceComponent",
    sequenceConfig: {
      quadComponentId: "page4-shape-display",
      messageBoxId: "page4-messagebox",
      initialDelay: 300,
      completionEventName: "page4AnimationComplete",
      
      firstPair: {
        side1Index: 0,        // AB
        side2Index: 2,        // CD
        pairIndex: 0,
        pairName: "AB-CD",
        highlightColor: "#FF0000",  // Red
        chevronColor: "#CC0000",    // Dark red
        doubleChevron: false,
        initialMessage: "Let's prove that AB is parallel to CD.",
        provenMessage: "AB is parallel to CD!"
      },
      
      // No secondPair - only first pair will be animated
      
      timing: {
        messageDuration: 1500,
        sideHighlightDuration: 800,
        parallelAnimationCycles: 3,
        symbolDelay: 300,
        conclusionDelay: 500
      },
      
      conclusionMessage: "The opposite sides are parallel."
    }
  }
}
```

### Example 3: Custom Colors and Messages

```javascript
{
  componentType: "QuadAnimationSequenceComponent",
  sequenceConfig: {
    quadComponentId: "my-quad",
    messageBoxId: "my-messagebox",
    initialDelay: 1000,
    completionEventName: "myAnimationComplete",
    
    firstPair: {
      side1Index: 1,          // BC
      side2Index: 3,          // DA
      pairIndex: 1,           // BC/DA pair
      pairName: "BC-DA",
      highlightColor: "#9B59B6",    // Purple
      chevronColor: "#6C3483",      // Dark purple
      doubleChevron: true,
      initialMessage: "<strong>Step 1:</strong> Observe sides BC and DA.",
      provenMessage: "<em>BC and DA are parallel!</em>"
    },
    
    timing: {
      messageDuration: 2000,
      sideHighlightDuration: 1500,
      parallelAnimationCycles: 1,
      symbolDelay: 1000,
      conclusionDelay: 2000
    },
    
    conclusionMessage: "Animation complete!"
  }
}
```

## Event Handling

### Listening for Completion Event

The component dispatches a custom event when the animation sequence completes:

```javascript
// Listen for completion event
window.addEventListener('page3AnimationComplete', (event) => {
  console.log('Animation sequence completed!', event.detail);
  // event.detail.completed === true
  
  // Enable buttons, show next step, etc.
  enableNextButton();
  showNextInstruction();
});
```

### Integration with Next Button

You can use the completion event to enable UI elements:

```javascript
// In your button component or interaction component
window.addEventListener('page3AnimationComplete', () => {
  setEnabled(true);  // Enable the next button
  setVisible(true);  // Show the tap animation
});
```

## Advanced Usage

### HTML Messages

Messages support HTML content:

```javascript
firstPair: {
  // ...
  initialMessage: "Opposite sides are <strong>parallel</strong> because they maintain the same <em>distance</em>.",
  provenMessage: "AB and CD are <span style='color: #00FF00;'>parallel</span> to each other"
}
```

### Conditional Second Pair

You can conditionally include the second pair:

```javascript
sequenceConfig: {
  // ... other config
  firstPair: { /* ... */ },
  
  // Only include secondPair if needed
  ...(shouldShowSecondPair && {
    secondPair: { /* ... */ }
  })
}
```

### Dynamic Configuration

You can build the configuration dynamically:

```javascript
const buildSequenceConfig = (pageNumber) => {
  return {
    quadComponentId: `page${pageNumber}-shape-display`,
    messageBoxId: `page${pageNumber}-messagebox`,
    completionEventName: `page${pageNumber}AnimationComplete`,
    // ... rest of config
  };
};

// Usage
{
  componentType: "QuadAnimationSequenceComponent",
  sequenceConfig: buildSequenceConfig(3)
}
```

## Troubleshooting

### Component Not Starting

- **Check**: Is `quadrilateral-animations.js` loaded before this component?
- **Check**: Do the `quadComponentId` and `messageBoxId` exist in the DOM?
- **Check**: Are all required config properties provided?

### Animation Not Working

- **Check**: Is the quadrilateral component properly initialized?
- **Check**: Does the `pairIndex` match the actual parallel pair?
- **Check**: Are the side indices correct (0=AB, 1=BC, 2=CD, 3=DA)?

### Messages Not Showing

- **Check**: Does the messagebox component exist?
- **Check**: Is the `messageBoxId` correct?
- **Check**: Check browser console for warnings

### Symbols Not Appearing

- **Check**: Are the chevron colors visible against the background?
- **Check**: Is `doubleChevron` set correctly?
- **Check**: Check browser console for errors from `QuadrilateralAnimations.addParallelArrows`

## Best Practices

1. **Always provide `completionEventName`** to enable integration with other components
2. **Use descriptive `pairName`** values for easier debugging
3. **Test timing values** to ensure smooth animation flow
4. **Use HTML in messages sparingly** - keep it simple for readability
5. **Validate component IDs** exist before the animation starts
6. **Use consistent color schemes** across pairs for better UX

## Dependencies

- `quadrilateral-animations.js` - Required for animation utilities
- `quadrilateral-component.js` - Required for the quadrilateral component
- React - Required for component rendering

## Browser Support

- Modern browsers with ES6+ support
- Requires `CustomEvent` API support
- Requires `requestAnimationFrame` for animations

## See Also

- `quadrilateral-animations.js` - General animation utilities
- `quadrilateral-component.js` - Quadrilateral rendering component
- `elements-registry.js` - Component registration

