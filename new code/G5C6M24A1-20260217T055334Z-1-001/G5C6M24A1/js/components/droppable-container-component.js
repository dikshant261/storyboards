/**
 * Droppable Container Component - React 18 Optimized
 * 
 * Container for the draggable steps using react-beautiful-dnd DragDropContext
 * Handles drag and drop logic for the step ordering game
 */

/**
 * Droppable Steps Container Component
 * Manages the three draggable steps and handles reordering
 */
const DroppableStepsContainer = React.memo((props) => {
  const { renderKatexFraction, textSize = '60gc' } = props;
  
  // Debug container rendering (can be removed in production)
  // console.log('🎮 DroppableStepsContainer rendering with props:', props);
  
  // Get DragDropContext and Droppable from react-beautiful-dnd
  const DragDropContext = window.ReactBeautifulDnd?.DragDropContext;
  const Droppable = window.ReactBeautifulDnd?.Droppable;
  
  // Debug react-beautiful-dnd availability (can be removed in production)
  // console.log('🔍 react-beautiful-dnd components:', { DragDropContext: !!DragDropContext, Droppable: !!Droppable });
  
  if (!DragDropContext || !Droppable) {
    console.error('❌ react-beautiful-dnd not loaded! DragDropContext or Droppable not available');
    return null;
  }
  
  // Get game state
  const gameState = window.StepOrderingGame?.getGameState() || { 
    currentOrder: ['step1-image-text', 'step2-image-text', 'step3-image-text'],
    isComplete: false,
    feedbackState: 'none',
    revealedSteps: {}
  };
  
  // Get current question data
  const getCurrentQuestion = () => {
    const currentIndex = parseInt(localStorage.getItem('currentQuestionIndex') || '0');
    return window.Question ? window.Question(currentIndex) : window.Question(0);
  };

  // Parse fraction string and render appropriately (handles mixed fractions) - UPDATED v3
  const parseFraction = (fractionStr) => {
    console.log('🔍 parseFraction called with:', fractionStr);
    
    // Handle mixed fractions like "1 2/3"
    if (fractionStr.includes(' ')) {
      console.log('🔍 Detected mixed fraction');
      const parts = fractionStr.split(' ');
      const wholeNumber = parseInt(parts[0]);
      const fractionParts = parts[1].split('/');
      const numerator = parseInt(fractionParts[0]);
      const denominator = parseInt(fractionParts[1]);
      
      console.log('🔍 Mixed fraction parsed:', { wholeNumber, numerator, denominator });
      return {
        isMixed: true,
        wholeNumber: wholeNumber,
        numerator: numerator,
        denominator: denominator
      };
    } else {
      console.log('🔍 Detected regular fraction');
      // Handle regular fractions like "2/3"
      const parts = fractionStr.split('/');
      return {
        isMixed: false,
        numerator: parseInt(parts[0]),
        denominator: parseInt(parts[1])
      };
    }
  };

  // Render fraction with proper mixed fraction display - UPDATED v4
  const renderFraction = (fractionData) => {
    if (fractionData.isMixed) {
      // Render mixed fraction as "1 \frac{2}{3}" (proper mixed fraction display)
      const latexString = `${fractionData.wholeNumber} \\frac{${fractionData.numerator}}{${fractionData.denominator}}`;
      if (typeof katex !== 'undefined') {
        try {
          return katex.renderToString(latexString, {
            throwOnError: false,
            displayMode: false
          });
        } catch (e) {
          console.warn('KaTeX rendering error for mixed fraction:', e);
          return `${fractionData.wholeNumber} ${fractionData.numerator}/${fractionData.denominator}`;
        }
      }
      return `${fractionData.wholeNumber} ${fractionData.numerator}/${fractionData.denominator}`;
    } else {
      // Render regular fraction
      return `\\dfrac{${fractionData.numerator}}{${fractionData.denominator}}`;
    }
  };

  // Step definitions with their properties
  const currentQuestion = getCurrentQuestion();
  const stepDefinitions = {
    'step1-image-text': {
      image: 'assets/step1.png',
      text: () => {
        const fraction = parseFraction(currentQuestion.step1);
        if (renderKatexFraction) {
          // Use custom renderFraction for mixed fractions, fallback to renderKatexFraction for regular fractions
          if (fraction.isMixed) {
            return renderFraction(fraction);
          } else {
            return renderKatexFraction(fraction.numerator, fraction.denominator);
          }
        }
        return currentQuestion.step1;
      },
      textTop: 78,
      textLeft: 50,
      textSize: textSize,
      zIndex: 'var(--z-content) + 1',
      correctIndex: 0
    },
    'step2-image-text': {
      image: 'assets/step2.png',
      text: () => {
        const fraction = parseFraction(currentQuestion.step2);
        if (renderKatexFraction) {
          // Use custom renderFraction for mixed fractions, fallback to renderKatexFraction for regular fractions
          if (fraction.isMixed) {
            return renderFraction(fraction);
          } else {
            return renderKatexFraction(fraction.numerator, fraction.denominator);
          }
        }
        return currentQuestion.step2;
      },
      textTop: 55,
      textLeft: 50,
      textSize: textSize,
      zIndex: 'var(--z-content) + 1',
      correctIndex: 1
    },
    'step3-image-text': {
      image: 'assets/step3.png',
      text: () => {
        const fraction = parseFraction(currentQuestion.step3);
        if (renderKatexFraction) {
          // Use custom renderFraction for mixed fractions, fallback to renderKatexFraction for regular fractions
          if (fraction.isMixed) {
            return renderFraction(fraction);
          } else {
            return renderKatexFraction(fraction.numerator, fraction.denominator);
          }
        }
        return currentQuestion.step3;
      },
      textTop: 28,
      textLeft: 50,
      textSize: textSize,
      zIndex: 'var(--z-content)',
      correctIndex: 2
    }
  };
  
  // Handle drag start - reset feedback to default instructions
  const handleDragStart = (start) => {
    console.log('🎯 Drag started:', start);
    
    // Reset feedback to default instructions when user starts dragging
    if (window.StepOrderingGame?.resetFeedbackText) {
      window.StepOrderingGame.resetFeedbackText();
    }
  };

  // Handle drag update
  const handleDragUpdate = (update) => {
    console.log('🎯 Drag update:', update);
  };

  // Handle drag end
  const handleDragEnd = (result) => {
    console.log('🎯 Drag ended:', result);
    
    // Dropped outside the list
    if (!result.destination) {
      console.log('❌ Dropped outside droppable area');
      return;
    }
    
    // No movement
    if (result.destination.index === result.source.index) {
      console.log('ℹ️ No position change');
      return;
    }
    
    // Play click sound for successful swap
    if (typeof window.playSound === 'function') {
      window.playSound('click');
    }
    
    // Reorder the steps
    const currentOrder = [...gameState.currentOrder];
    const [removed] = currentOrder.splice(result.source.index, 1);
    currentOrder.splice(result.destination.index, 0, removed);
    
    console.log('🔄 New order:', currentOrder);
    
    // Update game state
    if (window.StepOrderingGame?.updateGameOrder) {
      window.StepOrderingGame.updateGameOrder(currentOrder);
    }
  };
  
  // Determine if we should show feedback
  const showFeedback = gameState.feedbackState === 'correct' || gameState.feedbackState === 'incorrect';
  
  return React.createElement(DragDropContext, {
    onDragStart: gameState.isComplete ? undefined : handleDragStart,
    onDragUpdate: gameState.isComplete ? undefined : handleDragUpdate,
    onDragEnd: gameState.isComplete ? undefined : handleDragEnd
  },
    React.createElement(Droppable, {
      droppableId: 'steps-droppable',
      direction: 'horizontal'
    }, (provided, snapshot) => {
      return React.createElement('div', {
        ref: provided.innerRef,
        ...provided.droppableProps,
        style: {
          position: 'relative',
          width: '100%',
          height: '100%'
        },
        className: `droppable-steps-container ${snapshot.isDraggingOver ? 'drag-over' : ''}`,
        'data-is-dragging-over': snapshot.isDraggingOver
      }, 
        // Render each step in current order
        ...gameState.currentOrder.map((stepName, index) => {
          const stepDef = stepDefinitions[stepName];
          if (!stepDef) {
            console.warn('⚠️ No step definition found for:', stepName);
            return null;
          }
          
          // Get the correct order dynamically based on question type
          const correctOrder = window.StepOrderingGame?.getCorrectOrder 
            ? window.StepOrderingGame.getCorrectOrder() 
            : ['step1-image-text', 'step2-image-text', 'step3-image-text'];
          
          // Check if step is in correct position based on current question type
          const isCorrectPosition = correctOrder[index] === stepName;
          
          // Check if step has been revealed
          const isRevealed = gameState.revealedSteps && gameState.revealedSteps[stepName];
          
          // Debug step creation (can be removed in production)
          // console.log('🎯 Creating draggable step:', { stepName, index, isCorrectPosition });
          
          return React.createElement(window.DraggableComponents.DraggableStepComponent, {
            key: stepName,
            stepName: stepName,
            index: index,
            image: stepDef.image,
            text: stepDef.text,
            textTop: stepDef.textTop,
            textLeft: stepDef.textLeft,
            textSize: stepDef.textSize,
            allowHTML: true,
            zIndex: stepDef.zIndex,
            isCorrectPosition: isCorrectPosition,
            showFeedback: showFeedback,
            isGameComplete: gameState.isComplete,
            isRevealed: isRevealed,
            renderKatexFraction: renderKatexFraction
          });
        }),
        provided.placeholder,
        
        // Success animation trigger (no modal)
        gameState.isComplete && React.createElement('div', {
          id: 'success-animation-trigger',
          style: { display: 'none' }
        })
      );
    })
  );
});

// Export component
if (typeof window !== 'undefined') {
  if (!window.DraggableComponents) {
    window.DraggableComponents = {};
  }
  window.DraggableComponents.DroppableStepsContainer = DroppableStepsContainer;
  console.log('✅ Droppable steps container component loaded');
}

