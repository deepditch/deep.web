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
      return { ...state, filters: action.filters };
    case DamageActionTypes.EXPAND_ACTIVE_DAMAGE:
      return { ...state, expanded: true };
    case DamageActionTypes.CLOSE_ACTIVE_DAMAGE:
      return { ...state, expanded: false };
    case DamageActionTypes.VERIFY_DAMAGE_REPORT:
      var new_damages = action.damages.filter(dam => !state.damages.find(x => x.id == dam.id))
      return {
        ...state,
        damages: state.damages.map(damage => {
          var updated_damage = action.damages.find(
            new_damage => new_damage.id == damage.id
          );
          if (updated_damage) {
            return updated_damage;
          }
          return damage;
        }).concat(new_damages)
      };
    case DamageActionTypes.CHANGE_DAMAGE_STATUS:
      return {
        ...state,
        damages: state.damages.map(damage => {
          // Update the damage where the id matches the highest confidence report id
          if (action.id == damage.id) {
            return { ...damage, label: action.status };
          }
          return damage;
        })
      };
    default:
      return state;
  }
}
