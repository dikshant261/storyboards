/**
 * StackAdditionComponent
 * ──────────────────────
 * A thin wrapper around LongAdditionComponent that forces `variant: 'simple'`
 * so the widget renders ONLY the stacked column-addition view (header,
 * operands, divider, sum) WITHOUT the right-side place-value
 * decomposition panel.
 *
 * In effect: "stack" = "long without the expanded panel".
 *
 * Everything else — interactive types, scripted engine, carry row,
 * split-carry animations — works identically, but lives on the simple panel
 * only. Scripts that target `expanded:*` cells will have no visible effect.
 *
 * Drop-in wiring (PageConfig):
 *   {
 *     id: 'my-stack-addition',
 *     type: 'custom',
 *     coordinates: [400, 100, 1550, 790],
 *     props: {
 *       componentType: 'StackAdditionComponent',
 *       numbers: [4567, 1289],
 *       // variant is forced to 'simple' — do not set it here
 *       // expanded-only props (placeValueRow, rightBlock, middleBlock,
 *       // expandedColumnGap) are ignored
 *     },
 *   }
 *
 * Dependencies:
 *   - LongAdditionComponent must be loaded first (window.LongAdditionComponent).
 */

(() => {
  if (typeof window === 'undefined' || !window.React) {
    console.warn('⚠️ StackAdditionComponent: React not found on window');
    return;
  }

  const React = window.React;

  const getLongAdditionComponent = () =>
    window.LongAdditionComponent && window.LongAdditionComponent.LongAdditionComponent;

  const StackAdditionComponent = React.memo((props) => {
    const Long = getLongAdditionComponent();
    if (!Long) {
      if (typeof console !== 'undefined') {
        console.warn(
          '⚠️ StackAdditionComponent: LongAdditionComponent is not loaded yet.'
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

  const StackAdditionElement = {
    'stack-addition': {
      type: 'custom',
      coordinates: [10, 10, 90, 60],
      zIndex: 'var(--z-elevated)',
      props: {
        componentType: 'StackAdditionComponent',
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

  window.StackAdditionComponent = {
    StackAdditionComponent,
    StackAdditionElement,
  };

  console.log('✅ StackAdditionComponent loaded');
})();
