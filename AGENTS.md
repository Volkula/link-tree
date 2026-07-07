# AGENTS.md — link-tree

Краткая памятка для AI-агентов и контрибьюторов.

## Назначение

Статическая link-in-bio страница для мастерской **Берлогово** (mr.Volkula): крафт, 3D-печать, косплей, веб-приложения на заказ.

Продакшен: **https://volkula.github.io/link-tree/** (GitHub Pages).

## Архитектура

| Файл | Роль |
|------|------|
| `index.html` | Каркас страницы, подключение шрифтов (Cinzel + Manrope), CDN qrcode |
| `css/styles.css` | Вся вёрстка; mobile-first, `--max-width: 680px` |
| `content/seo.json`, `content/hero.json`, `content/footer.json` | Базовые тексты страницы |
| `content/sections.json` | Шаблоны секций (`type`, `heading`, `dataSource`, `collapsedByDefault`) |
| `content/links.json`, `content/projects.json` | Отдельные наборы данных для секций |
| `js/main.js` | Рендерер JSON-секций, авто-склейка данных, мини-QR и модалка |
| `assets/screenshots/` | PNG-скриншоты демо-приложений (1280×800) |
| `.github/workflows/deploy.yml` | Деплой корня репозитория на GitHub Pages |

Нет сборки, фреймворков и npm-зависимостей в проде. Не добавлять `package.json` / bundler без явной просьбы.

## Как менять контент

1. **Новая ссылка** — объект в `content/links.json`.
2. **Новый проект** — объект в `content/projects.json`.
3. **Скриншот** — положить PNG в `assets/screenshots/`, обновить путь в `content/projects.json`.
4. **Порядок/сворачивание секций** — править `content/sections.json` (`collapsedByDefault`).
5. **Новый тип блока** — добавить новую секцию в `sections.json` и обработчик в `renderSection()` в `js/main.js`.

Иконки ссылок — inline SVG в `ICONS` в `js/main.js`.

## Дизайн-система

- Тёмная мастерская: `--bg #0a0908`, золотые акценты `--gold`, `--copper`
- Заголовки: `Cinzel`, текст: `Manrope`
- Карточки ссылок: клик ведёт на URL; кнопка QR не переходит по ссылке (`stopPropagation`)
- QR: тёмный `#1a1208` на белом фоне

## Деплой

Push в `main` → GitHub Actions → Pages. В настройках репозитория: **Pages → Source: GitHub Actions**.

Домен по умолчанию: `volkula.github.io/link-tree/`.

## Ограничения

- Не коммитить `node_modules`, временные скрипты захвата скриншотов
- Сайт полностью на русском
- Внешние ссылки: `target="_blank"` + `rel="noopener noreferrer"`
- Сохранять доступность: `aria-label` на QR-кнопках, `<dialog>` для модалки

## Связанные репозитории

| Репо | Демо |
|------|------|
| litanies-generator | litanies.volkula.com |
| seal-generator | volkula.github.io/seal-generator |
| strategem-hero | volkula.github.io/strategem-hero |

Заказы: https://t.me/Volkula
