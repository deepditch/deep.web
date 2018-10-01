import DamageMap from "../components/Map/damage-map";
import Map from "../components/Map";
import UserSidebar from "../components/UserSidebar";
import { connect } from "react-redux";

import {
  CreateDamageActionDispatcher,
  CreateLogoutActionDispatcher
} from "../actions";

import { RoadDamageService } from "../services";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const DamageProvider = c => {
  c.register("DamageService", c => new RoadDamageService(c.Axios));

  c.register("DamageMap", c =>
    connect(
      store => {
        return {
          instances: store.damage.instances,
          pending: store.damage.pending
        };
      },
      dispatch => {
        return {
          loadDamage: CreateDamageActionDispatcher(c.DamageService, dispatch)
        };
      }
    )(DamageMap)
  );

  c.register("UserSidebar", c =>
    connect(
      store => {
        return {
          user: store.user.user,
        };
      },
      dispatch => {
        return {
          logout: CreateLogoutActionDispatcher(c.AuthService, dispatch)
        };
      }
    )(UserSidebar)
  );

  c.register("Map", c => Map(c.UserSidebar, c.DamageMap));
};
