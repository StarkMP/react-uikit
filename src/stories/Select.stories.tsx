import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Select as SelectComponent } from '..';
import CircleAlertIcon from '../components/Icons/CircleAlert';

export default {
  title: 'UIKit/Select',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const StyledSelect = styled(SelectComponent)`
  width: 300px;
`;

const AlertIcon = styled(CircleAlertIcon)`
  width: 18px;
  height: 18px;
  color: red;
`;

const Template: ComponentStory<typeof SelectComponent> = (args) => (
  <StyledSelect {...args} />
);

export const Select = Template.bind({});

Select.args = {
  placeholder: 'Choose your favorite color',
  label: 'Favorite color',
  options: [
    { label: 'White', value: 'white' },
    { label: 'Black', value: 'black' },
    {
      label: 'Red',
      value: 'red',
      icon: <AlertIcon />,
    },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green', disabled: true },
  ],
};
