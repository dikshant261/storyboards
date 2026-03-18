/**
 * Highlighted Text Component (KaTeX-based)
 * 
 * Same math behavior as CalculationStepsComponent
 */

const HighlightedTextComponent = React.memo((props) => {
  const elementId = React.useId();

  const {
    position,
    processedStyles,
    elementZIndex,
    text = '',
    fontSize = '24gc',
    fontWeight = 'normal',
    fontColor = '#000000',
    textAlign = 'left',
    highlights = []
  } = props;

  // ---------- Font size (gc) ----------
  let processedFontSize = fontSize;
  if (fontSize?.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
    processedFontSize = window.GridCellFontUtils.processGcProperty(fontSize, 'fontSize');
  }

  const finalStyles = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    ...(elementZIndex !== undefined && { zIndex: elementZIndex }),
    display: 'flex',
    alignItems: 'center'
  };

  const textStyle = {
    fontSize: processedFontSize,
    fontWeight,
    color: fontColor,
    width: '100%',
    textAlign,
    lineHeight: '1.4'
  };

  // =====================================================
  // KaTeX renderer (same logic as CalculationSteps)
  // =====================================================
  const renderKaTeX = (value) => {
    if (!value || typeof value !== 'string') return value;

    if (typeof katex === 'undefined') return value;

    return value.replace(/\$([^$]+)\$/g, (match, math) => {
      try {
        return katex.renderToString(math, {
          throwOnError: false,
          displayMode: false
        });
      } catch {
        return match;
      }
    });
  };

  // =====================================================
  // Highlight parser (text-based, then KaTeX)
  // =====================================================
  const parseTextWithHighlights = (originalText, highlights) => {
    if (!highlights || !highlights.length) {
      return [{ type: 'normal', text: renderKaTeX(originalText) }];
    }

    const positions = [];

    highlights.forEach(h => {
      let idx = 0;
      while ((idx = originalText.indexOf(h.text, idx)) !== -1) {
        positions.push({
          start: idx,
          end: idx + h.text.length,
          highlight: h
        });
        idx += 1;
      }
    });

    positions.sort((a, b) => a.start - b.start);

    const result = [];
    let cursor = 0;

    positions.forEach(p => {
      if (p.start > cursor) {
        result.push({
          type: 'normal',
          text: renderKaTeX(originalText.slice(cursor, p.start))
        });
      }

      let hFontSize = p.highlight.fontSize;
      if (hFontSize?.includes('gc') && window.GridCellFontUtils?.processGcProperty) {
        hFontSize = window.GridCellFontUtils.processGcProperty(hFontSize, 'fontSize');
      }

      result.push({
        type: 'highlight',
        text: renderKaTeX(p.highlight.text),
        fontSize: hFontSize,
        highlightColor: p.highlight.highlightColor || (p.highlight.type === 'background' ? p.highlight.color : null),
        fontColor: p.highlight.fontColor || (p.highlight.type === 'font' ? p.highlight.color : null),
        bold: p.highlight.bold,
        underline: p.highlight.underline
      });

      cursor = p.end;
    });

    if (cursor < originalText.length) {
      result.push({
        type: 'normal',
        text: renderKaTeX(originalText.slice(cursor))
      });
    }

    return result;
  };

  const parsedText = parseTextWithHighlights(text, highlights);

  // =====================================================
  // Render
  // =====================================================
  return React.createElement(
    'div',
    {
      id: elementId,
      className: 'highlighted-text-box',
      style: finalStyles
    },
    React.createElement(
      'div',
      { className: 'highlighted-text-content', style: textStyle },
      parsedText.map((part, i) => {
        if (part.type === 'highlight') {
          const style = {
            fontSize: part.fontSize,
            fontWeight: part.bold ? 'bold' : 'normal',
            textDecoration: part.underline ? 'underline' : 'none',
            ...(part.highlightColor && {
              backgroundColor: part.highlightColor,
              padding: '2px 4px',
              borderRadius: '4px'
            }),
            ...(part.fontColor && { color: part.fontColor })
          };

          return React.createElement('span', {
            key: i,
            style,
            dangerouslySetInnerHTML: { __html: part.text }
          });
        }

        return React.createElement('span', {
          key: i,
          dangerouslySetInnerHTML: { __html: part.text }
        });
      })
    )
  );
});

// Export
window.HighlightedTextComponent = {
  HighlightedTextComponent,
  HighlightedTextElement: {
    HighlightedText: {
      component: HighlightedTextComponent,
      type: 'custom'
    }
  }
};

console.log('✅ HighlightedTextComponent (KaTeX-based) loaded');
