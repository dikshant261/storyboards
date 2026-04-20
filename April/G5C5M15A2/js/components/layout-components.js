/**
 * Layout Components - React 18 Optimized
 * 
 * This file contains all layout-related components:
 * - Header
 * - Footer
 * - Left Sidebar
 * - Right Sidebar
 * - Main Content
 * - Full Content
 * - Modal Center
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Logo Component for ProblemSolve Header
 */
const LogoComponent = React.memo((props) => {
  const { headerText = 'ProblemSolve', fontSize } = props;

  console.log('🔍 LogoComponent props:', props);
  console.log('🔍 LogoComponent headerText:', headerText);
  console.log('🔍 LogoComponent fontSize:', fontSize);

  // fontSize should already be processed by math-applet.js, so use it directly
  const logoTextStyle = fontSize ? { fontSize: fontSize } : {};
  console.log('🔍 LogoComponent logoTextStyle:', logoTextStyle);

  return React.createElement('div', {
    className: 'problem-solve-logo'
  }, [
    React.createElement('div', {
      key: 'logo-icon',
      className: 'logo-icon challenge-icon'
    }, [
      React.createElement('span', {
        key: 'challenge-symbol',
        className: 'challenge-symbol'
      }, '🏆')
    ]),
    React.createElement('span', {
      key: 'logo-text',
      className: 'logo-text',
      style: logoTextStyle
    }, headerText)
  ]);
});

/**
 * Question Text Box Component
 */
const QuestionComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    text,
    textSize = '24gc',
    leftMargin = '16gc',
    rightMargin = '20gc',
    backgroundColor = 'linear-gradient(135deg, #6B46C1 0%, #A855F7 100%)',
    iconMarginLeft = '20gc',
    border = '2gc solid transparent',
    borderRadius = '0gc',
    textColor = '#ffffff',
    iconSize = '60gc',
    iconLetter = 'Q',
    showIcon = true,
    highlights = []
  } = props;

  console.log('🔍 QuestionComponent RENDERED!');
  console.log('🔍 QuestionComponent props:', props);
  console.log('🔍 QuestionComponent position:', position);
  console.log('🔍 QuestionComponent processedStyles:', processedStyles);
  console.log('🔍 QuestionComponent elementZIndex:', elementZIndex);
  console.log('🔍 QuestionComponent text:', text);
  console.log('🔍 QuestionComponent textSize:', textSize);
  console.log('🔍 QuestionComponent leftMargin:', leftMargin);
  console.log('🔍 QuestionComponent rightMargin:', rightMargin);

  // Process textSize if it contains gc units
  let processedTextSize = textSize;
  if (textSize && textSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedTextSize = window.GridCellFontUtils.processGcProperty(textSize, 'fontSize');
  }

  // Process leftMargin if it contains gc units
  let processedLeftMargin = leftMargin;
  if (leftMargin && leftMargin.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedLeftMargin = window.GridCellFontUtils.processGcProperty(leftMargin, 'marginLeft');
  }

  // Process rightMargin if it contains gc units
  let processedRightMargin = rightMargin;
  if (rightMargin && rightMargin.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedRightMargin = window.GridCellFontUtils.processGcProperty(rightMargin, 'marginRight');
  }

  // Process iconMarginLeft if it contains gc units
  let processedIconMarginLeft = iconMarginLeft;
  if (iconMarginLeft && iconMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedIconMarginLeft = window.GridCellFontUtils.processGcProperty(iconMarginLeft, 'marginLeft');
  }

  // Process iconSize if it contains gc units
  let processedIconSize = iconSize;
  if (iconSize && iconSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedIconSize = window.GridCellFontUtils.processGcProperty(iconSize, 'width');
  }

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    // Split border into parts: "20gc solid gray" -> ["20gc", "solid", "gray"]
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' '); // Handle multi-word colors like "light gray"

      // Process the width part if it contains gc
      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process border radius if it contains gc units
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }


  // Use the position and processedStyles passed from math-applet.js (matching ProblemSolveHeaderComponent pattern)
  const finalStyles = {
    // Apply grid positioning from the element renderer
    ...(position?.css || {}),
    // Apply processed styles (already processed by math-applet.js with gc units)
    ...(processedStyles || {}),
    // Apply z-index
    zIndex: elementZIndex || 50,
    // Apply background color
    backgroundColor: backgroundColor,
    // Apply processed border
    ...(processedBorder ? { border: processedBorder } : {}),
    // Apply processed border radius
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    // Ensure proper display
    display: 'flex',
    alignItems: 'center'
  };

  // Use processed text size and other styles
  const textStyle = {
    ...(processedTextSize ? { fontSize: processedTextSize } : {}),
    ...(processedLeftMargin ? { marginLeft: processedLeftMargin } : {}),
    ...(processedRightMargin ? { marginRight: processedRightMargin } : {}),
    ...(textColor ? { color: textColor } : {})
  };

  // Use processed icon margin
  const iconStyle = {
    ...(processedIconMarginLeft ? { marginLeft: processedIconMarginLeft } : {}),
    ...(processedIconSize ? {
      width: processedIconSize,
      height: processedIconSize
    } : {})
  };

  // Separator line should scale with icon size
  const separatorStyle = {
    ...(processedIconSize ? {
      height: processedIconSize
    } : {})
  };

  // Icon letter should use the same font size as the question text
  const iconLetterStyle = {
    ...(processedTextSize ? { fontSize: processedTextSize } : {})
  };

  console.log('🔍 QuestionComponent finalStyles:', finalStyles);
  console.log('🔍 QuestionComponent textStyle:', textStyle);
  console.log('🔍 QuestionComponent highlights:', highlights);
  console.log('🔍 QuestionComponent highlights type:', typeof highlights);
  console.log('🔍 QuestionComponent highlights isArray:', Array.isArray(highlights));

  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;

    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });

    return result;
  };

  // Convert LaTeX fractions in the text before processing
  const textWithFractions = convertLatexFractions(text);

  // Function to parse text with highlights
  const parseTextWithHighlights = (text, highlights) => {
    // Ensure highlights is always an array
    const safeHighlights = Array.isArray(highlights) ? highlights : [];

    if (!safeHighlights || safeHighlights.length === 0) {
      return [{ type: 'normal', text }];
    }

    // Create an array to track all highlight positions
    const highlightPositions = [];

    // Find all highlight positions in the original text
    for (const highlight of safeHighlights) {
      const highlightText = highlight.text;
      let searchIndex = 0;

      while (true) {
        const index = text.indexOf(highlightText, searchIndex);
        if (index === -1) break;

        highlightPositions.push({
          start: index,
          end: index + highlightText.length,
          highlight: highlight,
          text: highlightText
        });

        searchIndex = index + 1; // Continue searching from next position
      }
    }

    // Sort by start position
    highlightPositions.sort((a, b) => a.start - b.start);

    // Remove overlapping highlights (keep the first one found)
    const nonOverlappingHighlights = [];
    let lastEnd = 0;

    for (const pos of highlightPositions) {
      if (pos.start >= lastEnd) {
        nonOverlappingHighlights.push(pos);
        lastEnd = pos.end;
      }
    }

    // Build the result
    const result = [];
    let currentIndex = 0;

    for (const pos of nonOverlappingHighlights) {
      // Add normal text before highlight
      if (pos.start > currentIndex) {
        result.push({
          type: 'normal',
          text: text.substring(currentIndex, pos.start)
        });
      }

      // Process highlight fontSize if it contains gc units
      let processedFontSize = pos.highlight.fontSize;
      if (pos.highlight.fontSize && pos.highlight.fontSize.includes('gc')) {
        if (window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
          processedFontSize = window.GridCellFontUtils.processGcProperty(pos.highlight.fontSize, 'fontSize');
        }
      }

      // Add highlighted text
      result.push({
        type: 'highlight',
        text: pos.text,
        highlightColor: pos.highlight.highlightColor,
        fontColor: pos.highlight.fontColor,
        fontSize: processedFontSize,
        bold: pos.highlight.bold,
        underline: pos.highlight.underline
      });

      currentIndex = pos.end;
    }

    // Add remaining normal text
    if (currentIndex < text.length) {
      result.push({
        type: 'normal',
        text: text.substring(currentIndex)
      });
    }

    return result.length > 0 ? result : [{ type: 'normal', text }];
  };

  // State for dynamic highlights (updated by StageComponent events)
  const [dynamicHighlights, setDynamicHighlights] = React.useState(highlights);

  // Sync state with props when props change (e.g., page navigation)
  React.useEffect(() => {
    setDynamicHighlights(highlights);
  }, [highlights]);

  // Listen for updateQuestionHighlights events from StageComponent
  React.useEffect(() => {
    const handleUpdateHighlights = (event) => {
      const { highlightsArray } = event.detail || {};
      if (highlightsArray !== undefined) {
        console.log('🔍 [QuestionComponent] Updating highlights from StageComponent:', highlightsArray);
        setDynamicHighlights(highlightsArray);
      }
    };

    window.addEventListener('updateQuestionHighlights', handleUpdateHighlights);

    return () => {
      window.removeEventListener('updateQuestionHighlights', handleUpdateHighlights);
    };
  }, []);

  const parsedText = parseTextWithHighlights(textWithFractions, dynamicHighlights);
  console.log('🔍 QuestionComponent parsedText:', parsedText);

  // Determine if icon should be shown
  const shouldShowIcon = showIcon && iconLetter && iconLetter.trim() !== '';

  // Create the content array conditionally
  const contentElements = [];

  // Add icon and separator only if shouldShowIcon is true
  if (shouldShowIcon) {
    contentElements.push(
      React.createElement('div', {
        key: 'question-icon',
        className: 'question-icon',
        style: iconStyle
      }, [
        React.createElement('span', {
          key: 'question-q',
          className: 'question-q',
          style: iconLetterStyle
        }, iconLetter)
      ]),
      React.createElement('div', {
        key: 'separator-line',
        className: 'separator-line',
        style: separatorStyle
      })
    );
  }

  // Always add the text content
  contentElements.push(
    React.createElement('div', {
      key: 'question-text',
      className: 'question-text',
      style: textStyle
    }, Array.isArray(parsedText) ? parsedText.map((part, index) => {
      if (part.type === 'highlight') {
        let highlightStyle = {
          fontSize: part.fontSize,
          fontWeight: part.bold ? 'bold' : 'normal',
          textDecoration: part.underline ? 'underline' : 'none'
        };

        // Apply highlight color as background and font color
        if (part.highlightColor) {
          highlightStyle.backgroundColor = part.highlightColor;
          highlightStyle.padding = '2px 4px';
          highlightStyle.borderRadius = '4px';
        }

        // Apply font color
        if (part.fontColor) {
          highlightStyle.color = part.fontColor;
        }

        return React.createElement('span', {
          key: index,
          style: highlightStyle
        }, part.text);
      } else {
        // Handle HTML content like <br> tags or fraction spans
        if (part.text && (part.text.includes('<br>') || part.text.includes('<span'))) {
          return React.createElement('span', {
            key: index,
            dangerouslySetInnerHTML: { __html: part.text }
          });
        } else {
          return part.text;
        }
      }
    }) : parsedText)
  );

  return React.createElement('div', {
    id: elementId,
    className: 'question-text-box',
    style: finalStyles,
    'data-element-type': 'question',
    'data-grid-position': position?.gridPosition
  }, contentElements);
});

/**
 * Information Analysis Panel Component
 */
const PAGE2_INFORMATION_ANALYSIS_ID = 'page2-information-analysis-panel';

const InformationAnalysisComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    id: informationAnalysisElementId,
    position,
    processedStyles,
    elementZIndex,
    componentHeader = '24gc',
    sectionHeader = '24gc',
    bodyTextSize = '24gc',
    bulletSize = '8gc',
    factsArray = [
      { text: "Fact 1" },
      { text: "Fact 2" }
    ],
    valueArray = [
      { text: "Value 1" }
    ],
    toFindArray = [
      { text: "To Find 1" }
    ],
    backgroundColor = '#0A0A1A',
    backgroundColorOpacity = 0.5,
    cardBackgroundColor = '#1A1A2E',
    cardBackgroundOpacity = 0.5,
    border,
    borderRadius = '15gc',
    sectionLeftBorderRadius = '10gc',
    padding = '20gc',
    cardPadding = '16gc 20gc',
    cardSpacing = '16gc',
    textColor = '#E0E0E0',
    factsColor = '#FFD700',
    valueColor = '#00FF7F',
    toFindColor = '#8A2BE2',
    accentBarWidth = '4gc',
    sectionMarginBottom = '8gc',
    sectionMarginLeft = '12gc',
    listMarginLeft = '12gc',
    listItemMarginBottom = '4gc',
    bulletMarginRight = '8gc'
  } = props;

  const persistPage2Snapshot =
    typeof informationAnalysisElementId === 'string' &&
    informationAnalysisElementId === PAGE2_INFORMATION_ANALYSIS_ID;

  const readPage2Snapshot = () => {
    if (!persistPage2Snapshot || typeof window === 'undefined') return null;
    const snap = window.__page2InformationAnalysisSnapshot;
    return snap && typeof snap === 'object' ? snap : null;
  };

  // State for dynamic updates (page 2: restore learner progress after prev/next)
  const [dynamicFactsArray, setDynamicFactsArray] = React.useState(() => {
    const snap = readPage2Snapshot();
    if (snap?.factsArray && Array.isArray(snap.factsArray) && snap.factsArray.length > 0) {
      return snap.factsArray;
    }
    return factsArray;
  });
  const [dynamicValueArray, setDynamicValueArray] = React.useState(() => {
    const snap = readPage2Snapshot();
    if (snap?.valueArray && Array.isArray(snap.valueArray) && snap.valueArray.length > 0) {
      return snap.valueArray;
    }
    return valueArray;
  });
  const [dynamicToFindArray, setDynamicToFindArray] = React.useState(() => {
    const snap = readPage2Snapshot();
    if (snap?.toFindArray && Array.isArray(snap.toFindArray) && snap.toFindArray.length > 0) {
      return snap.toFindArray;
    }
    return toFindArray;
  });

  // Sync state with props when props change (e.g., page navigation or language change)
  React.useEffect(() => {
    if (persistPage2Snapshot) {
      return;
    }
    setDynamicFactsArray(factsArray);
    setDynamicValueArray(valueArray);
    setDynamicToFindArray(toFindArray);
  }, [factsArray, valueArray, toFindArray, persistPage2Snapshot]);

  React.useEffect(() => {
    if (!persistPage2Snapshot || typeof window === 'undefined') return;
    window.__page2InformationAnalysisSnapshot = {
      factsArray: dynamicFactsArray,
      valueArray: dynamicValueArray,
      toFindArray: dynamicToFindArray
    };
  }, [persistPage2Snapshot, dynamicFactsArray, dynamicValueArray, dynamicToFindArray]);

  // Listen for updateInformationAnalysis events
  React.useEffect(() => {
    const handleUpdateInformationAnalysis = (event) => {
      console.log('🔍 [InformationAnalysis] Received updateInformationAnalysis event:', event.detail);
      const { pageNumber, factsArray: newFactsArray, valueArray: newValueArray, toFindArray: newToFindArray } = event.detail;

      // Append new data to existing arrays instead of replacing
      if (newFactsArray && newFactsArray.length > 0) {
        const newFacts = Array.isArray(newFactsArray) && typeof newFactsArray[0] === 'object'
          ? newFactsArray
          : newFactsArray.map(fact => ({ text: fact, size: bodyTextSize, color: '#FFD700' }));
        console.log('🔍 [InformationAnalysis] Appending to factsArray:', newFacts);
        setDynamicFactsArray(prevArray => {
          // Filter out null/undefined entries before mapping
          const validPrevArray = prevArray.filter(item => item && (item.text || typeof item === 'string'));
          const existingTexts = validPrevArray.map(item => typeof item === 'string' ? item : item.text);
          const uniqueNewFacts = newFacts.filter(fact => !existingTexts.includes(fact.text));
          const updatedArray = [...validPrevArray, ...uniqueNewFacts];
          console.log('🔍 [InformationAnalysis] Updated factsArray:', updatedArray);
          return updatedArray;
        });
      }

      if (newValueArray && newValueArray.length > 0) {
        const newValues = Array.isArray(newValueArray) && typeof newValueArray[0] === 'object'
          ? newValueArray
          : newValueArray.map(value => ({ text: value, size: bodyTextSize, color: '#00FF7F' }));
        console.log('🔍 [InformationAnalysis] Appending to valueArray:', newValues);
        setDynamicValueArray(prevArray => {
          // Filter out null/undefined entries before mapping
          const validPrevArray = prevArray.filter(item => item && (item.text || typeof item === 'string'));
          const existingTexts = validPrevArray.map(item => typeof item === 'string' ? item : item.text);
          const uniqueNewValues = newValues.filter(value => !existingTexts.includes(value.text));
          const updatedArray = [...validPrevArray, ...uniqueNewValues];
          console.log('🔍 [InformationAnalysis] Updated valueArray:', updatedArray);
          return updatedArray;
        });
      }

      if (newToFindArray && newToFindArray.length > 0) {
        const newToFind = Array.isArray(newToFindArray) && typeof newToFindArray[0] === 'object'
          ? newToFindArray
          : newToFindArray.map(toFind => ({ text: toFind, size: bodyTextSize, color: '#8A2BE2' }));
        console.log('🔍 [InformationAnalysis] Appending to toFindArray:', newToFind);
        setDynamicToFindArray(prevArray => {
          // Filter out null/undefined entries before mapping
          const validPrevArray = prevArray.filter(item => item && (item.text || typeof item === 'string'));
          const existingTexts = validPrevArray.map(item => typeof item === 'string' ? item : item.text);
          const uniqueNewToFind = newToFind.filter(toFind => !existingTexts.includes(toFind.text));
          const updatedArray = [...validPrevArray, ...uniqueNewToFind];
          console.log('🔍 [InformationAnalysis] Updated toFindArray:', updatedArray);
          return updatedArray;
        });
      }
    };

    window.addEventListener('updateInformationAnalysis', handleUpdateInformationAnalysis);

    return () => {
      window.removeEventListener('updateInformationAnalysis', handleUpdateInformationAnalysis);
    };
  }, []);

  // Use dynamic arrays if they have been updated, otherwise use props
  const currentFactsArray = dynamicFactsArray.length > 0 ? dynamicFactsArray : factsArray;
  const currentValueArray = dynamicValueArray.length > 0 ? dynamicValueArray : valueArray;
  const currentToFindArray = dynamicToFindArray.length > 0 ? dynamicToFindArray : toFindArray;

  console.log('🔍 InformationAnalysisComponent RENDERED!');
  console.log('🔍 InformationAnalysisComponent props:', props);
  console.log('🔍 InformationAnalysisComponent position:', position);
  console.log('🔍 InformationAnalysisComponent processedStyles:', processedStyles);
  console.log('🔍 InformationAnalysisComponent currentFactsArray:', currentFactsArray);
  console.log('🔍 InformationAnalysisComponent currentValueArray:', currentValueArray);
  console.log('🔍 InformationAnalysisComponent currentToFindArray:', currentToFindArray);

  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process other gc properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedCardPadding = cardPadding;
  if (cardPadding && cardPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardPadding = window.GridCellFontUtils.processGcProperty(cardPadding, 'padding');
  }

  let processedCardSpacing = cardSpacing;
  if (cardSpacing && cardSpacing.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardSpacing = window.GridCellFontUtils.processGcProperty(cardSpacing, 'marginBottom');
  }

  let processedAccentBarWidth = accentBarWidth;
  if (accentBarWidth && accentBarWidth.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedAccentBarWidth = window.GridCellFontUtils.processGcProperty(accentBarWidth, 'width');
  }

  let processedSectionLeftBorderRadius = sectionLeftBorderRadius;
  if (sectionLeftBorderRadius && sectionLeftBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionLeftBorderRadius = window.GridCellFontUtils.processGcProperty(sectionLeftBorderRadius, 'borderRadius');
  }

  let processedSectionMarginBottom = sectionMarginBottom;
  if (sectionMarginBottom && sectionMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginBottom = window.GridCellFontUtils.processGcProperty(sectionMarginBottom, 'marginBottom');
  }

  let processedSectionMarginLeft = sectionMarginLeft;
  if (sectionMarginLeft && sectionMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginLeft = window.GridCellFontUtils.processGcProperty(sectionMarginLeft, 'marginLeft');
  }

  let processedListMarginLeft = listMarginLeft;
  if (listMarginLeft && listMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListMarginLeft = window.GridCellFontUtils.processGcProperty(listMarginLeft, 'marginLeft');
  }

  let processedListItemMarginBottom = listItemMarginBottom;
  if (listItemMarginBottom && listItemMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListItemMarginBottom = window.GridCellFontUtils.processGcProperty(listItemMarginBottom, 'marginBottom');
  }

  let processedBulletMarginRight = bulletMarginRight;
  if (bulletMarginRight && bulletMarginRight.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletMarginRight = window.GridCellFontUtils.processGcProperty(bulletMarginRight, 'marginRight');
  }

  let processedBulletSize = bulletSize;
  if (bulletSize && bulletSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletSize = window.GridCellFontUtils.processGcProperty(bulletSize, 'width');
  }

  let processedComponentHeader = componentHeader;
  if (componentHeader && componentHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedComponentHeader = window.GridCellFontUtils.processGcProperty(componentHeader, 'fontSize');
  }

  let processedSectionHeader = sectionHeader;
  if (sectionHeader && sectionHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionHeader = window.GridCellFontUtils.processGcProperty(sectionHeader, 'fontSize');
  }

  let processedBodyTextSize = bodyTextSize;
  if (bodyTextSize && bodyTextSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBodyTextSize = window.GridCellFontUtils.processGcProperty(bodyTextSize, 'fontSize');
  }

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: hexToRgba(backgroundColor, backgroundColorOpacity),
    ...(processedBorder ? { border: processedBorder } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedPadding ? { padding: processedPadding } : {}),
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    ...(processedComponentHeader ? { fontSize: processedComponentHeader } : {}),
    color: textColor,
    marginBottom: processedCardSpacing,
    fontWeight: '600'
  };

  const cardStyle = {
    backgroundColor: hexToRgba(cardBackgroundColor, cardBackgroundOpacity),
    borderRadius: processedBorderRadius,
    ...(processedSectionLeftBorderRadius ? {
      borderTopLeftRadius: processedSectionLeftBorderRadius,
      borderBottomLeftRadius: processedSectionLeftBorderRadius
    } : {}),
    padding: processedCardPadding,
    marginBottom: processedCardSpacing,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative'
  };

  const accentBarStyle = (color) => ({
    width: processedAccentBarWidth,
    backgroundColor: color,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: processedSectionLeftBorderRadius ?
      `${processedSectionLeftBorderRadius} 0 0 ${processedSectionLeftBorderRadius}` :
      `${processedBorderRadius} 0 0 ${processedBorderRadius}`
  });

  const sectionHeaderStyle = (color) => ({
    ...(processedSectionHeader ? { fontSize: processedSectionHeader } : {}),
    color: color,
    fontWeight: '600',
    marginBottom: processedSectionMarginBottom || '8px',
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedSectionMarginLeft || '12px'})` : (processedSectionMarginLeft || '12px')
  });

  const listStyle = {
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedListMarginLeft || '12px'})` : (processedListMarginLeft || '12px'),
    padding: 0,
    listStyle: 'none'
  };

  const listItemStyle = (color) => ({
    ...(processedBodyTextSize ? { fontSize: processedBodyTextSize } : {}),
    color: textColor,
    marginBottom: processedListItemMarginBottom || '4px',
    display: 'flex',
    alignItems: 'center'
  });

  const bulletStyle = (color) => ({
    width: processedBulletSize || '6px',
    height: processedBulletSize || '6px',
    backgroundColor: color,
    borderRadius: '50%',
    marginRight: processedBulletMarginRight || '8px',
    flexShrink: 0
  });

  // Function to convert LaTeX fractions to HTML fractions (same as QuestionComponent)
  const convertLatexFractions = React.useCallback((text) => {
    if (!text || typeof text !== 'string') return text;

    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });

    return result;
  }, []);

  const renderCard = (title, items, color) => {
    // Ensure items is an array
    const itemsArray = Array.isArray(items) ? items : [];
    if (!itemsArray || itemsArray.length === 0) return null;

    // Filter out null/undefined items and ensure all items have text property
    const validItems = itemsArray.filter(item => item && (item.text || typeof item === 'string'));

    if (validItems.length === 0) return null;

    return React.createElement('div', {
      key: title,
      style: cardStyle
    }, [
      React.createElement('div', {
        key: 'accent-bar',
        style: accentBarStyle(color)
      }),
      React.createElement('div', {
        key: 'content'
      }, [
        React.createElement('h3', {
          key: 'title',
          style: sectionHeaderStyle(color)
        }, title),
        React.createElement('ul', {
          key: 'list',
          style: listStyle
        }, validItems.map((item, index) => {
          // Handle both object format {text: '...', size: '...', color: '...'} and string format
          const itemText = typeof item === 'string' ? item : (item.text || '');
          const itemColor = typeof item === 'object' ? (item.color || textColor) : textColor;
          const itemSize = typeof item === 'object' && item.size ? item.size : processedBodyTextSize;

          // Process gc units for size if needed
          const processedItemSize = itemSize && typeof itemSize === 'string' && itemSize.includes('gc')
            ? (window.GridCellFontUtils?.processGcProperty ? window.GridCellFontUtils.processGcProperty(itemSize, 'fontSize') : itemSize)
            : itemSize;

          // Convert LaTeX fractions to HTML
          const textWithFractions = convertLatexFractions(itemText);

          // Check if text contains HTML tags (including converted fraction spans)
          const hasHTML = textWithFractions && (
            textWithFractions.includes('<br>') ||
            textWithFractions.includes('<span') ||
            textWithFractions.includes('<div') ||
            textWithFractions.includes('<strong') ||
            textWithFractions.includes('<em') ||
            textWithFractions.includes('<p') ||
            textWithFractions.includes('<b') ||
            textWithFractions.includes('<i')
          );

          return React.createElement('li', {
            key: index,
            style: listItemStyle(color)
          }, [
            React.createElement('span', {
              key: 'bullet',
              style: bulletStyle(color)
            }),
            React.createElement('span', {
              key: 'text',
              style: {
                color: itemColor,
                fontSize: processedItemSize
              }
            }, hasHTML ?
              React.createElement('span', {
                dangerouslySetInnerHTML: { __html: textWithFractions }
              }) :
              textWithFractions)
          ]);
        }))
      ])
    ]);
  };

  // Helper function to get i18n text
  const getI18nLabel = (key, fallback) => {
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key, {}) || fallback;
    }
    return fallback;
  };

  // Get i18n labels
  const headerLabel = getI18nLabel('common.informationAnalysis.header', 'INFORMATION ANALYSIS');
  const factsLabel = getI18nLabel('common.informationAnalysis.facts', 'Facts');
  const valueLabel = getI18nLabel('common.informationAnalysis.values', 'Value');
  const toFindLabel = getI18nLabel('common.informationAnalysis.toFind', 'To Find');

  // Create cards array, filtering out null values
  const cards = [
    renderCard(factsLabel, currentFactsArray, factsColor),
    renderCard(valueLabel, currentValueArray, valueColor),
    renderCard(toFindLabel, currentToFindArray, toFindColor)
  ].filter(Boolean);

  return React.createElement('div', {
    id: elementId,
    className: 'information-analysis-panel',
    style: finalStyles,
    'data-element-type': 'information-analysis',
    'data-grid-position': position?.gridPosition
  }, [
    React.createElement('h2', {
      key: 'header',
      style: headerStyle
    }, headerLabel),
    ...cards
  ]);
});

/**
 * Concept Summary Panel Component
 * Exact replica of InformationAnalysisComponent
 */
const ConceptSummaryComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    componentHeader = '24gc',
    sectionHeader = '24gc',
    bodyTextSize = '24gc',
    bulletSize = '12gc',
    givenArray = [],
    toFindArray = [],
    factsArray = [],
    valueArray = [],
    backgroundColor = '#0A0A1A',
    backgroundColorOpacity = 0.5,
    cardBackgroundColor = '#1A1A2E',
    cardBackgroundOpacity = 0.5,
    border,
    borderRadius = '15gc',
    sectionLeftBorderRadius = '10gc',
    padding = '20gc',
    cardPadding = '16gc 20gc',
    cardSpacing = '16gc',
    textColor = '#E0E0E0',
    factsColor = '#8A2BE2',
    valueColor = '#00FF7F',
    toFindColor = '#8A2BE2',
    accentBarWidth = '4gc',
    sectionMarginBottom = '8gc',
    sectionMarginLeft = '12gc',
    listMarginLeft = '12gc',
    listItemMarginBottom = '4gc',
    bulletMarginRight = '8gc'
  } = props;

  // State for dynamic updates
  const [dynamicGivenArray, setDynamicGivenArray] = React.useState(givenArray);
  const [dynamicToFindArray, setDynamicToFindArray] = React.useState(toFindArray);
  const [dynamicFactsArray, setDynamicFactsArray] = React.useState(factsArray);
  const [dynamicValueArray, setDynamicValueArray] = React.useState(valueArray);

  // Listen for updateConceptSummary events
  React.useEffect(() => {
    const handleUpdateConceptSummary = (event) => {
      console.log('🔍 [ConceptSummary] Received updateConceptSummary event:', event.detail);
      const { pageNumber, keyConcepts, impFormulae } = event.detail;

      // Append new data to existing arrays instead of replacing
      if (keyConcepts && keyConcepts.length > 0) {
        const newConcepts = keyConcepts.map(concept => ({ text: concept, color: '#FFD700' }));
        console.log('🔍 [ConceptSummary] Appending to factsArray:', newConcepts);
        setDynamicFactsArray(prevArray => {
          // Check if concept already exists to avoid duplicates
          const existingTexts = prevArray.map(item => item.text);
          const uniqueNewConcepts = newConcepts.filter(concept => !existingTexts.includes(concept.text));
          const updatedArray = [...prevArray, ...uniqueNewConcepts];
          console.log('🔍 [ConceptSummary] Updated factsArray:', updatedArray);
          return updatedArray;
        });
      }

      if (impFormulae && impFormulae.length > 0) {
        // Handle both string arrays and object arrays
        const newFormulae = impFormulae.map(formula => {
          if (typeof formula === 'string') {
            return { text: formula, color: '#70ACC7' }; // Default color for backward compatibility
          } else if (formula && typeof formula === 'object' && formula.text) {
            return { text: formula.text, color: formula.color || '#70ACC7' }; // Use provided color or default
          }
          return null;
        }).filter(Boolean);
        console.log('🔍 [ConceptSummary] Appending to valueArray:', newFormulae);
        setDynamicValueArray(prevArray => {
          // Check if formula already exists to avoid duplicates
          const existingTexts = prevArray.map(item => item.text);
          const uniqueNewFormulae = newFormulae.filter(formula => !existingTexts.includes(formula.text));
          const updatedArray = [...prevArray, ...uniqueNewFormulae];
          console.log('🔍 [ConceptSummary] Updated valueArray:', updatedArray);
          return updatedArray;
        });
      }
    };

    window.addEventListener('updateConceptSummary', handleUpdateConceptSummary);

    return () => {
      window.removeEventListener('updateConceptSummary', handleUpdateConceptSummary);
    };
  }, []);

  // Use dynamic arrays if they have been updated, otherwise use props
  // Ensure all arrays are actually arrays
  const currentGivenArray = Array.isArray(dynamicGivenArray) && dynamicGivenArray.length > 0 ? dynamicGivenArray : (Array.isArray(givenArray) ? givenArray : []);
  const currentToFindArray = Array.isArray(dynamicToFindArray) && dynamicToFindArray.length > 0 ? dynamicToFindArray : (Array.isArray(toFindArray) ? toFindArray : []);
  const currentFactsArray = Array.isArray(dynamicFactsArray) && dynamicFactsArray.length > 0 ? dynamicFactsArray : (Array.isArray(factsArray) ? factsArray : []);
  const currentValueArray = Array.isArray(dynamicValueArray) && dynamicValueArray.length > 0 ? dynamicValueArray : (Array.isArray(valueArray) ? valueArray : []);

  console.log('🔍 ConceptSummaryComponent RENDERED!');
  console.log('🔍 ConceptSummaryComponent props:', props);
  console.log('🔍 ConceptSummaryComponent position:', position);
  console.log('🔍 ConceptSummaryComponent processedStyles:', processedStyles);
  console.log('🔍 ConceptSummaryComponent currentFactsArray:', currentFactsArray);
  console.log('🔍 ConceptSummaryComponent currentValueArray:', currentValueArray);
  console.log('🔍 ConceptSummaryComponent toFindArray:', toFindArray);

  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process other gc properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedCardPadding = cardPadding;
  if (cardPadding && cardPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardPadding = window.GridCellFontUtils.processGcProperty(cardPadding, 'padding');
  }

  let processedCardSpacing = cardSpacing;
  if (cardSpacing && cardSpacing.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardSpacing = window.GridCellFontUtils.processGcProperty(cardSpacing, 'marginBottom');
  }

  let processedAccentBarWidth = accentBarWidth;
  if (accentBarWidth && accentBarWidth.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedAccentBarWidth = window.GridCellFontUtils.processGcProperty(accentBarWidth, 'width');
  }

  let processedSectionLeftBorderRadius = sectionLeftBorderRadius;
  if (sectionLeftBorderRadius && sectionLeftBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionLeftBorderRadius = window.GridCellFontUtils.processGcProperty(sectionLeftBorderRadius, 'borderRadius');
  }

  let processedSectionMarginBottom = sectionMarginBottom;
  if (sectionMarginBottom && sectionMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginBottom = window.GridCellFontUtils.processGcProperty(sectionMarginBottom, 'marginBottom');
  }

  let processedSectionMarginLeft = sectionMarginLeft;
  if (sectionMarginLeft && sectionMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginLeft = window.GridCellFontUtils.processGcProperty(sectionMarginLeft, 'marginLeft');
  }

  let processedListMarginLeft = listMarginLeft;
  if (listMarginLeft && listMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListMarginLeft = window.GridCellFontUtils.processGcProperty(listMarginLeft, 'marginLeft');
  }

  let processedListItemMarginBottom = listItemMarginBottom;
  if (listItemMarginBottom && listItemMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListItemMarginBottom = window.GridCellFontUtils.processGcProperty(listItemMarginBottom, 'marginBottom');
  }

  let processedBulletMarginRight = bulletMarginRight;
  if (bulletMarginRight && bulletMarginRight.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletMarginRight = window.GridCellFontUtils.processGcProperty(bulletMarginRight, 'marginRight');
  }

  let processedBulletSize = bulletSize;
  if (bulletSize && bulletSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletSize = window.GridCellFontUtils.processGcProperty(bulletSize, 'width');
  }

  let processedComponentHeader = componentHeader;
  if (componentHeader && componentHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedComponentHeader = window.GridCellFontUtils.processGcProperty(componentHeader, 'fontSize');
  }

  let processedSectionHeader = sectionHeader;
  if (sectionHeader && sectionHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionHeader = window.GridCellFontUtils.processGcProperty(sectionHeader, 'fontSize');
  }

  let processedBodyTextSize = bodyTextSize;
  if (bodyTextSize && bodyTextSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBodyTextSize = window.GridCellFontUtils.processGcProperty(bodyTextSize, 'fontSize');
  }

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: hexToRgba(backgroundColor, backgroundColorOpacity),
    ...(processedBorder ? { border: processedBorder } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedPadding ? { padding: processedPadding } : {}),
    display: 'flex',
    flexDirection: 'column',
    // Apply processedStyles last to ensure coordinate system takes precedence
    ...(processedStyles || {})
  };

  const headerStyle = {
    ...(processedComponentHeader ? { fontSize: processedComponentHeader } : {}),
    color: textColor,
    marginBottom: processedCardSpacing,
    fontWeight: '600'
  };

  const cardStyle = {
    backgroundColor: hexToRgba(cardBackgroundColor, cardBackgroundOpacity),
    borderRadius: processedBorderRadius,
    ...(processedSectionLeftBorderRadius ? {
      borderTopLeftRadius: processedSectionLeftBorderRadius,
      borderBottomLeftRadius: processedSectionLeftBorderRadius
    } : {}),
    padding: processedCardPadding,
    marginBottom: processedCardSpacing,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative'
  };

  const accentBarStyle = (color) => ({
    width: processedAccentBarWidth,
    backgroundColor: color,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: processedSectionLeftBorderRadius ?
      `${processedSectionLeftBorderRadius} 0 0 ${processedSectionLeftBorderRadius}` :
      `${processedBorderRadius} 0 0 ${processedBorderRadius}`
  });

  const sectionHeaderStyle = (color) => ({
    ...(processedSectionHeader ? { fontSize: processedSectionHeader } : {}),
    color: color,
    fontWeight: '600',
    marginBottom: processedSectionMarginBottom || '8px',
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedSectionMarginLeft || '12px'})` : (processedSectionMarginLeft || '12px')
  });

  const listStyle = {
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedListMarginLeft || '12px'})` : (processedListMarginLeft || '12px'),
    padding: 0,
    listStyle: 'none'
  };

  const listItemStyle = (color) => ({
    ...(processedBodyTextSize ? { fontSize: processedBodyTextSize } : {}),
    color: textColor,
    marginBottom: processedListItemMarginBottom || '4px',
    display: 'flex',
    alignItems: 'center'
  });

  const bulletStyle = (color) => ({
    width: processedBulletSize || '6px',
    height: processedBulletSize || '6px',
    backgroundColor: color,
    borderRadius: '50%',
    marginRight: processedBulletMarginRight || '8px',
    flexShrink: 0
  });

  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;

    // First, handle fractions within $...$ blocks (may contain multiple fractions)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });

    return result;
  };

  const renderCard = (title, items, color) => {
    // Ensure items is an array
    const itemsArray = Array.isArray(items) ? items : [];
    if (!itemsArray || itemsArray.length === 0) return null;

    return React.createElement('div', {
      key: title,
      style: cardStyle
    }, [
      React.createElement('div', {
        key: 'accent-bar',
        style: accentBarStyle(color)
      }),
      React.createElement('div', {
        key: 'content'
      }, [
        React.createElement('h3', {
          key: 'title',
          style: sectionHeaderStyle(color)
        }, title),
        React.createElement('ul', {
          key: 'list',
          style: listStyle
        }, itemsArray.map((item, index) => {
          // Convert LaTeX fractions in the text
          const convertedText = convertLatexFractions(item.text);
          const containsHTML = typeof convertedText === 'string' && /<[^>]+>/.test(convertedText);

          return React.createElement('li', {
            key: index,
            style: listItemStyle(color)
          }, [
            React.createElement('span', {
              key: 'bullet',
              style: bulletStyle(color)
            }),
            React.createElement('span', {
              key: 'text',
              style: { color: item.color || textColor },
              ...(containsHTML ? { dangerouslySetInnerHTML: { __html: convertedText } } : {})
            }, containsHTML ? null : convertedText)
          ]);
        }))
      ])
    ]);
  };

  // Debug logging for arrays
  console.log('🔍 [ConceptSummaryComponent] Array contents:', {
    currentGivenArray,
    currentToFindArray,
    currentFactsArray,
    currentValueArray,
    givenLength: currentGivenArray?.length,
    toFindLength: currentToFindArray?.length,
    factsLength: currentFactsArray?.length,
    valueLength: currentValueArray?.length
  });

  // Get internationalized labels
  const getI18nLabel = (key, fallback) => {
    if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key, {}) || fallback;
    }
    return fallback;
  };

  const headerLabel = getI18nLabel('common.conceptSummary.header', 'CONCEPT SUMMARY');
  const givenLabel = getI18nLabel('common.conceptSummary.given', 'Given');
  const toFindLabel = getI18nLabel('common.conceptSummary.toFind', 'To Find');
  const keyConceptsLabel = getI18nLabel('common.conceptSummary.keyConcepts', 'Key Concepts');
  const importantFormulaeLabel = getI18nLabel('common.conceptSummary.importantFormulae', 'Important Formulae');

  // Create cards array, filtering out null values
  const cards = [
    renderCard(givenLabel, currentGivenArray, '#70ACC7'),
    renderCard(toFindLabel, currentToFindArray, '#F28283'),
    renderCard(keyConceptsLabel, currentFactsArray, factsColor),
    renderCard(importantFormulaeLabel, currentValueArray, valueColor)
  ].filter(Boolean);

  return React.createElement('div', {
    id: elementId,
    className: 'concept-summary-panel',
    style: finalStyles,
    'data-element-type': 'concept-summary',
    'data-grid-position': position?.gridPosition
  }, [
    React.createElement('h2', {
      key: 'header',
      style: headerStyle
    }, headerLabel),
    ...cards
  ]);
});

/**
 * Teacher Note Text Box Component
 */
const TeacherNoteComponent = React.memo((props) => {
  const generatedId = React.useId();
  const {
    id, // Accept id prop from PageConfig
    position,
    processedStyles,
    elementZIndex,
    text = 'Introduce the question',
    textI18nKey,
    textI18nFallback = '',
    fontSize = '36gc',
    textColor: textColorProp = '#ffffff',
    backgroundColor = 'transparent',
    border = '2gc solid transparent',
    borderRadius = '0gc',
    padding = '20gc',
    blink = false,
    pulsate = false,
    display = 'flex', // Support display prop (default: 'flex', can be 'none' to hide)
    textAlign = 'center', // Support textAlign prop (default: 'center' for backward compatibility)
    onClick,
    cursor,
    page5InteractiveInStates = null,
    page5NavigateToState = null,
    page5NavigateToStateByInteractionState = null,
    page8InteractiveInStates = null,
    page8NavigateToState = null,
    page8NavigateToStateByInteractionState = null,
    page9InteractiveInStates = null,
    page9NavigateToState = null,
    page9NavigateToStateByInteractionState = null,
    page11InteractiveInStates = null,
    page11NavigateToState = null,
    page11NavigateToStateByInteractionState = null,
    page12InteractiveInStates = null,
    page12NavigateToState = null,
    page12NavigateToStateByInteractionState = null,
    page13InteractiveInStates = null,
    page13NavigateToState = null,
    page13NavigateToStateByInteractionState = null
  } = props;

  /** Page 8 packing UI uses the same state machine as page 5 but `window.page8InteractionState`. */
  const PAGE8_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([
        'page8-vertical-blue-line',
        'page8-horizontal-gold-line',
        'page8-one-button-vertical-gold-line',
        'page8-horizontal-line-one-button',
        'page8-horizontal-line-two-button',
        'page8-three-button-vertical-gold-line',
        'page8-horizontal-line-three-button',
        'page8-two-button-vertical-gold-line',
        'page8-quantity-tile-milk',
        'page8-quantity-label-lolipop',
        'page8-quantity-label-packet',
        'page8-axis-check-milk',
        'page8-axis-check-lollipop',
        'page8-axis-check-packets',
        'page8-axis2-check-milk',
        'page8-axis2-check-lollipop',
        'page8-axis2-check-packets',
        'page8-axis3-check-milk',
        'page8-axis3-check-lollipop',
        'page8-axis3-check-packets'
      ]),
    []
  );
  const PAGE9_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([
        ...[...PAGE8_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page8-/, 'page9-')),
        'page9-four-button-vertical-gold-line',
        'page9-horizontal-line-four-button',
        'page9-axis4-check-milk',
        'page9-axis4-check-lollipop',
        'page9-axis4-check-packets'
      ]),
    []
  );
  const PAGE10_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page10-'))),
    []
  );
  const PAGE11_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page11-'))),
    []
  );
  const PAGE12_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page12-'))),
    []
  );
  const PAGE13_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page13-'))),
    []
  );
  const PAGE14_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([
        ...[...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page14-')),
        'page14-horizontal-gold-dot-1',
        'page14-horizontal-gold-dot-2',
        'page14-horizontal-gold-dot-3',
        'page14-horizontal-gold-dot-4',
        'page14-horizontal-gold-dot-5',
        'page14-horizontal-gold-dot-6',
        'page14-horizontal-gold-dot-7',
        'page14-horizontal-gold-dot-8',
        'page14-horizontal-line-unknown-pill'
      ]),
    []
  );
  const PAGE15_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([
        ...[...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page15-')),
        'page15-horizontal-gold-dot-1',
        'page15-horizontal-gold-dot-2',
        'page15-horizontal-gold-dot-3',
        'page15-horizontal-gold-dot-4',
        'page15-horizontal-gold-dot-5',
        'page15-horizontal-gold-dot-6',
        'page15-horizontal-gold-dot-7',
        'page15-horizontal-gold-dot-8',
        'page15-horizontal-line-unknown-pill'
      ]),
    []
  );
  const PAGE16_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () =>
      new Set([
        ...[...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page16-')),
        'page16-horizontal-gold-dot-1',
        'page16-horizontal-gold-dot-2',
        'page16-horizontal-gold-dot-3',
        'page16-horizontal-gold-dot-4',
        'page16-horizontal-gold-dot-5',
        'page16-horizontal-gold-dot-6',
        'page16-horizontal-line-unknown-pill'
      ]),
    []
  );
  const PAGE17_PACKAGING_TEACHER_NOTE_IDS = React.useMemo(
    () => {
      const s = new Set([...PAGE9_PACKAGING_TEACHER_NOTE_IDS].map((tid) => String(tid).replace(/^page9-/, 'page17-')));
      s.add('page17-six-button-vertical-gold-line');
      s.add('page17-horizontal-line-six-button');
      s.add('page17-axis6-check-milk');
      s.add('page17-axis6-check-lollipop');
      s.add('page17-axis6-check-packets');
      s.add('page17-six-parcels-feedback');
      return s;
    },
    []
  );
  const usePage8Packaging = typeof id === 'string' && PAGE8_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage9Packaging = typeof id === 'string' && PAGE9_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage10Packaging = typeof id === 'string' && PAGE10_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage11Packaging = typeof id === 'string' && PAGE11_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage12Packaging = typeof id === 'string' && PAGE12_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage13Packaging = typeof id === 'string' && PAGE13_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage14Packaging = typeof id === 'string' && PAGE14_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage15Packaging = typeof id === 'string' && PAGE15_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage16Packaging = typeof id === 'string' && PAGE16_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage17Packaging = typeof id === 'string' && PAGE17_PACKAGING_TEACHER_NOTE_IDS.has(id);
  const usePage9StylePackaging =
    usePage9Packaging ||
    usePage10Packaging ||
    usePage14Packaging ||
    usePage15Packaging ||
    usePage16Packaging ||
    usePage17Packaging;

  const page9PackingCompareId = React.useMemo(() => {
    if (typeof id !== 'string') return id;
    if (PAGE10_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page10-/, 'page9-');
    }
    if (PAGE14_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page14-/, 'page9-');
    }
    if (PAGE15_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page15-/, 'page9-');
    }
    if (PAGE16_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page16-/, 'page9-');
    }
    if (PAGE11_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page11-/, 'page9-');
    }
    if (PAGE12_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page12-/, 'page9-');
    }
    if (PAGE13_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page13-/, 'page9-');
    }
    if (PAGE17_PACKAGING_TEACHER_NOTE_IDS.has(id)) {
      return id.replace(/^page17-/, 'page9-');
    }
    return id;
  }, [id]);

  // Re-resolve i18n when language changes (see i18n.setLanguage in data.js)
  const [i18nTextTick, setI18nTextTick] = React.useState(0);
  React.useEffect(() => {
    if (!textI18nKey || typeof window === 'undefined') return undefined;
    const onLanguageChanged = () => setI18nTextTick((n) => n + 1);
    window.addEventListener('appLanguageChanged', onLanguageChanged);
    return () => window.removeEventListener('appLanguageChanged', onLanguageChanged);
  }, [textI18nKey]);

  const effectiveText = React.useMemo(() => {
    if (
      textI18nKey &&
      typeof window !== 'undefined' &&
      window.i18n &&
      typeof window.i18n.t === 'function'
    ) {
      const translated = window.i18n.t(textI18nKey);
      if (
        typeof translated === 'string' &&
        translated.length > 0 &&
        !translated.startsWith('[Missing:')
      ) {
        return translated;
      }
      if (textI18nFallback) return textI18nFallback;
    }
    return text;
  }, [textI18nKey, textI18nFallback, text, i18nTextTick]);

  // Page 5 / 8 "1" button: not clickable after first tap (state-1-def … state-1-packets)
  const [page5AxisTick, setPage5AxisTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-horizontal-line-one-button' &&
      id !== 'page8-horizontal-line-one-button' &&
      page9PackingCompareId !== 'page9-horizontal-line-one-button'
    ) {
      return undefined;
    }
    const bump = () => setPage5AxisTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const page5StForTeacherNote =
    typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
  const page8StForTeacherNote =
    typeof window !== 'undefined' ? window.page8InteractionState || 'default' : 'default';
  const page9StForTeacherNote =
    typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
  const page11StForTeacherNote =
    typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
  const page12StForTeacherNote =
    typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
  const page13StForTeacherNote =
    typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';

  const packingStPage910111213 = usePage13Packaging
    ? page13StForTeacherNote
    : usePage12Packaging
      ? page12StForTeacherNote
      : usePage11Packaging
        ? page11StForTeacherNote
        : page9StForTeacherNote;

  const [page9PacketsFeedbackTick, setPage9PacketsFeedbackTick] = React.useState(0);
  React.useEffect(() => {
    if (page9PackingCompareId !== 'page9-packets-equal-feedback') return undefined;
    const bump = () => setPage9PacketsFeedbackTick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [page9PackingCompareId]);

  const ixSt = usePage8Packaging
    ? page8StForTeacherNote
    : usePage13Packaging
      ? page13StForTeacherNote
      : usePage12Packaging
        ? page12StForTeacherNote
        : usePage11Packaging
          ? page11StForTeacherNote
          : usePage9StylePackaging
            ? page9StForTeacherNote
            : page5StForTeacherNote;

  /**
   * Page 6 / 7 packing diagram TeacherNotes: static, fully visible chrome (same layout as page 6).
   * Exclude page 6 header/question and page 7 summary chrome so they stay normal.
   */
  const parcelDiagramStaticTeacherNote =
    typeof id === 'string' &&
    ((id.startsWith('page6-') &&
      id !== 'page6-header-text' &&
      id !== 'page6-question-background') ||
      (id.startsWith('page7-') &&
        id !== 'page7-black-container' &&
        id !== 'page7-information-gathered-text' &&
        id !== 'page7-next-steps-text'));

  // Page 5 / 8: label hit-area when state is in *InteractiveInStates; navigate via *NavigateToStateByInteractionState
  const page5NavMap = page5NavigateToStateByInteractionState;
  const page8NavMap = page8NavigateToStateByInteractionState;
  const page9NavMap = page9NavigateToStateByInteractionState;
  const page11NavMap = page11NavigateToStateByInteractionState;
  const page12NavMap = page12NavigateToStateByInteractionState;
  const page13NavMap = page13NavigateToStateByInteractionState;
  const page5LabelStatesConfigured =
    Array.isArray(page5InteractiveInStates) && page5InteractiveInStates.length > 0;
  const page8LabelStatesConfigured =
    Array.isArray(page8InteractiveInStates) && page8InteractiveInStates.length > 0;
  const page9LabelStatesConfigured =
    Array.isArray(page9InteractiveInStates) && page9InteractiveInStates.length > 0;
  const page11LabelStatesConfigured =
    Array.isArray(page11InteractiveInStates) && page11InteractiveInStates.length > 0;
  const page12LabelStatesConfigured =
    Array.isArray(page12InteractiveInStates) && page12InteractiveInStates.length > 0;
  const page13LabelStatesConfigured =
    Array.isArray(page13InteractiveInStates) && page13InteractiveInStates.length > 0;

  const [page5LabelClickTick, setPage5LabelClickTick] = React.useState(0);
  React.useEffect(() => {
    if (
      !page5LabelStatesConfigured &&
      !page8LabelStatesConfigured &&
      !page9LabelStatesConfigured &&
      !page11LabelStatesConfigured &&
      !page12LabelStatesConfigured &&
      !page13LabelStatesConfigured
    )
      return undefined;
    const bump = () => setPage5LabelClickTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [
    page5LabelStatesConfigured,
    page8LabelStatesConfigured,
    page9LabelStatesConfigured,
    page11LabelStatesConfigured,
    page12LabelStatesConfigured,
    page13LabelStatesConfigured
  ]);

  const page5LabelPointerActive =
    Array.isArray(page5InteractiveInStates) &&
    page5InteractiveInStates.length > 0 &&
    page5InteractiveInStates.includes(page5StForTeacherNote);
  const page8LabelPointerActive =
    Array.isArray(page8InteractiveInStates) &&
    page8InteractiveInStates.length > 0 &&
    page8InteractiveInStates.includes(page8StForTeacherNote);
  const page9LabelPointerActive =
    Array.isArray(page9InteractiveInStates) &&
    page9InteractiveInStates.length > 0 &&
    page9InteractiveInStates.includes(page9StForTeacherNote);
  const page11LabelPointerActive =
    Array.isArray(page11InteractiveInStates) &&
    page11InteractiveInStates.length > 0 &&
    page11InteractiveInStates.includes(page11StForTeacherNote);
  const page12LabelPointerActive =
    Array.isArray(page12InteractiveInStates) &&
    page12InteractiveInStates.length > 0 &&
    page12InteractiveInStates.includes(page12StForTeacherNote);
  const page13LabelPointerActive =
    Array.isArray(page13InteractiveInStates) &&
    page13InteractiveInStates.length > 0 &&
    page13InteractiveInStates.includes(page13StForTeacherNote);
  const pageLabelPointerActive = usePage8Packaging
    ? page8LabelPointerActive
    : usePage13Packaging
      ? page13LabelPointerActive
      : usePage12Packaging
        ? page12LabelPointerActive
        : usePage11Packaging
          ? page11LabelPointerActive
          : usePage9StylePackaging
            ? page9LabelPointerActive
            : page5LabelPointerActive;

  const page5LabelResolvedNext =
    page5NavMap &&
    typeof page5NavMap === 'object' &&
    page5NavMap[page5StForTeacherNote] != null &&
    String(page5NavMap[page5StForTeacherNote]).length > 0
      ? page5NavMap[page5StForTeacherNote]
      : typeof page5NavigateToState === 'string' && page5NavigateToState.length > 0
        ? page5NavigateToState
        : null;
  const page8LabelResolvedNext =
    page8NavMap &&
    typeof page8NavMap === 'object' &&
    page8NavMap[page8StForTeacherNote] != null &&
    String(page8NavMap[page8StForTeacherNote]).length > 0
      ? page8NavMap[page8StForTeacherNote]
      : typeof page8NavigateToState === 'string' && page8NavigateToState.length > 0
        ? page8NavigateToState
        : null;
  const page9LabelResolvedNext =
    page9NavMap &&
    typeof page9NavMap === 'object' &&
    page9NavMap[page9StForTeacherNote] != null &&
    String(page9NavMap[page9StForTeacherNote]).length > 0
      ? page9NavMap[page9StForTeacherNote]
      : typeof page9NavigateToState === 'string' && page9NavigateToState.length > 0
        ? page9NavigateToState
        : null;
  const page11LabelResolvedNext =
    page11NavMap &&
    typeof page11NavMap === 'object' &&
    page11NavMap[page11StForTeacherNote] != null &&
    String(page11NavMap[page11StForTeacherNote]).length > 0
      ? page11NavMap[page11StForTeacherNote]
      : typeof page11NavigateToState === 'string' && page11NavigateToState.length > 0
        ? page11NavigateToState
        : null;
  const page12LabelResolvedNext =
    page12NavMap &&
    typeof page12NavMap === 'object' &&
    page12NavMap[page12StForTeacherNote] != null &&
    String(page12NavMap[page12StForTeacherNote]).length > 0
      ? page12NavMap[page12StForTeacherNote]
      : typeof page12NavigateToState === 'string' && page12NavigateToState.length > 0
        ? page12NavigateToState
        : null;
  const page13LabelResolvedNext =
    page13NavMap &&
    typeof page13NavMap === 'object' &&
    page13NavMap[page13StForTeacherNote] != null &&
    String(page13NavMap[page13StForTeacherNote]).length > 0
      ? page13NavMap[page13StForTeacherNote]
      : typeof page13NavigateToState === 'string' && page13NavigateToState.length > 0
        ? page13NavigateToState
        : null;
  const pageLabelResolvedNext = usePage8Packaging
    ? page8LabelResolvedNext
    : usePage13Packaging
      ? page13LabelResolvedNext
      : usePage12Packaging
        ? page12LabelResolvedNext
        : usePage11Packaging
          ? page11LabelResolvedNext
          : usePage9StylePackaging
            ? page9LabelResolvedNext
            : page5LabelResolvedNext;

  const page5LabelNavigateClickActive =
    page5LabelPointerActive && page5LabelResolvedNext != null && page5LabelResolvedNext !== '';
  const page8LabelNavigateClickActive =
    page8LabelPointerActive && page8LabelResolvedNext != null && page8LabelResolvedNext !== '';
  const page9LabelNavigateClickActive =
    page9LabelPointerActive && page9LabelResolvedNext != null && page9LabelResolvedNext !== '';
  const page11LabelNavigateClickActive =
    page11LabelPointerActive && page11LabelResolvedNext != null && page11LabelResolvedNext !== '';
  const page12LabelNavigateClickActive =
    page12LabelPointerActive && page12LabelResolvedNext != null && page12LabelResolvedNext !== '';
  const page13LabelNavigateClickActive =
    page13LabelPointerActive && page13LabelResolvedNext != null && page13LabelResolvedNext !== '';
  const pageLabelNavigateClickActive = usePage8Packaging
    ? page8LabelNavigateClickActive
    : usePage13Packaging
      ? page13LabelNavigateClickActive
      : usePage12Packaging
        ? page12LabelNavigateClickActive
        : usePage11Packaging
          ? page11LabelNavigateClickActive
          : usePage9StylePackaging
            ? page9LabelNavigateClickActive
            : page5LabelNavigateClickActive;

  const PACKAGING_STATES_AXIS1_THROUGH_AXIS2 = [
    'state-1-def',
    'state-1-milk',
    'state-1-lollipop',
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];
  const PACKAGING_STATES_AXIS1_FULL = [
    ...PACKAGING_STATES_AXIS1_THROUGH_AXIS2,
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE9_PACKAGING_STATE4 = [
    'state-4-def',
    'state-4-reveal',
    'state-4-milk',
    'state-4-lollipop',
    'state-4-packets',
    'state-6-def',
    'state-6-reveal',
    'state-6-milk',
    'state-6-lollipop',
    'state-6-packets'
  ];
  const axis1GoldLineStates =
    id === 'page5-horizontal-line-one-button' || id === 'page5-one-button-vertical-gold-line'
      ? PACKAGING_STATES_AXIS1_THROUGH_AXIS2
      : page9PackingCompareId === 'page9-horizontal-line-one-button' || page9PackingCompareId === 'page9-one-button-vertical-gold-line'
        ? [...PACKAGING_STATES_AXIS1_FULL, ...PAGE9_PACKAGING_STATE4]
        : PACKAGING_STATES_AXIS1_FULL;

  const page5AxisOneLocked =
    (id === 'page5-horizontal-line-one-button' ||
      id === 'page8-horizontal-line-one-button' ||
      page9PackingCompareId === 'page9-horizontal-line-one-button') &&
    page5AxisTick >= 0 &&
    axis1GoldLineStates.includes(ixSt);

  const [page5AxisTwoTick, setPage5AxisTwoTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-horizontal-line-two-button' &&
      id !== 'page8-horizontal-line-two-button' &&
      page9PackingCompareId !== 'page9-horizontal-line-two-button'
    ) {
      return undefined;
    }
    const bump = () => setPage5AxisTwoTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PACKAGING_AXIS2_LOCKED_FULL = [
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PACKAGING_AXIS2_LOCKED_PAGE9 = [...PACKAGING_AXIS2_LOCKED_FULL, ...PAGE9_PACKAGING_STATE4];
  const PACKAGING_AXIS2_LOCKED_TWO_PARCELS = [
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];
  const axis2LockedStates =
    id === 'page5-horizontal-line-two-button' || id === 'page5-two-button-vertical-gold-line'
      ? PACKAGING_AXIS2_LOCKED_TWO_PARCELS
      : page9PackingCompareId === 'page9-horizontal-line-two-button' || page9PackingCompareId === 'page9-two-button-vertical-gold-line'
        ? PACKAGING_AXIS2_LOCKED_PAGE9
        : PACKAGING_AXIS2_LOCKED_FULL;
  const page5AxisTwoLocked =
    (id === 'page5-horizontal-line-two-button' ||
      id === 'page8-horizontal-line-two-button' ||
      page9PackingCompareId === 'page9-horizontal-line-two-button') &&
    page5AxisTwoTick >= 0 &&
    axis2LockedStates.includes(ixSt);

  /** Lock "3" after parcels are revealed; stay clickable at state-3-def for the first tap only. */
  const PAGE8_AXIS3_LOCKED = ['state-3-reveal', 'state-3-milk', 'state-3-lollipop', 'state-3-packets'];
  const PAGE9_AXIS3_LOCKED = [...PAGE8_AXIS3_LOCKED, ...PAGE9_PACKAGING_STATE4];
  const [page5AxisThreeTick, setPage5AxisThreeTick] = React.useState(0);
  React.useEffect(() => {
    if (id !== 'page8-horizontal-line-three-button' && page9PackingCompareId !== 'page9-horizontal-line-three-button') {
      return undefined;
    }
    const bump = () => setPage5AxisThreeTick((n) => n + 1);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);
  const page5AxisThreeLocked =
    (id === 'page8-horizontal-line-three-button' || page9PackingCompareId === 'page9-horizontal-line-three-button') &&
    page5AxisThreeTick >= 0 &&
    (page9PackingCompareId === 'page9-horizontal-line-three-button'
      ? PAGE9_AXIS3_LOCKED.includes(ixSt)
      : PAGE8_AXIS3_LOCKED.includes(ixSt));

  // Page 5 / 8 container-1 vertical gold line: hidden until state-1-def … state-1-packets
  const [page5GoldVertTick, setPage5GoldVertTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-one-button-vertical-gold-line' &&
      id !== 'page8-one-button-vertical-gold-line' &&
      page9PackingCompareId !== 'page9-one-button-vertical-gold-line'
    ) {
      return undefined;
    }
    const bump = () => setPage5GoldVertTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const page5Container1VertVisible =
    (id === 'page5-one-button-vertical-gold-line' ||
      id === 'page8-one-button-vertical-gold-line' ||
      page9PackingCompareId === 'page9-one-button-vertical-gold-line') &&
    page5GoldVertTick >= 0 &&
    axis1GoldLineStates.includes(ixSt);

  const page67Container1VertVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-one-button-vertical-gold-line' || id === 'page7-one-button-vertical-gold-line');

  const showContainer1VertGoldLine = page5Container1VertVisible || page67Container1VertVisible;

  // Page 5 container-2 (axis "2"): vertical + button from end of axis-1 through axis-2
  const [page5Container2Tick, setPage5Container2Tick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-two-button-vertical-gold-line' &&
      id !== 'page5-horizontal-line-two-button' &&
      id !== 'page8-two-button-vertical-gold-line' &&
      id !== 'page8-horizontal-line-two-button' &&
      page9PackingCompareId !== 'page9-two-button-vertical-gold-line' &&
      page9PackingCompareId !== 'page9-horizontal-line-two-button'
    ) {
      return undefined;
    }
    const bump = () => setPage5Container2Tick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PAGE8_CONTAINER2_VISIBLE_STATES = [
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE9_CONTAINER2_VISIBLE_STATES = [...PAGE8_CONTAINER2_VISIBLE_STATES, ...PAGE9_PACKAGING_STATE4];
  const PAGE5_CONTAINER2_VISIBLE_STATES = [
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];

  // Page 8 container-3 (axis "3"): vertical + "3" after axis-2 is complete (page 5 has no third axis)
  const [page5Container3Tick, setPage5Container3Tick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page8-three-button-vertical-gold-line' &&
      id !== 'page8-horizontal-line-three-button' &&
      page9PackingCompareId !== 'page9-three-button-vertical-gold-line' &&
      page9PackingCompareId !== 'page9-horizontal-line-three-button'
    ) {
      return undefined;
    }
    const bump = () => setPage5Container3Tick((n) => n + 1);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PAGE8_CONTAINER3_VISIBLE_STATES = [
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  /** Third column vertical bar: stays through state-3-packets (same as lollipop step onward). */
  const PAGE8_CONTAINER3_VERT_VISIBLE_STATES = [
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE9_CONTAINER3_VISIBLE_STATES = [...PAGE8_CONTAINER3_VISIBLE_STATES, ...PAGE9_PACKAGING_STATE4];
  const PAGE9_CONTAINER3_VERT_VISIBLE_STATES = [
    ...PAGE8_CONTAINER3_VERT_VISIBLE_STATES,
    ...PAGE9_PACKAGING_STATE4
  ];
  const showContainer3Vertical =
    (id === 'page8-three-button-vertical-gold-line' || page9PackingCompareId === 'page9-three-button-vertical-gold-line') &&
    page5Container3Tick >= 0 &&
    (page9PackingCompareId === 'page9-three-button-vertical-gold-line'
      ? PAGE9_CONTAINER3_VERT_VISIBLE_STATES
      : PAGE8_CONTAINER3_VERT_VISIBLE_STATES
    ).includes(ixSt);
  const showContainer3Horizontal =
    (id === 'page8-horizontal-line-three-button' || page9PackingCompareId === 'page9-horizontal-line-three-button') &&
    page5Container3Tick >= 0 &&
    (page9PackingCompareId === 'page9-horizontal-line-three-button'
      ? PAGE9_CONTAINER3_VISIBLE_STATES
      : PAGE8_CONTAINER3_VISIBLE_STATES
    ).includes(ixSt);

  // Page 9 container-4 (axis "4"): appears after axis 3 is complete (state-3-packets).
  const [page5Container4Tick, setPage5Container4Tick] = React.useState(0);
  React.useEffect(() => {
    if (
      page9PackingCompareId !== 'page9-four-button-vertical-gold-line' &&
      page9PackingCompareId !== 'page9-horizontal-line-four-button'
    ) {
      return undefined;
    }
    const bump = () => setPage5Container4Tick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);
  const PAGE9_CONTAINER4_VISIBLE_STATES = ['state-3-packets', ...PAGE9_PACKAGING_STATE4];
  const showContainer4Vertical =
    page9PackingCompareId === 'page9-four-button-vertical-gold-line' &&
    page5Container4Tick >= 0 &&
    PAGE9_CONTAINER4_VISIBLE_STATES.includes(ixSt);
  const showContainer4Horizontal =
    page9PackingCompareId === 'page9-horizontal-line-four-button' &&
    page5Container4Tick >= 0 &&
    PAGE9_CONTAINER4_VISIBLE_STATES.includes(ixSt);

  const PAGE17_CONTAINER6_VISIBLE_STATES = ['state-4-packets', 'state-6-def', 'state-6-reveal', 'state-6-milk', 'state-6-lollipop', 'state-6-packets'];
  const [page17Container6Tick, setPage17Container6Tick] = React.useState(0);
  React.useEffect(() => {
    if (
      page9PackingCompareId !== 'page9-six-button-vertical-gold-line' &&
      page9PackingCompareId !== 'page9-horizontal-line-six-button'
    ) {
      return undefined;
    }
    const bump = () => setPage17Container6Tick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);
  const showContainer6Vertical =
    page9PackingCompareId === 'page9-six-button-vertical-gold-line' &&
    page17Container6Tick >= 0 &&
    PAGE17_CONTAINER6_VISIBLE_STATES.includes(ixSt);
  const showContainer6Horizontal =
    page9PackingCompareId === 'page9-horizontal-line-six-button' &&
    page17Container6Tick >= 0 &&
    PAGE17_CONTAINER6_VISIBLE_STATES.includes(ixSt);

  const PAGE9_AXIS4_LOCKED = ['state-4-reveal', 'state-4-milk', 'state-4-lollipop', 'state-4-packets'];
  const [page5AxisFourTick, setPage5AxisFourTick] = React.useState(0);
  React.useEffect(() => {
    if (page9PackingCompareId !== 'page9-horizontal-line-four-button') {
      return undefined;
    }
    const bump = () => setPage5AxisFourTick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);
  const page5AxisFourLocked =
    page9PackingCompareId === 'page9-horizontal-line-four-button' &&
    page5AxisFourTick >= 0 &&
    PAGE9_AXIS4_LOCKED.includes(ixSt);
  const container2VisibleStates =
    id === 'page5-two-button-vertical-gold-line' || id === 'page5-horizontal-line-two-button'
      ? PAGE5_CONTAINER2_VISIBLE_STATES
      : page9PackingCompareId === 'page9-two-button-vertical-gold-line' || page9PackingCompareId === 'page9-horizontal-line-two-button'
        ? PAGE9_CONTAINER2_VISIBLE_STATES
        : PAGE8_CONTAINER2_VISIBLE_STATES;
  const page5Container2Visible =
    (id === 'page5-two-button-vertical-gold-line' ||
      id === 'page5-horizontal-line-two-button' ||
      id === 'page8-two-button-vertical-gold-line' ||
      id === 'page8-horizontal-line-two-button' ||
      page9PackingCompareId === 'page9-two-button-vertical-gold-line' ||
      page9PackingCompareId === 'page9-horizontal-line-two-button') &&
    page5Container2Tick >= 0 &&
    container2VisibleStates.includes(ixSt);

  const page67Container2Visible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-two-button-vertical-gold-line' ||
      id === 'page6-horizontal-line-two-button' ||
      id === 'page7-two-button-vertical-gold-line' ||
      id === 'page7-horizontal-line-two-button');

  const showContainer2GoldBlock = page5Container2Visible || page67Container2Visible;

  // Page 5 axis check (milk row): visible from state-1-milk onward
  const [page5AxisCheckMilkTick, setPage5AxisCheckMilkTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-axis-check-milk' &&
      id !== 'page8-axis-check-milk' &&
      page9PackingCompareId !== 'page9-axis-check-milk'
    ) {
      return undefined;
    }
    const bump = () => setPage5AxisCheckMilkTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PAGE8_AXIS1_MILK_TICK = [
    'state-1-milk',
    'state-1-lollipop',
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE5_AXIS1_MILK_TICK = [
    'state-1-milk',
    'state-1-lollipop',
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];
  const axis1MilkTickStates =
    id === 'page5-axis-check-milk'
      ? PAGE5_AXIS1_MILK_TICK
      : page9PackingCompareId === 'page9-axis-check-milk'
        ? [...PAGE8_AXIS1_MILK_TICK, ...PAGE9_PACKAGING_STATE4]
        : PAGE8_AXIS1_MILK_TICK;
  const page5AxisCheckMilkVisible =
    (id === 'page5-axis-check-milk' || id === 'page8-axis-check-milk' || page9PackingCompareId === 'page9-axis-check-milk') &&
    page5AxisCheckMilkTick >= 0 &&
    axis1MilkTickStates.includes(ixSt);

  const page67AxisCheckMilkVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis-check-milk' || id === 'page7-axis-check-milk');

  const showAxisCheckMilk = page5AxisCheckMilkVisible || page67AxisCheckMilkVisible;

  // Page 5 axis check (lollipop row): visible from state-1-lollipop onward
  const [page5AxisCheckLollipopTick, setPage5AxisCheckLollipopTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-axis-check-lollipop' &&
      id !== 'page8-axis-check-lollipop' &&
      page9PackingCompareId !== 'page9-axis-check-lollipop'
    ) {
      return undefined;
    }
    const bump = () => setPage5AxisCheckLollipopTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PAGE8_AXIS1_LOLLI_TICK = [
    'state-1-lollipop',
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE5_AXIS1_LOLLI_TICK = [
    'state-1-lollipop',
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];
  const axis1LolliTickStates =
    id === 'page5-axis-check-lollipop'
      ? PAGE5_AXIS1_LOLLI_TICK
      : page9PackingCompareId === 'page9-axis-check-lollipop'
        ? [...PAGE8_AXIS1_LOLLI_TICK, ...PAGE9_PACKAGING_STATE4]
        : PAGE8_AXIS1_LOLLI_TICK;
  const page5AxisCheckLollipopVisible =
    (id === 'page5-axis-check-lollipop' ||
      id === 'page8-axis-check-lollipop' ||
      page9PackingCompareId === 'page9-axis-check-lollipop') &&
    page5AxisCheckLollipopTick >= 0 &&
    axis1LolliTickStates.includes(ixSt);

  const page67AxisCheckLollipopVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis-check-lollipop' || id === 'page7-axis-check-lollipop');

  const showAxisCheckLollipop = page5AxisCheckLollipopVisible || page67AxisCheckLollipopVisible;

  // Page 5 axis check (packets row): visible from state-1-packets onward
  const [page5AxisCheckPacketsTick, setPage5AxisCheckPacketsTick] = React.useState(0);
  React.useEffect(() => {
    if (
      id !== 'page5-axis-check-packets' &&
      id !== 'page8-axis-check-packets' &&
      page9PackingCompareId !== 'page9-axis-check-packets'
    ) {
      return undefined;
    }
    const bump = () => setPage5AxisCheckPacketsTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const PAGE8_AXIS1_PACK_TICK = [
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets',
    'state-3-def',
    'state-3-reveal',
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets'
  ];
  const PAGE5_AXIS1_PACK_TICK = [
    'state-1-packets',
    'state-2-def',
    'state-2-milk',
    'state-2-lollipop',
    'state-2-packets'
  ];
  const axis1PackTickStates =
    id === 'page5-axis-check-packets'
      ? PAGE5_AXIS1_PACK_TICK
      : page9PackingCompareId === 'page9-axis-check-packets'
        ? [...PAGE8_AXIS1_PACK_TICK, ...PAGE9_PACKAGING_STATE4]
        : PAGE8_AXIS1_PACK_TICK;
  const page5AxisCheckPacketsVisible =
    (id === 'page5-axis-check-packets' ||
      id === 'page8-axis-check-packets' ||
      page9PackingCompareId === 'page9-axis-check-packets') &&
    page5AxisCheckPacketsTick >= 0 &&
    axis1PackTickStates.includes(ixSt);

  const page67AxisCheckPacketsVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis-check-packets' || id === 'page7-axis-check-packets');

  const showAxisCheckPackets = page5AxisCheckPacketsVisible || page67AxisCheckPacketsVisible;

  // Page 5 axis-2 check marks (second column): mirror axis-1 progression for state-2-*
  const [page5Axis2ChecksTick, setPage5Axis2ChecksTick] = React.useState(0);
  React.useEffect(() => {
    const axis2Ids = [
      'page5-axis2-check-milk',
      'page5-axis2-check-lollipop',
      'page5-axis2-check-packets',
      'page8-axis2-check-milk',
      'page8-axis2-check-lollipop',
      'page8-axis2-check-packets',
      'page9-axis2-check-milk',
      'page9-axis2-check-lollipop',
      'page9-axis2-check-packets'
    ];
    if (!axis2Ids.includes(id) && !axis2Ids.includes(page9PackingCompareId)) return undefined;
    const bump = () => setPage5Axis2ChecksTick((n) => n + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  const page5Axis2MilkVisible =
    (id === 'page5-axis2-check-milk' ||
      id === 'page8-axis2-check-milk' ||
      page9PackingCompareId === 'page9-axis2-check-milk') &&
    page5Axis2ChecksTick >= 0 &&
    (id === 'page5-axis2-check-milk'
      ? ['state-2-milk', 'state-2-lollipop', 'state-2-packets'].includes(ixSt)
      : page9PackingCompareId === 'page9-axis2-check-milk'
        ? [
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            ...PAGE9_PACKAGING_STATE4
          ].includes(ixSt)
        : [
            'state-2-milk',
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ].includes(ixSt));

  const page67Axis2MilkVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis2-check-milk' || id === 'page7-axis2-check-milk');

  const showAxis2CheckMilk = page5Axis2MilkVisible || page67Axis2MilkVisible;

  const page5Axis2LollipopVisible =
    (id === 'page5-axis2-check-lollipop' ||
      id === 'page8-axis2-check-lollipop' ||
      page9PackingCompareId === 'page9-axis2-check-lollipop') &&
    page5Axis2ChecksTick >= 0 &&
    (id === 'page5-axis2-check-lollipop'
      ? ['state-2-lollipop', 'state-2-packets'].includes(ixSt)
      : page9PackingCompareId === 'page9-axis2-check-lollipop'
        ? [
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            ...PAGE9_PACKAGING_STATE4
          ].includes(ixSt)
        : [
            'state-2-lollipop',
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ].includes(ixSt));

  const page67Axis2LollipopVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis2-check-lollipop' || id === 'page7-axis2-check-lollipop');

  const showAxis2CheckLollipop = page5Axis2LollipopVisible || page67Axis2LollipopVisible;

  const page5Axis2PacketsVisible =
    (id === 'page5-axis2-check-packets' ||
      id === 'page8-axis2-check-packets' ||
      page9PackingCompareId === 'page9-axis2-check-packets') &&
    page5Axis2ChecksTick >= 0 &&
    (id === 'page5-axis2-check-packets'
      ? ixSt === 'state-2-packets'
      : page9PackingCompareId === 'page9-axis2-check-packets'
        ? [
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets',
            ...PAGE9_PACKAGING_STATE4
          ].includes(ixSt)
        : [
            'state-2-packets',
            'state-3-def',
            'state-3-reveal',
            'state-3-milk',
            'state-3-lollipop',
            'state-3-packets'
          ].includes(ixSt));

  const page67Axis2PacketsVisible =
    parcelDiagramStaticTeacherNote &&
    (id === 'page6-axis2-check-packets' || id === 'page7-axis2-check-packets');

  const showAxis2CheckPackets = page5Axis2PacketsVisible || page67Axis2PacketsVisible;

  // Page 5 axis-3 check marks (third column): mirror axis-2 progression for state-3-*
  const [page5Axis3ChecksTick, setPage5Axis3ChecksTick] = React.useState(0);
  React.useEffect(() => {
    const axis3Ids = [
      'page8-axis3-check-milk',
      'page8-axis3-check-lollipop',
      'page8-axis3-check-packets',
      'page9-axis3-check-milk',
      'page9-axis3-check-lollipop',
      'page9-axis3-check-packets'
    ];
    if (!axis3Ids.includes(id) && !axis3Ids.includes(page9PackingCompareId)) return undefined;
    const bump = () => setPage5Axis3ChecksTick((n) => n + 1);
    window.addEventListener('page8InteractionStateChange', bump);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page8InteractionStateChange', bump);
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  /** Axis-3: milk + lollipop ticks through packets finale; packets tick only in state-3-packets. */
  const PAGE9_AXIS3_MILK_VISIBLE = [
    'state-3-milk',
    'state-3-lollipop',
    'state-3-packets',
    ...PAGE9_PACKAGING_STATE4
  ];
  const PAGE9_AXIS3_LOLLI_VISIBLE = ['state-3-lollipop', 'state-3-packets', ...PAGE9_PACKAGING_STATE4];
  const PAGE9_AXIS3_PACK_VISIBLE = ['state-3-packets', ...PAGE9_PACKAGING_STATE4];
  const page5Axis3MilkVisible =
    (id === 'page8-axis3-check-milk' &&
      page5Axis3ChecksTick >= 0 &&
      ['state-3-milk', 'state-3-lollipop', 'state-3-packets'].includes(ixSt)) ||
    (page9PackingCompareId === 'page9-axis3-check-milk' && page5Axis3ChecksTick >= 0 && PAGE9_AXIS3_MILK_VISIBLE.includes(ixSt));

  const showAxis3CheckMilk = page5Axis3MilkVisible;

  const page5Axis3LollipopVisible =
    (id === 'page8-axis3-check-lollipop' &&
      page5Axis3ChecksTick >= 0 &&
      ['state-3-lollipop', 'state-3-packets'].includes(ixSt)) ||
    (page9PackingCompareId === 'page9-axis3-check-lollipop' &&
      page5Axis3ChecksTick >= 0 &&
      PAGE9_AXIS3_LOLLI_VISIBLE.includes(ixSt));

  const showAxis3CheckLollipop = page5Axis3LollipopVisible;

  const page5Axis3PacketsVisible =
    (id === 'page8-axis3-check-packets' && page5Axis3ChecksTick >= 0 && ixSt === 'state-3-packets') ||
    (page9PackingCompareId === 'page9-axis3-check-packets' && page5Axis3ChecksTick >= 0 && PAGE9_AXIS3_PACK_VISIBLE.includes(ixSt));

  const showAxis3CheckPackets = page5Axis3PacketsVisible;

  const [page5Axis4ChecksTick, setPage5Axis4ChecksTick] = React.useState(0);
  React.useEffect(() => {
    const axis4Ids = [
      'page9-axis4-check-milk',
      'page9-axis4-check-lollipop',
      'page9-axis4-check-packets'
    ];
    if (!axis4Ids.includes(id) && !axis4Ids.includes(page9PackingCompareId)) return undefined;
    const bump = () => setPage5Axis4ChecksTick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('page11InteractionStateChange', bump);
    window.addEventListener('page12InteractionStateChange', bump);
    window.addEventListener('page13InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('page11InteractionStateChange', bump);
      window.removeEventListener('page12InteractionStateChange', bump);
      window.removeEventListener('page13InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);

  /** Axis-4 first circle (milk): salmon + cross; visible from state-4-milk onward only (not def/reveal). */
  const PAGE9_AXIS4_MILK_VISIBLE_FROM = ['state-4-milk', 'state-4-lollipop', 'state-4-packets', 'state-6-def', 'state-6-reveal', 'state-6-milk', 'state-6-lollipop', 'state-6-packets'];
  const page5Axis4MilkVisible =
    page9PackingCompareId === 'page9-axis4-check-milk' &&
    page5Axis4ChecksTick >= 0 &&
    PAGE9_AXIS4_MILK_VISIBLE_FROM.includes(ixSt);
  const showAxis4CheckMilk = page5Axis4MilkVisible;

  const page5Axis4LollipopVisible =
    page9PackingCompareId === 'page9-axis4-check-lollipop' &&
    page5Axis4ChecksTick >= 0 &&
    ['state-4-lollipop', 'state-4-packets', 'state-6-def', 'state-6-reveal', 'state-6-milk', 'state-6-lollipop', 'state-6-packets'].includes(ixSt);
  const showAxis4CheckLollipop = page5Axis4LollipopVisible;

  const page5Axis4PacketsVisible =
    page9PackingCompareId === 'page9-axis4-check-packets' && page5Axis4ChecksTick >= 0 && ['state-4-packets', 'state-6-def', 'state-6-reveal', 'state-6-milk', 'state-6-lollipop', 'state-6-packets'].includes(ixSt);
  const showAxis4CheckPackets = page5Axis4PacketsVisible;

  const [page17Axis6ChecksTick, setPage17Axis6ChecksTick] = React.useState(0);
  React.useEffect(() => {
    const axis6Ids = ['page9-axis6-check-milk', 'page9-axis6-check-lollipop', 'page9-axis6-check-packets'];
    if (!axis6Ids.includes(page9PackingCompareId)) return undefined;
    const bump = () => setPage17Axis6ChecksTick((n) => n + 1);
    window.addEventListener('page9InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page9InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [id]);
  const showAxis6CheckMilk =
    page9PackingCompareId === 'page9-axis6-check-milk' &&
    page17Axis6ChecksTick >= 0 &&
    ['state-6-milk', 'state-6-lollipop', 'state-6-packets'].includes(ixSt);
  const showAxis6CheckLollipop =
    page9PackingCompareId === 'page9-axis6-check-lollipop' &&
    page17Axis6ChecksTick >= 0 &&
    ['state-6-lollipop', 'state-6-packets'].includes(ixSt);
  const showAxis6CheckPackets =
    page9PackingCompareId === 'page9-axis6-check-packets' &&
    page17Axis6ChecksTick >= 0 &&
    ixSt === 'state-6-packets';

  // Use provided id or fall back to generated id
  const elementId = id || generatedId;

  // Handle dynamic textColor for page 7 distance texts based on fill blanks state
  const getTextColorFromState = React.useCallback(() => {
    if (id === 'page7-distance-1-text') {
      // Check if opt1 is correctly placed
      const fillBlanksState = window.page7FillBlanksState || {};
      const filledBlanks = fillBlanksState.filledBlanks || {};
      const opt1Placed = Object.values(filledBlanks).includes('opt1');
      console.log('🎨 [TeacherNote] distance-1-text: opt1Placed =', opt1Placed, 'filledBlanks =', filledBlanks);
      return opt1Placed ? '#20B2AA' : '#ffffff';
    } else if (id === 'page7-width-text') {
      // Check if opt3 is correctly placed
      const fillBlanksState = window.page7FillBlanksState || {};
      const filledBlanks = fillBlanksState.filledBlanks || {};
      const opt3Placed = Object.values(filledBlanks).includes('opt3');
      console.log('🎨 [TeacherNote] width-text: opt3Placed =', opt3Placed, 'filledBlanks =', filledBlanks);
      return opt3Placed ? '#20B2AA' : '#ffffff';
    } else if (id === 'page7-distance-2-text') {
      // Check if opt2 is correctly placed
      const fillBlanksState = window.page7FillBlanksState || {};
      const filledBlanks = fillBlanksState.filledBlanks || {};
      const opt2Placed = Object.values(filledBlanks).includes('opt2');
      console.log('🎨 [TeacherNote] distance-2-text: opt2Placed =', opt2Placed, 'filledBlanks =', filledBlanks);
      return opt2Placed ? '#20B2AA' : '#ffffff';
    }
    return textColorProp;
  }, [id, textColorProp]);

  const [dynamicTextColor, setDynamicTextColor] = React.useState(() => {
    const initialColor = getTextColorFromState();
    console.log('🎨 [TeacherNote] Initial color for', id, '=', initialColor);
    return initialColor;
  });

  // Listen for page7FillBlanksStateUpdate events to update textColor dynamically
  React.useEffect(() => {
    if (id && (id === 'page7-distance-1-text' || id === 'page7-width-text' || id === 'page7-distance-2-text')) {
      const handleStateUpdate = () => {
        console.log('🎨 [TeacherNote] Received page7FillBlanksStateUpdate for', id);
        const newColor = getTextColorFromState();
        console.log('🎨 [TeacherNote] Updating color for', id, 'to', newColor);
        setDynamicTextColor(newColor);
      };

      window.addEventListener('page7FillBlanksStateUpdate', handleStateUpdate);
      return () => {
        window.removeEventListener('page7FillBlanksStateUpdate', handleStateUpdate);
      };
    }
  }, [id, getTextColorFromState]);

  // Use dynamic textColor if this is one of the page 7 distance texts, otherwise use prop
  const textColor = (id === 'page7-distance-1-text' || id === 'page7-width-text' || id === 'page7-distance-2-text')
    ? dynamicTextColor
    : textColorProp;

  // Debug log for page 7 texts
  if (id && (id === 'page7-distance-1-text' || id === 'page7-width-text' || id === 'page7-distance-2-text')) {
    console.log('🎨 [TeacherNote] Rendering', id, 'with textColor =', textColor);
  }

  // Handle dynamic backgroundColor for page9-improper-fraction-container and page14-improper-fraction-container based on quiz completion
  const [dynamicBackgroundColor, setDynamicBackgroundColor] = React.useState(backgroundColor);

  // Listen for quizCompleted events to change background color for page9-improper-fraction-container and page14-improper-fraction-container
  React.useEffect(() => {
    if (id === 'page9-improper-fraction-container' || id === 'page14-improper-fraction-container') {
      const handleQuizCompleted = (event) => {
        const pageNumber = event.detail?.pageNumber;
        const currentPage = typeof window !== 'undefined' && window.getCurrentPage ? window.getCurrentPage() : null;

        // Check if the event is for page 9 or page 14
        if ((id === 'page9-improper-fraction-container' && (pageNumber === 9 || currentPage === 9)) ||
          (id === 'page14-improper-fraction-container' && (pageNumber === 14 || currentPage === 14))) {
          console.log(`🎨 [TeacherNote] Quiz completed for ${id === 'page9-improper-fraction-container' ? 'page 9' : 'page 14'}, changing background to green`);
          setDynamicBackgroundColor('rgba(34, 197, 94, 0.45)'); // Green (#22C55E) with 45% opacity
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);
      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
  }, [id]);

  // Use dynamic backgroundColor for page9-improper-fraction-container or page14-improper-fraction-container, otherwise use prop
  const finalBackgroundColor =
    id === 'page9-improper-fraction-container' || id === 'page14-improper-fraction-container'
      ? dynamicBackgroundColor
        : page9PackingCompareId === 'page9-axis4-check-milk'
          ? 'var(--color-salmon, #FA8072)'
        : id === 'page5-horizontal-line-one-button' &&
          (page5StForTeacherNote === 'state-1-packets' || page5StForTeacherNote.startsWith('state-2-'))
        ? '#22C55E'
        : (id === 'page8-horizontal-line-one-button' || page9PackingCompareId === 'page9-horizontal-line-one-button') &&
            (ixSt === 'state-1-packets' ||
              ixSt.startsWith('state-2-') ||
              ixSt.startsWith('state-3-') ||
              (page9PackingCompareId === 'page9-horizontal-line-one-button' && (ixSt.startsWith('state-4') || ixSt.startsWith('state-6'))))
          ? '#22C55E'
          : id === 'page5-horizontal-line-two-button' && page5StForTeacherNote === 'state-2-packets'
            ? '#22C55E'
            : (id === 'page8-horizontal-line-two-button' || page9PackingCompareId === 'page9-horizontal-line-two-button') &&
                (ixSt === 'state-2-packets' ||
                  ixSt.startsWith('state-3-') ||
                  (page9PackingCompareId === 'page9-horizontal-line-two-button' && (ixSt.startsWith('state-4') || ixSt.startsWith('state-6'))))
              ? '#22C55E'
            : ((id === 'page8-horizontal-line-three-button' && ixSt === 'state-3-packets') ||
                (page9PackingCompareId === 'page9-horizontal-line-three-button' &&
                  (ixSt === 'state-3-packets' || ixSt.startsWith('state-4') || ixSt.startsWith('state-6'))))
              ? '#22C55E'
            : ((id === 'page8-three-button-vertical-gold-line' && ixSt === 'state-3-packets') ||
                (page9PackingCompareId === 'page9-three-button-vertical-gold-line' &&
                  (ixSt === 'state-3-packets' || ixSt.startsWith('state-4') || ixSt.startsWith('state-6'))))
              ? '#22C55E'
            : (id === 'page17-horizontal-line-four-button' || id === 'page17-four-button-vertical-gold-line') &&
                (ixSt === 'state-4-packets' || ixSt.startsWith('state-6'))
              ? '#22C55E'
            : (page9PackingCompareId === 'page9-horizontal-line-four-button' || page9PackingCompareId === 'page9-four-button-vertical-gold-line') &&
                ixSt === 'state-4-packets'
              ? 'var(--color-salmon, #FA8072)'
            : (page9PackingCompareId === 'page9-horizontal-line-six-button' || page9PackingCompareId === 'page9-six-button-vertical-gold-line') &&
                ixSt === 'state-6-packets'
              ? '#22C55E'
          : parcelDiagramStaticTeacherNote &&
              (id === 'page6-horizontal-line-one-button' ||
                id === 'page6-horizontal-line-two-button' ||
                id === 'page7-horizontal-line-one-button' ||
                id === 'page7-horizontal-line-two-button')
            ? '#22C55E'
            : backgroundColor;

  console.log('🔍 TeacherNoteComponent RENDERED!');
  console.log('🔍 TeacherNoteComponent props:', props);

  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = React.useCallback((text) => {
    if (!text || typeof text !== 'string') return text;

    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      let convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      // Replace LaTeX commands with their symbols
      convertedContent = convertedContent.replace(/\\times/g, '×');
      convertedContent = convertedContent.replace(/\\cdot/g, '·');
      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });

    return result;
  }, []);

  // Page 9 axis-4 first circle: always cross (never tick).
  // Page 9 packing feedback strip: incorrect copy at state-4-milk; four-parcel copy at state-4-packets; hidden at state-4-lollipop.
  void page9PacketsFeedbackTick;
  void i18nTextTick;
  const textSourceForFractions =
    page9PackingCompareId === 'page9-axis4-check-milk'
      ? '\u2715'
      : page9PackingCompareId === 'page9-packets-equal-feedback' && packingStPage910111213 === 'state-4-milk'
        ? (() => {
            if (typeof window !== 'undefined' && window.i18n && typeof window.i18n.t === 'function') {
              const t = window.i18n.t('pages.page9.feedbackTwoMilkBoxesLeftover');
              if (typeof t === 'string' && t.length > 0 && !t.startsWith('[Missing:')) return t;
            }
            return '2 milk boxes are left over.';
          })()
        : effectiveText;

  // Convert LaTeX fractions in the text before processing
  const textWithFractions = convertLatexFractions(textSourceForFractions);

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process other gc properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: finalBackgroundColor,
    ...(processedBorder ? { border: processedBorder } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedPadding ? { padding: processedPadding } : {}),
    ...(processedFontSize ? { fontSize: processedFontSize } : {}),
    color: textColor,
    display:
      id === 'page5-one-button-vertical-gold-line' ||
        id === 'page8-one-button-vertical-gold-line' ||
        page9PackingCompareId === 'page9-one-button-vertical-gold-line' ||
        id === 'page6-one-button-vertical-gold-line' ||
        id === 'page7-one-button-vertical-gold-line'
        ? showContainer1VertGoldLine
          ? 'flex'
          : 'none'
        : id === 'page5-two-button-vertical-gold-line' ||
            id === 'page5-horizontal-line-two-button' ||
            id === 'page8-two-button-vertical-gold-line' ||
            id === 'page8-horizontal-line-two-button' ||
            page9PackingCompareId === 'page9-two-button-vertical-gold-line' ||
            page9PackingCompareId === 'page9-horizontal-line-two-button' ||
            id === 'page6-two-button-vertical-gold-line' ||
            id === 'page6-horizontal-line-two-button' ||
            id === 'page7-two-button-vertical-gold-line' ||
            id === 'page7-horizontal-line-two-button'
          ? showContainer2GoldBlock
            ? 'flex'
            : 'none'
          : id === 'page8-three-button-vertical-gold-line' || page9PackingCompareId === 'page9-three-button-vertical-gold-line'
            ? showContainer3Vertical
              ? 'flex'
              : 'none'
            : id === 'page8-horizontal-line-three-button' || page9PackingCompareId === 'page9-horizontal-line-three-button'
              ? showContainer3Horizontal
                ? 'flex'
                : 'none'
              : page9PackingCompareId === 'page9-four-button-vertical-gold-line'
                ? showContainer4Vertical
                  ? 'flex'
                  : 'none'
                : page9PackingCompareId === 'page9-horizontal-line-four-button'
                  ? showContainer4Horizontal
                    ? 'flex'
                    : 'none'
                  : id === 'page5-axis-check-milk' ||
              id === 'page8-axis-check-milk' ||
              page9PackingCompareId === 'page9-axis-check-milk' ||
              id === 'page6-axis-check-milk' ||
              id === 'page7-axis-check-milk'
            ? showAxisCheckMilk
              ? 'flex'
              : 'none'
            : id === 'page5-axis-check-lollipop' ||
                id === 'page8-axis-check-lollipop' ||
                page9PackingCompareId === 'page9-axis-check-lollipop' ||
                id === 'page6-axis-check-lollipop' ||
                id === 'page7-axis-check-lollipop'
              ? showAxisCheckLollipop
                ? 'flex'
                : 'none'
              : id === 'page5-axis-check-packets' ||
                  id === 'page8-axis-check-packets' ||
                  page9PackingCompareId === 'page9-axis-check-packets' ||
                  id === 'page6-axis-check-packets' ||
                  id === 'page7-axis-check-packets'
                ? showAxisCheckPackets
                  ? 'flex'
                  : 'none'
                : id === 'page5-axis2-check-milk' ||
                    id === 'page8-axis2-check-milk' ||
                    page9PackingCompareId === 'page9-axis2-check-milk' ||
                    id === 'page6-axis2-check-milk' ||
                    id === 'page7-axis2-check-milk'
                  ? showAxis2CheckMilk
                    ? 'flex'
                    : 'none'
                  : id === 'page5-axis2-check-lollipop' ||
                      id === 'page8-axis2-check-lollipop' ||
                      page9PackingCompareId === 'page9-axis2-check-lollipop' ||
                      id === 'page6-axis2-check-lollipop' ||
                      id === 'page7-axis2-check-lollipop'
                    ? showAxis2CheckLollipop
                      ? 'flex'
                      : 'none'
                    : id === 'page5-axis2-check-packets' ||
                        id === 'page8-axis2-check-packets' ||
                        page9PackingCompareId === 'page9-axis2-check-packets' ||
                        id === 'page6-axis2-check-packets' ||
                        id === 'page7-axis2-check-packets'
                      ? showAxis2CheckPackets
                        ? 'flex'
                        : 'none'
                      : id === 'page8-axis3-check-milk' || page9PackingCompareId === 'page9-axis3-check-milk'
                        ? showAxis3CheckMilk
                          ? 'flex'
                          : 'none'
                        : id === 'page8-axis3-check-lollipop' || page9PackingCompareId === 'page9-axis3-check-lollipop'
                          ? showAxis3CheckLollipop
                            ? 'flex'
                            : 'none'
                          : id === 'page8-axis3-check-packets' || page9PackingCompareId === 'page9-axis3-check-packets'
                            ? showAxis3CheckPackets
                              ? 'flex'
                              : 'none'
                            : page9PackingCompareId === 'page9-axis4-check-milk'
                              ? showAxis4CheckMilk
                                ? 'flex'
                                : 'none'
                              : page9PackingCompareId === 'page9-axis4-check-lollipop'
                                ? showAxis4CheckLollipop
                                  ? 'flex'
                                  : 'none'
                                : page9PackingCompareId === 'page9-axis4-check-packets'
                                  ? showAxis4CheckPackets
                                    ? 'flex'
                                    : 'none'
                                  : page9PackingCompareId === 'page9-six-button-vertical-gold-line'
                                    ? showContainer6Vertical
                                      ? 'flex'
                                      : 'none'
                                    : page9PackingCompareId === 'page9-horizontal-line-six-button'
                                      ? showContainer6Horizontal
                                        ? 'flex'
                                        : 'none'
                                      : page9PackingCompareId === 'page9-axis6-check-milk'
                                        ? showAxis6CheckMilk
                                          ? 'flex'
                                          : 'none'
                                        : page9PackingCompareId === 'page9-axis6-check-lollipop'
                                          ? showAxis6CheckLollipop
                                            ? 'flex'
                                            : 'none'
                                          : page9PackingCompareId === 'page9-axis6-check-packets'
                                            ? showAxis6CheckPackets
                                              ? 'flex'
                                              : 'none'
                                            : page9PackingCompareId === 'page9-six-parcels-feedback'
                                              ? ixSt === 'state-6-packets'
                                                ? 'flex'
                                                : 'none'
                                              : id === 'page8-packets-equal-feedback'
                                    ? page8StForTeacherNote === 'state-3-packets'
                                      ? 'flex'
                                      : 'none'
                                    : page9PackingCompareId === 'page9-packets-equal-feedback'
                                      ? packingStPage910111213 === 'state-4-milk' ||
                                          packingStPage910111213 === 'state-4-packets'
                                        ? 'flex'
                                        : 'none'
                                      : display === 'none'
                                        ? 'none'
                                        : 'flex', // Use display prop, default to 'flex'
    ...(parcelDiagramStaticTeacherNote
      ? { pointerEvents: 'none', cursor: 'default' }
      : page5LabelStatesConfigured ||
          page8LabelStatesConfigured ||
          page9LabelStatesConfigured ||
          page11LabelStatesConfigured ||
          page12LabelStatesConfigured ||
          page13LabelStatesConfigured
        ? pageLabelPointerActive
          ? { pointerEvents: 'auto', cursor: 'pointer' }
          : { pointerEvents: 'none', cursor: 'default' }
        : page5AxisOneLocked || page5AxisTwoLocked || page5AxisThreeLocked || page5AxisFourLocked
          ? { pointerEvents: 'none', cursor: 'default' }
          : cursor
            ? { cursor }
            : {}),
    ...(id === 'page8-vertical-blue-line' ||
    id === 'page8-horizontal-gold-line' ||
    page9PackingCompareId === 'page9-vertical-blue-line' ||
    page9PackingCompareId === 'page9-horizontal-gold-line' ||
    id === 'page10-vertical-blue-line' ||
    id === 'page10-horizontal-gold-line' ||
    id === 'page14-vertical-blue-line' ||
    id === 'page14-horizontal-gold-line' ||
    (typeof id === 'string' && id.startsWith('page14-horizontal-gold-dot-')) ||
    id === 'page14-horizontal-line-unknown-pill' ||
    id === 'page15-vertical-blue-line' ||
    id === 'page15-horizontal-gold-line' ||
    (typeof id === 'string' && id.startsWith('page15-horizontal-gold-dot-')) ||
    id === 'page15-horizontal-line-unknown-pill' ||
    id === 'page16-vertical-blue-line' ||
    id === 'page16-horizontal-gold-line' ||
    (typeof id === 'string' && id.startsWith('page16-horizontal-gold-dot-')) ||
    id === 'page16-horizontal-line-unknown-pill' ||
    id === 'page11-vertical-blue-line' ||
    id === 'page11-horizontal-gold-line' ||
    id === 'page12-vertical-blue-line' ||
    id === 'page12-horizontal-gold-line' ||
    id === 'page13-vertical-blue-line' ||
    id === 'page13-horizontal-gold-line' ||
    id === 'page5-vertical-blue-line' ||
    id === 'page5-horizontal-gold-line'
      ? { pointerEvents: 'none' }
      : {}),
    alignItems: 'center',
    justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
    textAlign: textAlign,
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    ...(blink
      ? { animation: 'imageStackBlink 1s infinite' }
      : pulsate
        ? { animation: 'pulsate 1.5s ease-in-out infinite' }
        : {})
  };

  // Check if text contains HTML tags
  const containsHTML = textWithFractions && typeof textWithFractions === 'string' && /<[^>]+>/.test(textWithFractions);

  // Use a ref to manage the content to avoid React reconciliation issues with dangerouslySetInnerHTML
  const contentRef = React.useRef(null);

  // Listen for quizCompleted to update header text for page 19
  React.useEffect(() => {
    if (id === 'page19-header-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 19 && contentRef.current) {
          console.log('🔍 [TeacherNote] Quiz completed for page 19, updating header text');
          contentRef.current.textContent = getI18nText(
            'pages.page19.headerAfterQuiz',
            "You have found the distance from Komang’s to Lucas’ house!"
          );
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);
      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
  }, [id]);

  // Update the content using direct DOM manipulation to avoid React removeChild errors
  React.useEffect(() => {
    if (contentRef.current) {
      if (containsHTML) {
        contentRef.current.innerHTML = textWithFractions || '';
      } else {
        contentRef.current.textContent = textWithFractions || '';
      }
    }
  }, [textWithFractions, containsHTML, page9PacketsFeedbackTick]);

  return React.createElement('div', {
    id: elementId,
    className: 'teacher-note-text-box',
    style: finalStyles,
    'data-element-type': 'teacher-note',
    'data-grid-position': position?.gridPosition,
    onClick: parcelDiagramStaticTeacherNote
      ? undefined
      : pageLabelNavigateClickActive
        ? () => {
            if (typeof window === 'undefined' || !pageLabelResolvedNext) return;
            if (usePage8Packaging) {
              const from = window.page8InteractionState;
              window.page8InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page8InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            } else if (usePage13Packaging) {
              const from = window.page13InteractionState;
              window.page13InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page13InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            } else if (usePage12Packaging) {
              const from = window.page12InteractionState;
              window.page12InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page12InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            } else if (usePage11Packaging) {
              const from = window.page11InteractionState;
              window.page11InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page11InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            } else if (usePage9StylePackaging) {
              const from = window.page9InteractionState;
              window.page9InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page9InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            } else {
              const from = window.page5InteractionState;
              window.page5InteractionState = pageLabelResolvedNext;
              window.dispatchEvent(
                new CustomEvent('page5InteractionStateChange', {
                  detail: { state: pageLabelResolvedNext, from }
                })
              );
            }
          }
        : page5AxisOneLocked ||
            page5AxisTwoLocked ||
            page5AxisThreeLocked ||
            page5AxisFourLocked ||
            typeof onClick !== 'function'
          ? undefined
          : onClick
  }, React.createElement('span', {
    ref: contentRef,
    // Empty initially, content is set by useEffect to avoid dangerouslySetInnerHTML reconciliation issues
  }));
});

/**
 * Section Header Component - Generic component for section headers with optional underlines
 */
const SectionHeaderComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;
  const {
    position,
    processedStyles,
    elementZIndex,
    text: textProp = 'Section Header',
    fontSize = '24gc',
    textColor = '#ffffff',
    backgroundColor = 'transparent',
    underlineColor = '#00FF7F',
    underlineThickness = '3gc',
    padding = '20gc',
    borderRadius = '15gc',
    underlineFirstWord = true,
    fontWeight = 'bold',
    textAlign = 'left',
    allowHtml = false
  } = props;

  console.log('🔍 SectionHeaderComponent RENDERED!');
  console.log('🔍 SectionHeaderComponent props:', props);

  // State for text that can be updated dynamically
  const [currentText, setCurrentText] = React.useState(textProp);

  const [page18TextTick, setPage18TextTick] = React.useState(0);
  const page18TextHeaderRef = React.useRef(null);
  React.useEffect(() => {
    if (
      componentId !== 'page18-text-button-1-text' &&
      componentId !== 'page18-text-button-2-text' &&
      componentId !== 'page18-text-button-3-text'
    )
      return undefined;
    const bump = () => setPage18TextTick((n) => n + 1);
    window.addEventListener('page18InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page18InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, [componentId]);
  React.useEffect(() => {
    if (
      componentId !== 'page18-text-button-1-text' &&
      componentId !== 'page18-text-button-2-text' &&
      componentId !== 'page18-text-button-3-text'
    )
      return undefined;
    const el = page18TextHeaderRef.current;
    if (!el) return undefined;
    const onClick = () => {
      if (typeof window === 'undefined') return;
      const st = window.page18InteractionState || 'state-18-def';
      let next = null;
      if (componentId === 'page18-text-button-1-text' && st === 'state-18-def') next = 'state-18-equal';
      else if (componentId === 'page18-text-button-2-text' && st === 'state-18-equal') next = 'state-18-leftover';
      else if (componentId === 'page18-text-button-3-text' && st === 'state-18-leftover') next = 'state-18-max';
      if (next == null) return;
      window.page18InteractionState = next;
      window.dispatchEvent(new CustomEvent('page18InteractionStateChange', { detail: { state: next } }));
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [componentId]);

  // Update text when prop changes (page 5 / 8 / 9 footers are driven by interaction state — see below)
  React.useEffect(() => {
    if (
      componentId === 'page5-instruction-text' ||
      componentId === 'page8-instruction-text' ||
      componentId === 'page9-instruction-text' ||
      componentId === 'page17-instruction-text' ||
      componentId === 'page11-instruction-text' ||
      componentId === 'page12-instruction-text' ||
      componentId === 'page13-instruction-text' ||
      componentId === 'page18-instruction-text'
    ) {
      return;
    }
    setCurrentText(textProp);
  }, [textProp, componentId]);

  // Page 18 footer: after all three GCF rows are tapped (state-18-max), prompt Start Over
  React.useEffect(() => {
    if (componentId !== 'page18-instruction-text') return undefined;
    const sync = () => {
      if (typeof window === 'undefined') {
        setCurrentText(textProp);
        return;
      }
      const st = window.page18InteractionState || 'state-18-def';
      if (st === 'state-18-max') {
        setCurrentText(
          getI18nText(
            'pages.page18.footerInstructionStartOver',
            "Tap 'Start Over' to start again"
          )
        );
      } else {
        setCurrentText(textProp);
      }
    };
    sync();
    window.addEventListener('page18InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    return () => {
      window.removeEventListener('page18InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
    };
  }, [textProp, componentId]);

  // Page 5 footer: two-parcel flow only; third axis / state-3 copy is on page 8.
  React.useEffect(() => {
    if (componentId !== 'page5-instruction-text') return undefined;
    const sync = () => {
      const st = typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
      if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState2Packets',
            "Tap \u00bb to identify what we need 'to find'."
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page5.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page5InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page5InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  // Page 8 footer: same state-driven copy as page 5, separate window.page8InteractionState
  React.useEffect(() => {
    if (componentId !== 'page8-instruction-text') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page8InteractionState || 'default' : 'default';
      if (st === 'state-3-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Packets',
            'Tap \u00bb to pack in 4 boxes.'
          )
        );
      } else if (st === 'state-3-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-def') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Def',
            'Tap \u201c3\u201d button to bring 3 parcels.'
          )
        );
      } else if (st === 'state-3-milk' || st === 'state-3-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3MilkLollipop',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState2Packets',
            'Tap \u201c3\u201d button to bring 3 parcel boxes this time.'
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page8.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page8InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page8InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  // Page 9 footer: same copy and state machine as page 8; uses `window.page9InteractionState` only.
  // Page 17 reuses the same packing model and global state as page 9 (same as pages 10–16).
  React.useEffect(() => {
    if (componentId !== 'page9-instruction-text' && componentId !== 'page17-instruction-text') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page9InteractionState || 'default' : 'default';
      if (st === 'state-6-packets') {
        setCurrentText(
          getI18nText(
            'pages.page17.footerInstructionState6Packets',
            'Tap » to conclude.'
          )
        );
      } else if (st === 'state-6-def') {
        setCurrentText(
          getI18nText(
            'pages.page17.footerInstructionState6Def',
            'Tap \u201c6\u201d button to bring 6 parcel boxes.'
          )
        );
      } else if (st === 'state-6-reveal' || st === 'state-6-milk' || st === 'state-6-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page17.footerInstructionState6Packing',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-4-packets') {
        if (componentId === 'page17-instruction-text') {
          setCurrentText(
            getI18nText(
              'pages.page17.footerInstructionState4Packets',
              "Tap '6' to bring 6 parcel boxes."
            )
          );
        } else {
          setCurrentText(
            getI18nText(
              'pages.page9.footerInstructionState4Packets',
              'Tap » to analyse the packing.'
            )
          );
        }
      } else if (st === 'state-4-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-4-def') {
        setCurrentText(
          getI18nText(
            'pages.page9.footerInstructionState4Def',
            'Tap \u201c4\u201d button to bring 4 parcel boxes.'
          )
        );
      } else if (st === 'state-4-milk' || st === 'state-4-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3PacketsPage9',
            'Tap \u201c4\u201d to bring 4 parcel boxes this time.'
          )
        );
      } else if (st === 'state-3-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-def') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Def',
            'Tap \u201c3\u201d button to bring 3 parcels.'
          )
        );
      } else if (st === 'state-3-milk' || st === 'state-3-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3MilkLollipop',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState2Packets',
            'Tap \u201c3\u201d button to bring 3 parcel boxes this time.'
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page8.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page9InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page9InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  // Page 11 footer: same packing state machine as page 9; uses `window.page11InteractionState` only (no quiz).
  React.useEffect(() => {
    if (componentId !== 'page11-instruction-text') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page11InteractionState || 'default' : 'default';
      if (st === 'state-4-packets') {
        setCurrentText(
          getI18nText('pages.page11.instructionAfterQuiz', 'Tap » to check the next observation')
        );
      } else if (st === 'state-4-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-4-def') {
        setCurrentText(
          getI18nText(
            'pages.page9.footerInstructionState4Def',
            'Tap \u201c4\u201d button to bring 4 parcel boxes.'
          )
        );
      } else if (st === 'state-4-milk' || st === 'state-4-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3PacketsPage9',
            'Tap \u201c4\u201d to bring 4 parcel boxes this time.'
          )
        );
      } else if (st === 'state-3-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-def') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Def',
            'Tap \u201c3\u201d button to bring 3 parcels.'
          )
        );
      } else if (st === 'state-3-milk' || st === 'state-3-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3MilkLollipop',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState2Packets',
            'Tap \u201c3\u201d button to bring 3 parcel boxes this time.'
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page11.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page11InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page11InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  // Page 12 footer: same packing state machine as page 11; uses `window.page12InteractionState` only (no quiz).
  React.useEffect(() => {
    if (componentId !== 'page12-instruction-text') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page12InteractionState || 'default' : 'default';
      if (st === 'state-4-packets') {
        setCurrentText(
          getI18nText('pages.page12.instructionAfterQuiz', 'Tap » to find the maximum number of parcels.')
        );
      } else if (st === 'state-4-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-4-def') {
        setCurrentText(
          getI18nText(
            'pages.page9.footerInstructionState4Def',
            'Tap \u201c4\u201d button to bring 4 parcel boxes.'
          )
        );
      } else if (st === 'state-4-milk' || st === 'state-4-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3PacketsPage9',
            'Tap \u201c4\u201d to bring 4 parcel boxes this time.'
          )
        );
      } else if (st === 'state-3-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-def') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Def',
            'Tap \u201c3\u201d button to bring 3 parcels.'
          )
        );
      } else if (st === 'state-3-milk' || st === 'state-3-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3MilkLollipop',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState2Packets',
            'Tap \u201c3\u201d button to bring 3 parcel boxes this time.'
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page12.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page12InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page12InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  // Page 13 footer: same packing state machine as page 12; uses `window.page13InteractionState` only (no quiz).
  React.useEffect(() => {
    if (componentId !== 'page13-instruction-text') return undefined;
    const sync = () => {
      const st =
        typeof window !== 'undefined' ? window.page13InteractionState || 'default' : 'default';
      if (st === 'state-4-packets') {
        setCurrentText(
          getI18nText('pages.page13.instructionAfterQuiz', 'Tap » to find the maximum number of parcels.')
        );
      } else if (st === 'state-4-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-4-def') {
        setCurrentText(
          getI18nText(
            'pages.page9.footerInstructionState4Def',
            'Tap \u201c4\u201d button to bring 4 parcel boxes.'
          )
        );
      } else if (st === 'state-4-milk' || st === 'state-4-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page5.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3PacketsPage9',
            'Tap \u201c4\u201d to bring 4 parcel boxes this time.'
          )
        );
      } else if (st === 'state-3-reveal') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Reveal',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-3-def') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3Def',
            'Tap \u201c3\u201d button to bring 3 parcels.'
          )
        );
      } else if (st === 'state-3-milk' || st === 'state-3-lollipop') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState3MilkLollipop',
            'Tap each button and see how packing will be done.'
          )
        );
      } else if (st === 'state-2-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState2Packets',
            'Tap \u201c3\u201d button to bring 3 parcel boxes this time.'
          )
        );
      } else if (st === 'state-1-packets') {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Packets',
            'Tap \u201c2\u201d button to bring 2 parcel boxes this time.'
          )
        );
      } else if (
        st === 'state-1-def' ||
        st === 'state-1-milk' ||
        st === 'state-1-lollipop' ||
        st === 'state-2-def' ||
        st === 'state-2-milk' ||
        st === 'state-2-lollipop'
      ) {
        setCurrentText(
          getI18nText(
            'pages.page8.footerInstructionState1Def',
            'Tap each button and see how packing will be done.'
          )
        );
      } else {
        setCurrentText(getI18nText('pages.page13.footerInstruction'));
      }
    };
    sync();
    window.addEventListener('page13InteractionStateChange', sync);
    window.addEventListener('pageChanged', sync);
    window.addEventListener('appLanguageChanged', sync);
    return () => {
      window.removeEventListener('page13InteractionStateChange', sync);
      window.removeEventListener('pageChanged', sync);
      window.removeEventListener('appLanguageChanged', sync);
    };
  }, [componentId]);

  //change header text after quiz
  React.useEffect(() => {
    if (componentId === 'page6-header-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 6) {
          console.log('🔍 [SectionHeader] Quiz completed for page 5, updating instruction text');
          setCurrentText(getI18nText("pages.page6.headerAfterQuiz"));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
  }, [componentId]);
  // Listen for quizCompleted event for page 5 to update instruction text
  React.useEffect(() => {
    if (componentId === 'page6-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 6) {
          console.log('🔍 [SectionHeader] Quiz completed for page 5, updating instruction text');
          setCurrentText(getI18nText("pages.page6.instructionAfterQuiz"));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
  }, [componentId]);

  // Listen for quizCompleted event for page 10 / page 14 packing+quiz instruction text (page 14 mirrors page 10)
  React.useEffect(() => {
    if (componentId !== 'page10-instruction-text' && componentId !== 'page14-instruction-text') return undefined;
    const handleQuizCompleted = (event) => {
      const eventPageNumber = event.detail?.pageNumber;
      if (eventPageNumber === 10 && componentId === 'page10-instruction-text') {
        console.log('🔍 [SectionHeader] Quiz completed for page 10, updating instruction text');
        setCurrentText(getI18nText('pages.page10.instructionAfterQuiz'));
      }
      if (eventPageNumber === 14 && componentId === 'page14-instruction-text') {
        console.log('🔍 [SectionHeader] Quiz completed for page 14, updating instruction text');
        setCurrentText(getI18nText('pages.page14.instructionAfterQuiz', 'Tap » to continue.'));
      }
    };

    window.addEventListener('quizCompleted', handleQuizCompleted);

    return () => {
      window.removeEventListener('quizCompleted', handleQuizCompleted);
    };
  }, [componentId]);

  // Listen for quizCompleted event for page 15 to update instruction text
  React.useEffect(() => {
    if (componentId === 'page15-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 15) {
          console.log('🔍 [SectionHeader] Quiz completed for page 15, updating instruction text');
          
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (componentId === 'page16-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 16) {
          console.log('🔍 [SectionHeader] Quiz completed for page 16, updating instruction text');
                    setCurrentText(getI18nText('pages.page16.instructionAfterQuiz', 'Tap » to summarize.'));

        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (componentId === 'page18-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 18) {
          console.log('🔍 [SectionHeader] Quiz completed for page 18, updating instruction text');
          setCurrentText(
            getI18nText(
              'pages.page18.footerInstructionStartOver',
              "Tap 'Start Over' to start again"
            )
          );
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (componentId === 'page19-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 19) {
          console.log('🔍 [SectionHeader] Quiz completed for page 19, updating instruction text');
          setCurrentText(getI18nText('pages.page19.instructionAfterQuiz', 'Tap » to summarise'));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (componentId === 'page7-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 7) {
          console.log('🔍 [SectionHeader] Quiz completed for page 7, updating instruction text');
          setCurrentText(getI18nText('pages.page7.instructionAfterQuiz', 'Tap » to substitute values into the equation'));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (
      componentId === 'page8-instruction-text' ||
      componentId === 'page9-instruction-text'
    ) {
      const targetPage =
        componentId === 'page9-instruction-text' ? 9 : componentId === 'page17-instruction-text' ? 17 : 8;
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === targetPage) {
          console.log(
            `🔍 [SectionHeader] Quiz completed for page ${targetPage}, updating instruction text`
          );
          setCurrentText(getI18nText('pages.page8.instructionAfterQuiz', 'Tap \u00bb to pack in 4 boxes.'));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
if (
      componentId === 'page17-instruction-text'
    ) {
      const targetPage =17
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === targetPage) {
          console.log(
            `🔍 [SectionHeader] Quiz completed for page ${targetPage}, updating instruction text`
          );
          setCurrentText(getI18nText('pages.page17.instructionAfterQuiz', 'Tap \u00bb to pack in 4 boxes.'));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }
    if (componentId === 'page19-header-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 19) {
          console.log('🔍 [SectionHeader] Quiz completed for page 19, updating header text');
          setCurrentText("You have found the distance from Komang’s to Lucas’ house!");
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }

    if (componentId === 'page24-instruction-text') {
      const handleQuizCompleted = (event) => {
        const eventPageNumber = event.detail?.pageNumber;
        if (eventPageNumber === 24) {
          console.log('🔍 [SectionHeader] Quiz completed for page 24, updating instruction text');
          setCurrentText(getI18nText('pages.page24.instructionAfterQuiz', 'Tap » for Step 2.c'));
        }
      };

      window.addEventListener('quizCompleted', handleQuizCompleted);

      return () => {
        window.removeEventListener('quizCompleted', handleQuizCompleted);
      };
    }


  }, [componentId]);

  // Process gc properties
  let processedUnderlineThickness = underlineThickness;
  if (underlineThickness && underlineThickness.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedUnderlineThickness = window.GridCellFontUtils.processGcProperty(underlineThickness, 'borderWidth');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  // Parse text to find the word to underline
  const parseTextWithUnderline = (text, underlineColor, underlineThickness, underlineFirstWord) => {
    if (!underlineFirstWord) {
      return text; // Return plain text if no underline needed
    }

    const words = text.split(' ');
    const firstWord = words[0];
    const remainingWords = words.slice(1).join(' ');

    return React.createElement('span', {
      style: {
        position: 'relative',
        display: 'inline'
      }
    }, [
      React.createElement('span', {
        key: 'underlined-word',
        style: {
          position: 'relative',
          display: 'inline'
        }
      }, [
        firstWord,
        React.createElement('span', {
          key: 'underline',
          style: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: underlineThickness,
            backgroundColor: underlineColor,
            display: 'block'
          }
        })
      ]),
      remainingWords ? ` ${remainingWords}` : ''
    ]);
  };

  const page18TextRow =
    componentId === 'page18-text-button-1-text' ||
    componentId === 'page18-text-button-2-text' ||
    componentId === 'page18-text-button-3-text';
  const p18st =
    page18TextTick >= 0 && typeof window !== 'undefined'
      ? window.page18InteractionState || 'state-18-def'
      : 'state-18-def';
  const page18ThisActive =
    page18TextRow &&
    ((componentId === 'page18-text-button-1-text' && p18st === 'state-18-def') ||
      (componentId === 'page18-text-button-2-text' && p18st === 'state-18-equal') ||
      (componentId === 'page18-text-button-3-text' && p18st === 'state-18-leftover'));
  const page18Completed =
    page18TextRow &&
    ((componentId === 'page18-text-button-1-text' &&
      (p18st === 'state-18-equal' || p18st === 'state-18-leftover' || p18st === 'state-18-max')) ||
      (componentId === 'page18-text-button-2-text' &&
        (p18st === 'state-18-leftover' || p18st === 'state-18-max')) ||
      (componentId === 'page18-text-button-3-text' && p18st === 'state-18-max'));

  /** Page 18: orange inline “pill” → green when its step is done; pill not clickable (clicks use row div). */
  const page18HtmlForDisplay =
    page18TextRow && allowHtml && page18Completed && typeof currentText === 'string'
      ? currentText
          .replace(/background-color:\s*orange/gi, 'background-color:#16a34a')
          .replace(/cursor:\s*pointer/gi, 'cursor:default;pointer-events:none')
      : currentText;

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: backgroundColor,
    ...(processedPadding ? { padding: processedPadding } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedFontSize ? { fontSize: processedFontSize } : {}),
    color: textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
    textAlign: textAlign,
    fontFamily: 'Arial, sans-serif',
    fontWeight: fontWeight,
    boxSizing: 'border-box',
    lineHeight: 'normal',
    ...(allowHtml ? { whiteSpace: 'pre-wrap', wordWrap: 'break-word' } : {}),
    // Apply processedStyles last for grid/layout; page 18 row interaction (no full-row green bg)
    ...(processedStyles || {}),
    ...(page18TextRow
      ? {
          pointerEvents: 'auto',
          opacity: 1,
          cursor: 'pointer'
        }
      : {})
  };

  return React.createElement('div', {
    id: elementId,
    className: 'section-header',
    ref: page18TextRow ? page18TextHeaderRef : undefined,
    style: finalStyles,
    'data-element-type': 'section-header',
    'data-grid-position': position?.gridPosition,
    ...(allowHtml
      ? { dangerouslySetInnerHTML: { __html: page18TextRow ? page18HtmlForDisplay : currentText } }
      : {})
  }, allowHtml ? undefined : parseTextWithUnderline(currentText, underlineColor, processedUnderlineThickness, underlineFirstWord));
});

/**
 * Tab Navigation Component
 */
const TabNavigationComponent = React.memo((props) => {
  const { activeTab = 'Comprehend', onTabChange, fontSize, marginRight, tabBorderRadius, buttonBorderRadius, buttonPadding } = props;
  const tabs = ['Comprehend', 'Connect', 'Compute', 'Check'];

  console.log('🔍 TabNavigationComponent props:', props);
  console.log('🔍 TabNavigationComponent activeTab:', activeTab);
  console.log('🔍 TabNavigationComponent fontSize:', fontSize);
  console.log('🔍 TabNavigationComponent marginRight:', marginRight);
  console.log('🔍 TabNavigationComponent tabBorderRadius:', tabBorderRadius);
  console.log('🔍 TabNavigationComponent buttonBorderRadius:', buttonBorderRadius);
  console.log('🔍 TabNavigationComponent buttonPadding:', buttonPadding);

  // fontSize, marginRight, border radius, and padding should already be processed by math-applet.js, so use them directly
  const tabButtonStyle = {
    ...(fontSize ? { fontSize: fontSize } : {}),
    ...(buttonBorderRadius ? { borderRadius: buttonBorderRadius } : {}),
    ...(buttonPadding ? { padding: buttonPadding } : {})
  };
  const tabNavigationStyle = {
    ...(marginRight ? { marginRight: marginRight } : {}),
    ...(tabBorderRadius ? { borderRadius: tabBorderRadius } : {})
  };
  console.log('🔍 TabNavigationComponent tabButtonStyle:', tabButtonStyle);
  console.log('🔍 TabNavigationComponent tabNavigationStyle:', tabNavigationStyle);

  return React.createElement('div', {
    className: 'tab-navigation',
    style: tabNavigationStyle
  }, tabs.map(tab =>
    React.createElement('button', {
      key: tab,
      className: `tab-button ${tab === activeTab ? 'active' : ''}`,
      onClick: () => onTabChange && onTabChange(tab),
      type: 'button',
      style: tabButtonStyle
    }, tab)
  ));
});

/**
 * ProblemSolve Header Component
 */
const ProblemSolveHeaderComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    backgroundColor = 'linear-gradient(135deg, #6B46C1 0%, #A855F7 100%)',
    borderRadius = '0gc',
    tabBorderRadius = '30gc',
    buttonBorderRadius = '30gc',
    fontSize = '24gc',
    headerText = 'ProblemSolve',
    tabMarginRight = '50gc',
    buttonPadding = '8gc 16gc',
    paddingLeft = '50gc',
    activeTab = 'Comprehend',
    onTabChange
  } = props;

  // Process gc properties
  let processedTabMarginRight = tabMarginRight;
  if (tabMarginRight && tabMarginRight.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedTabMarginRight = window.GridCellFontUtils.processGcProperty(tabMarginRight, 'marginRight');
  }

  let processedButtonPadding = buttonPadding;
  if (buttonPadding && buttonPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedButtonPadding = window.GridCellFontUtils.processGcProperty(buttonPadding, 'padding');
  }

  let processedPaddingLeft = paddingLeft;
  if (paddingLeft && paddingLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPaddingLeft = window.GridCellFontUtils.processGcProperty(paddingLeft, 'paddingLeft');
  }

  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedTabBorderRadius = tabBorderRadius;
  if (tabBorderRadius && tabBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedTabBorderRadius = window.GridCellFontUtils.processGcProperty(tabBorderRadius, 'borderRadius');
  }

  let processedButtonBorderRadius = buttonBorderRadius;
  if (buttonBorderRadius && buttonBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedButtonBorderRadius = window.GridCellFontUtils.processGcProperty(buttonBorderRadius, 'borderRadius');
  }

  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  // Debug logging
  console.log('🔍 ProblemSolveHeaderComponent props:', props);
  console.log('🔍 processedStyles:', processedStyles);

  // Use the position and processedStyles passed from math-applet.js (matching textbox pattern)
  const finalStyles = {
    // Apply grid positioning from the element renderer
    ...(position?.css || {}),
    // Apply processed styles (already processed by math-applet.js with gc units)
    ...(processedStyles || {}),
    // Apply z-index
    zIndex: elementZIndex || 402,
    // Apply background
    background: backgroundColor,
    // Apply border radius
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    // Apply left padding if specified
    ...(processedPaddingLeft ? { paddingLeft: processedPaddingLeft } : {}),
    // Ensure proper display and alignment
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  console.log('🔍 ProblemSolveHeaderComponent finalStyles:', finalStyles);

  return React.createElement('div', {
    id: elementId,
    className: 'header-container problem-solve-header',
    style: finalStyles,
    'data-element-type': 'header',
    'data-grid-position': position?.gridPosition
  }, [
    React.createElement(LogoComponent, {
      key: 'logo',
      headerText: headerText,
      fontSize: processedFontSize
    }),
    React.createElement(TabNavigationComponent, {
      key: 'tabs',
      activeTab,
      onTabChange,
      fontSize: processedFontSize,
      marginRight: processedTabMarginRight,
      tabBorderRadius: processedTabBorderRadius,
      buttonBorderRadius: processedButtonBorderRadius,
      buttonPadding: processedButtonPadding
    })
  ]);
});

/**
 * Quiz Panel Component
 */
const QuizPanelComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    backgroundColor = '#0A0A1A',
    backgroundColorOpacity = 0.5, // Opacity for background color (0-1)
    border = '3gc solid transparent',
    borderRadius = '15gc',
    padding = '15gc',
    quizType = 'MCQ', // Valid types: MCQ, FIB, MAT, SEQ
    quizSubtype = null, // Valid for MCQ: QT2, QT3, QT4, QTI2, QTI3, QTI4, QT2R, QT3R, QT4R, QTI2R, QTI3R, QTI4R, QTIS2, QTIS3, QTIS4, QTIS2R, QTIS3R, QTIS4R; null for others
    questionText = '',
    questionTextFontSize = '24gc',
    questionTextColor = '#ffffff',
    questionTextColorProp = null, // Optional prop to override question text color (e.g., to match header color)
    questionTextAlign = 'center', // Text alignment for question text: 'left', 'center', 'right' (default: 'center')
    showQuestionText = true, // Toggle visibility of question text (default: true)
    feedbackState: initialFeedbackState = 'default', // Valid states: default, normal, correct, incorrect
    feedbackText: initialFeedbackText = '',
    contentColor = '#E0E0E0',
    contentFontSize = '24gc',
    optionButtonTextSize = '24gc', // Font size for option button text (in gc units)
    optionButtonTextColor = '#ffffff', // Text color for option buttons (default: white)
    optionButtonWidth = null, // Override button width percentage (e.g., 80, 90). If null, uses config default
    optionButtonHeight = null, // Override button height percentage (e.g., 85, 95). If null, uses config default
    // Options row props (for MCQ)
    options = [], // Array of {text, image, iscorrect, feedback}
    image = '', // Image path for QTI subtypes
    imageText = '', // Text below image for QTI subtypes
    imageStack = [], // Array of image layer objects for QTIS subtypes (see ImageStackComponent)
    imageStackLayerReplacements = [], // Array of {layerId: number, src: string} to replace specific layers dynamically
    imageStackCoordinates = null, // Optional custom coordinates for image stack [x1, y1, x2, y2]
    keyConcepts = [], // Array of key concepts
    impFormulae = [], // Array of important formulae
    quizId = '', // Unique identifier for this quiz instance
    // Header row props
    headerText = '', // Text for the header row (like comprehend-text-box)
    headerFontSize = '24gc',
    headerTextColor = '#ffffff',
    headerBackgroundColor = 'transparent',
    headerBorder = 'none',
    headerBorderRadius = '0gc',
    headerPadding = '20gc',
    headerUnderlineColor = '#00A0A0',
    headerUnderlineThickness = '2gc'
  } = props;

  const optionsArray = Array.isArray(options) ? options : [];

  // Debug logging for component props
  console.log('🔍 [DEBUG] QuizPanelComponent props:', {
    quizId,
    keyConcepts,
    impFormulae,
    options: optionsArray.length
  });

  // State management for option selection
  const [clickedOptions, setClickedOptions] = React.useState(new Set()); // Track all clicked options
  const [currentFeedbackState, setCurrentFeedbackState] = React.useState(initialFeedbackState);
  const [currentFeedbackText, setCurrentFeedbackText] = React.useState(initialFeedbackText);
  // State for dynamic image stack layer replacements
  const [dynamicImageStackLayerReplacements, setDynamicImageStackLayerReplacements] = React.useState(imageStackLayerReplacements || []);

  // Initialize global state store if it doesn't exist
  if (typeof window !== 'undefined' && !window.quizPanelStateStore) {
    window.quizPanelStateStore = {};
  }

  // Use a unique key based on quizId or component ID
  const stateKey = quizId || props.id || `quiz-${elementId}`;

  // Restore or initialize state when quizId changes (page navigation)
  React.useEffect(() => {
    const savedState = window.quizPanelStateStore?.[stateKey];

    if (savedState) {
      // Restore saved state
      console.log('🔄 QuizPanelComponent quizId changed to:', quizId, '- Restoring saved state');
      setClickedOptions(new Set(savedState.clickedOptions || []));
      setCurrentFeedbackState(savedState.feedbackState !== undefined ? savedState.feedbackState : initialFeedbackState);
      setCurrentFeedbackText(savedState.feedbackText !== undefined ? savedState.feedbackText : initialFeedbackText);
    } else {
      // Initialize fresh state
      console.log('🔄 QuizPanelComponent quizId changed to:', quizId, '- Initializing fresh state');
      setClickedOptions(new Set());
      setCurrentFeedbackState(initialFeedbackState);
      setCurrentFeedbackText(initialFeedbackText);
    }
  }, [quizId, initialFeedbackState, initialFeedbackText, stateKey]);

  // Save state whenever it changes
  React.useEffect(() => {
    if (!window.quizPanelStateStore) {
      window.quizPanelStateStore = {};
    }

    window.quizPanelStateStore[stateKey] = {
      clickedOptions: Array.from(clickedOptions),
      feedbackState: currentFeedbackState,
      feedbackText: currentFeedbackText
    };

    console.log('💾 [QuizPanel] Saved state for', stateKey);
  }, [stateKey, clickedOptions, currentFeedbackState, currentFeedbackText]);

  // Count total correct answers
  const totalCorrectAnswers = React.useMemo(() => {
    return optionsArray.filter(opt => opt.iscorrect === true).length;
  }, [optionsArray]);

  // Count correct answers that have been clicked
  const correctAnswersClicked = React.useMemo(() => {
    let count = 0;
    clickedOptions.forEach(index => {
      if (optionsArray[index]?.iscorrect === true) {
        count++;
      }
    });
    return count;
  }, [clickedOptions, optionsArray]);

  // Check if all correct answers have been found
  const allCorrectAnswersFound = totalCorrectAnswers > 0 && correctAnswersClicked === totalCorrectAnswers;

  // Check if quiz was already completed when state is restored (on page load)
  React.useEffect(() => {
    // Only check if we have options and clickedOptions is not empty (meaning state was restored)
    if (optionsArray.length > 0 && clickedOptions.size > 0 && allCorrectAnswersFound) {
      console.log('✅ [QuizPanel] Quiz was already completed on page load, dispatching quizCompleted event');

      const pageNumber = window.getCurrentPage?.() || null;

      // Mark page as completed in PageCompletionManager
      if (pageNumber && window.PageCompletionManager) {
        window.PageCompletionManager.markPageCompleted(pageNumber);
        console.log(`✅ [QuizPanel] Marked page ${pageNumber} as completed in PageCompletionManager`);
      }

      // Dispatch quizCompleted event to enable next button and hide tap animations
      const enableNextEvent = new CustomEvent('quizCompleted', {
        detail: {
          quizId: quizId,
          pageNumber: pageNumber
        }
      });
      window.dispatchEvent(enableNextEvent);
      console.log('🔍 [QuizPanel] Dispatched quizCompleted event on page load for quizId:', quizId);
    }
  }, [quizId, optionsArray.length, clickedOptions.size, allCorrectAnswersFound]);

  // Determine row heights based on quiz subtype if not explicitly provided
  let headerRowHeight, questionRowHeight, optionsRowHeight, feedbackRowHeight;

  // Check if custom heights were provided
  const hasCustomHeights = props.headerRowHeight !== undefined &&
    props.questionRowHeight !== undefined &&
    props.optionsRowHeight !== undefined &&
    props.feedbackRowHeight !== undefined;

  if (hasCustomHeights) {
    // Use provided custom heights
    headerRowHeight = props.headerRowHeight;
    questionRowHeight = props.questionRowHeight;
    optionsRowHeight = props.optionsRowHeight;
    feedbackRowHeight = props.feedbackRowHeight;
  } else {
    // Get heights from constants configuration
    const heightsConfig = window.QUIZ_ROW_HEIGHTS || {};
    let heights;

    // Try to get heights based on quiz type and subtype
    if (quizType === 'MCQ' && quizSubtype && heightsConfig.MCQ && heightsConfig.MCQ[quizSubtype]) {
      heights = heightsConfig.MCQ[quizSubtype];
    } else if (quizType && heightsConfig[quizType]) {
      heights = heightsConfig[quizType];
    } else {
      // Fallback to DEFAULT
      heights = heightsConfig.DEFAULT || { header: 10, question: 15, options: 70, feedback: 15 };
    }

    headerRowHeight = heights.header;
    questionRowHeight = heights.question;
    optionsRowHeight = heights.options;
    feedbackRowHeight = heights.feedback;
  }

  console.log('🔍 QuizPanelComponent RENDERED!');
  console.log('🔍 QuizPanelComponent props:', props);
  console.log('🔍 QuizPanelComponent quizType:', quizType);
  console.log('🔍 QuizPanelComponent quizSubtype:', quizSubtype);
  console.log('🔍 QuizPanelComponent row heights:', { headerRowHeight, questionRowHeight, optionsRowHeight, feedbackRowHeight });
  console.log('🔍 QuizPanelComponent options:', optionsArray);
  console.log('🔍 QuizPanelComponent image:', image);
  console.log('🔍 QuizPanelComponent imageText:', imageText);
  console.log('🔍 QuizPanelComponent keyConcepts:', keyConcepts);
  console.log('🔍 QuizPanelComponent totalCorrectAnswers:', totalCorrectAnswers);
  console.log('🔍 QuizPanelComponent correctAnswersClicked:', correctAnswersClicked);
  console.log('🔍 QuizPanelComponent allCorrectAnswersFound:', allCorrectAnswersFound);
  console.log('🔍 QuizPanelComponent clickedOptions:', Array.from(clickedOptions));

  // Validate quiz type
  const validQuizTypes = ['MCQ', 'FIB', 'MAT', 'SEQ'];
  const validMCQSubtypes = ['QT2', 'QT3', 'QT4', 'QTI2', 'QTI3', 'QTI4', 'QT2R', 'QT3R', 'QT4R', 'QTI2R', 'QTI3R', 'QTI4R', 'QTIS2', 'QTIS3', 'QTIS4', 'QTIS2R', 'QTIS3R', 'QTIS4R'];

  if (!validQuizTypes.includes(quizType)) {
    console.warn(`⚠️ Invalid quizType: ${quizType}. Valid types are: ${validQuizTypes.join(', ')}`);
  }

  if (quizType === 'MCQ' && quizSubtype && !validMCQSubtypes.includes(quizSubtype)) {
    console.warn(`⚠️ Invalid quizSubtype for MCQ: ${quizSubtype}. Valid subtypes are: ${validMCQSubtypes.join(', ')}`);
  }

  if (quizType !== 'MCQ' && quizSubtype !== null) {
    console.warn(`⚠️ quizSubtype should be null for quiz type: ${quizType}`);
  }

  // Validate row heights - if any are provided (non-default), all must be provided
  const hasCustomHeaderHeight = props.headerRowHeight !== undefined;
  const hasCustomQuestionHeight = props.questionRowHeight !== undefined;
  const hasCustomOptionsHeight = props.optionsRowHeight !== undefined;
  const hasCustomFeedbackHeight = props.feedbackRowHeight !== undefined;
  const hasAnyCustomHeight = hasCustomHeaderHeight || hasCustomQuestionHeight || hasCustomOptionsHeight || hasCustomFeedbackHeight;
  const hasAllCustomHeights = hasCustomHeaderHeight && hasCustomQuestionHeight && hasCustomOptionsHeight && hasCustomFeedbackHeight;

  if (hasAnyCustomHeight && !hasAllCustomHeights) {
    console.warn('⚠️ If any row height is provided, ALL FOUR row heights must be provided (headerRowHeight, questionRowHeight, optionsRowHeight, feedbackRowHeight)');
  }

  // Validate that heights sum to 100 if all are provided
  if (hasAllCustomHeights) {
    const totalHeight = headerRowHeight + questionRowHeight + optionsRowHeight + feedbackRowHeight;
    if (totalHeight !== 100) {
      console.warn(`⚠️ Row heights should sum to 100%. Current sum: ${totalHeight}% (Header: ${headerRowHeight}%, Question: ${questionRowHeight}%, Options: ${optionsRowHeight}%, Feedback: ${feedbackRowHeight}%)`);
    }
  }

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process other gc properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedContentFontSize = contentFontSize;
  if (contentFontSize && contentFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedContentFontSize = window.GridCellFontUtils.processGcProperty(contentFontSize, 'fontSize');
  }

  let processedOptionButtonTextSize = optionButtonTextSize;
  if (optionButtonTextSize && optionButtonTextSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedOptionButtonTextSize = window.GridCellFontUtils.processGcProperty(optionButtonTextSize, 'fontSize');
  }

  // Process header row properties
  let processedHeaderFontSize = headerFontSize;
  if (headerFontSize && headerFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderFontSize = window.GridCellFontUtils.processGcProperty(headerFontSize, 'fontSize');
  }

  let processedHeaderBorder = headerBorder;
  if (headerBorder && headerBorder.includes('gc')) {
    const borderParts = headerBorder.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedHeaderBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  let processedHeaderBorderRadius = headerBorderRadius;
  if (headerBorderRadius && headerBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderBorderRadius = window.GridCellFontUtils.processGcProperty(headerBorderRadius, 'borderRadius');
  }

  let processedHeaderPadding = headerPadding;
  if (headerPadding && headerPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderPadding = window.GridCellFontUtils.processGcProperty(headerPadding, 'padding');
  }

  let processedHeaderUnderlineThickness = headerUnderlineThickness;
  if (headerUnderlineThickness && headerUnderlineThickness.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderUnderlineThickness = window.GridCellFontUtils.processGcProperty(headerUnderlineThickness, 'borderWidth');
  }

  let processedQuestionTextFontSize = questionTextFontSize;
  if (questionTextFontSize && questionTextFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedQuestionTextFontSize = window.GridCellFontUtils.processGcProperty(questionTextFontSize, 'fontSize');
  }

  // Convert backgroundColor to rgba with opacity
  const getBackgroundColorWithOpacity = (color, opacity) => {
    // If already rgba or transparent, return as-is
    if (color.startsWith('rgba') || color === 'transparent') {
      return color;
    }

    // If rgb format, convert to rgba
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
    }

    // Convert hex to rgba
    let hex = color.replace('#', '');

    // Handle shorthand hex (e.g., #fff)
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const finalBackgroundColor = getBackgroundColorWithOpacity(backgroundColor, backgroundColorOpacity);

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: finalBackgroundColor,
    ...(processedBorder ? { border: processedBorder } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedPadding ? { padding: processedPadding } : {}),
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  };

  // Row 0: Header Row (configurable height)
  const headerRowStyle = {
    flex: `0 0 ${headerRowHeight}%`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: processedHeaderFontSize,
    color: headerTextColor,
    backgroundColor: headerBackgroundColor,
    border: processedHeaderBorder,
    borderRadius: processedHeaderBorderRadius,
    padding: processedHeaderPadding,
    fontWeight: 'bold',
    boxSizing: 'border-box',
    minHeight: 0,
    position: 'relative'
  };

  // Row 1: Question Row (configurable height)
  // Use questionTextColorProp if provided, otherwise use questionTextColor
  const finalQuestionTextColor = questionTextColorProp !== null ? questionTextColorProp : questionTextColor;

  const questionRowStyle = {
    flex: `0 0 ${showQuestionText ? questionRowHeight : 0}%`,
    display: showQuestionText ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: questionTextAlign === 'left' ? 'flex-start' : (questionTextAlign === 'right' ? 'flex-end' : 'center'),
    fontSize: processedQuestionTextFontSize,
    color: finalQuestionTextColor,
    fontWeight: 'bold',
    textAlign: questionTextAlign, // Add text alignment
    boxSizing: 'border-box',
    minHeight: 0
  };

  // Get options configuration from constants
  const optionsConfig = (window.QUIZ_OPTIONS_CONFIG && window.QUIZ_OPTIONS_CONFIG[quizSubtype]) || null;

  // Get CSS color variables
  const getColorVariable = (varName) => {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      const root = document.documentElement;
      return window.getComputedStyle(root).getPropertyValue(varName).trim();
    }
    return null;
  };

  // Function to update concept summary panel with quiz data
  const updateConceptSummaryPanel = React.useCallback(() => {
    console.log('🔍 [DEBUG] updateConceptSummaryPanel called');
    console.log('🔍 [DEBUG] quizId:', quizId);
    console.log('🔍 [DEBUG] keyConcepts:', keyConcepts);
    console.log('🔍 [DEBUG] impFormulae:', impFormulae);
    console.log('🔍 [DEBUG] keyConcepts type:', typeof keyConcepts, 'isArray:', Array.isArray(keyConcepts));
    console.log('🔍 [DEBUG] impFormulae type:', typeof impFormulae, 'isArray:', Array.isArray(impFormulae));

    // Extract page number from quizId (e.g., "page5-quiz" -> "5")
    const pageMatch = quizId.match(/page(\d+)-/);
    if (!pageMatch) {
      console.log('❌ [DEBUG] Could not extract page number from quizId:', quizId);
      return;
    }

    const pageNumber = pageMatch[1];
    const conceptSummaryId = `page${pageNumber}-concept-summary-panel`;

    console.log('🔍 [DEBUG] Extracted page number:', pageNumber);
    console.log('🔍 [DEBUG] Looking for concept summary panel with ID:', conceptSummaryId);
    console.log('🔍 [DEBUG] Current page (from window):', typeof window !== 'undefined' ? window.currentPage : 'undefined');
    console.log('🔍 [DEBUG] Current page (from URL):', window.location ? window.location.href : 'no location');

    // Add a small delay to ensure DOM element is available
    setTimeout(() => {
      // Find the concept summary panel element by ID first
      let conceptSummaryElement = document.getElementById(conceptSummaryId);

      // If not found by ID, try to find by class name (React auto-generated IDs)
      if (!conceptSummaryElement) {
        console.log('❌ [DEBUG] Concept summary panel not found with ID:', conceptSummaryId);
        console.log('🔍 [DEBUG] Trying to find by class name...');

        // Look for element with concept-summary-panel class
        const conceptElements = document.querySelectorAll('.concept-summary-panel');
        console.log('🔍 [DEBUG] Elements with concept-summary-panel class:', conceptElements.length);

        if (conceptElements.length > 0) {
          conceptSummaryElement = conceptElements[0]; // Take the first one
          console.log('✅ [DEBUG] Found concept summary element by class:', conceptSummaryElement);
          console.log('🔍 [DEBUG] Element ID:', conceptSummaryElement.id);
          console.log('🔍 [DEBUG] Element classes:', conceptSummaryElement.className);
        } else {
          console.log('❌ [DEBUG] No elements with concept-summary-panel class found');
          console.log('🔍 [DEBUG] Available elements with "concept" in ID:');
          const allElements = document.querySelectorAll('[id*="concept"]');
          allElements.forEach(el => console.log('  -', el.id));
          console.log('🔍 [DEBUG] All elements with "page5" in ID:');
          const page5Elements = document.querySelectorAll('[id*="page5"]');
          page5Elements.forEach(el => console.log('  -', el.id));
          console.log('🔍 [DEBUG] All elements in the document:');
          const allDocElements = document.querySelectorAll('[id]');
          console.log('🔍 [DEBUG] Total elements with IDs:', allDocElements.length);
          allDocElements.forEach(el => {
            console.log('  -', el.id, '|', el.tagName, '|', el.className);
          });

          // Check if we're actually on the right page by looking at visible elements
          console.log('🔍 [DEBUG] Checking page context...');
          const quizElements = document.querySelectorAll('[id*="quiz"]');
          console.log('🔍 [DEBUG] Quiz elements found:', quizElements.length);
          quizElements.forEach(el => console.log('  - Quiz element:', el.id));

          const pageElements = document.querySelectorAll('[id*="page"]');
          console.log('🔍 [DEBUG] Page elements found:', pageElements.length);
          pageElements.forEach(el => console.log('  - Page element:', el.id));
          return;
        }
      }

      console.log('✅ [DEBUG] Found concept summary element:', conceptSummaryElement);
      console.log('🔍 [DEBUG] Element classes:', conceptSummaryElement.className);
      console.log('🔍 [DEBUG] Element innerHTML length:', conceptSummaryElement.innerHTML.length);

      // Get the ConceptSummaryComponent instance
      const conceptSummaryComponent = conceptSummaryElement._reactInternalFiber ||
        conceptSummaryElement._reactInternalInstance;

      console.log('🔍 [DEBUG] React component instance:', conceptSummaryComponent);

      if (conceptSummaryComponent) {
        console.log('🔍 [DEBUG] Current component props:', conceptSummaryComponent.props);

        // Update the component's props
        const newProps = {
          ...conceptSummaryComponent.props,
          factsArray: keyConcepts.map(concept => ({ text: concept, color: '#FFD700' })),
          valueArray: impFormulae.map(formula => ({ text: formula, color: '#70ACC7' }))
        };

        console.log('🔍 [DEBUG] New props to apply:', newProps);
        console.log('🔍 [DEBUG] Mapped keyConcepts:', keyConcepts.map(concept => ({ text: concept, color: '#FFD700' })));
        console.log('🔍 [DEBUG] Mapped impFormulae:', impFormulae.map(formula => ({ text: formula, color: '#70ACC7' })));

        // Force re-render by updating the component
        if (conceptSummaryComponent.forceUpdate) {
          console.log('🔍 [DEBUG] Calling forceUpdate on component');
          conceptSummaryComponent.forceUpdate();
        } else {
          console.log('❌ [DEBUG] forceUpdate method not available');
        }
      } else {
        console.log('❌ [DEBUG] No React component instance found');
      }

      // Alternative approach: Dispatch a custom event to update the concept summary
      const updateEvent = new CustomEvent('updateConceptSummary', {
        detail: {
          pageNumber: pageNumber,
          keyConcepts: keyConcepts,
          impFormulae: impFormulae
        }
      });

      console.log('🔍 [DEBUG] Dispatching updateConceptSummary event with detail:', updateEvent.detail);
      window.dispatchEvent(updateEvent);
      console.log('✅ [DEBUG] Dispatched updateConceptSummary event');
    }, 100); // 100ms delay to ensure DOM is ready

  }, [quizId, keyConcepts, impFormulae]);

  // Handler for option button click
  const handleOptionClick = React.useCallback((optionIndex, optionData) => {
    // Prevent clicking if this option was already clicked
    if (clickedOptions.has(optionIndex)) {
      console.log('Option already clicked, ignoring');
      return;
    }

    // Prevent clicking if all correct answers have been found
    if (allCorrectAnswersFound) {
      console.log('All correct answers found, ignoring click');
      return;
    }

    console.log(`Option ${optionIndex + 1} clicked`);
    console.log('Option data:', optionData);
    console.log('Total correct answers:', totalCorrectAnswers);
    console.log('Correct answers clicked before this:', correctAnswersClicked);

    // Add this option to clicked set
    const newClickedOptions = new Set(clickedOptions);
    newClickedOptions.add(optionIndex);
    setClickedOptions(newClickedOptions);

    // Check if option has imageStackLayerReplacement defined
    if (optionData.imageStackLayerReplacement) {
      const replacement = optionData.imageStackLayerReplacement;
      setDynamicImageStackLayerReplacements(prev => {
        // Check if replacement for this layer already exists
        const existingIndex = prev.findIndex(r => r.layerId === replacement.layerId);
        if (existingIndex >= 0) {
          // Update existing replacement
          const updated = [...prev];
          updated[existingIndex] = replacement;
          return updated;
        } else {
          // Add new replacement
          return [...prev, replacement];
        }
      });
    }

    // Play sound effect based on answer correctness
    if (typeof window !== 'undefined' && window.playAnswerSound) {
      window.playAnswerSound(optionData.iscorrect);
    }

    // Update feedback based on whether answer is correct
    if (optionData.iscorrect) {
      setCurrentFeedbackState('correct');
      setCurrentFeedbackText(optionData.feedback || 'Correct!');

      // Dispatch event to update calculation steps for page 9
      if (quizId === 'page9-quiz') {
        const updateStepEvent = new CustomEvent('updateCalculationStep', {
          detail: {
            stepIndex: 0,
            newText: '<span style="display: inline-block; vertical-align: middle;">Ratio of the distance traveled<br>by adult Komodo to baby Komodo</span> <span style="display: inline-block; vertical-align: middle; margin-left: 10px;">= $\\frac{11200}{2000}$= $\\frac{112}{20}$</span>'
          }
        });
        window.dispatchEvent(updateStepEvent);
        console.log('🔍 [QuizPanel] Dispatched updateCalculationStep event for page 9');
      }

      // Update information analysis panel if option has facts, values, or toFindArray data
      if (optionData.facts || optionData.values || optionData.toFindArray) {
        const updateDetail = {};

        if (optionData.facts && optionData.facts.length > 0) {
          updateDetail.factsArray = optionData.facts;
          console.log('🔍 [QuizPanel] Updating InformationAnalysisComponent with factsArray:', optionData.facts);
        }

        if (optionData.values && optionData.values.length > 0) {
          updateDetail.valueArray = optionData.values;
          console.log('🔍 [QuizPanel] Updating InformationAnalysisComponent with valueArray:', optionData.values);
        }

        if (optionData.toFindArray && optionData.toFindArray.length > 0) {
          updateDetail.toFindArray = optionData.toFindArray;
          console.log('🔍 [QuizPanel] Updating InformationAnalysisComponent with toFindArray:', optionData.toFindArray);
        }

        if (Object.keys(updateDetail).length > 0) {
          const updateInfoAnalysisEvent = new CustomEvent('updateInformationAnalysis', {
            detail: updateDetail
          });
          window.dispatchEvent(updateInfoAnalysisEvent);
        }
      }

      // Check if this was the last correct answer
      const newCorrectCount = correctAnswersClicked + 1;
      console.log('New correct count:', newCorrectCount);

      if (newCorrectCount === totalCorrectAnswers) {
        console.log('🎉 [DEBUG] All correct answers found!');
        console.log('🔍 [DEBUG] newCorrectCount:', newCorrectCount);
        console.log('🔍 [DEBUG] totalCorrectAnswers:', totalCorrectAnswers);
        console.log('🔍 [DEBUG] About to call updateConceptSummaryPanel');
        // Update concept summary panel with quiz data
        updateConceptSummaryPanel();
        console.log('🔍 [DEBUG] updateConceptSummaryPanel call completed');

        // Dispatch event to enable next button
        const enableNextEvent = new CustomEvent('quizCompleted', {
          detail: {
            quizId: quizId,
            pageNumber: window.getCurrentPage?.() || null
          }
        });
        window.dispatchEvent(enableNextEvent);
        console.log('🔍 [DEBUG] Dispatched quizCompleted event for quizId:', quizId);
      }
    } else {
      setCurrentFeedbackState('incorrect');
      setCurrentFeedbackText(optionData.feedback || 'Incorrect. Try again!');
    }
  }, [clickedOptions, allCorrectAnswersFound, totalCorrectAnswers, correctAnswersClicked]);

  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;

    // Process gc units for padding
    const processGcPadding = (gcValue) => {
      if (window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        return window.GridCellFontUtils.processGcProperty(gcValue, 'padding');
      }
      return gcValue; // Fallback if GridCellFontUtils not available
    };

    const processedPadding = processGcPadding('10gc');

    // First, handle fractions within $...$ blocks (may contain multiple fractions)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      let convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: ${processedPadding};">${numerator}</span>
          <span style="display: block; padding: ${processedPadding};">${denominator}</span>
        </span>`;
      });

      // Replace LaTeX commands with their symbols
      convertedContent = convertedContent.replace(/\\times/g, '×');
      convertedContent = convertedContent.replace(/\\cdot/g, '·');

      return convertedContent; // Return without the $ delimiters
    });

    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: ${processedPadding};">${numerator}</span>
        <span style="display: block; padding: ${processedPadding};">${denominator}</span>
      </span>`;
    });

    return result;
  };

  // Function to create option button with 3-layered structure (matching next button style)
  const createOptionButton = (optionIndex, optionData, buttonHeight, buttonWidth) => {
    console.log(`🔍 createOptionButton - optionIndex: ${optionIndex}, optionData:`, optionData);

    // For row layouts (QT4R, QTI4R), each button takes full width and divided height
    // For column layouts (QT2, QT4, QTI2, QTI4), buttons are divided by number of options
    const isRowLayout = optionsConfig?.layoutType === 'rows';
    const containerWidth = isRowLayout ? '100%' : `${100 / (optionsConfig?.numberOfOptions || 1)}%`;
    const containerHeight = isRowLayout ? `${100 / (optionsConfig?.numberOfOptions || 1)}%` : '100%';

    const buttonContainerStyle = {
      width: containerWidth,
      height: containerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box'
    };

    // Determine button background color based on whether it was clicked
    const goldColor = getColorVariable('--color-gold');
    let buttonBackgroundColor = goldColor || '#FFD700'; // Default: use --color-gold, fallback to standard gold
    let buttonCursor = 'pointer';
    let buttonOpacity = 1;
    const isThisButtonClicked = clickedOptions.has(optionIndex);

    // Check if we should show initial colors (orange for incorrect, green for correct)
    // This is used when options should be color-coded from the start
    const showInitialColors = props.showInitialButtonColors === true;

    if (isThisButtonClicked) {
      // This button was clicked - show color based on correctness
      if (optionData.iscorrect) {
        // Correct answer - use green
        const greenColor = getColorVariable('--color-green');
        buttonBackgroundColor = greenColor || '#4CAF50'; // Fallback to standard green
      } else {
        // Incorrect answer - use salmon/orange
        const salmonColor = getColorVariable('--color-salmon');
        buttonBackgroundColor = salmonColor || '#FA8072'; // Fallback to standard salmon
      }
      buttonCursor = 'not-allowed';
      buttonOpacity = 1; // Keep full opacity for clicked buttons
    } else if (showInitialColors) {
      // Show initial colors based on correctness (before clicking)
      if (optionData.iscorrect) {
        // Correct answer - use green
        const greenColor = getColorVariable('--color-green');
        buttonBackgroundColor = greenColor || '#4CAF50'; // Fallback to standard green
      } else {
        // Incorrect answer - use orange
        const orangeColor = getColorVariable('--color-orange');
        buttonBackgroundColor = orangeColor || '#FFA500'; // Fallback to standard orange
      }
    } else if (allCorrectAnswersFound) {
      // All correct answers found - disable remaining unclicked buttons
      buttonCursor = 'not-allowed';
      buttonOpacity = 0.5;
    }

    // Layer 1: Button container (outer) - This has the background color
    const buttonWrapperStyle = {
      width: `${buttonWidth}%`,
      height: `${buttonHeight}%`,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonBackgroundColor,
      borderRadius: '50gc', // Match next button borderRadius
      cursor: buttonCursor,
      opacity: buttonOpacity,
      boxSizing: 'border-box'
      // Note: transition is handled by CSS, not inline styles
    };

    // Convert borderRadius from gc to px if needed
    let processedBorderRadius = buttonWrapperStyle.borderRadius;
    if (typeof window.GridCellFontUtils !== 'undefined' && window.GridCellFontUtils.convertGcToPx) {
      processedBorderRadius = window.GridCellFontUtils.convertGcToPx(buttonWrapperStyle.borderRadius);
    }
    buttonWrapperStyle.borderRadius = processedBorderRadius;

    // Layer 2: Frame layer (middle) - Gradient overlay for 3D effect
    const frameGapPx = '5px'; // Same as next button
    const buttonFrameStyle = {
      position: 'absolute',
      top: frameGapPx,
      left: frameGapPx,
      right: frameGapPx,
      bottom: frameGapPx,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      zIndex: 1,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%)',
      boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.3), inset 0 -1px 3px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    // Layer 3: Content layer (inner) - Text content
    const buttonContentStyle = {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: optionButtonTextColor,
      fontSize: processedContentFontSize,
      fontWeight: 'bold',
      textAlign: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      padding: '8%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    };

    // Determine button content
    const buttonContent = [];
    const hasImage = optionData?.image && optionData.image !== '';
    const hasText = optionData?.text && optionData.text !== '';
    const hasTable = optionData?.table && optionData.table !== '';

    console.log(`🔍 createOptionButton ${optionIndex} - optionData.image:`, optionData?.image);
    console.log(`🔍 createOptionButton ${optionIndex} - optionData.text:`, optionData?.text);
    console.log(`🔍 createOptionButton ${optionIndex} - optionData.table:`, optionData?.table);
    console.log(`🔍 createOptionButton ${optionIndex} - hasImage:`, hasImage, 'hasText:', hasText, 'hasTable:', hasTable);

    // Add option table if provided (as 3x2 grid layout)
    if (hasTable) {
      console.log(`🔍 createOptionButton ${optionIndex} - Adding table grid`);
      const tableData = optionData.tableData || {};

      // Create 3x2 grid layout
      const gridCells = [];
      for (let row = 1; row <= 3; row++) {
        for (let col = 1; col <= 2; col++) {
          const cellKey = `row${row}col${col}`;
          const cellValue = tableData[cellKey] || '';
          const isHeader = row === 1;

          gridCells.push(
            React.createElement('div', {
              key: cellKey,
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #fff',
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: isHeader ? '20gc' : '18gc',
                fontWeight: isHeader ? 'bold' : 'normal',
                textAlign: 'center',
                padding: '4px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                wordBreak: 'break-word'
              }
            }, cellValue)
          );
        }
      }

      buttonContent.push(
        React.createElement('div', {
          key: 'option-table-grid',
          style: {
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '0',
            marginBottom: hasText ? '5px' : '0',
            flexShrink: 0,
            overflow: 'hidden'
          }
        }, gridCells)
      );
    }

    // Add option image if provided
    if (hasImage) {
      console.log(`🔍 createOptionButton ${optionIndex} - Adding image`);
      buttonContent.push(
        React.createElement('img', {
          key: 'option-image',
          src: optionData.image,
          alt: optionData.text || `Option ${optionIndex + 1}`,
          style: {
            maxWidth: '85%',
            maxHeight: (hasText || hasTable) ? '60%' : '75%', // More space if image-only, less if both
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            marginBottom: (hasText || hasTable) ? '5px' : '0',
            display: 'block',
            flexShrink: 0
          }
        })
      );
    }

    // Add option text if provided
    if (hasText) {
      console.log(`🔍 createOptionButton ${optionIndex} - Adding text:`, optionData.text);
      // Convert LaTeX fractions to HTML
      const convertedText = convertLatexFractions(optionData.text);
      // Check if text contains HTML (fractions or other HTML tags)
      const containsHTML = convertedText !== optionData.text || /<[^>]+>/.test(convertedText);

      buttonContent.push(
        React.createElement('span', {
          key: 'option-text',
          style: {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            lineHeight: '1.3',
            flexShrink: 0,
            wordBreak: 'break-word',
            overflow: 'hidden',
            fontSize: processedOptionButtonTextSize,
            fontWeight: 'normal'
          },
          ...(containsHTML ? { dangerouslySetInnerHTML: { __html: convertedText } } : {})
        }, containsHTML ? null : convertedText)
      );
    }

    // If neither image, text, nor table, show fallback
    if (!hasImage && !hasText && !hasTable) {
      console.log(`🔍 createOptionButton ${optionIndex} - Using fallback text`);
      buttonContent.push(
        React.createElement('span', {
          key: 'option-text',
          style: {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            lineHeight: '1.3',
            fontSize: processedOptionButtonTextSize,
            fontWeight: 'normal'
          }
        }, `Option ${optionIndex + 1}`)
      );
    }

    console.log(`🔍 createOptionButton ${optionIndex} - buttonContent length:`, buttonContent.length);

    return React.createElement('div', {
      key: `option-${optionIndex}`,
      style: buttonContainerStyle
    },
      React.createElement('div', {
        key: 'wrapper',
        className: 'applet-button-container option-button-container',
        style: buttonWrapperStyle,
        'data-option-index': optionIndex,
        'data-is-correct': optionData?.iscorrect || false,
        'data-selected': isThisButtonClicked,
        'data-all-correct-found': allCorrectAnswersFound,
        onClick: () => handleOptionClick(optionIndex, optionData)
      }, [
        // Frame layer
        React.createElement('div', {
          key: 'frame',
          className: 'applet-button-frame option-button-frame',
          style: buttonFrameStyle
        }),
        // Content layer
        React.createElement('div', {
          key: 'content',
          className: 'applet-button-content option-button-content',
          style: buttonContentStyle
        }, buttonContent)
      ])
    );
  };

  // Function to render options row content based on subtype
  const renderOptionsContent = () => {
    console.log('🔍 renderOptionsContent - options array:', optionsArray);
    console.log('🔍 renderOptionsContent - options.length:', optionsArray.length);

    if (!optionsConfig) {
      // Default content if no config
      return props.content || '';
    }

    const { numberOfOptions, hasImage, imageColumnWidth, optionsColumnWidth, buttonHeightPercent: configButtonHeightPercent, buttonWidthPercent: configButtonWidthPercent, layoutType } = optionsConfig;
    // Use prop overrides if provided, otherwise use config values
    const buttonWidthPercent = optionButtonWidth !== null ? optionButtonWidth : configButtonWidthPercent;
    const buttonHeightPercent = optionButtonHeight !== null ? optionButtonHeight : configButtonHeightPercent;
    console.log('🔍 renderOptionsContent - numberOfOptions from config:', numberOfOptions);
    console.log('🔍 renderOptionsContent - layoutType:', layoutType);
    console.log('🔍 renderOptionsContent - buttonWidthPercent:', buttonWidthPercent, '(from prop:', optionButtonWidth, 'config:', configButtonWidthPercent, ')');
    console.log('🔍 renderOptionsContent - buttonHeightPercent:', buttonHeightPercent, '(from prop:', optionButtonHeight, 'config:', configButtonHeightPercent, ')');

    // Check if this is an image stack variant
    const hasImageStack = optionsConfig.hasImageStack || false;

    if (hasImage || hasImageStack) {
      // Layout with image/image-stack column and options column (QTI2/QTI4/QTIS2/QTIS4)

      // Render image column content
      const imageColumnContent = [];

      if (hasImageStack && imageStack && imageStack.length > 0) {
        // Use ImageStackComponent for QTIS variants
        const ImageStackComponent = window.ImageStackComponent?.ImageStackComponent;

        if (ImageStackComponent) {
          // Apply layer replacements if provided (use dynamic state if available, otherwise use prop)
          let processedImageStack = [...imageStack];
          const replacementsToUse = dynamicImageStackLayerReplacements.length > 0
            ? dynamicImageStackLayerReplacements
            : (imageStackLayerReplacements || []);
          if (replacementsToUse && replacementsToUse.length > 0) {
            replacementsToUse.forEach(replacement => {
              const { layerId, src } = replacement;
              if (processedImageStack[layerId]) {
                processedImageStack[layerId] = {
                  ...processedImageStack[layerId],
                  src: src
                };
              }
            });
          }

          // Calculate coordinates for image stack (fill the image column area)
          const stackCoordinates = imageStackCoordinates || [0, 0, 100, 100];

          // Create a key that changes when replacements change to force re-render
          const imageStackKey = `question-image-stack-${JSON.stringify(replacementsToUse)}`;

          imageColumnContent.push(
            React.createElement(ImageStackComponent, {
              key: imageStackKey,
              id: `${quizId}-image-stack`,
              elementName: `${quizId}-image-stack`,
              currentPage: 1,
              coordinates: stackCoordinates,
              zIndex: elementZIndex + 1,
              images: processedImageStack
            })
          );
        } else {
          console.warn('⚠️ ImageStackComponent not available. Cannot render QTIS variant.');
          imageColumnContent.push('Image Stack not available');
        }
      } else if (hasImage && image) {
        // Use standard image for QTI variants
        imageColumnContent.push(
          React.createElement('img', {
            key: 'question-image',
            src: image,
            alt: imageText || '',
            style: {
              maxWidth: '90%',
              maxHeight: imageText ? '80%' : '90%',
              objectFit: 'contain',
              display: 'block'
            }
          })
        );
      }

      if (imageText && !hasImageStack) {
        imageColumnContent.push(
          React.createElement('div', {
            key: 'image-text',
            style: {
              marginTop: '10px',
              fontSize: '0.9em',
              textAlign: 'center',
              color: contentColor
            }
          }, imageText)
        );
      }

      // If no image or imageText provided, show empty content
      if (imageColumnContent.length === 0) {
        imageColumnContent.push('');
      }

      return [
        // Image column
        React.createElement('div', {
          key: 'image-column',
          className: 'quiz-image-column',
          style: {
            width: `${imageColumnWidth}%`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            padding: '10px'
          }
        }, imageColumnContent),

        // Options column
        React.createElement('div', {
          key: 'options-column',
          className: 'quiz-options-column',
          style: {
            width: `${optionsColumnWidth}%`,
            height: '100%',
            display: 'flex',
            flexDirection: layoutType === 'rows' ? 'column' : 'row',
            boxSizing: 'border-box'
          }
        }, Array.from({ length: numberOfOptions }, (_, i) => {
          const optionData = optionsArray[i] || {};
          return createOptionButton(i, optionData, buttonHeightPercent, buttonWidthPercent);
        }))
      ];
    } else {
      // Layout with only options columns (QT2/QT4/QT4R)
      if (layoutType === 'rows') {
        // Row-based layout for QT4R
        return React.createElement('div', {
          key: 'options-container',
          className: 'quiz-options-container',
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
          }
        }, Array.from({ length: numberOfOptions }, (_, i) => {
          const optionData = optionsArray[i] || {};
          return createOptionButton(i, optionData, buttonHeightPercent, buttonWidthPercent);
        }));
      } else {
        // Column-based layout for QT2/QT4
        return Array.from({ length: numberOfOptions }, (_, i) => {
          const optionData = optionsArray[i] || {};
          return createOptionButton(i, optionData, buttonHeightPercent, buttonWidthPercent);
        });
      }
    }
  };

  // Row 2: Options Row (configurable height)
  const optionsRowStyle = {
    flex: `0 0 ${optionsRowHeight}%`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: processedContentFontSize,
    color: contentColor,
    boxSizing: 'border-box',
    minHeight: 0
  };

  // Row 3: Feedback Row (configurable height)
  // Get feedback styles based on state
  const getFeedbackStyles = (state) => {
    const baseStyle = {
      flex: `0 0 ${feedbackRowHeight}%`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: processedContentFontSize,
      boxSizing: 'border-box',
      minHeight: 0,
      padding: '2.5%',
      position: 'relative'
    };

    switch (state) {
      case 'normal':
        return {
          ...baseStyle,
          color: '#ffffff',
          backgroundColor: 'transparent',
          border: '3px dashed #ffffff'
        };
      case 'correct':
        return {
          ...baseStyle,
          color: '#00FF7F', // Vibrant green text color
          backgroundColor: 'transparent', // Transparent background
          border: 'none' // No outer border
        };
      case 'incorrect':
        return {
          ...baseStyle,
          color: '#FF6B6B', // Vibrant salmon text color
          backgroundColor: 'transparent', // Transparent background
          border: 'none' // No outer border
        };
      case 'default':
      default:
        return {
          ...baseStyle,
          color: 'transparent',
          backgroundColor: 'transparent',
          border: 'none'
        };
    }
  };

  const feedbackRowStyle = getFeedbackStyles(currentFeedbackState);

  return React.createElement('div', {
    id: elementId,
    className: 'quiz-panel',
    style: finalStyles,
    'data-element-type': 'quiz-panel',
    'data-quiz-type': quizType,
    'data-quiz-subtype': quizSubtype,
    'data-grid-position': position?.gridPosition,
    'data-key-concepts': JSON.stringify(keyConcepts),
    'data-options': JSON.stringify(optionsArray),
    'data-image': image,
    'data-image-text': imageText
  }, [
    // Row 0: Header Row
    headerText ? React.createElement('div', {
      key: 'header-row',
      className: 'quiz-header-row',
      style: headerRowStyle
    }, [
      headerText,
      React.createElement('div', {
        key: 'header-underline',
        style: {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: processedHeaderUnderlineThickness,
          backgroundColor: headerUnderlineColor,
          marginTop: '8px'
        }
      })
    ]) : null,

    // Row 1: Question Row (only render if showQuestionText is true)
    showQuestionText ? React.createElement('div', {
      key: 'question-row',
      className: 'quiz-question-row',
      style: questionRowStyle
    }, questionText && questionText.includes('<br>') ?
      React.createElement('span', {
        dangerouslySetInnerHTML: { __html: questionText }
      }) :
      (questionText || '')) : null,

    // Row 2: Options Row
    React.createElement('div', {
      key: 'options-row',
      className: 'quiz-options-row',
      style: optionsRowStyle
    }, renderOptionsContent()),

    // Row 3: Feedback Row
    React.createElement('div', {
      key: 'feedback-row',
      className: 'quiz-feedback-row',
      style: feedbackRowStyle,
      'data-feedback-state': currentFeedbackState
    }, [
      // Add inset border for correct and incorrect states
      (currentFeedbackState === 'correct' || currentFeedbackState === 'incorrect') ? React.createElement('div', {
        key: 'inset-border',
        style: {
          position: 'absolute',
          top: '2.5%',
          left: '2.5%',
          right: '2.5%',
          bottom: '2.5%',
          border: currentFeedbackState === 'correct' ? '2px dashed #00AA55' : '2px dashed #CC4444',
          borderRadius: '4px',
          pointerEvents: 'none'
        }
      }) : null,
      // Feedback text (tick and cross icons removed)
      React.createElement('span', {
        key: 'feedback-text',
        style: {
          margin: '10px 15px',
          display: 'block',
          textAlign: 'center'
        }
      }, currentFeedbackText || '')
    ])
  ]);
});

/**
 * Calculations Detail Component - Exact replica of InformationAnalysisComponent with updated headers
 */
const CalculationsDetailComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    componentHeader = '26gc',
    sectionHeader = '24gc',
    bodyTextSize = '22gc',
    bulletSize = '8gc',
    factsArray = [
      { text: "Formula Used 1" },
      { text: "Formula Used 2" }
    ],
    valueArray = [
      { text: "Given Value 1" }
    ],
    toFindArray = [
      { text: "Calculation Step 1" },
      { text: "Calculation Step 2" }
    ],
    backgroundColor = '#0A0A1A',
    backgroundColorOpacity = 0.5,
    cardBackgroundColor = '#1A1A2E',
    cardBackgroundOpacity = 0.5,
    border,
    borderRadius = '15gc',
    sectionLeftBorderRadius = '10gc',
    padding = '20gc',
    cardPadding = '10gc 20gc',
    cardSpacing = '16gc',
    textColor = '#E0E0E0',
    factsColor = '#FFD700',
    valueColor = '#00FF7F',
    toFindColor = '#8A2BE2',
    accentBarWidth = '4gc',
    sectionMarginBottom = '8gc',
    sectionMarginLeft = '12gc',
    listMarginLeft = '12gc',
    listItemMarginBottom = '4gc',
    bulletMarginRight = '8gc'
  } = props;

  // State for dynamic updates
  const [dynamicFactsArray, setDynamicFactsArray] = React.useState(factsArray);
  const [dynamicValueArray, setDynamicValueArray] = React.useState(valueArray);
  const [dynamicToFindArray, setDynamicToFindArray] = React.useState(toFindArray);

  // Listen for updateCalculationDetails events
  React.useEffect(() => {
    const handleUpdateCalculationDetails = (event) => {
      console.log('🔍 [CalculationsDetail] Received updateCalculationDetails event:', event.detail);
      const { pageNumber, factsArray: newFactsArray, valueArray: newValueArray, toFindArray: newToFindArray } = event.detail;

      // Append new data to existing arrays instead of replacing
      if (newFactsArray && newFactsArray.length > 0) {
        const newFacts = Array.isArray(newFactsArray) && typeof newFactsArray[0] === 'object'
          ? newFactsArray
          : newFactsArray.map(fact => ({ text: fact, color: '#FFD700' }));
        console.log('🔍 [CalculationsDetail] Appending to factsArray:', newFacts);
        setDynamicFactsArray(prevArray => {
          const existingTexts = prevArray.map(item => item.text);
          const uniqueNewFacts = newFacts.filter(fact => !existingTexts.includes(fact.text));
          const updatedArray = [...prevArray, ...uniqueNewFacts];
          console.log('🔍 [CalculationsDetail] Updated factsArray:', updatedArray);
          return updatedArray;
        });
      }

      if (newValueArray && newValueArray.length > 0) {
        const newValues = Array.isArray(newValueArray) && typeof newValueArray[0] === 'object'
          ? newValueArray
          : newValueArray.map(value => ({ text: value, color: '#00FF7F' }));
        console.log('🔍 [CalculationsDetail] Appending to valueArray:', newValues);
        setDynamicValueArray(prevArray => {
          const existingTexts = prevArray.map(item => item.text);
          const uniqueNewValues = newValues.filter(value => !existingTexts.includes(value.text));
          const updatedArray = [...prevArray, ...uniqueNewValues];
          console.log('🔍 [CalculationsDetail] Updated valueArray:', updatedArray);
          return updatedArray;
        });
      }

      if (newToFindArray && newToFindArray.length > 0) {
        const newToFind = Array.isArray(newToFindArray) && typeof newToFindArray[0] === 'object'
          ? newToFindArray
          : newToFindArray.map(toFind => ({ text: toFind, color: '#8A2BE2' }));
        console.log('🔍 [CalculationsDetail] Appending to toFindArray:', newToFind);
        setDynamicToFindArray(prevArray => {
          const existingTexts = prevArray.map(item => item.text);
          const uniqueNewToFind = newToFind.filter(toFind => !existingTexts.includes(toFind.text));
          const updatedArray = [...prevArray, ...uniqueNewToFind];
          console.log('🔍 [CalculationsDetail] Updated toFindArray:', updatedArray);
          return updatedArray;
        });
      }
    };

    window.addEventListener('updateCalculationDetails', handleUpdateCalculationDetails);

    return () => {
      window.removeEventListener('updateCalculationDetails', handleUpdateCalculationDetails);
    };
  }, []);

  // Use dynamic arrays if they have been updated, otherwise use props
  const currentFactsArray = dynamicFactsArray.length > 0 ? dynamicFactsArray : factsArray;
  const currentValueArray = dynamicValueArray.length > 0 ? dynamicValueArray : valueArray;
  const currentToFindArray = dynamicToFindArray.length > 0 ? dynamicToFindArray : toFindArray;

  console.log('🔍 CalculationsDetailComponent RENDERED!');
  console.log('🔍 CalculationsDetailComponent props:', props);
  console.log('🔍 CalculationsDetailComponent position:', position);
  console.log('🔍 CalculationsDetailComponent processedStyles:', processedStyles);
  console.log('🔍 CalculationsDetailComponent currentFactsArray:', currentFactsArray);
  console.log('🔍 CalculationsDetailComponent currentValueArray:', currentValueArray);
  console.log('🔍 CalculationsDetailComponent currentToFindArray:', currentToFindArray);

  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Process border property if it contains gc units
  let processedBorder = border;
  if (border && border.includes('gc')) {
    const borderParts = border.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  // Process other gc properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedCardPadding = cardPadding;
  if (cardPadding && cardPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardPadding = window.GridCellFontUtils.processGcProperty(cardPadding, 'padding');
  }

  let processedCardSpacing = cardSpacing;
  if (cardSpacing && cardSpacing.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardSpacing = window.GridCellFontUtils.processGcProperty(cardSpacing, 'marginBottom');
  }

  let processedAccentBarWidth = accentBarWidth;
  if (accentBarWidth && accentBarWidth.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedAccentBarWidth = window.GridCellFontUtils.processGcProperty(accentBarWidth, 'width');
  }

  let processedSectionLeftBorderRadius = sectionLeftBorderRadius;
  if (sectionLeftBorderRadius && sectionLeftBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionLeftBorderRadius = window.GridCellFontUtils.processGcProperty(sectionLeftBorderRadius, 'borderRadius');
  }

  let processedSectionMarginBottom = sectionMarginBottom;
  if (sectionMarginBottom && sectionMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginBottom = window.GridCellFontUtils.processGcProperty(sectionMarginBottom, 'marginBottom');
  }

  let processedSectionMarginLeft = sectionMarginLeft;
  if (sectionMarginLeft && sectionMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionMarginLeft = window.GridCellFontUtils.processGcProperty(sectionMarginLeft, 'marginLeft');
  }

  let processedListMarginLeft = listMarginLeft;
  if (listMarginLeft && listMarginLeft.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListMarginLeft = window.GridCellFontUtils.processGcProperty(listMarginLeft, 'marginLeft');
  }

  let processedListItemMarginBottom = listItemMarginBottom;
  if (listItemMarginBottom && listItemMarginBottom.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedListItemMarginBottom = window.GridCellFontUtils.processGcProperty(listItemMarginBottom, 'marginBottom');
  }

  let processedBulletMarginRight = bulletMarginRight;
  if (bulletMarginRight && bulletMarginRight.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletMarginRight = window.GridCellFontUtils.processGcProperty(bulletMarginRight, 'marginRight');
  }

  let processedBulletSize = bulletSize;
  if (bulletSize && bulletSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBulletSize = window.GridCellFontUtils.processGcProperty(bulletSize, 'width');
  }

  let processedComponentHeader = componentHeader;
  if (componentHeader && componentHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedComponentHeader = window.GridCellFontUtils.processGcProperty(componentHeader, 'fontSize');
  }

  let processedSectionHeader = sectionHeader;
  if (sectionHeader && sectionHeader.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSectionHeader = window.GridCellFontUtils.processGcProperty(sectionHeader, 'fontSize');
  }

  let processedBodyTextSize = bodyTextSize;
  if (bodyTextSize && bodyTextSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBodyTextSize = window.GridCellFontUtils.processGcProperty(bodyTextSize, 'fontSize');
  }

  // Use the position and processedStyles passed from math-applet.js
  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: hexToRgba(backgroundColor, backgroundColorOpacity),
    ...(processedBorder ? { border: processedBorder } : {}),
    ...(processedBorderRadius ? { borderRadius: processedBorderRadius } : {}),
    ...(processedPadding ? { padding: processedPadding } : {}),
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    ...(processedComponentHeader ? { fontSize: processedComponentHeader } : {}),
    color: textColor,
    marginBottom: processedCardSpacing,
    fontWeight: '600'
  };

  const cardStyle = {
    backgroundColor: hexToRgba(cardBackgroundColor, cardBackgroundOpacity),
    borderRadius: processedBorderRadius,
    ...(processedSectionLeftBorderRadius ? {
      borderTopLeftRadius: processedSectionLeftBorderRadius,
      borderBottomLeftRadius: processedSectionLeftBorderRadius
    } : {}),
    padding: processedCardPadding,
    marginBottom: processedCardSpacing,
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative'
  };

  const accentBarStyle = (color) => ({
    width: processedAccentBarWidth,
    backgroundColor: color,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: processedSectionLeftBorderRadius ?
      `${processedSectionLeftBorderRadius} 0 0 ${processedSectionLeftBorderRadius}` :
      `${processedBorderRadius} 0 0 ${processedBorderRadius}`
  });

  const sectionHeaderStyle = (color) => ({
    ...(processedSectionHeader ? { fontSize: processedSectionHeader } : {}),
    color: color,
    fontWeight: '600',
    marginBottom: processedSectionMarginBottom || '8px',
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedSectionMarginLeft || '12px'})` : (processedSectionMarginLeft || '12px')
  });

  const listStyle = {
    marginLeft: processedAccentBarWidth ? `calc(${processedAccentBarWidth} + ${processedListMarginLeft || '12px'})` : (processedListMarginLeft || '12px'),
    padding: 0,
    listStyle: 'none'
  };

  const listItemStyle = (color) => ({
    ...(processedBodyTextSize ? { fontSize: processedBodyTextSize } : {}),
    color: textColor,
    marginBottom: processedListItemMarginBottom || '4px',
    display: 'flex',
    alignItems: 'center'
  });

  const bulletStyle = (color) => ({
    width: processedBulletSize || '6px',
    height: processedBulletSize || '6px',
    backgroundColor: color,
    borderRadius: '50%',
    marginRight: processedBulletMarginRight || '8px',
    flexShrink: 0
  });

  const renderCard = (title, items, color) => {
    if (!items || items.length === 0) return null;

    return React.createElement('div', {
      key: title,
      style: cardStyle
    }, [
      React.createElement('div', {
        key: 'accent-bar',
        style: accentBarStyle(color)
      }),
      React.createElement('div', {
        key: 'content'
      }, [
        React.createElement('h3', {
          key: 'title',
          style: sectionHeaderStyle(color)
        }, title),
        React.createElement('ul', {
          key: 'list',
          style: listStyle
        }, items.map((item, index) => {
          return React.createElement('li', {
            key: index,
            style: listItemStyle(color)
          }, [
            React.createElement('span', {
              key: 'bullet',
              style: bulletStyle(color)
            }),
            React.createElement('span', {
              key: 'text',
              style: { color: item.color || textColor }
            }, item.text)
          ]);
        }))
      ])
    ]);
  };

  // Create cards array, filtering out null values
  const cards = [
    renderCard('Key Formula Used', currentFactsArray, factsColor),
    renderCard('Given', currentValueArray, valueColor),
    renderCard('Calculation Steps', currentToFindArray, toFindColor)
  ].filter(Boolean);

  return React.createElement('div', {
    id: elementId,
    className: 'calculations-detail-panel',
    style: finalStyles,
    'data-element-type': 'calculations-detail-panel',
    'data-grid-position': position?.gridPosition
  }, [
    React.createElement('h2', {
      key: 'header',
      style: headerStyle
    }, 'CALCULATION DETAILS'),
    ...cards
  ]);
});

/**
 * Compute Box Component - Step-by-step calculation display
 */
const ComputeBoxComponent = React.memo((props) => {
  const elementId = React.useId();
  const {
    position,
    processedStyles,
    elementZIndex,
    stepNumber = 1,
    stepText = 'Apply the formula',
    instruction = 'The area of a circle is calculated using the formula: A = πr²',
    stepCards = [
    ],
    summaryText = 'We\'ve calculated the area of the circular pool to be 113.04 square meters.',
    // Header row props (new 10% header row)
    headerText = '', // Text for the header row
    headerRowFontSize = '24gc',
    headerRowTextColor = '#ffffff',
    headerRowBackgroundColor = 'transparent',
    headerRowBorder = 'none',
    headerRowBorderRadius = '0gc',
    headerRowPadding = '20gc',
    headerRowUnderlineColor = '#00A0A0',
    headerRowUnderlineThickness = '2gc',
    // Existing styling props
    headerBackgroundColor = '#008080',
    cardBackgroundColor = '#2C3E50',
    summaryBackgroundColor = '#008080',
    textColor = '#ffffff',
    instructionColor = '#E0E0E0',
    headerFontSize = '24gc',
    instructionFontSize = '20gc',
    cardFontSize = '24gc',
    summaryFontSize = '24gc',
    borderRadius = '12gc',
    padding = '20gc',
    cardSpacing = '12gc',
    headerPadding = '16gc 20gc',
    cardPadding = '12gc 16gc',
    summaryPadding = '16gc 20gc',
    backgroundColor = '#0A0A1A',
    backgroundColorOpacity = 0.5
  } = props;

  console.log('🔍 ComputeBoxComponent RENDERED!');
  console.log('🔍 ComputeBoxComponent props:', props);
  console.log('🔍 ComputeBoxComponent stepNumber:', stepNumber);
  console.log('🔍 ComputeBoxComponent stepCards:', stepCards);

  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Process gc units for font sizes
  let processedHeaderFontSize = headerFontSize;
  if (headerFontSize && headerFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderFontSize = window.GridCellFontUtils.processGcProperty(headerFontSize, 'fontSize');
  }

  let processedInstructionFontSize = instructionFontSize;
  if (instructionFontSize && instructionFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedInstructionFontSize = window.GridCellFontUtils.processGcProperty(instructionFontSize, 'fontSize');
  }

  let processedCardFontSize = cardFontSize;
  if (cardFontSize && cardFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardFontSize = window.GridCellFontUtils.processGcProperty(cardFontSize, 'fontSize');
  }

  let processedSummaryFontSize = summaryFontSize;
  if (summaryFontSize && summaryFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSummaryFontSize = window.GridCellFontUtils.processGcProperty(summaryFontSize, 'fontSize');
  }

  // Process header row properties
  let processedHeaderRowFontSize = headerRowFontSize;
  if (headerRowFontSize && headerRowFontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderRowFontSize = window.GridCellFontUtils.processGcProperty(headerRowFontSize, 'fontSize');
  }

  let processedHeaderRowBorder = headerRowBorder;
  if (headerRowBorder && headerRowBorder.includes('gc')) {
    const borderParts = headerRowBorder.split(' ');
    if (borderParts.length >= 3) {
      const width = borderParts[0];
      const style = borderParts[1];
      const color = borderParts.slice(2).join(' ');

      if (width.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
        const processedWidth = window.GridCellFontUtils.processGcProperty(width, 'borderWidth');
        processedHeaderRowBorder = `${processedWidth} ${style} ${color}`;
      }
    }
  }

  let processedHeaderRowBorderRadius = headerRowBorderRadius;
  if (headerRowBorderRadius && headerRowBorderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderRowBorderRadius = window.GridCellFontUtils.processGcProperty(headerRowBorderRadius, 'borderRadius');
  }

  let processedHeaderRowPadding = headerRowPadding;
  if (headerRowPadding && headerRowPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderRowPadding = window.GridCellFontUtils.processGcProperty(headerRowPadding, 'padding');
  }

  let processedHeaderRowUnderlineThickness = headerRowUnderlineThickness;
  if (headerRowUnderlineThickness && headerRowUnderlineThickness.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderRowUnderlineThickness = window.GridCellFontUtils.processGcProperty(headerRowUnderlineThickness, 'borderWidth');
  }

  // Process gc units for other properties
  let processedBorderRadius = borderRadius;
  if (borderRadius && borderRadius.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedBorderRadius = window.GridCellFontUtils.processGcProperty(borderRadius, 'borderRadius');
  }

  let processedPadding = padding;
  if (padding && padding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedPadding = window.GridCellFontUtils.processGcProperty(padding, 'padding');
  }

  let processedCardSpacing = cardSpacing;
  if (cardSpacing && cardSpacing.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardSpacing = window.GridCellFontUtils.processGcProperty(cardSpacing, 'marginBottom');
  }

  let processedHeaderPadding = headerPadding;
  if (headerPadding && headerPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedHeaderPadding = window.GridCellFontUtils.processGcProperty(headerPadding, 'padding');
  }

  let processedCardPadding = cardPadding;
  if (cardPadding && cardPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedCardPadding = window.GridCellFontUtils.processGcProperty(cardPadding, 'padding');
  }

  let processedSummaryPadding = summaryPadding;
  if (summaryPadding && summaryPadding.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedSummaryPadding = window.GridCellFontUtils.processGcProperty(summaryPadding, 'padding');
  }

  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex || 50,
    backgroundColor: hexToRgba(backgroundColor, backgroundColorOpacity),
    borderRadius: processedBorderRadius,
    padding: processedPadding,
    display: 'flex',
    flexDirection: 'column',
    gap: processedCardSpacing
  };

  const headerStyle = {
    backgroundColor: headerBackgroundColor,
    borderRadius: processedBorderRadius,
    padding: processedHeaderPadding,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const stepNumberStyle = {
    backgroundColor: '#00A0A0', // Slightly lighter than header
    color: textColor,
    borderRadius: '50%',
    width: `calc(${processedHeaderFontSize} + 12px)`,
    height: `calc(${processedHeaderFontSize} + 12px)`,
    minWidth: '32px',
    minHeight: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: processedHeaderFontSize,
    fontWeight: 'bold',
    flexShrink: 0
  };

  const stepTextStyle = {
    color: textColor,
    fontSize: processedHeaderFontSize,
    fontWeight: 'bold',
    flex: 1
  };

  const instructionStyle = {
    color: instructionColor,
    fontSize: processedInstructionFontSize,
    margin: 0,
    lineHeight: '1.4'
  };

  const cardStyle = {
    backgroundColor: cardBackgroundColor,
    borderRadius: processedBorderRadius,
    padding: processedCardPadding,
    color: textColor,
    fontSize: processedCardFontSize,
    lineHeight: '1.4'
  };

  const summaryStyle = {
    backgroundColor: summaryBackgroundColor,
    borderRadius: processedBorderRadius,
    padding: processedSummaryPadding,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  // Header row style (10% height)
  const headerRowStyle = {
    flex: '0 0 10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: processedHeaderRowFontSize,
    color: headerRowTextColor,
    backgroundColor: headerRowBackgroundColor,
    border: processedHeaderRowBorder,
    borderRadius: processedHeaderRowBorderRadius,
    padding: processedHeaderRowPadding,
    fontWeight: 'bold',
    boxSizing: 'border-box',
    minHeight: 0,
    position: 'relative'
  };

  const iconStyle = {
    color: textColor,
    fontSize: processedSummaryFontSize,
    fontWeight: 'bold',
    width: `calc(${processedSummaryFontSize} + 8px)`,
    height: `calc(${processedSummaryFontSize} + 8px)`,
    minWidth: '24px',
    minHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    flexShrink: 0
  };

  const summaryTextStyle = {
    color: textColor,
    fontSize: processedSummaryFontSize,
    lineHeight: '1.4',
    flex: 1
  };

  return React.createElement('div', {
    id: elementId,
    className: 'compute-box',
    style: finalStyles,
    'data-element-type': 'compute-box',
    'data-grid-position': position?.gridPosition
  }, [
    // Header Row (10% height)
    headerText ? React.createElement('div', {
      key: 'header-row',
      className: 'compute-box-header-row',
      style: headerRowStyle
    }, [
      headerText,
      React.createElement('div', {
        key: 'header-underline',
        style: {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: processedHeaderRowUnderlineThickness,
          backgroundColor: headerRowUnderlineColor,
          marginTop: '8px'
        }
      })
    ]) : null,

    // Main Content (90% height)
    React.createElement('div', {
      key: 'main-content',
      style: {
        flex: '0 0 90%',
        display: 'flex',
        flexDirection: 'column',
        gap: processedCardSpacing,
        boxSizing: 'border-box'
      }
    }, [
      // Header Section
      React.createElement('div', {
        key: 'header',
        style: headerStyle
      }, [
        React.createElement('div', {
          key: 'step-number',
          style: stepNumberStyle
        }, stepNumber),
        React.createElement('div', {
          key: 'step-text',
          style: stepTextStyle
        }, stepText)
      ]),

      // Instruction
      React.createElement('p', {
        key: 'instruction',
        style: instructionStyle
      }, instruction),

      // Step Cards
      ...stepCards.map((cardText, index) =>
        React.createElement('div', {
          key: `card-${index}`,
          style: cardStyle
        }, cardText)
      ),

      // Summary Section
      React.createElement('div', {
        key: 'summary',
        style: summaryStyle
      }, [
        React.createElement('div', {
          key: 'icon',
          style: iconStyle
        }, 'i'),
        React.createElement('div', {
          key: 'summary-text',
          style: summaryTextStyle
        }, summaryText)
      ])
    ]) // Close main-content div
  ].filter(Boolean)); // Filter out null header row if not provided
});

/**
 * Legacy Header Component (kept for backward compatibility)
 */
const HeaderComponent = React.memo((props) => {
  const elementId = React.useId();
  const processedStyles = GridCellFontUtils.processGcStyles(props);

  return React.createElement('div', {
    id: elementId,
    className: 'header-container math-app-header',
    style: processedStyles,
    'data-element-type': 'header'
  }, props.text || 'Math Learning Platform');
});

/**
 * Footer Component
 */
const FooterComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'footer-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'footer'
  });
});

/**
 * Left Sidebar Component
 */
const LeftSidebarComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'left-sidebar-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'left-sidebar'
  });
});

/**
 * Right Sidebar Component
 */
const RightSidebarComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'right-sidebar-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'right-sidebar'
  });
});

/**
 * Main Content Component
 */
const MainContentComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'main-content-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'main-content'
  });
});

/**
 * Full Content Component
 */
const FullContentComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'full-content-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'full-content'
  });
});

/**
 * Modal Center Component
 */
const ModalCenterComponent = React.memo((props) => {
  const elementId = React.useId();

  return React.createElement('div', {
    id: elementId,
    className: 'modal-center-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'modal-center'
  });
});

/**
 * Page 5 quantity column icon (milk / lollipop / …): image with pointerEvents driven by
 * **page5InteractiveInStates** (string[]). Optional **page5NavigateToState** sets global state on click.
 */
const Page5QuantityIconComponent = React.memo((props) => {
  const {
    id,
    position,
    processedStyles,
    elementZIndex = 56,
    imageSrc,
    imageAlt = '',
    page5InteractiveInStates = null,
    page5NavigateToState = null
  } = props;

  const [p5Tick, setP5Tick] = React.useState(0);
  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const bump = () => setP5Tick((t) => t + 1);
    window.addEventListener('page5InteractionStateChange', bump);
    window.addEventListener('pageChanged', bump);
    return () => {
      window.removeEventListener('page5InteractionStateChange', bump);
      window.removeEventListener('pageChanged', bump);
    };
  }, []);

  const st = typeof window !== 'undefined' ? window.page5InteractionState || 'default' : 'default';
  void p5Tick;
  const interactive =
    Array.isArray(page5InteractiveInStates) && page5InteractiveInStates.includes(st);

  const rootStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    pointerEvents: interactive ? 'auto' : 'none',
    cursor: interactive ? 'pointer' : 'default'
  };

  return React.createElement(
    'div',
    {
      id,
      style: rootStyle,
      onClick:
        interactive && page5NavigateToState
          ? () => {
              if (typeof window === 'undefined') return;
              const from = window.page5InteractionState;
              window.page5InteractionState = page5NavigateToState;
              window.dispatchEvent(
                new CustomEvent('page5InteractionStateChange', {
                  detail: { state: page5NavigateToState, from }
                })
              );
            }
          : undefined,
      'data-element-type': 'page5-quantity-icon'
    },
    React.createElement('img', {
      src: imageSrc,
      alt: imageAlt,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        pointerEvents: 'none'
      }
    })
  );
});

// Layout Elements Configuration
const LayoutElements = {
  header: {
    type: 'textbox',
    coordinates: [1, 1, 128, 4],
    zIndex: 'var(--z-header)',
    props: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('header', (props, elementId) => {
      return React.createElement(HeaderComponent, props);
    })
  },

  footer: {
    type: 'container',
    coordinates: [1, 68, 128, 72],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('footer', (props, elementId) => {
      return React.createElement(FooterComponent, props);
    })
  },

  leftSidebar: {
    type: 'container',
    coordinates: [1, 9, 32, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('sidebar', (props, elementId) => {
      return React.createElement(LeftSidebarComponent, props);
    })
  },

  rightSidebar: {
    type: 'container',
    coordinates: [97, 9, 128, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('sidebar', (props, elementId) => {
      return React.createElement(RightSidebarComponent, props);
    })
  },

  mainContent: {
    type: 'container',
    coordinates: [33, 9, 96, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(MainContentComponent, props);
    })
  },

  fullContent: {
    type: 'container',
    coordinates: [1, 9, 128, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(FullContentComponent, props);
    })
  },

  modalCenter: {
    type: 'container',
    coordinates: [36, 16, 100, 60],
    zIndex: 'var(--z-elevated)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('modal', (props, elementId) => {
      return React.createElement(ModalCenterComponent, props);
    })
  }
};

// Export components and configuration
window.LayoutComponents = {
  HeaderComponent,
  ProblemSolveHeaderComponent,
  LogoComponent,
  QuestionComponent,
  InformationAnalysisComponent,
  ConceptSummaryComponent,
  CalculationsDetailComponent,
  ComputeBoxComponent,
  TeacherNoteComponent,
  Page5QuantityIconComponent,
  SectionHeaderComponent,
  TabNavigationComponent,
  QuizPanelComponent,
  FooterComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  MainContentComponent,
  FullContentComponent,
  ModalCenterComponent,
  LayoutElements
};

console.log('✅ Layout components loaded successfully');
