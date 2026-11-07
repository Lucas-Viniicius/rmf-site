/* ==========================================================================
   RMF SOLUÇÕES PREDIAIS - PORTFOLIO INTERACTIVITY & MODAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioCounters();
  initPortfolioFilters();
  initPortfolioModal();
});

/* --- CALCULA E EXIBE A CONTAGEM DE PROJETOS EM CADA FILTRO --- */
function initPortfolioCounters() {
  const items = document.querySelectorAll('.portfolio-card');
  const countAll = document.getElementById('count-all');
  const countEstruturas = document.getElementById('count-estruturas');
  const countObras = document.getElementById('count-obras');
  const countManutencao = document.getElementById('count-manutencao');
  const countFachadas = document.getElementById('count-fachadas');

  if (!items.length) return;

  let total = items.length;
  let estruturas = 0;
  let obras = 0;
  let manutencao = 0;
  let fachadas = 0;

  items.forEach(item => {
    const cat = item.getAttribute('data-category');
    if (cat === 'estruturas') estruturas++;
    if (cat === 'obras') obras++;
    if (cat === 'manutencao') manutencao++;
    if (cat === 'fachadas') fachadas++;
  });

  if (countAll) countAll.textContent = total;
  if (countEstruturas) countEstruturas.textContent = estruturas;
  if (countObras) countObras.textContent = obras;
  if (countManutencao) countManutencao.textContent = manutencao;
  if (countFachadas) countFachadas.textContent = fachadas;
}

/* --- FILTRAGEM DINÂMICA DE CARDS --- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- GERENCIAMENTO DO MODAL DE DETALHES --- */
function initPortfolioModal() {
  const modal = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('modalImg');
  const modalBadgeCat = document.getElementById('modalBadgeCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalLocation = document.getElementById('modalLocation');
  const modalYear = document.getElementById('modalYear');
  const modalMetric = document.getElementById('modalMetric');
  const modalDesc = document.getElementById('modalDesc');
  const modalSolution = document.getElementById('modalSolution');
  const modalWaBtn = document.getElementById('modalWaBtn');
  const modalClose = document.getElementById('modalClose');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const client = card.getAttribute('data-client');
      const location = card.getAttribute('data-location');
      const year = card.getAttribute('data-year');
      const metric = card.getAttribute('data-metric');
      const desc = card.getAttribute('data-desc');
      const solution = card.getAttribute('data-solution');
      const cardImage = card.querySelector('.card-image-wrap img');
      const categoryText = card.querySelector('.category-badge').textContent;

      // Usa a mesma imagem exibida no card. Os caminhos antigos em data-img
      // apontavam para assets/projetos/, pasta que não existe neste projeto.
      modalImg.src = cardImage.currentSrc || cardImage.src;
      modalImg.alt = cardImage.alt || title;
      modalBadgeCat.textContent = categoryText;
      modalTitle.textContent = title;
      modalClient.textContent = client;
      modalLocation.textContent = location;
      modalYear.textContent = year;
      modalMetric.textContent = metric;
      modalDesc.textContent = desc;
      modalSolution.textContent = solution;

      // Link personalizado para o WhatsApp
      const msg = `Olá! Vi o projeto "${title}" no portfólio do site da RMF e gostaria de solicitar um orçamento similar para a minha empresa.`;
      modalWaBtn.href = `https://wa.me/5581994251337?text=${encodeURIComponent(msg)}`;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}