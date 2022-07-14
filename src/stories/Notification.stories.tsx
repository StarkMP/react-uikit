import '../styles/fonts.scss';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Button,
  NotificationProps,
  NotificationType,
  UIKitProvider,
  UIKitProviderProps,
  useNotifications,
} from '..';

const providerOptions: UIKitProviderProps = {
  notifications: {
    dismissTimeout: 10000,
  },
};

const NotificationButton: React.FC<NotificationProps> = ({
  type,
  title,
  description,
}) => {
  const { addNotification } = useNotifications();

  return (
    <Button
      onClick={(): void =>
        addNotification({
          type,
          title,
          description,
        })
      }
    >
      Call notification
    </Button>
  );
};

export default {
  title: 'UIKit/Notification',
  component: NotificationButton,
  argTypes: {
    type: {
      options: [
        NotificationType.Success,
        NotificationType.Warning,
        NotificationType.Error,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <UIKitProvider {...providerOptions}>
    <NotificationButton {...args} />
  </UIKitProvider>
);

export const Notification = Template.bind({});

Notification.args = {
  type: NotificationType.Success,
  title: 'Lorem ipsum',
  description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
};
