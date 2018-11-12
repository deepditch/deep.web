import { DamageActionTypes } from "../actions";

/**
 * Updates the damage state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function DamageReducer(
  state = { damages: [], filters: {}, expanded: false },
  action
) {
  switch (action.type) {
    case DamageActionTypes.LOAD_DAMAGE_ATTEMPT:
      return { ...state, pending: true, success: false, rejected: false };
    case DamageActionTypes.LOAD_DAMAGE_SUCCESS:
      return {
        ...state,
        damages: action.damages,
        pending: false,
        success: true,
        rejected: false
      };
    case DamageActionTypes.LOAD_DAMAGE_FAILURE:
      return { ...state, pending: false, success: false, rejected: true };
    case DamageActionTypes.ACTIVATE_DAMAGE_INSTANCE:
      return { ...state, activeDamageId: action.id };
    case DamageActionTypes.DEACTIVATE_DAMAGE_INSTANCE:
      return { ...state, activeDamageId: null };
    case DamageActionTypes.FILTER_DAMAGE:
      return { ...state, filters: action.filters, activeDamageId: null };
    case DamageActionTypes.EXPAND_ACTIVE_DAMAGE:
      return { ...state, expanded: true };
    case DamageActionTypes.CLOSE_ACTIVE_DAMAGE:
      return { ...state, expanded: false };
    case DamageActionTypes.VERIFY_DAMAGE_REPORT:
      return {
        ...state,
        damages: state.damages.map(damage => {
          // Update the damage where the id matches the highest confidence report id
          if (action.id == damage.reportId) {
            return { ...damage, verified: true, false_positive: false };
          }
          return damage;
        })
      };
    case DamageActionTypes.UNVERIFY_DAMAGE_REPORT:
      return {
        ...state,
        damages: state.damages.map(damage => {
          // Update the damage where the id matches the highest confidence report id
          if (action.id == damage.reportId) {
            return { ...damage, verified: false };
          }
          return damage;
        })
      };
    default:
      return state;
  }
}
