
/* RMF Soluções Prediais
   Abertura cinematográfica — duração total: 4 segundos
   Sem dependências externas
*/
(() => {
  'use strict';

  const root = document.getElementById('introScreen');
  if (!root) return;

  const canvas = document.getElementById('introCanvas');
  const ctx = canvas?.getContext('2d');

  const hero = document.querySelector('.hero-section');
  const reduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const INTRO_DURATION = 3100;
  const EXIT_DURATION = 900;

  let closed = false;
  let raf = 0;
  let start = performance.now();
  let W = 0;
  let H = 0;
  let dpr = 1;

  const pointer = { x: 0, y: 0 };
  const timers = [];

  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }

  function resize() {
    if (!ctx || !canvas) return;

    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function gear(x, y, r, n, rot, shade) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    ctx.shadowColor = '#ff6900';
    ctx.shadowBlur = shade ? 15 : 6;

    const points = n * 4;
    ctx.beginPath();

    for (let i = 0; i < points; i++) {
      const a = i * 2 * Math.PI / points;
      const rr = (i % 4 === 0 || i % 4 === 3)
        ? r * 1.14
        : r;

      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.closePath();

    const grad = ctx.createLinearGradient(-r, -r, r, r);
    grad.addColorStop(0, '#aeb5be');
    grad.addColorStop(0.27, '#343d47');
    grad.addColorStop(0.55, '#101821');
    grad.addColorStop(0.8, '#87919c');
    grad.addColorStop(1, '#1a222b');

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,126,21,.85)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, r * 0.73, 0, Math.PI * 2);
    ctx.fillStyle = '#0a1016';
    ctx.fill();

    ctx.strokeStyle = '#e0a05b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = '#6c7a89';
    ctx.lineWidth = r * 0.15;

    for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
      ctx.beginPath();
      ctx.moveTo(
        Math.cos(a) * r * 0.19,
        Math.sin(a) * r * 0.19
      );
      ctx.lineTo(
        Math.cos(a) * r * 0.63,
        Math.sin(a) * r * 0.63
      );
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0, 0, r * 0.17, 0, Math.PI * 2);
    ctx.fillStyle = '#ff7900';
    ctx.shadowBlur = 17;
    ctx.shadowColor = '#ff6900';
    ctx.fill();

    ctx.restore();
  }

  function render(t) {
    if (closed) return;

    const elapsed = (t - start) / 1000;

    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(
      W * 0.57, H * 0.48, 20,
      W * 0.57, H * 0.48,
      Math.max(W, H) * 0.78
    );

    bg.addColorStop(0, '#1b252e');
    bg.addColorStop(0.48, '#0b1016');
    bg.addColorStop(1, '#050608');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const shift = pointer.x * 18;
    const sy = pointer.y * 13;

    const cx = W * (W < 800 ? 0.52 : 0.67) + shift;
    const cy = H * 0.48 + sy;

    const scale = Math.min(W, H) / 850;
    const rr = Math.max(95, Math.min(240, 210 * scale));

    // Grade técnica industrial
    ctx.save();
    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = '#ff7300';
    ctx.lineWidth = 0.6;

    const step = Math.max(34, W / 32);

    for (let x = 0; x < W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    for (let y = 0; y < H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    ctx.restore();

    // Anéis tecnológicos
    ctx.save();
    ctx.translate(cx, cy);

    for (let j = 0; j < 3; j++) {
      const angle =
        j * 0.7 +
        t * 0.00012 * (j % 2 ? 1 : -1);

      ctx.beginPath();
      ctx.arc(
        0, 0,
        rr * (1.5 + j * 0.24),
        angle,
        angle + Math.PI * 1.36
      );

      ctx.strokeStyle =
        `rgba(255,115,0,${0.4 - j * 0.1})`;

      ctx.lineWidth = j ? 1.5 : 3;
      ctx.stroke();
    }

    ctx.restore();

    // Engrenagens sincronizadas
    gear(cx, cy, rr, 14, elapsed * 0.21, true);

    gear(
      cx + rr * 1.42,
      cy - rr * 0.4,
      rr * 0.52,
      10,
      -elapsed * 0.4,
      false
    );

    gear(
      cx - rr * 1.35,
      cy + rr * 0.58,
      rr * 0.47,
      9,
      -elapsed * 0.44,
      false
    );

    // Partículas luminosas
    for (let i = 0; i < 38; i++) {
      const x =
        (i * 193.17 + t * 0.008 * (i % 3 + 1)) %
        (W + 40);

      const y =
        (i * 79.61 + Math.sin(t * 0.0005 + i) * 15) %
        H;

      ctx.fillStyle =
        `rgba(255,137,24,${0.12 + (i % 4) * 0.07})`;

      const size = i % 3 === 0 ? 2 : 1;
      ctx.fillRect(x, y, size, size);
    }

    raf = requestAnimationFrame(render);
  }

  function finish() {
    if (closed) return;

    closed = true;

    root.classList.add('is-leaving');
    hero?.classList.add('rmf-hero-arrived');

    try {
      sessionStorage.setItem('rmfIntroSeen', '1');
    } catch (e) {
      // Continua normalmente se o armazenamento estiver bloqueado.
    }

    timers.forEach(clearTimeout);
    cancelAnimationFrame(raf);

    setTimeout(() => {
      root.remove();
    }, EXIT_DURATION);
  }

  const skip = document.getElementById('introSkip');
  const enter = document.getElementById('introEnter');

  skip?.addEventListener('click', finish);
  enter?.addEventListener('click', finish);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !closed) finish();
  });

  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let introSeen = false;

  try {
    introSeen =
      sessionStorage.getItem('rmfIntroSeen') === '1';
  } catch (e) {
    introSeen = false;
  }

  if (reduced || introSeen || !ctx) {
    root.remove();
    hero?.classList.add('rmf-hero-arrived');
    return;
  }

  resize();

  window.addEventListener('resize', resize, {
    passive: true
  });

  root.classList.add('is-playing');

  start = performance.now();
  raf = requestAnimationFrame(render);

  const progress = document.getElementById('introProgress');
  const percent = document.getElementById('introPercent');

  // Progresso da apresentação, não do download.
  function updateSequence(now) {
    if (closed) return;

    const p = Math.min(
      100,
      Math.round(
        ((now - start) / INTRO_DURATION) * 100
      )
    );

    if (progress) {
      progress.style.width = p + '%';
    }

    if (percent) {
      percent.textContent =
        p < 100
          ? `APRESENTAÇÃO ${p}%`
          : 'ENTRANDO NO SITE';
    }

    requestAnimationFrame(updateSequence);
  }

  requestAnimationFrame(updateSequence);

  // Revelação progressiva acelerada
  schedule(() => root.classList.add('show-brand'), 200);

  schedule(() => root.classList.add('show-headline'), 650);

  schedule(() => root.classList.add('show-details'), 1150);

  schedule(() => root.classList.add('show-actions'), 1750);

  // Inicia a saída aos 3,1 segundos.
  // Transição final de 0,9 segundo.
  // Total: aproximadamente 4 segundos.
  schedule(finish, INTRO_DURATION);

})();
