import { NotifyActions } from "./notify.actions";

export const UsersActionTypes = {
  LOAD_USERS_ATTEMPT: "load_user_attempt",
  LOAD_USERS_SUCCESS: "load_user_success",
  LOAD_USERS_FAILURE: "load_user_failure",
};

export const InviteUserActionTypes = {
  INVITE_USER_ATTEMPT: "invite_user_attempt",
  INVITE_USER_SUCCESS: "invite_user_success",
  INVITE_USER_FAILURE: "invite_user_failure",
  REVOKE_INVITE_ATTEMPT: "revoke_invite_attempt",
  REVOKE_INVITE_SUCCESS: "revoke_invite_success",
  REVOKE_INVITE_FAILURE: "revoke_invice_failure",
  LOAD_INVITES_ATTEMPT: "load_invites_attempt",
  LOAD_INVITES_SUCCESS: "load_invites_success",
  LOAD_INVITES_FAILURE: "load_invites_failure"
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

export const InvitesActions = {
  getInvitesAttempt: () => {
    return { type: InviteUserActionTypes.LOAD_INVITES_ATTEMPT };
  },
  getInvitesSuccess: invites => {
    return { type: InviteUserActionTypes.LOAD_INVITES_SUCCESS, invites: invites };
  },
  getInvitesFailure: () => {
    return { type: InviteUserActionTypes.LOAD_INVITES_FAILURE };
  },
  revokeInviteAttempt: () => {
    return { type: InviteUserActionTypes.REVOKE_INVITE_ATTEMPT };
  },
  revokeInviteSuccess: () => {
    return { type: InviteUserActionTypes.REVOKE_INVITE_SUCCESS };
  },
  revokeInviteFailure: () => {
    return { type: InviteUserActionTypes.REVOKE_INVITE_FAILURE };
  },
  inviteAttempt: () => {
    return { type: InviteUserActionTypes.INVITE_USER_ATTEMPT };
  },
  inviteSuccess: users => {
    return { type: InviteUserActionTypes.INVITE_USER_SUCCESS };
  },
  inviteFailure: () => {
    return { type: InviteUserActionTypes.INVITE_USER_FAILURE };
  },
}

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
        dispatch(NotifyActions.error("Failed to load users"));
        dispatch(UsersActions.failure());
      });
  };
};

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {UsersService} UsersService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateInvitesActionDispatcher = (UsersService, dispatch) => {
  return () => {
    dispatch(InvitesActions.getInvitesAttempt());

    UsersService.getInvites()
      .then(invites => {
        dispatch(InvitesActions.getInvitesSuccess(invites));
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to load invites"));
        dispatch(InvitesActions.getInvitesFailure());
      });
  };
};

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {UsersService} UsersService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateInviteUserActionDispatcher = (UsersService, dispatch) => {
  return (email) => {
    dispatch(InvitesActions.inviteAttempt());

    UsersService.inviteUser(email)
      .then(users => {
        dispatch(InvitesActions.inviteSuccess(users));
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to invite user"));
        dispatch(InvitesActions.inviteFailure());
      });
  };
}

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {UsersService} UsersService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateRevokeInviteActionDispatcher = (UsersService, dispatch) => {
  return (revoke_invite_id) => {
    dispatch(InvitesActions.revokeInviteAttempt());

    UsersService.revokeInvite(revoke_invite_id)
      .then(users => {
        dispatch(InvitesActions.revokeInviteSuccess());
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to revoke invite"));
        dispatch(InvitesActions.revokeInviteFailure());
      });
  };
};
