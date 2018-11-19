import { NotifyActions } from "./notify.actions";

export const ApiTokensActionTypes = {
  ADD_TOKEN_ATTEMPT: "add_token_attempt",
  ADD_TOKEN_SUCCESS: "add_token_success",
  ADD_TOKEN_FAILURE: "add_token_failure",
  DELETE_TOKEN_ATTEMPT: "delete_token_attempt",
  DELETE_TOKEN_SUCCESS: "delete_token_success",
  DELETE_TOKEN_FAILURE: "delete_token_failure",
  LOAD_TOKENS_ATTEMPT: "load_tokens_attempt",
  LOAD_TOKENS_SUCCESS: "load_tokens_success",
  LOAD_TOKENS_FAILURE: "load_tokens_failure"
};


export const ApiTokensActions = {
  getTokensAttempt: () => {
    return { type: InviteUserActionTypes.LOAD_TOKENS_ATTEMPT };
  },
  getTokensSuccess: invites => {
    return { type: InviteUserActionTypes.LOAD_TOKENS_SUCCESS, invites: invites };
  },
  getTokensFailure: () => {
    return { type: InviteUserActionTypes.LOAD_TOKENS_FAILURE };
  },
  deleteTokenAttempt: () => {
    return { type: InviteUserActionTypes.DELETE_TOKEN_ATTEMPT };
  },
  deleteTokenSuccess: invites => {
    return { type: InviteUserActionTypes.DELETE_TOKEN_SUCCESS, invites: invites };
  },
  deleteTokenFailure: () => {
    return { type: InviteUserActionTypes.DELETE_TOKEN_FAILURE };
  },
  addTokenAttempt: () => {
    return { type: InviteUserActionTypes.ADD_TOKEN_ATTEMPT };
  },
  addTokenSuccess: invites => {
    return { type: InviteUserActionTypes.ADD_TOKEN_SUCCESS, invites: invites };
  },
  addTokenFailure: () => {
    return { type: InviteUserActionTypes.ADD_TOKEN_FAILURE };
  },
}

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {UsersService} UsersService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateTokensActionDispatcher = (TokensService, dispatch) => {
  return () => {
    dispatch(ApiTokensActions.getTokensAttempt());

    TokensService.getTokens()
      .then(tokens => {
        dispatch(ApiTokensActions.getTokensSuccess(tokens));
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to load tokens."));
        dispatch(ApiTokensActions.getTokensFailure());
      });
  };
};

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {TokensService} TokensService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateAddTokenActionDispatcher = (TokensService, dispatch) => {
  return (name) => {
    dispatch(ApiTokensActions.addTokenAttempt());

    UsersService.addToken(name)
      .then(token => {
        dispatch(NotifyActions.success("Please copy this token! This will be the only time you will be able to view it. If its lost, you will need to generate a new token." + token.jwt));
        dispatch(ApiTokensActions.addTokenSuccess(invites));
      })
      .catch(error => {
        dispatch(NotifyActions.error(error));
        dispatch(ApiTokensActions.addTokenFailure());
      });
  };
}

/**
 * Returns a method that loads users and dispatches redux actions. Delegates get request to UsersService
 * @param {TokensService} TokensService must have a getUsersInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a getUsersInstances method that dispatches redux actions
 */
export const CreateDeleteTokenActionDispatcher = (TokensService, dispatch) => {
  return (delete_token_id) => {
    dispatch(ApiTokensActions.revokeInviteAttempt());

    TokensService.deleteToken(delete_token_id)
      .then(tokens => {
        dispatch(NotifyActions.success("Token has been deleted."));
        dispatch(ApiTokensActions.deleteTokenSuccess(tokens));
      })
      .catch(error => {
        dispatch(NotifyActions.error(error));
        dispatch(ApiTokensActions.deleteTokenFailure());
      });
  };
};
