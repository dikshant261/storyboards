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

  while (currentPage !== null) {
    pages.push(currentPage);
    const nav = pageNavigation[currentPage];
    currentPage = nav ? nav.next : null;
  }

  return pages;
};

/**
 * Get shape configuration by name.
 * Supports values like "RECTANGLE", "RIGHT_ANGLE_TRIANGLE", etc.
 */
const getShapeConfig = (shapeName) => {
  if (typeof shape === "undefined" || !Array.isArray(shape)) {
    throw new Error("Shape configuration array is not available. Ensure constants.js is loaded before PageConfig.js.");
  }

  const normalize = (value) => String(value || "")
    .trim()
    .replace(/\s+/g, "_")
    .toUpperCase();

  const target = normalize(shapeName);
  const config = shape.find((entry) => {
    const byQuadType = normalize(entry?.quadType) === target;
    const byType = normalize(entry?.type) === target;
    return byQuadType || byType;
  });

  if (!config) {
    throw new Error(`Shape config not found for: ${shapeName}`);
  }

  return config;
};

// ===== PAGE 2 PROTRACTOR FLOW CONFIGURATION =====
const page2ProtractorFlowConfig = {
  version: "1.0",
  sideIndices: {
    "AB": 0,
    "BA": 0,
    "BC": 1,
    "CB": 1,
    "CD": 2,
    "DC": 2,
    "DA": 3,
    "AD": 3,
  },
  vertexIndices: {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
  },
  states: {
    "C": {
      pageState: "C",
      targetVertex: "B",
      targetVertexIndex: 1,
      measurementSide: "BC",
      endVertex: "C",
      expectedLengthCm: 20,
      nextState: "B",
      runtimeState: { chosenBaselineSide: null },
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex B to measure the side BC",
          vertexBlinking: "B",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "B",
        },
        2: {
          instructionText: "Align the ruler length along the side BC (blinking)",
          vertexBlinking: null,
          sideBlinking: "BC",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "BC", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of BC using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
      transitions: {
        "1to2": { trigger: "rulerSnapsToVertex", targetVertex: "B" },
        "2to3": { trigger: "rulerSnapsToSide", targetSide: "BC", rotationTolerance: 5 },
        "3to4": { trigger: "measurementMarkSnap", nextState: "B", nextStep: 4 },
        "complete": { trigger: "tapAnywhere", nextState: "B", nextStep: 1 },
      },
    },
    "B": {
      pageState: "B",
      targetVertex: "B",
      targetVertexIndex: 1,
      measurementSide: "AB",
      endVertex: "A",
      expectedLengthCm: 16,
      nextState: "A",
      runtimeState: { chosenBaselineSide: null },
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex B to measure the side AB",
          vertexBlinking: "B",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "B",
        },
        2: {
          instructionText: "Align the ruler length along the side AB (blinking)",
          vertexBlinking: null,
          sideBlinking: "AB",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "AB", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of AB using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
      transitions: {
        "1to2": { trigger: "rulerSnapsToVertex", targetVertex: "B" },
        "2to3": { trigger: "rulerSnapsToSide", targetSide: "AB", rotationTolerance: 5 },
        "3to4": { trigger: "measurementMarkSnap", nextState: "A", nextStep: 4 },
        "complete": { trigger: "tapAnywhere", nextState: "A", nextStep: 1 },
      },
    },
    "A": {
      pageState: "A",
      targetVertex: "C",
      targetVertexIndex: 2,
      measurementSide: "CD",
      endVertex: "D",
      expectedLengthCm: 16,
      nextState: "complete",
      runtimeState: { chosenBaselineSide: null },
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex C to measure the side CD",
          vertexBlinking: "C",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "C",
        },
        2: {
          instructionText: "Align the ruler length along the side CD (blinking)",
          vertexBlinking: null,
          sideBlinking: "CD",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "CD", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of CD using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
      transitions: {
        "1to2": { trigger: "rulerSnapsToVertex", targetVertex: "C" },
        "2to3": { trigger: "rulerSnapsToSide", targetSide: "CD", rotationTolerance: 5 },
        "3to4": { trigger: "measurementMarkSnap", nextState: "complete", nextStep: 4 },
        "complete": { trigger: "tapAnywhere", nextState: "complete", nextStep: null },
      },
    },
  },

  // Helper functions for the config
  helpers: {
    /**
     * Get the current step config for a given state and step
     */
    getStepConfig: function (pageState, pageStep) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (!stateConfig) return null;
      return stateConfig.steps[pageStep] || null;
    },

    /**
     * Get the state config for a given state
     */
    getStateConfig: function (pageState) {
      return page2ProtractorFlowConfig.states[pageState] || null;
    },

    /**
     * Get the side index for a given side name
     */
    getSideIndex: function (sideName) {
      return page2ProtractorFlowConfig.sideIndices[sideName] ?? null;
    },

    /**
     * Get the vertex index for a given vertex name
     */
    getVertexIndex: function (vertexName) {
      return page2ProtractorFlowConfig.vertexIndices[vertexName] ?? null;
    },

    /**
     * Check if a reading is correct for the current state
     */
    isCorrectReading: function (pageState, pageStep, readingIndex) {
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
    getNextStateAndStep: function (pageState) {
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
    getBlinkingSide: function (pageState, pageStep) {
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
    getBlinkingVertex: function (pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      if (!stepConfig) return null;
      return stepConfig.vertexBlinking;
    },

    /**
     * Set the chosen baseline side (for state A)
     */
    setChosenBaselineSide: function (pageState, sideName) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (stateConfig && stateConfig.runtimeState) {
        stateConfig.runtimeState.chosenBaselineSide = sideName;
        console.log(`📝 [Config] Set chosen baseline for state ${pageState}: ${sideName}`);
      }
    },

    /**
     * Get the chosen baseline side (for state A)
     */
    getChosenBaselineSide: function (pageState) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      return stateConfig?.runtimeState?.chosenBaselineSide || null;
    },

    /**
     * Reset runtime state for a given state
     */
    resetRuntimeState: function (pageState) {
      const stateConfig = page2ProtractorFlowConfig.states[pageState];
      if (stateConfig && stateConfig.runtimeState) {
        stateConfig.runtimeState.chosenBaselineSide = null;
        console.log(`🔄 [Config] Reset runtime state for state ${pageState}`);
      }
    },

    /**
     * Get instruction text for current state and step
     */
    getInstructionText: function (pageState, pageStep) {
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

const page3ProtractorFlowConfig = {
  version: "1.0",
  sideIndices: {
    "AB": 0,
    "BA": 0,
    "BC": 1,
    "CB": 1,
    "CD": 2,
    "DC": 2,
    "DA": 3,
    "AD": 3,
  },
  vertexIndices: {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
  },
  states: {
    "C": {
      pageState: "C",
      targetVertex: "B",
      targetVertexIndex: 1,
      measurementSide: "BC",
      endVertex: "C",
      expectedLengthCm: 20,
      nextState: "B",
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex B to measure the side BC",
          vertexBlinking: "B",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "B",
        },
        2: {
          instructionText: "Align the ruler length along the side BC (blinking)",
          vertexBlinking: null,
          sideBlinking: "BC",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "BC", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of BC using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
    },
    "B": {
      pageState: "B",
      targetVertex: "B",
      targetVertexIndex: 1,
      measurementSide: "AB",
      endVertex: "A",
      expectedLengthCm: 16,
      nextState: "D",
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex B to measure the side AB",
          vertexBlinking: "B",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "B",
        },
        2: {
          instructionText: "Align the ruler length along the side AB (blinking)",
          vertexBlinking: null,
          sideBlinking: "AB",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "AB", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of AB using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
    },
    "D": {
      pageState: "D",
      targetVertex: "C",
      targetVertexIndex: 2,
      measurementSide: "CD",
      endVertex: "D",
      expectedLengthCm: 16,
      nextState: "A",
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex C to measure the side CD",
          vertexBlinking: "C",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "C",
        },
        2: {
          instructionText: "Align the ruler length along the side CD (blinking)",
          vertexBlinking: null,
          sideBlinking: "CD",
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "CD", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of CD using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
    },
    "A": {
      pageState: "A",
      targetVertex: "D",
      targetVertexIndex: 3,
      measurementSide: "DA",
      endVertex: "A",
      expectedLengthCm: 20,
      nextState: "complete",
      steps: {
        1: {
          instructionText: "Drag the ruler to vertex D to measure the side AD",
          vertexBlinking: "D",
          sideBlinking: null,
          zeroMarkHighlight: true,
          animatedDotTarget: "D",
        },
        2: {
          instructionText: "Align the ruler length along the side AD (blinking)",
          vertexBlinking: null,
          sideBlinking: ["AD", "DA"],
          zeroMarkHighlight: true,
          rulerSnapToSide: { targetSide: "DA", rotationTolerance: 5 },
        },
        3: {
          instructionText: "Now, measure the length of AD using the measurement marker",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
        4: {
          instructionText: "Tap anywhere to continue",
          vertexBlinking: null,
          sideBlinking: null,
          zeroMarkHighlight: false,
        },
      },
    },
  },
  helpers: {
    getStepConfig(pageState, pageStep) {
      const stateConfig = page3ProtractorFlowConfig.states[pageState];
      if (!stateConfig) return null;
      return stateConfig.steps[pageStep] || null;
    },
    getStateConfig(pageState) {
      return page3ProtractorFlowConfig.states[pageState] || null;
    },
    getSideIndex(sideName) {
      return page3ProtractorFlowConfig.sideIndices[sideName] ?? null;
    },
    getVertexIndex(vertexName) {
      return page3ProtractorFlowConfig.vertexIndices[vertexName] ?? null;
    },
    getNextStateAndStep(pageState) {
      const stateConfig = page3ProtractorFlowConfig.states[pageState];
      if (!stateConfig) return { nextState: null, nextStep: null };
      return {
        nextState: stateConfig.nextState,
        nextStep: stateConfig.nextState === "complete" ? null : 1,
      };
    },
    getBlinkingSide(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      return stepConfig ? stepConfig.sideBlinking : null;
    },
    getBlinkingVertex(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      return stepConfig ? stepConfig.vertexBlinking : null;
    },
    getInstructionText(pageState, pageStep) {
      const stepConfig = this.getStepConfig(pageState, pageStep);
      return stepConfig ? stepConfig.instructionText || "" : "";
    },
  },
};

if (typeof window !== 'undefined') {
  window.page3ProtractorFlowConfig = page3ProtractorFlowConfig;
  window.getPage3StepConfig = (state, step) => page3ProtractorFlowConfig.helpers.getStepConfig(state, step);
  window.getPage3StateConfig = (state) => page3ProtractorFlowConfig.helpers.getStateConfig(state);
  window.getPage3InstructionText = (state, step) => page3ProtractorFlowConfig.helpers.getInstructionText(state, step);
  window.getPage3BlinkingSide = (state, step) => page3ProtractorFlowConfig.helpers.getBlinkingSide(state, step);
  window.getPage3BlinkingVertex = (state, step) => page3ProtractorFlowConfig.helpers.getBlinkingVertex(state, step);
}

// Helper function to create a protractor flow config based on a template
const createProtractorFlowConfig = (baseConfig, angleValues) => {
  // Deep clone the states object (but keep helpers as reference to new config)
  const clonedStates = JSON.parse(JSON.stringify(baseConfig.states));

  // Update angle values (only set measurementText when step 4 exists - states may have 3 steps for ruler flow)
  clonedStates.C.correctAngle = angleValues.C;
  if (clonedStates.C.steps[4]) clonedStates.C.steps[4].measurementText = `∠ACB = ${angleValues.C}°`;

  clonedStates.B.correctAngle = angleValues.B;
  if (clonedStates.B.steps[4]) clonedStates.B.steps[4].measurementText = `∠ACB = ${angleValues.C}°<br>∠ABC = ${angleValues.B}°`;

  clonedStates.A.correctAngle = angleValues.A;
  if (clonedStates.A.steps[4]) clonedStates.A.steps[4].measurementText = `∠ACB = ${angleValues.C}°<br>∠ABC = ${angleValues.B}°<br>∠BAC = ${angleValues.A}°`;

  // Create new config with cloned states
  const newConfig = {
    version: "1.0",
    sideIndices: { ...baseConfig.sideIndices },
    vertexIndices: { ...baseConfig.vertexIndices },
    states: clonedStates,
    helpers: {
      getStepConfig: function (pageState, pageStep) {
        const stateConfig = newConfig.states[pageState];
        if (!stateConfig) return null;
        return stateConfig.steps[pageStep] || null;
      },
      getStateConfig: function (pageState) {
        return newConfig.states[pageState] || null;
      },
      getSideIndex: function (sideName) {
        return newConfig.sideIndices[sideName] ?? null;
      },
      getVertexIndex: function (vertexName) {
        return newConfig.vertexIndices[vertexName] ?? null;
      },
      isCorrectReading: function (pageState, pageStep, readingIndex) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig || !stepConfig.readingSelection) return false;

        if (stepConfig.readingSelectionDynamic && typeof stepConfig.readingSelectionDynamic === 'function') {
          const stateConfig = newConfig.states[pageState];
          const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
          if (chosenBaseline) {
            const dynamicSelection = stepConfig.readingSelectionDynamic(chosenBaseline);
            return dynamicSelection.correctIndex === readingIndex;
          }
        }

        return stepConfig.readingSelection.correctIndex === readingIndex;
      },
      getNextStateAndStep: function (pageState) {
        const stateConfig = newConfig.states[pageState];
        if (!stateConfig) return { nextState: null, nextStep: null };
        return {
          nextState: stateConfig.nextState,
          nextStep: 1
        };
      },
      getBlinkingSide: function (pageState, pageStep) {
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
      getBlinkingVertex: function (pageState, pageStep) {
        const stepConfig = this.getStepConfig(pageState, pageStep);
        if (!stepConfig) return null;
        return stepConfig.vertexBlinking;
      },
      setChosenBaselineSide: function (pageState, sideName) {
        const stateConfig = newConfig.states[pageState];
        if (stateConfig && stateConfig.runtimeState) {
          stateConfig.runtimeState.chosenBaselineSide = sideName;
          console.log(`📝 [Config] Set chosen baseline for state ${pageState}: ${sideName}`);
        }
      },
      getChosenBaselineSide: function (pageState) {
        const stateConfig = newConfig.states[pageState];
        return stateConfig?.runtimeState?.chosenBaselineSide || null;
      },
      resetRuntimeState: function (pageState) {
        const stateConfig = newConfig.states[pageState];
        if (stateConfig && stateConfig.runtimeState) {
          stateConfig.runtimeState.chosenBaselineSide = null;
          console.log(`🔄 [Config] Reset runtime state for state ${pageState}`);
        }
      },
      getInstructionText: function (pageState, pageStep) {
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

  // Page 2: single source of truth for shape display coordinates (used by shape element and ruler vertex/snap math)

  const PAGE2_SHAPE_DISPLAY_COORDINATES = [430, 180, 1046, 682]; // moved up 250gc (was 284, 832)
  const PAGE3_SHAPE_DISPLAY_COORDINATES = PAGE2_SHAPE_DISPLAY_COORDINATES;

  // Page 4: exactly same as page 2 (coordinates and config)
  const PAGE4_SHAPE_DISPLAY_COORDINATES = PAGE2_SHAPE_DISPLAY_COORDINATES;

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
        coordinates: [5, 135, 1595, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },



      // Header - Orange text
      {
        id: "page2-header",
        name: "page2-header",
        coordinates: [25, 10, 1575, 130],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.headerText", "Let's learn how to measure the length of any side of rectangle ABCD."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - uses page2ProtractorFlowConfig
      {
        id: "page2-instruction-text",
        name: "page2-instruction-text",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text:
            // Get instruction text from config based on current state and step

            getI18nText("pages.page2.instruction", ""),

          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
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
      // perimeter text 
      {
        id: "page2-perimeter-text",
        name: "page2-perimeter-text",
        coordinates: [25, 680, 1500, 730],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page2.perimeter", "Perimeter = AB + BC + CD + AD"),
          fontSize: "48gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Navigation buttons
      {
        id: "page2-next-button",
        name: "next-button",
        type: "button",
        coordinates: [1450, 820, 1595, 895],
        zIndex: "var(--z-button)",
        props: {
          enabled: true,
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
          enabled: true,
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
      // Shape display - QuadrilateralComponent (Rectangle)
      (() => {
        const shapeConfig = getShapeConfig("RECTANGLE");
        const page2RectangleVertices = [
          { row: 2, col: 1.5 }, // A: top-left
          { row: 7, col: 1.5 }, // B: bottom-left
          { row: 7, col: 9.5 }, // C: bottom-right
          { row: 2, col: 9.5 }  // D: top-right
        ];

        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page2State`);
          const pageState = typeof window !== 'undefined' && window.page2State ? window.page2State : null;
          const isComplete = pageState === 'complete';

          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);

          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page2StateKey: pageState || 'C', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // RECTANGLE from constants.js
            vertices: page2RectangleVertices, // Ordered to match A-B-C-D labels in the reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
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
              labels: ["A", "B", "C", "D"], // 4 vertices for rectangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C, D] - will be checked dynamically in component
              vertexAnimations: [false, false, false, false], // Default: no blinking, component will check page2State dynamically
              // Individual x/y offsets for each label (in gc units)
              labelOffsets: [
                { x: "-16gc", y: "-36gc" }, // A: top-left
                { x: "-18gc", y: "36gc" },  // B: bottom-left
                { x: "16gc", y: "36gc" },   // C: bottom-right
                { x: "16gc", y: "-36gc" }   // D: top-right
              ]
            },
            effectiveAngleConfig: {
              show: isComplete ? 'none' : 'none', // Hide angle markers when state is complete; shape stays visible with measurement text only
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: !isComplete,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure'
              // When complete: no per-vertex angle config (no interior angle arcs/labels)
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
            // When complete: side length labels on each measured side (BC, AB, CD)
            sideSymbols: isComplete && typeof window !== 'undefined' ? [
              ...(window.page2MeasurementBC_cm ? [{ side: 'BC', type: 'label', label: `${window.page2MeasurementBC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page2MeasurementAB_cm ? [{ side: 'AB', type: 'label', label: `${window.page2MeasurementAB_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page2MeasurementAC_cm ? [{ side: 'CD', type: 'label', label: `${window.page2MeasurementAC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
            ].filter(Boolean) : [],
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
          coordinates: PAGE2_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
    ],
    3: [
      // Left Column Container (55%) - row 0 to row 800
      {
        id: "page3-left-column",
        name: "page3-left-column",
        coordinates: [5, 85, 1195, 800], // 55% of usable width (1550px) = 852.5px, so 25 + 852 = 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - row 0 to row 800
      {
        id: "page3-right-column",
        name: "page3-right-column",
        coordinates: [1200, 85, 1595, 800], // 45% of usable width (1550px) = 697.5px, starting at 877
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Header - Orange text
      {
        id: "page3-header",
        name: "page3-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page3.headerText", "Let's learn how to measure the length of all sides of rectangle ABCD."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - uses page3ProtractorFlowConfig
      {
        id: "page3-instruction",
        name: "page3-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get instruction text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page3State ? window.page3State : 'C';
            const step = typeof window !== 'undefined' && window.page3Step !== undefined ? window.page3Step : 1;

            // Get config for current state/step
            const stepConfig = page3ProtractorFlowConfig.helpers.getStepConfig(state, step);
            if (stepConfig) {
              // Handle dynamic instruction text (for state A step 3)
              if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
                const stateConfig = page3ProtractorFlowConfig.states[state];
                const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                if (chosenBaseline) {
                  return stepConfig.instructionTextDynamic(chosenBaseline);
                }
              }
              return stepConfig.instructionText;
            }
            return getI18nText("pages.page3.instruction", "Drag the ruler to vertex B to measure the side BC");
          })(),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component in right column
      {
        id: "page3-steps",
        name: "page3-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800], // Positioned in the right column
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page3.solutionSteps.headerText", "Steps to measure a side of rectangle"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const fallbackSteps = ["Place the zero mark of the ruler on the highlighted vertex.", "Rotate the ruler to align with the highlighted side.", "Use the measurement markers to read the side length."];
            const stepsArray = getI18nText("pages.page3.solutionSteps.steps", fallbackSteps);
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
      //   id: "page3-build-coordinates",
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
      //   id: "page3-instruction-1",
      //   name: "page3-instruction-1",
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
      //   id: "page3-instruction-2",
      //   name: "page3-instruction-2",
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
      //   id: "page3-display-controls-2",
      //   name: "display-controls-2",
      //   type: "custom",
      //   coordinates: [750, 720, 1050, 850],
      //   zIndex: 1000,
      //   props: {
      //     componentType: "DisplayControlsComponent",
      //     targetQuadId: "page3-build-coordinates",
      //     fontSize: "14gc",
      //     textColor: "#333333"
      //   }
      // },

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
            const nav = pageNavigation[2];
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
            const nav = pageNavigation[2];
            if (nav && nav.prev) {
              navigateToPage(nav.prev, "previous");
            }
          },
        },
      },

      // {
      //   id: "page3-page-title",
      //   name: "page3-page-title",
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
      // Shape display - QuadrilateralComponent (Rectangle)
      (() => {
        const shapeConfig = getShapeConfig("RECTANGLE");
        const page3RectangleVertices = [
          { row: 2, col: 1.5 }, // A: top-left
          { row: 7, col: 1.5 }, // B: bottom-left
          { row: 7, col: 9.5 }, // C: bottom-right
          { row: 2, col: 9.5 }  // D: top-right
        ];

        // Create a function that returns props, so it's re-evaluated when called
        const getProps = () => {
          console.log(`🔍 [PageConfig] getProps CALLED - checking window.page3State`);
          const pageState = typeof window !== 'undefined' && window.page3State ? window.page3State : null;
          const isComplete = pageState === 'complete';

          console.log(`🔍 [PageConfig] getProps: pageState=${pageState}, isComplete=${isComplete}`);

          const props = {
            componentType: "QuadrilateralComponent",
            // Add reactive prop that changes with pageState to force re-render
            page3StateKey: pageState || 'C', // This will change when pageState changes, forcing React to re-render
            mode: "default", // Default mode (not build mode)
            quadType: shapeConfig.quadType, // RECTANGLE from constants.js
            vertices: page3RectangleVertices, // Ordered to match A-B-C-D labels in the reference image
            gridRows: shapeConfig.gridRows, // Read from constants.js
            gridCols: shapeConfig.gridCols, // Read from constants.js
            showGrid: false,
            showDiagonals: false,
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
              labels: ["A", "B", "C", "D"], // 4 vertices for rectangle
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc", // Default offset (used if labelOffsets not provided)
              innerCircleSize: "6gc", // Size of center dot in vertex marker
              // Per-vertex animation control: [A, B, C, D] - will be checked dynamically in component
              vertexAnimations: [false, false, false, false], // Default: no blinking, component will check page3State dynamically
              // Individual x/y offsets for each label (in gc units)
              labelOffsets: [
                { x: "-16gc", y: "-36gc" }, // A: top-left
                { x: "-18gc", y: "36gc" },  // B: bottom-left
                { x: "16gc", y: "36gc" },   // C: bottom-right
                { x: "16gc", y: "-36gc" }   // D: top-right
              ]
            },
            effectiveAngleConfig: {
              show: isComplete ? 'none' : 'none', // Hide angle markers when state is complete; shape stays visible with measurement text only
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: !isComplete,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure'
              // When complete: no per-vertex angle config (no interior angle arcs/labels)
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
            // When complete: side length labels on each measured side (BC, AB, CD)
            sideSymbols: isComplete && typeof window !== 'undefined' ? [
              ...(window.page3MeasurementBC_cm ? [{ side: 'BC', type: 'label', label: `${window.page3MeasurementBC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page3MeasurementAB_cm ? [{ side: 'AB', type: 'label', label: `${window.page3MeasurementAB_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page3MeasurementCD_cm ? [{ side: 'CD', type: 'label', label: `${window.page3MeasurementCD_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page3MeasurementDA_cm ? [{ side: 'DA', type: 'label', label: `${window.page3MeasurementDA_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
            ].filter(Boolean) : [],
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
          coordinates: PAGE3_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() {
            // Re-evaluate props each time to get fresh angleConfig
            return getProps();
          }
        };
      })(),
      // Vertical Ruler component - positioned to the right of the shape
      (() => {
        const RULER_CONFIG = {
          labelFontSize: "12gc"
        };
        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE3_SHAPE_DISPLAY_COORDINATES;
        const shapeConfig = getShapeConfig("RECTANGLE");
        const rectangleVertices = [
          { row: 2, col: 1.5 },
          { row: 7, col: 1.5 },
          { row: 7, col: 9.5 },
          { row: 2, col: 9.5 }
        ];
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / shapeConfig.gridCols, containerHeightGc / shapeConfig.gridRows);
        const gridWidthGc = cellSizeGc * shapeConfig.gridCols;
        const gridHeightGc = cellSizeGc * shapeConfig.gridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / shapeConfig.gridCols;
          const percentY = quadGridPoint.row / shapeConfig.gridRows;
          return {
            x: Math.round(shapeLeft + offsetXGc + percentX * gridWidthGc),
            y: Math.round(shapeTop + offsetYGc + percentY * gridHeightGc)
          };
        };
        const vertexPositions = {
          A: quadGridToPrecisionGrid(rectangleVertices[0]),
          B: quadGridToPrecisionGrid(rectangleVertices[1]),
          C: quadGridToPrecisionGrid(rectangleVertices[2]),
          D: quadGridToPrecisionGrid(rectangleVertices[3])
        };
        const stateMeta = {
          C: { targetVertex: 'B', startVertex: 'B', endVertex: 'C', side: 'BC', expectedLengthCm: 20 },
          B: { targetVertex: 'B', startVertex: 'B', endVertex: 'A', side: 'AB', expectedLengthCm: 16 },
          D: { targetVertex: 'C', startVertex: 'C', endVertex: 'D', side: 'CD', expectedLengthCm: 16 },
          A: { targetVertex: 'D', startVertex: 'D', endVertex: 'A', side: 'DA', expectedLengthCm: 20 }
        };
        const getStateMeta = (state) => stateMeta[state] || stateMeta.C;
        const toViewportPoint = (gridPoint) => {
          const vw = window.innerWidth || 1600;
          const vh = window.innerHeight || 900;
          const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
          return { x: (gridPoint.x / gc) * vw, y: (gridPoint.y / gr) * vh };
        };
        const getLineForState = (state) => {
          const meta = getStateMeta(state);
          const startPos = vertexPositions[meta.startVertex];
          const endPos = vertexPositions[meta.endVertex];
          return [{ x1: startPos.x, y1: startPos.y, x2: endPos.x, y2: endPos.y, label: meta.side }];
        };
        const getSnapConfig = () => {
          if (typeof window === 'undefined') return { circleSnapTarget: null };
          const state = window.page3State || 'C';
          const step = window.page3Step !== undefined ? window.page3Step : 1;
          if (step !== 1 || state === 'complete') return { circleSnapTarget: null };
          const pos = vertexPositions[getStateMeta(state).targetVertex];
          return { circleSnapTarget: { x: pos.x, y: pos.y, radius: 187.5 } };
        };
        if (typeof window !== 'undefined') {
          window.updatePage3RulerSnapWindowVars = function () {
            const state = window.page3State || 'C';
            const step = window.page3Step !== undefined ? window.page3Step : 1;
            const meta = getStateMeta(state);
            window.page3CircleSnapTarget = step === 1 && state !== 'complete'
              ? { x: vertexPositions[meta.targetVertex].x, y: vertexPositions[meta.targetVertex].y, radius: 187.5 }
              : null;
            if (step === 2 && state !== 'complete') {
              window.page3RulerSnapLines = getLineForState(state);
              window.page3RulerSnapMode = 'line';
              window.page3RulerSnapLineTolerance = 5;
            } else {
              window.page3RulerSnapLines = [];
              window.page3RulerSnapMode = 'free';
            }
          };
          window.updatePage3RulerSnapWindowVars();
        }
        return {
          id: "page3-ruler",
          name: "page3-ruler",
          type: "custom",
          get coordinates() {
            const state = typeof window !== 'undefined' ? (window.page3State || 'C') : 'C';
            const step = typeof window !== 'undefined' && window.page3Step !== undefined ? window.page3Step : 1;
            const isSnapped = typeof window !== 'undefined' && window.page3RulerSnapped === true;
            if (step === 2 && isSnapped && state !== 'complete') {
              const pos = vertexPositions[getStateMeta(state).targetVertex];
              return [pos.x, pos.y, pos.x, pos.y];
            }
            return [1000, 500, 1000, 500];
          },
          zIndex: 5000,
          get props() {
            const state = typeof window !== 'undefined' ? (window.page3State || 'C') : 'C';
            const step = typeof window !== 'undefined' ? (window.page3Step !== undefined ? window.page3Step : 1) : 1;
            const isSnapped = typeof window !== 'undefined' ? window.page3RulerSnapped === true : false;
            const stepConfig = page3ProtractorFlowConfig.helpers.getStepConfig(state, step);
            const currentSnapConfig = getSnapConfig();
            const meta = getStateMeta(state);
            const startGridPos = vertexPositions[meta.startVertex];
            const endGridPos = vertexPositions[meta.endVertex];
            const endViewportPos = toViewportPoint(endGridPos);
            const startViewportPos = toViewportPoint(startGridPos);
            const lengthPx = Math.sqrt(
              Math.pow(endViewportPos.x - startViewportPos.x, 2) +
              Math.pow(endViewportPos.y - startViewportPos.y, 2)
            );
            if (typeof window !== 'undefined') {
              window.updatePage3RulerSnapWindowVars();
              window.page3VertexAPosPx = toViewportPoint(vertexPositions.A);
              window.page3VertexBPosPx = toViewportPoint(vertexPositions.B);
              window.page3VertexCPosPx = toViewportPoint(vertexPositions.C);
              window.page3VertexDPosPx = toViewportPoint(vertexPositions.D);
              window.page3EndMarkerSnapAtDistance = step >= 3 && state !== 'complete' ? { value: meta.expectedLengthCm, unit: 'cm' } : null;
            }
            return {
              componentType: "RulerComponent",
              rulerType: "metric",
              length: "550gc",
              width: "60gc",
              color: "#333",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              ...(state === 'complete' ? { display: 'none' } : {}),
              showTickMarks: true,
              showLabels: true,
              majorTickInterval: 10,
              minorTickInterval: 1,
              labelInterval: 10,
              labelFontSize: RULER_CONFIG.labelFontSize,
              mode: step === 1 ? "interactive" : (step === 2 ? "rotatable" : "static"),
              isDraggable: step === 1 && !isSnapped,
              isRotatable: step === 2,
              rotation: 90,
              showRotationHandle: step === 2,
              showRotationCircle: step === 2,
              snapMode: step === 2 ? 'line' : 'free',
              snapLines: step === 2 ? getLineForState(state) : [],
              snapLineRotationTolerance: stepConfig?.rulerSnapToSide?.rotationTolerance ?? 5,
              snapPointPosition: isSnapped ? { x: startGridPos.x, y: startGridPos.y } : null,
              measurementMarkers: {
                enabled: step >= 3 && state !== 'complete',
                maxMarkers: 2,
                allowClick: step >= 3 && state !== 'complete',
                allowDrag: step >= 3 && state !== 'complete',
                snapToTicks: true,
                color: "#FF0000",
                showDistance: step >= 3 && state !== 'complete',
                markerSize: 28,
                distanceFontSize: 30,
                endMarkerSnapAtPoint: step >= 3 && state !== 'complete' ? endViewportPos : null,
                endMarkerSnapLengthAC_px: step >= 3 && state !== 'complete' ? lengthPx : null,
                endMarkerSnapTolerance: step >= 3 && state !== 'complete' ? 0.25 : null,
                endMarkerSnapAtDistance: step >= 3 && state !== 'complete' ? { value: meta.expectedLengthCm, unit: 'cm' } : null,
                measurementDisplayMode: step >= 3 && state !== 'complete' ? 'readingFromStart' : 'distance'
              },
              lineDrawing: {
                enabled: false,
                mode: "click",
                integration: true
              },
              cursor: step === 1 ? "move" : "default",
              opacity: 1,
              circleSnapTarget: currentSnapConfig.circleSnapTarget,
              showCircleSnapIndicator: false,
              highlightNearestSnap: true,
              zeroMarkHighlight: stepConfig?.zeroMarkHighlight === true,
              onCircleSnap: () => {
                if (typeof window === 'undefined') return;
                const currentState = window.page3State || 'C';
                const currentStep = window.page3Step !== undefined ? window.page3Step : 1;
                if (currentStep !== 1 || currentState === 'complete') return;
                window.page3RulerSnapped = true;
                const oldStep = window.page3Step;
                window.page3Step = 2;
                if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
                window.dispatchEvent(new CustomEvent('page3StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                window.dispatchEvent(new CustomEvent('page3StateChanged', { detail: { state: currentState, step: 2 } }));
              },
              onCircleUnsnap: () => {},
              onSnapToLine: () => {
                if (typeof window === 'undefined') return;
                const currentState = window.page3State || 'C';
                const currentStep = window.page3Step !== undefined ? window.page3Step : 1;
                if (currentStep !== 2 || currentState === 'complete') return;
                const currentMeta = getStateMeta(currentState);
                const currentStartViewportPos = toViewportPoint(vertexPositions[currentMeta.startVertex]);
                const currentEndViewportPos = toViewportPoint(vertexPositions[currentMeta.endVertex]);
                const currentLengthPx = Math.sqrt(
                  Math.pow(currentEndViewportPos.x - currentStartViewportPos.x, 2) +
                  Math.pow(currentEndViewportPos.y - currentStartViewportPos.y, 2)
                );
                const oldStep = window.page3Step;
                window.page3Step = 3;
                window.page3EndMarkerSnapLengthAC_px = currentLengthPx;
                window.page3EndMarkerSnapPosition = null;
                window.page3EndMarkerSnapTolerance = 0.25;
                window.page3EndMarkerSnapAtPoint = currentEndViewportPos;
                window.page3EndMarkerSnapAtDistance = { value: currentMeta.expectedLengthCm, unit: 'cm' };
                if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
                window.dispatchEvent(new CustomEvent('page3StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                window.dispatchEvent(new CustomEvent('page3StateChanged', { detail: { state: currentState, step: 3 } }));
              },
              onPositionChange: (position) => {
                if (!position || typeof window === 'undefined') return;
                const step = window.page3Step !== undefined ? window.page3Step : 1;
                const allowWhenSnapped = (window.page3RulerSnapped === true && step === 2);
                if (window.page3RulerSnapped === true && !allowWhenSnapped) {
                  return;
                }
                const leftColumnLeft = 5;
                const leftColumnRight = 1195;
                const leftColumnTop = 85;
                const leftColumnBottom = 800;
                const rulerLengthGc = 536;
                const rulerWidthGc = 60;
                const gridRows = typeof GridPrecisionConfig !== 'undefined'
                  ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows
                  : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined'
                  ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols
                  : 1600;
                const viewportWidth = window.innerWidth || 1600;
                const viewportHeight = window.innerHeight || 900;
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                const minCenterX = leftColumnLeft + (rulerWidthGc / 2);
                const maxCenterX = leftColumnRight - (rulerWidthGc / 2);
                const minCenterY = leftColumnTop + (rulerLengthGc / 2);
                const maxCenterY = leftColumnBottom - (rulerLengthGc / 2);
                const constrainedGridX = Math.max(minCenterX, Math.min(maxCenterX, gridX));
                const constrainedGridY = Math.max(minCenterY, Math.min(maxCenterY, gridY));
                if (constrainedGridX !== gridX || constrainedGridY !== gridY) {
                  requestAnimationFrame(() => {
                    const rulerElement = document.getElementById('page3-ruler');
                    if (rulerElement) {
                      const xPercent = (constrainedGridX / gridCols) * 100;
                      const yPercent = (constrainedGridY / gridRows) * 100;
                      rulerElement.style.left = `${xPercent}%`;
                      rulerElement.style.top = `${yPercent}%`;
                      const transform = rulerElement.style.transform;
                      if (transform && transform.includes('translate')) {
                        rulerElement.style.transform = `translate(-50%, -50%)`;
                      }
                    }
                  });
                }
              }
            };
          }
        };
      })(),
      // Text box with measurement display - uses page3ProtractorFlowConfig (advance on measurement snap, no click required)
      {
        id: "page3-measurement-text",
        name: "page3-measurement-text",
        coordinates: [850, 250, 1150, 600], // Moved left by 150gc from previous position
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Get measurement text from config based on current state and step
            const state = typeof window !== 'undefined' && window.page3State ? window.page3State : 'C';
            const step = typeof window !== 'undefined' && window.page3Step !== undefined ? window.page3Step : 1;
            const showMeasurement = typeof window !== 'undefined' && window.page3MeasurementText;
            if (showMeasurement) {
              return window.page3MeasurementText;
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
      // Animated dot moving from ruler zero mark to the active rectangle vertex
      (() => {
        const shapeConfig = getShapeConfig("RECTANGLE");
        const rectangleVertices = [
          { row: 2, col: 1.5 },
          { row: 7, col: 1.5 },
          { row: 7, col: 9.5 },
          { row: 2, col: 9.5 }
        ];
        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE3_SHAPE_DISPLAY_COORDINATES;
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / shapeConfig.gridCols, containerHeightGc / shapeConfig.gridRows);
        const gridWidthGc = cellSizeGc * shapeConfig.gridCols;
        const gridHeightGc = cellSizeGc * shapeConfig.gridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / shapeConfig.gridCols;
          const percentY = quadGridPoint.row / shapeConfig.gridRows;
          return {
            x: Math.round(shapeLeft + offsetXGc + percentX * gridWidthGc),
            y: Math.round(shapeTop + offsetYGc + percentY * gridHeightGc)
          };
        };
        const vertexAPos = quadGridToPrecisionGrid(rectangleVertices[0]);
        const vertexBPos = quadGridToPrecisionGrid(rectangleVertices[1]);
        const vertexCPos = quadGridToPrecisionGrid(rectangleVertices[2]);
        const vertexDPos = quadGridToPrecisionGrid(rectangleVertices[3]);
        const rulerCoords = [1000, 500, 1000, 500];
        const rulerCenterX = (rulerCoords[0] + rulerCoords[2]) / 2;
        const rulerCenterY = (rulerCoords[1] + rulerCoords[3]) / 2;

        let animatedDotFrom = {
          x: rulerCenterX,
          y: rulerCenterY
        };
        if (typeof window !== 'undefined' && window.rulerZeroMarkPosition) {
          const viewportWidth = window.innerWidth || 1600;
          const viewportHeight = window.innerHeight || 900;
          const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
          const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
            GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;

          animatedDotFrom = {
            x: (window.rulerZeroMarkPosition.x / viewportWidth) * gridCols,
            y: (window.rulerZeroMarkPosition.y / viewportHeight) * gridRows
          };
        }

        const getTargetPosition = () => {
          const state = typeof window !== 'undefined' ? (window.page3State || 'C') : 'C';
          if (state === 'A') return vertexDPos;
          if (state === 'B') return vertexBPos;
          if (state === 'D') return vertexCPos;
          return vertexBPos;
        };

        const animatedDotTo = getTargetPosition();

        if (typeof window !== 'undefined') {
          window.page3AnimatedDotFrom = animatedDotFrom;
          window.page3AnimatedDotTo = animatedDotTo;
          const updateAnimatedDotFrom = () => {
            if (window.rulerZeroMarkPosition && window.rulerZeroMarkPosition.x !== undefined) {
              const viewportWidth = window.innerWidth || 1600;
              const viewportHeight = window.innerHeight || 900;
              const gridCols = typeof GridPrecisionConfig !== 'undefined' ?
                GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
              const gridRows = typeof GridPrecisionConfig !== 'undefined' ?
                GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;

              const updatedFrom = {
                x: (window.rulerZeroMarkPosition.x / viewportWidth) * gridCols,
                y: (window.rulerZeroMarkPosition.y / viewportHeight) * gridRows
              };
              if (window.page3AnimatedDotFrom.x !== updatedFrom.x || window.page3AnimatedDotFrom.y !== updatedFrom.y) {
                window.page3AnimatedDotFrom = updatedFrom;
              }
            }
          };
          updateAnimatedDotFrom();
          window.addEventListener('rulerPositionChanged', updateAnimatedDotFrom);
          setTimeout(updateAnimatedDotFrom, 100);
          setTimeout(updateAnimatedDotFrom, 500);
        }

        return {
          id: "page3-animated-dot",
          name: "page3-animated-dot",
          type: "custom",
          coordinates: [rulerCenterX, rulerCenterY, rulerCenterX, rulerCenterY],
          zIndex: 10001,
          props: {
            componentType: "AnimatedDotComponent",
            currentPage: 3,
            startX: rulerCenterX,
            startY: rulerCenterY,
            vertexAPos: vertexAPos,
            vertexBPos: vertexBPos,
            vertexCPos: vertexCPos,
            vertexDPos: vertexDPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })()
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
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
          text: getI18nText("pages.page2.headerText", "Let's learn how to measure the length of any side of △ABC."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - same flow as page 2 (page2ProtractorFlowConfig)
      {
        id: "page4-instruction",
        name: "page4-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            const state = typeof window !== 'undefined' && window.page4State ? window.page4State : 'C';
            const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
            return page2ProtractorFlowConfig.helpers.getInstructionText(state, step) || '';
          })(),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component in right column (same as page 2 - steps to measure a side)
      {
        id: "page4-steps",
        name: "page4-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800], // Positioned in the right column - same as page 2
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page2.solutionSteps.headerText", "Steps to measure a side of △"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const fallbackSteps = ["Center the Zero mark on the scale on any vertex.", "Rotate the scale to align parallel to the side to measure its length.", "Use the measurement markers to measure the side length."];
            const stepsArray = getI18nText("pages.page2.solutionSteps.steps", fallbackSteps);
            if (typeof stepsArray === 'string' && stepsArray.startsWith('[Missing:')) {
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






      // Shape display - QuadrilateralComponent (Right-angle triangle, same coordinates as page 2)
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const getProps = () => {
          const pageState = typeof window !== 'undefined' && window.page4State ? window.page4State : null;
          const isComplete = pageState === 'complete';
          return {
            componentType: "QuadrilateralComponent",
            page4StateKey: pageState || 'C',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              labelOffsets: [
                { x: "-2gc", y: "-40gc" },
                { x: "-20gc", y: "40gc" },
                { x: "0gc", y: "40gc" }
              ]
            },
            effectiveAngleConfig: {
              show: 'none',
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: !isComplete,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure'
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
            sideSymbols: isComplete && typeof window !== 'undefined' ? [
              ...(window.page4MeasurementBC_cm ? [{ side: 'BC', type: 'label', label: `${window.page4MeasurementBC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page4MeasurementAB_cm ? [{ side: 'AB', type: 'label', label: `${window.page4MeasurementAB_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page4MeasurementAC_cm ? [{ side: 'CA', type: 'label', label: `${window.page4MeasurementAC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
            ].filter(Boolean) : [],
          };
        };
        if (typeof window !== 'undefined') window.page4ShapeDisplayGetProps = getProps;
        return {
          id: "page4-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: PAGE2_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Ruler component - same flow as page 2 but for right-angle triangle (states C/B/A, steps 1-4)
      (() => {
        const RULER_CONFIG = { labelFontSize: "12gc" };
        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE4_SHAPE_DISPLAY_COORDINATES;
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = shapeLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = shapeTop + offsetYGc + percentY * gridHeightGc;
          return { x: Math.round(actualX), y: Math.round(actualY) };
        };
        const vertexAPos = quadGridToPrecisionGrid(triangleVertices[0]);
        const vertexBPos = quadGridToPrecisionGrid(triangleVertices[1]);
        const vertexCPos = quadGridToPrecisionGrid(triangleVertices[2]);
        const getSnapConfig = () => {
          if (typeof window === 'undefined') return { circleSnapTarget: null };
          const state = window.page4State || 'C';
          const step = window.page4Step !== undefined ? window.page4Step : 1;
          if (state === 'A' && step === 1) return { circleSnapTarget: { x: vertexAPos.x, y: vertexAPos.y, radius: 187.5 }, showSnapIndicators: true };
          if (state === 'C' && step === 1) return { circleSnapTarget: { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 }, showSnapIndicators: true };
          if (state === 'B' && step === 1) return { circleSnapTarget: { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 }, showSnapIndicators: true };
          return { circleSnapTarget: null };
        };
        if (typeof window !== 'undefined') {
          window.updatePage4RulerSnapWindowVars = function () {
            const state = window.page4State || 'C';
            const step = window.page4Step !== undefined ? window.page4Step : 1;
            if (step === 1) {
              if (state === 'A') window.page4CircleSnapTarget = { x: vertexAPos.x, y: vertexAPos.y, radius: 187.5 };
              else if (state === 'C' || state === 'B') window.page4CircleSnapTarget = { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 };
              else window.page4CircleSnapTarget = null;
            } else window.page4CircleSnapTarget = null;
            if (state === 'A' && step === 2) {
              window.page4RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }];
              window.page4RulerSnapMode = 'line';
              window.page4RulerSnapLineTolerance = 5;
            } else if (state === 'C' && step === 2) {
              window.page4RulerSnapLines = [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }];
              window.page4RulerSnapMode = 'line';
              window.page4RulerSnapLineTolerance = 5;
            } else if (state === 'B' && step === 2) {
              window.page4RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }];
              window.page4RulerSnapMode = 'line';
              window.page4RulerSnapLineTolerance = 15;
            } else {
              window.page4RulerSnapLines = [];
              window.page4RulerSnapMode = 'free';
            }
          };
        }
        return {
          id: "page4-ruler",
          name: "page4-ruler",
          type: "custom",
          get coordinates() {
            const state = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
            const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
            const isSnapped = typeof window !== 'undefined' && window.page4RulerSnapped === true;
            if (step === 2 && isSnapped && (state === 'A' || state === 'B' || state === 'C')) {
              const v = state === 'A' ? vertexAPos : vertexBPos;
              return [v.x, v.y, v.x, v.y];
            }
            return [1000, 500, 1000, 500];
          },
          zIndex: 5000,
          get props() {
            const state = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
            const step = typeof window !== 'undefined' ? (window.page4Step !== undefined ? window.page4Step : 1) : 1;
            if (typeof window !== 'undefined') {
              if (state === 'A' && step === 2) window.page4RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }];
              else if (state === 'C' && step === 2) window.page4RulerSnapLines = [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }];
              else if (state === 'B' && step === 2) window.page4RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }];
              else window.page4RulerSnapLines = [];
              window.page4RulerSnapMode = (state === 'A' && step === 2) || (state === 'C' && step === 2) || (state === 'B' && step === 2) ? 'line' : 'free';
              window.page4RulerSnapLineTolerance = 5;
            }
            const currentSnapConfig = getSnapConfig();
            const isSnapped = typeof window !== 'undefined' ? (window.page4RulerSnapped === true) : false;
            const shouldBeDraggable = (state === 'A' || state === 'B' || state === 'C') && step === 1 && (state === 'B' || !isSnapped);
            const shouldAllowRotation = step === 2 && (isSnapped || (state === 'A' || state === 'C' || state === 'B'));
            const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
            const shouldHighlightZeroMark = stepConfig?.zeroMarkHighlight === true;
            return {
              componentType: "RulerComponent",
              rulerType: "metric",
              length: "550gc",
              width: "60gc",
              color: "#333",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              ...(state === 'complete' ? { display: 'none' } : {}),
              showTickMarks: true,
              showLabels: true,
              majorTickInterval: 10,
              minorTickInterval: 1,
              labelInterval: 10,
              labelFontSize: RULER_CONFIG.labelFontSize,
              mode: shouldBeDraggable ? "interactive" : (shouldAllowRotation ? "rotatable" : "static"),
              isDraggable: shouldBeDraggable,
              isRotatable: shouldAllowRotation,
              rotation: 90,
              showRotationHandle: shouldAllowRotation,
              showRotationCircle: shouldAllowRotation,
              snapMode: ((state === 'A' || state === 'C' || state === 'B') && step === 2) ? 'line' : 'free',
              snapLines: (state === 'A' && step === 2) ? [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }] : (state === 'C' && step === 2) ? [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }] : (state === 'B' && step === 2) ? [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }] : [],
              snapLineRotationTolerance: ((state === 'A' || state === 'C' || state === 'B') && step === 2) ? (stepConfig?.rulerSnapToSide?.rotationTolerance ?? 5) : undefined,
              snapPointPosition: isSnapped ? (() => {
                const snapState = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
                if (snapState === 'A') return { x: vertexAPos.x, y: vertexAPos.y };
                if (snapState === 'C' || snapState === 'B') return { x: vertexBPos.x, y: vertexBPos.y };
                return null;
              })() : null,
              measurementMarkers: (() => {
                const mState = typeof window !== 'undefined' ? (window.page4State || 'C') : 'C';
                const mStep = typeof window !== 'undefined' ? (window.page4Step !== undefined ? window.page4Step : 1) : 1;
                const shouldHideMarkers = (mState === 'A' || mState === 'B' || mState === 'C') && (mStep === 1 || mStep === 2);
                const endMarkerSnapAtPoint = ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3 && typeof window !== 'undefined') ? (() => {
                  const vw = window.innerWidth || 1600;
                  const vh = window.innerHeight || 900;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                  if (mState === 'A' || mState === 'C') return { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  if (mState === 'B') return { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  return null;
                })() : null;
                const lengthPx = ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3 && typeof window !== 'undefined') ? (() => {
                  const vw = window.innerWidth || 1600;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const scale = vw / gc;
                  if (mState === 'A') return Math.sqrt(Math.pow(vertexCPos.x - vertexAPos.x, 2) + Math.pow(vertexCPos.y - vertexAPos.y, 2)) * scale;
                  if (mState === 'C') return Math.sqrt(Math.pow(vertexCPos.x - vertexBPos.x, 2) + Math.pow(vertexCPos.y - vertexBPos.y, 2)) * scale;
                  if (mState === 'B') return Math.sqrt(Math.pow(vertexBPos.x - vertexAPos.x, 2) + Math.pow(vertexBPos.y - vertexAPos.y, 2)) * scale;
                  return null;
                })() : null;
                if (typeof window !== 'undefined' && (mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3) {
                  window.page4EndMarkerSnapLengthAC_px = lengthPx;
                  window.page4EndMarkerSnapTolerance = 0.25;
                  window.page4EndMarkerSnapAtPoint = endMarkerSnapAtPoint;
                  window.page4EndMarkerSnapPosition = null;
                  window.page4EndMarkerSnapAtDistance = (mState === 'A') ? { value: 16, unit: 'cm' } : (mState === 'C') ? { value: 20, unit: 'cm' } : (mState === 'B') ? { value: 20, unit: 'cm' } : null;
                } else if (typeof window !== 'undefined') {
                  window.page4EndMarkerSnapLengthAC_px = null;
                  window.page4EndMarkerSnapPosition = null;
                  window.page4EndMarkerSnapTolerance = null;
                  window.page4EndMarkerSnapAtPoint = null;
                  window.page4EndMarkerSnapAtDistance = null;
                }
                if (typeof window !== 'undefined' && (mState === 'A' || mState === 'C' || mState === 'B')) {
                  const vw = window.innerWidth || 1600;
                  const vh = window.innerHeight || 900;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                  window.page4VertexAPosPx = { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  window.page4VertexBPosPx = { x: (vertexBPos.x / gc) * vw, y: (vertexBPos.y / gr) * vh };
                  window.page4VertexCPosPx = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                }
                const endMarkerSnapAtDistance = (mState === 'A' && mStep >= 3) ? { value: 16, unit: 'cm' } : (mState === 'C' && mStep >= 3) ? { value: 20, unit: 'cm' } : (mState === 'B' && mStep >= 3) ? { value: 20, unit: 'cm' } : null;
                return {
                  enabled: !shouldHideMarkers,
                  maxMarkers: 2,
                  allowClick: !shouldHideMarkers,
                  allowDrag: !shouldHideMarkers,
                  snapToTicks: true,
                  color: "#FF0000",
                  showDistance: !shouldHideMarkers,
                  markerSize: 28,
                  distanceFontSize: 30,
                  endMarkerSnapAtPoint,
                  endMarkerSnapLengthAC_px: lengthPx,
                  endMarkerSnapTolerance: 0.25,
                  endMarkerSnapAtDistance,
                  measurementDisplayMode: ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3) ? 'readingFromStart' : 'distance'
                };
              })(),
              lineDrawing: { enabled: false, mode: "click", integration: true },
              cursor: shouldBeDraggable ? "move" : "default",
              opacity: 1,
              circleSnapTarget: currentSnapConfig.circleSnapTarget,
              showCircleSnapIndicator: false,
              highlightNearestSnap: true,
              zeroMarkHighlight: shouldHighlightZeroMark,
              onCircleSnap: (snapData) => {
                if (typeof window === 'undefined') return;
                const currentState = window.page4State || 'C';
                const currentStep = window.page4Step !== undefined ? window.page4Step : 1;
                if (currentState === 'A' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page4RulerSnapped = true;
                      const oldStep = window.page4Step;
                      window.page4Step = 2;
                      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
                if (currentState === 'C' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page4RulerSnapped = true;
                      const oldStep = window.page4Step;
                      window.page4Step = 2;
                      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
                if (currentState === 'B' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page4RulerSnapped = true;
                      const oldStep = window.page4Step;
                      window.page4Step = 2;
                      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
              },
              onCircleUnsnap: () => { },
              onSnapToLine: (snapLine, snappedRotation) => {
                if (typeof window === 'undefined') return;
                const currentState = window.page4State || 'C';
                const currentStep = window.page4Step !== undefined ? window.page4Step : 1;
                const vw = window.innerWidth || 1600;
                const vh = window.innerHeight || 900;
                const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const scale = vw / gc;
                if (currentState === 'A' && currentStep === 2) {
                  const oldStep = window.page4Step;
                  window.page4Step = 3;
                  const lengthAC = Math.sqrt(Math.pow(vertexCPos.x - vertexAPos.x, 2) + Math.pow(vertexCPos.y - vertexAPos.y, 2));
                  window.page4EndMarkerSnapLengthAC_px = lengthAC * scale;
                  window.page4EndMarkerSnapPosition = null;
                  window.page4EndMarkerSnapTolerance = 0.25;
                  window.page4EndMarkerSnapAtPoint = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  window.page4EndMarkerSnapAtDistance = { value: 16, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
                if (currentState === 'C' && currentStep === 2) {
                  const oldStep = window.page4Step;
                  window.page4Step = 3;
                  const lengthBC = Math.sqrt(Math.pow(vertexCPos.x - vertexBPos.x, 2) + Math.pow(vertexCPos.y - vertexBPos.y, 2));
                  window.page4EndMarkerSnapLengthAC_px = lengthBC * scale;
                  window.page4EndMarkerSnapPosition = null;
                  window.page4EndMarkerSnapTolerance = 0.25;
                  window.page4EndMarkerSnapAtPoint = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  window.page4EndMarkerSnapAtDistance = { value: 20, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
                if (currentState === 'B' && currentStep === 2) {
                  const oldStep = window.page4Step;
                  window.page4Step = 3;
                  const lengthAB = Math.sqrt(Math.pow(vertexBPos.x - vertexAPos.x, 2) + Math.pow(vertexBPos.y - vertexAPos.y, 2));
                  window.page4EndMarkerSnapLengthAC_px = lengthAB * scale;
                  window.page4EndMarkerSnapPosition = null;
                  window.page4EndMarkerSnapTolerance = 0.25;
                  window.page4EndMarkerSnapAtPoint = { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  window.page4EndMarkerSnapAtDistance = { value: 20, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
              },
              onPositionChange: (position) => {
                if (!position || typeof window === 'undefined') return;
                const step = window.page4Step !== undefined ? window.page4Step : 1;
                const allowWhenSnapped = (window.page4RulerSnapped === true && step === 2);
                if (window.page4RulerSnapped === true && !allowWhenSnapped) return;
                const leftColumnLeft = 5, leftColumnRight = 1195, leftColumnTop = 85, leftColumnBottom = 800;
                const rulerLengthGc = 536, rulerWidthGc = 60;
                const gridRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                const viewportWidth = window.innerWidth || 1600;
                const viewportHeight = window.innerHeight || 900;
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                const minCenterX = leftColumnLeft + (rulerWidthGc / 2);
                const maxCenterX = leftColumnRight - (rulerWidthGc / 2);
                const minCenterY = leftColumnTop + (rulerLengthGc / 2);
                const maxCenterY = leftColumnBottom - (rulerLengthGc / 2);
                const constrainedGridX = Math.max(minCenterX, Math.min(maxCenterX, gridX));
                const constrainedGridY = Math.max(minCenterY, Math.min(maxCenterY, gridY));
                if (constrainedGridX !== gridX || constrainedGridY !== gridY) {
                  requestAnimationFrame(() => {
                    const rulerElement = document.getElementById('page4-ruler');
                    if (rulerElement) {
                      const xPercent = (constrainedGridX / gridCols) * 100;
                      const yPercent = (constrainedGridY / gridRows) * 100;
                      rulerElement.style.left = `${xPercent}%`;
                      rulerElement.style.top = `${yPercent}%`;
                      if (rulerElement.style.transform && rulerElement.style.transform.includes('translate')) {
                        rulerElement.style.transform = `translate(-50%, -50%)`;
                      }
                    }
                  });
                }
              }
            };
          }
        };
      })(),
      // Animated dot moving from ruler zero mark to vertex (right-angle triangle)
      (() => {
        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE4_SHAPE_DISPLAY_COORDINATES;
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = shapeLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = shapeTop + offsetYGc + percentY * gridHeightGc;
          return { x: Math.round(actualX), y: Math.round(actualY) };
        };
        const vertexAPos = quadGridToPrecisionGrid(triangleVertices[0]);
        const vertexBPos = quadGridToPrecisionGrid(triangleVertices[1]);
        const vertexCPos = quadGridToPrecisionGrid(triangleVertices[2]);
        const rulerCenterX = 1000;
        const rulerCenterY = 500;
        return {
          id: "page4-animated-dot",
          name: "page4-animated-dot",
          type: "custom",
          coordinates: [rulerCenterX, rulerCenterY, rulerCenterX, rulerCenterY],
          zIndex: 10001,
          props: {
            componentType: "AnimatedDotComponent",
            currentPage: 4,
            startX: rulerCenterX,
            startY: rulerCenterY,
            vertexAPos,
            vertexBPos,
            vertexCPos,
            size: "24gc",
            innerSize: "8gc",
            color: "#FF9900",
            borderColor: "#FF9900",
            borderWidth: "3gc"
          }
        };
      })(),
      // Text box with measurement (same as page 2 - ruler flow)
      {
        id: "page4-measurement-text",
        name: "page4-measurement-text",
        coordinates: [850, 250, 1150, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            const state = typeof window !== 'undefined' && window.page4State ? window.page4State : 'C';
            const step = typeof window !== 'undefined' && window.page4Step !== undefined ? window.page4Step : 1;
            const showMeasurement = ((state === 'A' && (step === 3 || step === 4)) || state === 'complete' || (state === 'C' && (step === 3 || step === 4)) || state === 'B') && typeof window !== 'undefined' && window.page4MeasurementText;
            if (showMeasurement) return window.page4MeasurementText;
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
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
          headerRowHeight: 0, // No header row (same as page 3)
          questionRowHeight: 30, // Question row (must sum = 100%, same as page 3)
          optionsRowHeight: 45, // Options row
          feedbackRowHeight: 25, // Feedback row
          optionButtonWidth: 80,
          optionButtonHeight: 75,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT3 (3 options in vertical layout)
          // Isosceles Triangle is correct for page 5
          options: [
            {
              id: 'equilateral',
              text: getI18nText("pages.page5.quizPanel.options.0.text", "Equilateral Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page5.quizPanel.options.0.feedback", "Incorrect. An equilateral triangle has all three sides equal.")
            },
            {
              id: 'isosceles',
              text: getI18nText("pages.page5.quizPanel.options.1.text", "Isosceles Triangle"),
              iscorrect: true,
              feedback: getI18nText("pages.page5.quizPanel.options.1.feedback", "Correct! An isosceles triangle has exactly two sides equal.")
            },
            {
              id: 'scalene',
              text: getI18nText("pages.page5.quizPanel.options.2.text", "Scalene Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page5.quizPanel.options.2.feedback", "Incorrect. A scalene triangle has no equal sides.")
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

      // Shape display - exact replica of page 3: same coords, same pattern (page 4 complete = right-angle triangle with side labels, no angle markers)
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const getProps = () => {
          if (typeof window !== 'undefined' && typeof window.page4ShapeDisplayGetProps === 'function') {
            const p = window.page4ShapeDisplayGetProps();
            return { ...p, effectiveAngleConfig: { ...p.effectiveAngleConfig, show: 'none', showText: false } };
          }
          return {
            componentType: "QuadrilateralComponent",
            page4StateKey: 'complete',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              labelOffsets: [
                { x: "-2gc", y: "-40gc" },
                { x: "-20gc", y: "40gc" },
                { x: "0gc", y: "40gc" }
              ]
            },
            effectiveAngleConfig: { show: 'none', markerColor: "#FF6600", markerSize: "30gc", showText: false, textColor: "#000000", textSize: "28gc", textMode: 'measure' },
            symmetryAnimationConfig: { duration: 2000, holdTime: 1500, foldLineColor: "#FFFFFF", foldLineStyle: "dashed", foldedHalfColor: "rgba(139, 69, 69, 0.7)", mismatchColor: "#00FFFF", showAxisAlways: false, triangleAxes: [], showVerticalAxis: false, showHorizontalAxis: false, showDiagonalAxis: false, clickableAxis: true, axisExtension: 5 },
            sideSymbols: typeof window !== 'undefined' ? [
              ...(window.page4MeasurementBC_cm ? [{ side: 'BC', type: 'label', label: `${window.page4MeasurementBC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page4MeasurementAB_cm ? [{ side: 'AB', type: 'label', label: `${window.page4MeasurementAB_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page4MeasurementAC_cm ? [{ side: 'CA', type: 'label', label: `${window.page4MeasurementAC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
            ].filter(Boolean) : [],
          };
        };
        if (typeof window !== 'undefined') {
          window.page5ShapeDisplayGetProps = getProps;
        }
        return {
          id: "page5-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: PAGE2_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Measurement text (same coordinates as page 3; page 5 is quiz-only, no flow text)
      {
        id: "page5-measurement-text",
        name: "page5-measurement-text",
        coordinates: [1100, 250, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Page 5 = replica of page 3: no measurement flow text (quiz only)
            return '';
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
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
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Header - same layout as page 2 (Orange text)
      {
        id: "page6-header",
        name: "page6-header",
        coordinates: [25, 20, 1575, 80],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page6.headerText", "Let's learn how to measure the angles of △ABC."),
          fontSize: "40gc",
          color: "#FF9900", // Orange color
          textAlign: "center",
          fontWeight: "bold",
          allowHTML: true, // Allow HTML for styling shape name in white
        },
      },
      // Instruction text - same as page 2 (dynamic from page2ProtractorFlowConfig with page6State/page6Step)
      {
        id: "page6-instruction",
        name: "page6-instruction",
        coordinates: [155, 820, 1445, 895],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            const state = typeof window !== 'undefined' && window.page6State ? window.page6State : 'C';
            const step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
            const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
            if (stepConfig) {
              if (stepConfig.instructionTextDynamic && typeof stepConfig.instructionTextDynamic === 'function') {
                const stateConfig = page2ProtractorFlowConfig.states[state];
                const chosenBaseline = stateConfig?.runtimeState?.chosenBaselineSide;
                if (chosenBaseline) return stepConfig.instructionTextDynamic(chosenBaseline);
              }
              return stepConfig.instructionText;
            }
            return getI18nText("pages.page2.instruction", "Drag the scale to vertex C to measure side BC.");
          })(),
          fontSize: "40gc",
          color: "white",
          textAlign: "center",
        },
      },
      // Steps component - same as page 2 (Steps to measure a side of △)
      {
        id: "page6-steps",
        name: "page6-steps",
        type: "custom",
        coordinates: [1200, 85, 1595, 800],
        zIndex: "var(--z-elevated)",
        props: {
          componentType: "SolutionStepComponent",
          headerText: getI18nText("pages.page2.solutionSteps.headerText", "Steps to measure a side of △"),
          headerFontSize: "32gc",
          headerFontColor: "#ffffff",
          headerTextAlign: "center",
          stepFontSize: "24gc",
          stepFontColor: "#ffffff",
          currentStep: 1,
          steps: (() => {
            const fallbackSteps = ["Center the Zero mark on the scale on any vertex.", "Rotate the scale to align parallel to the side to measure its length.", "Use the measurement markers to measure the side length."];
            const stepsArray = getI18nText("pages.page2.solutionSteps.steps", fallbackSteps);
            if (typeof stepsArray === 'string' && stepsArray.startsWith('[Missing:')) return fallbackSteps.map(text => ({ text }));
            return Array.isArray(stepsArray) ? stepsArray.map((text, idx) => ({ text: text || fallbackSteps[idx] })) : fallbackSteps.map(text => ({ text }));
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
              show: 'none', // Same as page 2: no angle markers (ruler measures sides)
              markerColor: "#FF6600",
              markerSize: "30gc",
              showText: false,
              textColor: "#000000",
              textSize: "28gc",
              textMode: 'measure'
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
            // When complete: side length labels (same as page 2)
            sideSymbols: isComplete && typeof window !== 'undefined' ? [
              ...(window.page6MeasurementBC_cm ? [{ side: 'BC', type: 'label', label: `${window.page6MeasurementBC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page6MeasurementAB_cm ? [{ side: 'AB', type: 'label', label: `${window.page6MeasurementAB_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : []),
              ...(window.page6MeasurementAC_cm ? [{ side: 'CA', type: 'label', label: `${window.page6MeasurementAC_cm} cm`, color: '#FF6600', size: '24gc', position: 0.5 }] : [])
            ].filter(Boolean) : [],
          };
          return props;
        };
        if (typeof window !== 'undefined') window.page6ShapeDisplayGetProps = getProps;
        return {
          id: "page6-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: PAGE2_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Ruler component - exact replica of page 2 (obtuse triangle, states C/B/A, steps 1-4)
      (() => {
        const RULER_CONFIG = { labelFontSize: "12gc" };
        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE2_SHAPE_DISPLAY_COORDINATES;
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = shapeLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = shapeTop + offsetYGc + percentY * gridHeightGc;
          return { x: Math.round(actualX), y: Math.round(actualY) };
        };
        const vertexAPos = quadGridToPrecisionGrid(triangleVertices[0]);
        const vertexBPos = quadGridToPrecisionGrid(triangleVertices[1]);
        const vertexCPos = quadGridToPrecisionGrid(triangleVertices[2]);
        const getSnapConfig = () => {
          if (typeof window === 'undefined') return { circleSnapTarget: null };
          const state = window.page6State || 'C';
          const step = window.page6Step !== undefined ? window.page6Step : 1;
          if (state === 'A' && step === 1) return { circleSnapTarget: { x: vertexAPos.x, y: vertexAPos.y, radius: 187.5 }, showSnapIndicators: true };
          if (state === 'C' && step === 1) return { circleSnapTarget: { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 }, showSnapIndicators: true };
          if (state === 'B' && step === 1) return { circleSnapTarget: { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 }, showSnapIndicators: true };
          return { circleSnapTarget: null };
        };
        if (typeof window !== 'undefined') {
          window.updatePage6RulerSnapWindowVars = function () {
            const state = window.page6State || 'C';
            const step = window.page6Step !== undefined ? window.page6Step : 1;
            if (step === 1) {
              if (state === 'A') window.page6CircleSnapTarget = { x: vertexAPos.x, y: vertexAPos.y, radius: 187.5 };
              else if (state === 'C' || state === 'B') window.page6CircleSnapTarget = { x: vertexBPos.x, y: vertexBPos.y, radius: 187.5 };
              else window.page6CircleSnapTarget = null;
            } else window.page6CircleSnapTarget = null;
            if (state === 'A' && step === 2) {
              window.page6RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }];
              window.page6RulerSnapMode = 'line';
              window.page6RulerSnapLineTolerance = 5;
            } else if (state === 'C' && step === 2) {
              window.page6RulerSnapLines = [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }];
              window.page6RulerSnapMode = 'line';
              window.page6RulerSnapLineTolerance = 5;
            } else if (state === 'B' && step === 2) {
              window.page6RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }];
              window.page6RulerSnapMode = 'line';
              window.page6RulerSnapLineTolerance = 15;
            } else {
              window.page6RulerSnapLines = [];
              window.page6RulerSnapMode = 'free';
            }
          };
        }
        return {
          id: "page6-ruler",
          name: "page6-ruler",
          type: "custom",
          get coordinates() {
            const state = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
            const step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
            const isSnapped = typeof window !== 'undefined' && window.page6RulerSnapped === true;
            if (step === 2 && isSnapped && (state === 'A' || state === 'B' || state === 'C')) {
              const v = state === 'A' ? vertexAPos : vertexBPos;
              return [v.x, v.y, v.x, v.y];
            }
            return [1000, 500, 1000, 500];
          },
          zIndex: 5000,
          get props() {
            const state = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
            const step = typeof window !== 'undefined' ? (window.page6Step !== undefined ? window.page6Step : 1) : 1;
            if (typeof window !== 'undefined') {
              if (state === 'A' && step === 2) window.page6RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }];
              else if (state === 'C' && step === 2) window.page6RulerSnapLines = [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }];
              else if (state === 'B' && step === 2) window.page6RulerSnapLines = [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }];
              else window.page6RulerSnapLines = [];
              window.page6RulerSnapMode = (state === 'A' && step === 2) || (state === 'C' && step === 2) || (state === 'B' && step === 2) ? 'line' : 'free';
              window.page6RulerSnapLineTolerance = 5;
            }
            const currentSnapConfig = getSnapConfig();
            const isSnapped = typeof window !== 'undefined' ? (window.page6RulerSnapped === true) : false;
            const shouldBeDraggable = (state === 'A' || state === 'B' || state === 'C') && step === 1 && (state === 'B' || !isSnapped);
            const shouldAllowRotation = step === 2 && (isSnapped || (state === 'A' || state === 'C' || state === 'B'));
            const stepConfig = page2ProtractorFlowConfig.helpers.getStepConfig(state, step);
            const shouldHighlightZeroMark = stepConfig?.zeroMarkHighlight === true;
            return {
              componentType: "RulerComponent",
              rulerType: "metric",
              length: "550gc",
              width: "60gc",
              color: "#333",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              ...(state === 'complete' ? { display: 'none' } : {}),
              showTickMarks: true,
              showLabels: true,
              majorTickInterval: 10,
              minorTickInterval: 1,
              labelInterval: 10,
              labelFontSize: RULER_CONFIG.labelFontSize,
              mode: shouldBeDraggable ? "interactive" : (shouldAllowRotation ? "rotatable" : "static"),
              isDraggable: shouldBeDraggable,
              isRotatable: shouldAllowRotation,
              rotation: 90,
              showRotationHandle: shouldAllowRotation,
              showRotationCircle: shouldAllowRotation,
              snapMode: ((state === 'A' || state === 'C' || state === 'B') && step === 2) ? 'line' : 'free',
              snapLines: (state === 'A' && step === 2) ? [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'AC' }] : (state === 'C' && step === 2) ? [{ x1: vertexBPos.x, y1: vertexBPos.y, x2: vertexCPos.x, y2: vertexCPos.y, label: 'BC' }] : (state === 'B' && step === 2) ? [{ x1: vertexAPos.x, y1: vertexAPos.y, x2: vertexBPos.x, y2: vertexBPos.y, label: 'AB' }] : [],
              snapLineRotationTolerance: ((state === 'A' || state === 'C' || state === 'B') && step === 2) ? (stepConfig?.rulerSnapToSide?.rotationTolerance ?? 5) : undefined,
              snapPointPosition: isSnapped ? (() => {
                const snapState = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
                if (snapState === 'A') return { x: vertexAPos.x, y: vertexAPos.y };
                if (snapState === 'C' || snapState === 'B') return { x: vertexBPos.x, y: vertexBPos.y };
                return null;
              })() : null,
              measurementMarkers: (() => {
                const mState = typeof window !== 'undefined' ? (window.page6State || 'C') : 'C';
                const mStep = typeof window !== 'undefined' ? (window.page6Step !== undefined ? window.page6Step : 1) : 1;
                const shouldHideMarkers = (mState === 'A' || mState === 'B' || mState === 'C') && (mStep === 1 || mStep === 2);
                const endMarkerSnapAtPoint = ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3 && typeof window !== 'undefined') ? (() => {
                  const vw = window.innerWidth || 1600;
                  const vh = window.innerHeight || 900;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                  if (mState === 'A' || mState === 'C') return { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  if (mState === 'B') return { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  return null;
                })() : null;
                const lengthPx = ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3 && typeof window !== 'undefined') ? (() => {
                  const vw = window.innerWidth || 1600;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const scale = vw / gc;
                  if (mState === 'A') return Math.sqrt(Math.pow(vertexCPos.x - vertexAPos.x, 2) + Math.pow(vertexCPos.y - vertexAPos.y, 2)) * scale;
                  if (mState === 'C') return Math.sqrt(Math.pow(vertexCPos.x - vertexBPos.x, 2) + Math.pow(vertexCPos.y - vertexBPos.y, 2)) * scale;
                  if (mState === 'B') return Math.sqrt(Math.pow(vertexBPos.x - vertexAPos.x, 2) + Math.pow(vertexBPos.y - vertexAPos.y, 2)) * scale;
                  return null;
                })() : null;
                if (typeof window !== 'undefined' && (mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3) {
                  window.page6EndMarkerSnapLengthAC_px = lengthPx;
                  window.page6EndMarkerSnapTolerance = 0.25;
                  window.page6EndMarkerSnapAtPoint = endMarkerSnapAtPoint;
                  window.page6EndMarkerSnapPosition = null;
                  window.page6EndMarkerSnapAtDistance = (mState === 'A') ? { value: 20, unit: 'cm' } : (mState === 'C') ? { value: 20, unit: 'cm' } : (mState === 'B') ? { value: 20, unit: 'cm' } : null;
                } else if (typeof window !== 'undefined') {
                  window.page6EndMarkerSnapLengthAC_px = null;
                  window.page6EndMarkerSnapPosition = null;
                  window.page6EndMarkerSnapTolerance = null;
                  window.page6EndMarkerSnapAtPoint = null;
                  window.page6EndMarkerSnapAtDistance = null;
                }
                if (typeof window !== 'undefined' && (mState === 'A' || mState === 'C' || mState === 'B')) {
                  const vw = window.innerWidth || 1600;
                  const vh = window.innerHeight || 900;
                  const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                  const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                  window.page6VertexAPosPx = { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  window.page6VertexBPosPx = { x: (vertexBPos.x / gc) * vw, y: (vertexBPos.y / gr) * vh };
                  window.page6VertexCPosPx = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                }
                const endMarkerSnapAtDistance = (mState === 'A' && mStep >= 3) ? { value: 20, unit: 'cm' } : (mState === 'C' && mStep >= 3) ? { value: 20, unit: 'cm' } : (mState === 'B' && mStep >= 3) ? { value: 20, unit: 'cm' } : null;
                return {
                  enabled: !shouldHideMarkers,
                  maxMarkers: 2,
                  allowClick: !shouldHideMarkers,
                  allowDrag: !shouldHideMarkers,
                  snapToTicks: true,
                  color: "#FF0000",
                  showDistance: !shouldHideMarkers,
                  markerSize: 28,
                  distanceFontSize: 30,
                  endMarkerSnapAtPoint,
                  endMarkerSnapLengthAC_px: lengthPx,
                  endMarkerSnapTolerance: 0.25,
                  endMarkerSnapAtDistance,
                  measurementDisplayMode: ((mState === 'A' || mState === 'C' || mState === 'B') && mStep >= 3) ? 'readingFromStart' : 'distance'
                };
              })(),
              lineDrawing: { enabled: false, mode: "click", integration: true },
              cursor: shouldBeDraggable ? "move" : "default",
              opacity: 1,
              circleSnapTarget: currentSnapConfig.circleSnapTarget,
              showCircleSnapIndicator: false,
              highlightNearestSnap: true,
              zeroMarkHighlight: shouldHighlightZeroMark,
              onCircleSnap: (snapData) => {
                if (typeof window === 'undefined') return;
                const currentState = window.page6State || 'C';
                const currentStep = window.page6Step !== undefined ? window.page6Step : 1;
                if (currentState === 'A' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page6RulerSnapped = true;
                      const oldStep = window.page6Step;
                      window.page6Step = 2;
                      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
                if (currentState === 'C' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page6RulerSnapped = true;
                      const oldStep = window.page6Step;
                      window.page6Step = 2;
                      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
                if (currentState === 'B' && currentStep === 1) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.page6RulerSnapped = true;
                      const oldStep = window.page6Step;
                      window.page6Step = 2;
                      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 2, previousStep: oldStep } }));
                      setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 2 } })); }, 50);
                    });
                  });
                }
              },
              onCircleUnsnap: () => { },
              onSnapToLine: (snapLine, snappedRotation) => {
                if (typeof window === 'undefined') return;
                const currentState = window.page6State || 'C';
                const currentStep = window.page6Step !== undefined ? window.page6Step : 1;
                const vw = window.innerWidth || 1600;
                const vh = window.innerHeight || 900;
                const gc = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                const gr = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const scale = vw / gc;
                if (currentState === 'A' && currentStep === 2) {
                  const oldStep = window.page6Step;
                  window.page6Step = 3;
                  const lengthAC = Math.sqrt(Math.pow(vertexCPos.x - vertexAPos.x, 2) + Math.pow(vertexCPos.y - vertexAPos.y, 2));
                  window.page6EndMarkerSnapLengthAC_px = lengthAC * scale;
                  window.page6EndMarkerSnapPosition = null;
                  window.page6EndMarkerSnapTolerance = 0.25;
                  window.page6EndMarkerSnapAtPoint = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  window.page6EndMarkerSnapAtDistance = { value: 20, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
                if (currentState === 'C' && currentStep === 2) {
                  const oldStep = window.page6Step;
                  window.page6Step = 3;
                  const lengthBC = Math.sqrt(Math.pow(vertexCPos.x - vertexBPos.x, 2) + Math.pow(vertexCPos.y - vertexBPos.y, 2));
                  window.page6EndMarkerSnapLengthAC_px = lengthBC * scale;
                  window.page6EndMarkerSnapPosition = null;
                  window.page6EndMarkerSnapTolerance = 0.25;
                  window.page6EndMarkerSnapAtPoint = { x: (vertexCPos.x / gc) * vw, y: (vertexCPos.y / gr) * vh };
                  window.page6EndMarkerSnapAtDistance = { value: 20, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
                if (currentState === 'B' && currentStep === 2) {
                  const oldStep = window.page6Step;
                  window.page6Step = 3;
                  const lengthAB = Math.sqrt(Math.pow(vertexBPos.x - vertexAPos.x, 2) + Math.pow(vertexBPos.y - vertexAPos.y, 2));
                  window.page6EndMarkerSnapLengthAC_px = lengthAB * scale;
                  window.page6EndMarkerSnapPosition = null;
                  window.page6EndMarkerSnapTolerance = 0.25;
                  window.page6EndMarkerSnapAtPoint = { x: (vertexAPos.x / gc) * vw, y: (vertexAPos.y / gr) * vh };
                  window.page6EndMarkerSnapAtDistance = { value: 20, unit: 'cm' };
                  window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 3, previousStep: oldStep } }));
                  setTimeout(() => { window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: currentState, step: 3 } })); }, 50);
                }
              },
              onPositionChange: (position) => {
                if (!position || typeof window === 'undefined') return;
                const step = window.page6Step !== undefined ? window.page6Step : 1;
                const allowWhenSnapped = (window.page6RulerSnapped === true && step === 2);
                if (window.page6RulerSnapped === true && !allowWhenSnapped) return;
                const leftColumnLeft = 5, leftColumnRight = 1195, leftColumnTop = 85, leftColumnBottom = 800;
                const rulerLengthGc = 536, rulerWidthGc = 60;
                const gridRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
                const gridCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
                const viewportWidth = window.innerWidth || 1600;
                const viewportHeight = window.innerHeight || 900;
                const gridX = (position.x / viewportWidth) * gridCols;
                const gridY = (position.y / viewportHeight) * gridRows;
                const minCenterX = leftColumnLeft + (rulerWidthGc / 2);
                const maxCenterX = leftColumnRight - (rulerWidthGc / 2);
                const minCenterY = leftColumnTop + (rulerLengthGc / 2);
                const maxCenterY = leftColumnBottom - (rulerLengthGc / 2);
                const constrainedGridX = Math.max(minCenterX, Math.min(maxCenterX, gridX));
                const constrainedGridY = Math.max(minCenterY, Math.min(maxCenterY, gridY));
                if (constrainedGridX !== gridX || constrainedGridY !== gridY) {
                  requestAnimationFrame(() => {
                    const rulerElement = document.getElementById('page6-ruler');
                    if (rulerElement) {
                      const xPercent = (constrainedGridX / gridCols) * 100;
                      const yPercent = (constrainedGridY / gridRows) * 100;
                      rulerElement.style.left = `${xPercent}%`;
                      rulerElement.style.top = `${yPercent}%`;
                      if (rulerElement.style.transform && rulerElement.style.transform.includes('translate')) {
                        rulerElement.style.transform = `translate(-50%, -50%)`;
                      }
                    }
                  });
                }
              }
            };
          }
        };
      })(),
      // Animated dot - same layout as page 2 (PAGE2_SHAPE_DISPLAY_COORDINATES for vertex positions)
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const triangleVertices = shapeConfig.vertices;
        const triangleGridRows = shapeConfig.gridRows;
        const triangleGridCols = shapeConfig.gridCols;

        const [shapeLeft, shapeTop, shapeRight, shapeBottom] = PAGE2_SHAPE_DISPLAY_COORDINATES;
        const containerWidthGc = shapeRight - shapeLeft + 1;
        const containerHeightGc = shapeBottom - shapeTop + 1;
        const cellSizeGc = Math.min(containerWidthGc / triangleGridCols, containerHeightGc / triangleGridRows);
        const gridWidthGc = cellSizeGc * triangleGridCols;
        const gridHeightGc = cellSizeGc * triangleGridRows;
        const offsetXGc = (containerWidthGc - gridWidthGc) / 2;
        const offsetYGc = (containerHeightGc - gridHeightGc) / 2;
        const quadGridToPrecisionGrid = (quadGridPoint) => {
          const percentX = quadGridPoint.col / triangleGridCols;
          const percentY = quadGridPoint.row / triangleGridRows;
          const actualX = shapeLeft + offsetXGc + percentX * gridWidthGc;
          const actualY = shapeTop + offsetYGc + percentY * gridHeightGc;
          return { x: Math.round(actualX), y: Math.round(actualY) };
        };
        const vertexAPos = quadGridToPrecisionGrid(triangleVertices[0]);
        const vertexBPos = quadGridToPrecisionGrid(triangleVertices[1]);
        const vertexCPos = quadGridToPrecisionGrid(triangleVertices[2]);
        const rulerCenterX = 1000;
        const rulerCenterY = 500;
        return {
          id: "page6-animated-dot",
          name: "page6-animated-dot",
          type: "custom",
          coordinates: [rulerCenterX, rulerCenterY, rulerCenterX, rulerCenterY],
          zIndex: 10001,
          props: {
            componentType: "AnimatedDotComponent",
            currentPage: 6,
            startX: rulerCenterX,
            startY: rulerCenterY,
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
      // Text box with measurement (same as page 2 - ruler flow, page6MeasurementText)
      {
        id: "page6-measurement-text",
        name: "page6-measurement-text",
        coordinates: [850, 250, 1150, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            const state = typeof window !== 'undefined' && window.page6State ? window.page6State : 'C';
            const step = typeof window !== 'undefined' && window.page6Step !== undefined ? window.page6Step : 1;
            const showMeasurement = ((state === 'A' && (step === 3 || step === 4)) || state === 'complete' || (state === 'C' && (step === 3 || step === 4)) || state === 'B') && typeof window !== 'undefined' && window.page6MeasurementText;
            if (showMeasurement) return window.page6MeasurementText;
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
      // Left Column Container (55%) - same as page 5
      {
        id: "page7-left-column",
        name: "page7-left-column",
        coordinates: [5, 85, 895, 800], // Same as page5-left-column
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Right Column Container (45%) - same as page 5
      {
        id: "page7-right-column",
        name: "page7-right-column",
        coordinates: [900, 85, 1595, 800], // Same as page5-right-column
        zIndex: "var(--z-base)",
        type: "textbox",
        props: {
          text: "", // Empty container
          backgroundColor: "transparent",
          borderWidth: "4gc", // Orange solid border, 4gc
          borderStyle: "solid",
          borderColor: "#FF9900", // Orange color
          borderRadius: "12gc", // 12gc border radius
          boxSizing: "border-box",
        },
      },

      // Quiz Panel - Classify the triangle by its angles
      {
        id: 'page7-quiz-panel',
        name: 'page7-quiz-panel',
        type: 'custom',
        coordinates: [920, 100, 1580, 740], // Positioned in the right column (same as page 5)
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
          headerRowHeight: 0, // No header row (same as page 3)
          questionRowHeight: 30, // Same as page 3
          optionsRowHeight: 45, // Same as page 3
          feedbackRowHeight: 25, // Same as page 3
          optionButtonWidth: 80,
          optionButtonHeight: 75,
          questionTextFontSize: '32gc', // Font size for question text (in gc units)
          optionButtonTextSize: '36gc', // Font size for option button text (in gc units)
          feedbackFontSize: '32gc', // Font size for feedback text (in gc units)
          optionButtonTextColor: '#000000', // Black text color for option buttons
          // Options data for QT3 (3 options in vertical layout)
          // Equilateral Triangle is correct for page 7
          options: [
            {
              id: 'equilateral',
              text: getI18nText("pages.page7.quizPanel.options.0.text", "Equilateral Triangle"),
              iscorrect: true,
              feedback: getI18nText("pages.page7.quizPanel.options.0.feedback", "Correct! An equilateral triangle has all three sides equal.")
            },
            {
              id: 'isosceles',
              text: getI18nText("pages.page7.quizPanel.options.1.text", "Isosceles Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page7.quizPanel.options.1.feedback", "Incorrect. An isosceles triangle has exactly two sides equal.")
            },
            {
              id: 'scalene',
              text: getI18nText("pages.page7.quizPanel.options.2.text", "Scalene Triangle"),
              iscorrect: false,
              feedback: getI18nText("pages.page7.quizPanel.options.2.feedback", "Incorrect. A scalene triangle has no equal sides.")
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

      // Shape display - same shape config and coordinates as page 6 (OBTUSE_ANGLE_TRIANGLE, PAGE2_SHAPE_DISPLAY_COORDINATES)
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        // Same side labels as page 6 complete: BC, AB, CA with page6 measurement values or obtuse defaults (20, 20, 20)
        const getPage6StyleSideSymbols = () => {
          if (typeof window === 'undefined') return [];
          const bc = window.page6MeasurementBC_cm != null ? window.page6MeasurementBC_cm : 20;
          const ab = window.page6MeasurementAB_cm != null ? window.page6MeasurementAB_cm : 20;
          const ac = window.page6MeasurementAC_cm != null ? window.page6MeasurementAC_cm : 20;
          return [
            { side: 'BC', type: 'label', label: `${bc} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'AB', type: 'label', label: `${ab} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'CA', type: 'label', label: `${ac} cm`, color: '#FF6600', size: '24gc', position: 0.5 }
          ];
        };
        const getProps = () => {
          if (typeof window !== 'undefined' && typeof window.page6ShapeDisplayGetProps === 'function') {
            const p = window.page6ShapeDisplayGetProps();
            return {
              ...p,
              effectiveAngleConfig: { ...(p.effectiveAngleConfig || {}), show: 'none', showText: false },
              sideSymbols: getPage6StyleSideSymbols()
            };
          }
          return {
            componentType: "QuadrilateralComponent",
            page6StateKey: 'complete',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              // Same labelOffsets as page 6 (obtuse triangle)
              labelOffsets: [
                { x: "-20gc", y: "-40gc" }, // A: top
                { x: "-40gc", y: "40gc" },  // B: bottom-left
                { x: "40gc", y: "40gc" }    // C: bottom-right
              ]
            },
            effectiveAngleConfig: { show: 'none', markerColor: "#FF6600", markerSize: "30gc", showText: false, textColor: "#000000", textSize: "28gc", textMode: 'measure' },
            symmetryAnimationConfig: { duration: 2000, holdTime: 1500, foldLineColor: "#FFFFFF", foldLineStyle: "dashed", foldedHalfColor: "rgba(139, 69, 69, 0.7)", mismatchColor: "#00FFFF", showAxisAlways: false, triangleAxes: [], showVerticalAxis: false, showHorizontalAxis: false, showDiagonalAxis: false, clickableAxis: true, axisExtension: 5 },
            sideSymbols: getPage6StyleSideSymbols()
          };
        };
        if (typeof window !== 'undefined') {
          window.page7ShapeDisplayGetProps = getProps;
        }
        return {
          id: "page7-shape-display",
          name: "shape-display",
          type: "custom",
          coordinates: PAGE2_SHAPE_DISPLAY_COORDINATES,
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Measurement text (same coordinates as page 3; page 7 is quiz-only, no flow text)
      {
        id: "page7-measurement-text",
        name: "page7-measurement-text",
        coordinates: [1100, 250, 1400, 600],
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: (() => {
            // Page 7 = replica of page 3: no measurement flow text (quiz only)
            return '';
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
      // Shape 1: same as page 3 (acute triangle with side labels)
      (() => {
        const shapeConfig = getShapeConfig("ACUTE_TRIANGLE");
        const getPage3StyleSideSymbols = () => {
          if (typeof window === 'undefined') return [];
          const bc = window.page2MeasurementBC_cm != null ? window.page2MeasurementBC_cm : 20;
          const ab = window.page2MeasurementAB_cm != null ? window.page2MeasurementAB_cm : 16;
          const ac = window.page2MeasurementAC_cm != null ? window.page2MeasurementAC_cm : 15;
          return [
            { side: 'BC', type: 'label', label: `${bc} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'AB', type: 'label', label: `${ab} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'CA', type: 'label', label: `${ac} cm`, color: '#FF6600', size: '24gc', position: 0.5 }
          ];
        };
        const getProps = () => {
          let p = null;
          if (typeof window !== 'undefined' && typeof window.page3ShapeDisplayGetProps === 'function') {
            p = window.page3ShapeDisplayGetProps();
          }
          if (!p && typeof window !== 'undefined' && typeof window.page2ShapeDisplayGetProps === 'function') {
            p = window.page2ShapeDisplayGetProps();
          }
          if (p) return { ...p, sideSymbols: getPage3StyleSideSymbols() };
          return {
            componentType: "QuadrilateralComponent",
            page2StateKey: 'complete',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              labelOffsets: [
                { x: "-2gc", y: "-40gc" },
                { x: "-20gc", y: "40gc" },
                { x: "0gc", y: "40gc" }
              ]
            },
            effectiveAngleConfig: { show: 'none', markerColor: "#FF6600", markerSize: "30gc", showText: false, textColor: "#000000", textSize: "28gc", textMode: 'measure' },
            symmetryAnimationConfig: { duration: 2000, holdTime: 1500, foldLineColor: "#FFFFFF", foldLineStyle: "dashed", foldedHalfColor: "rgba(139, 69, 69, 0.7)", mismatchColor: "#00FFFF", showAxisAlways: false, triangleAxes: [], showVerticalAxis: false, showHorizontalAxis: false, showDiagonalAxis: false, clickableAxis: true, axisExtension: 5 },
            sideSymbols: getPage3StyleSideSymbols()
          };
        };
        return {
          id: "page8-shape-1-acute",
          name: "page8-shape-1-acute",
          type: "custom",
          coordinates: [105, -160, 795, 530], // moved down 10gc
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Label for Shape 1: Acute Triangle
      {
        id: "page8-label-1",
        name: "page8-label-1",
        coordinates: [150, 595, 475, 645], // moved up 15gc
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.acute", "Scalene Triangle"),
          fontSize: "32gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Shape 2: same as page 5 (right-angle triangle with side labels)
      (() => {
        const shapeConfig = getShapeConfig("RIGHT_ANGLE_TRIANGLE");
        const getPage5StyleSideSymbols = () => {
          if (typeof window === 'undefined') return [];
          const bc = window.page4MeasurementBC_cm != null ? window.page4MeasurementBC_cm : 20;
          const ab = window.page4MeasurementAB_cm != null ? window.page4MeasurementAB_cm : 20;
          const ac = window.page4MeasurementAC_cm != null ? window.page4MeasurementAC_cm : 16;
          return [
            { side: 'BC', type: 'label', label: `${bc} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'AB', type: 'label', label: `${ab} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'CA', type: 'label', label: `${ac} cm`, color: '#FF6600', size: '24gc', position: 0.5 }
          ];
        };
        const getProps = () => {
          let p = null;
          if (typeof window !== 'undefined' && typeof window.page5ShapeDisplayGetProps === 'function') {
            p = window.page5ShapeDisplayGetProps();
          }
          if (!p && typeof window !== 'undefined' && typeof window.page4ShapeDisplayGetProps === 'function') {
            p = window.page4ShapeDisplayGetProps();
          }
          if (p) return { ...p, effectiveAngleConfig: { ...(p.effectiveAngleConfig || {}), show: 'none', showText: false }, sideSymbols: getPage5StyleSideSymbols() };
          return {
            componentType: "QuadrilateralComponent",
            page4StateKey: 'complete',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              labelOffsets: [
                { x: "-2gc", y: "-40gc" },
                { x: "-20gc", y: "40gc" },
                { x: "0gc", y: "40gc" }
              ]
            },
            effectiveAngleConfig: { show: 'none', markerColor: "#FF6600", markerSize: "30gc", showText: false, textColor: "#000000", textSize: "28gc", textMode: 'measure' },
            symmetryAnimationConfig: { duration: 2000, holdTime: 1500, foldLineColor: "#FFFFFF", foldLineStyle: "dashed", foldedHalfColor: "rgba(139, 69, 69, 0.7)", mismatchColor: "#00FFFF", showAxisAlways: false, triangleAxes: [], showVerticalAxis: false, showHorizontalAxis: false, showDiagonalAxis: false, clickableAxis: true, axisExtension: 5 },
            sideSymbols: getPage5StyleSideSymbols()
          };
        };
        return {
          id: "page8-shape-2-right",
          name: "page8-shape-2-right",
          type: "custom",
          coordinates: [612, -169, 1308, 529], // moved right 25gc
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Label for Shape 2: Right Triangle
      {
        id: "page8-label-2",
        name: "page8-label-2",
        coordinates: [580, 595, 1090, 645], // moved up 15gc
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.right", "Isosceles Triangle"),
          fontSize: "32gc",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },
      },
      // Shape 3: same as page 7 (obtuse triangle with side labels)
      (() => {
        const shapeConfig = getShapeConfig("OBTUSE_ANGLE_TRIANGLE");
        const getPage6StyleSideSymbols = () => {
          if (typeof window === 'undefined') return [];
          const bc = window.page6MeasurementBC_cm != null ? window.page6MeasurementBC_cm : 20;
          const ab = window.page6MeasurementAB_cm != null ? window.page6MeasurementAB_cm : 20;
          const ac = window.page6MeasurementAC_cm != null ? window.page6MeasurementAC_cm : 20;
          return [
            { side: 'BC', type: 'label', label: `${bc} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'AB', type: 'label', label: `${ab} cm`, color: '#FF6600', size: '24gc', position: 0.5 },
            { side: 'CA', type: 'label', label: `${ac} cm`, color: '#FF6600', size: '24gc', position: 0.5 }
          ];
        };
        const getProps = () => {
          if (typeof window !== 'undefined' && typeof window.page7ShapeDisplayGetProps === 'function') {
            return window.page7ShapeDisplayGetProps();
          }
          if (typeof window !== 'undefined' && typeof window.page6ShapeDisplayGetProps === 'function') {
            const p = window.page6ShapeDisplayGetProps();
            if (p) return { ...p, effectiveAngleConfig: { ...(p.effectiveAngleConfig || {}), show: 'none', showText: false }, sideSymbols: getPage6StyleSideSymbols() };
          }
          return {
            componentType: "QuadrilateralComponent",
            page6StateKey: 'complete',
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
            vertexConfig: {
              color: "#FF9900",
              showLabels: true,
              animated: false,
              labels: ["A", "B", "C"],
              labelColor: "#FFFFFF",
              labelSize: "36gc",
              labelOffset: "40gc",
              innerCircleSize: "6gc",
              vertexAnimations: [false, false, false],
              labelOffsets: [
                { x: "-20gc", y: "-40gc" },
                { x: "-40gc", y: "40gc" },
                { x: "40gc", y: "40gc" }
              ]
            },
            effectiveAngleConfig: { show: 'none', markerColor: "#FF6600", markerSize: "30gc", showText: false, textColor: "#000000", textSize: "28gc", textMode: 'measure' },
            symmetryAnimationConfig: { duration: 2000, holdTime: 1500, foldLineColor: "#FFFFFF", foldLineStyle: "dashed", foldedHalfColor: "rgba(139, 69, 69, 0.7)", mismatchColor: "#00FFFF", showAxisAlways: false, triangleAxes: [], showVerticalAxis: false, showHorizontalAxis: false, showDiagonalAxis: false, clickableAxis: true, axisExtension: 5 },
            sideSymbols: getPage6StyleSideSymbols()
          };
        };
        return {
          id: "page8-shape-3-obtuse",
          name: "page8-shape-3-obtuse",
          type: "custom",
          coordinates: [1130, -110, 1770, 530], // moved right 25gc
          zIndex: 40,
          get props() { return getProps(); }
        };
      })(),
      // Label for Shape 3: Obtuse Triangle
      {
        id: "page8-label-3",
        name: "page8-label-3",
        coordinates: [925, 595, 1775, 645], // moved up 15gc
        zIndex: "var(--z-elevated)",
        type: "textbox",
        props: {
          text: getI18nText("pages.page8.triangleLabels.obtuse", "Equilateral Triangle"),
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
        coordinates: [200, 700, 1400, 800], // moved down 100gc
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
        coordinates: [675, 775, 925, 875], // moved down 50gc
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
              if (typeof window !== 'undefined') {
                window.page2MeasurementBC_cm = undefined;
                window.page2MeasurementAB_cm = undefined;
                window.page2MeasurementAC_cm = undefined;
              }
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
    window.page2RulerSnapped = false; // Reset snap flag
    window.page2MeasurementBC_cm = undefined;
    window.page2MeasurementAB_cm = undefined;
    window.page2MeasurementAC_cm = undefined;
    if (oldState !== 'C') {
      console.log(`[STATE:page2State] Changed: ${oldState || 'undefined'} → C (Page 2 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page2Step] Changed: ${oldStep || 'undefined'} → 1 (Page 2 reset)`);
    }
    console.log("✅ [PageConfig] Reset page2State to 'C' and page2Step to 1");
  }

  // Reset page4State and page4Step to defaults when resetting page 4 (same as page 2)
  if (pageNumber === 4) {
    const oldState = window.page4State;
    const oldStep = window.page4Step;
    window.page4State = 'C';
    window.page4Step = 1;
    window.page4RulerSnapped = false;
    window.page4MeasurementBC_cm = undefined;
    window.page4MeasurementAB_cm = undefined;
    window.page4MeasurementAC_cm = undefined;
    window.page4EndMarkerSnapAtDistance = null;
    if (oldState !== 'C') {
      console.log(`[STATE:page4State] Changed: ${oldState || 'undefined'} → C (Page 4 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page4Step] Changed: ${oldStep || 'undefined'} → 1 (Page 4 reset)`);
    }
    console.log("✅ [PageConfig] Reset page4State to 'C' and page4Step to 1");
  }

  if (pageNumber === 3) {
    const oldState = window.page3State;
    const oldStep = window.page3Step;
    window.page3State = 'C';
    window.page3Step = 1;
    window.page3RulerSnapped = false;
    window.page3MeasurementBC_cm = undefined;
    window.page3MeasurementAB_cm = undefined;
    window.page3MeasurementCD_cm = undefined;
    window.page3MeasurementDA_cm = undefined;
    window.page3MeasurementAC_cm = undefined;
    window.page3MeasurementText = '';
    window.page3EndMarkerSnapAtDistance = null;
    if (oldState !== 'C') {
      console.log(`[STATE:page3State] Changed: ${oldState || 'undefined'} → C (Page 3 reset)`);
    }
    if (oldStep !== 1) {
      console.log(`[STATE:page3Step] Changed: ${oldStep || 'undefined'} → 1 (Page 3 reset)`);
    }
    console.log("✅ [PageConfig] Reset page3State to 'C' and page3Step to 1");
  }

  // Reset page6State and page6Step to defaults when resetting page 6 (same as page 2)
  if (pageNumber === 6) {
    const oldState = window.page6State;
    const oldStep = window.page6Step;
    window.page6State = 'C';
    window.page6Step = 1;
    window.page6RulerSnapped = false;
    window.page6MeasurementBC_cm = undefined;
    window.page6MeasurementAB_cm = undefined;
    window.page6MeasurementAC_cm = undefined;
    window.page6EndMarkerSnapAtDistance = null;
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

    // Clear stored measurement values when (re)initializing page 2 so cumulative text is fresh
    if (typeof window !== 'undefined') {
      window.page2MeasurementBC_cm = undefined;
      window.page2MeasurementAB_cm = undefined;
      window.page2MeasurementAC_cm = undefined;
    }

    // Initialize page2RulerSnapped flag
    if (window.page2RulerSnapped === undefined) {
      window.page2RulerSnapped = false;
      console.log("✅ [PageConfig] Initialized page2RulerSnapped = false");
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

    // Initialize page4RulerSnapped (same as page 2)
    if (window.page4RulerSnapped === undefined) {
      window.page4RulerSnapped = false;
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
    const state = window.page2State || 'C';
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

  const updatePage2MeasurementText = () => {
    const el = document.getElementById('page2-measurement-text');
    if (el && typeof window !== 'undefined' && window.page2MeasurementText) {
      el.textContent = window.page2MeasurementText;
      el.style.display = '';
      el.style.visibility = 'visible';
      el.style.whiteSpace = 'pre-line'; // so "BC = x\nAB = y" displays on separate lines
    }
  };

  // Listen for state and step changes
  window.addEventListener('pageStateChanged', (event) => {
    console.log('📢 [PageConfig] pageStateChanged event received:', event.detail);
    updatePage2InstructionText();
    updatePage2MeasurementText();
    if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();

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
    updatePage2MeasurementText();
    if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
  });
  if (typeof window !== 'undefined') window.updatePage2MeasurementText = updatePage2MeasurementText;

  // Tap anywhere when State C step 4: go to State B step 1; when State B step 4: go to State A step 1
  const handlePage2TapAnywhere = (e) => {
    if (typeof window === 'undefined' || !window.getCurrentPage || window.getCurrentPage() !== 2) return;
    const state = window.page2State;
    const step = window.page2Step;
    if (state === 'C' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page2State = 'B';
      window.page2Step = 1;
      window.page2RulerSnapped = false;
      window.page2EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'B', step: 1 } }));
      updatePage2InstructionText();
      updatePage2MeasurementText();
    } else if (state === 'B' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page2State = 'A';
      window.page2Step = 1;
      window.page2RulerSnapped = false;
      window.page2EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'A', step: 1 } }));
      updatePage2InstructionText();
      updatePage2MeasurementText();
    } else if (state === 'A' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page2State = 'complete';
      window.page2Step = null;
      window.page2RulerSnapped = false;
      window.page2EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page2StepChanged', { detail: { step: null, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('pageStateChanged', { detail: { state: 'complete', step: null } }));
      updatePage2InstructionText();
      updatePage2MeasurementText();
    }
  };
  window.addEventListener('click', handlePage2TapAnywhere, true);

  // Also update on initial load (with a small delay to ensure DOM is ready)
  setTimeout(() => {
    updatePage2InstructionText();
    if (typeof window.updatePage2RulerSnapWindowVars === 'function') window.updatePage2RulerSnapWindowVars();

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

{
  const updatePage3InstructionText = () => {
    const instructionElement = document.getElementById('page3-instruction');
    if (!instructionElement) {
      setTimeout(updatePage3InstructionText, 100);
      return;
    }
    const state = window.page3State || 'C';
    const step = window.page3Step !== undefined ? window.page3Step : 1;
    const instructionText = page3ProtractorFlowConfig.helpers.getInstructionText(state, step);
    if (!instructionText) return;
    if (instructionElement.textContent !== undefined) {
      instructionElement.textContent = instructionText;
    }
    const innerSpan = instructionElement.querySelector('span');
    if (innerSpan) innerSpan.textContent = instructionText;
    else if (instructionElement.innerHTML !== undefined) instructionElement.innerHTML = instructionText;
  };

  const updatePage3MeasurementText = () => {
    const el = document.getElementById('page3-measurement-text');
    if (el && typeof window !== 'undefined' && window.page3MeasurementText) {
      el.textContent = window.page3MeasurementText;
      el.style.display = '';
      el.style.visibility = 'visible';
      el.style.whiteSpace = 'pre-line';
    }
  };

  window.addEventListener('page3StateChanged', (event) => {
    updatePage3InstructionText();
    updatePage3MeasurementText();
    if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 3) {
      window.dispatchEvent(new CustomEvent('quizCompleted', {
        detail: { pageNumber: 3, componentType: 'RulerComponent', componentId: 'page3-ruler' }
      }));
    }
  });

  window.addEventListener('page3StepChanged', () => {
    updatePage3InstructionText();
    updatePage3MeasurementText();
    if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
  });

  if (typeof window !== 'undefined') window.updatePage3MeasurementText = updatePage3MeasurementText;

  const handlePage3TapAnywhere = (e) => {
    if (typeof window === 'undefined' || !window.getCurrentPage || window.getCurrentPage() !== 3) return;
    const state = window.page3State;
    const step = window.page3Step;
    if (step !== 4 || !page3ProtractorFlowConfig.states[state]) return;
    e.preventDefault();
    e.stopPropagation();
    const next = page3ProtractorFlowConfig.helpers.getNextStateAndStep(state);
    window.page3State = next.nextState;
    window.page3Step = next.nextStep;
    window.page3RulerSnapped = false;
    window.page3EndMarkerSnapAtDistance = null;
    if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
    window.dispatchEvent(new CustomEvent('page3StepChanged', { detail: { step: next.nextStep, previousStep: 4 } }));
    window.dispatchEvent(new CustomEvent('page3StateChanged', { detail: { state: next.nextState, step: next.nextStep } }));
    updatePage3InstructionText();
    updatePage3MeasurementText();
  };
  window.addEventListener('click', handlePage3TapAnywhere, true);

  setTimeout(() => {
    updatePage3InstructionText();
    if (typeof window.updatePage3RulerSnapWindowVars === 'function') window.updatePage3RulerSnapWindowVars();
    if (typeof window !== 'undefined' && window.page3State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 3) {
      window.dispatchEvent(new CustomEvent('quizCompleted', {
        detail: { pageNumber: 3, componentType: 'RulerComponent', componentId: 'page3-ruler' }
      }));
    }
  }, 200);
}

// Add event listeners to update page4-instruction and measurement text (same flow as page 2)
{
  const updatePage4InstructionText = () => {
    const instructionId = 'page4-instruction';
    const instructionElement = document.getElementById(instructionId);
    if (!instructionElement) { setTimeout(updatePage4InstructionText, 100); return; }
    const state = window.page4State || 'C';
    const step = window.page4Step !== undefined ? window.page4Step : 1;
    const instructionText = page2ProtractorFlowConfig.helpers.getInstructionText(state, step) || '';
    if (instructionText) {
      if (instructionElement.textContent !== undefined) instructionElement.textContent = instructionText;
      const innerSpan = instructionElement.querySelector('span');
      if (innerSpan) innerSpan.textContent = instructionText;
      else if (instructionElement.innerHTML !== undefined) instructionElement.innerHTML = instructionText;
    }
  };
  const updatePage4MeasurementText = () => {
    const el = document.getElementById('page4-measurement-text');
    if (el && typeof window !== 'undefined' && window.page4MeasurementText) {
      el.textContent = window.page4MeasurementText;
      el.style.display = '';
      el.style.visibility = 'visible';
      el.style.whiteSpace = 'pre-line';
    }
  };
  window.addEventListener('page4StateChanged', (event) => {
    updatePage4InstructionText();
    updatePage4MeasurementText();
    if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 4) {
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 4, componentType: 'RulerComponent', componentId: 'page4-ruler' } }));
    }
  });
  window.addEventListener('page4StepChanged', (event) => {
    updatePage4InstructionText();
    updatePage4MeasurementText();
    if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
  });
  if (typeof window !== 'undefined') window.updatePage4MeasurementText = updatePage4MeasurementText;

  // Tap anywhere when page 4: same as page 2 (C step 4 → B step 1, B step 4 → A step 1, A step 4 → complete)
  const handlePage4TapAnywhere = (e) => {
    if (typeof window === 'undefined' || !window.getCurrentPage || window.getCurrentPage() !== 4) return;
    const state = window.page4State;
    const step = window.page4Step;
    if (state === 'C' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page4State = 'B';
      window.page4Step = 1;
      window.page4RulerSnapped = false;
      window.page4EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'B', step: 1 } }));
      updatePage4InstructionText();
      updatePage4MeasurementText();
    } else if (state === 'B' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page4State = 'A';
      window.page4Step = 1;
      window.page4RulerSnapped = false;
      window.page4EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'A', step: 1 } }));
      updatePage4InstructionText();
      updatePage4MeasurementText();
    } else if (state === 'A' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page4State = 'complete';
      window.page4Step = null;
      window.page4RulerSnapped = false;
      window.page4EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page4StepChanged', { detail: { step: null, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page4StateChanged', { detail: { state: 'complete', step: null } }));
      updatePage4InstructionText();
      updatePage4MeasurementText();
    }
  };
  window.addEventListener('click', handlePage4TapAnywhere, true);

  setTimeout(() => {
    updatePage4InstructionText();
    if (typeof window.updatePage4RulerSnapWindowVars === 'function') window.updatePage4RulerSnapWindowVars();
    if (typeof window !== 'undefined' && window.page4State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 4) {
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 4, componentType: 'RulerComponent', componentId: 'page4-ruler' } }));
    }
  }, 200);
  console.log("✅ Added page4-instruction and tap-anywhere listeners (same as page 2)");
}

// Add event listeners for page 6 - same as page 4 (ruler flow: instruction, measurement text, snap vars, tap-anywhere)
{
  const updatePage6InstructionText = () => {
    const instructionElement = document.getElementById('page6-instruction');
    if (!instructionElement) {
      setTimeout(updatePage6InstructionText, 100);
      return;
    }
    const state = window.page6State || 'C';
    const step = window.page6Step !== undefined ? window.page6Step : 1;
    const instructionText = page2ProtractorFlowConfig.helpers.getInstructionText(state, step) || '';
    if (instructionElement.textContent !== undefined) instructionElement.textContent = instructionText;
    const innerSpan = instructionElement.querySelector('span');
    if (innerSpan) innerSpan.textContent = instructionText;
    else if (instructionElement.innerHTML !== undefined) instructionElement.innerHTML = instructionText;
  };

  const updatePage6MeasurementText = () => {
    const el = document.getElementById('page6-measurement-text');
    if (el && typeof window !== 'undefined' && window.page6MeasurementText) {
      el.textContent = window.page6MeasurementText;
      el.style.display = '';
      el.style.visibility = 'visible';
      el.style.whiteSpace = 'pre-line';
    }
  };

  window.addEventListener('page6StateChanged', (event) => {
    updatePage6InstructionText();
    updatePage6MeasurementText();
    if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
    if (event.detail && event.detail.state === 'complete' && typeof window !== 'undefined' && window.getCurrentPage && window.getCurrentPage() === 6) {
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 6, componentType: 'RulerComponent', componentId: 'page6-ruler' } }));
    }
  });
  window.addEventListener('page6StepChanged', (event) => {
    updatePage6InstructionText();
    updatePage6MeasurementText();
    if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
  });
  if (typeof window !== 'undefined') window.updatePage6MeasurementText = updatePage6MeasurementText;

  // Tap anywhere when page 6: same as page 4 (C step 4 → B step 1, B step 4 → A step 1, A step 4 → complete)
  const handlePage6TapAnywhere = (e) => {
    if (typeof window === 'undefined' || !window.getCurrentPage || window.getCurrentPage() !== 6) return;
    const state = window.page6State;
    const step = window.page6Step;
    if (state === 'C' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page6State = 'B';
      window.page6Step = 1;
      window.page6RulerSnapped = false;
      window.page6EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'B', step: 1 } }));
      updatePage6InstructionText();
      updatePage6MeasurementText();
    } else if (state === 'B' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page6State = 'A';
      window.page6Step = 1;
      window.page6RulerSnapped = false;
      window.page6EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: 1, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'A', step: 1 } }));
      updatePage6InstructionText();
      updatePage6MeasurementText();
    } else if (state === 'A' && step === 4) {
      e.preventDefault();
      e.stopPropagation();
      window.page6State = 'complete';
      window.page6Step = null;
      window.page6RulerSnapped = false;
      window.page6EndMarkerSnapAtDistance = null;
      if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
      window.dispatchEvent(new CustomEvent('page6StepChanged', { detail: { step: null, previousStep: 4 } }));
      window.dispatchEvent(new CustomEvent('page6StateChanged', { detail: { state: 'complete', step: null } }));
      updatePage6InstructionText();
      updatePage6MeasurementText();
    }
  };
  window.addEventListener('click', handlePage6TapAnywhere, true);

  setTimeout(() => {
    updatePage6InstructionText();
    if (typeof window.updatePage6RulerSnapWindowVars === 'function') window.updatePage6RulerSnapWindowVars();
    if (typeof window !== 'undefined' && window.page6State === 'complete' && window.getCurrentPage && window.getCurrentPage() === 6) {
      window.dispatchEvent(new CustomEvent('quizCompleted', { detail: { pageNumber: 6, componentType: 'RulerComponent', componentId: 'page6-ruler' } }));
    }
  }, 200);
  console.log("✅ Added page6-instruction, measurement, snap and tap-anywhere listeners (same as page 4)");
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

