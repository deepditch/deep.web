import { ApiTokensActionTypes } from "../actions/tokens.actions";

/**
 * Updates the users list state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function TokensReducer(state = { tokens: [] }, action) {
  switch (action.type) {
    case ApiTokensActionTypes.LOAD_TOKENS_ATTEMPT:
      return { tokens: [], pending: true };
    case ApiTokensActionTypes.LOAD_TOKENS_SUCCESS:
      return { tokens: action.tokens, success: true };
    case ApiTokensActionTypes.LOAD_TOKENS_FAILURE:
      return { tokens: [], rejected: true };
    default:
      return state;
  }
}

