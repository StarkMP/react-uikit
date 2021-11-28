import './styles/fonts.scss';
import './styles/global.scss';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  Button as UIButton,
  Form as UIForm,
  FormItem as UIFormItem,
  FormSubmitArguments,
  FormValidationFailedArguments,
  Input,
  Modal,
  ValidationRule,
} from '.';

const Form = styled(UIForm)`
  align-items: flex-start;
  width: 100%;
`;

const FormItem = styled(UIFormItem)`
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

const App: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  const onSubmit = (data: FormSubmitArguments) => {
    console.log('onSubmit', data);
  };

  const onValidationFailed = (data: FormValidationFailedArguments) =>
    console.log('onValidationFailed', data);

  return (
    <React.Fragment>
      <Button onClick={() => setIsShow(true)}>Регистрация</Button>
      <Modal onClose={() => setIsShow(false)} isShow={isShow}>
        <Form onSubmit={onSubmit} onValidationFailed={onValidationFailed}>
          <Title>Регистрация</Title>
          <FormItem
            component={Input}
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
          <FormItem
            component={Input}
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
