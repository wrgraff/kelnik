# Kelnik
[Test task for Kelnik](https://kelnik.frontend-design.ru)

## Верстка
- Код [валиден](https://validator.w3.org/nu/?doc=http%3A%2F%2Fkelnik.frontend-design.ru%2F)
- Шрифт подключен локально (что сейчас надежнее)
- Адаптив додуман, добавлена кнопка меню
- Без фреймворков. У макета несколько странная сетка (специально?), если бы это был полноценный проект — заморочился бы с каким-то констуктором
- Pixel perfect весьма относителен
- В IE11 верстка не развалится, но js не работает. Так как грузится список квартир через js, есть [отдельная страница](http://kelnik.frontend-design.ru/ie/) со статичной версткой кватир

## JS
- Кнопка "наверх" добавлена
- Сортировка: смутило то, что нет смысла сортировать загруженные 12 (или более) карточек, поэтому сортировка работает по всему списку и перерисовывает его полностью
- Подзагрузка грузит по 20 объектов, когда их остается меньше 20 количество на кнопке меняется, после последней загрузки кнопка удаляется
- Валидация формы не блокирует браузерную валидацию. Ошибка не выдается в процессе заполнения поля (чтобы форма не "била" пользователя как только он поставил курсор), выдается только после ввода, а вот исправление ошибки отражается уже и при вводе.
- Кнопка избранного имитирует работу, поэтому при перерисовке списка (после сортиовки, например) статус избанного сбросится к начальному
- На больших объемах нужно конечно заниматься оптимизацией

Сборка проекта Gulp, SCSS
