import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { Fragment } from 'react';

import Button from '../components/Button';
import { default as DropdownComponent } from '../components/Dropdown';

export default {
  title: 'UIKit/Dropdown',
  component: DropdownComponent,
} as ComponentMeta<typeof DropdownComponent>;

const Template: ComponentStory<typeof DropdownComponent> = (args) => (
  <Fragment>
    <Button id='dropdown-btn'>Toggle dropdown</Button>
    <DropdownComponent {...args} triggerId='dropdown-btn'>
      Lorem ipsum
    </DropdownComponent>
  </Fragment>
);

export const Dropdown = Template.bind({});

Dropdown.args = {
  topOffset: 5,
};
