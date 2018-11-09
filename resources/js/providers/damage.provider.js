import Map from "../components/Map";
import DamageList, {
  DamageListItem,
  DamageFilters
} from "../components/damage-list";
import DamageMap, {
  ActiveDamageWindow,
  DamageMarker,
  DamageMarkers,
  HeatMap
} from "../components/damage-map";
import { connect } from "react-redux";
import { DamageActionDispatcher } from "../actions";
import { DamageService } from "../services";
import { createSelector } from "reselect";

const getDamages = store => store.damage.damages;

const getDamageIds = createSelector([getDamages], damages =>
  damages.map(damage => damage.id)
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

  // Single damage marker
  c.register("DamageMarker", c =>
    connect(
      (store, ownProps) => {
        return {
          damage: getDamage(store, ownProps)
        };
      },
      (dispatch, ownProps) => {
        return {
          activate: () => {
            c.DamageActions.activateDamage(dispatch)(ownProps.damageId);
          },
        };
      }
    )(DamageMarker)
  );

  // List of Damage Markers
  c.register("DamageMarkers", c =>
    connect(
      store => {
        return {
          damages: getDamageIds(store)
        };
      }
    )(DamageMarkers(c.DamageMarker))
  )

  // Heatmap of damage reports
  c.register("HeatMap", c =>
    connect(store => {
      return {
        damages: getDamages(store)
      };
    })(HeatMap)
  );

  // Active damage info window content
  c.register("ActiveDamageWindow", c =>
    connect(
      store => {
        return {
          damage: getActiveDamage(store)
        };
      },
      dispatch => {
        return {
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )(ActiveDamageWindow)
  );

  c.register("DamageMap", c =>
    connect(
      null,
      dispatch => {
        return {
          loadDamage: c.DamageActions.loadDamage(dispatch),
          deactivateDamage: c.DamageActions.deactivateDamage(dispatch)
        };
      }
    )(DamageMap(c.DamageMarkers, c.HeatMap, c.ActiveDamageWindow))
  );

  c.register("DamageListItem", c =>
    connect(
      (store, ownProps) => {
        return {
          damage: getDamage(store, ownProps),
          active: store.damage.activeDamageId == ownProps.damageId
        };
      },
      (dispatch, ownProps) => {
        return {
          activate: () => {
            c.DamageActions.activateDamage(dispatch)(ownProps.damageId);
          },
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          unverifyDamageReport: c.DamageActions.unverifyDamageReport(dispatch)
        };
      }
    )(DamageListItem)
  );

  c.register("DamageFilters", c =>
    connect(
      null,
      dispatch => {
        return {
          loadDamage: c.DamageActions.loadDamage(dispatch)
        };
      }
    )(DamageFilters)
  );

  c.register("DamageList", c =>
    connect(store => {
      return {
        damages: getDamageIds(store)
      };
    })(DamageList(c.DamageListItem, c.DamageFilters))
  );

  c.register("Map", c => Map(c.DamageList, c.DamageMap));
};
