export const notifyConstants = {
  NOTIFY_WARN: "notify-warn",
  NOTIFY_ERR: "notify-error",
  NOTIFY_SUCCESS: "notify-success",
  NOTIFY_CLEAR: "notify-clear"
};

function warn(message) {
  return {
    type: notifyConstants.NOTIFY_WARN,
    message: message
  };
}

function error(message) {
  return {
    type: notifyConstants.NOTIFY_ERR,
    message: message
  };
}

function success(message) {
  return {
    type: notifyConstants.NOTIFY_SUCCESS,
    message: message
  };
}

function clear() {
  return {
    type: notifyConstants.NOTIFY_CLEAR
  };
}

export const notifyActions = {
  warn,
  error,
  success,
  clear
};
