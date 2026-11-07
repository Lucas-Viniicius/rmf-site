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
      copyBtnLabel.textContent = 'Copiat com sucesso! ✓';
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
  const submitBtnText = document.getElementById('submitBtnText');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // O formulário sempre entrega a solicitação no WhatsApp comercial.
      submitBtnText.textContent = 'Enviar Solicitação via WhatsApp';
    });
  });
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

      const numeroWhatsApp = '5581994251337';
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

      feedback.className = 'form-feedback success';
      feedback.textContent = 'Abrindo o WhatsApp da RMF com sua solicitação preenchida...';

      // Abrir imediatamente durante o clique do usuário evita o bloqueio de pop-ups
      // causado por window.open dentro de setTimeout.
      const whatsappWindow = window.open(url, '_blank');

      // Se o navegador bloquear a nova aba, redireciona a própria página.
      if (!whatsappWindow) {
        window.location.href = url;
      }
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