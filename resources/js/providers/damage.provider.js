import Map from "../components/Map";
import DamageList, {
  DamageListItem,
  DamageFilters
} from "../components/damage-list";
import DamageMap, {
  ActiveDamageWindow,
  DamageMarker,
  DamageMarkers,
  HeatMap,
  ExpandedDamageWindow
} from "../components/damage-map";
import { connect } from "react-redux";
import { DamageActionDispatcher } from "../actions";
import { DamageService } from "../services";
import { createSelector } from "reselect";

const damage = store => store.damage;

const getDamageIds = createSelector(
  [damage],
  damage => {
    var filters = damage.filters;

    var filteredArray = damage.damages.filter(el => {
      var isActive = el.id == damage.activeDamageId;
      var isNotFalsePositive = !el.false_positive;

      var containsKeyword = filters.streetname
        ? el.position.streetname
            .toLowerCase()
            .includes(filters.streetname.toLowerCase())
        : true;

      var isType = filters.type ? el.type == filters.type : true;

      var isStatus = filters.status
        ? el.label == filters.status
        : el.label != "wont-do" && el.label != "done";

      var isVerified = filters.verified
        ? filters.verified == "true"
          ? el.verified
          : !el.verified
        : true;

      return (
        isActive ||
        (containsKeyword &&
          isType &&
          isStatus &&
          isVerified &&
          isNotFalsePositive)
      );
    });

    return filteredArray.map(damage => damage.id);
  }
);

const getActiveDamage = store => {
  const theDamage = store.damage.damages.find(
    damage => damage.id == store.damage.activeDamageId
  );
  if (!theDamage) return theDamage;

  return {
    ...theDamage,
    image: {
      url: theDamage.image.url,
      reports: theDamage.image.reports.map(report => {
        const subDamage = store.damage.damages.find(
          damage => damage.id == report.roaddamage_id
        );
        if (!subDamage) { return report }
        return {
          ...report,
          type: subDamage.type,
          false_positive: subDamage.false_positive,
          verified: subDamage.verified
        };
      })
    }
  };
};

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
          }
        };
      }
    )(DamageMarker)
  );

  // List of Damage Markers
  c.register("DamageMarkers", c =>
    connect(store => {
      return {
        damages: getDamageIds(store)
      };
    })(DamageMarkers(c.DamageMarker))
  );

  // Heatmap of damage reports
  c.register("HeatMap", c =>
    connect(store => {
      return {
        damages: store.damage.damages
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
          expand: c.DamageActions.expand(dispatch)
        };
      }
    )(ActiveDamageWindow)
  );

  // Active damage info window content
  c.register("ExpandedDamageWindow", c =>
    connect(
      store => {
        return {
          damage: getActiveDamage(store),
          visible: store.damage.expanded
        };
      },
      (dispatch, ownProps) => {
        return {
          verifyDamageReport: c.DamageActions.verifyDamageReport(dispatch),
          changeStatus: c.DamageActions.changeDamageStatus(dispatch),
          close: c.DamageActions.close(dispatch),
          activateDamage: c.DamageActions.activateDamage(dispatch)
        };
      }
    )(ExpandedDamageWindow)
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
    )(
      DamageMap(
        c.DamageMarkers,
        c.HeatMap,
        c.ActiveDamageWindow,
        c.ExpandedDamageWindow
      )
    )
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
          }
        };
      }
    )(DamageListItem)
  );

  c.register("DamageFilters", c =>
    connect(
      null,
      dispatch => {
        return {
          filterDamages: c.DamageActions.filterDamages(dispatch)
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
