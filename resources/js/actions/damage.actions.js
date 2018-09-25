import { NotifyActions } from "./notify.actions";

export const DamageActionTypes = {
  LOAD_DAMAGE: "load_damage",
  REQUEST_DAMAGE: "request_damage"
};

export const DamageActions = {
  load: instances => {
    return { type: DamageActionTypes.LOAD_DAMAGE, instances: instances };
  },
  request: () => {
    return { type: DamageActionTypes.REQUEST_DAMAGE };
  }
};

export const CreateDamageActionDispatcher = (DamageService, dispatch) => {
  return () => {
    dispatch(DamageActions.request());

    DamageService.getDamageInstances()
      .then(instances => {
        dispatch(DamageActions.load(instances));
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to load road damage"));
      });
  };
};
