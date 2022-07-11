import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { default as SwitcherComponent } from '../components/Switcher';

export default {
  title: 'UIKit/Switcher',
  component: SwitcherComponent,
} as ComponentMeta<typeof SwitcherComponent>;

const Template: ComponentStory<typeof SwitcherComponent> = (args) => (
  <SwitcherComponent {...args} />
);

export const Switcher = Template.bind({});
