import { DamageActionTypes } from "../actions";

/**
 * Updates the damage state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function DamageReducer(state = { instances: [] }, action) {
  switch (action.type) {
    case DamageActionTypes.LOAD_DAMAGE:
      return { instances: action.instances };
    case DamageActionTypes.REQUEST_DAMAGE:
      return { instances: [] };
    default:
      return state;
  }
}
