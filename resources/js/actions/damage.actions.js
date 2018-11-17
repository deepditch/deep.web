import { NotifyActions } from "./notify.actions";

export const DamageActionTypes = {
  LOAD_DAMAGE_ATTEMPT: "load_damage_attempt",
  LOAD_DAMAGE_SUCCESS: "load_damage_success",
  LOAD_DAMAGE_FAILURE: "load_damage_failure",
  ACTIVATE_DAMAGE_INSTANCE: "activate_damage_instance",
  DEACTIVATE_DAMAGE_INSTANCE: "deactivate_damage_instance",
  VERIFY_DAMAGE_REPORT: "verify_damage_report",
  UNVERIFY_DAMAGE_REPORT: "unverify_damage_report",
  FILTER_DAMAGE: "filter_damage",
  EXPAND_ACTIVE_DAMAGE: "expand_active_damage",
  CLOSE_ACTIVE_DAMAGE: "close_active_damage",
  CHANGE_DAMAGE_STATUS: "change_damage_status"
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
  filter: (streetname, type, status, verified) => {
    return {
      type: DamageActionTypes.FILTER_DAMAGE,
      filters: {
        streetname: streetname,
        type: type,
        status: status,
        verified: verified
      }
    };
  },
  expand: () => {
    return {
      type: DamageActionTypes.EXPAND_ACTIVE_DAMAGE
    };
  },
  close: () => {
    return {
      type: DamageActionTypes.CLOSE_ACTIVE_DAMAGE
    };
  },
  changeStatus: (damageId, status) => {
    return {
      type: DamageActionTypes.CHANGE_DAMAGE_STATUS,
      id: damageId,
      status: status
    };
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

  filterDamages = dispatch => (searchText, type, status, verified) => {
    dispatch(DamageActions.filter(searchText, type, status, verified));
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
  };

  changeDamageStatus = dispatch => (damageId, status) => {
    this.damageService
      .changeDamageStatus(damageId, status)
      .then(response => {
        dispatch(DamageActions.changeStatus(damageId, status));
      })
      .catch(error => {
        dispatch(NotifyActions.error("Failed to change the status label"));
      });
  };

  expand = dispatch => () => {
    dispatch(DamageActions.expand());
  };

  close = dispatch => () => {
    dispatch(DamageActions.close());
  };
}
