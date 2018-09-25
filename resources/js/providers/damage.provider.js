import DamageMap from "../components/Map/damage-map";
import Map from "../components/map";
import { connect } from "react-redux";
import { CreateDamageActionDispatcher } from "../actions";
import { MockRoadDamageService } from "../services";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const DamageProvider = c => {
  c.register("DamageService", c => new MockRoadDamageService());

  c.register("DamageMap", c =>
    connect(
      store => {
        return {
          instances: store.damage.instances
        };
      },
      dispatch => {
        return {
          loadDamage: CreateDamageActionDispatcher(c.DamageService, dispatch)
        };
      }
    )(DamageMap)
  );

  c.register("Map", c => Map(c.DamageMap));
};
