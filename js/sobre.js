/* ==========================================================================
   RMF SOLUÇÕES PREDIAIS - SOBRE NÓS INTERATIVO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAnimatedCounters();
  initInteractiveTimeline();
});

/* --- CONTADORES NUMÉRICOS ANIMADOS --- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  let hasAnimated = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 2000; // 2 segundos
      const step = Math.ceil(target / (duration / 16));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 16);
    });
  };

  if (!('IntersectionObserver' in window)) {
    startCounters();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        startCounters();
      }
    });
  }, { threshold: 0.3 });

  const section = document.querySelector('.counters-section');
  if (section) observer.observe(section);
}

/* --- LINHA DO TEMPO INTERATIVA (SLIDER DE MARCOS) --- */
function initInteractiveTimeline() {
  const nodes = document.querySelectorAll('.t-node');
  const cards = document.querySelectorAll('.t-content-card');

  if (!nodes.length || !cards.length) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const index = node.getAttribute('data-index');

      // Atualiza botões
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Atualiza cards exibidos
      cards.forEach(card => {
        if (card.getAttribute('data-index') === index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
}