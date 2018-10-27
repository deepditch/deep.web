import { DamageActionTypes } from "../actions";

/**
 * Updates the damage state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function DamageReducer(state = { damages: [] }, action) {
  switch (action.type) {
    case DamageActionTypes.LOAD_DAMAGE_ATTEMPT:
      return { damages: [], pending: true };
    case DamageActionTypes.LOAD_DAMAGE_SUCCESS:
      return { damages: action.damages, success: true };
    case DamageActionTypes.LOAD_DAMAGE_FAILURE:
      return { damages: [], rejected: true };
    case DamageActionTypes.ACTIVATE_DAMAGE_INSTANCE:
      return { damages: state.damages, activeDamageId: action.id };
    default:
      return state;
  }
}
