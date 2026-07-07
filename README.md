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
- `content/site.json` — весь контент (тексты, ссылки, карточки, SEO, секции)
- `js/main.js` — универсальный рендерер секций

Поддерживаемые типы секций сейчас:

- `links` — список ссылок с QR
- `apps` — баннер + портфолио приложений

Чтобы добавить новый пункт/скрин/ссылку, правьте только `content/site.json`.

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
content/site.json   — контент и SEO
css/styles.css      — стили (адаптив)
js/main.js          — рендер секций и QR
assets/             — favicon, скриншоты приложений
.github/workflows/  — деплой на Pages
```

## Обновление контента

1. Откройте `content/site.json`
2. Меняйте тексты в `hero`, `footer`, `seo`
3. Добавляйте ссылки в секцию `type: "links"` (`items[]`)
4. Добавляйте проекты в секцию `type: "apps"` (`projects[]`)
5. Кладите новые изображения в `assets/screenshots/` и указывайте путь в `screenshot`

## Лицензия

Содержимое сайта — © mr.Volkula. Код репозитория можно использовать свободно.
