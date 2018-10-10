import { NotifyActions } from "./notify.actions";

export const UsersActionTypes = {
  LOAD_USERS_ATTEMPT: "load_user_attempt",
  LOAD_USERS_SUCCESS: "load_user_success",
  LOAD_USERS_FAILURE: "load_user_failure"
};

export const UsersActions = {
  attempt: () => {
    return { type: UsersActionTypes.LOAD_USERS_ATTEMPT };
  },
  success: users => {
    return { type: UsersActionTypes.LOAD_USERS_SUCCESS, users: users };
  },
  failure: () => {
    return { type: UsersActionTypes.LOAD_USERS_FAILURE };
  }
};

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {UsersService} UsersService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateUsersActionDispatcher = (UsersService, dispatch) => {
  return () => {
    dispatch(UsersActions.attempt());

    UsersService.getUsers()
      .then(users => {
        dispatch(UsersActions.success(users));
      })
      .catch(error => {
        dispatch(UsersActions.failure());
        dispatch(NotifyActions.error("Failed to load users"));
      });
  };
};
