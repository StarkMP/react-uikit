# Boxis UIKit
Набор React-компонентов.

## Installation

- Устанавливаем NPM зависимость

	``npm install boxis-uikit``
- Подключаем стили в главном JS или CSS файле

  index.js
	```js
	import "boxis-uikit/dist/index.css";
	```
  или

  index.css
  ```css
	@import url("boxis-uikit/dist/index.css");
	```

## API

### Navigation

- [Input](#input)
- [Button](#button)
- [Form](#form)
- [Modal](#modal)
- [Select](#select)
  - [interface Option](#interface-option)
- [Dropdown](#dropdown)
- [interface FormValidationRule](#interface-formvalidationrule)
- [enum ValidationRule](#enum-validationrule)

### Input

Example

```tsx
<Input
  border
  type='email'
  size='lg'
  name='email'
  placeholder='Введите Email'
/>
```

Example with validation

```tsx
<Input
  border
  type='email'
  size='lg'
  name='email'
  placeholder='Введите Email'
  validation={[
    {
      rule: ValidationRule.Required,
      message: 'Заполните обязательное поле!',
    },
    {
      rule: ValidationRule.RegExp,
      message: 'Некорректный email',
      value: /^\S+@\S+\.\S+$/,
    },
  ]}
/>
```

Props extends **HTMLInputElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|label?|string|Подпись сверху|
|size?|`md` / `lg`|Размер|
|icon?|ReactNode|Иконка внутри инпута|
|error?|boolean|Состояние ошибки|
|errorText?|string|Текст ошибки|
|border?|boolean|Включает/выключает обводку|
|type?|`email` / `password`|Тип инпута (в данный момент поддерживается email и password)|
|validation?|FormValidationRule[]|Правила валидации для элемента. Используется только внутри Form|

### Button

Example

```tsx
const [count, setCount] = useState(0);

return (
  <Button
    size='lg'
    onClick={setCount((prev) => prev + 1)}
  >
    Добавить
  </Button>
);
```

Props extends **HTMLButtonElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|size?|`sm` / `md` / `lg`|Размер|
|outlined?|boolean|Состояние с пустым background и обводкой|
|borderless?|boolean|Состояние без обводки|
|loading?|boolean|Состояние загрузки|

### Form

Example

```tsx
<Form>
  <Input
    border
    type='email'
    size='lg'
    name='email'
    placeholder='Введите Email'
    validation={[
      {
        rule: ValidationRule.Required,
        message: 'Заполните обязательное поле!',
      },
      {
        rule: ValidationRule.RegExp,
        message: 'Некорректный email',
        value: /^\S+@\S+\.\S+$/,
      },
    ]}
  />
  <Input
    border
    type='password'
    size='lg'
    name='password'
    placeholder='Введите пароль'
    validation={[
      {
        rule: ValidationRule.Required,
        message: 'Заполните обязательное поле!',
      },
      {
        rule: ValidationRule.MaxLength,
        value: 18,
        message: 'Длина не может быть больше 18 символов!',
      },
      {
        rule: ValidationRule.MinLength,
        value: 6,
        message: 'Длина не может быть меньше 6 символов!',
      },
    ]}
  />
  <Button size='lg' type='submit'>
    Зарегистрироваться
  </Button>
</Form>
```

Props extends **HTMLFormElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|onSubmit|({ values, formData }) => void|Callback при отправке формы|
|onValidationFailed?|({ values, validation }) => void|Callback при неудачной валидации формы|

### Modal

Example

```tsx
const [isShow, setIsShow] = useState(false);

return (
  <Modal isShow={isShow} onClose={() => setIsShow(false)}>
    <p>Согласны ли Вы с правилами сайта?</p>
    <button>Да</button>
    <button>Нет</button>
  </Modal>
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|portalElement?|HTMLElement|HTML-элемент, в котором будет создано модальное окно. По-умолчанию: `body`|
|hideCloseButton?|boolean|Скрыть перекрестие внутри модального окна|
|disableOverlayClose?|boolean|Запретить закрытие модального окна при клике на оверлей|
|isShow|boolean|Показать модальное окно|
|onClose|() => void|Callback при закрытии модального окна|

### Select

Example

```tsx
return (
  <Select
    placeholder='Choose your language'
    options={[
      { label: 'Russian', value: 'ru' },
      { label: 'English', value: 'en' },
    ]}
  />
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|className?|string|Аттрибут `class`|
|name?|string|Аттрибут `name`. Используется для встраивания элемента в Form|
|placeholder?|string|Текст в Select по-умолчанию, если не выбран ни один элемент списка|
|defaultValue?|string|Выбранное значение по-умолчанию|
|options|Option[]|Элементы списка|
|validation?|FormValidationRule[]|Правила валидации для элемента. Используется только внутри Form|
|onChange?|(value: string) => void|Callback, срабатывающий при выборе элемента из списка|

### Dropdown

Example

```tsx
return (
  <div>
    <Button id='dropdown-btn'>
      Dropdown
    </Button>
    <Dropdown triggerId='dropdown-btn'>
      Some content
    </Dropdown>
  </div>
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|className?|string|Аттрибут `class`|
|triggerId|string|Аттрибут `id` элемента, при клике на который будет появляться dropdown|
|topOffset?|number = 15|Верхний отступ в `px` от trigger элемента|

#### interface `Option`

|Name|Type|Description|
|-------------|-------------|-------------|
|label|string|Название|
|value|string|Значение|
|icon?|ReactNode|Иконка|
|disabled?|boolean|Запретить выбор элемента в списке|

#### interface `FormValidationRule`

|Name|Type|Description|
|-------------|-------------|-------------|
|rule|ValidationRule|Идентификатор правила|
|message|string|Сообщение при неудачной валидации элемента|
|value?|unknown|Вспомогательное поле для проверки правила|

#### enum `ValidationRule`

|Name|Type|Description|
|-------------|-------------|-------------|
|Required|`required`|Обязательное поле|
|Match|`match`|Соответствует ли заданному значению в `value`|
|NotMatch|`not_match`|Не соответствует ли заданному значению в `value`|
|MinLength|`min_length`|Длина строки значения больше или равно `value`|
|MaxLength|`max_length`|Длина строки значения меньше или равно `value`|
|RegExp|`regexp`|Соответствует ли значение регулярному выражению в `value`|
|Custom|`custom_<uuid>`|Принимает в `value` callback-функцию, типа `(fieldValue) => boolean`, где аргумент `fieldValue` - значение поля. При возвращении `true`, валидация будет выполнена успешно, при `false` проверка будет провалена|