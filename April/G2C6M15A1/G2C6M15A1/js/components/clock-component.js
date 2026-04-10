/**
 * Enhanced Clock Component
 * 
 * A flexible analog clock component with extensive customization options:
 * - Multiple face textures (wood, marble, metallic, leather, paper)
 * - Multiple shapes (circle, square, octagon, rounded-rectangle)
 * - Multiple hand styles (default, arrow, spade, sword, modern, vintage)
 * - Interactive features (draggable hands, click to set, scroll to adjust)
 * - Learning aids (quarter highlights, hour zones, fraction overlays, hints, quiz)
 * - Visual guides (trail, ghost hands, elapsed arc)
 * - Audio features (tick-tock, chimes, voice)
 */

/* global React, GridCellFontUtils, GridPrecisionConfig, anime */

// ============================================================================
// CLOCK UTILITIES
// ============================================================================

const ClockUtils = {
  calculateHourAngle(hour, minute = 0) {
    const hour12 = hour % 12;
    return (hour12 * 30) + (minute * 0.5);
  },

  calculateMinuteAngle(minute, second = 0) {
    return (minute * 6) + (second * 0.1);
  },

  calculateSecondAngle(second, smooth = false, ms = 0) {
    if (smooth) {
      return (second * 6) + (ms / 1000 * 6);
    }
    return second * 6;
  },

  timeToAngles(hour, minute, second, smooth = false, ms = 0) {
    return {
      hour: this.calculateHourAngle(hour, minute),
      minute: this.calculateMinuteAngle(minute, second),
      second: this.calculateSecondAngle(second, smooth, ms)
    };
  },

  getAngleBetweenHands(angle1, angle2) {
    let diff = Math.abs(angle1 - angle2);
    if (diff > 180) diff = 360 - diff;
    return diff;
  },

  processGcToPixels(value, defaultValue = 1) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      if (isNaN(gcValue)) return defaultValue;
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ? 
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : defaultValue;
    }
    return parseFloat(value) || defaultValue;
  },

  normalizeAngle(angle) {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  },

  angleToTime(angle) {
    const hour = Math.floor(angle / 30) || 12;
    const minute = Math.round((angle % 30) * 2);
    return { hour, minute };
  },

  // Get time period (morning, afternoon, evening, night)
  getTimePeriod(hour) {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  },

  // Get fraction text for time
  getFractionText(minute) {
    if (minute === 0) return "o'clock";
    if (minute === 15) return 'quarter past';
    if (minute === 30) return 'half past';
    if (minute === 45) return 'quarter to';
    if (minute < 30) return `${minute} minutes past`;
    return `${60 - minute} minutes to`;
  }
};

// ============================================================================
// TEXTURE PATTERNS (SVG defs)
// ============================================================================

const ClockTextures = {
  wood: (id, size) => React.createElement('pattern', {
    key: 'texture-wood',
    id: `${id}-wood`,
    patternUnits: 'userSpaceOnUse',
    width: 40,
    height: 40
  }, [
    React.createElement('rect', { key: 'bg', width: 40, height: 40, fill: '#D4A574' }),
    React.createElement('path', { key: 'g1', d: 'M0 5 Q20 3 40 5', stroke: '#C49A6C', strokeWidth: 2, fill: 'none' }),
    React.createElement('path', { key: 'g2', d: 'M0 15 Q20 13 40 15', stroke: '#B8906A', strokeWidth: 1.5, fill: 'none' }),
    React.createElement('path', { key: 'g3', d: 'M0 25 Q20 27 40 25', stroke: '#C49A6C', strokeWidth: 2, fill: 'none' }),
    React.createElement('path', { key: 'g4', d: 'M0 35 Q20 33 40 35', stroke: '#B8906A', strokeWidth: 1.5, fill: 'none' })
  ]),

  marble: (id, size) => React.createElement('pattern', {
    key: 'texture-marble',
    id: `${id}-marble`,
    patternUnits: 'userSpaceOnUse',
    width: 100,
    height: 100
  }, [
    React.createElement('rect', { key: 'bg', width: 100, height: 100, fill: '#F5F5F5' }),
    React.createElement('path', { key: 'v1', d: 'M10 0 Q30 50 10 100', stroke: '#E0E0E0', strokeWidth: 3, fill: 'none', opacity: 0.7 }),
    React.createElement('path', { key: 'v2', d: 'M50 0 Q70 50 50 100', stroke: '#D5D5D5', strokeWidth: 2, fill: 'none', opacity: 0.6 }),
    React.createElement('path', { key: 'v3', d: 'M80 0 Q60 50 80 100', stroke: '#E8E8E8', strokeWidth: 4, fill: 'none', opacity: 0.5 })
  ]),

  metallic: (id, size) => React.createElement('linearGradient', {
    key: 'texture-metallic',
    id: `${id}-metallic`,
    gradientUnits: 'objectBoundingBox',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%'
  }, [
    React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#FFFFFF' }),
    React.createElement('stop', { key: 's2', offset: '15%', stopColor: '#E8E8E8' }),
    React.createElement('stop', { key: 's3', offset: '35%', stopColor: '#C8C8C8' }),
    React.createElement('stop', { key: 's4', offset: '65%', stopColor: '#B0B0B0' }),
    React.createElement('stop', { key: 's5', offset: '85%', stopColor: '#909090' }),
    React.createElement('stop', { key: 's6', offset: '100%', stopColor: '#787878' })
  ]),

  leather: (id, size) => React.createElement('pattern', {
    key: 'texture-leather',
    id: `${id}-leather`,
    patternUnits: 'userSpaceOnUse',
    width: 20,
    height: 20
  }, [
    React.createElement('rect', { key: 'bg', width: 20, height: 20, fill: '#8B4513' }),
    React.createElement('circle', { key: 'c1', cx: 5, cy: 5, r: 1, fill: '#7A3D10', opacity: 0.5 }),
    React.createElement('circle', { key: 'c2', cx: 15, cy: 15, r: 1, fill: '#9C5520', opacity: 0.5 }),
    React.createElement('circle', { key: 'c3', cx: 10, cy: 10, r: 0.5, fill: '#6B3410', opacity: 0.3 })
  ]),

  paper: (id, size) => React.createElement('pattern', {
    key: 'texture-paper',
    id: `${id}-paper`,
    patternUnits: 'userSpaceOnUse',
    width: 50,
    height: 50
  }, [
    React.createElement('rect', { key: 'bg', width: 50, height: 50, fill: '#FFFEF0' }),
    React.createElement('rect', { key: 'n1', x: 10, y: 10, width: 2, height: 2, fill: '#F5F0E0', opacity: 0.5 }),
    React.createElement('rect', { key: 'n2', x: 30, y: 25, width: 3, height: 1, fill: '#F0EBD8', opacity: 0.4 }),
    React.createElement('rect', { key: 'n3', x: 20, y: 40, width: 1, height: 3, fill: '#EAE5D5', opacity: 0.3 })
  ])
};

// ============================================================================
// HAND STYLES
// ============================================================================

const HandStyles = {
  default: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    const baseOffset = width / 2;
    const tipOffset = width * 0.3;
    
    const base1X = centerX + baseOffset * Math.cos(perpAngle);
    const base1Y = centerY + baseOffset * Math.sin(perpAngle);
    const base2X = centerX - baseOffset * Math.cos(perpAngle);
    const base2Y = centerY - baseOffset * Math.sin(perpAngle);
    const tip1X = endX + tipOffset * Math.cos(perpAngle);
    const tip1Y = endY + tipOffset * Math.sin(perpAngle);
    const tip2X = endX - tipOffset * Math.cos(perpAngle);
    const tip2Y = endY - tipOffset * Math.sin(perpAngle);
    
    return `M ${base1X} ${base1Y} L ${tip1X} ${tip1Y} L ${tip2X} ${tip2Y} L ${base2X} ${base2Y} Z`;
  },

  arrow: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    
    // Arrow head
    const arrowLen = width * 3;
    const arrowWidth = width * 2;
    const arrowBaseX = centerX + (length - arrowLen) * Math.cos(radians);
    const arrowBaseY = centerY + (length - arrowLen) * Math.sin(radians);
    
    const baseOffset = width / 2;
    const base1X = centerX + baseOffset * Math.cos(perpAngle);
    const base1Y = centerY + baseOffset * Math.sin(perpAngle);
    const base2X = centerX - baseOffset * Math.cos(perpAngle);
    const base2Y = centerY - baseOffset * Math.sin(perpAngle);
    
    const arrow1X = arrowBaseX + arrowWidth * Math.cos(perpAngle);
    const arrow1Y = arrowBaseY + arrowWidth * Math.sin(perpAngle);
    const arrow2X = arrowBaseX - arrowWidth * Math.cos(perpAngle);
    const arrow2Y = arrowBaseY - arrowWidth * Math.sin(perpAngle);
    
    return `M ${base1X} ${base1Y} L ${arrowBaseX + baseOffset * Math.cos(perpAngle)} ${arrowBaseY + baseOffset * Math.sin(perpAngle)} 
            L ${arrow1X} ${arrow1Y} L ${endX} ${endY} L ${arrow2X} ${arrow2Y} 
            L ${arrowBaseX - baseOffset * Math.cos(perpAngle)} ${arrowBaseY - baseOffset * Math.sin(perpAngle)} L ${base2X} ${base2Y} Z`;
  },

  spade: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    
    const baseOffset = width / 2;
    const midLen = length * 0.7;
    const midX = centerX + midLen * Math.cos(radians);
    const midY = centerY + midLen * Math.sin(radians);
    const bulgeOffset = width * 1.5;
    
    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            Q ${midX + bulgeOffset * Math.cos(perpAngle)} ${midY + bulgeOffset * Math.sin(perpAngle)} ${endX} ${endY}
            Q ${midX - bulgeOffset * Math.cos(perpAngle)} ${midY - bulgeOffset * Math.sin(perpAngle)} ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  },

  sword: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    
    const baseOffset = width;
    const tipLen = length * 0.85;
    const tipX = centerX + tipLen * Math.cos(radians);
    const tipY = centerY + tipLen * Math.sin(radians);
    
    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            L ${tipX + width * 0.3 * Math.cos(perpAngle)} ${tipY + width * 0.3 * Math.sin(perpAngle)}
            L ${endX} ${endY}
            L ${tipX - width * 0.3 * Math.cos(perpAngle)} ${tipY - width * 0.3 * Math.sin(perpAngle)}
            L ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  },

  modern: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    
    return `M ${centerX} ${centerY} L ${endX} ${endY}`;
  },

  vintage: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    
    const baseOffset = width * 0.8;
    const hole1Len = length * 0.3;
    const hole2Len = length * 0.6;
    const holeRadius = width * 0.6;
    
    const hole1X = centerX + hole1Len * Math.cos(radians);
    const hole1Y = centerY + hole1Len * Math.sin(radians);
    const hole2X = centerX + hole2Len * Math.cos(radians);
    const hole2Y = centerY + hole2Len * Math.sin(radians);
    
    // Main hand path with decorative circles
    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            L ${endX + width * 0.2 * Math.cos(perpAngle)} ${endY + width * 0.2 * Math.sin(perpAngle)}
            L ${endX} ${endY}
            L ${endX - width * 0.2 * Math.cos(perpAngle)} ${endY - width * 0.2 * Math.sin(perpAngle)}
            L ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  }
};

// ============================================================================
// CLOCK AUDIO MANAGER
// ============================================================================

const ClockAudioManager = {
  tickSound: null,
  chimeSound: null,
  initialized: false,

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    
    try {
      // Create audio context for generating sounds
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  },

  playTick() {
    if (!this.audioContext) return;
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    } catch (e) { /* ignore */ }
  },

  playChime(count = 1) {
    if (!this.audioContext) return;
    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      for (let i = 0; i < Math.min(count, 12); i++) {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          oscillator.frequency.value = frequencies[i % frequencies.length];
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.8);
        }, i * 500);
      }
    } catch (e) { /* ignore */ }
  },

  speak(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch (e) { /* ignore */ }
  }
};

// ============================================================================
// CLOCK HAND COMPONENT (Enhanced)
// ============================================================================

const ClockHand = React.memo((props) => {
  const {
    angle = 0,
    length = 50,
    width = 4,
    color = '#333333',
    visible = true,
    handType = 'hour',
    handStyle = 'default',
    centerX = 50,
    centerY = 50,
    onClick = null,
    onDrag = null,
    showShadow = true,
    shadowColor = 'rgba(0,0,0,0.2)',
    shadowOffset = 2,
    showGlow = false,
    glowColor = '#FFD700',
    glowIntensity = 10,
    showTail = false,
    tailLength = 15,
    tailColor = null,
    draggable = false,
    blink = false,
    blinkDuration = '0.6s',
    blinkIterations = 'infinite'
  } = props;

  const [isDragging, setIsDragging] = React.useState(false);

  if (!visible) return null;

  const styleFunc = HandStyles[handStyle] || HandStyles.default;
  const pathData = styleFunc({ angle, length, width, color, centerX, centerY });
  const isLinePath = handStyle === 'modern';

  // Tail path
  let tailPath = null;
  if (showTail) {
    const radians = ((angle - 90 + 180) * Math.PI) / 180;
    const tailEndX = centerX + tailLength * Math.cos(radians);
    const tailEndY = centerY + tailLength * Math.sin(radians);
    tailPath = `M ${centerX} ${centerY} L ${tailEndX} ${tailEndY}`;
  }

  // Handle drag
  const handleMouseDown = (e) => {
    if (!draggable) return;
    setIsDragging(true);
    e.preventDefault();
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!onDrag) return;
      const svg = e.target.closest('svg');
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const viewBoxVal = svg.viewBox && svg.viewBox.baseVal;
      const size = centerX * 2;
      const scaleX = viewBoxVal ? viewBoxVal.width / rect.width : size / rect.width;
      const scaleY = viewBoxVal ? viewBoxVal.height / rect.height : size / rect.height;
      const svgX = viewBoxVal ? (x * scaleX) + viewBoxVal.x : x * scaleX;
      const svgY = viewBoxVal ? (y * scaleY) + viewBoxVal.y : y * scaleY;
      const relX = svgX - centerX;
      const relY = svgY - centerY;
      const newAngle = ClockUtils.normalizeAngle((Math.atan2(relY, relX) * 180 / Math.PI) + 90);
      onDrag(handType, newAngle);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, handType, centerX, centerY]);

  const elements = [];

  // Glow filter
  if (showGlow) {
    elements.push(
      React.createElement('defs', { key: 'glow-defs' },
        React.createElement('filter', { id: `glow-${handType}`, x: '-50%', y: '-50%', width: '200%', height: '200%' }, [
          React.createElement('feGaussianBlur', { key: 'blur', stdDeviation: glowIntensity, result: 'coloredBlur' }),
          React.createElement('feMerge', { key: 'merge' }, [
            React.createElement('feMergeNode', { key: 'm1', in: 'coloredBlur' }),
            React.createElement('feMergeNode', { key: 'm2', in: 'SourceGraphic' })
          ])
        ])
      )
    );
  }

  // Tail
  if (showTail && tailPath) {
    elements.push(
      React.createElement('path', {
        key: 'tail',
        d: tailPath,
        stroke: tailColor || color,
        strokeWidth: width * 0.6,
        strokeLinecap: 'round',
        fill: 'none'
      })
    );
  }

  // Shadow
  if (showShadow) {
    elements.push(
      React.createElement(isLinePath ? 'path' : 'path', {
        key: 'shadow',
        d: pathData,
        fill: isLinePath ? 'none' : shadowColor,
        stroke: isLinePath ? shadowColor : 'none',
        strokeWidth: isLinePath ? width : 0,
        strokeLinecap: 'round',
        transform: `translate(${shadowOffset}, ${shadowOffset})`
      })
    );
  }

  // Main hand
  elements.push(
    React.createElement('path', {
      key: 'hand',
      d: pathData,
      fill: isLinePath ? 'none' : color,
      stroke: isLinePath ? color : color,
      strokeWidth: isLinePath ? width : 0.5,
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
      filter: showGlow ? `url(#glow-${handType})` : undefined,
      style: { cursor: draggable ? 'grab' : (onClick ? 'pointer' : 'default') }
    })
  );

  const handGroupStyle = blink
    ? { animation: `page2NeedleBlink ${blinkDuration} ease-in-out ${blinkIterations}` }
    : undefined;

  return React.createElement('g', {
    className: `clock-hand clock-hand-${handType}`,
    style: handGroupStyle,
    onClick: onClick ? () => onClick(handType, angle) : null,
    onMouseDown: handleMouseDown
  }, elements);
});

// ============================================================================
// CLOCK NUMBERS COMPONENT (Enhanced)
// ============================================================================

const ClockNumbers = React.memo((props) => {
  const {
    size = 100,
    color = '#333333',
    fontSize = 12,
    offset = 15,
    visible = true,
    useRomanNumerals = false,
    numberColors = null,
    blinkingNumbers = [],
    borderWidth = 0,
    fontFamily = 'Arial, sans-serif',
    numberStyle = 'normal', // normal, outlined, shadowed, embossed
    quarterMarkersOnly = false,
    useDotsInstead = false,
    dotSize = 4,
    dotColor = null,
    onClick = null
  } = props;

  if (!visible) return null;

  const allNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const quarterIndices = [0, 3, 6, 9]; // 12, 3, 6, 9
  const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - offset;

  const numbers = quarterMarkersOnly ? quarterIndices : allNumbers.map((_, i) => i);

  return React.createElement('g', { className: 'clock-numbers' },
    numbers.map((index) => {
      const num = allNumbers[index];
      const angle = (index * 30 - 90) * Math.PI / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const numColor = (numberColors && numberColors[index]) ? numberColors[index] : color;
      const shouldBlink = Array.isArray(blinkingNumbers) && blinkingNumbers.includes(num);

      if (useDotsInstead) {
        return React.createElement('circle', {
          key: `dot-${index}`,
          cx: x,
          cy: y,
          r: quarterIndices.includes(index) ? dotSize * 1.5 : dotSize,
          fill: dotColor || numColor,
          onClick: onClick ? () => onClick(num) : null,
          style: { cursor: onClick ? 'pointer' : 'default' }
        });
      }

      const text = useRomanNumerals ? romanNumerals[index] : num.toString();
      const styleProps = {
        fontFamily,
        fontWeight: 'bold'
      };

      if (shouldBlink) {
        styleProps.animation = 'page2GuideBlink 0.7s ease-in-out infinite';
      }

      // Apply number style
      if (numberStyle === 'outlined') {
        styleProps.stroke = numColor;
        styleProps.strokeWidth = 1;
        styleProps.fill = 'none';
      } else if (numberStyle === 'shadowed') {
        styleProps.textShadow = '2px 2px 2px rgba(0,0,0,0.3)';
      } else if (numberStyle === 'embossed') {
        styleProps.filter = 'url(#emboss)';
      }

      return React.createElement('text', {
        key: `number-${index}`,
        x,
        y,
        fill: numberStyle === 'outlined' ? 'none' : numColor,
        stroke: numberStyle === 'outlined' ? numColor : 'none',
        strokeWidth: numberStyle === 'outlined' ? 1 : 0,
        fontSize: fontSize,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        className: shouldBlink ? 'clock-number reveal-text-blink' : 'clock-number',
        style: styleProps,
        onClick: onClick ? () => onClick(num) : null
      }, text);
    })
  );
});

// ============================================================================
// CLOCK TICK MARKS COMPONENT (Enhanced)
// ============================================================================

const ClockTickMarks = React.memo((props) => {
  const {
    size = 100,
    color = '#333333',
    length = 8,
    width = 2,
    visible = true,
    showMinuteTicks = false,
    borderWidth = 0,
    minuteTickColor = null,
    minuteTickLength = null,
    minuteTickWidth = null
  } = props;

  if (!visible) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  const outerRadius = radius - borderWidth;

  const ticks = [];
  const tickCount = showMinuteTicks ? 60 : 12;
  
  for (let i = 0; i < tickCount; i++) {
    const angle = (i * (360 / tickCount) - 90) * Math.PI / 180;
    const isHourMark = i % (tickCount / 12) === 0;
    const tickLength = isHourMark ? length : (minuteTickLength || length * 0.5);
    const tickWidth = isHourMark ? width : (minuteTickWidth || width * 0.5);
    const tickColor = isHourMark ? color : (minuteTickColor || color);
    const tickOuterR = outerRadius;
    const tickInnerR = outerRadius - tickLength;
    
    const x1 = centerX + tickInnerR * Math.cos(angle);
    const y1 = centerY + tickInnerR * Math.sin(angle);
    const x2 = centerX + tickOuterR * Math.cos(angle);
    const y2 = centerY + tickOuterR * Math.sin(angle);
    
    ticks.push(
      React.createElement('line', {
        key: `tick-${i}`,
        x1, y1, x2, y2,
        stroke: tickColor,
        strokeWidth: tickWidth,
        strokeLinecap: 'round'
      })
    );
  }

  return React.createElement('g', { className: 'clock-tick-marks' }, ticks);
});

// ============================================================================
// CLOCK FACE COMPONENT (Enhanced)
// ============================================================================

const ClockFace = React.memo((props) => {
  const {
    shape = 'circle',
    size = 100,
    faceColor = '#FFFFFF',
    faceTexture = null, // wood, marble, metallic, leather, paper
    borderColor = '#333333',
    borderWidth = 2,
    borderPattern = 'solid', // solid, dotted, dashed, double
    onClick = null,
    useGradient = false,
    showShimmer = false,
    use3DBorder = false,
    embossed = false,
    outerRingThickness = null,
    innerRingThickness = null,
    outerRingColor = null,
    innerRingColor = null,
    frameStyle = 'default', // default, vintage, modern, minimalist, ornate
    showShadow = false,
    shadowColor = 'rgba(0,0,0,0.3)',
    shadowBlur = 10,
    showGlow = false,
    glowColor = '#4A90D2',
    glowIntensity = 15,
    faceId = 'clock-face'
  } = props;

  const halfSize = size / 2;
  const radius = halfSize - borderWidth / 2;
  const safeId = (faceId || 'clock').replace(/[^a-z0-9-]/gi, '-');

  const elements = [];
  const defs = [];

  // Add texture pattern if specified
  if (faceTexture && ClockTextures[faceTexture]) {
    defs.push(ClockTextures[faceTexture](safeId, size));
  }

  // Add gradient if needed
  if (useGradient) {
    const hasShine = showShimmer;
    defs.push(
      React.createElement('radialGradient', {
        id: `${safeId}-faceGrad`,
        key: 'faceGrad',
        cx: '50%', cy: '50%', r: '50%',
        fx: hasShine ? '32%' : '50%',
        fy: hasShine ? '32%' : '50%'
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#FFFFFF' }),
        React.createElement('stop', { key: 's2', offset: hasShine ? '18%' : '12%', stopColor: hasShine ? 'rgba(255,255,255,0.95)' : '#F8FCFF' }),
        React.createElement('stop', { key: 's3', offset: '50%', stopColor: '#F0F8FF' }),
        React.createElement('stop', { key: 's4', offset: '100%', stopColor: '#E0EEF8' })
      ])
    );
  }

  // Add emboss filter
  if (embossed) {
    defs.push(
      React.createElement('filter', { id: `${safeId}-emboss`, key: 'embossFilter' }, [
        React.createElement('feGaussianBlur', { key: 'blur', in: 'SourceAlpha', stdDeviation: 2, result: 'blur' }),
        React.createElement('feSpecularLighting', { key: 'spec', in: 'blur', surfaceScale: 5, specularConstant: 0.75, specularExponent: 20, lightingColor: '#white', result: 'specOut' },
          React.createElement('fePointLight', { key: 'pointLight', x: -5000, y: -10000, z: 20000 })
        ),
        React.createElement('feComposite', { key: 'comp', in: 'specOut', in2: 'SourceAlpha', operator: 'in', result: 'specOut' }),
        React.createElement('feComposite', { key: 'comp2', in: 'SourceGraphic', in2: 'specOut', operator: 'arithmetic', k1: 0, k2: 1, k3: 1, k4: 0 })
      ])
    );
  }

  // Add shadow/glow filters
  if (showShadow || showGlow) {
    defs.push(
      React.createElement('filter', { id: `${safeId}-shadow`, key: 'shadowFilter', x: '-50%', y: '-50%', width: '200%', height: '200%' }, [
        React.createElement('feDropShadow', { key: 'drop', dx: 0, dy: 0, stdDeviation: showShadow ? shadowBlur : glowIntensity, floodColor: showShadow ? shadowColor : glowColor })
      ])
    );
  }

  // 3D border gradients
  if (use3DBorder) {
    defs.push(
      React.createElement('linearGradient', {
        id: `${safeId}-borderGrad`,
        key: 'borderGrad',
        x1: '0%', y1: '0%', x2: '100%', y2: '100%'
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#6CB4EE' }),
        React.createElement('stop', { key: 's2', offset: '50%', stopColor: borderColor }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#1A5FAA' })
      ]),
      React.createElement('linearGradient', {
        id: `${safeId}-outerShine`,
        key: 'outerShine',
        gradientUnits: 'userSpaceOnUse',
        x1: 0, y1: 0, x2: size, y2: size
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: outerRingColor || '#5BA3E8' }),
        React.createElement('stop', { key: 's2', offset: '35%', stopColor: '#2E6BAF' }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#0D2D54' })
      ]),
      React.createElement('linearGradient', {
        id: `${safeId}-innerShine`,
        key: 'innerShine',
        gradientUnits: 'userSpaceOnUse',
        x1: 0, y1: 0, x2: size, y2: size
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: innerRingColor || '#E8F7FF' }),
        React.createElement('stop', { key: 's2', offset: '40%', stopColor: '#B8E2F4' }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#7BC4E8' })
      ])
    );
  }

  if (defs.length > 0) {
    elements.push(React.createElement('defs', { key: 'defs' }, defs));
  }

  // Determine fill
  let fill = faceColor;
  if (faceTexture && ClockTextures[faceTexture]) {
    fill = `url(#${safeId}-${faceTexture})`;
  } else if (useGradient) {
    fill = `url(#${safeId}-faceGrad)`;
  }

  // Border stroke props
  const strokeDasharray = borderPattern === 'dotted' ? '4,4' : 
                          borderPattern === 'dashed' ? '10,5' : 
                          undefined;

  // Get shape path
  const getShapePath = () => {
    switch (shape) {
      case 'octagon': {
        const r = halfSize - borderWidth / 2;
        const points = [];
        for (let i = 0; i < 8; i++) {
          const angle = (i * 45 - 22.5) * Math.PI / 180;
          points.push(`${halfSize + r * Math.cos(angle)},${halfSize + r * Math.sin(angle)}`);
        }
        return `M ${points.join(' L ')} Z`;
      }
      case 'rounded-rectangle': {
        const r = halfSize * 0.9 - borderWidth / 2;
        const cornerRadius = r * 0.2;
        return `M ${halfSize - r + cornerRadius} ${halfSize - r}
                H ${halfSize + r - cornerRadius}
                Q ${halfSize + r} ${halfSize - r} ${halfSize + r} ${halfSize - r + cornerRadius}
                V ${halfSize + r - cornerRadius}
                Q ${halfSize + r} ${halfSize + r} ${halfSize + r - cornerRadius} ${halfSize + r}
                H ${halfSize - r + cornerRadius}
                Q ${halfSize - r} ${halfSize + r} ${halfSize - r} ${halfSize + r - cornerRadius}
                V ${halfSize - r + cornerRadius}
                Q ${halfSize - r} ${halfSize - r} ${halfSize - r + cornerRadius} ${halfSize - r} Z`;
      }
      default:
        return null;
    }
  };

  const shapePath = getShapePath();

  if (use3DBorder && shape === 'circle') {
    const outerThick = outerRingThickness != null ? outerRingThickness : borderWidth + 4;
    const innerThick = innerRingThickness != null ? innerRingThickness : 3;
    const outerR = halfSize - 2;
    const mainR = halfSize - borderWidth / 2 - 2;
    const innerR = halfSize - borderWidth - 2;
    const faceR = halfSize - borderWidth - Math.max(2, Math.ceil(innerThick / 2));

    elements.push(
      React.createElement('circle', { key: 'outer', cx: halfSize, cy: halfSize, r: outerR, fill: 'none', stroke: `url(#${safeId}-outerShine)`, strokeWidth: outerThick }),
      React.createElement('circle', { key: 'main', cx: halfSize, cy: halfSize, r: mainR, fill: 'none', stroke: `url(#${safeId}-borderGrad)`, strokeWidth: borderWidth, strokeDasharray }),
      React.createElement('circle', { key: 'inner', cx: halfSize, cy: halfSize, r: innerR, fill: 'none', stroke: `url(#${safeId}-innerShine)`, strokeWidth: innerThick }),
      React.createElement('circle', { key: 'face', cx: halfSize, cy: halfSize, r: faceR, fill, stroke: 'none', filter: (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined })
    );
  } else if (shapePath) {
    elements.push(
      React.createElement('path', {
        key: 'face',
        d: shapePath,
        fill,
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray,
        filter: embossed ? `url(#${safeId}-emboss)` : (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined
      })
    );
  } else {
    elements.push(
      React.createElement('circle', {
        key: 'face',
        cx: halfSize,
        cy: halfSize,
        r: radius,
        fill,
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray,
        filter: embossed ? `url(#${safeId}-emboss)` : (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined
      })
    );
  }

  // Vintage frame decoration
  if (frameStyle === 'vintage' && shape === 'circle') {
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x = halfSize + (radius + borderWidth * 0.7) * Math.cos(angle);
      const y = halfSize + (radius + borderWidth * 0.7) * Math.sin(angle);
      elements.push(
        React.createElement('circle', {
          key: `vintage-dec-${i}`,
          cx: x,
          cy: y,
          r: borderWidth * 0.3,
          fill: '#8B7355'
        })
      );
    }
  }

  // Ornate frame decoration
  if (frameStyle === 'ornate' && shape === 'circle') {
    for (let i = 0; i < 4; i++) {
      const angle = (i * 90 - 90) * Math.PI / 180;
      const x = halfSize + (radius + borderWidth * 0.8) * Math.cos(angle);
      const y = halfSize + (radius + borderWidth * 0.8) * Math.sin(angle);
      elements.push(
        React.createElement('path', {
          key: `ornate-dec-${i}`,
          d: `M ${x - 5} ${y} Q ${x} ${y - 8} ${x + 5} ${y} Q ${x} ${y + 8} ${x - 5} ${y}`,
          fill: '#D4AF37',
          stroke: '#B8860B',
          strokeWidth: 0.5
        })
      );
    }
  }

  return React.createElement('g', {
    className: 'clock-face',
    onClick: onClick
  }, elements);
});

// ============================================================================
// LEARNING AIDS COMPONENT
// ============================================================================

const ClockLearningAids = React.memo((props) => {
  const {
    size = 100,
    borderWidth = 0,
    showQuarterHighlights = false,
    quarterHighlightColor = 'rgba(255, 200, 0, 0.2)',
    showHourZones = false,
    hourZoneColors = null, // { morning: color, afternoon: color, evening: color, night: color }
    showFractionOverlay = false,
    fractionMinute = 0,
    fractionColor = 'rgba(0, 100, 200, 0.3)',
    showHints = false,
    currentHour = 12,
    currentMinute = 0,
    hintColor = '#333333',
    showElapsedArc = false,
    elapsedMinutes = 0,
    elapsedColor = 'rgba(0, 200, 100, 0.3)'
  } = props;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - 5;
  const elements = [];

  // Quarter highlights (15, 30, 45, 60 min sections)
  if (showQuarterHighlights) {
    for (let q = 0; q < 4; q++) {
      const startAngle = (q * 90 - 90) * Math.PI / 180;
      const endAngle = ((q + 1) * 90 - 90) * Math.PI / 180;
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      elements.push(
        React.createElement('path', {
          key: `quarter-${q}`,
          d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`,
          fill: quarterHighlightColor,
          opacity: 0.5
        })
      );
    }
  }

  // Hour zones (morning, afternoon, evening, night colors)
  if (showHourZones && hourZoneColors) {
    const zones = [
      { start: 6, end: 12, period: 'morning' },
      { start: 12, end: 17, period: 'afternoon' },
      { start: 17, end: 21, period: 'evening' },
      { start: 21, end: 6, period: 'night' }
    ];
    
    zones.forEach((zone, i) => {
      const color = hourZoneColors[zone.period];
      if (!color) return;
      
      const startAngle = ((zone.start % 12) * 30 - 90) * Math.PI / 180;
      const endAngle = ((zone.end % 12) * 30 - 90) * Math.PI / 180;
      const x1 = centerX + radius * 0.3 * Math.cos(startAngle);
      const y1 = centerY + radius * 0.3 * Math.sin(startAngle);
      const x2 = centerX + radius * 0.3 * Math.cos(endAngle);
      const y2 = centerY + radius * 0.3 * Math.sin(endAngle);
      
      const largeArc = Math.abs(zone.end - zone.start) > 6 ? 1 : 0;
      
      elements.push(
        React.createElement('path', {
          key: `zone-${zone.period}`,
          d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius * 0.3} ${radius * 0.3} 0 ${largeArc} 1 ${x2} ${y2} Z`,
          fill: color,
          opacity: 0.4
        })
      );
    });
  }

  // Fraction overlay (half past, quarter to, etc.)
  if (showFractionOverlay && fractionMinute > 0) {
    const endAngle = (fractionMinute * 6 - 90) * Math.PI / 180;
    const startAngle = -90 * Math.PI / 180;
    const x1 = centerX + radius * 0.8 * Math.cos(startAngle);
    const y1 = centerY + radius * 0.8 * Math.sin(startAngle);
    const x2 = centerX + radius * 0.8 * Math.cos(endAngle);
    const y2 = centerY + radius * 0.8 * Math.sin(endAngle);
    const largeArc = fractionMinute > 30 ? 1 : 0;
    
    elements.push(
      React.createElement('path', {
        key: 'fraction',
        d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius * 0.8} ${radius * 0.8} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        fill: fractionColor
      })
    );
  }

  // Elapsed time arc
  if (showElapsedArc && elapsedMinutes > 0) {
    const endAngle = (elapsedMinutes * 6 - 90) * Math.PI / 180;
    const startAngle = -90 * Math.PI / 180;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const largeArc = elapsedMinutes > 30 ? 1 : 0;
    
    elements.push(
      React.createElement('path', {
        key: 'elapsed',
        d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        fill: elapsedColor
      })
    );
  }

  // Time-telling hints
  if (showHints) {
    const fractionText = ClockUtils.getFractionText(currentMinute);
    const hourText = currentMinute >= 45 ? ((currentHour % 12) + 1 || 12) : (currentHour % 12 || 12);
    const hintText = currentMinute === 0 ? `${hourText} o'clock` : `${fractionText} ${hourText}`;
    
    elements.push(
      React.createElement('text', {
        key: 'hint',
        x: centerX,
        y: centerY + radius * 0.5,
        fill: hintColor,
        fontSize: size * 0.06,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        style: { fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }
      }, hintText)
    );
  }

  return elements.length > 0 ? React.createElement('g', { className: 'clock-learning-aids' }, elements) : null;
});

// ============================================================================
// VISUAL GUIDES COMPONENT
// ============================================================================

const ClockVisualGuides = React.memo((props) => {
  const {
    size = 100,
    borderWidth = 0,
    showTrail = false,
    trailAngles = [], // Array of previous minute hand positions
    trailColor = 'rgba(100, 150, 200, 0.3)',
    showGhostHands = false,
    ghostHourAngle = null,
    ghostMinuteAngle = null,
    ghostColor = 'rgba(200, 200, 200, 0.5)',
    ghostHandLength = null
  } = props;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - 10;
  const elements = [];

  // Minute hand trail
  if (showTrail && trailAngles.length > 0) {
    trailAngles.forEach((angle, i) => {
      const radians = ((angle - 90) * Math.PI) / 180;
      const trailRadius = radius * 0.7;
      const x = centerX + trailRadius * Math.cos(radians);
      const y = centerY + trailRadius * Math.sin(radians);
      const opacity = (i + 1) / trailAngles.length * 0.5;
      
      elements.push(
        React.createElement('circle', {
          key: `trail-${i}`,
          cx: x,
          cy: y,
          r: 3,
          fill: trailColor,
          opacity
        })
      );
    });
  }

  // Ghost hands (target time indicator)
  if (showGhostHands) {
    if (ghostHourAngle !== null) {
      const radians = ((ghostHourAngle - 90) * Math.PI) / 180;
      const len = ghostHandLength || radius * 0.5;
      const endX = centerX + len * Math.cos(radians);
      const endY = centerY + len * Math.sin(radians);
      
      elements.push(
        React.createElement('line', {
          key: 'ghost-hour',
          x1: centerX,
          y1: centerY,
          x2: endX,
          y2: endY,
          stroke: ghostColor,
          strokeWidth: 6,
          strokeLinecap: 'round',
          strokeDasharray: '5,3'
        })
      );
    }
    
    if (ghostMinuteAngle !== null) {
      const radians = ((ghostMinuteAngle - 90) * Math.PI) / 180;
      const len = ghostHandLength || radius * 0.7;
      const endX = centerX + len * Math.cos(radians);
      const endY = centerY + len * Math.sin(radians);
      
      elements.push(
        React.createElement('line', {
          key: 'ghost-minute',
          x1: centerX,
          y1: centerY,
          x2: endX,
          y2: endY,
          stroke: ghostColor,
          strokeWidth: 4,
          strokeLinecap: 'round',
          strokeDasharray: '5,3'
        })
      );
    }
  }

  return elements.length > 0 ? React.createElement('g', { className: 'clock-visual-guides' }, elements) : null;
});

// ============================================================================
// MAIN CLOCK COMPONENT
// ============================================================================

const ClockComponent = React.forwardRef((props, ref) => {
  const {
    // Positioning
    coordinates, position, id, elementName, zIndex,
    
    // Core
    clockShape = 'circle', // circle, square, octagon, rounded-rectangle
    size = '200gc',
    time = { hour: 12, minute: 0, second: 0 },
    realTime = false,
    
    // Hand visibility
    showHourHand = true,
    showMinuteHand = true,
    showSecondHand = true,
    
    // Hand styles
    hourHandColor = '#333333',
    hourHandLength = '50gc',
    hourHandWidth = '6gc',
    hourHandStyle = 'default',
    minuteHandColor = '#333333',
    minuteHandLength = '70gc',
    minuteHandWidth = '4gc',
    minuteHandStyle = 'default',
    secondHandColor = '#FF0000',
    secondHandLength = '75gc',
    secondHandWidth = '2gc',
    secondHandStyle = 'modern',
    
    // Hand enhancements
    showHandShadows = true,
    handShadowColor = 'rgba(0,0,0,0.2)',
    handShadowOffset = 2,
    showHandGlow = false,
    handGlowColor = '#FFD700',
    handGlowIntensity = 10,
    showHandTails = false,
    handTailLength = 15,
    hourHandBlink = false,
    minuteHandBlink = false,
    secondHandBlink = false,
    handBlinkDuration = '0.6s',
    
    // Clock face styles
    faceColor = '#FFFFFF',
    clockBg = null, // when set, overrides faceColor for the clock face background
    faceTexture = null, // wood, marble, metallic, leather, paper
    borderColor = '#333333',
    borderWidth = '4gc',
    borderPattern = 'solid', // solid, dotted, dashed, double
    frameStyle = 'default', // default, vintage, modern, minimalist, ornate
    embossed = false,
    useFaceGradient = false,
    showFaceShimmer = false,
    use3DBorder = false,
    outerRingThickness = null,
    innerRingThickness = null,
    outerRingColor = null,
    innerRingColor = null,
    showClockShadow = false,
    clockShadowColor = 'rgba(0,0,0,0.3)',
    clockShadowBlur = 10,
    showClockGlow = false,
    clockGlowColor = '#4A90D2',
    clockGlowIntensity = 15,
    
    // Tick marks
    showTickMarks = true,
    tickMarkColor = '#333333',
    tickMarkLength = '10gc',
    tickMarkWidth = '2gc',
    showMinuteTicks = false,
    minuteTickColor = null,
    
    // Numbers
    showNumbers = true,
    numberColor = '#333333',
    numberColors = null,
    numberFontSize = '24gc',
    numberOffset = '20gc',
    numberFontFamily = 'Arial, sans-serif',
    numberStyle = 'normal', // normal, outlined, shadowed, embossed
    useRomanNumerals = false,
    quarterMarkersOnly = false,
    useDotsInsteadOfNumbers = false,
    dotSize = 4,
    
    // Center dot
    showCenterDot = true,
    centerDotColor = '#333333',
    centerDotSize = '10gc',
    pulsingCenterDot = false,
    
    // Interaction
    interactive = false,
    clockClickable = undefined,  // when set, overrides interactive for clock face only
    handsClickable = undefined,  // when set, overrides interactive for hands only
    minuteHandClickable = undefined,  // when set, overrides for minute hand only
    hourHandClickable = undefined,  // when set, overrides for hour hand only
    draggableHands = false,
    clickToSetHour = false,
    scrollToAdjust = false,
    
    // Animation
    smoothSeconds = false,
    bounceEffect = false,
    minuteHandSpeed = 2000,
    
    // Learning aids
    showQuarterHighlights = false,
    quarterHighlightColor = 'rgba(255, 200, 0, 0.2)',
    showHourZones = false,
    hourZoneColors = null,
    showFractionOverlay = false,
    showHints = false,
    hintColor = '#666666',
    quizMode = false,
    
    // Visual guides
    showTrail = false,
    trailColor = 'rgba(100, 150, 200, 0.3)',
    showGhostHands = false,
    targetTime = null, // { hour, minute } for ghost hands
    ghostColor = 'rgba(200, 200, 200, 0.5)',
    showElapsedArc = false,
    elapsedStartTime = null,
    elapsedColor = 'rgba(0, 200, 100, 0.3)',
    
    // Audio
    enableTickSound = false,
    enableHourlyChime = false,
    enableVoiceAnnounce = false,
    
    // Arc visualization
    arcColor = null,
    arcFillOpacity = 0.35,
    angleMarkerSize = 0.3,
    angleMarkerColor = null,
    angleMarkerFillColor = null,
    angleMarkerFillOpacity = 0.4,
    labelOffsetX = 0,
    labelOffsetY = 0,
    labelColor = '#000000',
    labelFontSize = '24',
    
    // Callbacks
    onTimeChange = null,
    onHandClick = null,
    onClockClick = null,
    onAnimationComplete = null,
    onTick = null,
    onQuizAnswer = null
  } = props;

  const effectiveClockClickable = clockClickable !== undefined ? clockClickable : interactive;
  const effectiveHandsClickable = handsClickable !== undefined ? handsClickable : interactive;
  const effectiveMinuteHandClickable = minuteHandClickable !== undefined ? minuteHandClickable : effectiveHandsClickable;
  const effectiveHourHandClickable = hourHandClickable !== undefined ? hourHandClickable : effectiveHandsClickable;

  // Process GC units
  const sizePx = React.useMemo(() => ClockUtils.processGcToPixels(size, 200), [size]);
  const hourLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(hourHandLength, sizePx * 0.35), [hourHandLength, sizePx]);
  const minuteLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(minuteHandLength, sizePx * 0.45), [minuteHandLength, sizePx]);
  const secondLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(secondHandLength, sizePx * 0.48), [secondHandLength, sizePx]);
  const hourWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(hourHandWidth, 6), [hourHandWidth]);
  const minuteWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(minuteHandWidth, 4), [minuteHandWidth]);
  const secondWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(secondHandWidth, 2), [secondHandWidth]);
  const borderWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(borderWidth, 4), [borderWidth]);
  const outerRingThicknessPx = React.useMemo(() => outerRingThickness == null ? null : ClockUtils.processGcToPixels(outerRingThickness, 8), [outerRingThickness]);
  const innerRingThicknessPx = React.useMemo(() => innerRingThickness == null ? null : ClockUtils.processGcToPixels(innerRingThickness, 3), [innerRingThickness]);
  const tickLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(tickMarkLength, 10), [tickMarkLength]);
  const tickWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(tickMarkWidth, 2), [tickMarkWidth]);
  const numberFontSizePx = React.useMemo(() => ClockUtils.processGcToPixels(numberFontSize, 24), [numberFontSize]);
  const numberOffsetPx = React.useMemo(() => ClockUtils.processGcToPixels(numberOffset, 20), [numberOffset]);
  const centerDotSizePx = React.useMemo(() => ClockUtils.processGcToPixels(centerDotSize, 10), [centerDotSize]);
  const labelFontSizePx = React.useMemo(() => ClockUtils.processGcToPixels(labelFontSize, 24), [labelFontSize]);
  const handTailLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(handTailLength, 15), [handTailLength]);

  // State
  const [currentTime, setCurrentTime] = React.useState(time);
  const [angles, setAngles] = React.useState(() => ClockUtils.timeToAngles(time.hour, time.minute, time.second));
  const [showArc, setShowArc] = React.useState(false);
  const [trailAngles, setTrailAngles] = React.useState([]);
  const [centerDotScale, setCenterDotScale] = React.useState(1);
  const [lastChimeHour, setLastChimeHour] = React.useState(null);
  const [dynamicNumberHighlights, setDynamicNumberHighlights] = React.useState({});
  const [dynamicBlinkingNumbers, setDynamicBlinkingNumbers] = React.useState([]);
  
  const intervalRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const smoothIntervalRef = React.useRef(null);

  // Initialize audio
  React.useEffect(() => {
    if (enableTickSound || enableHourlyChime) {
      ClockAudioManager.init();
    }
  }, [enableTickSound, enableHourlyChime]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !id) return;

    const handleClockNumberFeedback = (event) => {
      const { clockId, numbers, color = '#ED3131', blink = false, clear = false } = event.detail || {};
      if (clockId !== id) return;

      if (clear) {
        setDynamicNumberHighlights({});
        setDynamicBlinkingNumbers([]);
        return;
      }

      const numberList = (Array.isArray(numbers) ? numbers : []).filter(num => Number.isFinite(num));
      if (numberList.length === 0) return;

      setDynamicNumberHighlights(prev => {
        const next = { ...prev };
        numberList.forEach(num => {
          next[num] = color;
        });
        return next;
      });

      if (blink) {
        setDynamicBlinkingNumbers(prev => Array.from(new Set([...prev, ...numberList])));
      }
    };

    window.addEventListener('clockNumberFeedback', handleClockNumberFeedback);
    return () => window.removeEventListener('clockNumberFeedback', handleClockNumberFeedback);
  }, [id]);

  // Update angles when time changes
  React.useEffect(() => {
    const newAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second, smoothSeconds);
    setAngles(newAngles);
    
    // Update trail
    if (showTrail) {
      setTrailAngles(prev => {
        const newTrail = [...prev, newAngles.minute];
        if (newTrail.length > 30) newTrail.shift();
        return newTrail;
      });
    }
    
    // Pulsing center dot
    if (pulsingCenterDot) {
      setCenterDotScale(1.2);
      setTimeout(() => setCenterDotScale(1), 100);
    }
    
    // Tick sound
    if (enableTickSound && realTime) {
      ClockAudioManager.playTick();
    }
    
    // Hourly chime
    if (enableHourlyChime && currentTime.minute === 0 && currentTime.second === 0 && lastChimeHour !== currentTime.hour) {
      ClockAudioManager.playChime(currentTime.hour % 12 || 12);
      setLastChimeHour(currentTime.hour);
      
      // Voice announce
      if (enableVoiceAnnounce) {
        const hour = currentTime.hour % 12 || 12;
        const ampm = currentTime.hour >= 12 ? 'PM' : 'AM';
        ClockAudioManager.speak(`It's ${hour} o'clock ${ampm}`);
      }
    }
    
    if (onTimeChange) {
      onTimeChange({ ...currentTime, totalDegrees: newAngles });
    }
  }, [currentTime, smoothSeconds, showTrail, pulsingCenterDot, enableTickSound, enableHourlyChime, enableVoiceAnnounce, lastChimeHour, realTime, onTimeChange]);

  // Real-time mode
  React.useEffect(() => {
    if (realTime) {
      const updateTime = () => {
        const now = new Date();
        const newTime = {
          hour: now.getHours(),
          minute: now.getMinutes(),
          second: now.getSeconds()
        };
        setCurrentTime(newTime);
        if (onTick) onTick(newTime);
      };
      
      if (smoothSeconds) {
        // Update more frequently for smooth seconds
        smoothIntervalRef.current = setInterval(() => {
          const now = new Date();
          setAngles(ClockUtils.timeToAngles(now.getHours(), now.getMinutes(), now.getSeconds(), true, now.getMilliseconds()));
        }, 50);
        intervalRef.current = setInterval(updateTime, 1000);
      } else {
        intervalRef.current = setInterval(updateTime, 1000);
      }
      
      updateTime(); // Initial update
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (smoothIntervalRef.current) clearInterval(smoothIntervalRef.current);
    };
  }, [realTime, smoothSeconds, onTick]);

  // Handle scroll to adjust
  React.useEffect(() => {
    if (!scrollToAdjust || !id) return;
    
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      setCurrentTime(prev => {
        let newMinute = prev.minute + delta;
        let newHour = prev.hour;
        if (newMinute >= 60) { newMinute = 0; newHour = (newHour + 1) % 24; }
        if (newMinute < 0) { newMinute = 59; newHour = (newHour - 1 + 24) % 24; }
        return { ...prev, hour: newHour, minute: newMinute };
      });
    };
    
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, [scrollToAdjust, id]);

  // Handle hand drag
  const handleHandDrag = React.useCallback((handType, newAngle) => {
    if (!draggableHands) return;
    
    if (handType === 'minute') {
      const minute = Math.round(newAngle / 6) % 60;
      setCurrentTime(prev => ({ ...prev, minute }));
    } else if (handType === 'hour') {
      const timeFromAngle = ClockUtils.angleToTime(newAngle);
      setCurrentTime(prev => ({ ...prev, hour: timeFromAngle.hour }));
    }
    
    // Bounce effect
    if (bounceEffect && typeof anime !== 'undefined') {
      const handEl = document.querySelector(`.clock-hand-${handType}`);
      if (handEl) {
        anime({
          targets: handEl,
          scale: [1.1, 1],
          duration: 200,
          easing: 'easeOutElastic(1, .5)'
        });
      }
    }
  }, [draggableHands, bounceEffect]);

  // Handle number click
  const handleNumberClick = React.useCallback((num) => {
    if (!clickToSetHour) return;
    setCurrentTime(prev => ({ ...prev, hour: num }));
    
    if (quizMode && onQuizAnswer) {
      onQuizAnswer(num);
    }
  }, [clickToSetHour, quizMode, onQuizAnswer]);

  // Handle clock click
  const handleClockClick = React.useCallback((event) => {
    if (!onClockClick && !effectiveClockClickable) return;
    
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const viewBoxVal = svg.viewBox && svg.viewBox.baseVal;
    const scaleX = viewBoxVal ? viewBoxVal.width / rect.width : sizePx / rect.width;
    const scaleY = viewBoxVal ? viewBoxVal.height / rect.height : sizePx / rect.height;
    const svgX = viewBoxVal ? (x * scaleX) + viewBoxVal.x : x * scaleX;
    const svgY = viewBoxVal ? (y * scaleY) + viewBoxVal.y : y * scaleY;
    const centerX = sizePx / 2;
    const centerY = sizePx / 2;
    const relX = svgX - centerX;
    const relY = svgY - centerY;
    const angle = ClockUtils.normalizeAngle((Math.atan2(relY, relX) * 180 / Math.PI) + 90);
    
    if (onClockClick) {
      onClockClick({ x: relX, y: relY }, angle);
    }
  }, [onClockClick, effectiveClockClickable, sizePx]);

  // Public methods
  React.useImperativeHandle(ref, () => ({
    setTime(hour, minute, second, animate = true) {
      const newTime = { hour, minute, second };
      if (animate && typeof anime !== 'undefined') {
        const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
        const newAngles = ClockUtils.timeToAngles(hour, minute, second);
        animationRef.current = anime({
          targets: oldAngles,
          hour: newAngles.hour,
          minute: newAngles.minute,
          second: newAngles.second,
          duration: 1000,
          easing: bounceEffect ? 'easeOutElastic(1, .5)' : 'easeInOutQuad',
          update: () => setAngles({ ...oldAngles }),
          complete: () => {
            setCurrentTime(newTime);
            if (onAnimationComplete) onAnimationComplete('setTime');
          }
        });
      } else {
        setCurrentTime(newTime);
      }
    },
    getTime: () => currentTime,
    getAngleBetweenHands: (h1, h2) => ClockUtils.getAngleBetweenHands(angles[h1] || 0, angles[h2] || 0),
    animateToTime(hour, minute, second, duration = 1000) {
      if (typeof anime === 'undefined') { setCurrentTime({ hour, minute, second }); return; }
      const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
      const newAngles = ClockUtils.timeToAngles(hour, minute, second);
      animationRef.current = anime({
        targets: oldAngles,
        hour: newAngles.hour,
        minute: newAngles.minute,
        second: newAngles.second,
        duration,
        easing: bounceEffect ? 'easeOutElastic(1, .5)' : 'easeInOutQuad',
        update: () => setAngles({ ...oldAngles }),
        complete: () => {
          setCurrentTime({ hour, minute, second });
          if (onAnimationComplete) onAnimationComplete('animate');
        }
      });
    },
    animateMinuteHandToTime(hour, minute, second = 0, customSpeed = null) {
      setShowArc(false);
      if (typeof anime === 'undefined') { setCurrentTime({ hour, minute, second }); return; }
      const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
      const newAngles = ClockUtils.timeToAngles(hour, minute, second);
      const oldTotalMin = (currentTime.hour % 12) * 60 + currentTime.minute;
      const newTotalMin = (hour % 12) * 60 + minute;
      let totalMinDelta = newTotalMin - oldTotalMin;
      if (totalMinDelta < 0) totalMinDelta += 720;
      const totalDegrees = totalMinDelta * 6;
      const speed = customSpeed ?? minuteHandSpeed;
      const duration = totalDegrees * (speed / 6);
      const target = { minute: oldAngles.minute, hour: oldAngles.hour, progress: 0 };
      animationRef.current = anime({
        targets: target,
        progress: 1,
        duration,
        easing: 'linear',
        update: () => {
          const deg = totalDegrees * target.progress;
          setAngles({
            hour: ClockUtils.normalizeAngle(oldAngles.hour + deg / 12),
            minute: ClockUtils.normalizeAngle(oldAngles.minute + deg),
            second: oldAngles.second
          });
        },
        complete: () => {
          setCurrentTime({ hour, minute, second });
          setAngles(newAngles);
          setTimeout(() => setShowArc(true), 1000);
          if (onAnimationComplete) onAnimationComplete('animateMinuteHand');
        }
      });
    },
    startRealTime() {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const now = new Date();
          setCurrentTime({ hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds() });
        }, 1000);
      }
    },
    stopRealTime() {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      if (smoothIntervalRef.current) { clearInterval(smoothIntervalRef.current); smoothIntervalRef.current = null; }
    },
    playChime: (count) => ClockAudioManager.playChime(count),
    speak: (text) => ClockAudioManager.speak(text)
  }));

  // Store methods globally
  React.useEffect(() => {
    if (!id || typeof window === 'undefined') return;
    if (!window.clockComponentRefs) window.clockComponentRefs = {};
    window.clockComponentRefs[id] = {
      setTime: (h, m, s) => setCurrentTime({ hour: h, minute: m, second: s }),
      getTime: () => currentTime,
      animateMinuteHandToTime: (h, m, s, sp) => {
        // Simplified for global access
        setCurrentTime({ hour: h, minute: m, second: s || 0 });
      }
    };
    return () => { if (window.clockComponentRefs) delete window.clockComponentRefs[id]; };
  }, [id, currentTime]);

  const mergedNumberColors = React.useMemo(() => {
    if (Object.keys(dynamicNumberHighlights).length === 0) return numberColors;

    const allNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const merged = Array.isArray(numberColors) ? [...numberColors] : [];

    allNumbers.forEach((num, index) => {
      if (dynamicNumberHighlights[num]) {
        merged[index] = dynamicNumberHighlights[num];
      }
    });

    return merged;
  }, [numberColors, dynamicNumberHighlights]);

  const centerX = sizePx / 2;
  const centerY = sizePx / 2;
  const finalArcColor = arcColor || borderColor;
  const finalAngleMarkerColor = angleMarkerColor || finalArcColor;
  const finalAngleMarkerFillColor = angleMarkerFillColor || finalArcColor;

  // Calculate arc data
  const arcData = React.useMemo(() => {
    if (!showArc) return null;
    const hourAngle = angles.hour;
    const minuteAngle = angles.minute;
    let angleDiff = Math.abs(hourAngle - minuteAngle);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;
    
    let startAngle = Math.min(hourAngle, minuteAngle);
    let endAngle = Math.max(hourAngle, minuteAngle);
    if (Math.abs(hourAngle - minuteAngle) > 180) {
      startAngle = Math.max(hourAngle, minuteAngle);
      endAngle = Math.min(hourAngle, minuteAngle);
      if (endAngle < startAngle) endAngle += 360;
    }
    
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const arcRadius = (sizePx / 2) - (borderWidthPx / 2);
    
    const startX = centerX + arcRadius * Math.cos(startRad);
    const startY = centerY + arcRadius * Math.sin(startRad);
    const endX = centerX + arcRadius * Math.cos(endRad);
    const endY = centerY + arcRadius * Math.sin(endRad);
    const largeArcFlag = angleDiff > 180 ? 1 : 0;
    const sweepFlag = angleDiff <= 180 ? 1 : 0;
    
    const arcPath = `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    const sectorPath = `M ${centerX} ${centerY} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;
    
    const markerRadius = arcRadius * angleMarkerSize;
    const markerStartX = centerX + markerRadius * Math.cos(startRad);
    const markerStartY = centerY + markerRadius * Math.sin(startRad);
    const markerEndX = centerX + markerRadius * Math.cos(endRad);
    const markerEndY = centerY + markerRadius * Math.sin(endRad);
    const markerArcPath = `M ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY}`;
    const markerSectorPath = `M ${centerX} ${centerY} L ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY} Z`;
    
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = ((midAngle - 90) * Math.PI) / 180;
    const labelOffset = markerRadius * 1.5;
    const labelX = centerX + labelOffset * Math.cos(midAngleRad) + labelOffsetX;
    const labelY = centerY + labelOffset * Math.sin(midAngleRad) + labelOffsetY;
    
    return { arcPath, sectorPath, markerArcPath, markerSectorPath, startX, startY, endX, endY, angleValue: Math.round(angleDiff), labelX, labelY };
  }, [showArc, angles.hour, angles.minute, sizePx, borderWidthPx, centerX, centerY, angleMarkerSize, labelOffsetX, labelOffsetY]);

  // Ghost hands data
  const ghostData = React.useMemo(() => {
    if (!showGhostHands || !targetTime) return null;
    return {
      hourAngle: ClockUtils.calculateHourAngle(targetTime.hour, targetTime.minute),
      minuteAngle: ClockUtils.calculateMinuteAngle(targetTime.minute, 0)
    };
  }, [showGhostHands, targetTime]);

  // Elapsed arc data
  const elapsedData = React.useMemo(() => {
    if (!showElapsedArc || !elapsedStartTime) return null;
    const startMinutes = elapsedStartTime.hour * 60 + elapsedStartTime.minute;
    const currentMinutes = currentTime.hour * 60 + currentTime.minute;
    let elapsed = currentMinutes - startMinutes;
    if (elapsed < 0) elapsed += 24 * 60;
    return { minutes: elapsed % 60 };
  }, [showElapsedArc, elapsedStartTime, currentTime]);

  // Container style
  const containerStyle = React.useMemo(() => {
    const baseStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' };
    const coords = coordinates || position?.coordinates;
    if (coords && Array.isArray(coords) && coords.length === 4) {
      const [x1, y1, x2, y2] = coords;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      baseStyle.position = 'absolute';
      baseStyle.left = `${((x1 - 1) / gridCols * 100).toFixed(2)}%`;
      baseStyle.top = `${((y1 - 1) / gridRows * 100).toFixed(2)}%`;
      baseStyle.width = `${((x2 - x1) / gridCols * 100).toFixed(2)}%`;
      baseStyle.height = `${((y2 - y1) / gridRows * 100).toFixed(2)}%`;
      if (zIndex) baseStyle.zIndex = zIndex;
    } else {
      baseStyle.width = '100%';
      baseStyle.height = '100%';
    }
    return baseStyle;
  }, [coordinates, position, zIndex]);

  // ViewBox calculation for 3D border
  const outerThickForPad = outerRingThicknessPx != null ? outerRingThicknessPx : borderWidthPx + 4;
  const viewPad = use3DBorder ? Math.ceil(outerThickForPad / 2) + 4 : 0;
  const viewW = sizePx + 2 * viewPad;
  const viewH = sizePx + 2 * viewPad;
  const viewBox = viewPad > 0 ? `${-viewPad} ${-viewPad} ${viewW} ${viewH}` : `0 0 ${sizePx} ${sizePx}`;

  // Build SVG children
  const svgChildren = [
    // Learning aids (behind everything)
    React.createElement(ClockLearningAids, {
      key: 'learning-aids',
      size: sizePx,
      borderWidth: borderWidthPx,
      showQuarterHighlights,
      quarterHighlightColor,
      showHourZones,
      hourZoneColors,
      showFractionOverlay,
      fractionMinute: currentTime.minute,
      showHints,
      currentHour: currentTime.hour,
      currentMinute: currentTime.minute,
      hintColor,
      showElapsedArc: showElapsedArc && elapsedData,
      elapsedMinutes: elapsedData?.minutes || 0,
      elapsedColor
    }),

    // Visual guides (ghost hands, trail)
    React.createElement(ClockVisualGuides, {
      key: 'visual-guides',
      size: sizePx,
      borderWidth: borderWidthPx,
      showTrail,
      trailAngles,
      trailColor,
      showGhostHands: showGhostHands && ghostData,
      ghostHourAngle: ghostData?.hourAngle,
      ghostMinuteAngle: ghostData?.minuteAngle,
      ghostColor,
      ghostHandLength: minuteLengthPx * 0.9
    }),

    // Clock face
    React.createElement(ClockFace, {
      key: 'face',
      shape: clockShape,
      size: sizePx,
      faceColor: clockBg != null ? clockBg : faceColor,
      faceTexture,
      borderColor,
      borderWidth: borderWidthPx,
      borderPattern,
      frameStyle,
      embossed,
      useGradient: useFaceGradient,
      showShimmer: showFaceShimmer,
      use3DBorder,
      outerRingThickness: outerRingThicknessPx,
      innerRingThickness: innerRingThicknessPx,
      outerRingColor,
      innerRingColor,
      showShadow: showClockShadow,
      shadowColor: clockShadowColor,
      shadowBlur: clockShadowBlur,
      showGlow: showClockGlow,
      glowColor: clockGlowColor,
      glowIntensity: clockGlowIntensity,
      faceId: id || 'clock',
      onClick: effectiveClockClickable ? handleClockClick : null
    }),

    // Tick marks
    showTickMarks && React.createElement(ClockTickMarks, {
      key: 'ticks',
      size: sizePx,
      color: tickMarkColor,
      length: tickLengthPx,
      width: tickWidthPx,
      visible: showTickMarks,
      showMinuteTicks,
      minuteTickColor,
      borderWidth: borderWidthPx
    }),

    // Numbers
    showNumbers && React.createElement(ClockNumbers, {
      key: 'numbers',
      size: sizePx,
      color: numberColor,
      numberColors: mergedNumberColors,
      blinkingNumbers: dynamicBlinkingNumbers,
      fontSize: numberFontSizePx,
      offset: numberOffsetPx,
      visible: showNumbers,
      useRomanNumerals,
      fontFamily: numberFontFamily,
      numberStyle,
      quarterMarkersOnly,
      useDotsInstead: useDotsInsteadOfNumbers,
      dotSize,
      borderWidth: borderWidthPx,
      onClick: clickToSetHour ? handleNumberClick : null
    }),

    // Hour hand
    showHourHand && React.createElement(ClockHand, {
      key: 'hour-hand',
      angle: angles.hour,
      length: hourLengthPx,
      width: hourWidthPx,
      color: hourHandColor,
      visible: showHourHand,
      handType: 'hour',
      handStyle: hourHandStyle,
      centerX,
      centerY,
      onClick: effectiveHourHandClickable ? (t, a) => onHandClick && onHandClick(t, a) : null,
      onDrag: draggableHands ? handleHandDrag : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx,
      draggable: draggableHands,
      blink: hourHandBlink,
      blinkDuration: handBlinkDuration
    }),

    // Minute hand
    showMinuteHand && React.createElement(ClockHand, {
      key: 'minute-hand',
      angle: angles.minute,
      length: minuteLengthPx,
      width: minuteWidthPx,
      color: minuteHandColor,
      visible: showMinuteHand,
      handType: 'minute',
      handStyle: minuteHandStyle,
      centerX,
      centerY,
      onClick: effectiveMinuteHandClickable ? (t, a) => onHandClick && onHandClick(t, a) : null,
      onDrag: draggableHands ? handleHandDrag : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx * 0.8,
      draggable: draggableHands,
      blink: minuteHandBlink,
      blinkDuration: handBlinkDuration
    }),

    // Second hand
    showSecondHand && React.createElement(ClockHand, {
      key: 'second-hand',
      angle: angles.second,
      length: secondLengthPx,
      width: secondWidthPx,
      color: secondHandColor,
      visible: showSecondHand,
      handType: 'second',
      handStyle: secondHandStyle,
      centerX,
      centerY,
      onClick: effectiveHandsClickable ? (t, a) => onHandClick && onHandClick(t, a) : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx * 0.5,
      tailColor: secondHandColor,
      draggable: false,
      blink: secondHandBlink,
      blinkDuration: handBlinkDuration
    }),

    // Arc visualization
    showArc && arcData && React.createElement('g', { key: 'arc-group' }, [
      React.createElement('path', { key: 'sector', d: arcData.sectorPath, fill: finalAngleMarkerFillColor, fillOpacity: arcFillOpacity, stroke: 'none' }),
      React.createElement('line', { key: 'line1', x1: centerX, y1: centerY, x2: arcData.startX, y2: arcData.startY, stroke: finalArcColor, strokeWidth: 2, strokeDasharray: '5,5' }),
      React.createElement('line', { key: 'line2', x1: centerX, y1: centerY, x2: arcData.endX, y2: arcData.endY, stroke: finalArcColor, strokeWidth: 2, strokeDasharray: '5,5' }),
      React.createElement('path', { key: 'arc', d: arcData.arcPath, fill: 'none', stroke: finalArcColor, strokeWidth: 4, strokeLinecap: 'round' }),
      React.createElement('path', { key: 'marker-fill', d: arcData.markerSectorPath, fill: finalAngleMarkerFillColor, fillOpacity: angleMarkerFillOpacity, stroke: 'none' }),
      React.createElement('path', { key: 'marker', d: arcData.markerArcPath, fill: 'none', stroke: finalAngleMarkerColor, strokeWidth: 3, strokeLinecap: 'round' }),
      React.createElement('text', { key: 'label', x: arcData.labelX, y: arcData.labelY, fill: labelColor, fontSize: labelFontSizePx, fontWeight: 'bold', textAnchor: 'middle', dominantBaseline: 'middle', style: { fontFamily: 'Arial, sans-serif' } }, `${arcData.angleValue}°`)
    ]),

    // Center dot
    showCenterDot && React.createElement('circle', {
      key: 'center-dot',
      cx: centerX,
      cy: centerY,
      r: (centerDotSizePx / 2) * centerDotScale,
      fill: centerDotColor,
      className: 'clock-center-dot',
      style: { transition: pulsingCenterDot ? 'r 0.1s ease-out' : undefined }
    })
  ];

  return React.createElement('div', {
    className: 'clock-component-container',
    id: id,
    'data-element-name': elementName,
    style: containerStyle
  },
    React.createElement('svg', {
      viewBox: viewBox,
      style: { width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', display: 'block' },
      preserveAspectRatio: 'xMidYMid meet',
      className: `clock-svg clock-shape-${clockShape}`,
      onClick: effectiveClockClickable ? handleClockClick : null
    }, svgChildren)
  );
});

ClockComponent.displayName = 'ClockComponent';

const ClockElement = {
  componentType: 'ClockComponent',
  component: ClockComponent,
  description: 'Enhanced analog clock with extensive customization'
};

if (typeof window !== 'undefined') {
  window.ClockComponent = ClockComponent;
  window.ClockUtils = ClockUtils;
  window.ClockElement = ClockElement;
  window.ClockAudioManager = ClockAudioManager;
  console.log('✅ Enhanced ClockComponent loaded successfully');
}