import { RegisterActionTypes } from "../actions";

/**
 * Updates the register state based on the provided action
 * @param {JSON} state The previous register state
 * @param {JSON} action A redux action
 */
export default function RegisterReducer(state = {}, action) {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_ATTEMPT:
      return { pending: true };
    case RegisterActionTypes.REGISTER_SUCCESS:
      return { success: true };
    case RegisterActionTypes.REGISTER_FAILURE:
      return { rejected: false };
    default:
      return state;
  }
}
