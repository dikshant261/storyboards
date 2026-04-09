function LeftContent() {
  const [active, setActive] = React.useState(null);
  const play = window.AudioBus && AudioBus.play ? AudioBus.play : () => {};

  const select = (shape) => {
    setActive(shape);
    play('click');
    window.dispatchEvent(
      new CustomEvent('shape:select', { detail: { shape } })
    );
  };

  // Small helper to render the horizontal preview row
  function CircleRow({ kind }) {
    const wrapStyle = {
      width: '100%',
      height: '40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 3%',
      boxSizing: 'border-box',
    };

    // 🎨 set border colors to match RightContent colors
    const stroke =
      kind === 'equal'
        ? '#60a9e8' // blue for cylinder
        : '#f7a76c'; // orange for cone

    const base = [20, 20, 20, 20, 20]; // equal size circles
    const dec = [28, 22, 18, 12, 6]; // decreasing circles, sharper taper
    const sizes = kind === 'equal' ? base : dec;

    return React.createElement(
      'div',
      { style: wrapStyle, 'aria-hidden': true },
      sizes.map((s, i) =>
        React.createElement('div', {
          key: i,
          style: {
            width: `${s}%`,
            aspectRatio: '1/1',
            borderRadius: '50%',
            border: `0.9vh solid ${stroke}`,
            background: 'transparent',
            opacity: 0.95,
            boxSizing: 'border-box',
          },
        })
      )
    );
  }

  const tile = (shape, label, ariaLabel) => {
    const isActive = active === shape;
    return React.createElement(
      'button',
      {
        className: 'shape-card',
        'data-shape': shape,
        'aria-label': ariaLabel,
        onClick: () => select(shape),
        style: {
          width: '88%',
          aspectRatio: '2.1 / 1',
          borderRadius: '3.2vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '1.6vh',
          padding: '2.2vh 1.8vh',
          cursor: 'pointer',
          transition:
            'transform .18s ease, box-shadow .18s ease, background .18s ease',
          background: isActive
            ? 'linear-gradient(180deg, rgba(96,169,232,0.35) 0%, rgba(30,40,64,0.55) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.22) 100%)',
          boxShadow: isActive
            ? 'inset 0 0 2.2vh rgba(120,201,255,0.35), 0 1.2vh 2.4vh rgba(0,0,0,.35)'
            : 'inset 0 0 1.6vh rgba(255,255,255,0.06), 0 1.2vh 2.4vh rgba(0,0,0,.25)',
          border: '0.35vh solid rgba(120,201,255,0.25)',
          transform: isActive ? 'translateY(-0.2vh)' : 'translateY(0)',
          color: '#ffffff',
          textShadow: '0 0.4vh 0.8vh rgba(0,0,0,0.35)',
          position: 'relative',
        },
      },
      React.createElement('div', {
        style: {
          position: 'absolute',
          inset: 0,
          borderRadius: '3.2vh',
          background:
            'radial-gradient(120% 100% at 0% 0%, rgba(120,201,255,0.12), rgba(120,201,255,0) 60%)',
          pointerEvents: 'none',
        },
      }),
      // top half: circle row
      React.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: '55%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        React.createElement(CircleRow, { kind: shape })
      ),
      // bottom label
      React.createElement(
        'div',
        {
          style: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        React.createElement(
          'span',
          {
            style: {
              fontSize: 'calc(1.05vw + 1.05vh)',
              fontWeight: 800,
              letterSpacing: '.02em',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.1,
            },
          },
          label
        )
      )
    );
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'contentBody', style: { gap: '2.2vh' } },
      tile('equal', t('left.equalButton'), t('aria.selectEqual')),
      tile('decreasing', t('left.decreasingButton'), t('aria.selectDecreasing'))
    )
  );
}
