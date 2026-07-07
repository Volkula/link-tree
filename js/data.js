const LINKS = [
  {
    id: 'order',
    label: 'Крафт и 3D-печать на заказ',
    description: 'Напишите в личку — обсудим модель, печать и покрас',
    url: 'https://t.me/Volkula',
    icon: 'telegram',
  },
  {
    id: 'tg-channel',
    label: 'Канал мастерской',
    description: 'Берлогово в Telegram — процесс, работы и мысли',
    url: 'https://t.me/barklair',
    icon: 'telegram',
  },
  {
    id: 'tiktok',
    label: 'TikTok мастерской',
    description: 'Видео с 3D-печати, покраса, косплея и крафта',
    url: 'https://www.tiktok.com/@barklair',
    icon: 'tiktok',
  },
];

const PORTFOLIO = [
  {
    title: 'Litanies Generator',
    description:
      'Генератор литаний Warhammer 40k: библиотека текстов, слои, строгий ч/б экспорт 1024², имперские баннеры и 456 иконок фракций.',
    screenshot: 'assets/screenshots/litanies-generator.png',
    demo: 'https://litanies.volkula.com/',
    repo: 'https://github.com/Volkula/litanies-generator',
  },
  {
    title: 'Seal Generator',
    description:
      'Конвертер SVG → STL в браузере: 3D-превью, штампы и печати, библиотека WH40k-гербов, пакетный экспорт и inverse-режим.',
    screenshot: 'assets/screenshots/seal-generator.png',
    demo: 'https://volkula.github.io/seal-generator/',
    repo: 'https://github.com/Volkula/seal-generator',
  },
  {
    title: 'Stratagem Hero',
    description:
      'Браузерный тренажёр стратагем Helldivers 2: настраиваемые режимы, киоск, инвазии фракций, редактор и финальные экраны с QR.',
    screenshot: 'assets/screenshots/strategem-hero.png',
    demo: 'https://volkula.github.io/strategem-hero/',
    repo: 'https://github.com/Volkula/strategem-hero',
  },
];

const ICONS = {
  telegram: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
  tiktok: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.5a8.18 8.18 0 004.78 1.52V6.56a4.85 4.85 0 01-1.01-.87z"/></svg>`,
};
