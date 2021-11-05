# MetaLamp 4 task - Slider for jQuery

Четвертое задание - плагин для [jQuery](https://jquery.com), в котором выполнен функционал «бегунка» (также называемого слайдером) - специальный контрол, который позволяет перетягиванием задавать какое-то числовое значение. 

[Демо страница](https://yarlykov.github.io/slider-plugin-jquery/)

## Содержание

- [`Возможности`](#возможности)
- [`Развертывание`](#развертывание)
- [`Подключение и использование`](#подключение-и-использование)
- [`API`](#api)
- [`Архитектура`](#архитектура)
- [`UML-диаграмма`](#uml-диаграмма-классов)
- [`Использованные инструменты`](#использованные-инструменты)

## Возможности

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
  - Поддержка управления с клавиатуры
  - Подстраивается под изменения ширины/высоты контейнера

## Развертывание


### Клонирование репозитория

```bash
  git clone https://github.com/yarlykov/slider-plugin-jquery.git
```

### Установка зависимостей

`npm install`

| Разработка    | Тестирование |  Покрытие тестами       | Production сборка |
| ------------- | :----------: | :---------------------: | ----------------: |
| `npm run dev` |  `npm test`  | `npm run test:coverage` |   `npm run build` |

## Подключение и использование


1. Для работы плагина необходимо подключить `jQuery-3.x
2. Для подключения плагина на страницу необходимо взять из папки `./dist` файлы: 
    - `plugin.js`
    - `plugin.css`


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

sliderPlugin( *method*: **'getState'** | **'setValue'** | **'onChange'**, **options**)

Плагин принимает в качестве параметров объект с опциями либо методы для изменения и получения данных.

`getState(): IOptions` - метод, который возвращает текущее состояние слайдера в виде объекта со всеми опциями.

```js
  const state = $('#root').sliderPlugin('getState') 
  console.log(state) // {min: 0, max: 100, step: 25, valueFrom: 50, valueTo: 75, …}
```
---
`setValue( name: string, value: number | string | boolean): void` - метод для изменения любого значения слайдера. Принимает название параметра (`string`) и значение (`string`, `number`, `boolean`)

```js
  $('#root').sliderPlugin('setValue', 'min', -100) 
  $('#root').sliderPlugin('setValue', 'valueFrom', 20) 
  $('#root').sliderPlugin('setValue', 'orientation', 'vertical') 
  $('#root').sliderPlugin('setValue', 'range', true) 
  $('#root').sliderPlugin('setValue', 'tooltips', false) 
  $('#root').sliderPlugin('setValue', 'labels', false) 
```
---
### Кастомное событие

`onChange( func: EventCallback ): void` - метод который позволяет передать callback функцию на событие изменения слайдера. 

```js
  $('#root').sliderPlugin('onChange', () => {
    `any code`
  }) 
```

Также позволяет через объект `detail` получить любые значение слайдера.

```js
  $('#root').sliderPlugin('onChange', (evt) => console.log(evt.detail)) 
```

## Архитектура

Плагин построен по MVP-архитектуре с Passive View. Такой подход позволяет отделить бизнес-логику от отображения. Отвязка слоев приложения осуществляется благодаря использованию паттерна `Observer`, который расширяет основные модули и позволяет им взаимодействовать ничего не зная друг о друге. 

### Model

  **Model** является модулем отвечающим за хранение всего состояния приложения и валидацию данных (расчеты, которые относятся к бизнес-логике). Предоставляет методы для чтения и записи (всех параметров либо каждого по отдельности).


### View
  **View** отвечает за создание отображения, его обновление и взаимодействие с пользователем.
  Отображение декомпозировано на более мелкие элементы ( *subView* ), которые наследуются от общего класса `SliderComponent`. Это решение позволило создать единый интерфейс всех графических компонентов и расширить их классом `Observer`, чтобы на их изменения можно было легко подписываться. Также данный подход позволяет `subView` оставаться низкоуровневыми элементами и ничего не знать о модулях высокого уровня, но при этом всегда иметь доступ к актуальному состоянию для внутренних расчетов.
  
  Все `subView` имеют схожий базовый интерфейс, каждый компонент умеет формировать шаблон и отрисовывать свой элемент, в случае необходимости может навешивать на него слушателей и при изменениях сообщать об этом. Также каждый `subView` имеет возможность обновления своих отдельных стилей (без полной перерисовки всего компонента).
  
  Для инициализации либо пересоздания графической части существует `SliderFactory` - это класс-фабрика, чьи подклассы в зависимости от типа слайдера передают в главную `View` массив необходимых `subVeiw`. Это позволяет локализовать и изолировать в одном месте создание всех графических компонентов и передать их главной `View` для рендеринга, подписки на изменения либо обновления.
  
  Связь между `View` и `subView` осуществляется также с помощью паттерна `Observer`, что позволяет уменьшить сложность графической части, обеспечить простое взаимодействие, слабую связность и модульность элементов. 
  
### Presenter
  **Presenter** - единственный модуль, который имеет зависимости от других слоев приложения.
  + Presenter создает модель и отображение
  + Подписывается на изменения модели и отображения
  + Реагирует на сообщения об обновлении модели и обновляет отображение
  + Реагирует на сообщения от отображения о действиях пользователей и обновляет модель
  + Формирует кастомное событие, для того, чтобы была возможность получать актуальные данные либо осуществлять стороннюю логику при перемещении слайдера.

  Таким образом передача данных снизу вверх осуществляется следующим образом `subVeiw` ->`View` -> `Presenter` -> `Model`

## UML диаграмма классов

![image](https://drive.google.com/uc?export=view&id=1r70rn2ygFqT3DZcroKAm0YdF6BaSrEUe)
[открыть превью диаграммы в draw.io для удобного просмотра](https://viewer.diagrams.net/?target=blank&highlight=0000ff&layers=1&nav=1&title=UML-slider-5.11.21.drawio#R7V1rc5u6Fv01mbn3gzOINx%2BbtGnvaXpu2uS0zacOMcSmxeCLSRP311%2FxtNEDA5YAB810pgFjwFprS3svbW2dKZerl%2FeRvV5%2BCh3XP5Ml5%2BVMeXsmy0CVdfhfcmabnTEMkJ1YRJ6TX7Q7cev9cfOTUn72yXPcTeXCOAz92FtXT87DIHDnceWcHUXhc%2FWyx9CvPnVtL1zsxO3c9vGz3zwnXuZndU3dffDB9RbL4tFAt7JPHuz5r0UUPgX5A4MwcLNPVnZxn%2FxHbpa2Ez7vnVLenSmXURjG2V%2Brl0vXT9q1aLJv%2F9l%2B869%2F6e%2F%2F%2Brz5n%2F3Pxce7v7%2FOsptdtflK%2BesiN4g73%2FrPr8erD1%2FVn9%2FXN1efn6X3bx7%2BmuVfkX7b%2FlPelDk50h8cb4sG3jx7K9%2BGTaNcPIZBfJt%2FAtvgwva9RQD%2FnsOXcyN44rcbxR7E5k3%2BQRyu4dn50vOda3sbPiU%2FYRPDdi%2BOLpZh5P2Bt7V9%2BBGAJ%2BDHUZzTDHJz%2F4rb5JvwtATPRu4GXnNTtAsoT13bmzi%2FZh76vr3eeA%2FpCyeXrOxo4QUXYRyHq%2BJGCQFcJz8qgU4P4ij8VbIq%2BX5DNHLUktZwX%2FZomqPz3g1Xbhxt4SXFp5KUw5FboZkfPu9TOj%2B33GOzrOQn7dyMFuW9y8d9gWZnBwvYCOXzyq9ti26g6fP06uNsHwIf2LF7kTTjZp%2BF8I%2B9n7o7lXKzBU8BxtMz%2BSKlKHwsxlbY4PEeM333MabycrO2516wuE6veavuznzJf3ByKoTfffRTTiw9x3GDlDPw2XZGq4Qo69AL4rRFtAv4D7bbpXSunWnwhS7hMdgdw3%2FJ5VF8GQaQXraX8siFnH12E94SGFZrvIcZtq0CdxDgGj5VkG0Lo4zBOMsOPceOvTB4dUjWdCzLeOXnf%2FLCWx0ab5VgtgjCvpeOKnlrAGKPewD%2BFQQyuV2B911Ch7czgHFCwTmhEPD37QfXvwk3XkpJ5W2UXYvwYigj1huCanLCVKN1xS50C2Bv%2FK9%2FnyX9jAJ2zH5FBs0LVUPtNvZ2gfU%2F5sx%2BhP2tpl1vP3q3%2F3x%2Fdn7MgKRQgF0IYI8AFkgdvSqGyJK64dxkvybnBLKdkG3sTvFDtqYzFsh2R1aTB0dWJ7rK86U7%2F5X2xgLe7vAaZn%2FwSs7v%2B%2Bcfn%2B%2Fu7avom%2FLR93%2FcfZnJBhFdbyNQ7R7cSj26UMRXxk32q%2Bc%2BYwBStDRJaGnstLRSO2sppSndpDSASGlKY%2BmufymN3PWkMvZEuxq9MbvGoqOZRAzj7fr1aaFMFbTWSPepoJEdQZniCIardRi4SSsLxFki3lRe44g4uYcuEb%2F2Nq%2Bvqx4WdHPoDt3CIMcQnrpQ3hrUMoYeSikHtFlLL%2FDiJMh7ZTbMDUgwuDgu4x5XBuXT2smlcQFmMzC7ZhmwA1PB7TIdYCMXQnm5P8wKXJvj2thx4mek%2BCia4Op4m7Vvb299z3EjgWhzRK3BVfBCVkEQffAC593vJPgRcDYXLUCPqjcFTpkKZ5rM%2Be534ApM22CqDu4ZKXjaQIHpxyB82Ag7bYupMbyDhCcMFJheJyGfALU1qNbQ3hE%2Bkv73YeNG8CdgIIpkb%2F4TVDrIUzfqrN4gEKSMn9rNUDV6Xv8zVOT%2BB6NqFmuHOWFfn%2BSNs6zWho%2BaqCKRipuYLRKA2YNKmpMigcpA1iS%2BMC3nzF1NRNVkA6NGcN2JtsnLI7Coi2qeHjbzyHuYhqzJBk1Swke%2FaNLM8ikQeHZJ2246dHID1MLAcp2FW3jj6UJV1JmFDbUMF2Fg%2B9dhOgYmQ%2BBPN463uX9tP8VhdbB1X7z4%2B97f98mtYONnR29f8junB9sz2jRsXaNvwqdo7h4eUGAYsHDr7pdfl7RCLYSR68Ov%2Ft6%2FiEuKLhAAjRogA0%2BkwBDrAMgO0dTBTBvvxo08%2BNZudJv1iDkOP59W64IPdjQvgt03yZJ3eMrx7FUYOHdLLyg%2BuvL8EvjAKS4M12k%2FCs%2Fkn6eIB7CVvu%2FYkBze73%2B240Z6VJAjg5HyxgXbdgy73%2BNeU7bVxcj7bKsTVw6zrSnd8g5%2FJp2bqpRTIO%2FmZ0VY3JiS%2Be1vkiFsd29Fq4bXKkAiqpwm2bd2xMZuBLRqJqlmIjfK0aPfqLgwfHzcuJVrIJvs7d4V%2BTBM%2F1F69V1UVap9d02uvR7%2Bkb0BU7EAt%2FFsoq%2Bcx93LpYe%2BjptqFtJO%2B6In2g%2BYp61KU5HBlKrdWDruR5fqREUGKyYn28lgCmJeZtfVeT3IYLSUk4mkatdae3OxpCGf%2BKVzKqTcvinVrmADZNOOgR%2BQ%2BAwKBt7UtczWqBJkEyKqvLRMIFOMc0J5fYyQxLNLyPbJQi%2Fxbn7%2BfRN8%2BOfjd9uZfTKe3vtfCBOcZfmCyzCMnGlMV7MBk5Rx2y%2BaNG06iX3shSsQbYtoY0eIF6I0NyiNZrPhSeB5VLotPzzJji0GaFaRcURx9GTSSdRqWGsQvGVyNolR4y7Tw2iAPG4cy53JNMXnxZJctk1C1b9D5%2FUFYF1X0tUbOfuUE279Er5gFsN46nFae1hJFXH6TDoBKq2IVb68Y7q%2BQ3swm44O%2FGxUpWUrLO0AmlXqSKSzC270NnyesGPYHlzSWuaewaVVN7pL564EmG0C8Yb9Lkc0yQUoIJB37gr2vFNWyToAqhBWYfULKB6Ip0kFImwbIGyzGsRtpEAK1E1z1MRtRvV5VteV9T0EboXbLvz4BrbMvHQVLz9eFm48MyyVwRd%2FqiQbFdNnXcBs2vNzBJO8klc4ep3wbFxSiheeMh5iJwuyhZ83RDlSvaOfJ3db7Skjfp454tWelAKHG%2BJc0kS6m9J2R1mSlPzKZNHnF6nLOXUUmU6xtMd68KKkxGpoIjQ7EtYeN%2FahOIC0jOPJx2btwRx%2BP59ixk7EZkeDOYI9fFRa%2BlQ2YZZ49mK%2BrBu4w2%2Fjo5Ej7x20H92tgLUlrMPv4VOsNUJgtZ2seGFSYNQN3GjCaawdYO1z7x4KrOTysUIn6xa49rltD%2FGdCeWAb915mNUvxIAUclkPO2GDBnqZLPHTywAA4xXMgEYuzzhpxUxpTjK6YkamFLcFhRolNZne%2BZw6mEyFs%2FaQE4SzfiEnFFbFMJ66cNYeVtJSGBKs3IQzjZRyLoSzTmAShDOyjfLz70llg4Rw1gVMknDWN5o0UTvPNC8HWyGfdYO4sR%2FFD2Lyvh8owJMX0TqASxDRegZXFyIae1gJIlrfsAoRjWUsSxDR%2BgVUwZ2muzD0Y2%2BNoSgUNP4KmiEfFtBYLixQTyjhTMVHFIyjkw%2FCWxekGHphAdBliqMvgvDWYA6%2FskDHp8RFEN4NzOFXFujkCQvh7HXCc%2FCVBYSFIlmULTy%2B4Tw%2BoEpdXT6lm8tnVp8HJMkYr88nisIc7IlUJrV%2B%2BvX5aGVEJu%2FztQdzBD4fbRpt6j5fezBH4POR1wMJn68TnsP7fPgcS7YVrHD2BnD2rJ7rPerItgljLvhIXPciXD2yNTMv68jP1aMtgBGuHpPCIf3WoDLqVrxkA4vIx%2BiE7fC1HYunCc%2BPBZ7Dl3M0qFP1maEKNE%2BqnqOB%2B0cJnPPIhZaZIioAPaV6joRVBNkOeFf2PA7zB4gArefCjkiApjbNh9A7xWcKkn5R1pUcY3wmiocc7Ic0bvV%2FeMVnhDTNLDzLxpXpDintoWwsxPNapUSQbr%2FADsfNhhUxngwwnmhIoWDN1HiOJ5qOPm684wkh3BTjCc2iT2Y8IUQp%2B%2BNJubvzhKPP9qAOPrIQZL%2BvECbHTo2g4cAii4GF3cAC0NKkZQL4IZIooCaipQ8tsoI8j7Ax4WiGFnLe4srDuTqRPsfgliPEr88hV1lY2S%2BvDkSm5RXaQz14XVKDUko4dvGcVIH1UVg3LVbKcTt2coJRengVwVFWIM4U8cYpSPwQx5XDEvG7UODNFm8gDQ24QSrEISL7Y3EdPLSnVeSYL935LxhqTVku7oDn8InbgCTBlYh%2BTc4KRFsgOnz2NsBzPvYQ%2FeQF6YSAALUFqIOncJe5JxRQ7RcBaltxg5TO0zOotIXS%2BWjqrgWgLQAlpfP0DChth8Si64WGKiBtI0AO7x%2FRlimmkKa9rsC1Na5dc5yY4WqaGFqus3CLeaogTEPTahgPW2oZLsLA9q%2FDNM5Mwsyfbhxv85kn%2BykOqwGt%2B%2BLF35Ovnxtafnif3y35%2B%2B3L%2FsH2jCYL1M0XbcKnaO7WUThPjIzTHdwbXJg0RC2KkevD7%2F7ev4iL6eEawk3kbrJpQxQ9MeHIf8JRRypTNZ3%2BA5ZM50jNyrWOjxuirjsg65ufQsfFt2efyLiwM%2BDTmXEE5W6xVSC%2Feu7zq8ORqUrdAe3BJx3LhAkhUzMFdvDtEGVcA0us2Au8OPHT4espYMftV2TS%2FDAdflfEwjYRUB%2B8wEnH2bSo8Ebg2w3fEWyUKJNXFicAJ%2BOvwPcofIffK1Em5%2BTNnzYw0EnRFeB2BLfPHRMl5%2Ff984%2FPd%2Ff2VfRN%2Bej7P%2B6%2BzAjYYvi5gfMmitLmDtdpYzv2Zpk6oICsmxR%2Fp6LJeSGhkGUT2KjRNvnSTDqXJLM4k31V0orj3ZfTo923nSvP9%2Fc%2Fu3EjDzZOIhkcqcv8%2BfV49eGr%2BvP7%2Bubq87P0%2Fs3DX7NZLiwelGWKJMiDsswe9hoB%2BuJcY%2FUmf0JazGEXlWtIErCGbtuW%2FfD8WztW4TdCihCWCx%2BLG2Utg92oQ8xOZixJ2aUz1vHsVVInc%2BkFrLlqVblqJm3fgqypFoUYVnquZ0KbDQldeucjZbTCitFy34xuUCkT74NJVIakVCp0NiX1AKGpjKwaDpGY3%2FcP9uynzgTg09nxuZ6n%2B4wmMl9%2BnXw2ihnV4kYS4j3w5nOD5eZ7fH7ww0R4pzsVJdV27Lrf%2F6xRb9uOZAc7Q21kozuiuWvoItSufaGBVq%2FjzR1SzTE6d%2FIJv0P%2B6G5c730aTx%2F3oGmiIm1joqDrlVHGUYgCkbO3e5flcRr1hdE6G8VzdrzL7siUhUUjvR4WGoKFx7BQ58zC2q5jv8yQt1r7oirE2WBz6XK%2FVSEAyrsRb%2FJE2HIEo%2BjUJ%2BX05oQbSVUIoNBKxIuyEN1R7bMsBNHDabI7RyMVbYzB2ch8btSF1c2O3o6BeDsmuo0M5%2BBMbbA6EHeLK539YcmzHRdGAjEaNXcNvw9ShZE%2Fa5IfwzWoUtvJQjh7dnFUku61i6RSMf6AzkmQHdmT8WAYJo9LNTIA0p907ZhofOqtY%2BqkGhGpJVsqQi0g11Kr0TQOf9W7aILXRq2%2BekTLGqBLLBp7j7cF3jviptHynn9beNNFoIK60w950JxFNhcwEl%2BkofNl6IfRjv2pRJBF7ynDHS%2BC8WcWA0FwEo605Og8DIIkhH0o3rz4dY2jawzsur1TjvJ%2FNVxbGazl%2B25llOpliMe%2BlWWslaXz8%2BYNTQkYT6SdDeWAV8iunfEMvMmwGSAjjaHVtDK5758pSnWwqt4gfHzcuFz8Fg2XzCZkHxpt%2B1T29oHnDE3HPpCpYYBmtxy2D1DwtJz96M9C2ulUtZ5989m3AULDxqs4%2B%2FHfVURq0tFetfEMnTJsaKjhmtVkTB%2BdteToTuPazoQGMkvvbSBrJ3QQUgV3er1cEex3Ej1ZsK90iXm740mBHEV9ZVwpDKgW31nU1xD%2FVe1Z1CduI0Kn1InNBI2LNGiHbHTNe0FDS71h3gsz0pCKlXXqh0ClEzqcP8yTLWBc8vzgbGmroaKF5osXpk4boNdbFkJWDpqrPmGtBN15wGgfCw6mlTRJL2oUCbZb8NN2xU47SA%2FPGOrj6pLQiW7QsUtC40usb2PUJWHPsfQeupijF%2FSUo%2BO5JFW8qXRC0mo1SDJYQ3Zw5CyWkY6FphavkRNdk8Mqvxh9YUvtgaa4NDKhoF0vpgDLJlfoNDsqaNfbJb7UBu2mpLeJ2om2P3goryrj6i24%2BdmceguAiqqIo82pu2CoPVlZls0u7mu3dLqPIa2c9BgJS4HCalADktQTT7FXtnrgaZPdKZt7XwbqfRkjpKouj4qqlsyIqWgpyaarUVsnf6HPyStf8uUprqFNyP0y0UiyToo4yv0i7mvarj%2Fo7guNxCIB0FgNHuVGFTTgWA0e2Cv3Mnjg6uCEjBKUG1YUbW4yWFdGbuhJpz6Bcg%2FWQkaVaro%2FinouV5XYGUACWH5aLGGDzymBpxVz0dzn%2Bwnba9aNXUUpFerg1ST0P80BDvHgLHQWvbHLicxvAIBK3KzGNzQvr3gQ3%2FEN1%2FzevcRusSQc3VjhOjHEKqEOlhIoF2ij1o%2BvqMapVm8FqInSrJlqurNkRwdVPY5yPfSvRy%2BV65iMMbg0OLIVcopKMdL265jQO0kNRRdmnMLluxOw%2FMIQWFi%2BVO4dNl7LL6Li3i2ft5%2FAbhubnkoUGcwsH1E6LDSVmrPhm7jONH7DN2leeWvDl86hp6WM3u7biVQM7b7LVlc1nUURgnDOizEa9ipjyxpGl15KaNzftFcx1YF7FVwoO4FepbAyFu6ErCioADP6XuboHDr23gWbDuPUcg7MYkni0e4FQJM6gcQpvReo5hCShYmLjSfQ0xSWxsB%2FMVSpqjeOP4o5etXmGBeTjKzECpBkVn0IuoANSD2XfTZrZEndT%2BYKHiL412JXlG%2BcVs9MqIRRiwmq8J6AezGUbMl34eHYZjpQYz1hsz9FTdJkqklK%2BujNuohZp7hiSkdW5%2FKrlWRNuCIVukqHYyvjOttkWtmUemtl3P%2Bn9ut8Rc1T0jSlhg5JudHgSDwSDRE1FdSLaJx7gWiaSsNFgcwGunb1jUnZNkevMWXMKSCPK2hlxxWgV24km%2F1ucmXhsc74XVeLtkNpJ9dVkaplwUYvS1nsygRbllExcQAOGDmhAvDe6IasMynvd9TSvuGGLfLWXq901ELLqfa9fWS5A%2FhpdUWFLTKQymAMbVUgGFIqg4dRGMb7l0f2epludQ9P%2Fh8%3D)

## Использованные инструменты

- [Typescript 4](https://github.com/microsoft/TypeScript/#readme) 
- [Webpack 5](https://github.com/webpack/webpack)
- [Babel 7](https://github.com/babel/babel)
- [Jest 27](https://github.com/facebook/jest)
- [jQuery 3.6](https://github.com/jquery)
- [ESLint 7](https://github.com/eslint/eslint)
- [Stylelint 13](https://github.com/stylelint/stylelint)
- [cross-env 7](https://github.com/kentcdodds/cross-env)
