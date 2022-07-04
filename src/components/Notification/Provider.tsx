import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NotificationProps } from '.';
import NotificationsContainer from './Container';
import {
  addNotification as addNotificationAction,
  notificationsReducer,
  removeNotification,
} from './reducer';

type AddNotificationParams = Omit<NotificationProps, 'id' | 'onRemove'>;

type NotificationsContextProps = {
  addNotification: (params: AddNotificationParams) => void;
};

export type NotificationsProviderProps = {
  dismissTimeout?: number;
};

const NotificationsContext = createContext<NotificationsContextProps>({
  addNotification: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  dismissTimeout = 10000,
  children,
}) => {
  const [notifications, dispatch] = useReducer(notificationsReducer, []);

  const addNotification = (params: AddNotificationParams) => {
    const id = uuidv4();

    const onRemove = () => dispatch(removeNotification(id));

    dispatch(addNotificationAction({ ...params, id, onRemove }));

    setTimeout(onRemove, dismissTimeout);
  };

  return (
    <NotificationsContext.Provider value={{ addNotification }}>
      <NotificationsContainer items={notifications} />
      {children}
    </NotificationsContext.Provider>
  );
};
