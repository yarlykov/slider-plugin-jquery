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

![image](https://drive.google.com/uc?export=view&id=1Aos8Nhic2kd8ktHTJxJYpEpAajQln-L-)
[открыть превью диаграммы в draw.io для удобного просмотра](https://viewer.diagrams.net/?target=blank&highlight=0000ff&layers=1&nav=1&title=UML.drawio#R7V1rc5u6Fv01mbn3QzKItz82adPe0%2FTctMlpm08dYhSbFoMvJk3cX3%2FFQxj0wIB52WimMw0YA9Za2tp7aWvrTLlavb4PrPXyk29D90yW7Ncz5e2ZLANV1tF%2F0ZltcsYwQHJiETh2etHuxJ3zB6YnpfTss2PDTeHC0Pfd0FkXT859z4PzsHDOCgL%2FpXjZk%2B8Wn7q2FpA6cTe3XPrsN8cOl%2BlZXVN3H3yAzmKJHw30WfLJozX%2FtQj8Zy99oOd7MPlkZeH7pD9ys7Rs%2FyV3Snl3plwFvh8mf61er6AbtStusm%2F%2F2X5zb37p7%2F%2F6vPmf9c%2Flx%2Fu%2Fv54nN7uu85Xs1wXQCxvf%2Bs%2Bvp%2BsPX9Wf39e3159fpPdvHv86T78i%2Fbbc57QpU3LEPzjc4gbevDgr10JNo1w%2B%2BV54l36C2uDScp2Fh%2F6eo5eDATrxGwahg7B5k34Q%2Bmt0dr50XPvG2vrP0U%2FYhKjd8dHl0g%2BcP%2Bi2los%2BAugE%2BjgIU5ohbuavuIu%2BiU5L6GwAN%2BiaW9wuIDt1Y23C9Jq577rWeuM8xi8cXbKygoXjXfph6K%2FwjSICQDs9yoCOD8LA%2F5WxKvp%2BRTRS1KLWgK85mqbovIf%2BCobBFl2CP5WkFI60F5rp4Uue0um5ZY7NspKetNJutMjunT3uC%2Bp2lrdAjZA9L%2FvaFpuBqs%2FTi4%2BzXAS8Z4XwMmrGTZ6F6I%2FcT92dirlZg6eA4umZfBlTFD2WYitq8DDHTBc%2BhVxebtbW3PEWN%2FE1b9XdmS%2FpD45O%2Bei7T27MiaVj29CLOYOebSW0ioiy9h0vjFtEu0T%2FULtdSRfamYZe6Aodg90x%2BhddHoRXvofoZTkxjyDi7AuMeMtgWGnn3c%2BwbRG4vQCX8KmAbF0YZQrG8%2BTQsa3Q8b2TQ7LEsCzDlZv%2B2RXe6tB4q4xuSyDsOvGokrYGYFrcPfCvEJDR7TDe9xEd3p4DihMKzQmFgb9rPUL31t84MSWVt0FyLcGLoTqxXhFUsyNMNZ4phsgtQNb4X%2F8%2Bi%2ByMAnbMPqEO3RWqhtps7G0C63%2FMc%2BsJ2VtNu9l%2BdO7%2B%2Bf5i%2FzgHksIBdiGAPQBYIDX0qlpElmWG0y77NTonkG2EbGV3qjtkS4yxQLY5spo8OLI601WeL%2BH8V2yNBbzN4TXM%2FuCV7N8PLz8%2B3z9Y18E35aPr%2Frj%2Fci4bTHSdjUC1eXAr9ehCMV%2BZ7rJfHfhCAcjR0iShpbWnpWXaWU0pTWkmpQFCSlMqS3f9S2ls0xPL2BM1NXpldo1FRzOZGIbb9elpoa0qaLWR7lNBYzuCMscR9Fdr34NRKwvE20S8qrzWIeJsC50hfuNsTs9UDwu6ObRBn1GQUwhPXSivDWoWQw%2BllAPerKXjOWEU5J1YH%2B4MSDC4OC7THlcC5fPaTqVxAWY1MJtmGbQHpkL3y3iADSCC8io%2FzApcq%2BNa2XHqrpPSo2iEq%2B1s1q61vXMdGwYC0eqIzgZXwbGsQiD66Hj2u99R8CPgrC5agB5Vbw6cMhfOOJnz3W8PCkzrYKoO7hkpdNoAxvSj5z9uRD%2Bti6kxvINEJwxgTG%2BikE%2BAWhvU2dDeET2S%2FvdxAwP0EygQRbJ39xNUOkhTN8p6vcEgSBY%2F1ZuhqvS8%2Fmeo2PaHomoSa%2FspYU9P8qZZVtqHD5qoYpGqMzFbJAC3DyprTooFaguyJvOFeTlncDURVbMdGDWG687sm115BDPuoprnx808cB6nIWu2gyYr4aNfNHnd8tkTeDZJ2646dHYG6IwCC9oLiL3xeKEq6cyihlr6C9%2Bz3Bs%2FHgOjIfAnDMNt6l9bz6FfHGzhqxN%2Bz%2F39EN0KNX5y9PY1vXN8sD3jTcOWNfrGfw7mcP%2BAgsKABSy7X3pd1AqlEAbQRV%2F9nb%2BokxRdIAAaNUAGnUhBIdYAkB2isYMZN94tDBz01jC4SyxiisPP59Ua88EK5jjYfRMteUenbMda%2BZ59v3Q8%2FNG142bAeza%2B0F%2FHdhSdST%2BPEfdQK33fsSE6fMh%2FtuNGfITJkcDIeWPMth3DHnLcq8q2shg5z7YycWU%2F26rSLTX459KFqUopBVIzf47D4sqUTG9%2FGw1hu3srWjG8VgERUaU0Sb61IzZ1I6AVM0k1k7hRih7%2FRvhC%2F%2BlpAwvXIDZZ29wV6TDM%2F1F68V1UVSp9d00uvR79kbxBq2IB3ceTib5sHjeXS498HRhrFtJO%2B%2BIn2g%2BYp61KU5HBlGK%2Fmem0H52pEwUZDE9O1pPBFKJ7mU1X5%2FUgg%2FFSTiaSql3a26uLJRX51F06p8LK7ZtS7Yp2gKxqGLoDkp5BocCbupZZG1WGbMJEtSstE8iczjmhvL6WkKSzS9j9sw29xLn9%2Bfet9%2BGfj98t%2B%2FyT8fze%2FcKY4MzKF1z5fmCf7nQ1BVJVfGtl3PaLJk%2BbjmIfawEFonURrewIdYUozw2Ko9lkeBJ4VseTkW7bHZ5sx5YCNKnIOKI4ejLpJGoxrDUY3jIzrM2mNGqudyYeN47lzmya0vNiUS7bJqLq3759egFY05V05Z28%2FbXRndklesEshfHU47T6sFatiNNZoKbyililyztO1nfoAMyqo0N3fVTlZSv4XjypAIO3%2Fsvp%2BoMdYFp5CXN3mPKKGt3HU1YCzDorXiua2w7RZNedQEDewxUyuFMWxxoAqgy%2B%2BIqOv%2BNcAhGtDRCtzZqGa2WzGyXhmlF83qzpgvoe4jXsrQv3vUJfbj0q68p9l4X33hqWyuBrPlVWHxWzZk3AHEEoxl7AKxy9RngOHobJdGQdrcMWft4QVUj1hn6e3GyRp0z4eeaIF3ly6hpumFNIEzE3Wd8dZSVS9iuzRZ9fLJNz7Ci2OrNSH%2BvBa5Eyi6CJ0OxAWHvcz4fjAPISjScfm9UHc%2FhtfPBEnYjNDgZzBFv3qLysKTFP1hTU4RMUNHbE7Xsf4VbAWRPO4bfqwUuKCDgtO6lRGNURhR4MTjdbtQtY%2B9yihwMru0qs0MWaBap97s7DfGdG1d87OPeTMoUUkEIe62HDa2AOq48BAMYrkAGNXYVx0gqZUp1kY1HIgMbJQOYbn2MHs1WhrD7kgwtljPqpFMZTF8rqwzq4UKaxMsuFUNYIzBEIZazqQEIoawLmCIQyjSdiC6GsKagjEMrYG3oIoawJnMMLZboQytqHdXihTBdCWZvx6vBCGe0Y3fu%2BGzprCkWhknWvkhlyQ5Gs4WIB9YiSyFR6RKE4OvlAu3Ypn6EXCwBd5jjzItCuDebwqwV0erpbBNrNwBx%2BtYDOnpQQzl4jPAdfLcBY%2FJFMigqPbziPD6hSU5dPaebyEfOwQJKM8fp8or7LXkukdla2pzufj1cRZPI%2BX30wR%2BDz8abKpu7z1QdzBD4fe42P8Pka4Tm8z0fPqiS7ugpnbwBnb6Y19fWalW7UyeeNuHYjcy2LcPXYvfmIXD3eohbh6h1hMRCDt5pF5F00QnR4fw8PLMLfawPPwf09YHAn6BO%2FT6B5VJUZDdoriuCcBxD1zBhRAegxVWZkrA9ItrC7tuahnz5AhGU9l2gkKuqrVbMg9EZRmUIkXWQVIscYlYkyIHvtkNZZJZ%2BuojJGcmYSlCXjynSHlPpQVo7Julp%2FxBBsvyCDA5NhRYwnA4wnGlHyVzO1LscTTScfN97xhBFuivGE16OPZjxhRCn58STbnnnC0Wd9UAcfWRhi31cEk23FnaDiwCKLgaW9gQWQRUaztO99JFFASUTLH1pkhXgeY2fB0Qwt7GzFlUNzdSI2x%2BhuQ6%2FObA67fsLKej05EFstnFAf6sELJxicosAhpDNRBdYHYV21mkKH%2B6mz04riw%2BsAjbIC8VYRrzwR1R3itHKYIX7vC7zbxRtIQwNusEpsiMj%2BUFwHD%2B15tTbmSzj%2FhUKtKcvFDfAcPocHsCS4DNGv0VmBaA1Eh8%2FhAXTORw7RT44XTwgIUGuAOnwiD8494YBqvQpQ64obw6fzAN7y6HQ0hWsBaA1AB0%2FnAYC31yE2vaijCkjrCJDD%2B0e8xYkxpLHVFbjWxrVpjlNruJomhRa0FxDPU3l%2BHJoWw3jUUkt%2F4XuWe%2BPHcWYUZv6EYbhNZ56s59AvBrTw1Qm%2FR1%2B%2FMLT08CG9W%2FT329f8wfaMJwuUzRdt%2FOdgDssonCZGhvFe7BUujBqiFMUAuui7v%2FMXddL1aA3hNoCbZNqQRE9MOHY%2F4agT9aiqTv%2BBmcznSMl6tYaPG6JiO2Drm598G9IbrU9kXNh14OOZcQTZvq9FIL868OXkcGxVpW6A9uCTjlnChJCpWwV28HrtMq2BRb3Y8Zww8tPR6ylgx%2B0T6tLdYTp82XbcNwlQHx3PjsfZuJTwRuDbDN8RVHKX2euJI4Cj8VfgexC%2Bwxd1l9k5efPnDQp0YnQFuA3B7bPEu2T%2Ffnj58fn%2BwboOvikfXffH%2FZdzBrYUftCz3wRB3Nz%2BOm5s29osYwcUsHUT%2FHcsmlxgCYUtm6BGDbbRl86lC0ky8Znkq5KGj3dfjo9237avHdfNf3YLAwc1TiQZHKjL%2FPn1dP3hq%2Frz%2B%2Fr2%2BvOL9P7N41%2Fn56mwuFeWwUmQe2WZHPYaA3p8rrJ6kz4hLuawi8o1IglYIzdkS354%2Bq0dq%2BgbEaUHs4WP%2BEZJy1A3ahCzsxnLUnb5jLUdaxVVx1w6XttcnRW5akZtX4OssRZFdKz4XM%2BENisSOvPOR8popS1Gy30zukJ9TNoGs6iMSKkU6GxK6h5CcxlZ7DhMYn7PH%2BT6T1kXQE9vj8%2FlPM0zmsl8%2BTT5bOAZVXwjifAeuuZzheXmOT4%2Fun4kvPOdioxqO3Y95D%2BrZG3rkWyvMdRGNroTmrtGLkJtagsNsmZd19xhVRrjcyed8Nvnj%2B7G9d6n8fRxD5omKdJWJgq5XplkHIcoCDlrm7ssjdO4L0zW2cDP2fEuuWOrLMSNdDosNAQLD2Gh3jELS01HvsyQs1q7oirE2WBz6XK%2FVSEAybsRb%2B3E2GiEoujUJ%2BX06oQbSVUIoPAKw4uyEM1R7bMsBNPDqbInRyUVbYzB2ch8btKF1c2G3o5BeDsmuXlMx8GZWmF1IO0WMz1huborXEUnrUeg%2FRKSMioCGYDAvSmB9jKxJXfZZD%2Bm05hNrac6lZEzyibbsTPW%2BvfIqAxVcwDayuMSpVqjLY9Pvdm9RqLUEdo9%2FENPjUB92b3ZbADDhxs7x06M946eccidc5KxS46jHdInf0wj7yQ8ukTh%2FCKOv6981w92HI91hkQCANHsp%2B0EKIhNAikETsSRmhyd%2B54XxcGP%2BM3xr6scolNgl227cpATrdECzWAt33crk1TP4sT2W1mmWlm6uKje0Jyo80ja2SCkUqNMSDqsnek0vsmwGRAjjaGVtDLb9p8rSnGwKt7Af3rawE68E43W3SbUPzTezqvt9w868Wg6%2FYOYXwZkisz%2B%2FgEwT7MplP56SD2x63j998pLQfvx31VCr9JJq1p5mk8ZNgDUaOFrMl2fnPrs0J2mFZwJDWQzvbeBrJ6cwcg33In%2BckH13%2Bn8bNW%2FYBLTdqczCzucGVDGlQdBCvqNZwY0wn9Ve54ZYO5FwqfUkU0njYs0pEE2mibPkKGlXjF5pjXSsCqeNbJDoGCE9ichd8kWMC4RfnC21NVQyWr1%2BIW5kwPk9bMZQdYONFd9wlqJTO5HXT8WHEwrqZKjVCkSrLdqqO6yn3qQ7p8X1Mdlksgcc9DQJJHxJWXbWjJJ1HNmeg8m5uBVQdnoeCFJBW8qmtEGs1qDZAsL0faOnHgt6lhoOutq5CQX9rSVpEy%2B8Eztgaa0NDKhoF3HU4BZkyt8mh0UtOv10ltKg3ZT0utE7cy%2BP3gor44rR6s7P7sjawFIUZVwtDsyFy1qT7OZWoz76q2%2F7mNIyyY9RsJSoJC%2BV1OaAknqiafUK8964GmVLS6re18G6X0ZI6SqLo%2BKqjO5JaaS9SirLmmtnfxFPictn9ktT2kNbULul8kxDe27X8zNUevZg%2Ba%2B0Eh6JACk8tN48Mh2u%2BAB19bgQb1yL4MHrQ5OqFOCbNcL3OZmC4vT2A096dQnQGblmFKJ%2BeOo53JRic2WvnSvxTJ2CZ0SeBqei%2B58vp%2BxR2fZ2IXrseytYIA%2Fqa16c%2BSCehAc2yIusrKK1nSuXycmTwAg9fO2Bk8y6Q8%2FqNvBkxYU372GEC9aJ7d%2BuIl6eZGte4sdZEvISdNCr%2FmmOVnexcj%2BzzMVXLtwHu05oaqHUa4H433waruGmR6D644jW2SXVQnjWoPKi6TIO0kVFZ3WOEVrg0fQ83FHaKPnS9nuZuPt%2BXjY6r3nd%2B1QtLfRTk8OhdFazydckxmZp91xxzdpEWv8Hd%2Fkufy1O750gTwtZfT9vp4C1mK%2Fb7IZV4mxwPFNx%2BGHUdGqjC0lmVzXKZGiQlWrYqoDWxVahTsCq4J7WRvuhKwopLozeitzcIJe%2B95FOwbj2BIaTLze8WD3Asg6aVM6yh0GqjmEZGHSSuYRWBrc01rwXwxVKoqZ449iDl4SOsaVKiOr3wIkpa0QhVwdB6SeC1ObJbKk7kYTEY8B%2BmuxKxs4zl7fmlCJohYTFIeII3AvhpItu13VOLI8AWq8P%2BJuf4yapNmqJinpo%2B%2FWOGad4nIsnVj6210hptmEy12RS4A6bGVaZ5tMK5tSb61M%2B%2F9cu96tqHlMmqZU0SHJtkIciUeiEaKmQnoRlXMvCE1TqbjisLWBrl4F5pJUnuYLWFvmFJDHFbS2xxWgF24km%2F1uwzWjY53xu64z3h6qjVxXRSrWHBu9LDVrr9LwbGYUujgAezo5o4Z1bnQjFrFk9zto3eBwwxZ787ETHbXIWq19b3CZ7VF%2BXKYI98UWpDIUQ88KEAwplaHDwPfD%2FOWBtV5%2B8u2o1d%2F9Hw%3D%3D)
