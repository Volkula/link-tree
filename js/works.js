async function fetchJson(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  const text = await response.text();
  return JSON.parse(text.replace(/^\uFEFF/, ''));
}

function createImageCard(image, index, title) {
  const src = typeof image === 'string' ? image : image.src;
  const alt = typeof image === 'string' ? `${title} — ${index + 1}` : (image.alt || `${title} — ${index + 1}`);
  const card = document.createElement('article');
  card.className = 'gallery-image-card';
  card.innerHTML = `<img class="gallery-image" src="${src}" alt="${alt}" loading="lazy"><a class="gallery-original-link" href="${src}" target="_blank" rel="noopener noreferrer">Посмотреть оригинал</a>`;
  return card;
}

function createGallerySection(gallery) {
  const section = document.createElement('section');
  section.className = 'section gallery-section';
  section.id = `gallery-${gallery.slug}`;
  section.innerHTML = `<div class="section-head"><div><h2>${gallery.title}</h2><p>${gallery.description || ''}</p></div></div>`;

  const content = document.createElement('div');
  content.className = 'section-content';
  const grid = document.createElement('div');
  grid.className = 'gallery-images-grid';
  (gallery.images || []).forEach((image, index) => grid.appendChild(createImageCard(image, index, gallery.title)));
  content.appendChild(grid);
  section.appendChild(content);
  return section;
}

function render(app, galleries) {
  const hash = (location.hash || '').replace('#', '').trim();
  const selected = hash ? galleries.find((g) => g.slug === hash) : null;
  const items = selected ? [selected] : galleries;

  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'tagline';
    empty.textContent = 'Галереи пока пусты. Добавьте изображения в assets/works/<slug>/.';
    app.appendChild(empty);
    return;
  }

  items.forEach((gallery) => app.appendChild(createGallerySection(gallery)));
}

async function init() {
  const app = document.getElementById('works-app');
  if (!app) return;
  try {
    const galleries = await fetchJson('content/work-galleries.json');
    render(app, galleries);
  } catch {
    const msg = document.createElement('p');
    msg.className = 'tagline';
    msg.textContent = 'Не удалось загрузить галереи. Проверьте content/work-galleries.json.';
    app.appendChild(msg);
  }
}

document.addEventListener('DOMContentLoaded', init);
