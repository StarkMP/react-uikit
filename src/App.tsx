import './styles/fonts.scss';
import './styles/global.scss';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  Button as UIButton,
  Dropdown,
  Form as UIForm,
  FormSubmitArguments,
  FormValidationFailedArguments,
  Input as UIInput,
  Modal,
  Select as UISelect,
  Switcher,
  ValidationRule,
} from '.';

const Form = styled(UIForm)`
  align-items: flex-start;
  width: 100%;
`;

const Input = styled(UIInput)`
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled(UIButton)`
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 31px;
  font-family: Gilroy;
  font-weight: bold;
  font-size: 24px;
  color: #1e1e1e;
  text-align: center;
  width: 100%;
`;

const Disclaimer = styled.div`
  width: 100%;
  font-family: Roboto;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #787878;
  margin-bottom: 20px;
`;

const Select = styled(UISelect)`
  margin-bottom: 20px;
  margin-top: 10px;
  width: 100%;

  .ui-select__btn {
    border: 1px solid #dddddd;
  }
`;

const App: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  const onSubmit = (data: FormSubmitArguments) => {
    console.log('onSubmit', data);
  };

  const onValidationFailed = (data: FormValidationFailedArguments) =>
    console.log('onValidationFailed', data);

  return (
    <React.Fragment>
      {/* Dropdown */}
      <Button id='dropdown-btn' style={{ margin: '30px', width: '300px' }}>
        Dropdown
      </Button>
      <Dropdown triggerId='dropdown-btn'>123</Dropdown>

      {/* Modal */}
      <Button onClick={() => setIsShow(true)}>Modal</Button>
      <Switcher onChange={(val) => console.log(val)} />
      <Modal onClose={() => setIsShow(false)} isShow={isShow}>
        <Form onSubmit={onSubmit} onValidationFailed={onValidationFailed}>
          <Title>Регистрация</Title>
          <Input
            name='email'
            border
            type='email'
            size='lg'
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
          <Switcher name='switch' />
          <Select
            name='language'
            placeholder='Select your language'
            options={[
              { label: 'Russian', value: 'ru', disabled: true },
              { label: 'English', value: 'en' },
            ]}
          />
          <Disclaimer>
            Нажимая кнопку «Зарегистрироваться», Вы принимаете условия
            Пользовательского соглашения.
          </Disclaimer>
          <Button size='lg' type='submit'>
            Зарегистрироваться
          </Button>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
