import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { default as ButtonComponent } from '../components/Button';

export default {
  title: 'UIKit/Button',
  component: ButtonComponent,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args}>Button</ButtonComponent>
);

export const Button = Template.bind({});

Button.args = {
  size: 'sm',
  outlined: false,
  borderless: false,
  loading: false,
};
