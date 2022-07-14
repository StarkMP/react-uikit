import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { Fragment, useState } from 'react';

import Button from '../components/Button';
import { default as ModalComponent } from '../components/Modal';

export default {
  title: 'UIKit/Modal',
  component: ModalComponent,
  argTypes: {
    isShow: {
      control: false,
    },
    onClose: {
      control: false,
    },
    portalElement: {
      control: false,
    },
  },
} as ComponentMeta<typeof ModalComponent>;

const Template: ComponentStory<typeof ModalComponent> = (args) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Fragment>
      <Button onClick={(): void => setIsShow(true)}>Open modal</Button>
      <ModalComponent
        {...args}
        onClose={(): void => setIsShow(false)}
        isShow={isShow}
      >
        Lorem ipsum
      </ModalComponent>
    </Fragment>
  );
};

export const Modal = Template.bind({});

Modal.args = {
  hideCloseButton: false,
  disableOverlayClose: false,
};
