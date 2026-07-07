const ICONS = {
  telegram: '<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
  tiktok: '<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.5a8.18 8.18 0 004.78 1.52V6.56a4.85 4.85 0 01-1.01-.87z"/></svg>',
};

const APP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 20h8M12 18v2"/><path d="M7 9l3 3-3 3M12 15h5"/></svg>';
const AVATAR_ICON = '<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="58" stroke="currentColor" stroke-width="2" opacity="0.35"/><path d="M38 78c4-18 14-28 22-28s18 10 22 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="46" cy="52" r="4" fill="currentColor"/><circle cx="74" cy="52" r="4" fill="currentColor"/><path d="M28 42c8-16 24-24 32-24s24 8 32 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/></svg>';

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

function sectionHeader(heading, subheading) {
  const head = document.createElement('div');
  head.className = 'section-head';
  head.innerHTML = `<h2>${heading || ''}</h2><p>${subheading || ''}</p>`;
  return head;
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
    if (ok) modal.showModal();
    else window.open(url, '_blank', 'noopener,noreferrer');
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
  main.innerHTML = `<div class="link-card-label">${ICONS[link.icon] || ''}<span>${link.label}</span></div><p class="link-card-desc">${link.description || ''}</p>`;

  const actions = document.createElement('div');
  actions.className = 'link-card-actions';
  const qrText = document.createElement('span');
  qrText.className = 'qr-label';
  qrText.textContent = 'QR';

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

  actions.append(qrBtn, qrText);
  card.append(main, actions);
  return card;
}

function renderLinksSection(config) {
  const section = document.createElement('section');
  section.className = 'section';
  section.appendChild(sectionHeader(config.heading, config.subheading));
  const grid = document.createElement('div');
  grid.className = 'link-grid';
  (config.items || []).forEach((item) => grid.appendChild(buildLinkCard(item)));
  section.appendChild(grid);
  return section;
}

function buildPortfolioCard(item) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.innerHTML = `<img class="portfolio-shot" src="${item.screenshot}" alt="Скриншот ${item.title}" loading="lazy" width="1280" height="800"><div class="portfolio-body"><h3>${item.title}</h3><p>${item.description || ''}</p><div class="portfolio-links"><a href="${item.demo}" target="_blank" rel="noopener noreferrer">Открыть</a><a href="${item.repo}" target="_blank" rel="noopener noreferrer">GitHub</a></div></div>`;
  return card;
}

function renderAppsSection(config) {
  const section = document.createElement('section');
  section.className = 'section section-apps';
  section.appendChild(sectionHeader(config.heading, config.subheading));

  if (config.banner) {
    const banner = document.createElement('div');
    banner.className = 'apps-banner';
    banner.innerHTML = `<div class="apps-banner-icon" aria-hidden="true">${APP_ICON}</div><div><h3>${config.banner.title || ''}</h3><p>${config.banner.description || ''}</p><a class="cta" href="${config.banner.ctaUrl}" target="_blank" rel="noopener noreferrer">${config.banner.ctaLabel || 'Написать'}</a></div>`;
    section.appendChild(banner);
  }

  const grid = document.createElement('div');
  grid.className = 'portfolio-grid';
  (config.projects || []).forEach((project) => grid.appendChild(buildPortfolioCard(project)));
  section.appendChild(grid);
  return section;
}

function renderUnknownSection(config) {
  const section = document.createElement('section');
  section.className = 'section';
  section.appendChild(sectionHeader(config.heading || 'Раздел', config.subheading || ''));
  const p = document.createElement('p');
  p.className = 'tagline';
  p.textContent = `Тип секции "${config.type}" пока не поддерживается.`;
  section.appendChild(p);
  return section;
}

function renderSection(config) {
  if (config.type === 'links') return renderLinksSection(config);
  if (config.type === 'apps') return renderAppsSection(config);
  return renderUnknownSection(config);
}

function applySeo(seo) {
  if (!seo) return;
  const by = (selector) => document.querySelector(selector);
  document.title = seo.title || document.title;
  const desc = by('meta[name="description"]');
  if (desc && seo.description) desc.setAttribute('content', seo.description);
  const ogTitle = by('meta[property="og:title"]');
  if (ogTitle && seo.ogTitle) ogTitle.setAttribute('content', seo.ogTitle);
  const ogDescription = by('meta[property="og:description"]');
  if (ogDescription && seo.ogDescription) ogDescription.setAttribute('content', seo.ogDescription);
  const ogUrl = by('meta[property="og:url"]');
  if (ogUrl && seo.canonicalUrl) ogUrl.setAttribute('content', seo.canonicalUrl);
  const canonical = by('link[rel="canonical"]');
  if (canonical && seo.canonicalUrl) canonical.setAttribute('href', seo.canonicalUrl);
}

async function loadConfig() {
  const response = await fetch('content/site.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load content/site.json');
  return response.json();
}

function renderPage(config) {
  const app = document.getElementById('app');
  if (!app) return;
  applySeo(config.seo);

  const hero = document.createElement('header');
  hero.className = 'hero';
  hero.innerHTML = `<div class="avatar" aria-hidden="true">${AVATAR_ICON}</div><p class="eyebrow">${config.hero?.eyebrow || ''}</p><h1>${config.hero?.title || ''}</h1><p class="tagline">${config.hero?.tagline || ''}</p><p class="handle">${config.hero?.handle || ''}</p>`;
  app.appendChild(hero);

  (config.sections || []).forEach((section) => app.appendChild(renderSection(section)));

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `<p><span class="footer-brand">${config.footer?.brand || ''}</span> — ${config.footer?.line1 || ''}</p><p class="footer-note">${config.footer?.line2 || ''}</p>`;
  app.appendChild(footer);
}

function bindModalEvents() {
  const modal = document.getElementById('qr-modal');
  if (!modal) return;
  modal.querySelector('.qr-modal-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

async function init() {
  bindModalEvents();
  try {
    const config = await loadConfig();
    renderPage(config);
  } catch (error) {
    const app = document.getElementById('app');
    if (app) app.innerHTML = '<p class="tagline">Не удалось загрузить контент сайта. Проверьте content/site.json.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
