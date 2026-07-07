# link-tree

Персональная витрина мастерской **Берлогово** — аналог Linktree, хостинг на GitHub Pages.

**Сайт:** [lair.volkula.com](https://lair.volkula.com)

## Что на странице

- Ссылки на заказ крафта/3D-печати, Telegram-канал и TikTok — с QR-кодами
- Блок «Приложения на заказ» с портфолио и скриншотами:
  - [Litanies Generator](https://github.com/Volkula/litanies-generator)
  - [Seal Generator](https://github.com/Volkula/seal-generator)
  - [Stratagem Hero](https://github.com/Volkula/strategem-hero)

## Стек

Статический сайт: HTML, CSS, vanilla JS. QR-коды генерируются в браузере через [qrcode](https://www.npmjs.com/package/qrcode) (CDN).

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
2. **DNS** для `lair.volkula.com`:
   - `CNAME` → `volkula.github.io`  
   или `A`/`AAAA` на IP GitHub Pages (см. [документацию](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
3. В репозитории уже есть файл `CNAME` с `lair.volkula.com`

## Структура

```
index.html          — разметка
css/styles.css      — стили (адаптив)
js/data.js          — ссылки и портфолио
js/main.js          — рендер карточек и QR
assets/             — favicon, скриншоты приложений
CNAME               — кастомный домен
.github/workflows/  — деплой на Pages
```

## Обновление контента

Ссылки и проекты — в `js/data.js`. Скриншоты приложений лежат в `assets/screenshots/`.

## Лицензия

Содержимое сайта — © mr.Volkula. Код репозитория можно использовать свободно.
