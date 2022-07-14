# Boxis UIKit
Styled react components

## Installation

- Install NPM dependency

	``npm install boxis-uikit``
- Connect styles in main js or css file

  JS
	```js
	import "boxis-uikit/dist/index.css";
	```
  or

  CSS
  ```css
	@import url("boxis-uikit/dist/index.css");
	```

## API

### Navigation

- [Input](#input)
- [Button](#button)
- [Form](#form)
  - [type FormValidationRule](#type-formvalidationrule)
  - [enum ValidationRule](#enum-validationrule)
- [Modal](#modal)
- [Select](#select)
  - [type Option](#type-option)
- [Dropdown](#dropdown)
- [Notifications](#notifications)
- [type UIKitProviderProps](#type-uikitproviderprops)

### Input

Example

```tsx
<Input
  border
  type='email'
  size='lg'
  name='email'
  placeholder='Type Email'
/>
```

Example with validation

```tsx
<Input
  border
  type='email'
  size='lg'
  name='email'
  placeholder='Type Email'
  validation={[
    {
      rule: ValidationRule.Required,
      message: 'Fill required field!',
    },
    {
      rule: ValidationRule.RegExp,
      message: 'Incorrect email',
      value: /^\S+@\S+\.\S+$/,
    },
  ]}
/>
```

Props extends **HTMLInputElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|label?|string|Label of input|
|size?|`md` / `lg`|Input size|
|icon?|ReactNode|Icon in input|
|error?|boolean|Error state|
|errorText?|string|Error text|
|border?|boolean|Switch border|
|type?|`text` / `email` / `password`|Input type|
|validation?|FormValidationRule[]|Validation rules for element. Using only in Form|

### Button

Example

```tsx
const [count, setCount] = useState(0);

return (
  <Button
    size='lg'
    onClick={setCount((prev) => prev + 1)}
  >
    Increment
  </Button>
);
```

Props extends **HTMLButtonElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|size?|`sm` / `md` / `lg`|Size of button|
|outlined?|boolean|State of button with empty background and active border|
|borderless?|boolean|State of button without border|
|loading?|boolean|State of button with loader|

### Form

Example

```tsx
<Form>
  <Input
    border
    type='email'
    size='lg'
    name='email'
    placeholder='Type email'
    validation={[
      {
        rule: ValidationRule.Required,
        message: 'Fill required field!',
      },
      {
        rule: ValidationRule.RegExp,
        message: 'Incorrect email',
        value: /^\S+@\S+\.\S+$/,
      },
    ]}
  />
  <Input
    border
    type='password'
    size='lg'
    name='password'
    placeholder='Type password'
    validation={[
      {
        rule: ValidationRule.Required,
        message: 'Fill required field!',
      },
      {
        rule: ValidationRule.MaxLength,
        value: 18,
        message: 'Length cannot be higher of 8 symbols!',
      },
      {
        rule: ValidationRule.MinLength,
        value: 6,
        message: 'Length cannot be lower of 6 symbols!',
      },
    ]}
  />
  <Button size='lg' type='submit'>
    Register
  </Button>
</Form>
```

Props extends **HTMLFormElement**

|Name|Type|Description|
|-------------|-------------|-------------|
|onSubmit|({ values, formData }) => void|Callback of form submit|
|onValidationFailed?|({ values, validation }) => void|Callback at failed validation|

### Modal

Example

```tsx
const [isShow, setIsShow] = useState(false);

return (
  <Modal isShow={isShow} onClose={() => setIsShow(false)}>
    <p>Do you agree with website rules?</p>
    <button>Yes</button>
    <button>No</button>
  </Modal>
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|portalElement?|HTMLElement|Portal HTML-element. Default: `body`|
|hideCloseButton?|boolean|Hide close button|
|disableOverlayClose?|boolean|Forbid closing modal on overlay click|
|isShow|boolean|Show modal|
|onClose|() => void|Callback of modal closing|

### Select

Example

```tsx
return (
  <Select
    placeholder='Choose your language'
    options={[
      { label: 'English', value: 'en' },
      { label: 'Deutsch', value: 'de' },
    ]}
  />
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|className?|string|Class html attribute|
|name?|string|Name html attribute. Using with Form|
|placeholder?|string|Placeholder for Select|
|defaultValue?|string|Default value|
|options|Option[]|Select options|
|validation?|FormValidationRule[]|Validation rules for element. Using only in Form|
|onChange?|(value: string) => void|Callback at changing select option|

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
|className?|string|Class html attribute|
|triggerId|string|Dropdown trigger id|
|topOffset?|number = 15|Top offset in px|

### Notifications

Example

```tsx
const { addNotification } = useNotifications();

return (
  <UIKitProvider>
    <Button
      onClick={() =>
        addNotification({
          type: NotificationType.Success,
          title: 'Done!',
          description: 'Project has been successfully published!',
        })
      }
    >
      Call notification
    </Button>
  </UIKitProvider>
);
```

Props

|Name|Type|Description|
|-------------|-------------|-------------|
|type|`success` / `warning` / `error`|Notification style - `NotificationType`|
|title|string|Title of notification|
|description|string|Description of notification|

#### type `UIKitProviderProps`

|Name|Type|Description|
|-------------|-------------|-------------|
|notifications|{ `dismissTimeout: number` }|Notification params. `dismissTimeout` - notification lifetime|

#### type `Option`

|Name|Type|Description|
|-------------|-------------|-------------|
|label|string|Label|
|value|string|Value|
|icon?|ReactNode|Icon|
|disabled?|boolean|Disable option's selectable|

#### type `FormValidationRule`

|Name|Type|Description|
|-------------|-------------|-------------|
|rule|ValidationRule|Rule identificator|
|message|string|Failed validation message|
|value?|unknown|Value for validation rule|

#### enum `ValidationRule`

|Name|Type|Description|
|-------------|-------------|-------------|
|Required|`required`|Required field|
|Match|`match`|Checking value is match|
|NotMatch|`not_match`|Checking value is not match|
|MinLength|`min_length`|Length of string equal or higher of value|
|MaxLength|`max_length`|Length of string equal or lower of value|
|RegExp|`regexp`|Checking value is match of regular expression|
|Custom|`custom_<uuid>`|Receives callback function `(fieldValue) => boolean` (where's argument `fieldValue` - field value) in `value` property in validation rule. If return `true` - validation will be successfuly, if return `false` - validation will be unsuccessfuly|