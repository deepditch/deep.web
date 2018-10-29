import { NotifyActions } from "./notify.actions";
import { isNullOrUndefined } from "util";

export const DamageActionTypes = {
  LOAD_DAMAGE_ATTEMPT: "load_damage_attempt",
  LOAD_DAMAGE_SUCCESS: "load_damage_success",
  LOAD_DAMAGE_FAILURE: "load_damage_failure",
  ACTIVATE_DAMAGE_INSTANCE: "activate_damage_instance",
  DEACTIVATE_DAMAGE_INSTANCE: "deactivate_damage_instance",
  VERIFY_DAMAGE_REPORT: "verify_damage_report",
  UNVERIFY_DAMAGE_REPORT: "unverify_damage_report"
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
  },
  verify: id => {
    return { type: DamageActionTypes.VERIFY_DAMAGE_REPORT, id: id };
  },
  unverify: id => {
    return { type: DamageActionTypes.UNVERIFY_DAMAGE_REPORT, id: id };
  },

};

export class DamageActionDispatcher {
  constructor(damageService) {
    this.damageService = damageService;
  }

  loadDamage = dispatch => (streetname = null, type = null, status = null, verified = null)  => {
      dispatch(DamageActions.attempt());


      this.damageService
        .getDamageInstances()
        .then(damages => {
          var filteredArray = damages;
          if (streetname) {
            filteredArray = filteredArray.filter(el=> {
              return el.position.streetname == streetname;
            });
          }
          if (type) {
            filteredArray = filteredArray.filter(el=> {
              return el.type == type;
            });
          }
          if (status) {
            filteredArray = filteredArray.filter(el=> {
              return el.label == status;
            });
          }
          if (verified != null) {
            filteredArray = filteredArray.filter(el=> {
              if (verified == "true") return el.verified
              else if (verified == "false") return !el.verified
              return true;
            });
          }
          dispatch(DamageActions.success(filteredArray));
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

  verifyDamageReport = dispatch => id => {
    this.damageService.verifyDamageReport(id).then(response => {
      dispatch(DamageActions.verify(id));
    });
  };

  unverifyDamageReport = dispatch => id => {
    this.damageService.unverifyDamageReport(id).then(response => {
      dispatch(DamageActions.unverify(id));
    });
  }
}
