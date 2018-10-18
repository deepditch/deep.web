import { UsersActionTypes, InviteUserActionTypes } from "../actions/users.actions";

/**
 * Updates the users list state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function UsersReducer(state = { users: [] }, action) {
  switch (action.type) {
    case UsersActionTypes.LOAD_USERS_ATTEMPT:
      return { users: [], pending: true };
    case UsersActionTypes.LOAD_USERS_SUCCESS:
      return { users: action.users, success: true };
    case UsersActionTypes.LOAD_USERS_FAILURE:
      return { users: [], rejected: true };
    default:
      return state;
  }
}

/**
 * Updates the users list state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export function InviteUserReducer(state = {}, action) {
  switch (action.type) {
    case InviteUserActionTypes.INVITE_USER_ATTEMPT:
      return { pending: true };
    case InviteUserActionTypes.INVITE_USER_SUCCESS:
      return { success: true };
    case InviteUserActionTypes.INVITE_USER_FAILURE:
      return { rejected: true };
    default:
      return state;
  }
}
