# MetaLamp 4 task - Slider for jQuery

Четвертое задание - плагин для [jQuery](https://jquery.com), в котором выполнен функционал «бегунка» (также называемого слайдером) - специальный контрол, который позволяет перетягиванием задавать какое-то числовое значение.

[Демо страница](https://yarlykov.github.io/slider-plugin-jquery/)

## Содержание

---

- [`Возможности`](#возможности)
- [`Развертывание`](#развертывание)
- [`Подключение и использование`](#подключение-и-использование)
- [`API`](#api)
- [`Архитектура`](#архитектура)
- [`UML-диаграмма`](#uml-диаграмма-классов)

## Возможности
---
  - Любое количество слайдеров на странице без конфликтов
  - Простое и удобное API для взаимодействия со слайдером
  - Два типа слайдера (одиночный и диапазон)
  - Поддержка отрицательных значений
  - Широкие возможности кастомизации
    - задание размера шага
    - выбор вертикального либо горизонтального вида
    - возможность задать диапазон значений
    - возможность вкл/откл прогресс бар
    - возможность вкл/откл подписи шкалы значений
    - возможность вкл/откл подписи над ползунками
  - Поддержка тач устройств

## Развертывание
---

### Клонирование репозитория

```bash
  git clone https://github.com/yarlykov/slider-plugin-jquery.git
```

### Установка зависимостей

`npm install`

| Разработка    | Тестирование |  Покрытие тестами   | Production сборка |
| ------------- | :----------: | :-----------------: | ----------------: |
| `npm run dev` |  `npm test`  | `npm test:coverage` |   `npm run build` |

## Подключение и использование
---

1. Для работы плагина необходимо подключить `jQuery-3.x
2. Для подключения плагина на страницу необходимо взять из папки `./dist` файлы: 
    - `plugin.js`
    - `plugin.css`.


Пример подключения на страницу:
```html
<html>
  <head>
    ...
    <!--jQuery-->
    <script defer="defer" 
      src="https://code.jquery.com/jquery-3.6.0.min.js">
    </script>
    <!--Plugin JavaScript file-->
    <script defer="defer" src="plugin.js"></script>
    <!--Plugin styles file-->
    <link href="plugin.css" rel="stylesheet" />
  </head>
</html>
```
Инициализация с настройками по умолчанию:
```html
  <!--HTML-->
  <body>
    ...
    <div id="root"></div>
  </body>
```
```js
  // JavaScript
  $('#root').sliderPlugin();
```

С пользовательскими настройками:
```js
  $('#root').sliderPlugin({
    min: 0,
    max: 100,
    step: 25,
    valueFrom: 50,
    valueTo: 75,
    orientation: 'horizontal',
    range: false,
    fill: true,
    labels: true,
    tooltips: true,
    color: 'orange',
  })
```

### Опции
| Опции         | Тип          |  По-умолчанию       | Описание                      |
| ------------- | :----------: | :-----------------: | ---------------------------:  |
| `min`         |  number      |  `0`                  |   минимальное значение шкалы  |
| `max`         |  number      |  `100`                |   максимальное значение шкалы |
| `step`        |  number      |  `25`                 |   шаг шкалы                   |
| `valueFrom`   |  number      |  `50`                 |   значение одиночного ползунка / начальное знач. диапазона | 
| `valueTo`     |  number      |  `75`                 |   конечное значение диапазона    |
| -----         |  -----       |  -----              |   -----    |
| `orientation` |  string      |  `'horizontal' `      |   ориентация слайдера (horizontal/vertical) |
| `range`       |  boolean     |  `false`              |   тип слайдера (одиночный/диапазон) |
| `fill`        |  boolean     |  `true`               |   заливка (от min до valueFrom либо от valueFrom до valueTo) |
| `labels`      |  boolean     |  `true`               |   подписи шкалы значений |
| `tooltips`    |  boolean     |  `true`               |   отображение текущего значения над ползунком |
| `color`       |  string      |  `'orange'`         |   цвет слайдера (orange/green) |

## API
---

sliderPlugin( *method*: **'getState'** | **'setValue'** | **'onChange'**, **options**)

Плагин принимает в качестве параметров объект с опциями либо методы для изменения и получения данных.

`getState(): IOptions` - метод, который возвращает текущее состояние слайдера в виде объекта со всеми опциями.

```js
  const state = $('#root').sliderPlugin('getState') 
  console.log(state) //{min: 0, max: 100, step: 25, valueFrom: 50, valueTo: 75, …}
```
---
`setValue( name: string, value: number | string | boolean): void` - метод для изменения любого значения слайдера. Принимает параметры в виде числа, строки либо булевого значения.

```js
  $('#root').sliderPlugin('setValue', 'min', -100) 
  $('#root').sliderPlugin('setValue', 'valueFrom', 20) 
  $('#root').sliderPlugin('setValue', 'orientation', 'vertical') 
  $('#root').sliderPlugin('setValue', 'range', true) 
  $('#root').sliderPlugin('setValue', 'tooltips', false) 
  $('#root').sliderPlugin('setValue', 'labels', false) 
```
---
`onChange( func: EventCallback ): void` - метод который позволяет передать callback функцию на событие изменения слайдера. 

```js
  $('#root') .sliderPlugin('onChange', () => {
    `any code`
  }) 
```

Также позволяет через объект `detail` получить любое значение слайдера.

```js
  $('#root').sliderPlugin('onChange', (evt) => console.log(evt.detail)) 
```

## Архитектура

---

### Инициализация

1. Presenter создает модель
2. Presenter создает представление
3. Presenter подписывается на изменения представления
4. Presenter подписывается на изменения модель

## UML диаграмма классов

![image](https://drive.google.com/uc?export=view&id=1S4hNznRuGywPhJUBfLO3PwiedWcKCS1P)
[открыть превью диаграммы в draw.io для удобного просмотра](https://viewer.diagrams.net/?target=blank&highlight=0000ff&nav=1&title=UML.drawio#R7V1rc5u6Fv01mbn3QzKItz82adNzTnPubZuctPnUIUaxaTD4YtLE%2FfVXPA16YMCAsNFMZxowBqy1tLX30tbWmXK1evsYWOvl374N3TNZst%2FOlPdnsgxUWUf%2FRWe2yRnDAMmJReDY6UW7E7fOb5ielNKzL44NN6ULQ993Q2ddPjn3PQ%2FOw9I5Kwj81%2FJlT75bfuraWkDixO3ccsmz3xw7XKZndU3dffAHdBbL7NFAnyWfPFrz50Xgv3jpAz3fg8knKyu7T%2FojN0vL9l8Lp5QPZ8pV4Pth8tfq7Qq6UbtmTfbtz%2B039%2BZZ%2F%2FjXl83%2FrH8uP9395%2F48udl1k6%2Fkvy6AXtj61r%2Bfn67%2FuFd%2Ffl9%2Fvv7yKn189%2FjXefoV6ZflvqRNmZIj%2FsHhNmvgzauzci3UNMrlk%2B%2BFt%2BknqA0uLddZeOjvOXo5GKATv2AQOgibd%2BkHob9GZ%2BdLx7VvrK3%2FEv2ETYjaPTu6XPqB8xvd1nLRRwCdQB8HYUozxM3iFbfRN9FpCZ0N4AZd8zlrF5CfurE2YXrN3Hdda71xHuMXji5ZWcHC8S79MPRX2Y0iAkA7PcqBjg%2FCwH%2FOWRV9vyYaKWpRa8C3Ak1TdD5CfwXDYIsuyT6VpBSOtBea6eFrkdLpuWWBzbKSnrTSbrTI750%2F7ivqdpa3QI2QPy%2F%2F2jYzA3Wfp5cfZ7kIeM8K4WXUjJsiC9EfhZ%2B6OxVzswFPAcHTM%2Fkypih6LMFW1OBhgZkufAqZvNysrbnjLW7ia96ruzNf0x8cnfLRd5%2FcmBNLx7ahF3MGPdtKaBURZe07Xhi3iHaJ%2FqF2u5IutDMNvdAVOga7Y%2FQvujwIr3wP0ctyYh5BxNlXGPGWwrDKzrufYdsycHsBruBTCdmmMMoEjOfJoWNboeN7J4dkhWFZhis3%2FbMvvFXeeKuUbosh7DrxqJK2BqBa3D3wrxCQ0e0yvO8iOrw%2FBwQnFJITCgV%2F13qE7md%2F48SUVN4HybUYL3h1Yr0mqGZPmGosUwyRW4Cs8b%2F%2BfRbZGQXsmH1CHbovVA213djbBtY%2FzXPrCdlbTbvZfnJu%2F%2Fn%2Bav84B5LCAHYhgD0AWCC19Ko6RJZmhtMuex%2BdE8i2Qra2O9UfshXGWCDbHllN5o6sTnWV50s4f46tsYC3PbyGORy8kv3r4fXHl7sH6zr4pnxy3R93X89lg4qus5kMqgRadYFmB7fSgC4U9f3ILnvvwFcCQIaWJgktrTstLdfOGkppSjspDWBSmlJbuhteSqObnljGPk1Ts9eu6LXZNRYdzaRiGG7Xp6eFdqqgNUZ6SAWN7gjKDEfQX619D0atLBDvEvG68lqPiNMtdI74jbM5PVPNF3STt0GfEZATCE9dKG8Mah5D81LKAWvW0vGcMAryTqwP9wYk4C6Oy6THlUD5srZTaVyAWQ%2FMtlkG3YGpkP0yHmADiKC8Kg6zAtf6uNZ2nPrrpOQoGuFqO5u1a21vXceGgUC0PqIz7ip4JqtgiD46nv3hVxT8CDjrixZgQNWbAafMhDNO5vzwy4MC0yaYqtw9I4VMG8gw%2FeT5jxvRT5tiavB3kMiEgQzTmyjkE6A2BnXG2zsiR9L%2FPm5ggH4CAaJI9u5%2FgkoHaepGVa83KATJ46eTSPam2x%2BCqkms7aeEPT3Jm2RZZR8%2BaKKKRqrexGyRANw9qLQ5KRqoHcia1Bdm5ZzB1URUzW5g1CiuO7Vv9uURzJiLal4eN%2FPAeZyGrNkNmrSEj2HRZHXLF0%2Fg2SZtu%2B7Q2RugMwIsaC9g5o3HC1VxZxY11NJf%2BJ7l3vjxGBgNgT9hGG5T%2F9p6Cf3yYAvfnPB74e%2BH6Fao8ZOj92%2FpneOD7RlrGraq0Tf%2BSzCH%2BwcUFAYsYNX90uuiVqiEMIAu%2Buqv4kW9pOgCAdCoATLIRAoCsRaA7BCNHcy48T7DwEFvDYPbxCKmOPx8Wa0zPljBPAt230VL3tEp27FWvmffLR0v%2B%2BjacXPgPTu70F%2FHdhSdST%2BPEfdQK33fsSE6fCh%2BtuNGfJSRI4GR8cYkc6ri3f2MqEuJ1CifSxemKqUwpab4PAuVa9Mmvf3naJjZ3VvRyiG3CrCoJ4Uy%2BdaOfMSNgFaOpTUTu1HawuwbZRf6T08bWLoGIW5tC1ekQ2X9H6VKle%2BuyVLV9eiP5A06DejJfphMxuVzrYV8d%2BSPwFhXkHb6FDsZnmMutSpNRapSyhQDkkI6u7mEUNKqssSNZlqVgvUvs%2B0SugG0KlZeyETyqSu7e31Foyaf%2Bsu5VGgJeFMqMNENkDp3IMlpDgK8qQuOjVGlaBtUVPsSHIHM6JwTSr7rCEkyBYTeP%2FubWiZdwbiM14gcu8nMQaplN8ugWG%2Bqm5XrYA0XyWGPG8caOTpNSTE1SoDYRFT9j2%2BfnkPQdvlFdSfvfkFdb3aJXGUl%2FIaDYa1bRqE3x0FlVT5Jc4Kn6zo0B7Pu6NBfH1VZU1y%2BF6tcMHjvv3oC0x7WvfWHKasSxl2soQowmyyTqmlue0STvlgZAXkHV8jgTjlYawGowj1jn5TF4gkoEa1xiNZmbcO1KrWtIlwzys%2BbtV2FOUC8lnnrwn2v0Zc7j8r6ct9l4b13hqXCfaGQKlTcrsAcQShGX%2FUlHL1WeHIPw2Qyso4W7wk%2Fj0fpOr2lnye3XBmE%2BXlm2%2FWHQ%2Fh59PhyQ51Cmoi5yfvuKMvX0V%2BZLvo800zOsaPY6cxKc6y5F7CjVs4RodmBsA64CQTDAWQlvk0%2BNmsOJv%2B9H7KJOhGbHQzmCPZ7UFnJjGKerC2o%2FBMUNHrE7Xuf4FbA2RBO%2Fvs7ZCnuGJyWnRS2iorPQQ8G06ix0hWsQ%2B7rwICVXlpQ6GLtAtUht3SgvjOlVOQtnPtJbSsCSCGPDbBLKjD56mMAgPEKZECjl%2B6atEKm1CfZWBQyoDEykNnG59jB7FQoaw45d6GMUnSPwHjqQllzWLkLZRots1wIZa3AHIFQRispIYSyNmCOQCjTWCK2EMragjoCoYxeBV4IZW3g5C%2BU6UIo6x5W%2FkKZLoSyLuNV%2FkIZ6Rjd%2Bb4bOmsCRaGS9a%2BSGXJLkazlYgH1iJLIVHJEITg6%2BUC7cWkJ3osFgC4znHkRaDcGk%2F9qAZ2c7haBdjsw%2Ba8W0OmTEsLZa4Un99UClMUfyaSo8Pj4eXxAldq6fO32vFexeVggScZ4fT5R32WvJVJ7K9vTn8%2FHqggyeZ%2BvOZgj8PlYU2VT9%2FmagzkCn4%2B%2Bxkf4fK3w5O%2FzkbMqyVaAwtnj4OzNtLa%2BXrvSjTr%2BvBHXbqSuZRGuHr03H5Grx1rUIly9IywGYrBWs4i8i1aI8vf3soFF%2BHtd4Mnd3wMGc4I%2B8fsEmkdVmdEgvaIIznkAUc%2BMERWAHlNlRsr6gGRPpWtrHvrpA0RYNnCJRqyivlo3C0JvFZUpWNJFXiFyjFGZKAOy1w5pvVXy6SsqoyRnJkFZMq5Md0hpDmXtmKyv9UcUwfYrMjgwGVbEeMJhPNGwkr%2BaqfU5nmg6%2FrjxjieUcFOMJ6wefTTjCSVKKY4n%2BX6hE44%2Bm4PKfWShiH33CCbbijtBzYFFFgNLdwMLwIuM5mnf%2B0iigIqIlj20yAr2PMqWn6MZWujZiiuH5OpEbI7R34Zevdkcev2ElfV2ciB2WjihOdTcCycYjKLAISQzUQXWB2Fdt5pCj%2Fv70tOK4sPrAI2yAvFOEa89EdUf4qRymCN%2B5wu8u8UbSLwBN2glNkRkfyiu3EN7Vq2N%2BRLOn1GoNWW5uAWe%2FHN4AE2CyxG9j84KRBsgyj%2BHB5A5HwVE%2F3a8eEJAgNoAVP6JPFnuCQNU602A2lTc4J%2FOA1jLo9PRFK4FoA0A5Z7OAwBrr8PM9KKOKiBtIkDy949YixNjSGOrK3BtjGvbHKfOcDVNAi1oL2A2T%2BX5cWhaDuNRSy39he9Z7o0fx5lRmPkThuE2nXmyXkK%2FHNDCNyf8Hn39wtDSw4f0btHf79%2BKB9szlixQNV%2B08V%2BCOayicJoYGcZ7sde4MGqIShQD6KLv%2Fipe1EvXIzWEzwHcJNOGOHpiwrH%2FCUcdq0dVd%2FoPzGQ2R05juhEAusD5t29Dcqf1iQwMux58PFOOIN%2F4tQzkvQNfTw7HTmXqFmhzn3XMMyaETt0psNwLtsukCBb1YsdzwshRR6%2BngB23T6hL94cp%2F7rtWd%2FEQH10PDseZ%2BNawhuBbzt8R1DKXaYvKI4AjsZfge9B%2BPKv6i7Tk%2FLmLxsU6cToCnBbgjtkjXfJ%2FvXw%2BuPL3YN1HXxTPrnuj7uv5xRsCfygZ78Lgri5%2FXXc2La1WcYOKKALJ9nfsWpykWkodN0ENWqwjb50Ll1IkpmdSb4qadnx7svx0e7b9rXjusXPPsPAQY0TaQYFRxiTR9opNb%2Bfn67%2FuFd%2Ffl9%2Fvv7yKn189%2FjX%2BXkqNe4VapK0SJILBew1CvTZudryTfqEuJrDLizXsLBcw3dkS35n%2Bq0dq8gbYbUH85WP2Y2ShiBu1CJmpzOWJu2yGWs71ioqj7l0vK65Oitz1YzavgFZYzEK61jxOd6ENmsSGrCsGx9GK10xWh6a0TUKZJI2mEZlREqlRGdTUvcQmsnIcsehEvN78aDQf6q6AHp6j3yuDiuLjKYyXz4JPhvZlGp2IwnzHvrmc4315gU%2BP7p%2BpLyznYqcajt2PRQ%2Fq2VtDyTZXmOo8R3dMY1fw1ehtrWFBl60rm%2Fu0EqNsbmTzvjt80d343rdebz%2BrJE%2BqkHTxEXa2kTBFyzjjGMQBSFnbQuXpXEa84XxQhvZc3a8S%2B7YKQuzRjphFhqChQ1YqPfMwgpLUa4z5KzWrigLccZtMl0etiwEwHk34r2dKDuNEBSd%2BqScXp9wIykLARRWZXhRF6I9qkPWhaB6OHU25ailoh1FcMbX58ZdWN1s6e0YmLdj4rvH9BycqTWWB5JuMdUTluu7wnV00gMJtF9CUngSyAAY7m0JtJeJHbnLJv0xvcZsajPVqYqcUTbZjp2x1r9HRqWommOgrcxVlOqMtiw%2BDWb3WolSp2D3kl9%2B9AQayu7NZhwMX9bYBXZm8O7oGYfcBSc5c8mzaAf3yR%2FTyDsJjy5ROL%2BI4%2B8r3%2FWDHcdjnSGRAEA0%2B2k7AQpik0AKgRNxJOXo3Pe8KL59zN4oe2vcZ67LXmaIToBdte%2FKQU60Rgo03Fp%2B6FbGqZ7Hid23sky0snRxUb%2BhGVHnkbSzgUmlRpWQdFg7k2l8k2EzwEYaQ6toZbrtP1eU8mBVvoH%2F9LSBvXgnGqm7Tah%2FaKytV7vvH2Ti0XT6Bza%2FDPAUmf39A2Q8zadQhushzcSuE%2FLfAVf%2FXcX0Kh23qrWn%2BRS%2BAaBGCl%2BT6fr41GeP7jSp4ExoIJvpgw1kzeQMSr7hTvSXS6r%2FTuenq%2F4lk5i2O5lZOOTMgMI1DwIX9FvPDGiY%2F6oOPDNA3YyETaljn07iShrcIBttk2fw0FKvmTzTGWloJc9a2SFQMkL7k5AHZQvgKsJzZ0tTDRWvH5G9MHNyAL9%2BNsPI2oPmqk9YK5HxDambx4LctJI6OUq1IsFmq4aaLvs50CTtnxfUuZokPMcctDRJeHxJ2LaOTBLxnJk%2BgIk5eFVQPjpeSFLJm4pmtMGs0SDZx0K0vSNnsjiVG01nfY2c%2BMKerpKU8ReeqQPQlJRGJhS069kUYN7kCptmBwXterP0lsqg3ZT0JlE7te%2BPL5RXueZo9edn92QtAC6qYo52T%2BaiQ%2B1pNlPLcV%2Bz9ddchrR0FoQXS4GC%2B15taQokaSCeEq88G4Cndfa4rO99Gbj3ZRwDVXWZJ1VnckdMxetf1l3S2jj5C39OWj%2BzX56SGtqE3C%2BTYRq6d7%2Bou6M2swed%2BULcBg%2BAKz%2BtB498uwsWcF0NHsQrDzJ4kOrghDolyLe9yNrc7GBxGr2hJ536BPCsHFOqMH8M9VwuK7HnAAtg%2B9NiKduETgk8TTHKvaS3%2BX7KJp1VY1dWj4XmzFLqXrURD%2BgVETJNvbGKzpAfDhpkay8Kq%2BNJSzyHbbyki9Y2yUDHS8jVTDJoPGjjyYZZdm6%2FgzYpZH54C2G2WB7fc%2BImsi7lXrK3yEK%2BdB03aeRac6bZYVmoIqsrrADTHp1Hm12o6mGMG2DQOHiVX8sMk%2FHpnXwX9%2BXVyfBO2nxxFn4nqaaS1BmnSE3ytHq%2Bua%2FnS%2Fm2auPt%2BdmoNXjPH9zxqLnlDzd%2Fwuis52OeyQzPD%2B%2B545ukeHZSHd9k%2BJ3p7aUL5Gkpo%2B%2F3zZS3Dvt9m13AKoxFFlcNHaYYNa0K51RofD2phIsZda2KqXK2KqT6d1pWRd7nTsiKgqtKo7cyBycGdu9d9GQwRp5IYWbrLA92L4Cs4zalp5xloJo8JAuTVFBPy9IwciVy%2F8VQpbKIOv4o5uClqEexQoZv3Rgg4XtQtrYh%2BKo8IA1cENuskCV1N5oAeQzQX4tducKj7%2FXVQiWKWkxQHiKOwL3gJVsOvJqSb34CMd4fcbc%2FcU3S3K9JSvrou3UWs05xGZiOLTnurwDUbMJltvClRz22MqmzTaaVTWmwVib9f6Zd71fUPGpNU6rpkKR7MnKbKsFETQX3ImqnXmCaplJzpWNnA12zys%2B0FKKDF872zSkg851W64wrQC%2FdSDaH3f5rRsY6J%2BW6zhgmpeC6KlK51tnoZalZdxWOZzOj1MUB2NPJKbWzC6Mbtngmv99B6xVHNGzRd0E7jVELrxE79Maa%2Bd7oJ2uKGCNWLpWhGHpWgoCnVIYOA98Pi5cH1nr5t29Hrf7h%2Fw%3D%3D)
