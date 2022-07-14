import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import UIButton from '../components/Button';
import { default as FormComponent } from '../components/Form';
import { ValidationRule } from '../components/Form/types';
import UIInput from '../components/Input';
import UISelect from '../components/Select';

export default {
  title: 'UIKit/Form',
  component: FormComponent,
} as ComponentMeta<typeof FormComponent>;

const StyledForm = styled(FormComponent)`
  align-items: flex-start;
  width: 400px;
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
  width: 100%;

  .ui-select__btn {
    border: 1px solid #dddddd;
  }
`;

const Template: ComponentStory<typeof FormComponent> = (args) => {
  return (
    <StyledForm
      onSubmit={args.onSubmit}
      onValidationFailed={args.onValidationFailed}
    >
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
      <Select
        name='language'
        placeholder='Select your language'
        options={[
          { label: 'Russian', value: 'ru', disabled: true },
          { label: 'English', value: 'en' },
        ]}
        validation={[
          {
            rule: ValidationRule.Required,
            message: 'Заполните обязательное поле!',
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
    </StyledForm>
  );
};

export const Form = Template.bind({});

Form.args = {
  onSubmit: (data): void => console.log(data),
  onValidationFailed: (errorData): void => console.log(errorData),
};
