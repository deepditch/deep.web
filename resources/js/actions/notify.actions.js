export const NotifyActionTypes = {
  NOTIFY_WARN: "notify-warn",
  NOTIFY_ERR: "notify-error",
  NOTIFY_SUCCESS: "notify-success",
  NOTIFY_DEFAULT: "notify-default",
  NOTIFY_CLEAR: "notify-clear"
};

export const NotifyActions = {
  warn: message => {
    return {
      type: NotifyActionTypes.NOTIFY_WARN,
      message: message
    };
  },
  error: message => {
    return {
      type: NotifyActionTypes.NOTIFY_ERR,
      message: message
    };
  },
  success: message => {
    return {
      type: NotifyActionTypes.NOTIFY_SUCCESS,
      message: message
    };
  },
  default: message => {
    return {
      type: NotifyActionTypes.NOTIFY_DEFAULT,
      message: message
    };
  },
  clear: () => {
    return {
      type: NotifyActionTypes.NOTIFY_CLEAR
    };
  }
};
