## Blast Game

DEMO: [helpful-tulumba-7691af.netlify.app](https://helpful-tulumba-7691af.netlify.app/)

Техническое задание ([ссылка](https://docs.google.com/document/d/1zsX8N4ORiEmDza7S5Q2SeIjYAQvmkB2FnGCIerIstcA))

Стек: TypeScript, **Pixi.js**, Jest, Webpack, Eslint, Prettier, SASS.

---

### Архитектура

Проект выполнен с использованием архитектуры MVC (Model-View-Controller).

#### Компоненты MVC состоят из файлов:

- `model.ts` хранение данных и бизнес-логика.
- `view.ts` отображение графики в зависимости от данных из модели.
- `controller.ts` методы для изменения модели и обновление отображения.
- `index.ts` обобщающий класс для удобного создания экземпляра,
  в котором так же задаются доступные снаружи методы и свойства.

#### В проекте имеются следующие компоненты:

- `Block` игровой элемент блок, хранит состояние блока, отображает графику и кадры анимации.

- `Field` игровое поле, содержит в себе методы для создания блоков, методы работы с полем.

### Структура проекта

- `assets/` спрайты в едином файле с описанием в .json, шрифты.
- `components/` компоненты с архитектутой MVC
- `game/`: основной класс игры
    - `controller.ts`: класс взаимодействия игрока с игрой
    - `mechanics.ts`: класс игровых механик
- `shared/`: общие объекты, не являющиеся классами
    - `animation.ts`: воспроизведение анимаций
    - `constants.ts`: константы и настройки игры
    - `localozation.ts`: строки для локализации на разные языки
    - `textures.ts`: загрузка и использование текстур
    - `types.ts`: общие типы
- `utils/`: вспомогательные утилиты и классы

Файлы с тестами имеют расширение `.test.ts`.

---

### Команды

### Установка

1. Клонируйте репозиторий
2. Установите зависимости командой `npm install` или `yarn install`

#### Запуск в режиме разработки:

`npm run serve` или `yarn run serve`

#### Билд проекта:

`npm run build` или `yarn run build `

#### Запуск тестов:

`npm run test` или `yarn run test`
