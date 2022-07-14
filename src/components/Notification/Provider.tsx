import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
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

export const useNotifications = (): NotificationsContextProps =>
  useContext(NotificationsContext);

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  dismissTimeout = 10000,
  children,
}) => {
  const [notifications, dispatch] = useReducer(notificationsReducer, []);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNotification = (params: AddNotificationParams): void => {
    const id = uuidv4();
    const onRemove = (): void => dispatch(removeNotification(id));

    dispatch(addNotificationAction({ ...params, id, onRemove }));

    setTimeout(onRemove, dismissTimeout);
  };

  useEffect(() => {
    // scrolling container to bottom after changing notifications
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [notifications]);

  return (
    <NotificationsContext.Provider value={{ addNotification }}>
      <NotificationsContainer ref={containerRef} items={notifications} />
      {children}
    </NotificationsContext.Provider>
  );
};
