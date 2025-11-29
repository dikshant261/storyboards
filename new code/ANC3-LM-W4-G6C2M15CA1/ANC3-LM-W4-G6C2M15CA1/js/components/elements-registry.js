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
  TableGridComponent: !!window.TableGridComponent,
  FillBlanksComponent: !!window.FillBlanksComponent,
  FeedbackTextboxComponent: !!window.FeedbackTextboxComponent
});

// Import all component configurations
const layoutElements = window.LayoutComponents?.LayoutElements || {};
const interactionElements = window.InteractionComponents?.InteractionElements || {};
const progressElements = window.ProgressComponents?.ProgressElements || {};
const partitionedRectangleElement = window.PartitionedRectangleComponent?.PartitionedRectangleElement || {};
const numberPadElement = window.NumberPadComponent?.NumberPadElement || {};
const tableGridElement = window.TableGridComponent?.TableGridElement || {};
const fillBlanksElement = window.FillBlanksComponent?.FillBlanksElement || {};
const feedbackTextboxElement = window.FeedbackTextboxComponent?.FeedbackTextboxElement || {};

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
  ...tableGridElement,
  ...fillBlanksElement,
  ...feedbackTextboxElement
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
  },
  
  // Custom component creator (used for ProblemSolveHeaderComponent and other custom components)
  createCustomElement: (props) => {
    const { componentType, processedStyles, ...otherProps } = props;
    
    console.log('🔍 createCustomElement called with props:', props);
    console.log('🔍 createCustomElement componentType:', componentType);
    console.log('🔍 createCustomElement processedStyles:', processedStyles);
    console.log('🔍 createCustomElement otherProps:', otherProps);
    
    if (componentType === 'TableGridComponent') {
      console.log('🔍 createCustomElement: TableGridComponent detected!');
    }
    
    // Handle ProblemSolveHeaderComponent
    if (componentType === 'ProblemSolveHeaderComponent') {
      const ProblemSolveHeaderComponent = window.LayoutComponents?.ProblemSolveHeaderComponent;
      if (ProblemSolveHeaderComponent) {
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating ProblemSolveHeaderComponent with mergedProps:', mergedProps);
        return React.createElement(ProblemSolveHeaderComponent, mergedProps);
      }
    }
    
    // Handle QuestionComponent
    if (componentType === 'QuestionComponent') {
      console.log('🔍 createCustomElement: Found QuestionComponent!');
      const QuestionComponent = window.LayoutComponents?.QuestionComponent;
      if (QuestionComponent) {
        console.log('🔍 createCustomElement: QuestionComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating QuestionComponent with mergedProps:', mergedProps);
        return React.createElement(QuestionComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: QuestionComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle InformationAnalysisComponent
    if (componentType === 'InformationAnalysisComponent') {
      console.log('🔍 createCustomElement: Found InformationAnalysisComponent!');
      const InformationAnalysisComponent = window.LayoutComponents?.InformationAnalysisComponent;
      if (InformationAnalysisComponent) {
        console.log('🔍 createCustomElement: InformationAnalysisComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating InformationAnalysisComponent with mergedProps:', mergedProps);
        return React.createElement(InformationAnalysisComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: InformationAnalysisComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle ConceptSummaryComponent
    if (componentType === 'ConceptSummaryComponent') {
      console.log('🔍 createCustomElement: Found ConceptSummaryComponent!');
      const ConceptSummaryComponent = window.LayoutComponents?.ConceptSummaryComponent;
      if (ConceptSummaryComponent) {
        console.log('🔍 createCustomElement: ConceptSummaryComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating ConceptSummaryComponent with mergedProps:', mergedProps);
        return React.createElement(ConceptSummaryComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: ConceptSummaryComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle TeacherNoteComponent
    if (componentType === 'TeacherNoteComponent') {
      console.log('🔍 createCustomElement: Found TeacherNoteComponent!');
      const TeacherNoteComponent = window.LayoutComponents?.TeacherNoteComponent;
      if (TeacherNoteComponent) {
        console.log('🔍 createCustomElement: TeacherNoteComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating TeacherNoteComponent with mergedProps:', mergedProps);
        return React.createElement(TeacherNoteComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: TeacherNoteComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle SectionHeaderComponent
    if (componentType === 'SectionHeaderComponent') {
      console.log('🔍 createCustomElement: Found SectionHeaderComponent!');
      const SectionHeaderComponent = window.LayoutComponents?.SectionHeaderComponent;
      if (SectionHeaderComponent) {
        console.log('🔍 createCustomElement: SectionHeaderComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating SectionHeaderComponent with mergedProps:', mergedProps);
        return React.createElement(SectionHeaderComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: SectionHeaderComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle QuizPanelComponent
    if (componentType === 'QuizPanelComponent') {
      console.log('🔍 createCustomElement: Found QuizPanelComponent!');
      console.log('🔍 createCustomElement: otherProps:', otherProps);
      console.log('🔍 createCustomElement: otherProps.options:', otherProps.options);
      const QuizPanelComponent = window.LayoutComponents?.QuizPanelComponent;
      if (QuizPanelComponent) {
        console.log('🔍 createCustomElement: QuizPanelComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating QuizPanelComponent with mergedProps:', mergedProps);
        console.log('🔍 createCustomElement mergedProps.options:', mergedProps.options);
        return React.createElement(QuizPanelComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: QuizPanelComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle CalculationsDetailComponent
    if (componentType === 'CalculationsDetailComponent') {
      console.log('🔍 createCustomElement: Found CalculationsDetailComponent!');
      const CalculationsDetailComponent = window.LayoutComponents?.CalculationsDetailComponent;
      if (CalculationsDetailComponent) {
        console.log('🔍 createCustomElement: CalculationsDetailComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating CalculationsDetailComponent with mergedProps:', mergedProps);
        return React.createElement(CalculationsDetailComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: CalculationsDetailComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle ComputeBoxComponent
    if (componentType === 'ComputeBoxComponent') {
      console.log('🔍 createCustomElement: Found ComputeBoxComponent!');
      const ComputeBoxComponent = window.LayoutComponents?.ComputeBoxComponent;
      if (ComputeBoxComponent) {
        console.log('🔍 createCustomElement: ComputeBoxComponent exists in window.LayoutComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating ComputeBoxComponent with mergedProps:', mergedProps);
        return React.createElement(ComputeBoxComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: ComputeBoxComponent NOT found in window.LayoutComponents');
      }
    }
    
    // Handle TableGridComponent
    if (componentType === 'TableGridComponent') {
      console.log('🔍 createCustomElement: Found TableGridComponent!');
      console.log('🔍 createCustomElement: window.TableGridComponent:', window.TableGridComponent);
      const TableGridComponent = window.TableGridComponent?.TableGridComponent;
      if (TableGridComponent) {
        console.log('🔍 createCustomElement: TableGridComponent exists in window.TableGridComponent');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating TableGridComponent with mergedProps:', mergedProps);
        return React.createElement(TableGridComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: TableGridComponent NOT found in window.TableGridComponent');
        console.log('🔍 createCustomElement: Available window objects:', Object.keys(window).filter(key => key.includes('Table')));
      }
    }
    
    // Handle FillBlanksComponent
    if (componentType === 'FillBlanksComponent') {
      console.log('🔍 createCustomElement: Found FillBlanksComponent!');
      console.log('🔍 createCustomElement: window.FillBlanksComponent:', window.FillBlanksComponent);
      const FillBlanksComponent = window.FillBlanksComponent?.FillBlanksComponent;
      if (FillBlanksComponent) {
        console.log('🔍 createCustomElement: FillBlanksComponent exists in window.FillBlanksComponent');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating FillBlanksComponent with mergedProps:', mergedProps);
        return React.createElement(FillBlanksComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: FillBlanksComponent NOT found in window.FillBlanksComponent');
      }
    }
    
    // Handle TapGifComponent
    if (componentType === 'TapGifComponent') {
      console.log('🔍 createCustomElement: Found TapGifComponent!');
      const TapGifComponent = window.InteractionComponents?.TapGifComponent;
      if (TapGifComponent) {
        console.log('🔍 createCustomElement: TapGifComponent exists in window.InteractionComponents');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating TapGifComponent with mergedProps:', mergedProps);
        return React.createElement(TapGifComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: TapGifComponent NOT found in window.InteractionComponents');
      }
    }
    
    // Handle FeedbackTextboxComponent
    if (componentType === 'FeedbackTextboxComponent') {
      console.log('🔍 createCustomElement: Found FeedbackTextboxComponent!');
      console.log('🔍 createCustomElement: window.FeedbackTextboxComponent:', window.FeedbackTextboxComponent);
      const FeedbackTextboxComponent = window.FeedbackTextboxComponent?.FeedbackTextboxComponent;
      if (FeedbackTextboxComponent) {
        console.log('🔍 createCustomElement: FeedbackTextboxComponent exists in window.FeedbackTextboxComponent');
        // Merge processed styles with other props to ensure gc units are applied
        // Extract id from otherProps if it exists (from element.id)
        const elementId = otherProps.id || (typeof otherProps.elementId !== 'undefined' ? otherProps.elementId : null);
        const mergedProps = {
          ...otherProps,
          id: elementId, // Ensure id is passed
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating FeedbackTextboxComponent with mergedProps:', mergedProps);
        console.log('🔍 createCustomElement mergedProps.id:', mergedProps.id);
        return React.createElement(FeedbackTextboxComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: FeedbackTextboxComponent NOT found in window.FeedbackTextboxComponent');
      }
    }
    
    // Handle Times4TextboxComponent
    if (componentType === 'Times4TextboxComponent') {
      console.log('🔍 createCustomElement: Found Times4TextboxComponent!');
      const Times4TextboxComponent = window.FeedbackTextboxComponent?.Times4TextboxComponent;
      if (Times4TextboxComponent) {
        console.log('🔍 createCustomElement: Times4TextboxComponent exists');
        const elementId = otherProps.id || (typeof otherProps.elementId !== 'undefined' ? otherProps.elementId : null);
        const mergedProps = {
          ...otherProps,
          id: elementId,
          ...processedStyles,
          processedStyles: processedStyles
        };
        console.log('🔍 createCustomElement creating Times4TextboxComponent with mergedProps:', mergedProps);
        return React.createElement(Times4TextboxComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: Times4TextboxComponent NOT found');
      }
    }
    
    // Handle DragDropGame Component
    if (componentType === 'DragDropGame') {
      console.log('🔍 createCustomElement: Found DragDropGame!');
      console.log('🔍 createCustomElement: window.DragDropGameComponent:', window.DragDropGameComponent);
      const DragDropGame = window.DragDropGameComponent?.DragDropGame;
      if (DragDropGame) {
        console.log('🔍 createCustomElement: DragDropGame exists in window.DragDropGameComponent');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };
        
        console.log('🔍 createCustomElement creating DragDropGame with mergedProps:', mergedProps);
        return React.createElement(DragDropGame, mergedProps);
      } else {
        console.log('🔍 createCustomElement: DragDropGame NOT found in window.DragDropGameComponent');
      }
    }
    
    // Handle Draggable Component
    if (componentType === 'Draggable') {
      console.log('🔍 createCustomElement: Found Draggable!');
      const Draggable = window.DraggableComponent?.Draggable;
      if (Draggable) {
        console.log('🔍 createCustomElement: Draggable exists in window.DraggableComponent');
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          processedStyles: processedStyles
        };
        console.log('🔍 createCustomElement creating Draggable with mergedProps:', mergedProps);
        return React.createElement(Draggable, mergedProps);
      } else {
        console.log('🔍 createCustomElement: Draggable NOT found in window.DraggableComponent');
      }
    }
    
    // Fallback for unknown custom components
    return React.createElement('div', {
      className: 'custom-component-container',
      'data-element-type': 'custom',
      'data-component-type': componentType
    }, `Custom component: ${componentType}`);
  }
};

// Export ElementsUtils globally (this is what math-applet.js expects)
window.ElementsUtils = ElementsUtils;
window.ElementsUtilsReact18 = ElementsUtils;

console.log('✅ ElementsUtils created with keys:', Object.keys(ElementsUtils));
console.log('✅ Elements registry loaded successfully');
console.log('📊 StandardElements contains:', Object.keys(StandardElements));
console.log('🔧 ElementsUtils contains:', Object.keys(ElementsUtils));
