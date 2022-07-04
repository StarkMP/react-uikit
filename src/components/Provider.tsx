import React from 'react';

import {
  NotificationsProvider,
  NotificationsProviderProps,
} from './Notification/Provider';

export type ProviderOptions = {
  notifications?: NotificationsProviderProps;
};

const Provider: React.FC<ProviderOptions> = ({ children, notifications }) => {
  return (
    <NotificationsProvider dismissTimeout={notifications?.dismissTimeout}>
      {children}
    </NotificationsProvider>
  );
};

export default Provider;
