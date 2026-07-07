function hasQrSupport() {
  return typeof QRCode !== 'undefined' && typeof QRCode.toCanvas === 'function';
}

function renderQr(canvas, url, size) {
  if (!hasQrSupport()) return Promise.resolve(false);
  return QRCode.toCanvas(canvas, url, {
    width: size,
    margin: 1,
    color: { dark: '#1a1208', light: '#ffffff' },
  }).then(() => true).catch(() => false);
}

function openQrModal(label, url) {
  const modal = document.getElementById('qr-modal');
  const body = document.getElementById('qr-modal-body');
  const title = document.getElementById('qr-modal-title');
  const urlEl = document.getElementById('qr-modal-url');

  title.textContent = label;
  urlEl.textContent = url;
  body.replaceChildren();

  const canvas = document.createElement('canvas');
  body.appendChild(canvas);
  renderQr(canvas, url, 240).then((ok) => {
    if (ok) {
      modal.showModal();
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

function buildLinkCard(link) {
  const card = document.createElement('a');
  card.className = 'link-card';
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';

  const main = document.createElement('div');
  main.className = 'link-card-main';

  const label = document.createElement('div');
  label.className = 'link-card-label';
  label.innerHTML = `${ICONS[link.icon] || ''}<span>${link.label}</span>`;

  const desc = document.createElement('p');
  desc.className = 'link-card-desc';
  desc.textContent = link.description;

  main.append(label, desc);

  const actions = document.createElement('div');
  actions.className = 'link-card-actions';

  const qrBtn = document.createElement('button');
  qrBtn.type = 'button';
  qrBtn.className = 'qr-thumb';
  qrBtn.setAttribute('aria-label', `QR-код: ${link.label}`);
  const qrCanvas = document.createElement('canvas');
  qrBtn.appendChild(qrCanvas);
  renderQr(qrCanvas, link.url, 56).then((ok) => {
    if (!ok) {
      qrBtn.style.display = 'none';
      qrText.style.display = 'none';
    }
  });

  qrBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    openQrModal(link.label, link.url);
  });

  const qrText = document.createElement('span');
  qrText.className = 'qr-label';
  qrText.textContent = 'QR';

  actions.append(qrBtn, qrText);
  card.append(main, actions);
  return card;
}

function buildPortfolioCard(item) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';

  const img = document.createElement('img');
  img.className = 'portfolio-shot';
  img.src = item.screenshot;
  img.alt = `Скриншот ${item.title}`;
  img.loading = 'lazy';
  img.width = 1280;
  img.height = 800;

  const body = document.createElement('div');
  body.className = 'portfolio-body';

  const title = document.createElement('h3');
  title.textContent = item.title;

  const desc = document.createElement('p');
  desc.textContent = item.description;

  const links = document.createElement('div');
  links.className = 'portfolio-links';

  const demo = document.createElement('a');
  demo.href = item.demo;
  demo.target = '_blank';
  demo.rel = 'noopener noreferrer';
  demo.textContent = 'Открыть';

  const repo = document.createElement('a');
  repo.href = item.repo;
  repo.target = '_blank';
  repo.rel = 'noopener noreferrer';
  repo.textContent = 'GitHub';

  links.append(demo, repo);
  body.append(title, desc, links);
  card.append(img, body);
  return card;
}

function init() {
  const linkGrid = document.getElementById('link-grid');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const modal = document.getElementById('qr-modal');

  if (!Array.isArray(LINKS) || !Array.isArray(PORTFOLIO)) {
    return;
  }

  LINKS.forEach((link) => linkGrid.appendChild(buildLinkCard(link)));
  PORTFOLIO.forEach((item) => portfolioGrid.appendChild(buildPortfolioCard(item)));

  modal.querySelector('.qr-modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

document.addEventListener('DOMContentLoaded', init);
