# link-tree

Персональная витрина мастерской **Берлогово** — аналог Linktree, хостинг на GitHub Pages.

**Сайт:** [volkula.github.io/link-tree](https://volkula.github.io/link-tree/)

## Что на странице

- Ссылки на заказ крафта/3D-печати, Telegram-канал и TikTok — с QR-кодами
- Блок «Приложения на заказ» с портфолио и скриншотами:
  - [Litanies Generator](https://github.com/Volkula/litanies-generator)
  - [Seal Generator](https://github.com/Volkula/seal-generator)
  - [Stratagem Hero](https://github.com/Volkula/strategem-hero)

## Контентный движок

Сайт работает как легкий JSON-driven движок:

- `index.html` — только каркас страницы
- `content/*.json` — контент по отдельным файлам
- `js/main.js` — универсальный рендерер секций

Поддерживаемые типы секций сейчас:

- `links` — список ссылок с QR
- `apps` — баннер + портфолио приложений
- `faq` — список вопросов/ответов

Добавлен UX для секций: каждый блок можно сворачивать/разворачивать, состояние сохраняется в `localStorage`.
Флаг свёрнутости задается в `content/sections.json`:

- `collapsedByDefault: true` (основной)
- также поддерживаются алиасы `collapsed` и `initiallyCollapsed`

## Локальный просмотр

```bash
# Python
python -m http.server 8080

# или Node
npx serve .
```

Откройте `http://127.0.0.1:8080`.

## Деплой

При пуше в `main` срабатывает `.github/workflows/deploy.yml` и публикует сайт на GitHub Pages.

### Первичная настройка (один раз)

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions

## Структура

```
index.html          — каркас страницы
content/seo.json    — SEO-мета
content/hero.json   — шапка
content/footer.json — футер
content/sections.json — шаблоны секций
content/links.json    — ссылки
content/projects.json — проекты
content/faq.json      — вопросы/ответы
assets/works/         — папка автогалереи "Мои работы"
css/styles.css      — стили (адаптив)
js/main.js          — рендер секций и QR
assets/             — favicon, скриншоты приложений
.github/workflows/  — деплой на Pages
```

## Обновление контента

1. `content/links.json` — ссылки и соцсети
2. `content/projects.json` — карточки приложений и скриншоты
3. `content/seo.json`, `content/hero.json`, `content/footer.json` — тексты страницы
4. `content/sections.json` — порядок секций, заголовки, `collapsedByDefault`, привязка dataSource
5. Добавляйте изображения в `assets/screenshots/` и указывайте путь в `projects.json`
6. Для блока "Мои работы" просто складывайте изображения в `assets/works/` — галерея соберется автоматически при деплое

### Галереи работ (мини-CMS)

- Каждая работа = отдельная папка: `assets/works/<slug>/`
- Изображения внутри папки попадут в галерею автоматически
- Метаданные галереи (в той же папке): `assets/works/<slug>/meta.json`

Пример `meta.json`:

```json
{
  "title": "Кадианский шок-трупер",
  "description": "Печать и покрас миниатюры 28 мм",
  "cover": "preview.jpg"
}
```

На главной блок "Мои работы" показывает превью + ссылку на страницу `works.html`, а на `works.html` у каждого изображения есть кнопка "Посмотреть оригинал".

### Картинки в карточках ссылок

В `content/links.json` у элемента ссылки можно использовать:

- `image` — путь к изображению (вместо `icon`)
- `imageAlt` — alt-текст
- `imageSize` — число или объект `{ "width": 40, "height": 40 }`
- `imageFit` — `"cover"` или `"contain"`
- `imageRadius` — число (px) или строка (`"50%"`, `"10px"` и т.д.)

## Лицензия

Содержимое сайта — © mr.Volkula. Код репозитория можно использовать свободно.
