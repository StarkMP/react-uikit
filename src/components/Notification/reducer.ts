import { NotificationProps } from '.';

enum Actions {
  AddNotification = 'ADD',
  RemoveNotification = 'REMOVE',
}

type NotificationsAction = {
  type: string;
  payload: NotificationProps | string;
};

export const addNotification = (
  params: NotificationProps
): NotificationsAction => ({
  type: Actions.AddNotification,
  payload: params,
});

export const removeNotification = (id: string): NotificationsAction => ({
  type: Actions.RemoveNotification,
  payload: id,
});

export const notificationsReducer = (
  state: NotificationProps[],
  action: NotificationsAction
): NotificationProps[] => {
  const stateCopy = state.slice();
  let index;

  switch (action.type) {
    case Actions.AddNotification:
      return [...state, action.payload as NotificationProps];

    case Actions.RemoveNotification:
      index = stateCopy.findIndex((item) => item.id === action.payload);

      if (index === -1) {
        return state;
      }

      stateCopy.splice(index, 1);

      return stateCopy;

    default:
      return state;
  }
};
