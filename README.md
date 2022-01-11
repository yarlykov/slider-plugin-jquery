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
    isRange: false,
    hasFill: true,
    hasLabels: true,
    hasTooltips: true,
    color: 'orange',
  })
```

### Опции

| Опции         | Тип          |  По-умолчанию       | Описание                      |
| ------------- | :----------: | :-----------------: | ---------------------------:  |
| `min`         |  number      |  `0`                |   минимальное значение шкалы  |
| `max`         |  number      |  `100`              |   максимальное значение шкалы |
| `step`        |  number      |  `25`               |   шаг шкалы                   |
| `valueFrom`   |  number      |  `50`               |   значение одиночного ползунка / начальное знач. диапазона | 
| `valueTo`     |  number      |  `75`               |   конечное значение диапазона    |
| -----         |  -----       |  -----              |   -----    |
| `orientation` |  string      |  `'horizontal' `    |   ориентация слайдера (horizontal/vertical) |
| `isRange`     |  boolean     |  `false`            |   тип слайдера (одиночный/диапазон) |
| `hasFill`     |  boolean     |  `true`             |   заливка (от min до valueFrom либо от valueFrom до valueTo) |
| `hasLabels`   |  boolean     |  `true`             |   подписи шкалы значений |
| `hasTooltips` |  boolean     |  `true`             |   отображение текущего значения над ползунком |
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
  $('#root').sliderPlugin('setValue', 'isRange', true) 
  $('#root').sliderPlugin('setValue', 'hasTooltips', false) 
  $('#root').sliderPlugin('setValue', 'hasLabels', false) 
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
  
  Все `subView` имеют схожий базовый интерфейс, каждый компонент умеет формировать шаблон для своего элемента, в случае необходимости добавлять слушателей и сообщать о своих изменениях. Также каждый `subView` имеет возможность обновления своих отдельных стилей (без полной перерисовки всего компонента).
  
  Для инициализации либо пересоздания графической части существует `Slider` - это класс-фабрика, который в зависимости от типа слайдера передает в главную `View` объект необходимых `subVeiw`. Это позволяет локализовать и изолировать в одном месте создание всех графических компонентов и передать их главной `View` для рендеринга, подписки на изменения либо обновления.
  
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

![image](./UML/UML-11.01.22.drawio.png)
[открыть превью диаграммы в draw.io для удобного просмотра](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=UML-11.01.22.drawio#R7V1Zc5vKEv41rrr3QS5WIR5jJ3Zy7OQ6sZPY5yWFxVjCRqAgvCi%2F%2Fg7LIJhp0IDYInEqVccgFmm%2B7p7ur7tnjuTTxdu5Zyznn10T2UeSYL4dye%2BPJEkcaxP8v%2BDMOjqjC1p0YuZZZnzR5sS19QfFJ4X47LNlolXmQt91bd9aZk9OXcdBUz9zzvA89zV72YNrZ9%2B6NGaIOXE9NWz27E%2FL9Ofkd6nK5oOPyJrNyavFsR59cm9Mn2ae%2B%2BzEL3RcB0WfLAzynPhHruaG6b6mTskfjuRTz3X96K%2FF2ymyg3ElQ%2Fbz0%2Fqnffk0Pv%2Fn6%2Bq38f3k4ubLj1H0sLMytyS%2FzkOOX%2FnRf54ezj7%2BUB5vl1dnX1%2BF83f3%2F4ziW4QXw36OhzIWjvAH%2B2sywKtXa2EbeGjkkwfX8a%2FjT%2FAYnBi2NXPw31P85ZCHT7wgz7cwNu%2FiD3x3ic9O55ZtXhpr9zn4CSsfjzs5Opm7nvUHP9aw8UciPoE%2F9vxYzKRx5orr4E58WsBnPbTC11yRcRGTU5fGyo%2Bvmbq2bSxX1n34hYNLFoY3s5wT1%2FfdBXlQIADIjI8SoMMD33OfEqkK7udEI0YtGA30lhLTGJ1z5C6Q763xJfGnE6JNsRJO4sPXtETH5%2BYpYZbk%2BKQRa9EseXTytm9Y6wxnhscgeV1yW%2Fw6UeF93zj7OsPGuDuGj06CUVylhRD%2Fkfqlm1OhaJYQU5ER01Eon%2FiljKji0fZTYmmjBz9XKFdLY2o5s8vwmvfK5sy3%2BOcGp1x874MdCsTcMk3khAKD321EMhVIydK1HD8cD%2FUE%2F8Ojdiocq0cq%2FkKn%2BFjcHON%2FweWef%2Bo6WLYMKxQihAX2FQVCC4hXoeZuF691Frat8BZIUwbXsiBKIIj40DIN33KdvUOywKrM%2FYUd%2F9kU3krXeCsM3gzCthVOKfFoiKC53QL%2FAgMZPI7gfROIw%2FuRyMiEzMqEDOBvG%2FfIvnJXViiS8nsvupaSi66UeMwJ6qQhTFUA05MAU4R9AmyN%2F%2FPfo8DOyOJGsvdIoZtCVVOqzbxVYP00GRkP2N6q6uX6wrr%2Bfvtq%2FhqJgpwD7GwAdgdgRaGiT1UjspAZjlX2R3BuQLYSstzuVHPIFhjjAdnqyKpS58iOQVd5OkfTp9AaD%2FBWh5dwXW3AK5gvd6%2B%2Fvt7cGWfeT%2FnCtn%2FdfBtJGoiutRpQrR7cCi26UOBXZlX2h4VeGQBziDRhINLqI9KULLHFzaPplXg0keLRZO73tc%2BjwZYnpLAP1NKMuYWrLzTaBMTQXy%2F3jwqtlUArjXSbBBrsB0o5fqC7WLoOCkZ5QLxOxHnZtcZ0W2fwZhA%2BdMq0NKiTjilTkU1eRWG65Vh%2B4O3vmQo3haPeOUkqsVNvhOTz0owp0gFLTvasc15UYm1tMLea1mppG%2Btr2zKRNyDKjyi3t9QYoiQOoxC9txzzw0vgLQ1wlmDJOidBZSkXzrDy68OLgwZMy2Cqt8h85mDKphkJpheOe78a9LQsGyF17hXJbIKRYHoZBAYDqKVBVbv2jtiZ9H%2F3K%2BThn8CAOFSGtkBoy3GqlwiIprECogECIhYxFfmU9lik39cLShu2P6D1cWNx3T%2BGjJWxQg3eideGRKoxtnMoF6wfVCgog0CtgfsCv3BehQpaHAj1VQ%2BMKuDkgbrZlD%2Bg53GYq%2Bf71dSz7g%2BD%2FKoHTSg%2F3C6aOoMVMmeIuG5hCxTt%2BeBxmrsz1zHsSzc0mYHFfES%2Bv46dMePZd7O2Gb1Z%2Fm3q77vgUXjso6P3b%2FGTw4P1UV5mp2jMV%2B6zN0Xb7Q%2F2GWeo6HnxdcEoFCLoIRvf%2BpK%2BqJH6L3EAqNcAaWwhBYNYBUA2iIb%2BSDh4V8iz8LdG3nVkEGMcHp8XSyIPhjclkdG7oJkSnzItY%2BE65s3ccshHZ5adAO%2BY5EJ3GZpRfCb%2BPETcwaN0u5GG4PAu%2FdlGNsIjIhwRjDnfmEjbRsLuUrLHK21FAVVa2ooi8e3Sxitusb0fCccTRZAyMdOIxFDcIhk%2F%2FiqYwTbPltVsLKaIlAMei0l010awmQeJhFUgTsWEelCMXv6DyIXuw8MKZa7B0mSsU1fEs3Duj0riUvKjFKHwu6uiXnQ9%2FiP6BrVGlqyOR1mhU1J%2BkSrUxK4OCgNcYUOU5FdxdlgEqAgHw5lkRUyXWbcrCWYzbpcobdVRgDORKfWaVG39aIEzyctjH0ghYKG288fWvPLUWHmYDJULhVHZgTRG1wPkuEUg1%2Fq5dmF8evku3q60%2F03dz6uLeeIpMDjGjsp%2BAskAxIttmcC6ZY1k8yYMeIfOYZZWT6iHEoS1KRKT%2BAOHXPZVF5RsBQKsoXVQX9bV45cr5%2BP3i1vDHH3Wns%2Ftb0BiM2lzPnVdzzyMNHVNaMosLd0umnmsdBDGGjM0IFoWUW5XqClE8zzakJiIJqgBT348gdr35vCEYxQG0GjZth5RIodTRpJlKMYTkZEOOBElFohHPiNCLWem9aMvEhZTNgILFxgLRPWLa%2B5fLF21z6pYyesvNmnMLrGddQzGhx6plYcVWjmjzXITUclb7OZgeq1qQhJwBFtWUCWPFJsbDtap0IsIs0TIe%2B%2B%2BHrBXWB5cqCOyKXBBwlMqWm2MzLl7i2gV4jMCOd%2FRFzktbx2QLseP4r%2BPyDz9%2Ffvp7ezr9PN3720EN3YYZtyrY6PFwTQB1KSlogy067Rsg%2FNWKroJExMDmmWola5rOJMOTQpNDOQNWiztg6ayKwCqd%2B4isWRZWMM1UCvtUyuSysGtQGRH0uZaklvRsu%2FTxYp9gPWSK7C3BzcIPkCyuh%2FmppKHpxeamzaXnQK%2FHyFIBsaEwyLXvsZUU4wJoJsDYVIFSKhFp90%2BbAVS0KFMoQqYVTMVNYJZwJAM3np5RJMllTuDVGL5zGDJi8Fb72Knpclkq7cukeXV09Ihk50aSm61RHnrk37008PFqHBD%2FfTZC1C43uPK4ipee6TVZbx2UK6a89phzmcF1mDsB4ycmO3opTcGI8iuw%2BUJ4eGZh23rviFZa3lCebyBdWBbVluYeA8Pb9wB7nrhhqrk2oUbasgauJUdYYV8fhDX5spRwEa7w6ZWKuAIcNuwfjYWjpPCpoFb2R1NqG%2ByXTQVuMr8VDp6F1cXnVneyg%2FC86HCqBrI3B5UUyVGIrRCRwbjazR1o2VHDwHkBoJbUZe61mS1oANooEnL660kAg16LUMKV5JFOnso2toEtEqLXhRskuGdi6gZ9wKt9xraJlhGgE5uGVp4MwV6oh2wLY%2Bt3rUnRViPXIM8oFoaVZkQPG2gCjLKMMFomOaN69q%2BtTzgUu3yc6usdO02ySyeMZAMikOCuYVO23E24ctfDqoVkJH5CWblb0owww6%2BH4lruAdy6AzuqfmpMpvIxesetVkbCkMKV%2FimIY2cwAFTXkw733xUYd0%2BBr1Dz0nJ5dea67jeVxznZTIOOytVHkmt84LfcV6N6KEnpcqDCa0x1xia4BSas9tdwGPHAdmer2bVwBwqcjtGzeloXn%2FFkKCopqjQEiOtQgokj6Nt7hgQh0C7%2BUB7rHEE2uDOaFqB45wfaI%2BpPs8%2BL2oFFq0MHjyszbUvXdWcB5%2B3RuJhe%2FDlkQSWL225gV%2BDYuzBO6iMaPerVmlF1QuRnzDUL1TCts1Fq3KwhTujsK5GwA5olqnpBfz4luGEI%2B6ph7DVDREdAP2bVqtS2SapaL8mBsQhMGtj%2ByU9EygpvBnJah22MhUHKtDqTH2Jy4Zun60GSC1f39heZgXOgea48tF8kuwZt79eQhUCV91SJsWbY2kqCQq48z8wTKYR6gDnvCIN80p984ooUAxcspXkNiGRq61iL1H7CEL9S32ZWTS4DmNhsbK6HzZn%2B5YZtSxN367NgZv9F8bb3oFYa993eag7r7HRclbn8BFbtjlgvRPWvIU3De4NWLCmw7CIR%2F2IQ4Rhy4jDDU%2FDKh6N4M2%2FxFtj5hzqOR4C%2B11xbTGyh79y3nbZ0zmaPoUrou1tUN8EntxRfWPUP7hPb4JoWK8%2BIFpmtYfO10sFVi1MIfrZcr7hsH4Adce9I9sGVSoE1XgbQC1LbkBp15ZBzataj2dTtBwALQEolHZtGdC8EmdierGiDpCWISC794%2Fy9t4LIQ2t7oBraVyrpqRrw5Wsep1CC5kzRPJUjhuGptkwHo%2FU3J25jmFfumGcGYSZj8j313HmyXj23WxAi94s%2Fza4%2FVhT48O7%2BGnB3%2B%2Ff0gfrozxaoChftHKfvSkqEuG4%2BsAPNyrjuDAYiEIUPWTje1%2FSFzWieiyHcOWhVZQ2pNEbEo7tF7KonFqcrI5WssGAsFMkR9HfbKOYs6DTZ9dE%2B7qz0%2FatKcTSPU2dZxzFnOWbfljode9wrHfn8%2FJot5l0BAuV4OWcPNfdvxU3ymBdpXwphr%2FHSUdg8S4G5UNPSVRQYl5urLEmMAIjpcX3lmOG0%2B%2BHF1JriL%2BpLG7EfI%2B0uzl49c4jcGCHdIJvMCsP8O4CL3fJYIP4wpV60%2BcVDn9CdAdwK4LL7WDVAK5gvty9%2Fvp6c2eceT%2FlC9v%2BdfMN3lOT5l0c853nhcPtLsPBNo3VPHRVRJhNIX%2BHVMoxIVZgMgUPqrcObhoJx4IwIWeiWwWVHG9uDo82d5vhPtKpz66QZ%2BHBCYiEHdmaP08PZx9%2FKI%2B3y6uzr6%2FC%2Bbv7f0Zke6OtZA0pjdxK1qSwVwHoyTluTid%2BQ9i6uYnVVao0WFUoPy764fFdG6liHzShgn6delA0MsyDKkTysMRCfG%2B%2BxJqWsXAd82ZuOXnMn64rKXkNxFCWt4hsWuhCpolSkPAcLZi36YOUahSJN35tw%2FI8AcU0K%2BD5sVlfxFmuKs4yXaIvq%2B2KM1tWy2GAd7a5uQKc1ZdcOQ6N9TgjzFst9c62OS2SoCxLObKcVoL%2BybI2EY6VCSWFyrEuUN2FvCKtydmHyQLlPTQs0ko5kc630InR3NjJu%2FRnXD5BdRErbPbry7QuZhn%2FsVDVDtKLEynt2kGFox41JTRx%2Fi%2FDA22fhsvJQk8gpvytZNWonREWRC6E8Zga69RlcWTF%2FX3j12zkJXpgvdIDrTNURno23qDEeIOiVDiZcvl%2FgB%2BXJXzLiebWnDIZkJ7IsCZmhWJCy17fhFiTOpBiMtgpKSZ4b8Q4TE%2BniA5CqxDameZV7uMsdcRTnxjTp1koeaeu7XobXQhz8lG6PJR30%2FLQNGa0MTiBjJSU0anrOEHO%2BJ58c%2FLruNPZKiU1KllFtnYaBFh%2BTjg%2BZm1I3uDncFoVx77tcaZX5GemmPrGmaWKO5PwtkdZpKR5rJU2oyNZzprR7APch4cVasQ7U1maEOsHP3R%2Ft34ka7U1rx8c5NaeqseEJmJoXnG7eohETJP5oj0FKRfzFjqg%2FIWI9cc83MWKPXEs6c1rVNqo8jqWScVrSceyNgFi69MOyMKO6dFvzsKWixQBvnXDSkkZWmobAZpR1njcWX61QeqKrGDeE9VVhS0ax52RohwrWW1XdcG9LQ5j0qY9I038e3xaYEGTIktwb7tB1XjWFOSmUXL1G84DBpvyNZ4%2BKUzxfbKuHr9cOR%2B%2FX9wa5uiz9nxufxt1ah9EioLRq1LbiixmHiQKdLl7TaQR%2FY3xi3RKchtgjYCVHD68%2BYgU0tMdNOFqsVk53tp%2FkZRM0maMrXFkRbJY%2BdhKVtgq5ZqgUdC6Q%2FaLripyzVubCcvtFVkbIECoJRvGY6Rqdjt6FjHI9Bp5YuWUGZXpmNCxR8N%2BB%2FGR%2FyrFn%2BT5GKUVXzjG9lbuvd5L%2FdN74spAWarUmxrohawao3AQEzndDS3FMgplCqomaSf0g9q2KWws8xfYFKJjdTgTeILIBiREdntsY3YmH%2FtYadO3FDbh5nf2G3QqaNb1lnW8IGAY2wEbce%2Fhv2ab2vd%2Ban1tIQT2JCZiFt3%2BK73OBhQHk0pVyLJsSZNMU4UBOutjH84oj%2BlIafui5DS5JylZvaKKChtUD9bvPhjgJhSzLsrlgRMntEGUW4OOdWdyfdBGvJoKYVCFaKucVGyNfwROtyppU%2BuJX6VSqT%2BZ3uyU160aU6GTTHeqN%2BxW6eUqmLfmE1LiKwhaNl8Q9FRXyBdU6RWpWUxFsnn4VkEVeiWmEpVklHTKHnKLKZlFyYMm7XZn6GyhQf8jfD2vtbZKhC%2FIQtZ9lHaTkBZmxPrK23Vdyyh%2FsH5e4cQGVK43ML31RMvHgnKs6ELyn0Spqn6s6an%2FKG%2BWm%2BRjbEm7BEDCXPxdNoAoQQ3xvjCm%2BqZ6Fe8vx4%2Fiv4%2FIPP39%2B%2Bnt7Ov083fvbcSzOs4Wd7hyQiDrL8TFCqVMRsqZUbSMMyMeC2LSSNpO7yg4vlyJh94VSUxoVlKQqWdws5KTMfWkMZ%2F%2FXLZKgn1RzVUSsPr0PFlarPM1mDxNIZv61OP1JDUvlB2Vsk9oziCSQKLRjtFNk17WjepssVipX%2F3Hohiw5ymnKNt6Phawx0m3n3P3sef04NVukHJKv%2BuyR%2BCKAyzH1XnDGTfxyCvO%2Bcyylp21xnppglKVaMNDrZZQi%2BEBoZN718TWHnJ48j6mPI6%2BkMv4MFwYNHW5Zyzn0Qq%2F8of%2FAw%3D%3D)

## Использованные инструменты

- [Typescript 4](https://github.com/microsoft/TypeScript/#readme) 
- [Webpack 5](https://github.com/webpack/webpack)
- [Babel 7](https://github.com/babel/babel)
- [Jest 27](https://github.com/facebook/jest)
- [jQuery 3.6](https://github.com/jquery)
- [ESLint 7](https://github.com/eslint/eslint)
- [Stylelint 13](https://github.com/stylelint/stylelint)
- [cross-env 7](https://github.com/kentcdodds/cross-env)
