import { NotifyActions } from "./notify.actions";

export const DamageActionTypes = {
  LOAD_DAMAGE_ATTEMPT: "load_damage_attempt",
  LOAD_DAMAGE_SUCCESS: "load_damage_success",
  LOAD_DAMAGE_FAILURE: "load_damage_failure"
};

export const DamageActions = {
  attempt: () => {
    return { type: DamageActionTypes.LOAD_DAMAGE_ATTEMPT };
  },
  success: instances => {
    return { type: DamageActionTypes.LOAD_DAMAGE_SUCCESS, instances: instances };
  },
  failure: () => {
    return { type: DamageActionTypes.LOAD_DAMAGE_FAILURE };
  }
};

/**
 * Returns a method that loads damage instances and dispatches redux actions. Delegates get request to DamageService
 * @param {DamageService} DamageService must have a getDamageInstances() method that returns a Promise
 * @param {function} dispatch the redux dispatch method
 * @return a loadDamageInstances method that dispatches redux actions
 */
export const CreateDamageActionDispatcher = (DamageService, dispatch) => {
  return () => {
    dispatch(DamageActions.attempt());

    DamageService.getDamageInstances()
      .then(instances => {
        dispatch(DamageActions.success(instances));
      })
      .catch(error => {
        dispatch(DamageActions.failure());
        dispatch(NotifyActions.error("Failed to load road damage"));
      });
  };
};
