/**
 * Highlighted Text Component - React 18 Optimized
 * 
 * A standalone component for displaying text with dynamic highlights.
 * Supports both font color and background color highlights.
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Highlighted Text Component
 */
const HighlightedTextComponent = React.memo((props) => {
  const elementId = React.useId();
  const { 
    id, // Use passed id prop if available
    position, 
    processedStyles, 
    elementZIndex, 
    text = '', 
    fontSize = '24gc',
    fontWeight = 'normal',
    fontColor = '#000000',
    textAlign = 'left',
    katexFontSize = null, // Optional: font size multiplier for KaTeX/LaTeX (e.g., 0.8 for 80%)
    highlights = []
  } = props;
  
  console.log('🔍 HighlightedTextComponent RENDERED!');
  console.log('🔍 HighlightedTextComponent props:', props);
  console.log('🔍 HighlightedTextComponent highlights:', highlights);
  
  // Process fontSize if it contains gc units
  let processedFontSize = fontSize;
  if (fontSize && fontSize.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }
  
  // Build base styles from position and processedStyles
  // Position object has a css property with converted CSS values (like QuestionComponent)
  const finalStyles = {
    // Apply grid positioning from the element renderer
    ...(position?.css || {}),
    // Apply processed styles (already processed by math-applet.js with gc units)
    ...(processedStyles || {}),
    // Apply z-index
    ...(elementZIndex !== undefined && { zIndex: elementZIndex }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };
  
  // Text container style
  const textStyle = {
    fontSize: processedFontSize,
    fontWeight: fontWeight,
    color: fontColor,
    lineHeight: '1.4',
    width: '100%',
    textAlign: textAlign
  };
  
  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    // Calculate KaTeX font size if specified
    let katexFontSizeStyle = '';
    if (katexFontSize !== null && katexFontSize !== undefined) {
      // katexFontSize can be a number (multiplier like 0.8) or a string (like '0.8em' or '80%')
      if (typeof katexFontSize === 'number') {
        katexFontSizeStyle = `font-size: ${katexFontSize}em;`;
      } else if (typeof katexFontSize === 'string') {
        katexFontSizeStyle = `font-size: ${katexFontSize};`;
      }
    }
    
    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      let convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling, including KaTeX font size if specified
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2; ${katexFontSizeStyle}">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      // Wrap the entire $...$ content with reduced font size if specified
      if (katexFontSizeStyle) {
        convertedContent = `<span style="${katexFontSizeStyle}">${convertedContent}</span>`;
      }
      return convertedContent; // Return without the $ delimiters
    });
    
    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2; ${katexFontSizeStyle}">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });
    
    return result;
  };
  
  // Function to parse text with highlights
  // This function searches in the original text (before LaTeX conversion) to handle KaTeX content
  const parseTextWithHighlights = (originalText, highlights) => {
    // Ensure highlights is always an array
    const safeHighlights = Array.isArray(highlights) ? highlights : [];
    
    if (!safeHighlights || safeHighlights.length === 0) {
      // Still convert LaTeX even if no highlights
      const textWithFractions = convertLatexFractions(originalText);
      return [{ type: 'normal', text: textWithFractions }];
    }
    
    // Create an array to track all highlight positions
    const highlightPositions = [];
    
    // Find all highlight positions in the ORIGINAL text (before LaTeX conversion)
    // This allows us to find KaTeX content like "$1 \\frac{1}{2}$ km"
    for (const highlight of safeHighlights) {
      const highlightText = highlight.text;
      let searchIndex = 0;
      
      while (true) {
        const index = originalText.indexOf(highlightText, searchIndex);
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
      // Add normal text before highlight (convert LaTeX in normal text)
      if (pos.start > currentIndex) {
        const normalText = originalText.substring(currentIndex, pos.start);
        const convertedNormalText = convertLatexFractions(normalText);
        result.push({
          type: 'normal',
          text: convertedNormalText
        });
      }
      
      // Process highlight fontSize if it contains gc units
      let processedHighlightFontSize = pos.highlight.fontSize;
      if (pos.highlight.fontSize && pos.highlight.fontSize.includes('gc')) {
        if (window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
          processedHighlightFontSize = window.GridCellFontUtils.processGcProperty(pos.highlight.fontSize, 'fontSize');
        }
      }
      
      // Determine highlight colors based on type or legacy properties
      let highlightColor = null;
      let highlightFontColor = null;
      
      // New format: type + color
      if (pos.highlight.type === 'background') {
        highlightColor = pos.highlight.color;
      } else if (pos.highlight.type === 'font') {
        highlightFontColor = pos.highlight.color;
      }
      
      // Legacy format: highlightColor and fontColor properties (backward compatibility)
      if (pos.highlight.highlightColor) {
        highlightColor = pos.highlight.highlightColor;
      }
      if (pos.highlight.fontColor) {
        highlightFontColor = pos.highlight.fontColor;
      }
      
      // Convert LaTeX in highlighted text as well
      const convertedHighlightText = convertLatexFractions(pos.text);
      
      // Add highlighted text
      result.push({
        type: 'highlight',
        text: convertedHighlightText,
        highlightColor: highlightColor,
        fontColor: highlightFontColor,
        fontSize: processedHighlightFontSize,
        bold: pos.highlight.bold,
        underline: pos.highlight.underline
      });
      
      currentIndex = pos.end;
    }
    
    // Add remaining normal text (convert LaTeX in remaining text)
    if (currentIndex < originalText.length) {
      const remainingText = originalText.substring(currentIndex);
      const convertedRemainingText = convertLatexFractions(remainingText);
      result.push({
        type: 'normal',
        text: convertedRemainingText
      });
    }
    
    return result.length > 0 ? result : [{ type: 'normal', text: convertLatexFractions(originalText) }];
  };
  
  const parsedText = parseTextWithHighlights(text, highlights);
  console.log('🔍 HighlightedTextComponent parsedText:', parsedText);
  
  // Render the content
  const contentElement = React.createElement('div', {
    key: 'highlighted-text-content',
    className: 'highlighted-text-content',
    style: textStyle
  }, Array.isArray(parsedText) ? parsedText.map((part, index) => {
    if (part.type === 'highlight') {
      let highlightStyle = {
        fontSize: part.fontSize,
        fontWeight: part.bold ? 'bold' : 'normal',
        textDecoration: part.underline ? 'underline' : 'none'
      };
      
      // Apply highlight color as background
      if (part.highlightColor) {
        highlightStyle.backgroundColor = part.highlightColor;
        highlightStyle.padding = '2px 4px';
        highlightStyle.borderRadius = '4px';
      }
      
      // Apply font color
      if (part.fontColor) {
        highlightStyle.color = part.fontColor;
      }
      
      // Handle HTML content in highlighted text (like LaTeX-converted fraction spans)
      if (part.text && (part.text.includes('<br>') || part.text.includes('<span'))) {
        return React.createElement('span', {
          key: index,
          style: highlightStyle,
          dangerouslySetInnerHTML: { __html: part.text }
        });
      } else {
        return React.createElement('span', {
          key: index,
          style: highlightStyle
        }, part.text);
      }
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
  }) : parsedText);
  
  // Use the passed id prop if available, otherwise use React.useId()
  const finalId = props.id || elementId;
  
  return React.createElement('div', {
    id: finalId,
    className: 'highlighted-text-box',
    style: finalStyles,
    'data-element-type': 'highlighted-text',
    'data-grid-position': position?.gridPosition
  }, contentElement);
});

// Export component and configuration
window.HighlightedTextComponent = {
  HighlightedTextComponent,
  HighlightedTextElement: {
    HighlightedText: {
      component: HighlightedTextComponent,
      type: 'custom'
    }
  }
};

console.log('✅ HighlightedTextComponent loaded successfully');

