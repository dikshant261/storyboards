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
  FeedbackTextboxComponent: !!window.FeedbackTextboxComponent,
  TileComponent: !!window.TileComponent,
  HotspotComponent: !!window.HotspotComponent,
  LineComponent: !!window.LineComponent,
  QuadrilateralComponent: !!window.QuadrilateralComponent,
  ProtractorComponent: !!window.ProtractorComponent,
  RulerComponent: !!window.RulerComponent,
  ImageStackComponent: !!window.ImageStackComponent,

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
const tileElement = window.TileComponent?.TileElement || {};
const hotspotElement = window.HotspotComponent?.HotspotElement || {};
const lineElement = window.LineComponent?.LineElement || {};
const quadrilateralElement = window.QuadrilateralComponent?.QuadrilateralElement || {};
const protractorElement = window.ProtractorComponent?.ProtractorElement || {};
const rulerElement = window.RulerComponent?.RulerElement || {};
const imageStackElement = window.ImageStackComponent?.ImageStackElement || {};

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
  ...feedbackTextboxElement,
  ...tileElement,
  ...hotspotElement,
  ...lineElement,
  ...quadrilateralElement,
  ...protractorElement,
  ...rulerElement
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
    const { componentType, processedStyles, elementName, ...otherProps } = props;

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

    // Handle SolutionStepComponent
    if (componentType === 'SolutionStepComponent') {
      console.log('🔍 createCustomElement: Found SolutionStepComponent!');
      const SolutionStepComponent = window.SolutionStepComponent?.SolutionStepComponent;
      if (SolutionStepComponent) {
        console.log('🔍 createCustomElement: SolutionStepComponent exists in window.SolutionStepComponent');
        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles, // This contains the processed gc units like fontSize
          processedStyles: processedStyles // Also pass it separately for the component to use
        };

        console.log('🔍 createCustomElement creating SolutionStepComponent with mergedProps:', mergedProps);
        return React.createElement(SolutionStepComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: SolutionStepComponent NOT found in window.SolutionStepComponent');
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
          processedStyles: processedStyles, // Also pass it separately for the component to use
          elementName: elementName // Pass elementName for unique cell IDs
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

    // Handle HotspotComponent
    if (componentType === 'HotspotComponent') {
      console.log('🔍 createCustomElement: Found HotspotComponent!');
      console.log('🔍 createCustomElement: window.HotspotComponent:', window.HotspotComponent);
      const HotspotComponent = window.HotspotComponent?.HotspotComponent;
      if (HotspotComponent) {
        console.log('🔍 createCustomElement: HotspotComponent exists in window.HotspotComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating HotspotComponent with mergedProps:', mergedProps);
        return React.createElement(HotspotComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: HotspotComponent NOT found in window.HotspotComponent');
      }
    }

    // Handle TileComponent
    if (componentType === 'TileComponent') {
      console.log('🔍 createCustomElement: Found TileComponent!');
      console.log('🔍 createCustomElement: window.TileComponent:', window.TileComponent);
      const TileComponent = window.TileComponent?.TileComponent;
      if (TileComponent) {
        console.log('🔍 createCustomElement: TileComponent exists in window.TileComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating TileComponent with mergedProps:', mergedProps);
        return React.createElement(TileComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: TileComponent NOT found in window.TileComponent');
      }
    }

    // Handle LineComponent
    if (componentType === 'LineComponent') {
      console.log('🔍 createCustomElement: Found LineComponent!');
      console.log('🔍 createCustomElement: window.LineComponent:', window.LineComponent);
      const LineComponent = window.LineComponent?.LineComponent;
      if (LineComponent) {
        console.log('🔍 createCustomElement: LineComponent exists in window.LineComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating LineComponent with mergedProps:', mergedProps);
        return React.createElement(LineComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: LineComponent NOT found in window.LineComponent');
      }
    }

    // Handle NumberPadPanelComponent
    if (componentType === 'NumberPadPanelComponent') {
      console.log('🔍 createCustomElement: Found NumberPadPanelComponent!');
      console.log('🔍 createCustomElement: window.NumberPadComponent:', window.NumberPadComponent);
      const NumberPadPanelComponent = window.NumberPadComponent?.NumberPadPanelComponent;
      if (NumberPadPanelComponent) {
        console.log('🔍 createCustomElement: NumberPadPanelComponent exists in window.NumberPadComponent');

        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.name || otherProps.id || 'number-pad';

        // Extract elementProps (config) from otherProps, excluding position/processedStyles/componentType
        const { position, processedStyles, componentType, id, name, elementZIndex, ...elementProps } = otherProps;

        // Merge processed styles into elementProps for gc unit support
        const configWithStyles = {
          ...elementProps,
          ...processedStyles
        };

        const mergedProps = {
          currentPage,
          elementName,
          coordinates,
          elementProps: configWithStyles,
          zIndex: elementZIndex || 1000
        };

        console.log('🔍 createCustomElement creating NumberPadPanelComponent with mergedProps:', mergedProps);
        return React.createElement(NumberPadPanelComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: NumberPadPanelComponent NOT found in window.NumberPadComponent');
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

    // Handle QuadrilateralComponent
    if (componentType === 'QuadrilateralComponent') {
      // Get the component from the exported object
      const QuadrilateralComponent = window.QuadrilateralComponent?.QuadrilateralComponent;
      
      // If component exists, use it (React.createElement can handle React.memo components)
      if (QuadrilateralComponent) {
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page - check props first, then window function, then default to 1
        // Also try to extract from id (e.g., "page2-shape-display" -> 2)
        let currentPage = otherProps.currentPage;
        if (!currentPage && id) {
          const pageMatch = id.match(/page(\d+)/);
          if (pageMatch) {
            currentPage = parseInt(pageMatch[1], 10);
          }
        }
        if (!currentPage) {
          currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;
        }
        
        // Debug logging for page 2 components
        if (id && id.includes('page2')) {
          console.log(`🔍 [ElementsRegistry] QuadrilateralComponent currentPage:`, {
            id,
            currentPage,
            fromProps: otherProps.currentPage,
            fromId: id.match(/page(\d+)/)?.[1],
            fromWindow: typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 'not available'
          });
        }

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        return React.createElement(QuadrilateralComponent, mergedProps);
      } else {
        console.error('❌ createCustomElement: QuadrilateralComponent NOT found');
        console.error('❌ window.QuadrilateralComponent:', window.QuadrilateralComponent);
        return null; // Return null to prevent fallback warning
      }
    }

    // Handle PropertyShowcaseComponent
    if (componentType === 'PropertyShowcaseComponent') {
      console.log('🔍 createCustomElement: Found PropertyShowcaseComponent!');
      const PropertyShowcaseComponent = window.PropertyShowcaseComponent?.PropertyShowcaseComponent;
      if (PropertyShowcaseComponent) {
        console.log('🔍 createCustomElement: PropertyShowcaseComponent exists');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          processedStyles: processedStyles,
          position: otherProps.position,
          elementZIndex: zIndex,
          currentPage: currentPage,
          elementName: elementName
        };

        console.log('🔍 createCustomElement creating PropertyShowcaseComponent with mergedProps:', mergedProps);
        return React.createElement(PropertyShowcaseComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: PropertyShowcaseComponent NOT found');
      }
    }

    // Handle QuadAnimationSequenceComponent (generic, reusable)
    if (componentType === 'QuadAnimationSequenceComponent' || componentType === 'Page3AnimationSequenceComponent') {
      console.log('🔍 createCustomElement: Found QuadAnimationSequenceComponent!');
      const QuadAnimationSequenceComponent = window.QuadAnimationSequenceComponent?.QuadAnimationSequenceComponent;
      // Fallback to old name for backward compatibility
      const Page3AnimationSequenceComponent = window.Page3AnimationSequenceComponent?.Page3AnimationSequenceComponent;
      const Component = QuadAnimationSequenceComponent || Page3AnimationSequenceComponent;
      if (Component) {
        console.log('🔍 createCustomElement: QuadAnimationSequenceComponent exists');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          processedStyles: processedStyles,
          position: otherProps.position,
          elementZIndex: zIndex,
          currentPage: currentPage,
          elementName: elementName
        };

        console.log('🔍 createCustomElement creating QuadAnimationSequenceComponent with mergedProps:', mergedProps);
        return React.createElement(Component, mergedProps);
      } else {
        console.log('🔍 createCustomElement: QuadAnimationSequenceComponent NOT found');
      }
    }
    // Handle ImageStackComponent
    if (componentType === 'ImageStackComponent') {
      console.log('🔍 createCustomElement: Found ImageStackComponent!');
      console.log('🔍 createCustomElement: window.ImageStackComponent:', window.ImageStackComponent);
      const ImageStackComponent = window.ImageStackComponent?.ImageStackComponent;
      if (ImageStackComponent) {
        console.log('🔍 createCustomElement: ImageStackComponent exists in window.ImageStackComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating ImageStackComponent with mergedProps:', mergedProps);
        return React.createElement(ImageStackComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: ImageStackComponent NOT found in window.ImageStackComponent');
      }
    }
    // Handle ProtractorComponent
    if (componentType === 'ProtractorComponent') {
      console.log('🔍 createCustomElement: Found ProtractorComponent!');
      console.log('🔍 createCustomElement: window.ProtractorComponent:', window.ProtractorComponent);
      const ProtractorComponent = window.ProtractorComponent?.ProtractorComponent;
      if (ProtractorComponent) {
        console.log('🔍 createCustomElement: ProtractorComponent exists in window.ProtractorComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page - check props first, then extract from id, then window function, then default to 1
        let currentPage = otherProps.currentPage;
        if (!currentPage && id) {
          const pageMatch = id.match(/page(\d+)/);
          if (pageMatch) {
            currentPage = parseInt(pageMatch[1], 10);
          }
        }
        if (!currentPage) {
          currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;
        }
        
        // Debug logging for page 2 components
        if (id && id.includes('page2')) {
          console.log(`🔍 [ElementsRegistry] ProtractorComponent currentPage:`, {
            id,
            currentPage,
            fromProps: otherProps.currentPage,
            fromId: id.match(/page(\d+)/)?.[1],
            fromWindow: typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 'not available'
          });
        }

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating ProtractorComponent with mergedProps:', mergedProps);
        return React.createElement(ProtractorComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: ProtractorComponent NOT found in window.ProtractorComponent');
      }
    }

    // Handle RulerComponent
    if (componentType === 'RulerComponent') {
      console.log('🔍 createCustomElement: Found RulerComponent!');
      console.log('🔍 createCustomElement: window.RulerComponent:', window.RulerComponent);
      const RulerComponent = window.RulerComponent?.RulerComponent;
      if (RulerComponent) {
        console.log('🔍 createCustomElement: RulerComponent exists in window.RulerComponent');
        // Extract coordinates from position object (passed from ElementRenderer)
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props to ensure gc units are applied
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating RulerComponent with mergedProps:', mergedProps);
        return React.createElement(RulerComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: RulerComponent NOT found in window.RulerComponent');
      }
    }

    // Handle ShapeSelectorComponent
    if (componentType === 'ShapeSelectorComponent') {
      console.log('🔍 createCustomElement: Found ShapeSelectorComponent!');
      const ShapeSelectorComponent = window.ShapeSelectorComponent?.ShapeSelectorComponent;
      if (ShapeSelectorComponent) {
        console.log('🔍 createCustomElement: ShapeSelectorComponent exists');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating ShapeSelectorComponent with mergedProps:', mergedProps);
        return React.createElement(ShapeSelectorComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: ShapeSelectorComponent NOT found');
      }
    }

    // Handle AnimationControlsComponent
    if (componentType === 'AnimationControlsComponent') {
      console.log('🔍 createCustomElement: Found AnimationControlsComponent!');
      const AnimationControlsComponent = window.AnimationControlsComponent?.AnimationControlsComponent;
      if (AnimationControlsComponent) {
        console.log('🔍 createCustomElement: AnimationControlsComponent exists');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating AnimationControlsComponent with mergedProps:', mergedProps);
        return React.createElement(AnimationControlsComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: AnimationControlsComponent NOT found');
      }
    }

    // Handle DisplayControlsComponent
    if (componentType === 'DisplayControlsComponent') {
      console.log('🔍 createCustomElement: Found DisplayControlsComponent!');
      const DisplayControlsComponent = window.DisplayControlsComponent?.DisplayControlsComponent;
      if (DisplayControlsComponent) {
        console.log('🔍 createCustomElement: DisplayControlsComponent exists');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        console.log('🔍 createCustomElement creating DisplayControlsComponent with mergedProps:', mergedProps);
        return React.createElement(DisplayControlsComponent, mergedProps);
      } else {
        console.log('🔍 createCustomElement: DisplayControlsComponent NOT found');
      }
    }

    // Handle AnimatedDotComponent
    if (componentType === 'AnimatedDotComponent') {
      console.log('🔍 createCustomElement: Found AnimatedDotComponent!');
      console.log('🔍 createCustomElement: window.AnimatedDotComponent:', window.AnimatedDotComponent);
      const AnimatedDotComponent = window.AnimatedDotComponent?.AnimatedDotComponent;
      console.log('🔍 createCustomElement: AnimatedDotComponent extracted:', AnimatedDotComponent);
      if (AnimatedDotComponent) {
        console.log('🔍 createCustomElement: AnimatedDotComponent exists, creating element');
        // Extract coordinates from position object
        const coordinates = otherProps.position?.coordinates;
        const id = otherProps.id;
        const zIndex = otherProps.zIndex || otherProps.elementZIndex;

        // Get current page - check props first, then extract from id, then window function, then default to 1
        let currentPage = otherProps.currentPage;
        if (!currentPage && id) {
          const pageMatch = id.match(/page(\d+)/);
          if (pageMatch) {
            currentPage = parseInt(pageMatch[1], 10);
          }
        }
        if (!currentPage) {
          currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 1;
        }
        
        // Debug logging for page 2 components
        if (id && id.includes('page2')) {
          console.log(`🔍 [ElementsRegistry] AnimatedDotComponent currentPage:`, {
            id,
            currentPage,
            fromProps: otherProps.currentPage,
            fromId: id.match(/page(\d+)/)?.[1],
            fromWindow: typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : 'not available'
          });
        }

        // Get element name from id or name prop
        const elementName = otherProps.elementName || otherProps.name || id;

        // Merge processed styles with other props
        const mergedProps = {
          ...otherProps,
          ...processedStyles,
          currentPage: currentPage,
          elementName: elementName,
          coordinates: coordinates,
          zIndex: zIndex
        };
        return React.createElement(AnimatedDotComponent, mergedProps);
      } else {
        console.warn('🔍 createCustomElement: AnimatedDotComponent NOT found in window.AnimatedDotComponent');
        console.warn('🔍 createCustomElement: window.AnimatedDotComponent value:', window.AnimatedDotComponent);
      }
    }

    // Fallback for unknown custom components
    // Return null instead of displaying a message to avoid showing error text on screen
    console.warn(`⚠️ Custom component not found: ${componentType}`);
    console.warn(`⚠️ Available window components:`, {
      AnimatedDotComponent: window.AnimatedDotComponent,
      SolutionStepComponent: window.SolutionStepComponent,
      QuadrilateralComponent: window.QuadrilateralComponent,
      AngleMarkerComponent: window.AngleMarkerComponent
    });
    return null;
  }
};

// Export ElementsUtils globally (this is what math-applet.js expects)
window.ElementsUtils = ElementsUtils;
window.ElementsUtilsReact18 = ElementsUtils;

console.log('✅ ElementsUtils created with keys:', Object.keys(ElementsUtils));
console.log('✅ Elements registry loaded successfully');
console.log('📊 StandardElements contains:', Object.keys(StandardElements));
console.log('🔧 ElementsUtils contains:', Object.keys(ElementsUtils));
