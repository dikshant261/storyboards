/**
 * Page Configuration
 *
 * - Grid positioning and element generation
 * - Page-specific UI element configurations
 * - Question-dependent element updates
 */

// ===== PAGE CONFIGURATION =====
// Page configuration with grid positioning and element generation

// ===== PAGE NAVIGATION CONFIGURATION =====
/**
 * Page Navigation Configuration
 * Maps each page number to its previous and next page numbers
 * - prev: previous page number (null for first page)
 * - next: next page number (null for last page)
 */
const pageNavigation = {
  1: { prev: null, next: 2 },
  2: { prev: 1, next: 3 },
  3: { prev: 2, next: 4 },
  4: { prev: 3, next: 5 },
  5: { prev: 4, next: 6 },
  6: { prev: 5, next: 7 },
  7: { prev: 6, next: 8 },
  8: { prev: 7, next: 9 },
  9: { prev: 8, next: 10 },
  10: { prev: 9, next: 11 },
  11: { prev: 10, next: 12 },
  12: { prev: 11, next: 13 },
  13: { prev: 12, next: null },
};

/**
 * Get all page numbers in navigation order
 * @returns {number[]} Array of page numbers in order
 */
const getPageNumbers = () => {
  const pages = [];
  let currentPage = 1;

  // Find the first page (where prev is null)
  while (currentPage && pageNavigation[currentPage]) {
    pages.push(currentPage);
    currentPage = pageNavigation[currentPage].next;
  }

  return pages;
};

/**
 * Get shape configuration from constants.js
 * Returns the shape object with quadType, vertices, gridRows, and gridCols
 * Falls back to default parallelogram if window.shape is not available
 * @param {string} [shapeType] - Optional shape type to select (e.g., "PARALLELOGRAM", "SQUARE")
 * @returns {Object} Shape configuration object
 */
const getShapeConfig = (shapeType = null) => {
  if (typeof window !== 'undefined' && window.shape) {
    // Handle array format (new format)
    if (Array.isArray(window.shape)) {
      let selectedShape = null;
      
      // If shapeType is provided, find matching shape
      if (shapeType) {
        selectedShape = window.shape.find(
          s => s.quadType === shapeType || s.type === shapeType.toLowerCase()
        );
      }
      
      // If no match found or no shapeType provided, use first shape
      if (!selectedShape && window.shape.length > 0) {
        selectedShape = window.shape[0];
      }
      
      if (selectedShape) {
        return {
          quadType: selectedShape.quadType || "PARALLELOGRAM",
          vertices: selectedShape.vertices || [
            { row: 2, col: 2 },
            { row: 2, col: 8 },
            { row: 7, col: 9 },
            { row: 7, col: 3 }
          ],
          gridRows: selectedShape.gridRows || 10,
          gridCols: selectedShape.gridCols || 10
        };
      }
    }
    // Handle object format (backward compatibility)
    else if (typeof window.shape === 'object') {
      return {
        quadType: window.shape.quadType || "PARALLELOGRAM",
        vertices: window.shape.vertices || [
          { row: 2, col: 2 },
          { row: 2, col: 8 },
          { row: 7, col: 9 },
          { row: 7, col: 3 }
        ],
        gridRows: window.shape.gridRows || 10,
        gridCols: window.shape.gridCols || 10
      };
    }
  }
  // Fallback to default parallelogram
  return {
    quadType: "PARALLELOGRAM",
    vertices: [
      { row: 2, col: 2 },
      { row: 2, col: 8 },
      { row: 7, col: 9 },
      { row: 7, col: 3 }
    ],
    gridRows: 10,
    gridCols: 10
  };
};

/**
 * Calculate total number of pages from pageNavigation
 * @returns {number} Total number of pages
 */
const getTotalPages = () => {
  return getPageNumbers().length;
};

/**
 * Get page number from dot position (1-based)
 * @param {number} dotPosition - Dot position (1 to totalPages)
 * @returns {number} Actual page number
 */
const getPageFromDotPosition = (dotPosition) => {
  const pages = getPageNumbers();
  return pages[dotPosition - 1] || pages[0];
};

/**
 * Get dot position from page number (1-based)
 * @param {number} pageNumber - Actual page number
 * @returns {number} Dot position (1 to totalPages)
 */
const getDotPositionFromPage = (pageNumber) => {
  const pages = getPageNumbers();
  const index = pages.indexOf(pageNumber);
  return index >= 0 ? index + 1 : 1;
};

// ===== PAGE 2 PROTRACTOR FLOW CONFIGURATION =====
/**
 * Page 2 Protractor Flow Configuration
 * Centralized configuration for all state-dependent behaviors on page 2
 * 
 * This config controls:
 * - Instruction text
 * - Vertex/side animations (blinking)
 * - Protractor behaviors (draggability, rotatability, etc.)
 * - Measurement arm behaviors
 * - Animated dot visibility
 * - Solution steps highlighting
 * - Measurement text display
 * 
 * States: C, B, A (which vertex to measure)
 * Steps: 1, 2, 3, 4 (progression within each state)
 */
const page2ProtractorFlowConfig = {
  version: "1.2",
  
  // Side indices mapping: A-B = 0, B-C = 1, C-A = 2
  sideIndices: {
    "AB": 0,
    "BA": 0,
    "BC": 1,
    "CB": 1,
    "CA": 2,
    "AC": 2
  },
  
  // Vertex indices mapping: A = 0, B = 1, C = 2
  vertexIndices: {
    "A": 0,
    "B": 1,
    "C": 2
  },
  
  states: {
    // ==================== STATE C ====================
    "C": {
      pageState: "C",
      targetVertex: "C",
      targetVertexIndex: 2,
      baselineSide: "BC",      // Side to align baseline with
      measurementSide: "AC",   // Side to align measurement arm with
      correctAngle: 60,        // Correct angle value
      correctReadingIndex: 1,  // Which reading is correct (0 or 1)
      nextState: "B",          // State to transition to after completion
      // Baseline orientation configuration: defines two possible orientations (0 and 1) for each side
      baselineOrientations: {
        "BC": {
          // Orientation 0: baseline pointing from B to C (or C to B) with top facing top
          // Orientation 1: baseline pointing opposite direction with top facing top
          requiredOrientation: 0,  // Which orientation (0 or 1) is required for snapping
          // Orientation 0 = baseline horizontal (0° or 180°) with top facing top
          // Orientation 1 = baseline horizontal (0° or 180°) with top facing top (opposite direction)
        }
      },
      
      steps: {
        1: {
          instructionText: "Drag the protractor to vertex C to measure ∠ACB",
          vertexBlinking: "C",
          sideBlinking: null,
          centerMarkerBlinking: true,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: true,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: "C",
          animatedDotVisible: true,
          currentStep: 1,
          measurementText: null  // No change
        },
        2: {
          instructionText: "Align the protractor baseline with side BC",
          vertexBlinking: null,
          sideBlinking: "BC",
          centerMarkerBlinking: false,
          baselineVisible: true,
          baselineColor: "orange",  // Turns green when snapped
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: true,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 2,
          measurementText: null  // No change
        },
        3: {
          instructionText: "Align the measurement arm (blinking) with side AC",
          vertexBlinking: null,
          sideBlinking: "AC",
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: true,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: true,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 3,
          measurementText: null  // No change
        },
        4: {
          instructionText: "Click on the correct angle measurement in the protractor",
          vertexBlinking: null,
          sideBlinking: null,
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: true,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 3,  // Keep showing step 3 in the steps panel
          measurementText: "∠ACB = 70°",
          // Reading selection behavior
          readingSelection: {
            correctIndex: 1,  // Reading index 1 (70°) is correct
            incorrectIndex: 0,
            correctColor: "#00FF00",
            incorrectColor: "#FF0000"
          }
        }
      },
      
      // State transitions
      transitions: {
        "1to2": { trigger: "protractorSnapsToVertex", targetVertex: "C" },
        "2to3": { trigger: "baselineSnapsToSide", targetSide: "BC" },
        "3to4": { trigger: "measurementArmSnapsToSide", targetSide: "AC" },
        "complete": { trigger: "correctReadingClicked", nextState: "B", nextStep: 1 }
      }
    },
    
    // ==================== STATE B ====================
    "B": {
      pageState: "B",
      targetVertex: "B",
      targetVertexIndex: 1,
      baselineSide: "BC",      // Side to align baseline with
      measurementSide: "AB",   // Side to align measurement arm with
      correctAngle: 60,
      correctReadingIndex: 0,  // Reading index 0 (60°) is correct for state B
      nextState: "A",
      // Baseline orientation configuration
      baselineOrientations: {
        "BC": {
          requiredOrientation: 0,  // Baseline horizontal with top facing top
        }
      },
      
      steps: {
        1: {
          instructionText: "Drag the protractor to vertex B to measure ∠ABC",
          vertexBlinking: "B",
          sideBlinking: null,
          centerMarkerBlinking: true,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: true,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: "B",
          animatedDotVisible: true,
          currentStep: 1,
          measurementText: null
        },
        2: {
          instructionText: "Align the protractor baseline with side BC",
          vertexBlinking: null,
          sideBlinking: "BC",
          centerMarkerBlinking: false,
          baselineVisible: true,
          baselineColor: "orange",
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: true,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 2,
          measurementText: null
        },
        3: {
          instructionText: "Align the measurement arm (blinking) with side AB",
          vertexBlinking: null,
          sideBlinking: "AB",
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: true,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: true,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 3,
          measurementText: null
        },
        4: {
          instructionText: "Click on the correct angle measurement in the protractor",
          vertexBlinking: null,
          sideBlinking: null,
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: true,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 3,
          measurementText: "∠ACB = 70°<br>∠ABC = 60°",
          readingSelection: {
            correctIndex: 0,  // Reading index 0 (60°) is correct for B
            incorrectIndex: 1,
            correctColor: "#00FF00",
            incorrectColor: "#FF0000"
          }
        }
      },
      
      transitions: {
        "1to2": { trigger: "protractorSnapsToVertex", targetVertex: "B" },
        "2to3": { trigger: "baselineSnapsToSide", targetSide: "BC" },
        "3to4": { trigger: "measurementArmSnapsToSide", targetSide: "AB" },
        "complete": { trigger: "correctReadingClicked", nextState: "A", nextStep: 1 }
      }
    },
    
    // ==================== STATE A ====================
    "A": {
      pageState: "A",
      targetVertex: "A",
      targetVertexIndex: 0,
      baselineSide: "AB",  // Align baseline with AB
      measurementSide: "AC",  // Always measure to AC
      correctAngle: 60,
      correctReadingIndex: 0,  // Fixed reading index for AC baseline
      nextState: "complete",
      
      // Baseline orientation configuration
      baselineOrientations: {
        "AB": {
          // Orientation 0: arc on left (top facing left edge)
          // Orientation 1: arc on right (top facing right edge)
          requiredOrientation: 1,  // AB requires orientation 1 (arc on right)
        }
      },
      
      steps: {
        1: {
          instructionText: "Drag the protractor to vertex A to measure ∠BAC",
          vertexBlinking: "A",
          sideBlinking: null,
          centerMarkerBlinking: true,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: true,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: "A",
          animatedDotVisible: true,
          currentStep: 1,
          measurementText: null
        },
        2: {
          instructionText: "Align the protractor baseline with side AB",
          vertexBlinking: null,
          sideBlinking: "AB",  // Only AB side blinks
          centerMarkerBlinking: false,
          baselineVisible: true,
          baselineColor: "orange",
          measurementArmBlinking: false,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: true,
          measurementArmRotatable: false,
          angleDisplayVisible: false,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 2,
          measurementText: null
        },
        3: {
          instructionText: "Align the measurement arm (blinking) with side AC",
          vertexBlinking: null,
          sideBlinking: "AC",  // Always AC (the other side)
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: true,
          angleReadingsClickable: false,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: true,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 3,
          measurementText: null
        },
        4: {
          instructionText: "Click on the correct angle measurement in the protractor",
          vertexBlinking: null,
          sideBlinking: null,
          centerMarkerBlinking: false,
          baselineVisible: false,
          baselineColor: null,
          measurementArmBlinking: false,
          angleReadingsClickable: true,
          draggable: false,
          protractorRotatable: false,
          measurementArmRotatable: false,
          angleDisplayVisible: true,
          animatedDotTarget: null,
          animatedDotVisible: false,
          currentStep: 4,
          measurementText: "∠ACB = 70°<br>∠ABC = 60°<br>∠BAC = 50°",
          // Reading selection: AC baseline, reading 0 is correct
          readingSelection: {
            correctIndex: 0,
            incorrectIndex: 1,
            correctColor: "#00FF00",
            incorrectColor: "#FF0000"
          }
        }
      },
      
      transitions: {
        "1to2": { trigger: "protractorSnapsToVertex", targetVertex: "A" },
        "2to3": { trigger: "baselineSnapsToSide", targetSide: "AB" },
        "3to4": { trigger: "measurementArmSnapsToSide", targetSide: "AC" },
        "complete": { trigger: "correctReadingClicked", nextState: "complete", nextStep: null }
      }
    }
  },
  
  // Helper functions for the config
  helpers: {
    /**
     * Get the current step config for a given state and step
     */
    getStepConfig: function(pageState, pageStep) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (!stateConfig) return null;
      return stateConfig.steps[pageStep] || null;
    },
    
    /**
     * Get the state config for a given state
     */
    getStateConfig: function(pageState) {
      return page2ProtractorFlowConfig.states[pageState] || null;
    },
    
    /**
     * Get the side index for a given side name
     */
    getSideIndex: function(sideName) {
      return page2ProtractorFlowConfig.sideIndices[sideName] ?? null;
    },
    
    /**
     * Get the vertex index for a given vertex name
     */
    getVertexIndex: function(vertexName) {
      return page2ProtractorFlowConfig.vertexIndices[vertexName] ?? null;
    },
    
    /**
     * Check if a reading is correct for the current state
     */
    isCorrectReading: function(pageState, pageStep, readingIndex) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      if (!stepConfig || !stepConfig.readingSelection) return false;
      
      // Handle dynamic reading selection (for state A)
      if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
        const stateConfig = page2ProtractorFlowConfig.states[pageState];
        const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
        if (chosenBaseline) {
          const dynamicSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
          return dynamicSelection.correctIndex === readingIndex;
        }
      }
      
      return stepConfig.readingSelection.correctIndex === readingIndex;
    },
    
    /**
     * Get the next state and step after completing current state
     */
    getNextStateAndStep: function(pageState) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (!stateConfig) return { nextState: null, nextStep: null };
      return {
        nextState: stateConfig.nextState,
        nextStep: 1
      };
    },
    
    /**
     * Get which side should blink for a given state and step
     * Returns null, a string (single side), or an array (multiple sides)
     */
    getBlinkingSide: function(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      if (!stepConfig) return null;
      
      // Handle dynamic side blinking (for state A step 3)
      if (stepConfig.sideBlinkingDynamic && typeof stepConfig.sideBlinkingDynamic === 'function') {
        const stateConfig = page2ProtractorFlowConfig.states[pageState];
        const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
        if (chosenBaseline) {
          return stepConfig.sideBlinkingDynamic(chosenBaseline);
        }
      }
      
      return stepConfig.sideBlinking;
    },
    
    /**
     * Get which vertex should blink for a given state and step
     */
    getBlinkingVertex: function(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      if (!stepConfig) return null;
      return stepConfig.vertexBlinking;
    },
    
    /**
     * Set the chosen baseline side (for state A)
     */
    setChosenBaselineSide: function(pageState, sideName) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (stateConfig && stateConfig.runtimeState) {
        stateConfig.runtimeState.chosenBaselineSide = sideName;
        console.log(`📝 [Config] Set chosen baseline for state ${pageState}: ${sideName}`);
      }
    },
    
    /**
     * Get the chosen baseline side (for state A)
     */
    getChosenBaselineSide: function(pageState) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      return stateConfig?.runtimeState?.chosenBaselineSide || null;
    },
    
    /**
     * Reset runtime state for a given state
     */
    resetRuntimeState: function(pageState) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (stateConfig && stateConfig.runtimeState) {
        stateConfig.runtimeState.chosenBaselineSide = null;
        console.log(`🔄 [Config] Reset runtime state for state ${pageState}`);
      }
    },
    
    /**
     * Get instruction text for current state and step
     */
    getInstructionText: function(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      if (!stepConfig) return "";
      
      // Handle dynamic instruction text (for state A step 3)
      if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
        const chosenBaseline = this.getChosenBaselineSide(pageState);
        if (chosenBaseline) {
          return stepConfig.instructionTextDynamic(chosenBaseline);
        }
      }
      
      // Use i18n for instruction text
      const i18nKey = `pages.page2.protractorFlow.state${pageState}.step${pageStep}`;
      const fallbackText = stepConfig.instructionText || "";
      
      // Try to use i18n if available
      if (typeof i18n !== 'undefined' && i18n.t) {
        try {
          const translated = i18n.t(i18nKey);
          // If translation found (not the key itself), return it
          if (translated && translated !== i18nKey && !translated.startsWith('[Missing:')) {
            return translated;
          }
        } catch (e) {
          // Fall through to fallback
        }
      }
      
      return fallbackText;
    }
  }
};

// Make the config globally available
if (typeof window !== 'undefined') {
  window.page2ProtractorFlowConfig = page2ProtractorFlowConfig;
  
  // Also expose helper functions directly for convenience
  window.getPage2StepConfig = (state, step) => page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
  window.getPage2StateConfig = (state) => page2ProtractorFlowConfig.helpers.getStateConfig(state);
  window.getPage2InstructionText = (state, step) => page2ProtractorFlowConfig.helpers.getInstructionText(state, step);
  window.getPage2BlinkingSide = (state, step) => page2ProtractorFlowConfig.helpers.getBlinkingSide(state, step);
  window.getPage2BlinkingVertex = (state, step) => page2ProtractorFlowConfig.helpers.getBlinkingVertex(state, step);
}

// Helper function to create a protractor flow config based on a template
const createProtractorFlowConfig = (baseConfig, angleValues) => {
  // Deep clone the states object (but keep helpers as reference to new config)
  const clonedStates = JSON.parse(JSON.stringify(baseConfig.states));
  
  // Update angle values
  clonedStates.C.correctAngle = angleValues.C;
  clonedStates.C.steps[4].measurementText = `∠ACB = ${angleValues.C}°`;
  
  clonedStates.B.correctAngle = angleValues.B;
  clonedStates.B.steps[4].measurementText = `∠ACB = ${angleValues.C}°<br>∠ABC = ${angleValues.B}°`;
  
  clonedStates.A.correctAngle = angleValues.A;
  clonedStates.A.steps[4].measurementText = `∠ACB = ${angleValues.C}°<br>∠ABC = ${angleValues.B}°<br>∠BAC = ${angleValues.A}°`;
  
  // Special case: For 90° angles, both reading indices (0 and 1) are correct
  // Update readingSelection to accept both indices
  if (angleValues.B === 90 && clonedStates.B.steps[4].readingSelection) {
    clonedStates.B.steps[4].readingSelection = {
      correctIndices: [0, 1], // Both indices are correct for 90°
      correctIndex: 0, // Keep for backward compatibility, but both will be accepted
      incorrectIndex: null, // No incorrect index for 90°
      correctColor: "#00FF00",
      incorrectColor: "#FF0000"
    };
  }
  if (angleValues.C === 90 && clonedStates.C.steps[4].readingSelection) {
    clonedStates.C.steps[4].readingSelection = {
      correctIndices: [0, 1], // Both indices are correct for 90°
      correctIndex: 0, // Keep for backward compatibility, but both will be accepted
      incorrectIndex: null, // No incorrect index for 90°
      correctColor: "#00FF00",
      incorrectColor: "#FF0000"
    };
  }
  if (angleValues.A === 90 && clonedStates.A.steps[4].readingSelection) {
    // Handle dynamic reading selection for state A
    if (clonedStates.A.steps[4].readingSelectionDynamic) {
      // Wrap the dynamic function to handle 90° case
      const originalDynamic = clonedStates.A.steps[4].readingSelectionDynamic;
      clonedStates.A.steps[4].readingSelectionDynamic = (chosenBaseline) => {
        const result = originalDynamic(chosenBaseline);
        // If the angle would be 90°, accept both indices
        // Note: This is a bit tricky since we need to know which baseline gives 90°
        // For now, we'll check if the result would indicate 90° by checking both possible readings
        return {
          ...result,
          correctIndices: [0, 1], // Both indices are correct for 90°
          correctIndex: result.correctIndex, // Keep original for compatibility
          incorrectIndex: null
        };
      };
    } else if (clonedStates.A.steps[4].readingSelection) {
      clonedStates.A.steps[4].readingSelection = {
        correctIndices: [0, 1], // Both indices are correct for 90°
        correctIndex: 0, // Keep for backward compatibility
        incorrectIndex: null,
        correctColor: "#00FF00",
        incorrectColor: "#FF0000"
      };
    }
  }
  
  // Create new config with cloned states
  const newConfig = {
    version: "1.0",
    sideIndices: { ...baseConfig.sideIndices },
    vertexIndices: { ...baseConfig.vertexIndices },
    states: clonedStates,
    helpers: {
      getStepConfig: function(pageState, pageStep) {
        const stateConfig = newConfig.states[pageState];
        if (!stateConfig) return null;
        return stateConfig.steps[pageStep] || null;
      },
      getStateConfig: function(pageState) {
        return newConfig.states[pageState] || null;
      },
      getSideIndex: function(sideName) {
        return newConfig.sideIndices[sideName] ?? null;
      },
      getVertexIndex: function(vertexName) {
        return newConfig.vertexIndices[vertexName] ?? null;
      },
      isCorrectReading: function(pageState, pageStep, readingIndex) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig || !stepConfig.readingSelection) return false;
        
        if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
          const stateConfig = newConfig.states[pageState];
          const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
          if (chosenBaseline) {
            const dynamicSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
            // Check if correctIndices array exists (for 90° angles)
            if (dynamicSelection.correctIndices && Array.isArray(dynamicSelection.correctIndices)) {
              return dynamicSelection.correctIndices.includes(readingIndex);
            }
            return dynamicSelection.correctIndex === readingIndex;
          }
        }
        
        // Check if correctIndices array exists (for 90° angles)
        if (stepConfig.readingSelection.correctIndices && Array.isArray(stepConfig.readingSelection.correctIndices)) {
          return stepConfig.readingSelection.correctIndices.includes(readingIndex);
        }
        
        return stepConfig.readingSelection.correctIndex === readingIndex;
      },
      getNextStateAndStep: function(pageState) {
        const stateConfig = newConfig.states[pageState];
        if (!stateConfig) return { nextState: null, nextStep: null };
        return {
          nextState: stateConfig.nextState,
          nextStep: 1
        };
      },
      getBlinkingSide: function(pageState, pageStep) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig) return null;
        
        if (stepConfig.sideBlinkingDynamic && typeof stepConfig.sideBlinkingDynamic === 'function') {
          const stateConfig = newConfig.states[pageState];
          const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
          if (chosenBaseline) {
            return stepConfig.sideBlinkingDynamic(chosenBaseline);
          }
        }
        
        return stepConfig.sideBlinking;
      },
      getBlinkingVertex: function(pageState, pageStep) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig) return null;
        return stepConfig.vertexBlinking;
      },
      setChosenBaselineSide: function(pageState, sideName) {
        const stateConfig = newConfig.states[pageState];
        if (stateConfig && stateConfig.runtimeState) {
          stateConfig.runtimeState.chosenBaselineSide = sideName;
          console.log(`📝 [Config] Set chosen baseline for state ${pageState}: ${sideName}`);
        }
      },
      getChosenBaselineSide: function(pageState) {
        const stateConfig = newConfig.states[pageState];
        return stateConfig?.runtimeState?.chosenBaselineSide || null;
      },
      resetRuntimeState: function(pageState) {
        const stateConfig = newConfig.states[pageState];
        if (stateConfig && stateConfig.runtimeState) {
          stateConfig.runtimeState.chosenBaselineSide = null;
          console.log(`🔄 [Config] Reset runtime state for state ${pageState}`);
        }
      },
      getInstructionText: function(pageState, pageStep) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig) return "";
        
        if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
          const chosenBaseline = this.getChosenBaselineSide(pageState);
          if (chosenBaseline) {
            return stepConfig.instructionTextDynamic(chosenBaseline);
          }
        }
        
        return stepConfig.instructionText || "";
      }
    }
  };
  
  return newConfig;
};

// ===== PAGE 4 PROTRACTOR FLOW CONFIGURATION =====
/**
 * Page 4 Protractor Flow Configuration
 * Same structure as page 2, but for right-angle triangle with angles: 60°, 90°, 30°
 * States: C, B, A (which vertex to measure)
 * Steps: 1, 2, 3, 4 (progression within each state)
 */
const page4ProtractorFlowConfig = createProtractorFlowConfig(page2ProtractorFlowConfig, {
  C: 30, // ∠ACB = 30°
  B: 90, // ∠ABC = 90°
  A: 60  // ∠BAC = 60°
});

// Make the config globally available
if (typeof window !== 'undefined') {
  window.page4ProtractorFlowConfig = page4ProtractorFlowConfig;
  
  // Also expose helper functions directly for convenience
  window.getPage4StepConfig = (state, step) => page4ProtractorFlowConfig.helpers.getStepConfig(state, step);
  window.getPage4StateConfig = (state) => page4ProtractorFlowConfig.helpers.getStateConfig(state);
  window.getPage4InstructionText = (state, step) => page4ProtractorFlowConfig.helpers.getInstructionText(state, step);
  window.getPage4BlinkingSide = (state, step) => page4ProtractorFlowConfig.helpers.getBlinkingSide(state, step);
  window.getPage4BlinkingVertex = (state, step) => page4ProtractorFlowConfig.helpers.getBlinkingVertex(state, step);
}

// ===== PAGE 6 PROTRACTOR FLOW CONFIGURATION =====
/**
 * Page 6 Protractor Flow Configuration
 * Same structure as page 2, but for equilateral triangle with angles: 60°, 60°, 60°
 * States: C, B, A (which vertex to measure)
 * Steps: 1, 2, 3, 4 (progression within each state)
 */
const page6ProtractorFlowConfig = createProtractorFlowConfig(page2ProtractorFlowConfig, {
  C: 20, // ∠ACB = 20° (at C, which is vertex F in obtuse triangle)
  B: 50, // ∠ABC = 50° (at B, which is vertex E in obtuse triangle)
  A: 110 // ∠BAC = 110° (at A, which is vertex D in obtuse triangle - obtuse angle)
});

// Make the config globally available
if (typeof window !== 'undefined') {
  window.page6ProtractorFlowConfig = page6ProtractorFlowConfig;
  
  // Also expose helper functions directly for convenience
  window.getPage6StepConfig = (state, step) => page6ProtractorFlowConfig.helpers.getStepConfig(state, step);
  window.getPage6StateConfig = (state) => page6ProtractorFlowConfig.helpers.getStateConfig(state);
  window.getPage6InstructionText = (state, step) => page6ProtractorFlowConfig.helpers.getInstructionText(state, step);
  window.getPage6BlinkingSide = (state, step) => page6ProtractorFlowConfig.helpers.getBlinkingSide(state, step);
  window.getPage6BlinkingVertex = (state, step) => page6ProtractorFlowConfig.helpers.getBlinkingVertex(state, step);
}

/**
 * Helper function to navigate to a page
 * @param {number} targetPage - The page number to navigate to
 * @param {string} direction - 'next' or 'previous' (for logging)
 */
const navigateToPage = (targetPage, direction = "unknown") => {
  if (typeof window !== "undefined") {
    // Get current page before navigation
    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;

    // Reset states for both current page (if exists) and target page
    if (currentPage && currentPage !== targetPage) {
      resetPageStates(currentPage);
    }

    if (window.changePageAndNotify) {
      window.changePageAndNotify(targetPage);
    } else if (window.navigateToPage) {
      window.navigateToPage(targetPage);
    } else {
      // Fallback: dispatch page change event
      window.dispatchEvent(
        new CustomEvent("pageChanged", { detail: { page: targetPage } })
      );
      console.log(
        `📄 [Navigation] ${direction} - Dispatched page change event to page ${targetPage}`
      );
    }

    // Reset target page after a small delay to ensure components are mounted
    setTimeout(() => {
      resetPageStates(targetPage);
    }, 100);
  }
};


// ===== GRID POSITION PAGES =====

const createOptimizedGridPositionPages = () => {
  // Helper function to get current question data (optimized)
  const getCurrentQuestionData = () => {
    const currentIndex =
      typeof window !== "undefined" && window.currentQuestionIndex !== undefined
        ? window.currentQuestionIndex
        : 0;
    const currentQuestion = {
      minuend: 5,
      subtrahend: 3,
      missing: "subtrahend",
    };
    return { currentIndex, currentQuestion };
  };

  // Helper function for i18n text (optimized)
  const getI18nText = (key, fallback, params = {}) => {
    return typeof i18n !== "undefined" ? i18n.t(key, params) : fallback;
  };

  const questionBottomY = 150;

  // Return optimized GridPositionPages
  return {
    1: [
      // Title: "Symmetry of Shapes" in bright orange, centered at top
      {
        id: "page1-title",
        name: "page1-title",
        coordinates: [25, 25, 1575, 125],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.title", "Symmetry of Shapes"),
          fontSize: "60gc",
          color: "#FF9900", // Bright orange
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // First line of instructional text: "Different shapes have different numbers of symmetry lines."
      {
        id: "page1-main-text",
        name: "page1-main-text",
        coordinates: [300, 200, 1300, 300],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.mainText", "Different shapes have different numbers of symmetry lines."),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },
      // Second line of instructional text: "Let's identify the line of symmetry."
      {
        id: "page1-instruction-text",
        name: "page1-instruction-text",
        coordinates: [300, 320, 1300, 420],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.instructionText", "Let's identify the line of symmetry."),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },
      // Third line of instructional text: "Tap "Start" to begin."
      {
        id: "page1-tap-to-begin",
        name: "page1-tap-to-begin",
        coordinates: [25, 440, 1575, 540],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page1.tapToBegin", 'Tap "Start" to begin.'),
          fontSize: "45gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },
      // Start button - Orange/yellow gradient with black text, centered at bottom
      {
        id: "page1-start-button",
        name: "start-button",
        type: "button",
        coordinates: [675, 675, 925, 775],
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.start", "Start"),
          fontSize: "44gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background (gradient will be applied via CSS)
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
          textAlign: "center",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Navigate to next page using navigation config
            const nav = pageNavigation[1];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
    ],
    2: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page2-left-column",
        name: "page2-left-column",
        coordinates: [5, 85, 1195, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page2-right-column",
        name: "page2-right-column",
        coordinates: [1200, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent", // Transparent - step-component has its own background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let us measure the angles of the △ABC using a protractor"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - uses page2ProtractorFlowConfig
      {
        id: "page2-instruction",
        name: "page2-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get instruction text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page2State ? window.page2State : 'A';
            const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
            
            // Get config for current state/step
            const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
            if (stepConfig) {
              // Handle dynamic instruction text (for state A step 3)
              if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
                const stateConfig = page2ProtractorFlowConfig.states[state];
                const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                if (chosenBaseline) {
                  return stepConfig.instructionTextDynamic(chosenBaseline);
                }
              }
              return stepConfig.instructionText;
            }
            return getI18nText("pages.page2.instruction", "Drag the protractor to vertex C to measure ∠ACB");
          })(),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component in right column
      {
        id: "page2-steps",
        name: "page2-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800], // Positioned in the right column
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page2.solutionSteps.headerText", "Steps to measure an angle of △"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const fallbackSteps = ["Center the protractor on any vertex.", "Rotate the protractor to align the 0° baseline with one arm of the angle.", "Move the slider to measure the angle."];
            const stepsArray = getI18nText("pages.page2.solutionSteps.steps", fallbackSteps);
            // Check if result is a missing key string or not an array
            if (typeof stepsArray === 'string' && stepsArray.startsWith('[Missing:')) {
              // Use fallback
              return fallbackSteps.map(text => ({ text }));
            }
            return Array.isArray(stepsArray) ? stepsArray.map((text, idx) => ({ text: text || fallbackSteps[idx] })) : fallbackSteps.map(text => ({ text }));
          })(),
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)",
          containerBackgroundOpacity: 0.5,
          containerBorderRadius: "12gc",
          containerPadding: "20gc",
          gap: "12gc"
        }
      },






      // Build Mode Example - Coordinate Matching
      // {
      //   id: "page2-build-coordinates",
      //   name: "build-coordinates",
      //   type: "custom",
      //   coordinates: [750, 50, 1400, 600],
      //   zIndex: 40,
      //   props: {
      //     componentType: "QuadrilateralComponent",
      //     mode: "build", // Enable build mode
      //     quadType: "SQUARE",
      //     vertices: [
      //       { row: 3, col: 3 },
      //       { row: 3, col: 6 },
      //       { row: 6, col: 6 },
      //       { row: 6, col: 3 }
      //     ],
      //     gridRows: 10,
      //     gridCols: 10,
      //     showGrid: true,
      //     showDiagonals: false,
      //     draggable: true,
      //     edgeColor: "#CC6600",
      //     edgeThickness: "4gc",
      //     vertexConfig: {
      //       color: "#FF9900",
      //       showLabels: true,
      //       labels: ["A", "B", "C", "D"],
      //       labelColor: "#000000",
      //       labelSize: "16gc",
      //       labelOffset: "15gc"
      //     },
      //     angleConfig: {
      //       show: "all",
      //       markerColor: "#FF6600",
      //       markerSize: "1gc",
      //       showText: true,
      //       textColor: "#FF6600",
      //       textSize: "12gc"
      //     },
      //     buildConfig: {
      //       targetType: "coordinates", // Match exact coordinates
      //       targetVertices: [
      //         { row: 2, col: 1 },
      //         { row: 2, col: 9 },
      //         { row: 8, col: 9 },
      //         { row: 8, col: 1 }
      //       ],
      //       showTargetWireframe: true,
      //       wireframeColor: "#8800FF",
      //       wireframeThickness: "2gc",
      //       blinkWireframe: false,
      //       highlightTargetVertices: true,
      //       targetVertexColor: "#8800FF",
      //       targetVertexSize: "12gc",
      //       tolerance: 1, // Allow 1 grid cell tolerance
      //       showSuccessMessage: true,
      //       successMessage: "Excellent! You matched the target shape!",
      //       successAnimation: true,
      //       onTargetAchieved: (data) => {
      //         console.log("🎯 Coordinates matched!", data);
      //       }
      //     }
      //   }
      // },

      // Instructions Text Box (commented out)
      // {
      //   id: "page2-instruction-1",
      //   name: "page2-instruction-1",
      //   coordinates: [50, 620, 700, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Shape Challenge: Drag the vertices to make a RECTANGLE",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(0, 170, 0, 0.1)",
      //     padding: "10gc"
      //   }
      // },

      // Instruction Text Box for second quadrilateral (commented out - second quad is disabled)
      // {
      //   id: "page2-instruction-2",
      //   name: "page2-instruction-2",
      //   coordinates: [750, 620, 1400, 700],
      //   zIndex: 100,
      //   type: "textbox",
      //   props: {
      //     text: "Position Challenge: Match the purple wireframe exactly (±1 grid cell)",
      //     fontSize: "16gc",
      //     color: "#000000",
      //     textAlign: "center",
      //     backgroundColor: "rgba(136, 0, 255, 0.1)",
      //     padding: "10gc"
      //   }
      // },

      // Display Controls for second quadrilateral
      // {
      //   id: "page2-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page2-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

      // Navigation buttons
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[2];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page2-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page2-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page2-page-title",
      //   name: "page2-page-title",
      //   coordinates: [155, 820, 1445, 895],
      //   zIndex: "var(--z-elevated)",
      //   type: "textbox",
      //   props: {
      //     text: "Build Mode Examples - Try to achieve both targets!",
      //     fontSize: "40gc",
      //     color: "white",
      //     textAlign: "center",
      //   },
      // },
      // Shape display - QuadrilateralComponent (Acute Triangle)
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page2State`);
          const pageState = typeof window !== 'undefined' && window.page2State ? window.page2State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page2StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // ACUTE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - will be checked dynamically in component
              vertexAnimations: [false, false, false], // Default: no blinking, component will check page2State dynamically
              // Individual x/y offsets for each label (in gc units)
              labelOffsets: [
                { x: "-2gc", y: "-40gc" }, // A: top-left
                { x: "-20gc", y: "40gc" },  // B: top-right
                { x: "0gc", y: "40gc" }     // C: bottom-center
              ]
            },
            effectiveAngleConfig: {
              show: isComplete ? 'all' : 'none',
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: isComplete,
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement (60°), not the angle name
              // Per-vertex angle configuration - override calculated angles with actual angles when complete
              ...(isComplete ? {
                angleA: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 50, // ∠BAC = 50° (at A)
                    textMode: 'measure', // Show only "50°"
                    size: "100gc", // Arc size
                    thickness: "8gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.7, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleB: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 60, // ∠ABC = 60° (at B)
                    textMode: 'measure', // Show only "60°"
                    size: "100gc", // Arc size
                    thickness: "8gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.7, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleC: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 70, // ∠ACB = 70° (at C)
                    textMode: 'measure', // Show only "70°"
                    size: "100gc", // Arc size
                    thickness: "8gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.7, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                }
              } : {})
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page2ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page2-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [175, 235, 900, 880], // Moved right by 200gc, down by 100gc
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Protractor component - positioned to the right of the shape
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates (moved right by 200gc, down by 100gc)
        const triangleCoords = [175, 235, 900, 880];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Convert triangle vertices from local grid (10x10) to precision grid coordinates
        // Use the same conversion method as QuadrilateralComponent's quadGridToPrecisionGrid
        const precisionGridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const precisionGridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        // Container size in GC units
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        
        // Grid size in GC units (accounting for centered grid)
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        
        // Offset to center the grid within container
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        // This matches QuadrilateralComponent's quadGridToPrecisionGrid with forHotspot: true
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          // Calculate position within centered grid (0-1 range)
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          
          // Map to actual position within container (accounting for centered grid)
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Create snap points for each vertex - ensure order matches labels [A, B, C]
        // Triangle vertices order: [0] = A (top), [1] = B (bottom-left), [2] = C (bottom-right)
        const vertexLabels = ['A', 'B', 'C'];
        const snapPoints = triangleVertices.map((vertex, index) => {
          const precisionPos = quadGridToPrecisionGrid(vertex);
          
          return {
            x: precisionPos.x,
            y: precisionPos.y,
            label: "", // No label
            vertexIndex: index, // Store index to identify vertex (0=A, 1=B, 2=C)
            vertexLabel: vertexLabels[index] // Store label for identification
          };
        });
        
        return {
          id: "page2-protractor",
          name: "page2-protractor",
          type: "custom",
          coordinates: [1000, 550, 1000, 550], // Center position to the right of the shape (moved left by 100gc from previous position)
          zIndex: 10000,
        props: {
            componentType: "ProtractorComponent",
            protractorType: "semicircular",
            mode: "interactive",
            radius: "138gc", // Increased by 15% (120gc * 1.15 = 138gc)
            showArm: true,
            armAngle: 0,
            isDraggable: true,
            isRotatable: true,
            isProtractorRotatable: true,  // Enable rotation of the entire protractor body
            showProtractorRotationHandle: true,  // Show rotation handle to rotate around center
            snapToDegrees: 5,
            armColor: "#0066FF",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            centerMarker: {
              show: true,
              color: "#FF9900",
              borderColor: "#FF9900",
              borderWidth: "3gc",
              size: "24gc",
              innerCircleSize: "8gc",
              animated: false
            },
            // Snap to vertices configuration
            snapMode: "hybrid", // Snap when near, but allow free placement
            snapThreshold: 60, // Distance in pixels to trigger snap
            showSnapIndicators: true, // Show visual indicators
            highlightNearestSnap: true, // Highlight nearest vertex in green
            snapPoints: snapPoints,
            // Measurement arm configuration - uses page2ProtractorFlowConfig
            measurementArm: {
              angleReadingsClickable: true, // Enable clickable angle readings
              onAngleReadingClick: (readingIndex, angle) => {
                console.log(`🖱️ [PageConfig] Angle reading clicked: readingIndex=${readingIndex}, angle=${angle}°`);
                
                if (typeof window === 'undefined') return;
                
                const pageState = window.page2State || 'A';
                const pageStep = window.page2Step || 1;
                
                // Only handle clicks when step = 4 (angle selection step)
                if (pageStep !== 4) return;
                
                // Get config for current state
                const stateConfig = page2ProtractorFlowConfig.states[pageState];
                if (!stateConfig) return;
                
                const stepConfig = stateConfig.steps[4];
                if (!stepConfig || !stepConfig.readingSelection) return;
                
                // Handle dynamic reading selection (for state A)
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const chosenBaseline = stateConfig.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                const isCorrect = readingIndex === readingSelection.correctIndex;
                
                if (!isCorrect) {
                  // Incorrect reading clicked - play wrong sound, turn red
                  console.log(`❌ [PageConfig] Incorrect reading clicked: readingIndex=${readingIndex}, expected=${readingSelection.correctIndex}`);
                  
                  // Play incorrect sound
                  if (window.playAnswerSound) {
                    window.playAnswerSound(false);
                  }
                  
                  // Set state to indicate incorrect selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.incorrectColor,
                    armColor: readingSelection.incorrectColor
                  };
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.incorrectColor, 
                      armColor: readingSelection.incorrectColor 
                    }
                  }));
                } else {
                  // Correct reading clicked - turn green, update text
                  console.log(`✅ [PageConfig] Correct reading clicked: readingIndex=${readingIndex}`);
                  
                  // Set state to indicate correct selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.correctColor,
                    armColor: readingSelection.correctColor
                  };
                  
                  // Update text box with measurement text from config
                  const textBox = document.getElementById('page2-measurement-text');
                  if (textBox && stepConfig.measurementText) {
                    textBox.innerHTML = stepConfig.measurementText;
                  }
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.correctColor, 
                      armColor: readingSelection.correctColor 
                    }
                  }));
                  
                  // Transition to next state
                  const nextStateInfo = page2ProtractorFlowConfig.helpers.getNextStateAndStep(pageState);
                  if (nextStateInfo.nextState && nextStateInfo.nextState !== 'complete') {
                    const oldState = window.page2State;
                    const oldStep = window.page2Step;
                    window.page2State = nextStateInfo.nextState;
                    window.page2Step = nextStateInfo.nextStep;
                    console.log(`[STATE:page2State] Changed: ${oldState} → ${window.page2State} (Correct reading clicked)`);
                    console.log(`[STATE:page2Step] Changed: ${oldStep} → ${window.page2Step} (Correct reading clicked)`);
                    
                    // Reset angle reading selection for new state
                    window.angleReadingSelected = null;
                    
                    // Dispatch events to notify components
                    window.dispatchEvent(new CustomEvent('pageStateChanged', {
                      detail: { state: window.page2State, oldState: oldState }
                    }));
                    window.dispatchEvent(new CustomEvent('page2StepChanged', {
                      detail: { step: window.page2Step, oldStep: oldStep }
                    }));
                    console.log('📢 [PageConfig] Dispatched pageStateChanged and page2StepChanged events');
                  } else if (nextStateInfo.nextState === 'complete') {
                    console.log('🎉 [PageConfig] All angles measured! Flow complete.');
                    
                    // Set pageState to 'complete'
                    const oldState = window.page2State;
                    window.page2State = 'complete';
                    console.log(`[STATE:page2State] Changed: ${oldState} → complete (All angles measured)`);
                    
                    // Dispatch pageStateChanged event
                    window.dispatchEvent(new CustomEvent('pageStateChanged', {
                      detail: { state: 'complete', oldState: oldState }
                    }));
                    
                    // Dispatch quizCompleted event to enable next button
                    if (typeof window !== 'undefined') {
                      const quizCompletedEvent = new CustomEvent('quizCompleted', {
                        detail: {
                          pageNumber: 2,
                          componentType: 'ProtractorComponent',
                          componentId: 'page2-protractor'
                        }
                      });
                      window.dispatchEvent(quizCompletedEvent);
                      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 2');
                    }
                  }
                }
              }
            },
            // Callback when protractor position changes (during drag)
            onPositionChange: (position, snapPoint) => {
              if (position && typeof window !== 'undefined') {
                // Convert pixel position to grid coordinates
                const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                
                const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
                
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                
                // Store protractor center position in GC units (grid coordinates)
                const oldPos = window.protractorCenterPosition;
                window.protractorCenterPosition = {
                  x: gridX,
                  y: gridY
                };
                
                if (!oldPos || oldPos.x !== gridX || oldPos.y !== gridY) {
                  console.log(`[STATE:protractorPosition] Changed: (${oldPos?.x || 'N/A'}, ${oldPos?.y || 'N/A'}) → (${gridX}, ${gridY}) [PageConfig - position update]`);
                }
                
                // Note: protractorPositionChanged event is already dispatched by ProtractorComponent
                // in handleDragMove (with isDragging: true) and handleDragEnd (with isDragging: false)
                // We only update window.protractorCenterPosition here for other components that need it
              }
            },
            // Callback when protractor snaps to a vertex - uses page2ProtractorFlowConfig
            onSnapToPoint: (snapPoint) => {
              console.log('📍 [PageConfig] Protractor snapped to:', snapPoint);
              
              if (typeof window === 'undefined' || !snapPoint) return;
              
              const pageState = window.page2State || 'C';
              const pageStep = window.page2Step || 1;
              
              // Only handle snap when step = 1 (dragging to vertex step)
              if (pageStep !== 1) return;
              
              // Get config for current state
              const stateConfig = page2ProtractorFlowConfig.states[pageState];
              if (!stateConfig) return;
              
              // Check if snapped to the target vertex for current state
              const targetVertexIndex = stateConfig.targetVertexIndex;
              const targetVertex = stateConfig.targetVertex;
              
              if (snapPoint.vertexIndex === targetVertexIndex || snapPoint.vertexLabel === targetVertex) {
                const oldStep = window.page2Step;
                window.page2Step = 2;
                console.log(`[STATE:page2Step] Changed: ${oldStep} → ${window.page2Step} (Protractor snapped to vertex ${targetVertex})`);
                console.log(`✅ [PageConfig] Protractor on vertex ${targetVertex} - set page2Step: ${oldStep} → ${window.page2Step}`);
                
                // Dispatch event to notify components
                const event = new CustomEvent('page2StepChanged', { 
                  detail: { step: 2, oldStep: oldStep } 
                });
                window.dispatchEvent(event);
                console.log('📢 [PageConfig] Dispatched page2StepChanged event');
              } else {
                console.log(`📍 [PageConfig] Protractor snapped to vertex ${snapPoint.vertexLabel}, but target is ${targetVertex}`);
              }
            }
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page2State
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates (moved right by 200gc, down by 100gc)
        const triangleCoords = [175, 235, 900, 880];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: A (index 0), B (index 1), C (index 2)
        const vertexA = triangleVertices[0];
        const vertexB = triangleVertices[1];
        const vertexC = triangleVertices[2];
        const vertexAPos = quadGridToPrecisionGrid(vertexA);
        const vertexBPos = quadGridToPrecisionGrid(vertexB);
        const vertexCPos = quadGridToPrecisionGrid(vertexC);
        
        // Protractor center position (moved left by 100gc from previous position)
        const protractorCenterX = 1000;
        const protractorCenterY = 550;
        
        return {
          id: "page2-animated-dot",
          name: "page2-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page2State
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page2ProtractorFlowConfig
      {
        id: "page2-measurement-text",
        name: "page2-measurement-text",
        coordinates: [850, 250, 1150, 600], // Moved left by 150gc from previous position
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page2State ? window.page2State : 'A';
            const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page2ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                if (readingSelection && selectedReading.readingIndex === readingSelection.correctIndex) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      }
    ],
    3: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page3-left-column",
        name: "page3-left-column",
        coordinates: [5, 85, 895, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page3-right-column",
        name: "page3-right-column",
        coordinates: [900, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Quiz Panel - Classify the triangle by its angles
      {
        id: 'page3-quiz-panel',
        name: 'page3-quiz-panel',
        type: 'custom',
        coordinates: [920, 100, 1580, 740], // Positioned in the right column
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page3-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT3R', // 3 options in vertical layout
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page3.quizPanel.questionText", "Please choose the correct type of triangle for the triangle whose angles we just measured"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 30, // Question row: 20%
          optionsRowHeight: 50, // Options row: 50%
          feedbackRowHeight: 30, // Feedback row: 30%
          optionButtonWidth: 80,
          optionButtonHeight: 75,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT3 (3 options in vertical layout)
          // First option (Acute Triangle) is correct
          options: [
            {
              id: 'acute',
              text: getI18nText("pages.page3.quizPanel.options.0.text", "Acute Triangle"),
              iscorrect: true,
              feedback: getI18nText("pages.page3.quizPanel.options.0.feedback", "Correct! An acute triangle has all angles less than 90°.")
            },
            {
              id: 'right',
              text: getI18nText("pages.page3.quizPanel.options.1.text", "Right Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page3.quizPanel.options.1.feedback", "Incorrect. A right triangle has one angle equal to 90°.")
            },
            {
              id: 'obtuse',
              text: getI18nText("pages.page3.quizPanel.options.2.text", "Obtuse Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page3.quizPanel.options.2.feedback", "Incorrect. An obtuse triangle has one angle greater than 90°.")
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.headerText", "Now, classify the triangle by its angles."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Shape display - QuadrilateralComponent (Acute Triangle)
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page2State`);
          const pageState = typeof window !== 'undefined' && window.page2State ? window.page2State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page2StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // ACUTE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels (hotspots disabled for page 3 in component)
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - no blinking on page 3
              vertexAnimations: [false, false, false],
              // Individual x/y offsets for each label (in gc units) - same as page 2
              labelOffsets: [
                { x: "-2gc", y: "-40gc" }, // A: top-left
                { x: "-20gc", y: "40gc" },  // B: top-right
                { x: "0gc", y: "40gc" }     // C: bottom-center
              ]
            },
            effectiveAngleConfig: {
              show: 'all', // Always show angle markers on page 3
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: true, // Always show text on page 3
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement, not the angle name
              // Per-vertex angle configuration - show actual acute triangle angles on page 3
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 50, // ∠BAC = 50° (at A)
                  textMode: 'measure', // Show only "50°"
                  size: "100gc", // Arc size
                  thickness: "8gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.7, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleB: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 60, // ∠ABC = 60° (at B)
                  textMode: 'measure', // Show only "60°"
                  size: "100gc", // Arc size
                  thickness: "8gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.7, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 70, // ∠ACB = 70° (at C)
                  textMode: 'measure', // Show only "70°"
                  size: "100gc", // Arc size
                  thickness: "8gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.7, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page3ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page3-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [138, 235, 863, 880], // Moved left by another 50gc (total 150gc left from original)
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page2State
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates (moved left by 150gc total to match shape)
        const triangleCoords = [138, 235, 863, 880];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: A (index 0), B (index 1), C (index 2)
        const vertexA = triangleVertices[0];
        const vertexB = triangleVertices[1];
        const vertexC = triangleVertices[2];
        const vertexAPos = quadGridToPrecisionGrid(vertexA);
        const vertexBPos = quadGridToPrecisionGrid(vertexB);
        const vertexCPos = quadGridToPrecisionGrid(vertexC);
        
        // Protractor center position (moved left by 100gc from previous position)
        const protractorCenterX = 1000;
        const protractorCenterY = 550;
        
        return {
          id: "page3-animated-dot",
          name: "page3-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page2State
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page2ProtractorFlowConfig
      {
        id: "page3-measurement-text",
        name: "page3-measurement-text",
        coordinates: [1100, 250, 1400, 600], // Moved right by 200gc, down by 100gc
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page2State ? window.page2State : 'A';
            const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page2ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                if (readingSelection && selectedReading.readingIndex === readingSelection.correctIndex) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      },

      // Navigation buttons
      {
        id: "page3-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[3];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page3-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page3-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[3];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    4: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page4-left-column",
        name: "page4-left-column",
        coordinates: [5, 85, 1195, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page4-right-column",
        name: "page4-right-column",
        coordinates: [1200, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent", // Transparent - step-component has its own background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Header - Orange text
      {
        id: "page4-header",
        name: "page4-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let us measure the angles of the △ABC using a protractor"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - uses page2ProtractorFlowConfig
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get instruction text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page4State ? window.page4State : 'A';
            const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
            
            // Get config for current state/step
            const stepConfig = page4ProtractorFlowConfig.helpers.getStepConfig(state, step);
            if (stepConfig) {
              // Handle dynamic instruction text (for state A step 3)
              if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
                const stateConfig = page4ProtractorFlowConfig.states[state];
                const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                if (chosenBaseline) {
                  return stepConfig.instructionTextDynamic(chosenBaseline);
                }
              }
              return stepConfig.instructionText;
            }
            return getI18nText("pages.page2.instruction", "Drag the protractor to vertex C to measure ∠ACB");
          })(),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component in right column
      {
        id: "page4-steps",
        name: "page4-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800], // Positioned in the right column
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page4.solutionSteps.headerText", "Steps to measure an angle of △"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const stepsArray = getI18nText("pages.page4.solutionSteps.steps", ["Center the protractor on any vertex.", "Rotate the protractor to align the 0° baseline with one arm of the angle.", "Move the slider to measure the angle."]);
            return Array.isArray(stepsArray) ? stepsArray.map((text, idx) => ({ text: text || ["Center the protractor on any vertex.", "Rotate the protractor to align the 0° baseline with one arm of the angle.", "Move the slider to measure the angle."][idx] })) : [
              { text: "Center the protractor on any vertex." },
              { text: "Rotate the protractor to align the 0° baseline with one arm of the angle." },
              { text: "Move the slider to measure the angle." }
            ];
          })(),
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)",
          containerBackgroundOpacity: 0.5,
          containerBorderRadius: "12gc",
          containerPadding: "20gc",
          gap: "12gc"
        }
      },






      // Shape display - QuadrilateralComponent (Right-Angle Triangle)
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page4State`);
          const pageState = typeof window !== 'undefined' && window.page4State ? window.page4State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page4StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // RIGHT_ANGLE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - will be checked dynamically in component
              vertexAnimations: [false, false, false], // Default: no blinking, component will check page4State dynamically
              // Individual x/y offsets for each label (in gc units)
              labelOffsets: [
                { x: "-2gc", y: "-40gc" }, // A: top-left
                { x: "-20gc", y: "40gc" },  // B: top-right
                { x: "0gc", y: "40gc" }     // C: bottom-center
              ]
            },
            effectiveAngleConfig: {
              show: isComplete ? 'all' : 'none',
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: isComplete,
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement (60°), not the angle name
              // Per-vertex angle configuration - right-angle triangle: ∠D = 60°, ∠E = 90°, ∠F = 30°
              ...(isComplete ? {
                angleA: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 60, // Right-angle triangle: ∠D = 60° (vertex 0)
                    textMode: 'measure', // Show only "60°"
                    size: "40gc", // Arc size
                    thickness: "4gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.7, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleB: {
                  interiorAngle: {
                    show: false, // Don't show arc - let right angle square show instead
                    showText: true,
                    angle: 90, // Right-angle triangle: ∠E = 90° (vertex 1, right angle)
                    textMode: 'measure', // Show only "90°"
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleC: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 30, // Right-angle triangle: ∠F = 30° (vertex 2)
                    textMode: 'measure', // Show only "30°"
                    size: "75gc", // Arc size
                    thickness: "4gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.7, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                }
              } : {})
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page4ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page4-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [-25, 135, 700, 780],
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Protractor component - positioned to the right of the shape
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Convert triangle vertices from local grid (10x10) to precision grid coordinates
        // Use the same conversion method as QuadrilateralComponent's quadGridToPrecisionGrid
        const precisionGridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const precisionGridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        // Container size in GC units
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        
        // Grid size in GC units (accounting for centered grid)
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        
        // Offset to center the grid within container
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        // This matches QuadrilateralComponent's quadGridToPrecisionGrid with forHotspot: true
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          // Calculate position within centered grid (0-1 range)
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          
          // Map to actual position within container (accounting for centered grid)
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Create snap points for each vertex - ensure order matches labels [A, B, C]
        // Triangle vertices order: [0] = A (top), [1] = B (bottom-left), [2] = C (bottom-right)
        const vertexLabels = ['A', 'B', 'C'];
        const snapPoints = triangleVertices.map((vertex, index) => {
          const precisionPos = quadGridToPrecisionGrid(vertex);
          
          return {
            x: precisionPos.x,
            y: precisionPos.y,
            label: "", // No label
            vertexIndex: index, // Store index to identify vertex (0=A, 1=B, 2=C)
            vertexLabel: vertexLabels[index] // Store label for identification
          };
        });
        
        return {
          id: "page4-protractor",
          name: "page4-protractor",
          type: "custom",
          coordinates: [900, 450, 900, 450], // Center position to the right of the shape
          zIndex: 10000,
        props: {
            componentType: "ProtractorComponent",
            protractorType: "semicircular",
            mode: "interactive",
            radius: "138gc", // Increased by 15% (120gc * 1.15 = 138gc)
            showArm: true,
            armAngle: 0,
            isDraggable: true,
            isRotatable: true,
            isProtractorRotatable: true,  // Enable rotation of the entire protractor body
            showProtractorRotationHandle: true,  // Show rotation handle to rotate around center
            snapToDegrees: 5,
            armColor: "#0066FF",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            centerMarker: {
              show: true,
              color: "#FF9900",
              borderColor: "#FF9900",
              borderWidth: "3gc",
              size: "24gc",
              innerCircleSize: "8gc",
              animated: false
            },
            // Snap to vertices configuration
            snapMode: "hybrid", // Snap when near, but allow free placement
            snapThreshold: 60, // Distance in pixels to trigger snap
            showSnapIndicators: true, // Show visual indicators
            highlightNearestSnap: true, // Highlight nearest vertex in green
            snapPoints: snapPoints,
            // Measurement arm configuration - uses page4ProtractorFlowConfig
            measurementArm: {
              angleReadingsClickable: true, // Enable clickable angle readings
              onAngleReadingClick: (readingIndex, angle) => {
                console.log(`🖱️ [PageConfig] Angle reading clicked: readingIndex=${readingIndex}, angle=${angle}°`);
                
                if (typeof window === 'undefined') return;
                
                const pageState = window.page4State || 'A';
                const pageStep = window.page4Step || 1;
                
                // Only handle clicks when step = 4 (angle selection step)
                if (pageStep !== 4) return;
                
                // Get config for current state
                const stateConfig = page4ProtractorFlowConfig.states[pageState];
                if (!stateConfig) return;
                
                const stepConfig = stateConfig.steps[4];
                if (!stepConfig || !stepConfig.readingSelection) return;
                
                // Handle dynamic reading selection (for state A)
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const chosenBaseline = stateConfig.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                // Check if correctIndices array exists (for 90° angles - both indices are correct)
                let isCorrect = false;
                if (readingSelection.correctIndices && Array.isArray(readingSelection.correctIndices)) {
                  isCorrect = readingSelection.correctIndices.includes(readingIndex);
                } else {
                  isCorrect = readingIndex === readingSelection.correctIndex;
                }
                
                if (!isCorrect) {
                  // Incorrect reading clicked - play wrong sound, turn red
                  console.log(`❌ [PageConfig] Incorrect reading clicked: readingIndex=${readingIndex}, expected=${readingSelection.correctIndex}`);
                  
                  // Play incorrect sound
                  if (window.playAnswerSound) {
                    window.playAnswerSound(false);
                  }
                  
                  // Set state to indicate incorrect selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.incorrectColor,
                    armColor: readingSelection.incorrectColor
                  };
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.incorrectColor, 
                      armColor: readingSelection.incorrectColor 
                    }
                  }));
                } else {
                  // Correct reading clicked - turn green, update text
                  console.log(`✅ [PageConfig] Correct reading clicked: readingIndex=${readingIndex}`);
                  
                  // Set state to indicate correct selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.correctColor,
                    armColor: readingSelection.correctColor
                  };
                  
                  // Update text box with measurement text from config
                  const textBox = document.getElementById('page4-measurement-text');
                  if (textBox && stepConfig.measurementText) {
                    textBox.innerHTML = stepConfig.measurementText;
                  }
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.correctColor, 
                      armColor: readingSelection.correctColor 
                    }
                  }));
                  
                  // Transition to next state
                  const nextStateInfo = page4ProtractorFlowConfig.helpers.getNextStateAndStep(pageState);
                  if (nextStateInfo.nextState && nextStateInfo.nextState !== 'complete') {
                    const oldState = window.page4State;
                    const oldStep = window.page4Step;
                    window.page4State = nextStateInfo.nextState;
                    window.page4Step = nextStateInfo.nextStep;
                    console.log(`[STATE:page4State] Changed: ${oldState} → ${window.page4State} (Correct reading clicked)`);
                    console.log(`[STATE:page4Step] Changed: ${oldStep} → ${window.page4Step} (Correct reading clicked)`);
                    
                    // Reset angle reading selection for new state
                    window.angleReadingSelected = null;
                    
                    // Dispatch events to notify components
                    window.dispatchEvent(new CustomEvent('page4StateChanged', {
                      detail: { state: window.page4State, oldState: oldState }
                    }));
                    window.dispatchEvent(new CustomEvent('page4StepChanged', {
                      detail: { step: window.page4Step, oldStep: oldStep }
                    }));
                    console.log('📢 [PageConfig] Dispatched page4StateChanged and page4StepChanged events');
                  } else if (nextStateInfo.nextState === 'complete') {
                    console.log('🎉 [PageConfig] All angles measured! Flow complete.');
                    
                    // Set pageState to 'complete'
                    const oldState = window.page4State;
                    window.page4State = 'complete';
                    console.log(`[STATE:page4State] Changed: ${oldState} → complete (All angles measured)`);
                    
                    // Dispatch pageStateChanged event
                    window.dispatchEvent(new CustomEvent('page4StateChanged', {
                      detail: { state: 'complete', oldState: oldState }
                    }));
                    
                    // Dispatch quizCompleted event to enable next button
                    if (typeof window !== 'undefined') {
                      const quizCompletedEvent = new CustomEvent('quizCompleted', {
                        detail: {
                          pageNumber: 4,
                          componentType: 'ProtractorComponent',
                          componentId: 'page4-protractor'
                        }
                      });
                      window.dispatchEvent(quizCompletedEvent);
                      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 4');
                    }
                  }
                }
              }
            },
            // Callback when protractor position changes (during drag)
            onPositionChange: (position, snapPoint) => {
              if (position && typeof window !== 'undefined') {
                // Convert pixel position to grid coordinates
                const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                
                const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
                
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                
                // Store protractor center position in GC units (grid coordinates)
                const oldPos = window.protractorCenterPosition;
                window.protractorCenterPosition = {
                  x: gridX,
                  y: gridY
                };
                
                if (!oldPos || oldPos.x !== gridX || oldPos.y !== gridY) {
                  console.log(`[STATE:protractorPosition] Changed: (${oldPos?.x || 'N/A'}, ${oldPos?.y || 'N/A'}) → (${gridX}, ${gridY}) [PageConfig - position update]`);
                }
                
                // Note: protractorPositionChanged event is already dispatched by ProtractorComponent
                // in handleDragMove (with isDragging: true) and handleDragEnd (with isDragging: false)
                // We only update window.protractorCenterPosition here for other components that need it
              }
            },
            // Callback when protractor snaps to a vertex - uses page4ProtractorFlowConfig
            onSnapToPoint: (snapPoint) => {
              console.log('📍 [PageConfig] Protractor snapped to:', snapPoint);
              
              if (typeof window === 'undefined' || !snapPoint) {
                console.warn('⚠️ [PageConfig] onSnapToPoint: window or snapPoint is undefined');
                return;
              }
              
              const pageState = window.page4State || 'C';
              const pageStep = window.page4Step !== undefined && window.page4Step !== null ? window.page4Step : 1;
              
              console.log(`🔍 [PageConfig] onSnapToPoint: pageState=${pageState}, pageStep=${pageStep}, window.page4Step=${window.page4Step}`);
              
              // Only handle snap when step = 1 (dragging to vertex step)
              if (pageStep !== 1) {
                console.log(`⚠️ [PageConfig] onSnapToPoint: Skipping - pageStep is ${pageStep}, not 1`);
                return;
              }
              
              // Get config for current state
              const stateConfig = page4ProtractorFlowConfig.states[pageState];
              if (!stateConfig) {
                console.warn(`⚠️ [PageConfig] onSnapToPoint: No state config found for state ${pageState}`);
                return;
              }
              
              // Check if snapped to the target vertex for current state
              const targetVertexIndex = stateConfig.targetVertexIndex;
              const targetVertex = stateConfig.targetVertex;
              
              console.log(`🔍 [PageConfig] onSnapToPoint: Checking snap - snapPoint.vertexIndex=${snapPoint.vertexIndex}, snapPoint.vertexLabel=${snapPoint.vertexLabel}, targetVertexIndex=${targetVertexIndex}, targetVertex=${targetVertex}`);
              
              if (snapPoint.vertexIndex === targetVertexIndex || snapPoint.vertexLabel === targetVertex) {
                const oldStep = window.page4Step !== undefined && window.page4Step !== null ? window.page4Step : 1;
                window.page4Step = 2;
                console.log(`[STATE:page4Step] Changed: ${oldStep} → ${window.page4Step} (Protractor snapped to vertex ${targetVertex})`);
                console.log(`✅ [PageConfig] Protractor on vertex ${targetVertex} - set page4Step: ${oldStep} → ${window.page4Step}`);
                
                // Dispatch event to notify components
                const event = new CustomEvent('page4StepChanged', { 
                  detail: { step: 2, oldStep: oldStep } 
                });
                window.dispatchEvent(event);
                console.log('📢 [PageConfig] Dispatched page4StepChanged event');
              } else {
                console.log(`📍 [PageConfig] Protractor snapped to vertex ${snapPoint.vertexLabel}, but target is ${targetVertex} (state=${pageState})`);
              }
            }
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page4State
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: A (index 0), B (index 1), C (index 2)
        const vertexA = triangleVertices[0];
        const vertexB = triangleVertices[1];
        const vertexC = triangleVertices[2];
        const vertexAPos = quadGridToPrecisionGrid(vertexA);
        const vertexBPos = quadGridToPrecisionGrid(vertexB);
        const vertexCPos = quadGridToPrecisionGrid(vertexC);
        
        // Protractor center position
        const protractorCenterX = 900;
        const protractorCenterY = 450;
        
        return {
          id: "page4-animated-dot",
          name: "page4-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page2State
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page4ProtractorFlowConfig
      {
        id: "page4-measurement-text",
        name: "page4-measurement-text",
        coordinates: [900, 150, 1200, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page4State ? window.page4State : 'A';
            const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page4ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page4ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                // Check if correctIndices array exists (for 90° angles - both indices are correct)
                let isCorrect = false;
                if (readingSelection && readingSelection.correctIndices && Array.isArray(readingSelection.correctIndices)) {
                  isCorrect = readingSelection.correctIndices.includes(selectedReading.readingIndex);
                } else if (readingSelection) {
                  isCorrect = selectedReading.readingIndex === readingSelection.correctIndex;
                }
                
                if (isCorrect) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      },

      // Navigation buttons
      {
        id: "page4-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[4];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page4-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page4-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[4];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    5: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page5-left-column",
        name: "page5-left-column",
        coordinates: [5, 85, 895, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page5-right-column",
        name: "page5-right-column",
        coordinates: [900, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Quiz Panel - Classify the triangle by its angles
      {
        id: 'page5-quiz-panel',
        name: 'page5-quiz-panel',
        type: 'custom',
        coordinates: [920, 100, 1580, 740], // Positioned in the right column
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page5-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT3R', // 3 options in vertical layout
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page5.quizPanel.questionText", "Please choose the correct type of triangle for the triangle whose angles we just measured"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 30, // Question row: 20%
          optionsRowHeight: 50, // Options row: 50%
          feedbackRowHeight: 30, // Feedback row: 30%
          optionButtonWidth: 80,
          optionButtonHeight: 75,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT3 (3 options in vertical layout)
          // Second option (Right Triangle) is correct
          options: [
            {
              id: 'acute',
              text: getI18nText("pages.page5.quizPanel.options.0.text", "Acute Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page5.quizPanel.options.0.feedback", "Incorrect. An acute triangle has all angles less than 90°.")
            },
            {
              id: 'right',
              text: getI18nText("pages.page5.quizPanel.options.1.text", "Right Triangle"),
              iscorrect: true,
              feedback: getI18nText("pages.page5.quizPanel.options.1.feedback", "Correct! A right triangle has one angle equal to 90°.")
            },
            {
              id: 'obtuse',
              text: getI18nText("pages.page5.quizPanel.options.2.text", "Obtuse Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page5.quizPanel.options.2.feedback", "Incorrect. An obtuse triangle has one angle greater than 90°.")
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Header - Orange text
      {
        id: "page5-header",
        name: "page5-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.headerText", "Now, classify the triangle by its angles."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text
      {
        id: "page5-instruction",
        name: "page5-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page5.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Shape display - QuadrilateralComponent (Right-Angle Triangle)
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page2State`);
          const pageState = typeof window !== 'undefined' && window.page2State ? window.page2State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page2StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // RIGHT_ANGLE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels (hotspots disabled for page 5 in component)
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - no blinking on page 5
              vertexAnimations: [false, false, false],
              // Individual x/y offsets for each label (in gc units) - same as page 2
              labelOffsets: [
                { x: "-2gc", y: "-40gc" }, // A: top-left
                { x: "-20gc", y: "40gc" },  // B: top-right
                { x: "0gc", y: "40gc" }     // C: bottom-center
              ]
            },
            effectiveAngleConfig: {
              show: 'all', // Always show angle markers on page 5
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: true, // Always show text on page 5
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement, not the angle name
              // Per-vertex angle configuration - right-angle triangle: ∠D = 60°, ∠E = 90°, ∠F = 30°
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 60, // Right-angle triangle: ∠D = 60° (vertex 0)
                  textMode: 'measure', // Show only "60°"
                  size: "40gc", // Arc size
                  thickness: "4gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.7, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleB: {
                interiorAngle: {
                  show: false, // Don't show arc - let right angle square show instead
                  showText: true,
                  angle: 90, // Right-angle triangle: ∠E = 90° (vertex 1, right angle)
                  textMode: 'measure', // Show only "90°"
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 30, // Right-angle triangle: ∠F = 30° (vertex 2)
                  textMode: 'measure', // Show only "30°"
                  size: "75gc", // Arc size
                  thickness: "4gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.7, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleBInteriorAngle: props.effectiveAngleConfig?.angleB?.interiorAngle,
            angleBShow: props.effectiveAngleConfig?.angleB?.interiorAngle?.show,
            angleBAngle: props.effectiveAngleConfig?.angleB?.interiorAngle?.angle,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page5ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page5-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [88, 135, 813, 780], // Centered horizontally within left panel (left panel: [5, 85, 895, 800], center at 450)
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page2State
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: A (index 0), B (index 1), C (index 2)
        const vertexA = triangleVertices[0];
        const vertexB = triangleVertices[1];
        const vertexC = triangleVertices[2];
        const vertexAPos = quadGridToPrecisionGrid(vertexA);
        const vertexBPos = quadGridToPrecisionGrid(vertexB);
        const vertexCPos = quadGridToPrecisionGrid(vertexC);
        
        // Protractor center position
        const protractorCenterX = 900;
        const protractorCenterY = 450;
        
        return {
          id: "page5-animated-dot",
          name: "page5-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page2State
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page2ProtractorFlowConfig
      {
        id: "page5-measurement-text",
        name: "page5-measurement-text",
        coordinates: [900, 150, 1200, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page2State ? window.page2State : 'A';
            const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page2ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                if (readingSelection && selectedReading.readingIndex === readingSelection.correctIndex) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      },

      // Navigation buttons
      {
        id: "page5-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[5];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page5-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page5-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[5];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    6: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page6-left-column",
        name: "page6-left-column",
        coordinates: [5, 85, 1195, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page6-right-column",
        name: "page6-right-column",
        coordinates: [1200, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent", // Transparent - step-component has its own background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Header - Orange text
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let us measure the angles of the △ABC using a protractor"),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - uses page2ProtractorFlowConfig
      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component in right column
      {
        id: "page6-steps",
        name: "page6-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800], // Positioned in the right column
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page4.solutionSteps.headerText", "Steps to measure an angle of △"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const stepsArray = getI18nText("pages.page4.solutionSteps.steps", ["Center the protractor on any vertex.", "Rotate the protractor to align the 0° baseline with one arm of the angle.", "Move the slider to measure the angle."]);
            return Array.isArray(stepsArray) ? stepsArray.map((text, idx) => ({ text: text || ["Center the protractor on any vertex.", "Rotate the protractor to align the 0° baseline with one arm of the angle.", "Move the slider to measure the angle."][idx] })) : [
              { text: "Center the protractor on any vertex." },
              { text: "Rotate the protractor to align the 0° baseline with one arm of the angle." },
              { text: "Move the slider to measure the angle." }
            ];
          })(),
          containerBackgroundColor: "rgba(0, 0, 0, 0.3)",
          containerBackgroundOpacity: 0.5,
          containerBorderRadius: "12gc",
          containerPadding: "20gc",
          gap: "12gc"
        }
      },

      // Shape display - QuadrilateralComponent (Obtuse-Angle Triangle)
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page6State`);
          const pageState = typeof window !== 'undefined' && window.page6State ? window.page6State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page6StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // OBTUSE_ANGLE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - will be checked dynamically in component
              vertexAnimations: [false, false, false], // Default: no blinking, component will check page6State dynamically
              // Individual x/y offsets for each label (in gc units)
              // Obtuse triangle: A (top at row 4.068297, col 3.620892), B (bottom-left at row 6, col 2), C (bottom-right at row 6, col 8.928203)
              labelOffsets: [
                { x: "-20gc", y: "-40gc" }, // A: top-left (vertex 0 = top vertex D)
                { x: "-40gc", y: "40gc" },  // B: bottom-left (vertex 1 = bottom-left E)
                { x: "40gc", y: "40gc" }    // C: bottom-right (vertex 2 = bottom-right F)
              ]
            },
            effectiveAngleConfig: {
              show: isComplete ? 'all' : 'none',
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: isComplete,
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement, not the angle name
              // Per-vertex angle configuration - obtuse triangle: ∠EDF = 110° (at D), ∠DEF = 50° (at E), ∠DFE = 20° (at F)
              ...(isComplete ? {
                angleA: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 110, // Obtuse triangle: ∠EDF = 110° (at D, vertex 0 = A) - obtuse angle
                    textMode: 'measure', // Show only "110°"
                    size: "30gc", // Arc size
                    thickness: "4gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.4, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleB: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 50, // Obtuse triangle: ∠DEF = 50° (at E, vertex 1 = B)
                    textMode: 'measure', // Show only "50°"
                    size: "30gc", // Arc size
                    thickness: "4gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.4, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                },
                angleC: {
                  interiorAngle: {
                    show: true,
                    showText: true,
                    angle: 20, // Obtuse triangle: ∠DFE = 20° (at F, vertex 2 = C)
                    textMode: 'measure', // Show only "20°"
                    size: "100gc", // Arc size
                    thickness: "4gc", // Arc thickness
                    color: "#FF6600", // Orange
                    fill: true, // Enable fill
                    fillColor: "#FF6600", // Orange fill
                    fillOpacity: 0.4, // 40% opacity
                    textSize: "30gc" // Angle measure label size
                  }
                }
              } : {})
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page6ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page6-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [-25, 135, 700, 780],
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Protractor component - positioned to the right of the shape
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Convert triangle vertices from local grid (10x10) to precision grid coordinates
        // Use the same conversion method as QuadrilateralComponent's quadGridToPrecisionGrid
        const precisionGridRows = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
        const precisionGridCols = typeof GridPrecisionConfig !== 'undefined' ? 
          GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        // Container size in GC units
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        
        // Grid size in GC units (accounting for centered grid)
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        
        // Offset to center the grid within container
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        // This matches QuadrilateralComponent's quadGridToPrecisionGrid with forHotspot: true
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          // Calculate position within centered grid (0-1 range)
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          
          // Map to actual position within container (accounting for centered grid)
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Create snap points for each vertex - ensure order matches labels [A, B, C]
        // Triangle vertices order: [0] = A (top), [1] = B (bottom-left), [2] = C (bottom-right)
        const vertexLabels = ['A', 'B', 'C'];
        const snapPoints = triangleVertices.map((vertex, index) => {
          const precisionPos = quadGridToPrecisionGrid(vertex);
          
          return {
            x: precisionPos.x,
            y: precisionPos.y,
            label: "", // No label
            vertexIndex: index, // Store index to identify vertex (0=A, 1=B, 2=C)
            vertexLabel: vertexLabels[index] // Store label for identification
          };
        });
        
        return {
          id: "page6-protractor",
          name: "page6-protractor",
          type: "custom",
          coordinates: [900, 450, 900, 450], // Center position to the right of the shape
          zIndex: 10000,
        props: {
            componentType: "ProtractorComponent",
            protractorType: "semicircular",
            mode: "interactive",
            radius: "138gc", // Increased by 15% (120gc * 1.15 = 138gc)
            showArm: true,
            armAngle: 0,
            isDraggable: true,
            isRotatable: true,
            isProtractorRotatable: true,  // Enable rotation of the entire protractor body
            showProtractorRotationHandle: true,  // Show rotation handle to rotate around center
            snapToDegrees: 5,
            armColor: "#0066FF",
            color: "#333",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            centerMarker: {
              show: true,
              color: "#FF9900",
              borderColor: "#FF9900",
              borderWidth: "3gc",
              size: "24gc",
              innerCircleSize: "8gc",
              animated: false
            },
            // Snap to vertices configuration
            snapMode: "hybrid", // Snap when near, but allow free placement
            snapThreshold: 60, // Distance in pixels to trigger snap
            showSnapIndicators: true, // Show visual indicators
            highlightNearestSnap: true, // Highlight nearest vertex in green
            snapPoints: snapPoints,
            // Measurement arm configuration - uses page2ProtractorFlowConfig
            measurementArm: {
              angleReadingsClickable: true, // Enable clickable angle readings
              onAngleReadingClick: (readingIndex, angle) => {
                console.log(`🖱️ [PageConfig] Angle reading clicked: readingIndex=${readingIndex}, angle=${angle}°`);
                
                if (typeof window === 'undefined') return;
                
                const pageState = window.page6State || 'A';
                const pageStep = window.page6Step || 1;
                
                // Only handle clicks when step = 4 (angle selection step)
                if (pageStep !== 4) return;
                
                // Get config for current state
                const stateConfig = page6ProtractorFlowConfig.states[pageState];
                if (!stateConfig) return;
                
                const stepConfig = stateConfig.steps[4];
                if (!stepConfig || !stepConfig.readingSelection) return;
                
                // Handle dynamic reading selection (for state A)
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const chosenBaseline = stateConfig.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                const isCorrect = readingIndex === readingSelection.correctIndex;
                
                if (!isCorrect) {
                  // Incorrect reading clicked - play wrong sound, turn red
                  console.log(`❌ [PageConfig] Incorrect reading clicked: readingIndex=${readingIndex}, expected=${readingSelection.correctIndex}`);
                  
                  // Play incorrect sound
                  if (window.playAnswerSound) {
                    window.playAnswerSound(false);
                  }
                  
                  // Set state to indicate incorrect selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.incorrectColor,
                    armColor: readingSelection.incorrectColor
                  };
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.incorrectColor, 
                      armColor: readingSelection.incorrectColor 
                    }
                  }));
                } else {
                  // Correct reading clicked - turn green, update text
                  console.log(`✅ [PageConfig] Correct reading clicked: readingIndex=${readingIndex}`);
                  
                  // Set state to indicate correct selection
                  window.angleReadingSelected = {
                    readingIndex: readingIndex,
                    color: readingSelection.correctColor,
                    armColor: readingSelection.correctColor
                  };
                  
                  // Update text box with measurement text from config
                  const textBox = document.getElementById('page6-measurement-text');
                  if (textBox && stepConfig.measurementText) {
                    textBox.innerHTML = stepConfig.measurementText;
                  }
                  
                  // Dispatch event to update protractor component
                  window.dispatchEvent(new CustomEvent('angleReadingSelected', {
                    detail: { 
                      readingIndex: readingIndex, 
                      color: readingSelection.correctColor, 
                      armColor: readingSelection.correctColor 
                    }
                  }));
                  
                  // Transition to next state
                  const nextStateInfo = page6ProtractorFlowConfig.helpers.getNextStateAndStep(pageState);
                  if (nextStateInfo.nextState && nextStateInfo.nextState !== 'complete') {
                    const oldState = window.page6State;
                    const oldStep = window.page6Step;
                    window.page6State = nextStateInfo.nextState;
                    window.page6Step = nextStateInfo.nextStep;
                    console.log(`[STATE:page6State] Changed: ${oldState} → ${window.page6State} (Correct reading clicked)`);
                    console.log(`[STATE:page6Step] Changed: ${oldStep} → ${window.page6Step} (Correct reading clicked)`);
                    
                    // Reset angle reading selection for new state
                    window.angleReadingSelected = null;
                    
                    // Dispatch events to notify components
                    window.dispatchEvent(new CustomEvent('page6StateChanged', {
                      detail: { state: window.page6State, oldState: oldState }
                    }));
                    window.dispatchEvent(new CustomEvent('page6StepChanged', {
                      detail: { step: window.page6Step, oldStep: oldStep }
                    }));
                    console.log('📢 [PageConfig] Dispatched page6StateChanged and page6StepChanged events');
                  } else if (nextStateInfo.nextState === 'complete') {
                    console.log('🎉 [PageConfig] All angles measured! Flow complete.');
                    
                    // Set pageState to 'complete'
                    const oldState = window.page6State;
                    window.page6State = 'complete';
                    console.log(`[STATE:page6State] Changed: ${oldState} → complete (All angles measured)`);
                    
                    // Dispatch page6StateChanged event
                    window.dispatchEvent(new CustomEvent('page6StateChanged', {
                      detail: { state: 'complete', oldState: oldState }
                    }));
                    
                    // Dispatch quizCompleted event to enable next button
                    if (typeof window !== 'undefined') {
                      const quizCompletedEvent = new CustomEvent('quizCompleted', {
                        detail: {
                          pageNumber: 6,
                          componentType: 'ProtractorComponent',
                          componentId: 'page6-protractor'
                        }
                      });
                      window.dispatchEvent(quizCompletedEvent);
                      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 6');
                    }
                  }
                }
              }
            },
            // Callback when protractor position changes (during drag)
            onPositionChange: (position, snapPoint) => {
              if (position && typeof window !== 'undefined') {
                // Convert pixel position to grid coordinates
                const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
                  GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                
                const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
                const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
                
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                
                // Store protractor center position in GC units (grid coordinates)
                const oldPos = window.protractorCenterPosition;
                window.protractorCenterPosition = {
                  x: gridX,
                  y: gridY
                };
                
                if (!oldPos || oldPos.x !== gridX || oldPos.y !== gridY) {
                  console.log(`[STATE:protractorPosition] Changed: (${oldPos?.x || 'N/A'}, ${oldPos?.y || 'N/A'}) → (${gridX}, ${gridY}) [PageConfig - position update]`);
                }
                
                // Note: protractorPositionChanged event is already dispatched by ProtractorComponent
                // in handleDragMove (with isDragging: true) and handleDragEnd (with isDragging: false)
                // We only update window.protractorCenterPosition here for other components that need it
              }
            },
            // Callback when protractor snaps to a vertex - uses page6ProtractorFlowConfig
            onSnapToPoint: (snapPoint) => {
              console.log('📍 [PageConfig] Protractor snapped to:', snapPoint);
              
              if (typeof window === 'undefined' || !snapPoint) return;
              
              const pageState = window.page6State || 'C';
              const pageStep = window.page6Step !== undefined && window.page6Step !== null ? window.page6Step : 1;
              
              console.log(`🔍 [PageConfig] onSnapToPoint: pageState=${pageState}, pageStep=${pageStep}, window.page6Step=${window.page6Step}`);
              
              // Only handle snap when step = 1 (dragging to vertex step)
              if (pageStep !== 1) {
                console.log(`⚠️ [PageConfig] onSnapToPoint: Skipping - pageStep is ${pageStep}, not 1`);
                return;
              }
              
              // Get config for current state
              const stateConfig = page6ProtractorFlowConfig.states[pageState];
              if (!stateConfig) {
                console.warn(`⚠️ [PageConfig] onSnapToPoint: No state config found for state ${pageState}`);
                return;
              }
              
              // Check if snapped to the target vertex for current state
              const targetVertexIndex = stateConfig.targetVertexIndex;
              const targetVertex = stateConfig.targetVertex;
              
              console.log(`🔍 [PageConfig] onSnapToPoint: Checking snap - snapPoint.vertexIndex=${snapPoint.vertexIndex}, snapPoint.vertexLabel=${snapPoint.vertexLabel}, targetVertexIndex=${targetVertexIndex}, targetVertex=${targetVertex}`);
              
              if (snapPoint.vertexIndex === targetVertexIndex || snapPoint.vertexLabel === targetVertex) {
                const oldStep = window.page6Step;
                window.page6Step = 2;
                console.log(`[STATE:page6Step] Changed: ${oldStep} → ${window.page6Step} (Protractor snapped to vertex ${targetVertex})`);
                console.log(`✅ [PageConfig] Protractor on vertex ${targetVertex} - set page6Step: ${oldStep} → ${window.page6Step}`);
                
                // Dispatch event to notify components
                const event = new CustomEvent('page6StepChanged', { 
                  detail: { step: 2, oldStep: oldStep } 
                });
                window.dispatchEvent(event);
                console.log('📢 [PageConfig] Dispatched page6StepChanged event');
              } else {
                console.log(`📍 [PageConfig] Protractor snapped to vertex ${snapPoint.vertexLabel}, but target is ${targetVertex}`);
              }
            }
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page6State
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: D (index 0, state A), E (index 1, state B), F (index 2, state C)
        // Obtuse triangle: D (∠EDF = 110°), E (∠DEF = 50°), F (∠DFE = 20°)
        const vertexD = triangleVertices[0]; // State A → vertex D (110°)
        const vertexE = triangleVertices[1]; // State B → vertex E (50°)
        const vertexF = triangleVertices[2]; // State C → vertex F (20°)
        const vertexAPos = quadGridToPrecisionGrid(vertexD); // State A maps to vertex D
        const vertexBPos = quadGridToPrecisionGrid(vertexE); // State B maps to vertex E
        const vertexCPos = quadGridToPrecisionGrid(vertexF); // State C maps to vertex F
        
        // Protractor center position
        const protractorCenterX = 900;
        const protractorCenterY = 450;
        
        return {
          id: "page6-animated-dot",
          name: "page6-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page6State
            // State A → vertex D (110°), State B → vertex E (50°), State C → vertex F (20°)
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page6ProtractorFlowConfig
      {
        id: "page6-measurement-text",
        name: "page6-measurement-text",
        coordinates: [900, 150, 1200, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page6State ? window.page6State : 'A';
            const step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page6ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page6ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                if (readingSelection && selectedReading.readingIndex === readingSelection.correctIndex) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      },

      // Navigation buttons
      {
        id: "page6-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[6];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page6-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page6-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[6];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    7: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page7-left-column",
        name: "page7-left-column",
        coordinates: [5, 85, 895, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page7-right-column",
        name: "page7-right-column",
        coordinates: [900, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Same as step-component background
          borderWidth: "1gc", // Border thickness: 1gc
          borderStyle: "solid",
          borderColor: "#1ABC9C", // Teal color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Quiz Panel - Classify the triangle by its angles
      {
        id: 'page7-quiz-panel',
        name: 'page7-quiz-panel',
        type: 'custom',
        coordinates: [920, 100, 1580, 740], // Positioned in the right column
        zIndex: 55, // Above other content
        props: {
          componentType: 'QuizPanelComponent',
          quizId: 'page7-quiz', // Unique identifier for this quiz
          quizType: 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
          quizSubtype: 'QT3R', // 3 options in vertical layout
          headerText: '',
          backgroundColor: "transparent",
          questionText: getI18nText("pages.page7.quizPanel.questionText", "Please choose the correct type of triangle for the triangle whose angles we just measured"),
          feedbackText: '',
          headerRowHeight: 0, // No header row
          questionRowHeight: 30, // Question row: 20%
          optionsRowHeight: 50, // Options row: 50%
          feedbackRowHeight: 30, // Feedback row: 30%
          optionButtonWidth: 80,
          optionButtonHeight: 75,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT3 (3 options in vertical layout)
          // Third option (Obtuse Triangle) is correct
          options: [
            {
              id: 'acute',
              text: getI18nText("pages.page7.quizPanel.options.0.text", "Acute Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page7.quizPanel.options.0.feedback", "Incorrect. An acute triangle has all angles less than 90°.")
            },
            {
              id: 'right',
              text: getI18nText("pages.page7.quizPanel.options.1.text", "Right Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page7.quizPanel.options.1.feedback", "Incorrect. A right triangle has one angle equal to 90°.")
            },
            {
              id: 'obtuse',
              text: getI18nText("pages.page7.quizPanel.options.2.text", "Obtuse Triangle"),
              iscorrect: true,
              feedback: getI18nText("pages.page7.quizPanel.options.2.feedback", "Correct! An obtuse triangle has one angle greater than 90°.")
            }
          ],
          keyConcepts: [],
          impFormulae: []
        }
      },

      // Header - Orange text
      {
        id: "page7-header",
        name: "page7-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.headerText", "Now, classify the triangle by its angles."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text
      {
        id: "page7-instruction",
        name: "page7-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page7.instruction", "Choose the correct answer"),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },

      // Shape display - QuadrilateralComponent (Obtuse-Angle Triangle)
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        
        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page6State`);
          const pageState = typeof window !== 'undefined' && window.page6State ? window.page6State : null;
          const isComplete = pageState === 'complete';
          
          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);
          
          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page6StateKey: pageState || 'A', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // OBTUSE_ANGLE_TRIANGLE from constants.js
            vertices: shapeConfig.vertices, // Triangle vertices from constants.js (3 vertices)
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false, // No diagonals for triangle
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false, // Set to true if you want the shape to be draggable
            edgeColor: "#F08080", // Border color (light coral/salmon)
            edgeThickness: "6gc", // Increased border width
            fillColor: "#25CEFC", // Fill color (light blue/cyan)
            vertexConfig: {
              color: "#FF9900", // Highlight vertices with orange color
              showLabels: true, // Show vertex labels (hotspots disabled for page 7 in component)
              animated: false, // Disable pulsating animation (global default)
              labels: ["A", "B", "C"], // 3 vertices for triangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C] - no blinking on page 7
              vertexAnimations: [false, false, false],
              // Individual x/y offsets for each label (in gc units) - same as page 2
              labelOffsets: [
                { x: "-2gc", y: "-40gc" }, // A: top-left
                { x: "-20gc", y: "40gc" },  // B: top-right
                { x: "0gc", y: "40gc" }     // C: bottom-center
              ]
            },
            effectiveAngleConfig: {
              show: 'all', // Always show angle markers on page 7
              markerColor: "#FF6600",
              markerSize: "30gc", // Arc size
              showText: true, // Always show text on page 7
              textColor: "#000000", // Black text color for angle labels
              textSize: "28gc", // Angle measure label size
              textMode: 'measure', // Show only the measurement, not the angle name
              // Per-vertex angle configuration - obtuse triangle: ∠EDF = 110° (at D), ∠DEF = 50° (at E), ∠DFE = 20° (at F)
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 110, // Obtuse triangle: ∠EDF = 110° (at D, vertex 0 = A) - obtuse angle
                  textMode: 'measure', // Show only "110°"
                  size: "30gc", // Arc size
                  thickness: "4gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.4, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleB: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 50, // Obtuse triangle: ∠DEF = 50° (at E, vertex 1 = B)
                  textMode: 'measure', // Show only "50°"
                  size: "30gc", // Arc size
                  thickness: "4gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.4, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 20, // Obtuse triangle: ∠DFE = 20° (at F, vertex 2 = C)
                  textMode: 'measure', // Show only "20°"
                  size: "100gc", // Arc size
                  thickness: "4gc", // Arc thickness
                  color: "#FF6600", // Orange
                  fill: true, // Enable fill
                  fillColor: "#FF6600", // Orange fill
                  fillOpacity: 0.4, // 40% opacity
                  textSize: "30gc" // Angle measure label size
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000, // 2 seconds for fold animation
              holdTime: 1500, // 1.5 seconds to hold at folded position
              foldLineColor: "#FFFFFF", // White dashed fold line
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)", // Semi-transparent brown-red
              mismatchColor: "#00FFFF", // Cyan for mismatch highlight
              showAxisAlways: false, // Always show axis lines (not just during animation)
              triangleAxes: [], // For triangles: array of vertex indices (0=A, 1=B, 2=C) through which axes pass - show all three axes
              showVerticalAxis: false, // Not used for triangles
              showHorizontalAxis: false, // Not used for triangles
              showDiagonalAxis: false, // Not used for triangles
              clickableAxis: true, // Make axis lines clickable to toggle symmetry animation
              axisExtension: 5 // How much the axis lines extend beyond the shape
            },
            // Side symbols - tick marks to show equal sides
            sideSymbols: [],
          };
          
          console.log(`🔍 [PageConfig] getProps returning props with effectiveAngleConfig:`, {
            effectiveAngleConfig: props.effectiveAngleConfig,
            angleA: props.effectiveAngleConfig?.angleA,
            angleB: props.effectiveAngleConfig?.angleB,
            angleC: props.effectiveAngleConfig?.angleC
          });
          
          return props;
        };
        
        // Store getProps function in window so component can call it directly
        if (typeof window !== 'undefined') {
          window.page7ShapeDisplayGetProps = getProps;
        }
        
        return {
          id: "page7-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: [-181, -26, 906, 941], // 1.5x bigger, moved 25gc right (was [-206, -26, 881, 941])
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Animated dot moving from protractor center to vertex based on page6State
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        
        // Triangle container coordinates
        const triangleCoords = [-25, 135, 700, 780];
        const triangleLeft = triangleCoords[0];
        const triangleTop = triangleCoords[1];
        const triangleRight = triangleCoords[2];
        const triangleBottom = triangleCoords[3];
        const triangleWidth = triangleRight - triangleLeft;
        const triangleHeight = triangleBottom - triangleTop;
        
        // Calculate grid dimensions (matching QuadrilateralComponent's gridDimensions calculation)
        const containerWidthGc = triangleRight - triangleLeft + 1;
        const containerHeightGc = triangleBottom - triangleTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        
        // Helper function to convert quad grid coordinates to precision grid coordinates
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = triangleLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = triangleTop + offsetYGc + percentY * gridHeightGc;
          return {
            x: Math.round(actualX),
            y: Math.round(actualY)
          };
        };
        
        // Get all vertex positions: A (index 0), B (index 1), C (index 2)
        const vertexA = triangleVertices[0];
        const vertexB = triangleVertices[1];
        const vertexC = triangleVertices[2];
        const vertexAPos = quadGridToPrecisionGrid(vertexA);
        const vertexBPos = quadGridToPrecisionGrid(vertexB);
        const vertexCPos = quadGridToPrecisionGrid(vertexC);
        
        // Protractor center position
        const protractorCenterX = 900;
        const protractorCenterY = 450;
        
        return {
          id: "page7-animated-dot",
          name: "page7-animated-dot",
          type: "custom",
          coordinates: [protractorCenterX, protractorCenterY, protractorCenterX, protractorCenterY], // Start position
          zIndex: 10001, // Above protractor
          props: {
            componentType: "AnimatedDotComponent",
            startX: protractorCenterX,
            startY: protractorCenterY,
            // Pass all vertex positions - component will choose based on page2State
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with angle measurement - uses page2ProtractorFlowConfig
      {
        id: "page7-measurement-text",
        name: "page7-measurement-text",
        coordinates: [900, 150, 1200, 500],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page2State ? window.page2State : 'A';
            const step = typeof window !== 'undefined' && window.page2Step !== undefined ? window.page2Step : 1;
            
            // Only show measurement text when step = 4 and correct reading is selected
            if (step === 4) {
              const selectedReading = typeof window !== 'undefined' && window.angleReadingSelected;
              const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
              
              if (selectedReading && stepConfig) {
                // Check if correct reading is selected
                let readingSelection = stepConfig.readingSelection;
                if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
                  const stateConfig = page2ProtractorFlowConfig.states[state];
                  const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                  if (chosenBaseline) {
                    readingSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
                  }
                }
                
                if (readingSelection && selectedReading.readingIndex === readingSelection.correctIndex) {
                  return stepConfig.measurementText || "";
                }
              }
              return "";
            }
            return "";
          })(),
          fontSize: "40gc",
          color: "var(--color-orange)",
          textAlign: "left",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          allowHTML: true, // Allow HTML for mathematical notation
        },
      },

      // Navigation buttons
      {
        id: "page7-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.next", "»");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }
            const nav = pageNavigation[7];
            if (nav && nav.next) {
              navigateToPage(nav.next, "next");
            }
          },
        },
      },

      {
        id: "page7-tap-next",
        name: "tap-gif",
        type: "custom",
        coordinates: [1450, 840, 1500, 890],
        zIndex: "var(--z-button)",
        props: {
          componentType: "TapGifComponent",
          imageSrc: "assets/tap.gif",
          imageAlt: getI18nText("common.tapAlt", "Tap"),
        },
      },

      {
        id: "page7-previous-button",
        name: "previous-button",
        type: "button",
        coordinates: [5, 820, 150, 895],
        zIndex: "var(--z-button)",
        props: {
          get text() {
            return getI18nText("buttons.previous", "«");
          },
          onClick: () => {
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("previous");
            }
            const nav = pageNavigation[7];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },
    ],
    8: [
      // Header text
      {
        id: "page8-header",
        name: "page8-header",
        coordinates: [200, 50, 1400, 150],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.headerText", "We classified the triangles based on how many angles are equal."),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },
      // Shape 1: Acute Triangle (from page 3) - left position
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        
        const getProps = () => {
          const props = {
            componentType: "QuadrilateralComponent",
            mode: "default",
            quadType: shapeConfig.quadType,
            vertices: shapeConfig.vertices,
            gridRows: shapeConfig.gridRows,
            gridCols: shapeConfig.gridCols,
            showGrid: false,
            showDiagonals: false,
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false,
            edgeColor: "#F08080",
            edgeThickness: "6gc",
            fillColor: "#25CEFC",
            vertexConfig: null,
            effectiveAngleConfig: {
              show: 'all',
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: true,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure',
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 50,
                  textMode: 'measure',
                  size: "40gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.7,
                  textSize: "30gc"
                }
              },
              angleB: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 60,
                  textMode: 'measure',
                  size: "40gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.7,
                  textSize: "30gc"
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 70,
                  textMode: 'measure',
                  size: "40gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.7,
                  textSize: "30gc"
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000,
              holdTime: 1500,
              foldLineColor: "#FFFFFF",
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)",
              mismatchColor: "#00FFFF",
              showAxisAlways: false,
              triangleAxes: [],
              showVerticalAxis: false,
              showHorizontalAxis: false,
              showDiagonalAxis: false,
              clickableAxis: true,
              axisExtension: 5
            },
            sideSymbols: [],
          };
          return props;
        };
        
        return {
          id: "page8-shape-1-acute",
          name: "page8-shape-1-acute",
          type: "custom",
          coordinates: [100, 165, 500, 565], // Left position, moved up by 85gc total and left by 50gc
          zIndex: 40,
          get props() {
            return getProps();
          }
        };
      })(),
      // Label for Shape 1: Acute Triangle
      {
        id: "page8-label-1",
        name: "page8-label-1",
        coordinates: [100, 460, 425, 510],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.acute", "Acute Triangle"),
          fontSize: "32gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Shape 2: Right-Angle Triangle (from page 5) - center position
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        
        const getProps = () => {
          const props = {
            componentType: "QuadrilateralComponent",
            mode: "default",
            quadType: shapeConfig.quadType,
            vertices: shapeConfig.vertices,
            gridRows: shapeConfig.gridRows,
            gridCols: shapeConfig.gridCols,
            showGrid: false,
            showDiagonals: false,
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false,
            edgeColor: "#F08080",
            edgeThickness: "6gc",
            fillColor: "#25CEFC",
            vertexConfig: null,
            effectiveAngleConfig: {
              show: 'all',
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: true,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure',
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 60,
                  textMode: 'measure',
                  size: "40gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.7,
                  textSize: "30gc"
                }
              },
              angleB: {
                interiorAngle: {
                  show: false,
                  showText: true,
                  angle: 90,
                  textMode: 'measure',
                  textSize: "30gc"
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 30,
                  textMode: 'measure',
                  size: "75gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.7,
                  textSize: "30gc"
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000,
              holdTime: 1500,
              foldLineColor: "#FFFFFF",
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)",
              mismatchColor: "#00FFFF",
              showAxisAlways: false,
              triangleAxes: [],
              showVerticalAxis: false,
              showHorizontalAxis: false,
              showDiagonalAxis: false,
              clickableAxis: true,
              axisExtension: 5
            },
            sideSymbols: [],
          };
          return props;
        };
        
        return {
          id: "page8-shape-2-right",
          name: "page8-shape-2-right",
          type: "custom",
          coordinates: [410, 155, 890, 635], // Center position, 20% bigger (400x400 -> 480x480), moved left by 100gc total, moved up by 55gc
          zIndex: 40,
          get props() {
            return getProps();
          }
        };
      })(),
      // Label for Shape 2: Right Triangle
      {
        id: "page8-label-2",
        name: "page8-label-2",
        coordinates: [410, 460, 890, 510],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.right", "Right Triangle"),
          fontSize: "32gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Shape 3: Obtuse Triangle (from page 7) - right position
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        
        const getProps = () => {
          const props = {
            componentType: "QuadrilateralComponent",
            mode: "default",
            quadType: shapeConfig.quadType,
            vertices: shapeConfig.vertices,
            gridRows: shapeConfig.gridRows,
            gridCols: shapeConfig.gridCols,
            showGrid: false,
            showDiagonals: false,
            showPropertyPanel: false,
            containerBorder: false,
            draggable: false,
            edgeColor: "#F08080",
            edgeThickness: "6gc",
            fillColor: "#25CEFC",
            vertexConfig: null,
            effectiveAngleConfig: {
              show: 'all',
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: true,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure',
              angleA: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 110,
                  textMode: 'measure',
                  size: "30gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.4,
                  textSize: "30gc"
                }
              },
              angleB: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 50,
                  textMode: 'measure',
                  size: "30gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.4,
                  textSize: "30gc"
                }
              },
              angleC: {
                interiorAngle: {
                  show: true,
                  showText: true,
                  angle: 20,
                  textMode: 'measure',
                  size: "100gc",
                  thickness: "4gc",
                  color: "#FF6600",
                  fill: true,
                  fillColor: "#FF6600",
                  fillOpacity: 0.4,
                  textSize: "30gc"
                }
              }
            },
            symmetryAnimationConfig: {
              duration: 2000,
              holdTime: 1500,
              foldLineColor: "#FFFFFF",
              foldLineStyle: "dashed",
              foldedHalfColor: "rgba(139, 69, 69, 0.7)",
              mismatchColor: "#00FFFF",
              showAxisAlways: false,
              triangleAxes: [],
              showVerticalAxis: false,
              showHorizontalAxis: false,
              showDiagonalAxis: false,
              clickableAxis: true,
              axisExtension: 5
            },
            sideSymbols: [],
          };
          return props;
        };
        
        return {
          id: "page8-shape-3-obtuse",
          name: "page8-shape-3-obtuse",
          type: "custom",
          coordinates: [750, -40, 1550, 760], // Right position, 2x bigger (400x400 -> 800x800), moved up by 90gc
          zIndex: 40,
          get props() {
            return getProps();
          }
        };
      })(),
      // Label for Shape 3: Obtuse Triangle
      {
        id: "page8-label-3",
        name: "page8-label-3",
        coordinates: [750, 460, 1550, 510],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.obtuse", "Obtuse Triangle"),
          fontSize: "32gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Instruction text between labels and Start Over button
      {
        id: "page8-instruction",
        name: "page8-instruction",
        coordinates: [200, 600, 1400, 700],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.instructionText", 'Tap "Start Over" to try the activity again.'),
          fontSize: "36gc",
          color: "white",
          textAlign: "center",
          lineHeight: "1.4",
        },
      },
      // Start Over button - Orange/yellow gradient with black text, centered at bottom
      {
        id: "page8-start-button",
        name: "start-button",
        type: "button",
        coordinates: [675, 725, 925, 825], // Moved down by 50gc
        zIndex: "var(--z-button)",
        props: {
          text: getI18nText("buttons.startOver", "Start Over"),
          fontSize: "44gc",
          color: "#000000", // Black text
          backgroundColor: "#FF9900", // Orange background (gradient will be applied via CSS)
          fontWeight: "bold",
          borderRadius: "12gc",
          border: "none",
          textAlign: "center",
          onClick: () => {
            // Play sound
            if (typeof window !== "undefined" && window.playCarClickSound) {
              window.playCarClickSound("next");
            }

            // Reset all page states
            if (typeof window !== "undefined") {
              // Reset all page states
              for (let pageNum = 1; pageNum <= 13; pageNum++) {
                if (window.resetPageStates) {
                  window.resetPageStates(pageNum);
                }
              }
              
              // Reset global states
              if (window.page2State) window.page2State = 'C';
              if (window.page2Step) window.page2Step = 1;
              if (window.page4State) window.page4State = 'C';
              if (window.page4Step) window.page4Step = 1;
              if (window.page6State) window.page6State = 'C';
              if (window.page6Step) window.page6Step = 1;
              
              // Reset protractor position
              if (window.protractorCenterPosition) {
                window.protractorCenterPosition = null;
              }
              
              // Reset angle reading selection
              if (window.angleReadingSelected !== undefined) {
                window.angleReadingSelected = null;
              }
              
              // Dispatch global reset event
              window.dispatchEvent(new CustomEvent('globalPageReset', {
                detail: { page: 1, resetAll: true }
              }));
            }

            // Navigate to page 1
            navigateToPage(1, "startOver");
          },
          className: "start-button-container",
          contentClassName: "applet-button-content",
        },
      },
    ],
  };
};

// ===== PAGE STATE RESET =====

/**
 * Reset all states for a page when it loads
 * This ensures clean state on every page navigation
 */
const resetPageStates = (pageNumber) => {
  if (typeof window === 'undefined') return;

  console.log(`🔄 Resetting all states for page ${pageNumber}`);

  // Reset page2State and page2Step to defaults when resetting page 2
  if (pageNumber === 2) {
    const oldState = window.page2State;
    const oldStep = window.page2Step;
    window.page2State = 'C';
    window.page2Step = 1;
    if (oldState !== 'C') {
      console.log(`[STATE:page2State] Changed: ${oldState || 'undefined'} → C (Page 2 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page2Step] Changed: ${oldStep || 'undefined'} → 1 (Page 2 reset)`);
    }
    console.log("✅ [PageConfig] Reset page2State to 'C' and page2Step to 1");
  }

  // Reset page4State and page4Step to defaults when resetting page 4
  if (pageNumber === 4) {
    const oldState = window.page4State;
    const oldStep = window.page4Step;
    window.page4State = 'C';
    window.page4Step = 1;
    if (oldState !== 'C') {
      console.log(`[STATE:page4State] Changed: ${oldState || 'undefined'} → C (Page 4 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page4Step] Changed: ${oldStep || 'undefined'} → 1 (Page 4 reset)`);
    }
    console.log("✅ [PageConfig] Reset page4State to 'C' and page4Step to 1");
  }

  // Reset page6State and page6Step to defaults when resetting page 6
  if (pageNumber === 6) {
    const oldState = window.page6State;
    const oldStep = window.page6Step;
    window.page6State = 'C';
    window.page6Step = 1;
    if (oldState !== 'C') {
      console.log(`[STATE:page6State] Changed: ${oldState || 'undefined'} → C (Page 6 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page6Step] Changed: ${oldStep || 'undefined'} → 1 (Page 6 reset)`);
    }
    console.log("✅ [PageConfig] Reset page6State to 'C' and page6Step to 1");
  }

  try {
    // 1. Reset quadrilateral animation states
    if (window.quadrilateralAnimations) {
      Object.keys(window.quadrilateralAnimations).forEach(quadId => {
        const animObj = window.quadrilateralAnimations[quadId];
        // Stop all animations - call methods directly on the element if available
        const quadElement = document.getElementById(quadId);
        if (quadElement) {
          if (quadElement.stopParallelLinesAnimation) quadElement.stopParallelLinesAnimation();
          if (quadElement.stopOppositeSideAnimation) quadElement.stopOppositeSideAnimation();
          if (quadElement.stopAngleEqualityAnimation) quadElement.stopAngleEqualityAnimation();
          if (quadElement.stopDiagonalEqualityAnimation) quadElement.stopDiagonalEqualityAnimation();
          if (quadElement.stopSymmetryFoldAnimation) quadElement.stopSymmetryFoldAnimation();
        }
        // Also try via registry methods
        if (animObj.stopParallelLinesAnimation) animObj.stopParallelLinesAnimation();
        if (animObj.stopOppositeSideAnimation) animObj.stopOppositeSideAnimation();
        if (animObj.stopAngleEqualityAnimation) animObj.stopAngleEqualityAnimation();
        if (animObj.stopDiagonalEqualityAnimation) animObj.stopDiagonalEqualityAnimation();
        if (animObj.stopSymmetryFoldAnimation) animObj.stopSymmetryFoldAnimation();
        // Reset side colors and blinking
        if (animObj.updateSideColors) {
          // Reset all sides to default (no blink, original colors)
          for (let i = 0; i < 4; i++) {
            animObj.updateSideColors(i, null, false);
          }
        }
      });
    }

    // 2. Reset quadrilateral display states via events (no global state needed)
    // Components will reset themselves when they receive the pageStateReset event
    // No need to dispatch individual property reset events - components handle their own reset

    // 3. Reset quadrilateral component states (vertices, transforms, colors, etc.)
    if (typeof document !== 'undefined') {
      // Find all quadrilateral components
      const quadElements = document.querySelectorAll('[id*="-shape-display"], [id*="-quadrilateral"], [data-quad-type]');
      quadElements.forEach(element => {
        // Reset CSS transforms (parallel lines animation, etc.)
        const quadWrapper = element.querySelector('.quadrilateral-wrapper');
        if (quadWrapper) {
          quadWrapper.style.transform = '';
          quadWrapper.style.transition = '';
          quadWrapper.style.willChange = '';
          quadWrapper.style.isolation = '';
          quadWrapper.style.transformStyle = '';
        }

        // Reset parallel lines animation rails
        const parallelRails = element.querySelectorAll('.parallel-lines-rails');
        parallelRails.forEach(rail => rail.remove());

        // Reset any animated arc containers
        const animatedArcs = element.querySelectorAll('.animated-angle-arc-container, .animated-angle-sum-arc-container');
        animatedArcs.forEach(arc => {
          arc.style.opacity = '';
          arc.style.transform = '';
        });

        // Reset symmetry fold animation
        const symmetryFold = element.querySelectorAll('.symmetry-folding-half-wrapper, .symmetry-fold-line');
        symmetryFold.forEach(fold => fold.remove());

        // Reset diagonal equality animation
        const diagonalEquality = element.querySelectorAll('.animated-diagonal-equality-line');
        diagonalEquality.forEach(line => line.remove());

        // Reset side colors by finding all SVG lines and resetting their stroke
        const svg = element.querySelector('svg');
        if (svg) {
          // Reset all side line colors to default (remove any custom colors/blinking)
          const sideLines = svg.querySelectorAll('line[data-side-index], line');
          sideLines.forEach(line => {
            line.style.stroke = '';
            line.classList.remove('side-blink');
            // Remove any data attributes that might affect color
            line.removeAttribute('data-custom-color');
          });

          // Remove dynamically added symbols (arrows, ticks, etc.)
          const dynamicElements = svg.querySelectorAll('[data-dynamic="true"], .parallel-arrow, .equality-tick, .angle-equality-tick, .parallel-arrows-container, g[data-symbols]');
          dynamicElements.forEach(el => el.remove());
        }

        // Reset angle markers (remove any equality ticks, reset colors)
        const angleMarkers = element.querySelectorAll('.angle-marker-component');
        angleMarkers.forEach(marker => {
          // Remove equality tick marks
          const equalityTicks = marker.querySelectorAll('.equality-tick-mark, .angle-equality-tick, line.equality-tick');
          equalityTicks.forEach(tick => tick.remove());

          // Reset angle marker colors and blinking
          const arcs = marker.querySelectorAll('path, svg');
          arcs.forEach(arc => {
            arc.style.fill = '';
            arc.style.stroke = '';
            arc.classList.remove('angle-arc-blink');
            // Reset fill opacity
            if (arc.hasAttribute('fill-opacity')) {
              arc.setAttribute('fill-opacity', '');
            }
          });
        });

        // Clear angle measurement labels
        const angleLabels = element.querySelectorAll('.angle-measurement-label, [data-angle-label="true"]');
        angleLabels.forEach(label => label.remove());
      });
    }

    // 4. Reset message boxes (only clear those that are meant to be dynamically updated)
    // Message boxes with initial static text (like page2-messagebox) should be preserved
    if (typeof document !== 'undefined') {
      const messageBoxes = document.querySelectorAll('[id*="-messagebox"]');
      messageBoxes.forEach(box => {
        const boxId = box.id;
        // Only clear message boxes that are meant to be dynamically updated
        // These are message boxes that start with empty text in PageConfig (e.g., page3-messagebox, page4-messagebox, etc.)
        // Preserve message boxes with initial static text (e.g., page2-messagebox)
        if (boxId && (boxId.includes('page3-') || boxId.includes('page4-') || boxId.includes('page5-') || boxId.includes('page6-'))) {
          // These message boxes are meant to be dynamically updated, so clear them
          if (box.textContent) {
            box.textContent = '';
          }
          if (box.innerHTML) {
            box.innerHTML = '';
          }
        }
        // For other message boxes (like page2-messagebox), preserve their content
        // The component will restore the initial text from props on re-render
      });
    }

    // 5. Reset button states (enable/disable)
    if (typeof document !== 'undefined') {
      const nextButtons = document.querySelectorAll('[id*="-next-button"]');
      nextButtons.forEach(button => {
        const container = button.closest('.next-button') || button;
        if (container) {
          container.classList.remove('disabled');
          container.style.opacity = '';
          container.style.pointerEvents = '';
        }
      });

      const tapAnimations = document.querySelectorAll('[id*="-tap-next"]');
      tapAnimations.forEach(tap => {
        if (tap.style) {
          tap.style.display = '';
          tap.style.visibility = '';
        }
      });
    }

    // 6. Clear any animation sequence states
    if (window.QuadAnimationSequenceStates) {
      Object.keys(window.QuadAnimationSequenceStates).forEach(seqId => {
        const state = window.QuadAnimationSequenceStates[seqId];
        if (state) {
          state.currentStep = 0;
          state.isComplete = false;
          state.isRunning = false;
          // Clear any timeouts
          if (state.timeouts) {
            state.timeouts.forEach(timeout => clearTimeout(timeout));
            state.timeouts = [];
          }
        }
      });
    }

    // 7. Reset shape selector state if exists
    if (window.shapeSelectorState) {
      Object.keys(window.shapeSelectorState).forEach(key => {
        const state = window.shapeSelectorState[key];
        if (state) {
          state.selected = false;
          state.highlighted = false;
        }
      });
    }

    // 8. Reset all components with IDs matching the page pattern (e.g., page3-*)
    if (typeof document !== 'undefined') {
      // Find all elements with IDs matching the page pattern
      const pageElements = document.querySelectorAll(`[id^="page${pageNumber}-"]`);
      pageElements.forEach(element => {
        // Remove any dynamically added content
        const dynamicElements = element.querySelectorAll('[data-dynamic="true"], [data-description-index]');
        dynamicElements.forEach(el => el.remove());

        // Reset any inline styles that might have been modified
        // BUT preserve transform for hotspots and other positioned elements
        if (element.style) {
          // Don't reset transform - it's used for positioning (translate)
          // Don't reset left/top - they're used for positioning
          // Only reset animation-related properties
          element.style.opacity = '';
          element.style.transition = '';
        }
      });
    }

    // 9. Dispatch reset event for components to listen
    window.dispatchEvent(new CustomEvent('pageStateReset', {
      detail: { page: pageNumber }
    }));

    // Also dispatch a global reset event that all components can listen to
    window.dispatchEvent(new CustomEvent('globalPageReset', {
      detail: { page: pageNumber }
    }));

    console.log(`✅ All states reset for page ${pageNumber}`);
  } catch (error) {
    console.error(`❌ Error resetting page states:`, error);
  }
};

// ===== INITIALIZATION AND EXPORT =====

/**
 * Initialize Page Config
 */
const initializePageConfig = () => {
  console.log("🚀 Initializing PageConfig");

  // Create GridPositionPages
  const optimizedPages = createOptimizedGridPositionPages();

  // Make available globally
  if (typeof window !== "undefined") {
    // Store the page configuration globally
    window.GridPositionPages = optimizedPages;
    window.gridPositions = window.GridPositionPages;

    // Expose page navigation configuration globally
    window.pageNavigation = pageNavigation;

    // Expose page mapping functions globally
    window.getPageNumbers = getPageNumbers;
    window.getPageFromDotPosition = getPageFromDotPosition;
    window.getDotPositionFromPage = getDotPositionFromPage;

    // Expose page state reset function globally
    window.resetPageStates = resetPageStates;

    // Initialize page2State with default value 'C'
    if (!window.page2State) {
      const oldState = window.page2State;
      window.page2State = 'C';
      if (oldState !== 'C') {
        console.log(`[STATE:page2State] Changed: ${oldState || 'undefined'} → C (Page 2 initialization)`);
      }
      console.log("✅ [PageConfig] Initialized page2State = 'C'");
    }
    
    // Initialize page2Step with default value 1
    if (window.page2Step === undefined || window.page2Step === null) {
      window.page2Step = 1;
      console.log("✅ [PageConfig] Initialized page2Step = 1");
    }

    // Initialize page4State with default value 'C'
    if (!window.page4State) {
      const oldState = window.page4State;
      window.page4State = 'C';
      if (oldState !== 'C') {
        console.log(`[STATE:page4State] Changed: ${oldState || 'undefined'} → C (Page 4 initialization)`);
      }
      console.log("✅ [PageConfig] Initialized page4State = 'C'");
    }
    
    // Initialize page4Step with default value 1
    if (window.page4Step === undefined || window.page4Step === null) {
      window.page4Step = 1;
      console.log("✅ [PageConfig] Initialized page4Step = 1");
    }

    // Initialize page6State with default value 'C'
    if (!window.page6State) {
      const oldState = window.page6State;
      window.page6State = 'C';
      if (oldState !== 'C') {
        console.log(`[STATE:page6State] Changed: ${oldState || 'undefined'} → C (Page 6 initialization)`);
      }
      console.log("✅ [PageConfig] Initialized page6State = 'C'");
    }
    
    // Initialize page6Step with default value 1
    if (window.page6Step === undefined || window.page6Step === null) {
      window.page6Step = 1;
      console.log("✅ [PageConfig] Initialized page6Step = 1");
    }

    // Listen for page change events and reset states
    window.addEventListener('pageChanged', (event) => {
      const pageNumber = event.detail?.page;
      if (pageNumber) {
        // Reset states after a delay to ensure components are mounted
        // This ensures clean state when navigating to a new page
        setTimeout(() => {
          resetPageStates(pageNumber);
        }, 150);
      }
    });
    console.log("✅ Page state reset handler registered");

    // Initialize essential window functions
    console.log("🔄 [PageConfig] Initializing window functions...");

    try {
      // Create the question manager functions directly
      const advanceToNextQuestion = () => {
        return new Promise((resolve) => {
          console.log(
            "🔄 [Navigation] advanceToNextQuestion called (DIRECT IMPLEMENTATION)"
          );
          console.log(
            "🔄 [Navigation] Treating as APP RELOAD with next question"
          );

          // Simplified navigation - always reset to 0
          const { currentIndex } = getCurrentQuestionData();
          const newIndex = 0;
          console.log(
            "🔄 [Navigation]",
            getI18nText("messages.navigationReset", "Resetting to question 1")
          );

          // CRITICAL: Update question index FIRST (before any store operations)
          window.currentQuestionIndex = newIndex;
          console.log(
            "✅ [Navigation] Updated window.currentQuestionIndex to:",
            newIndex
          );

          // Reset global window variables
          window.page1complete = false;
          window.objectsremoved = 0;

          console.log(
            "✅ [Navigation]",
            getI18nText(
              "messages.navigationComplete",
              "Complete app reset completed - ready for new question"
            )
          );
          resolve(newIndex);
        });
      };

      const updateQuestionDependentElements = () => {
        console.log("🔄 [UI] Updating question-dependent elements");

        // Trigger React re-render by forcing app update
        if (typeof window.forceAppUpdate === "function") {
          window.forceAppUpdate();
          console.log("✅ [UI] Triggered React re-render via forceAppUpdate");
        } else {
          console.warn(
            "⚠️ [UI] forceAppUpdate not available, React may not re-render"
          );
        }

        // Page 2 removed - no longer needed

        console.log("✅ [UI] updateQuestionDependentElements completed");
      };

      const getNextButtonText = () => {
        // Always show "Start Over" since we only have one question now
        return getI18nText("buttons.startOver", "Start Over");
      };

      // Assign functions to window
      window.advanceToNextQuestion = advanceToNextQuestion;
      window.updateQuestionDependentElements = updateQuestionDependentElements;
      window.getNextButtonText = getNextButtonText;

      console.log("✅ [PageConfig] Direct function assignment completed");
      console.log(
        "🔍 [PageConfig] window.advanceToNextQuestion type:",
        typeof window.advanceToNextQuestion
      );
      console.log(
        "🔍 [PageConfig] window.updateQuestionDependentElements type:",
        typeof window.updateQuestionDependentElements
      );
    } catch (error) {
      console.error(
        "❌ [PageConfig] Error in direct function assignment:",
        error
      );
    }

    // Add global function to manually clear page states (for testing)
    window.clearAllPageStates = () => {
      console.log("🧹 [PageConfig] Manually clearing page states");
      try {
        // Reset global variables
        window.page1complete = false;
        window.objectsremoved = 0;
        window.currentQuestionIndex = 0;

        console.log("✅ [PageConfig] Page states cleared successfully");

        // Reload the page to start fresh
        if (
          confirm(
            getI18nText(
              "messages.pageStatesCleared",
              "Page states have been cleared. Reload the page to start fresh?"
            )
          )
        ) {
          window.location.reload();
        }
      } catch (error) {
        console.error("❌ [PageConfig] Error clearing page states:", error);
      }
    };

    // Function to copy text from source element to destination element by ID
    // sourceId: ID of the element to read text from (e.g., 'page2-map-table-R1C1' - a table cell)
    // destinationId: ID of the element to update (e.g., 'page2-number-pad' - number pad target, or any other element ID)
    window.updateTargetIDText = (sourceId, destinationId, retryCount = 0) => {
      try {
        const maxRetries = 5;
        const retryDelay = 200;

        const attemptUpdate = () => {
          const sourceElement = document.getElementById(sourceId);

          if (sourceElement) {
            const sourceText = sourceElement.textContent?.trim() || sourceElement.innerText?.trim() || '';
            console.log(`🎯 [PageConfig] Reading text from source ${sourceId}:`, sourceText);

            // Try to update number pad target first (if destination is a number pad)
            if (window.numberPadCallbacks && window.numberPadCallbacks[destinationId]) {
              window.numberPadCallbacks[destinationId].updateTarget(sourceText);
              console.log(`✅ [PageConfig] Updated number pad ${destinationId} target to:`, sourceText);
              return;
            }

            // Otherwise, update destination element's text content
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.textContent = sourceText;
              destinationElement.innerText = sourceText;
              console.log(`✅ [PageConfig] Updated element ${destinationId} text to:`, sourceText);
            } else {
              // Retry if destination element not found yet
              if (retryCount < maxRetries) {
                console.log(`🔄 [PageConfig] Destination element ${destinationId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
                setTimeout(() => {
                  window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
                }, retryDelay);
              } else {
                console.warn(`⚠️ [PageConfig] Destination element not found: ${destinationId} after ${maxRetries} retries`);
              }
            }
          } else {
            // Retry if source element not found yet
            if (retryCount < maxRetries) {
              console.log(`🔄 [PageConfig] Source element ${sourceId} not found, retrying... (${retryCount + 1}/${maxRetries})`);
              setTimeout(() => {
                window.updateTargetIDText(sourceId, destinationId, retryCount + 1);
              }, retryDelay);
            } else {
              // Log as info instead of warning - element might not exist by design
              console.log(`ℹ️ [PageConfig] Source element not found: ${sourceId} after ${maxRetries} retries (this may be expected if element is optional)`);
            }
          }
        };

        // Initial delay to ensure DOM is ready
        if (retryCount === 0) {
          setTimeout(attemptUpdate, retryDelay);
        } else {
          attemptUpdate();
        }
      } catch (error) {
        console.error('❌ [PageConfig] Error updating target text:', error);
      }
    };

    // Listen for page changes to update number pad target on page 2
    if (typeof window !== 'undefined') {
      window.addEventListener('pageChanged', (event) => {
        const pageNumber = event.detail?.page;
        if (pageNumber === 2) {
          // Copy text from table cell R1C1 (row 1, column 1) to number pad target
          // sourceId: 'page2-map-table-R1C1' - the table cell to read from
          // destinationId: 'page2-number-pad' - the number pad to update
          // Only attempt update if source element exists (optional feature)
          const sourceElement = document.getElementById('page2-map-table-R1C1');
          if (sourceElement) {
            window.updateTargetIDText('page2-map-table-R1C1', 'page2-number-pad');
          } else {
            // Silently skip if table doesn't exist (this is optional functionality)
            console.log('ℹ️ [PageConfig] Table cell page2-map-table-R1C1 not found, skipping number pad update');
          }
        }
      });
    }

    console.log(
      "✅ PageConfig initialized - pages and functions available globally"
    );
    console.log(
      "💡 [PageConfig] Use window.clearAllPageStates() to manually clear page states"
    );
    console.log(
      "💡 [PageConfig] Use window.updateTargetIDText(sourceId, destinationId) to copy text from any source element to any destination element"
    );
  }

  return optimizedPages;
};

// Initialize immediately
console.log("🔄 [PageConfig] About to call initializePageConfig...");
const OptimizedGridPositionPages = initializePageConfig();
console.log(
  "🔄 [PageConfig] initializePageConfig completed, result:",
  typeof OptimizedGridPositionPages
);

// Add event listeners to update instruction text when quiz is completed on pages 2, 3, 4, 5, and 6
if (typeof window !== 'undefined') {
  window.addEventListener('quizCompleted', (event) => {
    const pageNumber = event.detail?.pageNumber;
    
    console.log(`🔍 [QuizCompletion] Event received for page ${pageNumber}`);
    
    if (pageNumber === 2 || pageNumber === 3 || pageNumber === 4 || pageNumber === 5 || pageNumber === 6 || pageNumber === 7) {
      const instructionId = `page${pageNumber}-instruction`;
      
      // Helper function to get i18n text
      const getI18nText = (key, fallback) => {
        if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
          return window.i18n.t(key, {}) || fallback;
        }
        return fallback;
      };
      
      // Retry mechanism to find the element (React components might not be mounted immediately)
      const updateInstructionText = (attempt = 0) => {
        // For page 7, also check for page7-instruction
        let instructionElement = document.getElementById(instructionId);
        if (!instructionElement && pageNumber === 7) {
          instructionElement = document.getElementById('page7-instruction');
        }
        
        if (instructionElement) {
          // Update instruction text using i18n
          const continueText = getI18nText("common.tapToContinue", "Tap » to continue");
          
          // Try to update textContent first
          if (instructionElement.textContent !== undefined) {
            instructionElement.textContent = continueText;
          }
          
          // Also try to update innerHTML if it's a React component with nested elements
          const innerSpan = instructionElement.querySelector('span');
          if (innerSpan) {
            innerSpan.textContent = continueText;
          } else if (instructionElement.innerHTML !== undefined) {
            instructionElement.innerHTML = continueText;
          }
          
          console.log(`✅ Updated instruction text for page ${pageNumber} to "${continueText}"`);
        } else if (attempt < 10) {
          // Retry up to 10 times with increasing delay
          setTimeout(() => updateInstructionText(attempt + 1), 100 * (attempt + 1));
        } else {
          console.warn(`⚠️ Instruction element ${instructionId} not found after ${attempt} attempts`);
        }
      };
      
      // Start the update process
      updateInstructionText();
    }
  });
  
  console.log("✅ Added quiz completion listeners for pages 2, 3, 4, 5, 6, and 7");
  
  // Add event listeners to update page2-instruction text when state or step changes
  const updatePage2InstructionText = () => {
    const instructionId = 'page2-instruction';
    const instructionElement = document.getElementById(instructionId);
    
    if (!instructionElement) {
      // Retry if element not found (React might not have mounted yet)
      setTimeout(updatePage2InstructionText, 100);
      return;
    }
    
    // Get current state and step
    const state = window.page2State || 'A';
    const step = window.page2Step !== undefined ? window.page2Step : 1;
    
    // Get instruction text from config
    const instructionText = page2ProtractorFlowConfig.helpers.getInstructionText(state, step);
    
    if (instructionText) {
      // Update textContent
      if (instructionElement.textContent !== undefined) {
        instructionElement.textContent = instructionText;
      }
      
      // Also update innerHTML if it's a React component with nested elements
      const innerSpan = instructionElement.querySelector('span');
      if (innerSpan) {
        innerSpan.textContent = instructionText;
      } else if (instructionElement.innerHTML !== undefined) {
        instructionElement.innerHTML = instructionText;
      }
      
      console.log(`📝 [PageConfig] Updated page2-instruction text: "${instructionText}" (state=${state}, step=${step})`);
    }
  };
  
  // Listen for state and step changes
  window.addEventListener('pageStateChanged', (event) => {
    console.log('📢 [PageConfig] pageStateChanged event received:', event.detail);
    updatePage2InstructionText();
    
    // If pageState becomes 'complete', dispatch quizCompleted event
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 2) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 2,
          componentType: 'ProtractorComponent',
          componentId: 'page2-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 2 (pageState = complete)');
    }
  });
  
  window.addEventListener('page2StepChanged', (event) => {
    console.log('📢 [PageConfig] page2StepChanged event received:', event.detail);
    updatePage2InstructionText();
  });
  
  // Also update on initial load (with a small delay to ensure DOM is ready)
  setTimeout(() => {
    updatePage2InstructionText();
    
    // Check if pageState is already 'complete' and dispatch quizCompleted event if needed
    if (typeof window !== 'undefined' && window.page2State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 2) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 2,
          componentType: 'ProtractorComponent',
          componentId: 'page2-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 2 (pageState already = complete on load)');
    }
  }, 200);
  
  console.log("✅ Added page2-instruction text update listeners");
}

// Add event listeners to update page4-instruction text when state or step changes
{
  const updatePage4InstructionText = () => {
    const instructionId = 'page4-instruction';
    const instructionElement = document.getElementById(instructionId);
    
    if (!instructionElement) {
      // Retry if element not found (React might not have mounted yet)
      setTimeout(updatePage4InstructionText, 100);
      return;
    }
    
    // Get current state and step
    const state = window.page4State || 'C';
    const step = window.page4Step !== undefined ? window.page4Step : 1;
    
    // Get instruction text from config
    const instructionText = page4ProtractorFlowConfig.helpers.getInstructionText(state, step);
    
    if (instructionText) {
      // Update textContent
      if (instructionElement.textContent !== undefined) {
        instructionElement.textContent = instructionText;
      }
      
      // Also update innerHTML if it's a React component with nested elements
      const innerSpan = instructionElement.querySelector('span');
      if (innerSpan) {
        innerSpan.textContent = instructionText;
      } else if (instructionElement.innerHTML !== undefined) {
        instructionElement.innerHTML = instructionText;
      }
      
      console.log(`📝 [PageConfig] Updated page4-instruction text: "${instructionText}" (state=${state}, step=${step})`);
    }
  };
  
  // Listen for state and step changes
  window.addEventListener('page4StateChanged', (event) => {
    console.log('📢 [PageConfig] page4StateChanged event received:', event.detail);
    updatePage4InstructionText();
    
    // If pageState becomes 'complete', dispatch quizCompleted event
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 4) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 4,
          componentType: 'ProtractorComponent',
          componentId: 'page4-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 4 (pageState = complete)');
    }
  });
  
  window.addEventListener('page4StepChanged', (event) => {
    console.log('📢 [PageConfig] page4StepChanged event received:', event.detail);
    updatePage4InstructionText();
  });
  
  // Also update on initial load (with a small delay to ensure DOM is ready)
  setTimeout(() => {
    updatePage4InstructionText();
    
    // Check if pageState is already 'complete' and dispatch quizCompleted event if needed
    if (typeof window !== 'undefined' && window.page4State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 4) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 4,
          componentType: 'ProtractorComponent',
          componentId: 'page4-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 4 (pageState already = complete on load)');
    }
  }, 200);
  
  console.log("✅ Added page4-instruction text update listeners");
}

// Add event listeners to update page6-instruction text when state or step changes
{
  const updatePage6InstructionText = () => {
    const instructionId = 'page6-instruction';
    const instructionElement = document.getElementById(instructionId);
    
    if (!instructionElement) {
      // Retry if element not found (React might not have mounted yet)
      setTimeout(updatePage6InstructionText, 100);
      return;
    }
    
    // Get current state and step
    const state = window.page6State || 'C';
    const step = window.page6Step !== undefined ? window.page6Step : 1;
    
    // Get instruction text from config
    const instructionText = page6ProtractorFlowConfig.helpers.getInstructionText(state, step);
    
    if (instructionText) {
      // Update textContent
      if (instructionElement.textContent !== undefined) {
        instructionElement.textContent = instructionText;
      }
      
      // Also update innerHTML if it's a React component with nested elements
      const innerSpan = instructionElement.querySelector('span');
      if (innerSpan) {
        innerSpan.textContent = instructionText;
      } else if (instructionElement.innerHTML !== undefined) {
        instructionElement.innerHTML = instructionText;
      }
      
      console.log(`📝 [PageConfig] Updated page6-instruction text: "${instructionText}" (state=${state}, step=${step})`);
    }
  };
  
  // Listen for state and step changes
  window.addEventListener('page6StateChanged', (event) => {
    console.log('📢 [PageConfig] page6StateChanged event received:', event.detail);
    updatePage6InstructionText();
    
    // If pageState becomes 'complete', dispatch quizCompleted event
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 6) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 6,
          componentType: 'ProtractorComponent',
          componentId: 'page6-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 6 (pageState = complete)');
    }
  });
  
  window.addEventListener('page6StepChanged', (event) => {
    console.log('📢 [PageConfig] page6StepChanged event received:', event.detail);
    updatePage6InstructionText();
  });
  
  // Also update on initial load (with a small delay to ensure DOM is ready)
  setTimeout(() => {
    updatePage6InstructionText();
    
    // Check if pageState is already 'complete' and dispatch quizCompleted event if needed
    if (typeof window !== 'undefined' && window.page6State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 6) {
      const quizCompletedEvent = new CustomEvent('quizCompleted', {
        detail: {
          pageNumber: 6,
          componentType: 'ProtractorComponent',
          componentId: 'page6-protractor'
        }
      });
      window.dispatchEvent(quizCompletedEvent);
      console.log('✅ [PageConfig] Dispatched quizCompleted event for page 6 (pageState already = complete on load)');
    }
  }, 200);
  
  console.log("✅ Added page6-instruction text update listeners");
}

// Page 3 Quiz Panel - Angle Marker Blink on Correct Answer
{
  // Function to trigger angle marker blink animation
  const triggerAngleMarkerBlink = () => {
    console.log('🎯 [Page3] Triggering angle marker blink animation');
    
    // Ensure CSS animation is defined first
    if (typeof document !== 'undefined' && !document.getElementById('angle-arc-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'angle-arc-blink-keyframes';
      style.textContent = `
        @keyframes angleEqualityBlink {
          0%, 100% { 
            opacity: 1; 
            fill-opacity: 0.7; 
          }
          50% { 
            opacity: 0.3; 
            fill-opacity: 0.2; 
          }
        }
        @keyframes angleTextBlink {
          0%, 100% { 
            opacity: 1; 
          }
          50% { 
            opacity: 0.3; 
          }
        }
        .angle-arc-blink {
          animation: angleEqualityBlink 1s ease-in-out infinite !important;
        }
        .angle-text-blink {
          animation: angleTextBlink 1s ease-in-out infinite !important;
        }
      `;
      document.head.appendChild(style);
      console.log('✅ [Page3] Added CSS animation keyframes');
    }
    
    // Try using the showAllAngleMarkers function first (with retry if not available)
    const tryShowAllAngleMarkers = (retryCount = 0) => {
      if (typeof window !== 'undefined' && window.QuadrilateralAnimations && window.QuadrilateralAnimations.showAllAngleMarkers) {
        try {
          window.QuadrilateralAnimations.showAllAngleMarkers('page3-shape-display', '#FF6600', true, true);
          console.log('✅ [Page3] Angle marker blink animation triggered via QuadrilateralAnimations');
          // Also apply direct DOM manipulation as backup
          setTimeout(() => applyDirectBlinkAnimation(), 100);
          return true;
        } catch (error) {
          console.warn('⚠️ [Page3] Error calling showAllAngleMarkers:', error);
          applyDirectBlinkAnimation();
          return false;
        }
      } else if (retryCount < 5) {
        // Retry after a short delay if function not available yet
        setTimeout(() => tryShowAllAngleMarkers(retryCount + 1), 100);
        return false;
      } else {
        // After 5 retries, fall back to direct DOM manipulation
        console.log('ℹ️ [Page3] showAllAngleMarkers not available after retries, using direct DOM manipulation');
        applyDirectBlinkAnimation();
        return false;
      }
    };
    
    tryShowAllAngleMarkers();
    
    // Direct DOM manipulation function
    function applyDirectBlinkAnimation() {
      const quadElement = document.getElementById('page3-shape-display');
      if (!quadElement) {
        console.warn('⚠️ [Page3] page3-shape-display element not found');
        // Retry after a short delay
        setTimeout(() => {
          const retryElement = document.getElementById('page3-shape-display');
          if (retryElement) {
            console.log('✅ [Page3] Found element on retry');
            applyBlinkToElement(retryElement);
          }
        }, 500);
        return;
      }
      
      applyBlinkToElement(quadElement);
    }
    
    function applyBlinkToElement(element) {
      // Find all angle marker components using the class name
      const angleMarkers = element.querySelectorAll('.angle-marker-component');
      console.log(`🔍 [Page3] Found ${angleMarkers.length} angle marker components`);
      
      if (angleMarkers.length === 0) {
        // Try alternative selectors
        const altMarkers = element.querySelectorAll('[data-angle]');
        console.log(`🔍 [Page3] Found ${altMarkers.length} elements with data-angle attribute`);
        
        // Also search in all descendants
        const allDescendants = element.querySelectorAll('*');
        const markersWithClass = Array.from(allDescendants).filter(el => 
          el.classList.contains('angle-marker-component') || 
          el.getAttribute('data-angle') !== null
        );
        console.log(`🔍 [Page3] Found ${markersWithClass.length} potential markers in all descendants`);
        
        if (markersWithClass.length > 0) {
          markersWithClass.forEach(applyBlinkToMarker);
        }
        return;
      }
      
      angleMarkers.forEach(applyBlinkToMarker);
      console.log('✅ [Page3] Applied blink animation to all angle markers and labels');
    }
    
    function applyBlinkToMarker(marker) {
      console.log('🎨 [Page3] Applying blink to marker:', marker);
      
      // Find all SVG paths (both fill and stroke)
      const allPaths = marker.querySelectorAll('path');
      console.log(`  📍 Found ${allPaths.length} paths in marker`);
      
      allPaths.forEach((path) => {
        const hasFill = path.getAttribute('fill') && path.getAttribute('fill') !== 'none';
        const hasStroke = path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none';
        
        if (hasFill || hasStroke) {
          path.classList.add('angle-arc-blink');
          // Also set inline style as backup
          path.style.animation = 'angleEqualityBlink 1s ease-in-out infinite';
          console.log(`  ✅ Applied blink to path (fill: ${hasFill}, stroke: ${hasStroke})`);
        }
      });
      
      // Find all SVG elements (containers for arcs)
      const svgElements = marker.querySelectorAll('svg');
      svgElements.forEach((svg) => {
        svg.style.animation = 'angleEqualityBlink 1s ease-in-out infinite';
      });
      
      // Find all text labels (angle measure labels like "60°")
      const textLabels = marker.querySelectorAll('div[style*="font"], div[style*="color"]');
      console.log(`  📍 Found ${textLabels.length} text divs in marker`);
      
      textLabels.forEach((label) => {
        // Check if it looks like an angle label (contains "°" or has specific styling)
        const text = label.textContent || label.innerText || '';
        if (text.includes('°') || label.style.fontSize) {
          label.classList.add('angle-text-blink');
          label.style.animation = 'angleTextBlink 1s ease-in-out infinite';
          console.log(`  ✅ Applied blink to text label: "${text}"`);
        }
      });
      
      // Also check for SVG text elements
      const svgTexts = marker.querySelectorAll('text, tspan');
      svgTexts.forEach((text) => {
        text.classList.add('angle-text-blink');
        text.style.animation = 'angleTextBlink 1s ease-in-out infinite';
        console.log(`  ✅ Applied blink to SVG text: "${text.textContent}"`);
      });
    }
  };

  // Function to set up quiz panel option click listener
  const setupPage3QuizListener = () => {
    const quizPanel = document.getElementById('page3-quiz-panel');
    if (!quizPanel) {
      console.log('⏳ [Page3] Quiz panel not found yet, will retry...');
      return false;
    }

    console.log('✅ [Page3] Quiz panel found, setting up listener');

    // Use event delegation on the quiz panel to catch all option button clicks
    const handleOptionClick = (e) => {
      console.log('🔍 [Page3] Click detected in quiz panel:', e.target);
      
      // Find the clicked option button container (has data-option-index attribute)
      const optionButton = e.target.closest('[data-option-index]');
      if (!optionButton) {
        console.log('⚠️ [Page3] Clicked element is not an option button');
        return;
      }

      const optionIndex = parseInt(optionButton.getAttribute('data-option-index'), 10);
      const isCorrect = optionButton.getAttribute('data-is-correct') === 'true';
      const optionText = optionButton.textContent || optionButton.innerText || '';

      console.log(`🔍 [Page3] Option ${optionIndex} clicked:`, {
        optionIndex,
        isCorrect,
        optionText: optionText.trim(),
        dataIsCorrect: optionButton.getAttribute('data-is-correct')
      });

      // Check if this is the correct option (first option = Acute Triangle, index 0)
      if (optionIndex === 0 && isCorrect) {
        console.log('✅ [Page3] Correct option clicked (Acute Triangle) - triggering blink animation');
        // Small delay to let the quiz panel process the click and show feedback first
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 300);
      } else if (optionIndex === 0) {
        console.log('⚠️ [Page3] First option clicked but isCorrect is not true');
      }
    };

    // Remove any existing listener to avoid duplicates
    const existingHandler = quizPanel._page3OptionClickHandler;
    if (existingHandler) {
      quizPanel.removeEventListener('click', existingHandler);
    }

    // Store handler reference for cleanup
    quizPanel._page3OptionClickHandler = handleOptionClick;
    
    // Add the listener with capture phase to catch events early
    quizPanel.addEventListener('click', handleOptionClick, true);

    console.log('✅ [Page3] Quiz panel option click listener set up');
    return true;
  };

  // Set up listener when page 3 loads
  const setupListener = () => {
    if (typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 3) {
      // Try to set up immediately
      if (!setupPage3QuizListener()) {
        // Retry with delays if not ready
        setTimeout(() => setupPage3QuizListener(), 500);
        setTimeout(() => setupPage3QuizListener(), 1000);
        setTimeout(() => setupPage3QuizListener(), 2000);
      }
    }
  };

  // Listen for page changes
  if (typeof window !== 'undefined') {
    window.addEventListener('pageChanged', (event) => {
      if (event.detail && event.detail.pageNumber === 3) {
        setTimeout(setupListener, 300);
      }
    });

    // Also listen for quizCompleted event as an alternative trigger
    window.addEventListener('quizCompleted', (event) => {
      if (event.detail && event.detail.quizId === 'page3-quiz') {
        console.log('✅ [Page3] quizCompleted event received for page3-quiz');
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 500);
      }
    });

    // Also set up on initial load if already on page 3
    setTimeout(setupListener, 500);
  }

  console.log("✅ Added page3 quiz panel angle marker blink listener");
}

// Page 5 Quiz Panel - Angle Marker Blink on Correct Answer
{
  // Function to trigger angle marker blink animation
  const triggerAngleMarkerBlink = () => {
    console.log('🎯 [Page5] Triggering angle marker blink animation');
    
    // Ensure CSS animation is defined first
    if (typeof document !== 'undefined' && !document.getElementById('angle-arc-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'angle-arc-blink-keyframes';
      style.textContent = `
        @keyframes angleEqualityBlink {
          0%, 100% { 
            opacity: 1; 
            fill-opacity: 0.7; 
          }
          50% { 
            opacity: 0.3; 
            fill-opacity: 0.2; 
          }
        }
        @keyframes angleTextBlink {
          0%, 100% { 
            opacity: 1; 
          }
          50% { 
            opacity: 0.3; 
          }
        }
        .angle-arc-blink {
          animation: angleEqualityBlink 1s ease-in-out infinite !important;
        }
        .angle-text-blink {
          animation: angleTextBlink 1s ease-in-out infinite !important;
        }
      `;
      document.head.appendChild(style);
      console.log('✅ [Page5] Added CSS animation keyframes');
    }
    
    // Try using the showAllAngleMarkers function first (with retry if not available)
    const tryShowAllAngleMarkers = (retryCount = 0) => {
      if (typeof window !== 'undefined' && window.QuadrilateralAnimations && window.QuadrilateralAnimations.showAllAngleMarkers) {
        try {
          window.QuadrilateralAnimations.showAllAngleMarkers('page5-shape-display', '#FF6600', true, true);
          console.log('✅ [Page5] Angle marker blink animation triggered via QuadrilateralAnimations');
          // Also apply direct DOM manipulation as backup
          setTimeout(() => applyDirectBlinkAnimation(), 100);
          return true;
        } catch (error) {
          console.warn('⚠️ [Page5] Error calling showAllAngleMarkers:', error);
          applyDirectBlinkAnimation();
          return false;
        }
      } else if (retryCount < 5) {
        // Retry after a short delay if function not available yet
        setTimeout(() => tryShowAllAngleMarkers(retryCount + 1), 100);
        return false;
      } else {
        // After 5 retries, fall back to direct DOM manipulation
        console.log('ℹ️ [Page5] showAllAngleMarkers not available after retries, using direct DOM manipulation');
        applyDirectBlinkAnimation();
        return false;
      }
    };
    
    tryShowAllAngleMarkers();
    
    // Direct DOM manipulation function
    function applyDirectBlinkAnimation(retryCount = 0) {
      const quadElement = document.getElementById('page5-shape-display');
      if (!quadElement) {
        if (retryCount < 10) {
          // Retry up to 10 times with increasing delays
          const delay = Math.min(100 * (retryCount + 1), 1000);
          setTimeout(() => {
            applyDirectBlinkAnimation(retryCount + 1);
          }, delay);
          if (retryCount === 0) {
            console.warn('⚠️ [Page5] page5-shape-display element not found, retrying...');
          }
        } else {
          console.warn('⚠️ [Page5] page5-shape-display element not found after 10 retries');
        }
        return;
      }
      
      if (retryCount > 0) {
        console.log(`✅ [Page5] Found element on retry ${retryCount}`);
      }
      applyBlinkToElement(quadElement);
    }
    
    function applyBlinkToElement(element) {
      // Find all angle marker components using the class name
      const angleMarkers = element.querySelectorAll('.angle-marker-component');
      console.log(`🔍 [Page5] Found ${angleMarkers.length} angle marker components`);
      
      if (angleMarkers.length === 0) {
        // Try alternative selectors
        const altMarkers = element.querySelectorAll('[data-angle]');
        console.log(`🔍 [Page5] Found ${altMarkers.length} elements with data-angle attribute`);
        
        // Also search in all descendants
        const allDescendants = element.querySelectorAll('*');
        const markersWithClass = Array.from(allDescendants).filter(el => 
          el.classList.contains('angle-marker-component') || 
          el.getAttribute('data-angle') !== null
        );
        console.log(`🔍 [Page5] Found ${markersWithClass.length} potential markers in all descendants`);
        
        if (markersWithClass.length > 0) {
          markersWithClass.forEach(applyBlinkToMarker);
        }
        return;
      }
      
      angleMarkers.forEach(applyBlinkToMarker);
      console.log('✅ [Page5] Applied blink animation to all angle markers and labels');
    }
    
    function applyBlinkToMarker(marker) {
      console.log('🎨 [Page5] Applying blink to marker:', marker);
      
      // Find all SVG paths (both fill and stroke)
      const allPaths = marker.querySelectorAll('path');
      console.log(`  📍 Found ${allPaths.length} paths in marker`);
      
      allPaths.forEach((path) => {
        const hasFill = path.getAttribute('fill') && path.getAttribute('fill') !== 'none';
        const hasStroke = path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none';
        
        if (hasFill || hasStroke) {
          path.classList.add('angle-arc-blink');
          // Also set inline style as backup
          path.style.animation = 'angleEqualityBlink 1s ease-in-out infinite';
          console.log(`  ✅ Applied blink to path (fill: ${hasFill}, stroke: ${hasStroke})`);
        }
      });
      
      // Find all SVG elements (containers for arcs)
      const svgElements = marker.querySelectorAll('svg');
      svgElements.forEach((svg) => {
        svg.style.animation = 'angleEqualityBlink 1s ease-in-out infinite';
      });
      
      // Find all text labels (angle measure labels like "60°")
      const textLabels = marker.querySelectorAll('div[style*="font"], div[style*="color"]');
      console.log(`  📍 Found ${textLabels.length} text divs in marker`);
      
      textLabels.forEach((label) => {
        // Check if it looks like an angle label (contains "°" or has specific styling)
        const text = label.textContent || label.innerText || '';
        if (text.includes('°') || label.style.fontSize) {
          label.classList.add('angle-text-blink');
          label.style.animation = 'angleTextBlink 1s ease-in-out infinite';
          console.log(`  ✅ Applied blink to text label: "${text}"`);
        }
      });
      
      // Also check for SVG text elements
      const svgTexts = marker.querySelectorAll('text, tspan');
      svgTexts.forEach((text) => {
        text.classList.add('angle-text-blink');
        text.style.animation = 'angleTextBlink 1s ease-in-out infinite';
        console.log(`  ✅ Applied blink to SVG text: "${text.textContent}"`);
      });
    }
  };

  // Function to set up quiz panel option click listener
  const setupPage5QuizListener = () => {
    const quizPanel = document.getElementById('page5-quiz-panel');
    if (!quizPanel) {
      console.log('⏳ [Page5] Quiz panel not found yet, will retry...');
      return false;
    }

    console.log('✅ [Page5] Quiz panel found, setting up listener');

    // Use event delegation on the quiz panel to catch all option button clicks
    const handleOptionClick = (e) => {
      console.log('🔍 [Page5] Click detected in quiz panel:', e.target);
      
      // Find the clicked option button container (has data-option-index attribute)
      const optionButton = e.target.closest('[data-option-index]');
      if (!optionButton) {
        console.log('⚠️ [Page5] Clicked element is not an option button');
        return;
      }

      const optionIndex = parseInt(optionButton.getAttribute('data-option-index'), 10);
      const isCorrect = optionButton.getAttribute('data-is-correct') === 'true';
      const optionText = optionButton.textContent || optionButton.innerText || '';

      console.log(`🔍 [Page5] Option ${optionIndex} clicked:`, {
        optionIndex,
        isCorrect,
        optionText: optionText.trim(),
        dataIsCorrect: optionButton.getAttribute('data-is-correct')
      });

      // Check if this is the correct option (second option = Right Triangle, index 1)
      if (optionIndex === 1 && isCorrect) {
        console.log('✅ [Page5] Correct option clicked (Right Triangle) - triggering blink animation');
        // Small delay to let the quiz panel process the click and show feedback first
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 300);
      } else if (optionIndex === 1) {
        console.log('⚠️ [Page5] Second option clicked but isCorrect is not true');
      }
    };

    // Remove any existing listener to avoid duplicates
    const existingHandler = quizPanel._page5OptionClickHandler;
    if (existingHandler) {
      quizPanel.removeEventListener('click', existingHandler);
    }

    // Store handler reference for cleanup
    quizPanel._page5OptionClickHandler = handleOptionClick;
    
    // Add the listener with capture phase to catch events early
    quizPanel.addEventListener('click', handleOptionClick, true);

    console.log('✅ [Page5] Quiz panel option click listener set up');
    return true;
  };

  // Set up listener when page 5 loads
  const setupListener = () => {
    if (typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 5) {
      // Try to set up immediately
      if (!setupPage5QuizListener()) {
        // Retry with delays if not ready
        setTimeout(() => setupPage5QuizListener(), 500);
        setTimeout(() => setupPage5QuizListener(), 1000);
        setTimeout(() => setupPage5QuizListener(), 2000);
      }
    }
  };

  // Listen for page changes
  if (typeof window !== 'undefined') {
    window.addEventListener('pageChanged', (event) => {
      if (event.detail && event.detail.pageNumber === 5) {
        setTimeout(setupListener, 300);
      }
    });

    // Also listen for quizCompleted event as an alternative trigger
    window.addEventListener('quizCompleted', (event) => {
      if (event.detail && event.detail.quizId === 'page5-quiz') {
        console.log('✅ [Page5] quizCompleted event received for page5-quiz');
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 500);
      }
    });

    // Also set up on initial load if already on page 5
    setTimeout(setupListener, 500);
  }

  console.log("✅ Added page5 quiz panel angle marker blink listener");
}

// Page 7 Quiz Panel - Angle Marker Blink on Correct Answer
{
  // Function to trigger angle marker blink animation
  const triggerAngleMarkerBlink = () => {
    console.log('🎯 [Page7] Triggering angle marker blink animation');
    
    // Ensure CSS animation is defined first
    if (typeof document !== 'undefined' && !document.getElementById('angle-arc-blink-keyframes')) {
      const style = document.createElement('style');
      style.id = 'angle-arc-blink-keyframes';
      style.textContent = `
        @keyframes angleEqualityBlink {
          0%, 100% { 
            opacity: 1; 
            fill-opacity: 0.7; 
          }
          50% { 
            opacity: 0.3; 
            fill-opacity: 0.2; 
          }
        }
        @keyframes angleTextBlink {
          0%, 100% { 
            opacity: 1; 
          }
          50% { 
            opacity: 0.3; 
          }
        }
        .angle-arc-blink {
          animation: angleEqualityBlink 1s ease-in-out infinite !important;
        }
        .angle-text-blink {
          animation: angleTextBlink 1s ease-in-out infinite !important;
        }
      `;
      document.head.appendChild(style);
      console.log('✅ [Page7] Added CSS animation keyframes');
    }
    
    // Try using the showAllAngleMarkers function first (with retry if not available)
    const tryShowAllAngleMarkers = (retryCount = 0) => {
      if (typeof window !== 'undefined' && window.QuadrilateralAnimations && window.QuadrilateralAnimations.showAllAngleMarkers) {
        try {
          window.QuadrilateralAnimations.showAllAngleMarkers('page7-shape-display', '#FF6600', true, true);
          console.log('✅ [Page7] Angle marker blink animation triggered via QuadrilateralAnimations');
          // Also apply direct DOM manipulation as backup
          setTimeout(() => applyDirectBlinkAnimation(), 100);
          return true;
        } catch (error) {
          console.warn('⚠️ [Page7] Error calling showAllAngleMarkers:', error);
          applyDirectBlinkAnimation();
          return false;
        }
      } else if (retryCount < 5) {
        // Retry after a short delay if function not available yet
        setTimeout(() => tryShowAllAngleMarkers(retryCount + 1), 100);
        return false;
      } else {
        // After 5 retries, fall back to direct DOM manipulation
        console.log('ℹ️ [Page7] showAllAngleMarkers not available after retries, using direct DOM manipulation');
        applyDirectBlinkAnimation();
        return false;
      }
    };
    
    tryShowAllAngleMarkers();
    
    // Direct DOM manipulation function
    const applyDirectBlinkAnimation = () => {
      const quadElement = document.getElementById('page7-shape-display');
      if (!quadElement) {
        let retryCount = 0;
        const maxRetries = 10;
        const checkElement = setInterval(() => {
          retryCount++;
          if (retryCount > maxRetries) {
            clearInterval(checkElement);
            console.warn('⚠️ [Page7] page7-shape-display element not found after 10 retries');
            return;
          }
          const foundElement = document.getElementById('page7-shape-display');
          if (foundElement) {
            clearInterval(checkElement);
            console.log(`✅ [Page7] Found element on retry ${retryCount}`);
            applyBlinkToElement(foundElement);
          } else {
            console.warn('⚠️ [Page7] page7-shape-display element not found, retrying...');
          }
        }, 200);
        return;
      }
      
      applyBlinkToElement(quadElement);
    };
    
    const applyBlinkToElement = (quadElement) => {
      // Find all angle marker elements
      const angleMarkers = quadElement.querySelectorAll('[data-angle]');
      console.log(`🔍 [Page7] Found ${angleMarkers.length} angle marker components`);
      
      // Also try finding by class or other attributes
      const altMarkers = quadElement.querySelectorAll('[class*="angle"]');
      console.log(`🔍 [Page7] Found ${altMarkers.length} elements with data-angle attribute`);
      
      // Find all potential markers in all descendants
      const markersWithClass = quadElement.querySelectorAll('*');
      console.log(`🔍 [Page7] Found ${markersWithClass.length} potential markers in all descendants`);
      
      // Apply blink animation to all angle markers and their text
      [...angleMarkers, ...altMarkers].forEach(marker => {
        marker.classList.add('angle-arc-blink');
        const textElement = marker.querySelector('text') || marker.querySelector('.angle-text');
        if (textElement) {
          textElement.classList.add('angle-text-blink');
        }
      });
      
      console.log('✅ [Page7] Applied blink animation to all angle markers and labels');
      
      // Also try to find and animate angle text separately
      const angleTexts = quadElement.querySelectorAll('text[class*="angle"], .angle-text');
      angleTexts.forEach(text => {
        text.classList.add('angle-text-blink');
        console.log('🎨 [Page7] Applying blink to marker:', text);
      });
    };
  };

  const setupPage7QuizListener = () => {
    const quizPanel = document.getElementById('page7-quiz-panel');
    if (!quizPanel) {
      console.log('⏳ [Page7] Quiz panel not found yet, will retry...');
      return false;
    }
    console.log('✅ [Page7] Quiz panel found, setting up listener');
    
    const handleOptionClick = (e) => {
      console.log('🔍 [Page7] Click detected in quiz panel:', e.target);
      
      // Check if clicked element is an option button
      const optionButton = e.target.closest('.quiz-option-button');
      if (!optionButton) {
        console.log('⚠️ [Page7] Clicked element is not an option button');
        return;
      }
      
      // Get option index from data attribute
      const optionIndex = parseInt(optionButton.getAttribute('data-option-index'));
      const isCorrect = optionButton.getAttribute('data-is-correct') === 'true';
      
      console.log(`🔍 [Page7] Option ${optionIndex} clicked:`, {
        isCorrect: isCorrect,
        optionIndex: optionIndex
      });
      
      // If correct option (Obtuse Triangle) is clicked, trigger blink animation
      if (isCorrect && optionIndex === 2) {
        console.log('✅ [Page7] Correct option clicked (Obtuse Triangle) - triggering blink animation');
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 500);
      } else if (optionIndex === 2) {
        console.log('⚠️ [Page7] Third option clicked but isCorrect is not true');
      }
    };
    
    // Remove existing handler if any
    const existingHandler = quizPanel._page7OptionClickHandler;
    if (existingHandler) {
      quizPanel.removeEventListener('click', existingHandler);
    }
    quizPanel._page7OptionClickHandler = handleOptionClick;
    quizPanel.addEventListener('click', handleOptionClick);
    
    console.log('✅ [Page7] Quiz panel option click listener set up');
    return true;
  };

  // Set up listener when page 7 loads
  const setupListener = () => {
    if (typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 7) {
      if (!setupPage7QuizListener()) {
        setTimeout(() => setupPage7QuizListener(), 500);
        setTimeout(() => setupPage7QuizListener(), 1000);
        setTimeout(() => setupPage7QuizListener(), 2000);
      }
    }
  };

  // Listen for page changes
  if (typeof window !== 'undefined') {
    window.addEventListener('pageChanged', (event) => {
      if (event.detail && event.detail.pageNumber === 7) {
        setTimeout(setupListener, 300);
      }
    });

    // Also listen for quizCompleted event as an alternative trigger
    window.addEventListener('quizCompleted', (event) => {
      if (event.detail && event.detail.quizId === 'page7-quiz') {
        console.log('✅ [Page7] quizCompleted event received for page7-quiz');
        setTimeout(() => {
          triggerAngleMarkerBlink();
        }, 500);
      }
    });

    // Also set up on initial load if already on page 7
    setTimeout(setupListener, 500);
  }

  console.log("✅ Added page7 quiz panel angle marker blink listener");
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    OptimizedGridPositionPages,
  };
} else {
  // Browser global export
  window.PageConfigOptimized = {
    OptimizedGridPositionPages,
  };
}

console.log("🎉 PageConfig optimization complete!");

