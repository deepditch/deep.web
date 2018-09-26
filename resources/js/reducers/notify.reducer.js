import React from "react";
import { NotifyActionTypes } from "../actions";

const initialState = {
  //notifyType: "notify-default",
  //message: <>Welcome to <strong>deep.ditch</strong></>
};

/**
 * Updates the notify state based on the provided action
 * @param {JSON} state The previous notify state
 * @param {JSON} action A redux action
 */
export default function NotifyReducer(state = initialState, action) {
  switch (action.type) {
    case NotifyActionTypes.NOTIFY_DEFAULT:
      return {
        notifyType: "notify-default",
        message: action.message
      };
    case NotifyActionTypes.NOTIFY_SUCCESS:
      return {
        notifyType: "notify-success",
        message: action.message
      };
    case NotifyActionTypes.NOTIFY_WARN:
      return {
        notifyType: "notify-warn",
        message: action.message
      };
    case NotifyActionTypes.NOTIFY_ERR:
      return {
        notifyType: "notify-error",
        message: action.message
      };
    case NotifyActionTypes.NOTIFY_CLEAR:
      return {};
    default:
      return state;
  }
}
