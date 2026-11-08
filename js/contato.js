/* ==========================================================================
   RMF SOLUÇÕES PREDIAIS - CONTATO & INTERATIVIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCopyEmail();
  initSendMethodTabs();
  initFormProgress();
  initContactForm();
  initFaqAccordion();
});

/* --- COPIAR E-MAIL COM UM CLIQUE --- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnLabel = document.getElementById('copyBtnLabel');
  const emailText = document.getElementById('emailText');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
      copyBtnLabel.textContent = 'Copiado com sucesso! ✓';
      copyBtn.style.borderColor = '#25D366';
      copyBtn.style.color = '#25D366';

      setTimeout(() => {
        copyBtnLabel.textContent = 'Copiar E-mail';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 3000);
    });
  });
}

/* --- ALTERNADOR DE MÉTODOS DE ENVIO (WHATSAPP vs E-MAIL) --- */
function initSendMethodTabs() {
  const tabs = document.querySelectorAll('.method-tab');
  const label = document.getElementById('submitBtnText');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-pressed', String(t === tab)); });
    if (label) label.textContent = tab.dataset.method === 'email' ? 'Preparar e-mail de orçamento' : 'Preparar mensagem no WhatsApp';
  }));
}

/* --- BARRA DE PROGRESSO DE PREENCHIMENTO DO FORMULÁRIO --- */
function initFormProgress() {
  const form = document.getElementById('contactForm');
  const progressFill = document.getElementById('formProgressFill');

  if (!form || !progressFill) return;

  const requiredInputs = form.querySelectorAll('[required]');

  const updateProgress = () => {
    let filled = 0;
    requiredInputs.forEach(input => {
      if (input.value.trim() !== '') {
        filled++;
      }
    });

    const percent = (filled / requiredInputs.length) * 100;
    progressFill.style.width = `${percent}%`;
  };

  form.addEventListener('input', updateProgress);
  form.addEventListener('change', updateProgress);
}

/* --- LÓGICA E ENVIOS DO FORMULÁRIO --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const localizacao = document.getElementById('localizacao').value.trim();
    const porteRadio = document.querySelector('input[name="porte"]:checked');
    const porte = porteRadio ? porteRadio.value : 'Não informado';
    const mensagem = document.getElementById('mensagem').value.trim();

    const textoWhatsApp =
`*SOLICITAÇÃO DE ORÇAMENTO - RMF SOLUÇÕES PREDIAIS*
-----------------------------------------------
📌 *Nome:* ${nome}
🏢 *Empresa:* ${empresa || 'Não informada'}
📧 *E-mail:* ${email}
📱 *Telefone:* ${telefone}
🔧 *Serviço Desejado:* ${servico}
📍 *Local do Projeto:* ${localizacao}
📏 *Porte Estimado:* ${porte}

📝 *Descrição da Necessidade:*
${mensagem}`;

      const method = document.querySelector('.method-tab.active')?.dataset.method || 'whatsapp';
      if (method === 'email') {
        const assunto = encodeURIComponent('Solicitação de orçamento — RMF Soluções Prediais');
        const body = encodeURIComponent(textoWhatsApp.replace(/\*/g, ''));
        feedback.className = 'form-feedback success';
        feedback.textContent = 'Abrindo seu aplicativo de e-mail. Confirme o envio nele.';
        window.location.href = `mailto:contato@rmfsolucoesprediais.com?subject=${assunto}&body=${body}`;
        return;
      }
      const url = `https://wa.me/5581994251337?text=${encodeURIComponent(textoWhatsApp)}`;
      feedback.className = 'form-feedback success';
      feedback.innerHTML = 'Mensagem preparada. <strong>Confirme o envio no WhatsApp.</strong> <a target="_blank" rel="noopener noreferrer" href="' + url + '">Abrir novamente</a>';
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) feedback.textContent = 'Mensagem pronta. Use o link do WhatsApp acima para abrir e confirmar o envio.';
  });
}

/* --- ACCORDION DE DÚVIDAS FREQUENTES (FAQ) --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha os outros
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}