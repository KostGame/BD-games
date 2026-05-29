# Issue #6

## Что сделано

- Добавлен favicon в `assets/favicon.svg`.
- Добавлены иконки приложения в PNG:
  - `assets/icon-192.png`
  - `assets/icon-512.png`
- Добавлено preview-изображение для ссылок:
  - `assets/og-image.png`
- Обновлены meta-теги в:
  - `index.html`
  - `tests/db-basics.html`

## Какие файлы изменены

- `index.html`
- `tests/db-basics.html`
- `assets/favicon.svg`
- `assets/icon-192.png`
- `assets/icon-512.png`
- `assets/og-image.png`

## Что проверить

- Главная страница: `https://kostgame.github.io/BD-games/`
- Страница теста: `https://kostgame.github.io/BD-games/tests/db-basics.html`
- Preview-изображение напрямую: `https://kostgame.github.io/BD-games/assets/og-image.png`

## Формат ассетов

- Favicon: SVG.
- Иконки: PNG.
- OG preview: PNG.

## Проверки

- `git diff --check`
- Проверка размеров PNG:
  - `icon-192.png` — 192x192
  - `icon-512.png` — 512x512
  - `og-image.png` — 1200x630
- В HTML подтверждены пути к favicon, touch icon, theme-color и OG/Twitter meta.
- OG-изображение визуально проверено локально.

## Примечание

- Пути в HTML рассчитаны на GitHub Pages с базовым путем `/BD-games/`.
