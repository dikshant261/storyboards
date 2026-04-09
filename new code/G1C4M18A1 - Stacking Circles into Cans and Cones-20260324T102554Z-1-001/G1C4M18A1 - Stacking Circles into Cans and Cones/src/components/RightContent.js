function RightContent() {
  const [shape, setShape] = React.useState(null); // start idle
  const [replayId, setReplayId] = React.useState(0);
  const stackRef = React.useRef(null);
  const holderRef = React.useRef(null);

  // animation control
  const rafRef = React.useRef(null);
  const animIdRef = React.useRef(0);
  const shapeRef = React.useRef(null);

  React.useEffect(() => {
    let lastShape = null;
    let lastTime = 0;

    const onPick = (e) => {
      const s = e.detail?.shape || null;
      const now = Date.now();

      // prevent double click same shape within 300ms
      if (s === lastShape && now - lastTime < 300) return;

      // if user re-clicks the same shape after debounce, trigger a rebuild
      if (s === lastShape) {
        cancel();
        if (stackRef.current) stackRef.current.innerHTML = '';
        setReplayId((r) => r + 1);
      }

      lastShape = s;
      lastTime = now;

      shapeRef.current = s;
      setShape(s);

      cancel();
      if (stackRef.current) stackRef.current.innerHTML = '';
    };

    window.addEventListener('shape:select', onPick);
    return () => window.removeEventListener('shape:select', onPick);
  }, []);

  // Build stack after shape changes
  React.useEffect(() => {
    if (!shape) return;
    cancel();
    const timeout = setTimeout(() => {
      buildAndAnimate(shape);
    }, 10);
    return () => clearTimeout(timeout);
  }, [shape, replayId]);

  React.useEffect(() => {
    const onResize = () => {
      cancel();
      if (shapeRef.current) buildAndAnimate(shapeRef.current);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ---------- helpers -------------------------------------------------------
  function cancel() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    animIdRef.current++;
  }

  function getScale() {
    const holder = holderRef.current;
    const w = holder?.clientWidth || 0;
    const h = holder?.clientHeight || 0;
    const u = Math.max(1, Math.min(w, h));
    return {
      u,
      perspective: Math.round(h * 6),
      // keep tight stacking (reduced Z-step)
      step: Math.max(2, Math.round(h * 0.015)),
      circle: Math.round(u * 0.52),
      // ⬇️ make cone apex sharp: final radius → 0 (diameter → 0)
      minCircle: 0,
      square: Math.round(u * 0.54),
      rectW: Math.round(u * 0.72),
      rectH: Math.round(u * 0.36),
      triBase: Math.round(u * 0.35),
      triHeight: Math.round(u * 0.52),
    };
  }

  function setRotation(node, x, y, z) {
    node.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  }

  function enableDrag(surface, stack) {
    if (!surface) return;
    let drag = false,
      sx = 0,
      sy = 0,
      rx = 58,
      ry = 0,
      rz = 140;

    surface.onmousedown = (e) => {
      drag = true;
      sx = e.clientX;
      sy = e.clientY;
      e.preventDefault();
    };
    window.onmousemove = (e) => {
      if (!drag) return;
      const dx = e.clientX - sx,
        dy = e.clientY - sy;
      ry += dx * 0.4;
      rx -= dy * 0.4;
      setRotation(stack, rx, ry, rz);
      sx = e.clientX;
      sy = e.clientY;
    };
    window.onmouseup = () => (drag = false);
  }

  function addSlice(stack, s, z, sc, i, max) {
    const el = document.createElement('div');
    Object.assign(el.style, baseSliceStyle(s, z, sc, i, max));
    stack.appendChild(el);
  }

  function baseSliceStyle(s, z, sc, i = 0, max = 1) {
    const common = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%,-50%) translateZ(${z}px)`,
      boxShadow: '0 .6vh 1.2vh rgba(0,0,0,.35)',
      // thinner border avoids hairlines when tightly stacked
      border: '.2vh solid rgba(255,255,255,.9)',
    };

    // equal / decreasing -> circles only (cylinder / cone)
    if (s === 'equal' || s === 'decreasing') {
      const t = max > 0 ? i / max : 0;
      // Cylinder: constant diameter; Cone: linearly to 0 at apex
      const sizePx =
        s === 'equal'
          ? sc.circle
          : Math.max(
              0,
              Math.round(sc.minCircle + (sc.circle - sc.minCircle) * (1 - t))
            );

      return Object.assign({}, common, {
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        borderRadius: '50%',
        background:
          s === 'equal'
            ? 'radial-gradient(circle at 50% 40%, #9ad0ff 0%, #60a9e8 60%, #4c84c9 85%)'
            : 'radial-gradient(circle at 50% 40%, #ffd3a1 0%, #f7a76c 60%, #dc8743 85%)',
      });
    }

    // ---- fallbacks (kept intact in case other shapes are reused) ----
    if (s === 'circle') {
      const size = `${sc.circle}px`;
      return Object.assign({}, common, {
        width: size,
        height: size,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 50% 40%, #9ad0ff 0%, #60a9e8 60%, #4c84c9 85%)',
      });
    }
    if (s === 'triangle') {
      return {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%,-50%) translateZ(${z}px)`,
        width: 0,
        height: 0,
        borderLeft: `${sc.triBase}px solid transparent`,
        borderRight: `${sc.triBase}px solid transparent`,
        borderBottom: `${sc.triHeight}px solid #f7a76c`,
        filter: 'drop-shadow(0 .6vh .9vh rgba(0,0,0,.35))',
      };
    }
    if (s === 'square') {
      return Object.assign({}, common, {
        width: `${sc.square}px`,
        height: `${sc.square}px`,
        background:
          'linear-gradient(180deg, #ff9dad 0%, #ff7d93 55%, #d86478 100%)',
      });
    }
    return Object.assign({}, common, {
      width: `${sc.rectW}px`,
      height: `${sc.rectH}px`,
      background:
        'linear-gradient(180deg, #c9b2f2 0%, #b797ea 65%, #9a7ed8 100%)',
    });
  }

  function buildAndAnimate(s) {
    cancel();
    const stack = stackRef.current;
    const holder = holderRef.current;
    if (!stack || !holder) return;

    const scale = getScale();
    stack.innerHTML = '';
    holder.style.perspective = `${scale.perspective}px`;
    setRotation(stack, 58, 0, 140);
    enableDrag(holder, stack);

    const myId = ++animIdRef.current;
    let i = 0,
      // ⬇️ reduce total slices by ~10% (was 40 → now 36)
      max = 36,
      last = 0;

    function tick(ts) {
      if (myId !== animIdRef.current) return;
      if (!last || ts - last >= 35) {
        addSlice(stack, s, i * scale.step, scale, i, max);
        last = ts;
        i++;
      }
      if (i <= max) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  // ------------------ Text from data.js (i18n) ------------------
  const title = t('right.title');
  const idleCaption = t('right.hints.idle');
  const label = shape ? t(`right.captions.${shape}`) : '';
  const hint = shape ? t(`right.hints.${shape}`) : '';

  const isIdle = !shape;

  return React.createElement(
    React.Fragment,
    null,
    // Title bar
    React.createElement(
      'div',
      { className: 'titleBar' },
      React.createElement('p', null, title)
    ),
    // Interaction area
    React.createElement(
      'div',
      { className: 'interaction-area' },
      React.createElement(
        'div',
        {
          className: 'stack-holder',
          ref: holderRef,
          style: {
            background: isIdle ? 'black' : 'transparent',
            borderRadius: '2.4vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          },
        },
        isIdle
          ? React.createElement(
              'p',
              {
                style: {
                  color: '#ffffff',
                  fontSize: 'calc(1.6vw + 1.6vh)',
                  fontWeight: 600,
                  opacity: 0.9,
                  textAlign: 'center',
                },
              },
              idleCaption
            )
          : React.createElement('div', {
              className: 'stack',
              ref: stackRef,
              role: 'img',
              'aria-label': '3D stack preview',
            })
      )
    ),
    // Caption
    React.createElement(
      'div',
      { className: 'caption' },
      isIdle
        ? null
        : React.createElement(
            React.Fragment,
            null,
            React.createElement('span', { className: 'accent' }, label),
            hint
          )
    )
  );
}
