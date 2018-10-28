import DamageMap from "../components/Map/damage-map";
import DamageList from "../components/Map/damage-list";
import Map from "../components/Map";
import { connect } from "react-redux";

import {
  DamageActionDispatcher
} from "../actions";

import { DamageService } from "../services";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const DamageProvider = c => {
  c.register("DamageService", c => new DamageService(c.Axios));
  c.register("DamageActions", c => new DamageActionDispatcher(c.DamageService));

  c.register("DamageMap", c =>
    connect(
      store => {
        return {
          damages: store.damage.damages,
          pending: store.damage.pending,
          success: store.damage.success,
          activeDamageId: store.damage.activeDamageId
        };
      },
      dispatch => {
        return {
          loadDamage: c.DamageActions.loadDamage(dispatch),
          activateDamage: c.DamageActions.activateDamage(dispatch),
          deactivateDamage: c.DamageActions.deactivateDamage(dispatch),
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )(DamageMap)
  );

  c.register("DamageList", c =>
    connect(
      store => {
        return {
          damages: store.damage.damages,
          pending: store.damage.pending,
          success: store.damage.success,
          activeDamageId: store.damage.activeDamageId
        };
      },
      dispatch => {
        return {
          activateDamage: c.DamageActions.activateDamage(dispatch),
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )(DamageList)
  );

  c.register("Map", c => Map(c.DamageList, c.DamageMap));
};
