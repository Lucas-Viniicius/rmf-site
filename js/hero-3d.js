/* ==========================================================================
   RMF SOLUÇÕES PREDIAIS - CANVAS 3D DA ENGRENAGEM TECNOLÓGICA INTERATIVA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('rmfLogo3DCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Ajusta resolução do canvas
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Parâmetros de rotação 3D e inércia
  let rotX = 0.3;
  let rotY = 0.4;
  let rotZ = 0;
  
  let targetRotX = 0.3;
  let targetRotY = 0.4;
  
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  // Interatividade com Mouse / Touch
  const handleStart = (x, y) => {
    isDragging = true;
    previousMousePosition = { x, y };
  };

  const handleMove = (x, y) => {
    if (!isDragging) return;
    const deltaX = x - previousMousePosition.x;
    const deltaY = y - previousMousePosition.y;

    targetRotY += deltaX * 0.01;
    targetRotX += deltaY * 0.01;

    previousMousePosition = { x, y };
  };

  const handleEnd = () => {
    isDragging = false;
  };

  canvas.addEventListener('mousedown', (e) => handleStart(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', handleEnd);

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) handleStart(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchend', handleEnd);

  // Estrutura 3D da Engrenagem com circuitos
  const gearRadius = 110;
  const numTeeth = 8;
  const toothDepth = 22;
  const numLayers = 12; // Profundidade 3D

  // Rotação matemática de ponto 3D
  function project(x, y, z) {
    // Rotação X
    let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
    let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
    
    // Rotação Y
    let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
    let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

    const fov = 400;
    const scale = fov / (fov + z2 + 200);

    return {
      x: canvas.width / 2 + x2 * scale,
      y: canvas.height / 2 + y1 * scale,
      scale: scale,
      z: z2
    };
  }

  // Loop de Renderização 60FPS
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Suavização de Rotação (Inércia)
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;

    // Rotação automática suave contínua quando não arrastado
    if (!isDragging) {
      targetRotY += 0.005;
    }

    // Desenha efeito de Glow de fundo
    const center = project(0, 0, 0);
    const grad = ctx.createRadialGradient(center.x, center.y, 10, center.x, center.y, 180);
    grad.addColorStop(0, 'rgba(255, 105, 0, 0.25)');
    grad.addColorStop(1, 'rgba(8, 8, 8, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 180, 0, Math.PI * 2);
    ctx.fill();

    // Renderiza camadas 3D (do fundo para a frente)
    for (let l = -numLayers; l <= numLayers; l += 2) {
      const zOffset = l * 1.5;

      // Desenha Dentes da Engrenagem
      ctx.beginPath();
      for (let i = 0; i < numTeeth; i++) {
        const angle = (i / numTeeth) * Math.PI * 2;
        const angleNext = ((i + 0.5) / numTeeth) * Math.PI * 2;

        const r1 = gearRadius;
        const r2 = gearRadius + toothDepth;

        const p1 = project(Math.cos(angle) * r1, Math.sin(angle) * r1, zOffset);
        const p2 = project(Math.cos(angle + 0.1) * r2, Math.sin(angle + 0.1) * r2, zOffset);
        const p3 = project(Math.cos(angleNext - 0.1) * r2, Math.sin(angleNext - 0.1) * r2, zOffset);
        const p4 = project(Math.cos(angleNext) * r1, Math.sin(angleNext) * r1, zOffset);

        if (i === 0) ctx.moveTo(p1.x, p1.y);
        else ctx.lineTo(p1.x, p1.y);
        
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
      }
      ctx.closePath();

      const alpha = 0.4 + (l + numLayers) / (numLayers * 3);
      ctx.strokeStyle = `rgba(255, 105, 0, ${alpha})`;
      ctx.lineWidth = 3 * project(0, 0, zOffset).scale;
      ctx.stroke();

      if (l === numLayers) {
        ctx.fillStyle = 'rgba(255, 138, 0, 0.2)';
        ctx.fill();
      }
    }

    // Desenha Anel Interno Tecnológico
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2; a += 0.1) {
      const r = gearRadius * 0.6;
      const pt = project(Math.cos(a) * r, Math.sin(a) * r, numLayers + 4);
      if (a === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#FF8A00';
    ctx.lineWidth = 4 * center.scale;
    ctx.stroke();

    // Desenha Linhas de Circuito Eletrônico Saindo da Engrenagem
    const circuits = [
      { angle: 0, len: 170 },
      { angle: Math.PI / 4, len: 150 },
      { angle: -Math.PI / 4, len: 160 }
    ];

    circuits.forEach(c => {
      const pStart = project(Math.cos(c.angle) * gearRadius, Math.sin(c.angle) * gearRadius, 0);
      const pEnd = project(Math.cos(c.angle) * c.len, Math.sin(c.angle) * c.len, 0);

      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.strokeStyle = '#FF6900';
      ctx.lineWidth = 2 * center.scale;
      ctx.stroke();

      // Esfera na ponta do circuito
      ctx.beginPath();
      ctx.arc(pEnd.x, pEnd.y, 5 * center.scale, 0, Math.PI * 2);
      ctx.fillStyle = '#FF8A00';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
});