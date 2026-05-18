/**
 * StackSubtractionComponent
 * ─────────────────────────
 * A thin wrapper around LongSubtractionComponent that forces `variant: 'simple'`
 * so the widget renders ONLY the stacked column-subtraction view (header,
 * operands, divider, difference) WITHOUT the right-side place-value
 * decomposition panel.
 *
 * In effect: "stack" = "long without the expanded panel".
 *
 * Everything else — interactive types, scripted engine, borrow row,
 * split-borrow animation, pad borrow button, cell-click button panel,
 * donor-struck visual — works identically, but lives on the simple panel
 * only. Scripts that target `expanded:*` cells will have no visible effect.
 *
 * Drop-in wiring (PageConfig):
 *   {
 *     id: 'my-stack-subtraction',
 *     type: 'custom',
 *     coordinates: [400, 100, 1550, 790],
 *     props: {
 *       componentType: 'StackSubtractionComponent',
 *       numbers: [2503, 1167],
 *       // variant is forced to 'simple' — do not set it here
 *       // expanded-only props (placeValueRow, rightBlock, middleBlock,
 *       // expandedColumnGap) are ignored
 *     },
 *   }
 *
 * Dependencies:
 *   - LongSubtractionComponent must be loaded first (window.LongSubtractionComponent).
 */

(() => {
  if (typeof window === 'undefined' || !window.React) {
    console.warn('⚠️ StackSubtractionComponent: React not found on window');
    return;
  }

  const React = window.React;

  // Resolve LongSubtractionComponent at module load time. If not yet
  // available (script ordering), we fall back to runtime resolution inside
  // the render so a deferred load still works.
  const getLongSubtractionComponent = () =>
    window.LongSubtractionComponent && window.LongSubtractionComponent.LongSubtractionComponent;

  const StackSubtractionComponent = React.memo((props) => {
    const Long = getLongSubtractionComponent();
    if (!Long) {
      // Late-binding safety: render nothing if the parent component hasn't
      // loaded yet. Once it loads and React re-renders, this resolves.
      if (typeof console !== 'undefined') {
        console.warn(
          '⚠️ StackSubtractionComponent: LongSubtractionComponent is not loaded yet.'
        );
      }
      return null;
    }

    // Force simple variant; strip expanded-only props so they don't leak
    // through and confuse downstream code or debug overlays.
    const {
      variant: _variantIgnored,
      placeValueRow: _placeValueRowIgnored,
      rightBlock: _rightBlockIgnored,
      middleBlock: _middleBlockIgnored,
      expandedColumnGap: _expandedColumnGapIgnored,
      ...rest
    } = props || {};

    return React.createElement(Long, {
      ...rest,
      variant: 'simple',
    });
  });

  // Element configuration (default props for the registry).
  const StackSubtractionElement = {
    'stack-subtraction': {
      type: 'custom',
      coordinates: [10, 10, 90, 60],
      zIndex: 'var(--z-elevated)',
      props: {
        componentType: 'StackSubtractionComponent',
        numbers: [0, 0],
        operatorPosition: 'auto',
        mode: 'self',
        autoPlay: true,
        stepDurationMs: 700,
        placeLabelsI18nKey: 'common.longAddition.placeLabels',
        placeColorsI18nKey: 'common.longAddition.placeColors',
        convergeFlightDurationMs: 4000,
      },
    },
  };

  window.StackSubtractionComponent = {
    StackSubtractionComponent,
    StackSubtractionElement,
  };

  console.log('✅ StackSubtractionComponent loaded');
})();
