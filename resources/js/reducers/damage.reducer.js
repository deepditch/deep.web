import { DamageActionTypes } from "../actions";

/**
 * Updates the damage state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function DamageReducer(state = { instances: [] }, action) {
  switch (action.type) {
    case DamageActionTypes.LOAD_DAMAGE_ATTEMPT:
      return { instances: [], pending: true };
    case DamageActionTypes.LOAD_DAMAGE_SUCCESS:
      return { instances: action.instances, success: true };
    case DamageActionTypes.LOAD_DAMAGE_FAILURE:
      return { instances: [], rejected: true };
    default:
      return state;
  }
}
