import { NotifyActions } from "./notify.actions";

export const DamageActionTypes = {
  LOAD_DAMAGE_ATTEMPT: "load_damage_attempt",
  LOAD_DAMAGE_SUCCESS: "load_damage_success",
  LOAD_DAMAGE_FAILURE: "load_damage_failure",
  ACTIVATE_DAMAGE_INSTANCE: "activate_damage_instance",
  DEACTIVATE_DAMAGE_INSTANCE: "deactivate_damage_instance"
};

export const DamageActions = {
  attempt: () => {
    return { type: DamageActionTypes.LOAD_DAMAGE_ATTEMPT };
  },
  success: damages => {
    return {
      type: DamageActionTypes.LOAD_DAMAGE_SUCCESS,
      damages: damages
    };
  },
  failure: () => {
    return { type: DamageActionTypes.LOAD_DAMAGE_FAILURE };
  },
  activate: id => {
    return { type: DamageActionTypes.ACTIVATE_DAMAGE_INSTANCE, id: id };
  },
  deactivate: id => {
    return { type: DamageActionTypes.DEACTIVATE_DAMAGE_INSTANCE };
  }
};

export class DamageActionDispatcher {
  constructor(damageService) {
    this.damageService = damageService;
  }

  loadDamage = dispatch => () => {
    dispatch(DamageActions.attempt());

    this.damageService
      .getDamageInstances()
      .then(damages => {
        dispatch(DamageActions.success(damages));
      })
      .catch(error => {
        dispatch(DamageActions.failure());
        dispatch(NotifyActions.error(error));
      });
  };

  activateDamage = dispatch => id => {
    dispatch(DamageActions.activate(id));
  };

  deactivateDamage = dispatch => () => {
    dispatch(DamageActions.deactivate());
  };
}
