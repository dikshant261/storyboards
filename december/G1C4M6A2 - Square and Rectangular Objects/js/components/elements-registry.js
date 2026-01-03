/**
 * Elements Registry - Simplified Component Aggregation
 * 
 * This file replaces elements.js and elementsUtils.js with a much simpler approach.
 * It aggregates all components into the StandardElements object that the rest of the app expects.
 */

// Dependencies: All component files should be loaded before this file

console.log('🔄 Aggregating components into StandardElements...');

// Debug: Check what components are available
console.log('🔍 Available components:', {
  SharedUtilities: !!window.SharedUtilities,
  LayoutComponents: !!window.LayoutComponents,
  InteractionComponents: !!window.InteractionComponents,
  ProgressComponents: !!window.ProgressComponents,
  PartitionedRectangleComponent: !!window.PartitionedRectangleComponent,
  NumberPadComponent: !!window.NumberPadComponent,
  FeedbackTextboxComponent: !!window.FeedbackTextboxComponent,
  DragDropGameComponent: !!window.DragDropGameComponent
});

// Import all component configurations
const layoutElements = window.LayoutComponents?.LayoutElements || {};
const interactionElements = window.InteractionComponents?.InteractionElements || {};
const progressElements = window.ProgressComponents?.ProgressElements || {};
const partitionedRectangleElement = window.PartitionedRectangleComponent?.PartitionedRectangleElement || {};
const numberPadElement = window.NumberPadComponent?.NumberPadElement || {};
const feedbackTextboxElement = window.FeedbackTextboxComponent?.FeedbackTextboxElement || {};
const dragDropElement = window.DragDropGameComponent?.DragDropElement || {};

// Create the StandardElements object that the rest of the app expects
const StandardElements = {
  // Layout elements
  ...layoutElements,
  
  // Interaction elements  
  ...interactionElements,
  
  // Progress elements
  ...progressElements,
  
  // Complex elements
  ...partitionedRectangleElement,
  ...numberPadElement,
  
  // Feedback elements
  ...feedbackTextboxElement,
  
  // Drag and Drop elements
  ...dragDropElement
};

// Export StandardElements globally (this is what gridpositions.js and other files expect)
window.StandardElements = StandardElements;
window.StandardElementsReact18 = StandardElements; // React 18 version

// Export context utilities from shared utilities
window.ElementProvider = window.SharedUtilities?.ElementProvider;
window.useElements = window.SharedUtilities?.useElements;
window.ElementLoadingFallback = window.SharedUtilities?.ElementLoadingFallback;

console.log('✅ StandardElements created with keys:', Object.keys(StandardElements));

// Create simplified ElementsUtils with only the functions that are actually used
const ElementsUtils = {
  // Table element creator (used by math-applet.js)
  createTableElement: (currentPage) => {
    return React.createElement('div', {
      className: 'table-element-container',
      'data-element-type': 'table',
      'data-page': currentPage
    }, 'Table content will be rendered here');
  },
  
  // Partitioned rectangle element creator (used by math-applet.js)
  createPartitionedRectangleElement: (currentPage, elementName, coordinates, elementProps, zIndex) => {
    const PartitionedRectangleComponent = window.PartitionedRectangleComponent?.PartitionedRectangleComponent;
    if (PartitionedRectangleComponent) {
      return React.createElement(PartitionedRectangleComponent, {
        currentPage,
        elementName,
        coordinates,
        elementProps,
        zIndex
      });
    }
    return React.createElement('div', {
      className: 'partitioned-rectangle-container',
      'data-element-type': 'partitioned-rectangle'
    }, 'Partitioned rectangle content');
  },
  
  // Number pad panel element creator (used by math-applet.js)
  createNumberPadPanelElement: (props) => {
    const NumberPadPanelComponent = window.NumberPadComponent?.NumberPadPanelComponent;
    if (NumberPadPanelComponent) {
      return React.createElement(NumberPadPanelComponent, props);
    }
    return React.createElement('div', {
      className: 'number-pad-panel-container',
      'data-element-type': 'number-pad-panel'
    }, 'Number pad content');
  }
};

// Export ElementsUtils globally (this is what math-applet.js expects)
window.ElementsUtils = ElementsUtils;
window.ElementsUtilsReact18 = ElementsUtils;

console.log('✅ ElementsUtils created with keys:', Object.keys(ElementsUtils));
console.log('✅ Elements registry loaded successfully');
console.log('📊 StandardElements contains:', Object.keys(StandardElements));
console.log('🔧 ElementsUtils contains:', Object.keys(ElementsUtils));
