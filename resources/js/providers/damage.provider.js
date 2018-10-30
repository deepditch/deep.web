import Map from "../components/Map";
import DamageList, { DamageListItem } from "../components/damage-list";
import DamageMap, {
  ActiveDamage,
  MapMarkers,
  HeatMap
} from "../components/damage-map";
import { connect } from "react-redux";
import { DamageActionDispatcher } from "../actions";
import { DamageService } from "../services";
import { createSelector } from "reselect";

const getDamages = store => store.damage.damages;

const getDamageIds = createSelector([getDamages], damages =>
  damages.map(damage => damage.id).toList()
);

const getActiveDamage = store =>
  store.damage.damages.find(damage => damage.id == store.damage.activeDamageId);

const getDamage = (store, ownProps) =>
  store.damage.damages.find(damage => damage.id == ownProps.damageId);

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
          damages: getDamageIds(store),
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
          damages: damageIdsSelector(store),
          pending: store.damage.pending,
          success: store.damage.success,
          activeDamageId: store.damage.activeDamageId
        };
      },
      dispatch => {
        return {
          loadDamage: c.DamageActions.loadDamage(dispatch),
          activateDamage: c.DamageActions.activateDamage(dispatch),
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )(DamageList)
  );

  c.register("DamageListItem", c =>
    connect(
      (store, ownProps) => {
        return {
          damage: getDamage(store, ownProps),
          active: store.damage.activeDamageId == ownProps.damageId
        };
      },
      dispatch => {
        return {
          activateDamage: c.DamageActions.activateDamage(dispatch),
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )
  );

  c.register("Map", c => Map(c.DamageList, c.DamageMap));
};
