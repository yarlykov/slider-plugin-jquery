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
`setValue( name: string, value: number | string | boolean ): void` - метод для изменения любого значения слайдера. Принимает название параметра (`string`) и значение (`string`, `number`, `boolean`)

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

  **Model** является модулем отвечающим за хранение всего состояния приложения и валидацию данных (расчеты, которые относятся к бизнес-логике). Предоставляет методы для чтения и записи (всех параметров либо каждого по отдельности), а также методы для обработки значений слайдера полученных в процентах и методы увеличения/уменьшения значения ползунка на величину шага.


### View
  **View** отвечает за создание отображения, его обновление и взаимодействие с пользователем.
  Отображение декомпозировано на более мелкие элементы ( *subView* ), которые наследуются от общего абстрактного класса `SliderComponent`. Это решение позволило создать единый интерфейс всех графических компонентов и расширить их классом `Observer`, чтобы на их изменения можно было легко подписываться. Также данный подход позволяет `subView` оставаться низкоуровневыми элементами и ничего не знать о модулях высокого уровня, но при этом всегда иметь доступ к актуальному состоянию для внутренних расчетов.
  
  Все `subView` имеют схожий базовый интерфейс, каждый компонент умеет создавать совой элемент, в случае необходимости добавлять слушателей и сообщать о своих изменениях. Также каждый `subView` имеет возможность обновления своих отдельных стилей (без полной перерисовки всего компонента).
  
  Для инициализации либо пересоздания графической части существует `Slider` - это класс-фабрика, который в соответствие с переданными опциями создает все элементы слайдера и формирует объект с созданными компонентами, после чего `View` может легко взаимодействовать с `subView`. Это позволяет локализовать и изолировать в одном месте создание всех графических компонентов.
  
  Связь между `View` и `subView` осуществляется также с помощью паттерна `Observer`, что позволяет уменьшить сложность графической части, обеспечить простое взаимодействие, слабую связность и модульность элементов.

Помимо прослушивания событий `subView` в классе `View` также реализованы некоторые фичи слайдера:

  - метод `checkKnobZIndex()` меняет свойство `z-index` у ползунков в зависимости от того, какой из-них задействован в данный момент;
  - метод `createDoubleTooltip()` отвечает за то, чтобы у двойного слайдера ползунки объединялись в один общий;
  - также во `View` реализована возможность перехвата `target` со шкалы, чтобы после нажатия на любое место шкалы можно было сразу передвигать ползунок. 
  
### Presenter
  **Presenter** - единственный модуль, который имеет зависимости от других слоев приложения.
  + Presenter создает модель и отображение
  + Подписывается на изменения модели и отображения
  + Реагирует на сообщения об обновлении модели и обновляет отображение
  + Реагирует на сообщения от отображения о действиях пользователей и обновляет модель
  + Формирует кастомное событие, для того, чтобы была возможность получать актуальные данные либо осуществлять стороннюю логику при перемещении слайдера.

  Таким образом передача данных снизу вверх осуществляется следующим образом `subVeiw` ->`View` -> `Presenter` -> `Model`

## UML диаграмма классов

![image](./UML/UML-21.01.22-slider.drawio.png)
[открыть превью диаграммы в draw.io для удобного просмотра](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=UML-21.01.22-slider.drawio#R7V1bc5tKs%2F01rjrnQSpgQMBjbMdJtu1sO3ESZ7%2BksBhL2AgUhC%2FKr%2F%2BGyyBgGgkQIGLGlaoIxE2zVjd9m54jdLJ4%2FeAZy%2Fmla2L7SBLM1yN0eiRJoixNyH%2FBnnW0R1XFaMfMs8z4oM2Or9YfHO8U4r1PlolXmQN917V9a5ndOXUdB0%2F9zD7D89yX7GH3rp2969KYYWbH16lhs3t%2FWKY%2Fj%2FdOFHnzxUdszeb01uJEj765M6aPM899cuIbOq6Do28WBr1O%2FCNXc8N0X1K70PsjdOK5rh99WryeYDsYVzpkPz6tf9gXj5MP%2F1yvfhvfjs9vPn8fRRc7q3JK8us87Pi1L%2F3n8f7s43f54XZ5dXb9Inx4d%2FfPKD5FeDbsp3goY3KEP9hf0wFevVgL2yBDg47vXcf%2FGn9DxuDYsK2ZQz5PycNhj%2Bx4xp5vEWzexV%2F47pLsnc4t27ww1u5T8BNWPhl3unU8dz3rD7msYZOvRLKDfO35Mc0IN9NHfA3OJLsFstfDK3LMFR0XMdl1Yaz8%2BJipa9vGcmXdhQ8cHLIwvJnlHLu%2B7y7ohQICYDPeSoAON3zPfUxYFZxfEo0YtWA08GuKpjE6H7C7wL63JofE32paLIVrKlzxJV7SlI4Rm6fYjAQtFqVYjGbJtZPbfSFiZzgzMgjJ%2Fch52fvJQrn7UW1Bb2fYBHjH8PFxMIyrNAvJh9RP3ewKuVmBpxLD01G0aZmGb7kOQ1gy5n6KnDa%2B9wupuVoaU8uZXYTHnMqbPV%2Fi3xzscsm593ZIi7llmtgJaeMbvhExK%2BDK0rUcPxwU5Zj8I0N3IoyVI4U80AnZFjfb5F9wuOefuA5hmGGFVMKEti84oO42Rs79hR1%2FZKm4Vcp3U3GdRXgnE4Ri4mUoUBVvEcSbqAUfvzmo2wJRPjSIMgMig51the%2BUmNIiqG93ALsgEAWXo0jeBECfjkQGbcSijQBkbeMO21fuygr1Cjr1omNziB8K1ElJULe8EfbCVAEwPQ4wxcQoINL5f%2F9%2FFCgPJG7UExfVnaiqcr03bx1YP2kj4568NBXlYn1uff12%2B2L%2BGokCKgB2xoHdA1hRqGlTNYgspIZjkf0e7OPI1kK2tI3UHrJFynjpuVO8Wl1hL3DKOMj1QVak7kBe%2FjiZvJ%2BOzNH17N87Rfh9bJ8Zo8l2iD9jw%2BP41sdX1Q6Mb5EIW87UwwvyczmwtRxYoUOLCgRWKwDWxBzYfYBFhzeoWJ0cBCemczx9DE1lrpDrw6t0aFUJ5vPPl1%2FXNz%2BNM%2B8HOrftXzdfRpIKomutOKr1UdU6NKPAR2ZF9ruFXxgAC9IcwhFPcxw1leZAQjbNMSmp0BENklTLcoi5LAfS%2BpvlgFVPmGEcqKqZlGZXXzIXrN0XYOgug2jy6i2%2FPBrNWFXGvctkx%2FmTcfrnz%2FWnx5Mz%2B8p5d%2Br%2F%2FvmjIEPpr5dvL2F1WKTLZkCaQBp2ACTYAVjZlom9E3exdB0cjDXHvUnctUNrdp1BnUF46OnMyqAmzvSh8pkiW2lAA3BWGKJ5YzLcGpDiwVOYUlHI7WlpxglMDmY5MOtWgjUWPaWFpQyW0znx7%2FC5495RncZxLY9radupNSFFLLCB7XRnOeb758Bq4nCWh1PvMKxWACfs9gRwhuXZ758dzDGtEr8QO8xIFmDKlgJRTAO9u%2BJyWhVT%2BeC2EWKLgCimF4GDwEGtDKraoY0ERpxgMQ3TkIGc%2FveJOOuvHNHyiOodWkcgorCQzrB%2FE0%2BmOnFdz%2BRSWh5TRIM0B8OULfAJpdTDxCU9dZ%2FIaMbgclTLoyof2khivZh%2F71bYIz%2BBAZFPnWs%2Fp6yoceo0yQICL2cVIIi4LVpcnFSeiEr2fnWNgWaTyrDtByogN6br28tSsBzbKsF7ZZYhSrWWd%2BLTqZoHFUobQ6A2kH4AH7io%2FBcvBpJ9aAZGBXCwQdlsyx7Qi9JIq6e71dSz7oaRfmgGTahCq1s0dQYrbM4wNd3CHhF5y4eM09yduY5hX7ihygw05gP2%2FXVsjBlPvpvVzfjV8m9Tn38GlyJjH22dvsZXDjfWR0XZ9W1jvnKfvCnerX%2BIzUi8zN3HBaOwFUEP2%2BTU5%2FRBrZRgixygXgOksqWMDGI1ANkgGtoj4eBdYc8iT429r5FCjHF4eFosKR8Mb0o9o3dBtxmyy7SMheuYN3PLoV%2BdWXYCvGPSA91lqEbJnvj74OIRHAV3pqwRxrKqpJgjjgVR2sodQhlvHZ%2BKRLrjZ%2FrbzYnhVubM5HlS187vY%2Bm5zQNL03NbdGM3PcvyM35BjISxJgtSxskaUaerNIfjy18Fr7zNtYn3lrmuLKljPf2XvWDMsugaG7nYfVklV68ck6b4QvRA9%2F5%2BhTPHEDIa69QR8Uu88CciLTt0sipsf3YZbTuefIieoFHHlFURX7MVdKlqWWIp4dA%2FFjZxluJS2gOW8cvCQEIuaq5bkaYhxmpLfOGM1UZzxtVCLkjJ1vFrdWfWdxBygQqR0NFgKvm3Snt515zFF%2BZTa3W%2BCKr4REfD6UPUDJBALLY1INf6B%2FXc%2BPT8Tbxdqf9O3cvV%2BTyxGxgcY7OFA1nbL28NSHiOBRQCRdFZHMT6HWk61qtQbScPZO8Jq1QS1rYi2aIEoDqw6uumoGSz27CENhH%2FtK4ePl85H7%2Bd3xrm6FJ9%2BmB%2FAWe6BGo2dF8HVHXdEJ5AdqJbPOGaa4LmgOqJGsKytA3UFpZwOj%2BQTGOGOZ4V8ZSA%2BWft4Ql7mQygUWPzHgW1BlNHhPRsUGsili36EOs1p8jGtNR%2B9KaAeQoXMq4Crn52zbcXDqk723m7lDdfbtSaYoJaD3I3bU9YoYaSXRYciXJRydHccAgQ4bsnzA5h79R9GbCdXx3bskWnTYgsGOiUtjVxpoqaI7pfz4lulbAMzwkZTHeChoAUxZJ6t0UkixoL3oRZCI5mBTQRMP%2BjYzQLmoCG83pCXcsBrdKY4NAFvCIb8wzrvbgX3r0XPsl3iIS8cMgtFpVaC2ElTIvvp9ftZdOsGw6beLA9cA9xdSjqRi9NsAM0iQQfmbrS3LduEtayPSAb8K3BpkVF3tfQM6DVkYTm83TbMEOGJDR2pQPDYOCedGVE60a2m1O53JFuAsfSDRtbFM2Cxieh6xXIJseziisNBEa6FUw2IB20r2Eg5J5X%2B56XmLSq2uJ6SXTdsUx3fqlWAlTKuV5ajxspFLR9fiRkvRl0IXEiwfs4YCCrmnDAlpMH8b8HbJ78%2Fv34enY9vfzmvRZ05XmE9M7fDmKjeezqUANOWWtQw48MzcbhvvaesAKdZEFYW8tj00Q697b3xhJYfRgW0bZ6pIHhsNjZDmzBYTvb1QEF53h0i2hRLGwVITr0nGcNTEvbTK053koRqFHpUNSUnVcO1QEXKAvrGFwZXrhq2PGxGkgCKwq3hiQ82xUGciOj53jN5bOivwosJ9wtqtQ9KkT1JOj7zF%2BrlZEF1hNuDVkwFAGXhUXR7ABYjmYFNIHlg7t9jyIWzri%2FM4MiD2i3H9DWxLqlRGqtUiK5n%2FFs2FCA82h%2BAV0HonRQ9TmEHVYTwUDCqe0YyHDdco5mHxeShds88%2FYYLcBaduWz1uLVE14d1hSWQLy6tZIFUOECq54l8Wq6VMuwY9bVQYVi1h0XFk1YWHkIrAaSpQ2i9pCELaLIqR7SejtNQQpNW%2B4UUpmdnxMtXMeAyN3qDurEBKmEXw03ytjCkGK%2FepLr%2FtqTThlw7hMO1dowXQeicxL5%2FXsaYIAVJtwR2xPWgzfAUCH%2FmhrveLG0B%2B2NVQe0y64XBdYeaxtwu706kIdvdqHCEekoyRmZe7zApBa2nfa%2FgK0iuHFh5JJF2HJA%2F6oWGGphK0oOZ2U4D98AQ4WjXykB5YBWAFQ%2FtFmksHNcovV1GBB5xKSDiMkkG8BQoHC3LgH8oKSpuFxOrhBBhvjYl0IEUPG4y8CBHWzARGliUh3MqLaW5wAWdgiAHPKqR9VRhOoPukURFkd%2FvRxsFUl1FKFyg25RLLDm6Np6XK%2FuFRfpFks4LLIC28RzGKt0LmkLR%2FiZ%2BUzkNnAta%2Fc0kFEAxRNaLSfOJyRLmb7FYMgSXv44dCEj7y5c7rg94BEQM%2BlWMQ%2Bqp1R3wELt37oFFu4PYphm2Nr3vY0Xb1So2wMVqtpsC9Sb%2BQ9JfcG3F58ftbXxaHw%2BtpYFYQZrFUyyWtH326Xr4Zs5dj4a9j2Ht0q88%2BAyu60j95t%2BEbcGarKq0eFA3TY7Mgpnc0CrzHbtEFB4hTbWl%2F1OcDKN0LkomZmQjnhm4qixzERSG0BVObDyOpgqQLRJbsWef0iod78D9PxTYQt%2FYbFcHYjSURtZyazTGXUqbM0vjNc3B2Kjzf6qQ33wyZMqbASufPz2JjQfGOuyMypbXEceNg7DzTOPvGU54o0iDiVCOkYc7m0Ubt64HO9m8S7f6701dc5KOAPy0DMmNXAta5G1NQdDhRJhQcpkGjSxIq7WkGdg1MAT8uq7nXALlP6kEA1bkHBEq5QDdzgZHlzLqCipeU%2FsqivsBVGXG%2FfE9Tzi33NkKyBb2ohqT1bZREhKVi8t54vhzLi4VoqTSwcHVdoKqvHKQa0cKwdm2HQMalHPoNhOwgNuYlEnDnl4M4kNJ2dVLxFUDmkFSOvOamgQUja4nII01Loc16q4orJtOlvDVdMYtLA5wzQD6bhh0CEboCEjNXdnrmPYF24YQQgCCA%2FY99dxTtF48t1sqAK%2FWv5tcPpYVeLNn%2FHVgs%2Bnr%2BmN9VFRwGdbJnDlPhFzfRuFY1vfjxax2n1gMBBbUfSwTc59Th%2FUiuix0aErD6%2BihHAePZ5Kbj%2BVrGixFUrVs1pOipMShIpNgWjckWaf%2BptHFgu68l%2B6Jh7uwt1ir3vtFjwz3Gzku4Vf3hyOjeYfaqDdZToZnJk6oAmNh8b68OlkoG8bg%2FLQk001gC0b8Gyt4ReFMSfFd5Zjhq%2Ff98%2B0Lpg8KRI3NH9D0t0evFDdd7ceOLDWHMU3eCtzePeBN9GKB8S3oJnv04q4PyG6HNya4JY2sBoAVzCff778ur75aZx5P9C5bf%2B6%2BTICsGXww475zvPC4XaX4WCbxmoemioiHE2hn8NQypgGVuBgChlUbx2cNBLGgqDRPdGpgkK3NyeHW5uzzTPLttPfXdFpkYUmU9lozZ%2FH%2B7OP3%2BWH2%2BXV2fWL8OHd3T8junL1zmANLXrdGaxJYa8A0NN9pWM68R3CRn0pX522l6L9b%2BScHRf98PisDauYC6lS9kJJYxt6oWhkmAvV8ORhxkLx3mLGmpaxcB3zZm45BVwlrJtk%2BKrvImyacmGcKSce4b48LaMoo7BhdHQzUd5JcXLzPKe7ILpWkuiJfddTpqO6TJf17IVEpHTLdLaWuoRu3qmOA6%2B%2BJr%2BzwlRI81CTTzI836nGAT5DxK%2FP8e3cTbMclIZ%2BcVyXpDFdMHZThDbW6TKZVamuadlILhJyBkfLVJerUb1YqbPmQCIAKatCndThYzXu7dSbSr8MBC2n7ZR837uyXBJFlF2bQEF6KTIRdI116rDYhC%2F%2FxHGMf8PN6IrNMrVERXSKqXGeMhOvKmEwJFlJCalp5b1dcXegL1GvOCvnmJasUlHdqM1RNk%2F%2Bhiibf2B6n3YpC9WSVqFsio66VJqOZYmep2w2EN4wgelY9ITAojDJEkKtq3W7YrAoqAegsMKmBijiGw6HiftUCIgGnGhAPh9xuovz91EE%2F9iYPs5C7p24tuttBCHfdse0gprrKNZP0AlYUpGlU9dxgmz6HX1y%2ButKJ%2FpR3psXc2g3FiACFmERxmNWgRQNfkG0r%2BbYdz3OWtEyS82PMxtEPxjDux5lOacEJ3nvY7ciHSGUuUQumeXe369wK56LwgZQiXyUh%2B7vlo9J0fLezctHibDfGxUPPR%2BHykdcS9gZlKb0fTHpTkCqufZbrc%2FyJZpljM9qOJYu4%2ByJaanlRLN2wH8i17MsGyMQW7k3IA0rCnJnKraanwjEmzd5Dimb5tgRbstIazzwbHTZrC27O2NxdEXWvsiuskPkSsd1c5YVyldvtSy74KLrw3hrM6aRVvmtfTCjFujis00T3NluUFBfHIgvJ9%2Fp7JGUjdhPEOo4Ym9dPXy%2Bcj5%2BO781zNGl%2BvTB%2FjLq1wtezgViNFQ3dKSpmQuRV065RGfl6GfuiUUhji60GjsCepi8f%2FUxnWiQn2EUrrSVJfPO%2BSlJSWlel7E1oCwlt0tgXt8UqaZCPTQKpjbJ8n6Ua1%2FlaGyEb5vKAdyEjfGRsT3EnYqjqqZq2Pbomd8w0RghRTX1Si7ZodFis46MD43ts9B%2FwdeKDI3Kgi%2BMRUlAvZd7qX9yT%2B2Z4rTsweaKqiWVSt8cGj1vq9QsVBHF%2FJW6ViqsR%2FMXKBUqZE1YExLKuSWUvD1WMnvHIBtRMg0bDn3LZSeNjfa2HESUc551uWMp3%2BIzTOwgKnHnkU%2BzzfSAfsp9Y14EMSY02mnjrxF7nfUpBpNTVfK%2BtoSKkdkrbKyzZvZgRlmVckW424LzBUE%2BSc7KVS720qJ4sKb3YIDT6dIJSfV0deBELa8QUWfQsQZNoRXail1TwxOq4XBVY8VO50koaVglM%2Fl6YlmpKEtWVLtIMNcfput0kF6teHpnXiEzsSo74WQ8kcpMrGKnxyBR3U7j9qdjFZReo5L0lXtFXqRkOSfpdcOJSvZdmzQ26Iq8bB1C%2Fz1%2FvWhOch3PX0B0fhGFYD%2BGdPCebKr0PZglmtUTmiJt1RPlIoqJAksrr2CoVbVOwrOLKSCsFgIbWPdrdpMqT8ayLiR%2FOZ2k6WNVT%2F3lbPCyKkpndF3uQVtWUaLAerx%2FgY6iQtpAlEKY0HRaH6MUy8mD%2BN8DNk9%2B%2F358PbueXn7zXkdl2h7tMOL3yGToemaC2XiCqps%2Fe2iY%2FpdZiFIurKlrdXMXKOd06vmSzKbm6ORv1HihBUzknudbt0tfA8pHlYVsJc2e9lHCwJxGk7JXaE81Ub%2Bz1cmum%2Fl%2B1Vuj9kVHoF1FuqV1RNH0uhZ0RLvz%2BMB%2BjmzYakiTyVD2RTJBlYmmSHldkHsXNaILQOjQgCeoicIk90LtS7iYbIbdUFOHe8ZyHrU1Ru%2F%2FBw%3D%3D)

## Использованные инструменты

- [Typescript 4](https://github.com/microsoft/TypeScript/#readme) 
- [Webpack 5](https://github.com/webpack/webpack)
- [Babel 7](https://github.com/babel/babel)
- [Jest 27](https://github.com/facebook/jest)
- [jQuery 3.6](https://github.com/jquery)
- [ESLint 7](https://github.com/eslint/eslint)
- [Stylelint 13](https://github.com/stylelint/stylelint)
- [cross-env 7](https://github.com/kentcdodds/cross-env)
