import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { default as InputComponent } from '../components/Input';

export default {
  title: 'UIKit/Input',
  component: InputComponent,
  argTypes: {
    size: {
      options: ['md', 'lg'],
      control: { type: 'select' },
    },
    type: {
      options: ['text', 'password', 'email'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof InputComponent>;

const StyledInput = styled(InputComponent)`
  width: 300px;
`;

const Template: ComponentStory<typeof InputComponent> = (args) => (
  <StyledInput {...args} />
);

export const Input = Template.bind({});

Input.args = {
  border: false,
  label: 'Input label',
  size: 'lg',
  type: 'text',
  placeholder: 'Example input placeholder',
};
