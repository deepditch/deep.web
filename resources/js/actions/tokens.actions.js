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
    return { type: ApiTokensActionTypes.LOAD_TOKENS_ATTEMPT };
  },
  getTokensSuccess: tokens => {
    return { type: ApiTokensActionTypes.LOAD_TOKENS_SUCCESS, tokens: tokens };
  },
  getTokensFailure: () => {
    return { type: ApiTokensActionTypes.LOAD_TOKENS_FAILURE };
  },
  deleteTokenAttempt: () => {
    return { type: ApiTokensActionTypes.DELETE_TOKEN_ATTEMPT };
  },
  deleteTokenSuccess: tokens => {
    return { type: ApiTokensActionTypes.DELETE_TOKEN_SUCCESS, tokens: tokens };
  },
  deleteTokenFailure: () => {
    return { type: ApiTokensActionTypes.DELETE_TOKEN_FAILURE };
  },
  addTokenAttempt: () => {
    return { type: ApiTokensActionTypes.ADD_TOKEN_ATTEMPT };
  },
  addTokenSuccess: token => {
    return { type: ApiTokensActionTypes.ADD_TOKEN_SUCCESS, token: token };
  },
  addTokenFailure: () => {
    return { type: ApiTokensActionTypes.ADD_TOKEN_FAILURE };
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

    TokensService.addToken(name)
      .then(token => {
        dispatch(NotifyActions.success("Token has been added!"));
        dispatch(ApiTokensActions.addTokenSuccess(token));
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
    dispatch(ApiTokensActions.deleteTokenAttempt());

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
