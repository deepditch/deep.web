import { DamageActionTypes } from "../actions";

/**
 * Updates the damage state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function DamageReducer(state = { damages: [], filters: {} }, action) {
  switch (action.type) {
    case DamageActionTypes.LOAD_DAMAGE_ATTEMPT:
      return { damages: [], filters: {}, pending: true };
    case DamageActionTypes.LOAD_DAMAGE_SUCCESS:
      return { damages: action.damages, filters: {}, success: true };
    case DamageActionTypes.LOAD_DAMAGE_FAILURE:
      return { damages: [], filters: {}, rejected: true };
    case DamageActionTypes.ACTIVATE_DAMAGE_INSTANCE:
      return { damages: state.damages, filters: {}, activeDamageId: action.id };
    case DamageActionTypes.DEACTIVATE_DAMAGE_INSTANCE:
      return { damages: state.damages, filters: {}, activeDamageId: null };
    case DamageActionTypes.FILTER_DAMAGE:
      return { ...state, filters: action.filters };
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
